export const PROBLEMS_DATA = [
  {
    id: 1,
    title: 'Two Sum',
    titleHe: 'סכום שניים',
    topic: 'Arrays & Hashing',
    difficulty: 'easy',
    acceptance: 78,
    companies: ['Google', 'Amazon', 'Meta'],
    descriptionHe: 'בהינתן מערך של מספרים שלמים ומספר יעד, מצאו שני מספרים במערך שסכומם שווה ליעד. החזירו את האינדקסים של שני המספרים. ניתן להניח שלכל קלט יש בדיוק פתרון אחד, ואי אפשר להשתמש באותו איבר פעמיים.',
    examples: [
      { input: 'nums = [2, 7, 11, 15], target = 9', output: '[0, 1]', explanation: 'nums[0] + nums[1] = 2 + 7 = 9' },
      { input: 'nums = [3, 2, 4], target = 6', output: '[1, 2]' },
      { input: 'nums = [3, 3], target = 6', output: '[0, 1]' },
    ],
    constraints: [
      '2 <= len(nums) <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'קיים בדיוק פתרון אחד',
    ],
    starterCode: {
      python: `def two_sum(nums, target):
    """Given an array of integers and a target, return indices of two numbers that add up to target."""
    pass`,
    },
    functionName: 'two_sum',
    testCases: [
      { inputs: [[2, 7, 11, 15], 9], expected: [0, 1], label: 'דוגמה בסיסית' },
      { inputs: [[3, 2, 4], 6], expected: [1, 2], label: 'איברים לא רצופים' },
      { inputs: [[3, 3], 6], expected: [0, 1], label: 'ערכים זהים' },
    ],
    hints: [
      { title: 'רמז 1: מבנה נתונים', content: 'חשבו על מבנה נתונים שמאפשר חיפוש ב-O(1). Hash Map יכול לעזור כאן.' },
      { title: 'רמז 2: Complement', content: 'לכל מספר num, חשבו על complement = target - num. אם ה-complement כבר נמצא ב-Map, מצאתם תשובה!' },
      { title: 'רמז 3: מעבר אחד', content: 'אפשר לפתור בסריקה אחת: לכל מספר, בדקו אם ה-complement קיים ב-Map, ואם לא - הוסיפו את המספר הנוכחי.' },
    ],
  },
  {
    id: 2,
    title: 'Valid Parentheses',
    titleHe: 'סוגריים תקינים',
    topic: 'Stack',
    difficulty: 'easy',
    acceptance: 72,
    companies: ['Microsoft', 'Amazon'],
    descriptionHe: 'בהינתן מחרוזת המכילה רק את התווים \'(\', \')\', \'{\', \'}\', \'[\', \']\', קבעו האם המחרוזת תקינה. מחרוזת תקינה אם כל סוגר נפתח נסגר בסוגר מהסוג הנכון ובסדר הנכון. מחרוזת ריקה נחשבת תקינה.',
    examples: [
      { input: 's = "()"', output: 'True' },
      { input: 's = "()[]{}"', output: 'True' },
      { input: 's = "(]"', output: 'False' },
    ],
    constraints: [
      '0 <= len(s) <= 10^4',
      's מכילה רק את התווים ()[]{}',
    ],
    starterCode: {
      python: `def is_valid(s):
    """Determine if the input string of brackets is valid."""
    pass`,
    },
    functionName: 'is_valid',
    testCases: [
      { inputs: ['()'], expected: true, label: 'זוג בודד' },
      { inputs: ['()[]{}'], expected: true, label: 'שלושה סוגים' },
      { inputs: ['(]'], expected: false, label: 'סוגר לא תואם' },
      { inputs: ['([)]'], expected: false, label: 'סדר שגוי' },
      { inputs: ['{[]}'], expected: true, label: 'סוגריים מקוננים' },
    ],
    hints: [
      { title: 'רמז 1: מבנה נתונים', content: 'חשבו על Stack - מבנה LIFO. כל סוגר פותח נדחף, וכל סוגר סוגר צריך להתאים לאחרון שנדחף.' },
      { title: 'רמז 2: מיפוי', content: 'צרו מיפוי בין סוגר סוגר לסוגר פותח: \')\' → \'(\', \']\' → \'[\', \'}\' → \'{\'.' },
    ],
  },
  {
    id: 3,
    title: 'Merge Two Sorted Lists',
    titleHe: 'מיזוג שני מערכים ממוינים',
    topic: 'Linked List',
    difficulty: 'easy',
    acceptance: 68,
    companies: ['Amazon', 'Apple'],
    descriptionHe: 'בהינתן שני מערכים ממוינים בסדר עולה, מזגו אותם למערך ממוין אחד. המערך המוחזר צריך להיות ממוין בסדר עולה. אם אחד המערכים ריק, החזירו את השני כמו שהוא.',
    examples: [
      { input: 'list1 = [1, 2, 4], list2 = [1, 3, 4]', output: '[1, 1, 2, 3, 4, 4]' },
      { input: 'list1 = [], list2 = []', output: '[]' },
      { input: 'list1 = [], list2 = [0]', output: '[0]' },
    ],
    constraints: [
      '0 <= len(list1), len(list2) <= 50',
      '-100 <= list1[i], list2[i] <= 100',
      'שני המערכים ממוינים בסדר עולה',
    ],
    starterCode: {
      python: `def merge_two_lists(list1, list2):
    """Merge two sorted arrays into one sorted array."""
    pass`,
    },
    functionName: 'merge_two_lists',
    testCases: [
      { inputs: [[1, 2, 4], [1, 3, 4]], expected: [1, 1, 2, 3, 4, 4], label: 'דוגמה בסיסית' },
      { inputs: [[], []], expected: [], label: 'שני מערכים ריקים' },
      { inputs: [[], [0]], expected: [0], label: 'מערך אחד ריק' },
    ],
    hints: [
      { title: 'רמז 1: שני מצביעים', content: 'השתמשו בשני אינדקסים, אחד לכל מערך. בכל שלב, הוסיפו את הערך הקטן יותר למערך התוצאה.' },
      { title: 'רמז 2: שאריות', content: 'כשמערך אחד נגמר, הוסיפו את כל מה שנשאר מהמערך השני.' },
    ],
  },
  {
    id: 4,
    title: 'Best Time to Buy and Sell Stock',
    titleHe: 'הזמן הטוב ביותר לקנות ולמכור מניה',
    topic: 'Arrays',
    difficulty: 'easy',
    acceptance: 65,
    companies: ['Amazon', 'Meta'],
    descriptionHe: 'בהינתן מערך prices כאשר prices[i] הוא מחיר מניה ביום ה-i, מצאו את הרווח המקסימלי שניתן להשיג מקנייה ומכירה אחת. אם אין אפשרות לרווח, החזירו 0. שימו לב: חייבים לקנות לפני שמוכרים.',
    examples: [
      { input: 'prices = [7, 1, 5, 3, 6, 4]', output: '5', explanation: 'קונים ביום 2 (מחיר 1) ומוכרים ביום 5 (מחיר 6), רווח = 6-1 = 5' },
      { input: 'prices = [7, 6, 4, 3, 1]', output: '0', explanation: 'אין רווח אפשרי, המחירים רק יורדים' },
    ],
    constraints: [
      '1 <= len(prices) <= 10^5',
      '0 <= prices[i] <= 10^4',
    ],
    starterCode: {
      python: `def max_profit(prices):
    """Find the maximum profit from buying and selling a stock once."""
    pass`,
    },
    functionName: 'max_profit',
    testCases: [
      { inputs: [[7, 1, 5, 3, 6, 4]], expected: 5, label: 'רווח אפשרי' },
      { inputs: [[7, 6, 4, 3, 1]], expected: 0, label: 'אין רווח' },
      { inputs: [[2, 4, 1]], expected: 2, label: 'רווח מוקדם' },
      { inputs: [[1]], expected: 0, label: 'יום בודד' },
    ],
    hints: [
      { title: 'רמז 1: מעבר אחד', content: 'ניתן לפתור במעבר אחד על המערך. שמרו את המחיר המינימלי שראיתם עד כה.' },
      { title: 'רמז 2: רווח מקסימלי', content: 'בכל יום, הרווח הפוטנציאלי הוא המחיר הנוכחי פחות המינימום שראינו. עדכנו את המקסימום בהתאם.' },
    ],
  },
  {
    id: 5,
    title: 'Valid Palindrome',
    titleHe: 'פלינדרום תקין',
    topic: 'Two Pointers',
    difficulty: 'easy',
    acceptance: 70,
    companies: ['Microsoft'],
    descriptionHe: 'בהינתן מחרוזת, קבעו האם היא פלינדרום. התחשבו רק בתווים אלפאנומריים (אותיות ומספרים) והתעלמו מהבדלי אותיות גדולות וקטנות. מחרוזת ריקה נחשבת פלינדרום.',
    examples: [
      { input: 's = "A man, a plan, a canal: Panama"', output: 'True', explanation: 'אחרי סינון: "amanaplanacanalpanama" - פלינדרום' },
      { input: 's = "race a car"', output: 'False' },
      { input: 's = " "', output: 'True', explanation: 'מחרוזת ריקה לאחר סינון' },
    ],
    constraints: [
      '1 <= len(s) <= 2 * 10^5',
      's מכילה תווי ASCII בלבד',
    ],
    starterCode: {
      python: `def is_palindrome(s):
    """Check if a string is a palindrome, considering only alphanumeric characters."""
    pass`,
    },
    functionName: 'is_palindrome',
    testCases: [
      { inputs: ['A man, a plan, a canal: Panama'], expected: true, label: 'פלינדרום עם סימנים' },
      { inputs: ['race a car'], expected: false, label: 'לא פלינדרום' },
      { inputs: [' '], expected: true, label: 'רווח בלבד' },
    ],
    hints: [
      { title: 'רמז 1: סינון', content: 'סננו את המחרוזת כך שתישאר רק עם תווים אלפאנומריים והמירו לאותיות קטנות.' },
      { title: 'רמז 2: שני מצביעים', content: 'השתמשו בשני מצביעים - אחד מתחילת המחרוזת ואחד מהסוף. השוו תווים והתקדמו פנימה.' },
    ],
  },
  {
    id: 6,
    title: 'Longest Substring Without Repeating',
    titleHe: 'תת-מחרוזת ארוכה ביותר ללא חזרות',
    topic: 'Sliding Window',
    difficulty: 'medium',
    acceptance: 45,
    companies: ['Google', 'Amazon', 'Meta'],
    descriptionHe: 'בהינתן מחרוזת, מצאו את אורך התת-מחרוזת הארוכה ביותר שלא מכילה תווים חוזרים. לדוגמה, במחרוזת "abcabcbb" התת-מחרוזת הארוכה ביותר ללא חזרות היא "abc" באורך 3.',
    examples: [
      { input: 's = "abcabcbb"', output: '3', explanation: 'התת-מחרוזת היא "abc"' },
      { input: 's = "bbbbb"', output: '1', explanation: 'התת-מחרוזת היא "b"' },
      { input: 's = "pwwkew"', output: '3', explanation: 'התת-מחרוזת היא "wke"' },
    ],
    constraints: [
      '0 <= len(s) <= 5 * 10^4',
      's מכילה אותיות, ספרות, סימנים ורווחים',
    ],
    starterCode: {
      python: `def length_of_longest_substring(s):
    """Find the length of the longest substring without repeating characters."""
    pass`,
    },
    functionName: 'length_of_longest_substring',
    testCases: [
      { inputs: ['abcabcbb'], expected: 3, label: 'חזרה באמצע' },
      { inputs: ['bbbbb'], expected: 1, label: 'תו חוזר' },
      { inputs: ['pwwkew'], expected: 3, label: 'תת-מחרוזת בסוף' },
      { inputs: [''], expected: 0, label: 'מחרוזת ריקה' },
    ],
    hints: [
      { title: 'רמז 1: חלון הזזה', content: 'חשבו על טכניקת Sliding Window - חלון שמתרחב ומתכווץ לפי הצורך.' },
      { title: 'רמז 2: Set או Map', content: 'השתמשו ב-Set לעקוב אחרי התווים בחלון הנוכחי. כשנתקלים בתו חוזר, הזיזו את תחילת החלון.' },
      { title: 'רמז 3: אופטימיזציה', content: 'במקום Set, ניתן להשתמש ב-Map ששומר את האינדקס האחרון של כל תו, כדי לקפוץ ישירות.' },
    ],
  },
  {
    id: 7,
    title: '3Sum',
    titleHe: 'סכום שלושה',
    topic: 'Two Pointers',
    difficulty: 'medium',
    acceptance: 38,
    companies: ['Google', 'Meta'],
    descriptionHe: 'בהינתן מערך של מספרים שלמים, מצאו את כל השלשות הייחודיות שסכומן שווה לאפס. אסור שהתוצאה תכיל שלשות כפולות. החזירו רשימה ממוינת של שלשות, כאשר כל שלשה ממוינת בסדר עולה.',
    examples: [
      { input: 'nums = [-1, 0, 1, 2, -1, -4]', output: '[[-1, -1, 2], [-1, 0, 1]]' },
      { input: 'nums = [0, 1, 1]', output: '[]' },
      { input: 'nums = [0, 0, 0]', output: '[[0, 0, 0]]' },
    ],
    constraints: [
      '3 <= len(nums) <= 3000',
      '-10^5 <= nums[i] <= 10^5',
    ],
    starterCode: {
      python: `def three_sum(nums):
    """Find all unique triplets that sum to zero. Return sorted list of sorted triplets."""
    pass`,
    },
    functionName: 'three_sum',
    testCases: [
      { inputs: [[-1, 0, 1, 2, -1, -4]], expected: [[-1, -1, 2], [-1, 0, 1]], label: 'דוגמה בסיסית' },
      { inputs: [[0, 1, 1]], expected: [], label: 'אין שלשה' },
      { inputs: [[0, 0, 0]], expected: [[0, 0, 0]], label: 'אפסים בלבד' },
    ],
    hints: [
      { title: 'רמז 1: מיון', content: 'מיינו את המערך תחילה. זה מאפשר שימוש בשני מצביעים ומונע כפילויות.' },
      { title: 'רמז 2: שני מצביעים', content: 'לכל איבר, השתמשו בשני מצביעים (אחד אחריו ואחד מהסוף) כדי למצוא זוג שמשלים לאפס.' },
      { title: 'רמז 3: דילוג על כפילויות', content: 'דלגו על ערכים זהים עוקבים כדי למנוע שלשות כפולות בתוצאה.' },
    ],
  },
  {
    id: 8,
    title: 'Container With Most Water',
    titleHe: 'המיכל עם הכי הרבה מים',
    topic: 'Two Pointers',
    difficulty: 'medium',
    acceptance: 42,
    companies: ['Amazon', 'Microsoft'],
    descriptionHe: 'בהינתן מערך של מספרים שלמים חיוביים height, כאשר כל איבר מייצג גובה קו אנכי, מצאו שני קווים שיחד עם ציר ה-x יוצרים מיכל שמכיל הכי הרבה מים. החזירו את כמות המים המקסימלית.',
    examples: [
      { input: 'height = [1, 8, 6, 2, 5, 4, 8, 3, 7]', output: '49', explanation: 'הקווים באינדקס 1 ו-8 (גובה 8 ו-7) יוצרים מיכל בנפח 7 * 7 = 49' },
      { input: 'height = [1, 1]', output: '1' },
    ],
    constraints: [
      '2 <= len(height) <= 10^5',
      '0 <= height[i] <= 10^4',
    ],
    starterCode: {
      python: `def max_area(height):
    """Find two lines that form a container with the most water."""
    pass`,
    },
    functionName: 'max_area',
    testCases: [
      { inputs: [[1, 8, 6, 2, 5, 4, 8, 3, 7]], expected: 49, label: 'דוגמה בסיסית' },
      { inputs: [[1, 1]], expected: 1, label: 'שני איברים' },
      { inputs: [[4, 3, 2, 1, 4]], expected: 16, label: 'איברים זהים בקצוות' },
    ],
    hints: [
      { title: 'רמז 1: שני מצביעים', content: 'התחילו עם שני מצביעים בקצוות המערך. השטח הוא min(height[l], height[r]) * (r - l).' },
      { title: 'רמז 2: כיוון ההזזה', content: 'הזיזו את המצביע עם הגובה הנמוך יותר פנימה - זו הדרך היחידה שיכולה לשפר את השטח.' },
    ],
  },
  {
    id: 9,
    title: 'Group Anagrams',
    titleHe: 'קיבוץ אנגרמות',
    topic: 'Arrays & Hashing',
    difficulty: 'medium',
    acceptance: 55,
    companies: ['Google', 'Amazon'],
    descriptionHe: 'בהינתן מערך של מחרוזות, קבצו יחד את כל האנגרמות. אנגרמות הן מילים המורכבות מאותן אותיות בסדר שונה. החזירו רשימת קבוצות, כאשר כל קבוצה ממוינת לפי סדר אלפביתי, והקבוצות ממוינות לפי האיבר הראשון בכל קבוצה.',
    examples: [
      { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["ate","eat","tea"],["bat"],["nat","tan"]]' },
      { input: 'strs = [""]', output: '[[""]]' },
      { input: 'strs = ["a"]', output: '[["a"]]' },
    ],
    constraints: [
      '1 <= len(strs) <= 10^4',
      '0 <= len(strs[i]) <= 100',
      'strs[i] מכילה רק אותיות קטנות באנגלית',
    ],
    starterCode: {
      python: `def group_anagrams(strs):
    """Group anagrams together. Return sorted groups with sorted elements."""
    pass`,
    },
    functionName: 'group_anagrams',
    testCases: [
      { inputs: [['eat', 'tea', 'tan', 'ate', 'nat', 'bat']], expected: [['ate', 'eat', 'tea'], ['bat'], ['nat', 'tan']], label: 'קבוצות מרובות' },
      { inputs: [['']],  expected: [['']], label: 'מחרוזת ריקה' },
      { inputs: [['a']], expected: [['a']], label: 'תו בודד' },
    ],
    hints: [
      { title: 'רמז 1: מיון כמפתח', content: 'שתי מילים הן אנגרמות אם לאחר מיון האותיות שלהן מתקבלת אותה מחרוזת.' },
      { title: 'רמז 2: Dictionary', content: 'השתמשו ב-Dictionary כאשר המפתח הוא המילה הממוינת והערך הוא רשימת כל האנגרמות.' },
    ],
  },
  {
    id: 10,
    title: 'Binary Tree Level Order',
    titleHe: 'מעבר על עץ בינארי לפי רמות',
    topic: 'Trees',
    difficulty: 'medium',
    acceptance: 48,
    companies: ['Meta', 'Microsoft'],
    descriptionHe: 'בהינתן עץ בינארי המיוצג כמערך בשיטת level-order (כאשר None מייצג צומת חסר), החזירו את ערכי הצמתים בכל רמה. כל רמה תוחזר כרשימה נפרדת. לצומת באינדקס i, הילד השמאלי נמצא ב-2*i+1 והימני ב-2*i+2.',
    examples: [
      { input: 'root = [3, 9, 20, None, None, 15, 7]', output: '[[3], [9, 20], [15, 7]]' },
      { input: 'root = [1]', output: '[[1]]' },
      { input: 'root = []', output: '[]' },
    ],
    constraints: [
      '0 <= מספר צמתים <= 2000',
      '-1000 <= ערך צומת <= 1000',
    ],
    starterCode: {
      python: `def level_order(root):
    """Given a binary tree as level-order array (None for missing nodes), return values at each level."""
    pass`,
    },
    functionName: 'level_order',
    testCases: [
      { inputs: [[3, 9, 20, null, null, 15, 7]], expected: [[3], [9, 20], [15, 7]], label: 'עץ שלם' },
      { inputs: [[1]], expected: [[1]], label: 'צומת בודד' },
      { inputs: [[]], expected: [], label: 'עץ ריק' },
      { inputs: [[1, 2, 3, 4, 5]], expected: [[1], [2, 3], [4, 5]], label: 'עץ חלקי' },
    ],
    hints: [
      { title: 'רמז 1: BFS', content: 'השתמשו ב-BFS (חיפוש לרוחב) עם תור. עברו על העץ רמה-רמה.' },
      { title: 'רמז 2: בניית העץ', content: 'בנו את העץ מהמערך: לצומת באינדקס i, הילד השמאלי הוא 2*i+1 והימני 2*i+2.' },
      { title: 'רמז 3: עיבוד רמות', content: 'בכל איטרציה, עבדו את כל הצמתים ברמה הנוכחית (לפי גודל התור) לפני המעבר לרמה הבאה.' },
    ],
  },
  {
    id: 11,
    title: 'Coin Change',
    titleHe: 'החלפת מטבעות',
    topic: 'Dynamic Programming',
    difficulty: 'medium',
    acceptance: 35,
    companies: ['Google', 'Amazon'],
    descriptionHe: 'בהינתן מערך של ערכי מטבעות וסכום יעד, מצאו את מספר המטבעות המינימלי הדרוש להרכבת הסכום. אם אי אפשר להרכיב את הסכום, החזירו -1. ניתן להשתמש בכל מטבע מספר בלתי מוגבל של פעמים.',
    examples: [
      { input: 'coins = [1, 5, 10, 25], amount = 30', output: '2', explanation: '25 + 5 = 30' },
      { input: 'coins = [2], amount = 3', output: '-1', explanation: 'אי אפשר להרכיב 3 עם מטבעות של 2' },
      { input: 'coins = [1], amount = 0', output: '0' },
    ],
    constraints: [
      '1 <= len(coins) <= 12',
      '1 <= coins[i] <= 2^31 - 1',
      '0 <= amount <= 10^4',
    ],
    starterCode: {
      python: `def coin_change(coins, amount):
    """Find minimum number of coins needed to make the amount. Return -1 if impossible."""
    pass`,
    },
    functionName: 'coin_change',
    testCases: [
      { inputs: [[1, 5, 10, 25], 30], expected: 2, label: 'שני מטבעות' },
      { inputs: [[2], 3], expected: -1, label: 'בלתי אפשרי' },
      { inputs: [[1], 0], expected: 0, label: 'סכום אפס' },
      { inputs: [[1, 2, 5], 11], expected: 3, label: '5+5+1=11' },
    ],
    hints: [
      { title: 'רמז 1: תכנות דינמי', content: 'זו בעיית DP קלאסית. חשבו על תת-בעיות: מה המספר המינימלי של מטבעות לכל סכום מ-0 עד amount?' },
      { title: 'רמז 2: מערך DP', content: 'צרו מערך dp בגודל amount+1 מאותחל ל-infinity. dp[0] = 0. לכל סכום, בדקו כל מטבע.' },
      { title: 'רמז 3: נוסחת מעבר', content: 'dp[i] = min(dp[i], dp[i - coin] + 1) לכל מטבע coin כאשר coin <= i.' },
    ],
  },
  {
    id: 12,
    title: 'LRU Cache',
    titleHe: 'מטמון LRU',
    topic: 'Design',
    difficulty: 'hard',
    acceptance: 28,
    companies: ['Google', 'Meta', 'Amazon'],
    descriptionHe: 'ממשו מטמון LRU (Least Recently Used). המטמון מאותחל עם קיבולת נתונה ותומך בפעולות get ו-put. פעולת get מחזירה את הערך של המפתח אם קיים, אחרת -1. פעולת put מוסיפה או מעדכנת ערך, ואם המטמון מלא - מסירה את האיבר שהשתמשו בו הכי פחות לאחרונה. הפונקציה מקבלת קיבולת, רשימת פעולות ורשימת ארגומנטים, ומחזירה רשימת תוצאות (None עבור put).',
    examples: [
      {
        input: 'capacity=2, operations=["put","put","get","put","get","put","get","get","get"], args=[[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]',
        output: '[None, None, 1, None, -1, None, -1, 3, 4]',
        explanation: 'put(1,1), put(2,2), get(1)→1, put(3,3) מסיר key=2, get(2)→-1, put(4,4) מסיר key=1, get(1)→-1, get(3)→3, get(4)→4',
      },
    ],
    constraints: [
      '1 <= capacity <= 3000',
      '0 <= key <= 10^4',
      '0 <= value <= 10^5',
      'פעולות get ו-put בזמן O(1)',
    ],
    starterCode: {
      python: `def lru_cache_operations(capacity, operations, args):
    """Simulate LRU Cache. Return list of results (None for put, value or -1 for get)."""
    pass`,
    },
    functionName: 'lru_cache_operations',
    testCases: [
      {
        inputs: [2, ['put', 'put', 'get', 'put', 'get', 'put', 'get', 'get', 'get'], [[1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]],
        expected: [null, null, 1, null, -1, null, -1, 3, 4],
        label: 'דוגמה בסיסית',
      },
      {
        inputs: [1, ['put', 'put', 'get', 'get'], [[1, 10], [2, 20], [1], [2]]],
        expected: [null, null, -1, 20],
        label: 'קיבולת 1',
      },
      {
        inputs: [2, ['put', 'get', 'put', 'get', 'get'], [[2, 1], [2], [3, 2], [2], [3]]],
        expected: [null, 1, null, 1, 2],
        label: 'עדכון גישה',
      },
    ],
    hints: [
      { title: 'רמז 1: מבני נתונים', content: 'שלבו Dictionary עם רשימה מקושרת דו-כיוונית, או השתמשו ב-OrderedDict של Python.' },
      { title: 'רמז 2: OrderedDict', content: 'ב-Python, collections.OrderedDict תומך ב-move_to_end ו-popitem שמתאימים בדיוק ל-LRU.' },
    ],
  },
  {
    id: 13,
    title: 'Merge K Sorted Lists',
    titleHe: 'מיזוג K רשימות ממוינות',
    topic: 'Linked List',
    difficulty: 'hard',
    acceptance: 25,
    companies: ['Amazon', 'Google'],
    descriptionHe: 'בהינתן k רשימות ממוינות, מזגו את כולן לרשימה ממוינת אחת. החזירו את הרשימה הממוזגת בסדר עולה. זהו הרחבה של מיזוג שתי רשימות, אבל כאן צריך לטפל ב-k רשימות בצורה יעילה.',
    examples: [
      { input: 'lists = [[1,4,5],[1,3,4],[2,6]]', output: '[1,1,2,3,4,4,5,6]' },
      { input: 'lists = []', output: '[]' },
      { input: 'lists = [[]]', output: '[]' },
    ],
    constraints: [
      '0 <= k <= 10^4',
      '0 <= len(lists[i]) <= 500',
      '-10^4 <= lists[i][j] <= 10^4',
      'כל רשימה ממוינת בסדר עולה',
    ],
    starterCode: {
      python: `def merge_k_lists(lists):
    """Merge k sorted lists into one sorted list."""
    pass`,
    },
    functionName: 'merge_k_lists',
    testCases: [
      { inputs: [[[1, 4, 5], [1, 3, 4], [2, 6]]], expected: [1, 1, 2, 3, 4, 4, 5, 6], label: 'שלוש רשימות' },
      { inputs: [[]], expected: [], label: 'רשימה ריקה' },
      { inputs: [[[]]],  expected: [], label: 'רשימה עם רשימה ריקה' },
    ],
    hints: [
      { title: 'רמז 1: Heap', content: 'השתמשו ב-Min Heap (תור עדיפויות) כדי לבחור תמיד את האיבר הקטן ביותר מבין כל הרשימות.' },
      { title: 'רמז 2: חלוקה ומיזוג', content: 'גישה חלופית: מזגו זוגות של רשימות בכל שלב (Divide and Conquer), כמו Merge Sort.' },
    ],
  },
  {
    id: 14,
    title: 'Trapping Rain Water',
    titleHe: 'לכידת מי גשם',
    topic: 'Two Pointers',
    difficulty: 'hard',
    acceptance: 22,
    companies: ['Google', 'Amazon', 'Meta'],
    descriptionHe: 'בהינתן מערך של מספרים שלמים לא-שליליים המייצגים מפת גבהים, חשבו כמה מים ניתן לאגור אחרי גשם. כל איבר במערך מייצג רוחב 1 וגובה כנתון. המים נאגרים בין עמודות גבוהות יותר.',
    examples: [
      { input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', output: '6' },
      { input: 'height = [4,2,0,3,2,5]', output: '9' },
    ],
    constraints: [
      '0 <= len(height) <= 2 * 10^4',
      '0 <= height[i] <= 10^5',
    ],
    starterCode: {
      python: `def trap(height):
    """Calculate how much rainwater can be trapped between the bars."""
    pass`,
    },
    functionName: 'trap',
    testCases: [
      { inputs: [[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]], expected: 6, label: 'דוגמה בסיסית' },
      { inputs: [[4, 2, 0, 3, 2, 5]], expected: 9, label: 'בור עמוק' },
      { inputs: [[1, 0, 1]], expected: 1, label: 'מינימלי' },
      { inputs: [[3, 0, 0, 2, 0, 4]], expected: 10, label: 'עמודות גבוהות' },
    ],
    hints: [
      { title: 'רמז 1: חשיבה על כל עמודה', content: 'לכל עמודה, כמות המים מעליה = min(max_left, max_right) - height. חשבו איך לחשב את המקסימום מכל צד.' },
      { title: 'רמז 2: שני מצביעים', content: 'ניתן לפתור ב-O(1) זיכרון עם שני מצביעים מהקצוות, תוך שמירת left_max ו-right_max.' },
      { title: 'רמז 3: גישת מערכים', content: 'גישה פשוטה יותר: חשבו מראש שני מערכי עזר - max_left[i] ו-max_right[i] לכל אינדקס.' },
    ],
  },
  {
    id: 15,
    title: 'Word Search II',
    titleHe: 'חיפוש מילים בלוח II',
    topic: 'Backtracking',
    difficulty: 'hard',
    acceptance: 18,
    companies: ['Google', 'Microsoft'],
    descriptionHe: 'בהינתן לוח דו-ממדי של אותיות ורשימת מילים, מצאו את כל המילים מהרשימה שניתן למצוא בלוח. ניתן לבנות מילה על-ידי מעבר בין תאים סמוכים (אופקית או אנכית). כל תא ניתן לשימוש פעם אחת בלבד בכל מילה. החזירו רשימה ממוינת של מילים שנמצאו.',
    examples: [
      { input: 'board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]', output: '["eat","oath"]' },
      { input: 'board = [["a","b"],["c","d"]], words = ["abcb"]', output: '[]' },
    ],
    constraints: [
      '1 <= rows, cols <= 12',
      'board[i][j] הוא אות קטנה באנגלית',
      '1 <= len(words) <= 3 * 10^4',
      '1 <= len(words[i]) <= 10',
    ],
    starterCode: {
      python: `def find_words(board, words):
    """Find all words from the list that exist in the board. Return sorted list."""
    pass`,
    },
    functionName: 'find_words',
    testCases: [
      {
        inputs: [[['o', 'a', 'a', 'n'], ['e', 't', 'a', 'e'], ['i', 'h', 'k', 'r'], ['i', 'f', 'l', 'v']], ['oath', 'pea', 'eat', 'rain']],
        expected: ['eat', 'oath'],
        label: 'לוח 4x4',
      },
      {
        inputs: [[['a', 'b'], ['c', 'd']], ['abcb']],
        expected: [],
        label: 'לא ניתן לחזור',
      },
      {
        inputs: [[['a']], ['a']],
        expected: ['a'],
        label: 'תא בודד',
      },
    ],
    hints: [
      { title: 'רמז 1: Trie', content: 'בנו Trie (עץ קידומות) מרשימת המילים. זה מאפשר חיפוש יעיל של כמה מילים במקביל.' },
      { title: 'רמז 2: DFS/Backtracking', content: 'מכל תא בלוח, הפעילו DFS. בכל צעד, בדקו אם הנתיב הנוכחי קיים ב-Trie.' },
      { title: 'רמז 3: אופטימיזציות', content: 'סמנו תאים כ-"בשימוש" בזמן החיפוש ושחררו אותם בחזרה (Backtracking). הסירו מילים מה-Trie אחרי שנמצאו.' },
    ],
  },
];

export function getProblemById(id) {
  return PROBLEMS_DATA.find((p) => p.id === id);
}
