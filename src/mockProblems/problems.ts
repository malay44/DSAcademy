import { Problem } from "../utils/types/problem";

export const problems: Problem[] = [
  {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array",
    order: 1,
    videoId: "8-k1C6ehKuw",
    problemStatement: `<p class='mt-3'>
  Given an array of integers <code>nums</code> and an integer <code>target</code>, return
  indices of the two numbers such that they add up to <code>target</code>.

  You may assume that each input would have <strong>exactly one solution</strong>, and you
  may not use thesame element twice.
</p>
<p class='mt-3'>You can return the answer in any order.</p>`,
    examples: [
      {
        id: 1,
        inputText: "nums = [2,7,11,15], target = 9",
        outputText: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        id: 2,
        inputText: "nums = [3,2,4], target = 6",
        outputText: "[1,2]",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
      },
      {
        id: 3,
        inputText: " nums = [3,3], target = 6",
        outputText: "[0,1]",
      },
    ],
    constraints: `<li class='mt-2'>
    <code>2 ≤ nums.length ≤ 10</code>
  </li> <li class='mt-2'>
  <code>-10 ≤ nums[i] ≤ 10</code>
  </li> <li class='mt-2'>
  <code>-10 ≤ target ≤ 10</code>
  </li>
  <li class='mt-2 text-sm'>
  <strong>Only one valid answer exists.</strong>
  </li>`,
    starterCode: `function twoSum(nums: number[], target: number): number[] {`,
    starterFunctionName: "function twoSum(",
    input: "4\n 2 7 11 15\n 9 4 5 6\n 8 6 3 3\n 6 3 2 4\n",
    answer: "0,1\n 0,2\n 0,3\n 1,2",
  },
  {
    id: "reverse-linked-list",
    title: "Reverse Linked List",
    difficulty: "Hard",
    category: "Linked List",
    order: 2,
    videoId: "",
  },
  {
    id: "jump-game",
    title: "Jump Game",
    difficulty: "Medium",
    category: "Dynamic Programming",
    order: 3,
    videoId: "",
  },
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stack",
    order: 4,
    videoId: "xty7fr-k0TU",
  },
  {
    id: "search-a-2d-matrix",
    title: "Search a 2D Matrix",
    difficulty: "Medium",
    category: "Binary Search",
    order: 5,
    videoId: "ZfFl4torNg4",
  },
  {
    id: "container-with-most-water",
    title: "Container With Most Water",
    difficulty: "Medium",
    category: "Two Pointers",
    order: 6,
    videoId: "",
  },
  {
    id: "merge-intervals",
    title: "Merge Intervals",
    difficulty: "Medium",
    category: "intervals",
    order: 7,
    videoId: "",
  },
  {
    id: "maximum-depth-of-binary-tree",
    title: "Maximum Depth of Binary Tree",
    difficulty: "Easy",
    category: "Tree",
    order: 8,
    videoId: "4qYTqOiRMoM",
  },
  {
    id: "best-time-to-buy-and-sell-stock",
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    category: "Array",
    order: 9,
    videoId: "",
  },
  {
    id: "subsets",
    title: "Subsets",
    difficulty: "Medium",
    category: "Backtracking",
    order: 10,
    videoId: "",
  },
];
