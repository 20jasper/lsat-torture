import { getHyperTortureMode, resetHyperTortureStreak, storage } from "storage"

import type {
  Category,
  Difficulty,
  Problem
} from "~leetcode-problems/manhattanReview"
import { problems } from "~leetcode-problems/manhattanReview"
import type { UserState } from "~types"

const LEETCODE_URL = "https://www.manhattanreview.com/"
const RULE_ID = 1
const isLeetCodeUrl = (url: string) => url.includes(LEETCODE_URL)

const sendUserSolvedMessage = (languageUsed: string) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: "userSolvedProblem",
      language: languageUsed
    })
  })
}

const sendUserFailedMessage = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: "userFailedProblem"
    })
  })
}

const state: UserState = {
  leetcodeProblemSolved: false,
  leetCodeProblem: {
    url: null,
    name: null
  },
  lastSubmissionDate: new Date(0),
  solvedListenerActive: false,
  lastAttemptedUrl: null,
  urlListener: null,
  includePremium: null,
  hyperTortureMode: null,
  HTcurrentStreak: null
}

/**
 * @param difficulty `null` means no filtering
 * @param category `null` means no filtering
 */
export function filterProblemList(
  difficulty: Difficulty | null,
  category: Category | null
): Problem[] {
  return problems.filter((p) => {
    if (difficulty !== null && difficulty !== p.difficulty) {
      return false
    }
    if (category !== null && category !== p.category) {
      return false
    }

    return true
  })
}

export const handleAdditionalProblemRedirect = async (problemUrl: string) => {
  if (await storage.getEnableRedirectOnEveryProblem())
    await setRedirectRule(problemUrl)
}

export async function generateRandomLeetCodeProblem(): Promise<Problem> {
  try {
    const difficulty = await storage.getDifficulty()

    const list = filterProblemList(difficulty, null)
    const i = Math.floor(Math.random() * list.length)
    return list[i]
  } catch (error) {
    console.error("Error generating random problem", error)
    return undefined
  } finally {
    await storage.stopLoading()
  }
}

function onMessageReceived(
  message: any,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: any) => void
): void {
  switch (message.action) {
    case "fetchingProblem":
      // Handle the start of the problem fetch.
      // Currently, we'll just log it for clarity, but you can add other logic here if needed.
      console.log("Fetching problem started.")
      break
    case "problemFetched":
      // Handle the end of the problem fetch.
      console.log("Fetching problem completed.")
      break
    case "getProblemStatus":
      sendResponse({
        problemSolved: state.leetcodeProblemSolved,
        problem: state.leetCodeProblem
      })
    case "userClickedSubmit":
      state.lastSubmissionDate = new Date()
      state.solvedListenerActive = true
      console.log(
        "User clicked submit, adding listener",
        state.solvedListenerActive
      )
      chrome.webRequest.onCompleted.addListener(
        (d) => checkIfUserSolvedProblem(false, false),
        {
          urls: ["https://*.manhattanreview.com/*"]
        }
      )
      break
    case "questionAnswered":
      checkIfUserSolvedProblem(true, false)
      break
    case "correctAnswer":
      checkIfUserSolvedProblem(true, true)
      break
    default:
      console.warn("Unknown message action:", message.action)
  }
}

async function setRedirectRule(redirectUrl: string) {
  const redirectRule = {
    id: RULE_ID,
    priority: 1,
    action: {
      type: "redirect",
      redirect: { url: redirectUrl }
    },
    condition: {
      urlFilter: "*://*/*",
      excludedInitiatorDomains: [
        "manhattanreview.com",
        "www.manhattanreview.com",
        "developer.chrome.com"
      ],
      resourceTypes: ["main_frame"]
    }
  }
  try {
    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: [RULE_ID],
      addRules: [redirectRule as chrome.declarativeNetRequest.Rule]
    })
    console.log("Redirect rule updated")
  } catch (error) {
    console.error("Error updating redirect rule:", error)
  }
}

export const updateProblemState = async (problem: Problem) => {
  await storage.updateProblem(problem, state.leetcodeProblemSolved)
}

export const updateStorage = async () => {
  try {
    const isRedirectEnabled = await storage.getEnableRedirectOnEveryProblem()
    let problem = await generateRandomLeetCodeProblem()
    state.leetcodeProblemSolved = false
    updateProblemState(problem)
    if (!state.leetcodeProblemSolved && isRedirectEnabled)
      await setRedirectRule(problem.href)
  } catch (error) {
    throw new Error("Error generating random problem: " + error)
  }
}

const checkIfUserSolvedProblem = async (
  answered: boolean,
  correct: boolean
) => {
  // If the user has already solved the problem, then don't do anything
  if (await storage.getProblemSolved()) return
  // Get the current active tab's URL

  if (state.solvedListenerActive) {
    // Remove the listener so that it doesn't fire again, since the outcome will either be success or fail
    // And we'll add it again when the user clicks submit
    state.solvedListenerActive = false
    // chrome.webRequest.onCompleted.removeListener(checkIfUserSolvedProblem)
  }

  if (answered) {
    try {
      const hyperTortureMode = await getHyperTortureMode()

      if (!correct) {
        if (hyperTortureMode) {
          await resetHyperTortureStreak()
          sendUserFailedMessage()
        }
        return
      }
      if (correct) {
        await storage.updateStreak()
        state.leetcodeProblemSolved = true
        chrome.declarativeNetRequest.updateDynamicRules({
          removeRuleIds: [RULE_ID]
        })
        // chrome.webRequest.onCompleted.removeListener(checkIfUserSolvedProblem)
        if (hyperTortureMode) {
          console.log("Hyper torture mode is enabled")
          if (state.lastAttemptedUrl) {
            chrome.tabs.update({ url: state.lastAttemptedUrl })
          }
          await updateStorage()
        } else {
          sendUserSolvedMessage(data?.lang)
        }
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }
}

async function tryResetStreak() {
  const lastCompletion = await storage.getLastCompletion()
  const yesterday = new Date().getDate() - 1
  if (lastCompletion.getDate() < yesterday) {
    await storage.resetStreak()
    return true
  }
  return false
}

export async function toggleUrlListener(toggle: boolean): Promise<void> {
  if (toggle) {
    // Save users request url for further redirect
    state.urlListener = (details: chrome.webRequest.WebRequestBodyDetails) => {
      if (
        !isLeetCodeUrl(details.url) &&
        details.type === "main_frame" &&
        !details.url.includes("chrome-extension:")
      ) {
        state.lastAttemptedUrl = details.url
      }
      return null // return null when no BlockingResponse is needed
    }

    chrome.webRequest.onBeforeRequest.addListener(state.urlListener, {
      urls: ["<all_urls>"]
    })
  } else {
    chrome.webRequest.onBeforeRequest.removeListener(state.urlListener)
  }
}
export async function handleRedirectRule() {
  const isRedirectEnabled = await storage.getEnableRedirectOnEveryProblem()
  if (isRedirectEnabled) {
    const problemUrl = await storage.getProblemUrl()
    await setRedirectRule(problemUrl)
  } else {
    try {
      chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [RULE_ID]
      })
      console.log("Redirect rule removed")
    } catch (error) {
      console.error("Error removing redirect rule:", error)
    }
  }
}
const getMsUntilMidnight = () => {
  const currentTime = Date.now()
  const midnight = new Date()
  midnight.setHours(24, 0, 0, 0)
  return midnight.getTime() - currentTime
}

chrome.runtime.onInstalled.addListener(async () => {
  await updateStorage()
  await tryResetStreak()
  await toggleUrlListener(await getHyperTortureMode())
})

chrome.alarms.get("midnightAlarm", (alarm) => {
  if (alarm) return
  const msUntilMidnight = getMsUntilMidnight()
  const oneDayInMinutes = 60 * 24
  chrome.alarms.create("midnightAlarm", {
    when: Date.now() + msUntilMidnight,
    periodInMinutes: oneDayInMinutes
  })
})

chrome.alarms.onAlarm.addListener(async () => {
  await updateStorage()
  await tryResetStreak()
})

// Need to add these listeners to global scope so that when the workers become inactive, they are set again
chrome.runtime.onMessage.addListener(onMessageReceived)
