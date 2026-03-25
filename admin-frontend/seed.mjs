// Seed 10 LeetCode problems into the database via the API
const API = 'http://localhost:3000/api/v1/problems';

const problems = [
  {
    title: "Two Sum",
    description: "Given an array of integers `nums` and an integer `target`, return **indices of the two numbers** such that they add up to `target`.\n\nYou may assume that each input would have **exactly one solution**, and you may not use the same element twice.\n\nYou can return the answer in any order.\n\n### Example 1\n```\nInput: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: Because nums[0] + nums[1] == 9, we return [0, 1].\n```\n\n### Example 2\n```\nInput: nums = [3,2,4], target = 6\nOutput: [1,2]\n```\n\n### Constraints\n- `2 <= nums.length <= 10^4`\n- `-10^9 <= nums[i] <= 10^9`\n- Only one valid answer exists.",
    difficulty: "easy",
    testCases: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]" },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
      { input: "nums = [3,3], target = 6", output: "[0,1]" }
    ],
    editorial: "Use a hash map to store each number's index. For each element, check if `target - nums[i]` already exists in the map. Time: O(n), Space: O(n)."
  },
  {
    title: "Valid Parentheses",
    description: "Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is **valid**.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.\n\n### Example 1\n```\nInput: s = \"()\"\nOutput: true\n```\n\n### Example 2\n```\nInput: s = \"()[]{}\"\nOutput: true\n```\n\n### Example 3\n```\nInput: s = \"(]\"\nOutput: false\n```\n\n### Constraints\n- `1 <= s.length <= 10^4`\n- `s` consists of parentheses only `()[]{}`.",
    difficulty: "easy",
    testCases: [
      { input: "s = \"()\"", output: "true" },
      { input: "s = \"()[]{}\"", output: "true" },
      { input: "s = \"(]\"", output: "false" }
    ],
    editorial: "Use a stack. Push opening brackets, and for each closing bracket, check if it matches the top of the stack. Time: O(n), Space: O(n)."
  },
  {
    title: "Merge Two Sorted Lists",
    description: "You are given the heads of two sorted linked lists `list1` and `list2`.\n\nMerge the two lists into one **sorted** list. The list should be made by splicing together the nodes of the first two lists.\n\nReturn the head of the merged linked list.\n\n### Example 1\n```\nInput: list1 = [1,2,4], list2 = [1,3,4]\nOutput: [1,1,2,3,4,4]\n```\n\n### Example 2\n```\nInput: list1 = [], list2 = []\nOutput: []\n```\n\n### Constraints\n- The number of nodes in both lists is in the range `[0, 50]`.\n- `-100 <= Node.val <= 100`\n- Both lists are sorted in **non-decreasing** order.",
    difficulty: "easy",
    testCases: [
      { input: "list1 = [1,2,4], list2 = [1,3,4]", output: "[1,1,2,3,4,4]" },
      { input: "list1 = [], list2 = []", output: "[]" },
      { input: "list1 = [], list2 = [0]", output: "[0]" }
    ],
    editorial: "Use a dummy head node and iterate through both lists, always picking the smaller value. Append the remaining list at the end. Time: O(n+m), Space: O(1)."
  },
  {
    title: "Best Time to Buy and Sell Stock",
    description: "You are given an array `prices` where `prices[i]` is the price of a given stock on the `ith` day.\n\nYou want to maximize your profit by choosing a **single day** to buy one stock and choosing a **different day in the future** to sell that stock.\n\nReturn the **maximum profit** you can achieve from this transaction. If you cannot achieve any profit, return `0`.\n\n### Example 1\n```\nInput: prices = [7,1,5,3,6,4]\nOutput: 5\nExplanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.\n```\n\n### Example 2\n```\nInput: prices = [7,6,4,3,1]\nOutput: 0\nExplanation: No profitable transaction is possible.\n```\n\n### Constraints\n- `1 <= prices.length <= 10^5`\n- `0 <= prices[i] <= 10^4`",
    difficulty: "easy",
    testCases: [
      { input: "prices = [7,1,5,3,6,4]", output: "5" },
      { input: "prices = [7,6,4,3,1]", output: "0" }
    ],
    editorial: "Track the minimum price seen so far and the maximum profit at each step. Time: O(n), Space: O(1)."
  },
  {
    title: "Longest Substring Without Repeating Characters",
    description: "Given a string `s`, find the length of the **longest substring** without repeating characters.\n\n### Example 1\n```\nInput: s = \"abcabcbb\"\nOutput: 3\nExplanation: The answer is \"abc\", with the length of 3.\n```\n\n### Example 2\n```\nInput: s = \"bbbbb\"\nOutput: 1\nExplanation: The answer is \"b\", with the length of 1.\n```\n\n### Example 3\n```\nInput: s = \"pwwkew\"\nOutput: 3\nExplanation: The answer is \"wke\", with the length of 3.\n```\n\n### Constraints\n- `0 <= s.length <= 5 * 10^4`\n- `s` consists of English letters, digits, symbols and spaces.",
    difficulty: "medium",
    testCases: [
      { input: "s = \"abcabcbb\"", output: "3" },
      { input: "s = \"bbbbb\"", output: "1" },
      { input: "s = \"pwwkew\"", output: "3" }
    ],
    editorial: "Use the sliding window technique with a Set/Map. Expand the right pointer, and when a duplicate is found, shrink from the left. Time: O(n), Space: O(min(n,m))."
  },
  {
    title: "Container With Most Water",
    description: "You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `ith` line are `(i, 0)` and `(i, height[i])`.\n\nFind two lines that together with the x-axis form a container, such that the container contains the **most water**.\n\nReturn the **maximum amount of water** a container can store.\n\n### Example 1\n```\nInput: height = [1,8,6,2,5,4,8,3,7]\nOutput: 49\nExplanation: The max area is between index 1 and 8.\n```\n\n### Example 2\n```\nInput: height = [1,1]\nOutput: 1\n```\n\n### Constraints\n- `n == height.length`\n- `2 <= n <= 10^5`\n- `0 <= height[i] <= 10^4`",
    difficulty: "medium",
    testCases: [
      { input: "height = [1,8,6,2,5,4,8,3,7]", output: "49" },
      { input: "height = [1,1]", output: "1" }
    ],
    editorial: "Use two pointers starting at both ends. Move the pointer with the smaller height inward, tracking the max area. Time: O(n), Space: O(1)."
  },
  {
    title: "3Sum",
    description: "Given an integer array `nums`, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.\n\nNotice that the solution set must **not contain duplicate triplets**.\n\n### Example 1\n```\nInput: nums = [-1,0,1,2,-1,-4]\nOutput: [[-1,-1,2],[-1,0,1]]\nExplanation: The distinct triplets summing to 0.\n```\n\n### Example 2\n```\nInput: nums = [0,1,1]\nOutput: []\n```\n\n### Constraints\n- `3 <= nums.length <= 3000`\n- `-10^5 <= nums[i] <= 10^5`",
    difficulty: "medium",
    testCases: [
      { input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]" },
      { input: "nums = [0,1,1]", output: "[]" },
      { input: "nums = [0,0,0]", output: "[[0,0,0]]" }
    ],
    editorial: "Sort the array, then for each element use two pointers on the remaining subarray. Skip duplicates to avoid duplicate triplets. Time: O(n²), Space: O(1)."
  },
  {
    title: "Group Anagrams",
    description: "Given an array of strings `strs`, group **the anagrams** together. You can return the answer in **any order**.\n\nAn **anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, using all the original letters exactly once.\n\n### Example 1\n```\nInput: strs = [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]\nOutput: [[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]\n```\n\n### Example 2\n```\nInput: strs = [\"\"]\nOutput: [[\"\"]]\n```\n\n### Example 3\n```\nInput: strs = [\"a\"]\nOutput: [[\"a\"]]\n```\n\n### Constraints\n- `1 <= strs.length <= 10^4`\n- `0 <= strs[i].length <= 100`\n- `strs[i]` consists of lowercase English letters.",
    difficulty: "medium",
    testCases: [
      { input: "strs = [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]", output: "[[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]" },
      { input: "strs = [\"\"]", output: "[[\"\"]]" },
      { input: "strs = [\"a\"]", output: "[[\"a\"]]" }
    ],
    editorial: "Use a hash map with sorted characters as the key. Group all strings that share the same sorted key. Time: O(n * k log k), Space: O(n * k)."
  },
  {
    title: "Trapping Rain Water",
    description: "Given `n` non-negative integers representing an elevation map where the width of each bar is `1`, compute how much water it can trap after raining.\n\n### Example 1\n```\nInput: height = [0,1,0,2,1,0,1,3,2,1,2,1]\nOutput: 6\nExplanation: 6 units of rain water are trapped.\n```\n\n### Example 2\n```\nInput: height = [4,2,0,3,2,5]\nOutput: 9\n```\n\n### Constraints\n- `n == height.length`\n- `1 <= n <= 2 * 10^4`\n- `0 <= height[i] <= 10^5`",
    difficulty: "hard",
    testCases: [
      { input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6" },
      { input: "height = [4,2,0,3,2,5]", output: "9" }
    ],
    editorial: "Use two pointers from both ends. Track leftMax and rightMax. Add water based on which side is shorter. Time: O(n), Space: O(1)."
  },
  {
    title: "Merge K Sorted Lists",
    description: "You are given an array of `k` linked-lists `lists`, each linked-list is sorted in **ascending order**.\n\nMerge all the linked-lists into one sorted linked-list and return it.\n\n### Example 1\n```\nInput: lists = [[1,4,5],[1,3,4],[2,6]]\nOutput: [1,1,2,3,4,4,5,6]\n```\n\n### Example 2\n```\nInput: lists = []\nOutput: []\n```\n\n### Example 3\n```\nInput: lists = [[]]\nOutput: []\n```\n\n### Constraints\n- `k == lists.length`\n- `0 <= k <= 10^4`\n- `0 <= lists[i].length <= 500`\n- `-10^4 <= lists[i][j] <= 10^4`\n- `lists[i]` is sorted in **ascending order**.\n- The sum of `lists[i].length` will not exceed `10^4`.",
    difficulty: "hard",
    testCases: [
      { input: "lists = [[1,4,5],[1,3,4],[2,6]]", output: "[1,1,2,3,4,4,5,6]" },
      { input: "lists = []", output: "[]" },
      { input: "lists = [[]]", output: "[]" }
    ],
    editorial: "Use a min-heap (priority queue) to always extract the smallest node. Or use divide-and-conquer to merge pairs. Time: O(N log k), Space: O(k)."
  }
];

async function seed() {
  console.log('🌱 Seeding 10 LeetCode problems...\n');

  for (let i = 0; i < problems.length; i++) {
    const p = problems[i];
    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(p),
      });
      const data = await res.json();
      if (data.success) {
        console.log(`  ✅ [${i + 1}/10] "${p.title}" (${p.difficulty})`);
      } else {
        console.log(`  ❌ [${i + 1}/10] "${p.title}" — ${data.message}`);
      }
    } catch (err) {
      console.log(`  ❌ [${i + 1}/10] "${p.title}" — ${err.message}`);
    }
  }

  console.log('\n🎉 Seeding complete!');
}

seed();
