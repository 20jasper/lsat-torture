export type Category =
  | "Assumption"
  | "Weaken the Argument"
  | "Find the flaw in the Argument"
  | "Inference"
  | "Parallel flaw in the argument"
  | "Method of Reasoning"
  | "Point at Issue"
  | "Role Play"
  | "Strengthen"
  | "Justify the Conclusion (JTC)"
  | "Evaluate the Argument"
  | "Main Point"
  | "Cannot be Inferred"
  | "Principle"
  | "Resolve the Paradox"
  | "Parallel Reasoning"
  | "Variable"

export type Difficulty = "Easy" | "Medium" | "Hard" | "Challenging" | "Variable"

export type Problem = {
  href: string
  text: string
  category: Category
  difficulty: Difficulty
}

export const problems: Problem[] = [
  {
    href: "https://www.manhattanreview.com/free-lsat-practice-questions/?qbid=161",
    text: "Question LSAT-LR-1",
    category: "Assumption",
    difficulty: "Challenging"
  },
  {
    href: "https://www.manhattanreview.com/free-lsat-practice-questions/?qbid=162",
    text: "Question LSAT-LR-2",
    category: "Weaken the Argument",
    difficulty: "Challenging"
  },
  {
    href: "https://www.manhattanreview.com/free-lsat-practice-questions/?qbid=163",
    text: "Question LSAT-LR-3",
    category: "Find the flaw in the Argument",
    difficulty: "Challenging"
  },
  {
    href: "https://www.manhattanreview.com/free-lsat-practice-questions/?qbid=164",
    text: "Question LSAT-LR-4",
    category: "Inference",
    difficulty: "Challenging"
  },
  {
    href: "https://www.manhattanreview.com/free-lsat-practice-questions/?qbid=165",
    text: "Question LSAT-LR-5",
    category: "Parallel flaw in the argument",
    difficulty: "Hard"
  },
  {
    href: "https://www.manhattanreview.com/free-lsat-practice-questions/?qbid=166",
    text: "Question LSAT-LR-6",
    category: "Find the flaw in the Argument",
    difficulty: "Hard"
  },
  {
    href: "https://www.manhattanreview.com/free-lsat-practice-questions/?qbid=167",
    text: "Question LSAT-LR-7",
    category: "Find the flaw in the Argument",
    difficulty: "Hard"
  },
  {
    href: "https://www.manhattanreview.com/free-lsat-practice-questions/?qbid=168",
    text: "Question LSAT-LR-8",
    category: "Method of Reasoning",
    difficulty: "Hard"
  },
  {
    href: "https://www.manhattanreview.com/free-lsat-practice-questions/?qbid=169",
    text: "Question LSAT-LR-9",
    category: "Point at Issue",
    difficulty: "Challenging"
  },
  {
    href: "https://www.manhattanreview.com/free-lsat-practice-questions/?qbid=170",
    text: "Question LSAT-LR-10",
    category: "Role Play",
    difficulty: "Challenging"
  },
  {
    href: "https://www.manhattanreview.com/free-lsat-practice-questions/?qbid=183",
    text: "Question LSAT-LR-11",
    category: "Assumption",
    difficulty: "Hard"
  },
  {
    href: "https://www.manhattanreview.com/free-lsat-practice-questions/?qbid=184",
    text: "Question LSAT-LR-12",
    category: "Strengthen",
    difficulty: "Medium"
  },
  {
    href: "https://www.manhattanreview.com/free-lsat-practice-questions/?qbid=185",
    text: "Question LSAT-LR-13",
    category: "Strengthen",
    difficulty: "Hard"
  },
  {
    href: "https://www.manhattanreview.com/free-lsat-practice-questions/?qbid=186",
    text: "Question LSAT-LR-14",
    category: "Justify the Conclusion (JTC)",
    difficulty: "Easy"
  },
  {
    href: "https://www.manhattanreview.com/free-lsat-practice-questions/?qbid=187",
    text: "Question LSAT-LR-15",
    category: "Weaken the Argument",
    difficulty: "Medium"
  },
  {
    href: "https://www.manhattanreview.com/free-lsat-practice-questions/?qbid=188",
    text: "Question LSAT-LR-16",
    category: "Weaken the Argument",
    difficulty: "Hard"
  },
  {
    href: "https://www.manhattanreview.com/free-lsat-practice-questions/?qbid=189",
    text: "Question LSAT-LR-17",
    category: "Evaluate the Argument",
    difficulty: "Challenging"
  },
  {
    href: "https://www.manhattanreview.com/free-lsat-practice-questions/?qbid=190",
    text: "Question LSAT-LR-18",
    category: "Main Point",
    difficulty: "Hard"
  },
  {
    href: "https://www.manhattanreview.com/free-lsat-practice-questions/?qbid=191",
    text: "Question LSAT-LR-19",
    category: "Inference",
    difficulty: "Challenging"
  },
  {
    href: "https://www.manhattanreview.com/free-lsat-practice-questions/?qbid=192",
    text: "Question LSAT-LR-20",
    category: "Cannot be Inferred",
    difficulty: "Medium"
  },
  {
    href: "https://www.manhattanreview.com/free-lsat-practice-questions/?qbid=193",
    text: "Question LSAT-LR-21",
    category: "Assumption",
    difficulty: "Medium"
  },
  {
    href: "https://www.manhattanreview.com/free-lsat-practice-questions/?qbid=194",
    text: "Question LSAT-LR-22",
    category: "Principle",
    difficulty: "Challenging"
  },
  {
    href: "https://www.manhattanreview.com/free-lsat-practice-questions/?qbid=195",
    text: "Question LSAT-LR-23",
    category: "Role Play",
    difficulty: "Medium"
  },
  {
    href: "https://www.manhattanreview.com/free-lsat-practice-questions/?qbid=196",
    text: "Question LSAT-LR-24",
    category: "Inference",
    difficulty: "Medium"
  },
  {
    href: "https://www.manhattanreview.com/free-lsat-practice-questions/?qbid=197",
    text: "Question LSAT-LR-25",
    category: "Method of Reasoning",
    difficulty: "Challenging"
  },
  {
    href: "https://www.manhattanreview.com/free-lsat-practice-questions/?qbid=198",
    text: "Question LSAT-LR-26",
    category: "Resolve the Paradox",
    difficulty: "Challenging"
  },
  {
    href: "https://www.manhattanreview.com/free-lsat-practice-questions/?qbid=199",
    text: "Question LSAT-LR-27",
    category: "Parallel Reasoning",
    difficulty: "Medium"
  },
  {
    href: "https://www.manhattanreview.com/free-lsat-practice-questions/?qbid=200",
    text: "Question LSAT-LR-28",
    category: "Find the flaw in the Argument",
    difficulty: "Medium"
  },
  {
    href: "https://www.manhattanreview.com/free-lsat-practice-questions/?qbid=201",
    text: "Question LSAT-LR-29",
    category: "Justify the Conclusion (JTC)",
    difficulty: "Easy"
  },
  {
    href: "https://www.manhattanreview.com/free-lsat-practice-questions/?qbid=202",
    text: "Question LSAT-LR-30",
    category: "Point at Issue",
    difficulty: "Challenging"
  },
  {
    href: "https://www.manhattanreview.com/free-lsat-practice-questions/?qbid=171",
    text: "Question LSAT-LG-1",
    category: "Variable",
    difficulty: "Variable"
  },
  {
    href: "https://www.manhattanreview.com/free-lsat-practice-questions/?qbid=172",
    text: "Question LSAT-LG-2",
    category: "Variable",
    difficulty: "Variable"
  },
  {
    href: "https://www.manhattanreview.com/free-lsat-practice-questions/?qbid=181",
    text: "Question LSAT-LG-3",
    category: "Variable",
    difficulty: "Variable"
  },
  {
    href: "https://www.manhattanreview.com/free-lsat-practice-questions/?qbid=182",
    text: "Question LSAT-LG-4",
    category: "Variable",
    difficulty: "Variable"
  },
  {
    href: "https://www.manhattanreview.com/free-lsat-practice-questions/?qbid=204",
    text: "Question LSAT-LG-5",
    category: "Variable",
    difficulty: "Variable"
  },
  {
    href: "https://www.manhattanreview.com/free-lsat-practice-questions/?qbid=205",
    text: "Question LSAT-LG-6",
    category: "Variable",
    difficulty: "Variable"
  },
  {
    href: "https://www.manhattanreview.com/free-lsat-practice-questions/?qbid=173",
    text: "Question LSAT-RC-1",
    category: "Variable",
    difficulty: "Variable"
  },
  {
    href: "https://www.manhattanreview.com/free-lsat-practice-questions/?qbid=179",
    text: "Question LSAT-RC-2",
    category: "Variable",
    difficulty: "Variable"
  },
  {
    href: "https://www.manhattanreview.com/free-lsat-practice-questions/?qbid=180",
    text: "Question LSAT-RC-3",
    category: "Variable",
    difficulty: "Variable"
  },
  {
    href: "https://www.manhattanreview.com/free-lsat-practice-questions/?qbid=203",
    text: "Question LSAT-RC-4",
    category: "Variable",
    difficulty: "Variable"
  }
]
