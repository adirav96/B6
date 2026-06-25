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
  {
    id: 16,
    title: 'Contains Duplicate',
    titleHe: 'מכיל כפילויות',
    topic: 'Arrays & Hashing',
    difficulty: 'easy',
    acceptance: 61,
    companies: ['Amazon', 'Google', 'Apple'],
    descriptionHe: 'בהינתן מערך של מספרים שלמים nums, החזירו true אם קיים ערך כלשהו שמופיע לפחות פעמיים במערך. החזירו false אם כל אחד מהערכים הוא ייחודי. בעיה זו היא אחת הבסיסיות ביותר בנושא Arrays & Hashing. חשבו כיצד מבנה נתונים מסוים יכול לעזור לכם לזהות אלמנטים שכבר ראיתם.',
    examples: [
      { input: 'nums = [1,2,3,1]', output: 'True', explanation: '1 מופיע בינדקס 0 ו-3' },
      { input: 'nums = [1,2,3,4]', output: 'False' },
      { input: 'nums = [1,1,1,3,3,4,3,2,4,2]', output: 'True' },
    ],
    constraints: [
      '1 <= len(nums) <= 10^5',
      '-10^9 <= nums[i] <= 10^9',
    ],
    starterCode: {
      python: `def contains_duplicate(nums):
    """Return True if any value appears at least twice in the array."""
    pass`,
    },
    functionName: 'contains_duplicate',
    testCases: [
      { inputs: [[1, 2, 3, 1]], expected: true, label: 'כפילות בסוף' },
      { inputs: [[1, 2, 3, 4]], expected: false, label: 'כל ערכים ייחודיים' },
      { inputs: [[1]], expected: false, label: 'אלמנט בודד' },
      { inputs: [[1, 1]], expected: true, label: 'שני אלמנטים זהים' },
    ],
    hints: [
      { title: 'רמז 1: Set', content: 'נסו להשתמש ב-Set כדי לעקוב אחרי האלמנטים שכבר ראיתם.' },
      { title: 'רמז 2: השוואה', content: 'אם גודל ה-Set שונה מאורך המערך, קיימת כפילות.' },
    ],
  },
  {
    id: 17,
    title: 'Product of Array Except Self',
    titleHe: 'מכפלת המערך חוץ מעצמו',
    topic: 'Arrays & Hashing',
    difficulty: 'medium',
    acceptance: 65,
    companies: ['Amazon', 'Apple', 'Google', 'Microsoft'],
    descriptionHe: 'בהינתן מערך שלמים nums, החזירו מערך answer כך ש-answer[i] שווה למכפלת כל האלמנטים במערך nums פרט ל-nums[i]. האלגוריתם צריך לרוץ בזמן O(n) ואסור להשתמש בפעולת החילוק. כל תוצאה מובטחת להתאים למספר שלם של 32 ביט.',
    examples: [
      { input: 'nums = [1,2,3,4]', output: '[24,12,8,6]' },
      { input: 'nums = [-1,1,0,-3,3]', output: '[0,0,9,0,0]' },
    ],
    constraints: [
      '2 <= len(nums) <= 10^5',
      '-30 <= nums[i] <= 30',
      'המכפלת של כל קידומת או סופית של nums מובטחת להתאים ל-32 ביט',
    ],
    starterCode: {
      python: `def product_except_self(nums):
    """Return array where each element is product of all other elements."""
    pass`,
    },
    functionName: 'product_except_self',
    testCases: [
      { inputs: [[1, 2, 3, 4]], expected: [24, 12, 8, 6], label: 'דוגמה בסיסית' },
      { inputs: [[2, 3]], expected: [3, 2], label: 'שני אלמנטים' },
      { inputs: [[-1, 1, 0, -3, 3]], expected: [0, 0, 9, 0, 0], label: 'עם אפס' },
      { inputs: [[1, 1, 1, 1]], expected: [1, 1, 1, 1], label: 'כל אחדות' },
    ],
    hints: [
      { title: 'רמז 1: Prefix ו-Suffix', content: 'חשבו על מכפלת כל האלמנטים משמאל לאינדקס i (prefix) ומכפלת כל האלמנטים מימין לאינדקס i (suffix).' },
      { title: 'רמז 2: מעבר כפול', content: 'עברו על המערך פעם משמאל לימין לחישוב prefix, ופעם מימין לשמאל לחישוב suffix, והכפילו בכל אינדקס.' },
    ],
  },
  {
    id: 18,
    title: 'Group Anagrams',
    titleHe: 'קיבוץ אנגרמות',
    topic: 'Arrays & Hashing',
    difficulty: 'medium',
    acceptance: 67,
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft'],
    descriptionHe: 'בהינתן מערך של מחרוזות strs, קבצו אנגרמות יחד. אנגרמה היא מילה שנוצרת על ידי סידור מחדש של אותיות מילה אחרת. כל מחרוזת מורכבת מאותיות לועזיות קטנות בלבד. סדר הקבוצות בתשובה אינו חשוב.',
    examples: [
      { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]' },
      { input: 'strs = [""]', output: '[[""]]' },
      { input: 'strs = ["a"]', output: '[["a"]]' },
    ],
    constraints: [
      '1 <= len(strs) <= 10^4',
      '0 <= len(strs[i]) <= 100',
      'strs[i] מורכב מאותיות לועזיות קטנות',
    ],
    starterCode: {
      python: `def group_anagrams(strs):
    """Group anagrams together from a list of strings."""
    pass`,
    },
    functionName: 'group_anagrams',
    testCases: [
      { inputs: [['eat', 'tea', 'tan', 'ate', 'nat', 'bat']], expected: [['bat'], ['nat', 'tan'], ['ate', 'eat', 'tea']], label: 'דוגמה בסיסית' },
      { inputs: [['a']], expected: [['a']], label: 'מחרוזת בודדת' },
      { inputs: [['', '']], expected: [['', '']], label: 'מחרוזות ריקות' },
    ],
    hints: [
      { title: 'רמז 1: מפתח אחיד', content: 'חשבו על מפתח שיזהה כל קבוצה של אנגרמות. מיון אותיות המחרוזת יוצר מפתח זהה לכל אנגרמות.' },
      { title: 'רמז 2: HashMap', content: 'השתמשו ב-HashMap שבו המפתח הוא המחרוזת הממוינת והערך הוא רשימת המחרוזות בקבוצה.' },
    ],
  },
  {
    id: 19,
    title: 'Top K Frequent Elements',
    titleHe: 'K האלמנטים השכיחים ביותר',
    topic: 'Arrays & Hashing',
    difficulty: 'medium',
    acceptance: 64,
    companies: ['Amazon', 'Google', 'Meta', 'Uber'],
    descriptionHe: 'בהינתן מערך שלמים nums ומספר שלם k, החזירו את k האלמנטים השכיחים ביותר. אפשר להחזיר את התשובה בכל סדר. האלגוריתם צריך לרוץ בזמן טוב יותר מ-O(n log n).',
    examples: [
      { input: 'nums = [1,1,1,2,2,3], k = 2', output: '[1,2]' },
      { input: 'nums = [1], k = 1', output: '[1]' },
    ],
    constraints: [
      '1 <= len(nums) <= 10^5',
      '-10^4 <= nums[i] <= 10^4',
      'k תמיד תקין, 1 <= k <= מספר האלמנטים הייחודיים',
    ],
    starterCode: {
      python: `def top_k_frequent(nums, k):
    """Return the k most frequent elements."""
    pass`,
    },
    functionName: 'top_k_frequent',
    testCases: [
      { inputs: [[1, 1, 1, 2, 2, 3], 2], expected: [1, 2], label: 'k=2' },
      { inputs: [[1], 1], expected: [1], label: 'אלמנט בודד' },
      { inputs: [[1, 2], 2], expected: [1, 2], label: 'שווי תדירות' },
      { inputs: [[4, 1, -1, 2, -1, 2, 3], 2], expected: [-1, 2], label: 'עם ערכים שליליים' },
    ],
    hints: [
      { title: 'רמז 1: ספירה', content: 'השתמשו ב-Counter או HashMap לספירת תדירות כל אלמנט.' },
      { title: 'רמז 2: Bucket Sort', content: 'ניתן להשתמש ב-Bucket Sort לפי תדירות כדי להשיג O(n) במקום O(n log n).' },
    ],
  },
  {
    id: 20,
    title: 'Longest Consecutive Sequence',
    titleHe: 'רצף רציף ארוך ביותר',
    topic: 'Arrays & Hashing',
    difficulty: 'medium',
    acceptance: 46,
    companies: ['Google', 'Amazon', 'Apple', 'Netflix'],
    descriptionHe: 'בהינתן מערך שלמים nums ללא מיון, מצאו את אורך הרצף הרציף הארוך ביותר. הרצף הרציף הוא סדרת מספרים עוקבים (לדוגמה 1,2,3,4). האלגוריתם צריך לרוץ בזמן O(n). הסדר במערך אינו חשוב, רק הערכים.',
    examples: [
      { input: 'nums = [100,4,200,1,3,2]', output: '4', explanation: '[1,2,3,4]' },
      { input: 'nums = [0,3,7,2,5,8,4,6,0,1]', output: '9' },
    ],
    constraints: [
      '0 <= len(nums) <= 10^5',
      '-10^9 <= nums[i] <= 10^9',
    ],
    starterCode: {
      python: `def longest_consecutive(nums):
    """Find the length of the longest consecutive sequence."""
    pass`,
    },
    functionName: 'longest_consecutive',
    testCases: [
      { inputs: [[100, 4, 200, 1, 3, 2]], expected: 4, label: 'דוגמה בסיסית' },
      { inputs: [[0, 3, 7, 2, 5, 8, 4, 6, 0, 1]], expected: 9, label: 'רצף ארוך' },
      { inputs: [[]], expected: 0, label: 'מערך ריק' },
      { inputs: [[1]], expected: 1, label: 'אלמנט בודד' },
    ],
    hints: [
      { title: 'רמז 1: HashSet', content: 'הכניסו את כל המספרים ל-Set. לכל מספר שהוא תחילת רצף (כלומר num-1 אינו ב-Set), ספרו כמה מספרים עוקבים קיימים.' },
      { title: 'רמז 2: התחלת רצף', content: 'מספר הוא תחילת רצף רק אם num-1 לא קיים ב-Set. זה מבטיח שכל רצף ייספר פעם אחת בלבד.' },
    ],
  },
  {
    id: 21,
    title: 'Subarray Sum Equals K',
    titleHe: 'תת-מערך שסכומו K',
    topic: 'Arrays & Hashing',
    difficulty: 'medium',
    acceptance: 44,
    companies: ['Google', 'Amazon', 'Meta', 'Uber'],
    descriptionHe: 'בהינתן מערך שלמים nums ומספר שלם k, החזירו את מספר תתי-המערכים הרציפים שסכומם שווה ל-k. תת-מערך הוא חלק רציף של המערך. המספרים יכולים להיות שליליים, חיוביים או אפס.',
    examples: [
      { input: 'nums = [1,1,1], k = 2', output: '2' },
      { input: 'nums = [1,2,3], k = 3', output: '2' },
    ],
    constraints: [
      '1 <= len(nums) <= 2*10^4',
      '-1000 <= nums[i] <= 1000',
      '-10^7 <= k <= 10^7',
    ],
    starterCode: {
      python: `def subarray_sum(nums, k):
    """Return the number of subarrays with sum equal to k."""
    pass`,
    },
    functionName: 'subarray_sum',
    testCases: [
      { inputs: [[1, 1, 1], 2], expected: 2, label: 'k=2' },
      { inputs: [[1, 2, 3], 3], expected: 2, label: 'k=3' },
      { inputs: [[1], 0], expected: 0, label: 'אפס תתי-מערכים' },
      { inputs: [[3, 4, 7, 2, -3, 1, 4, 2], 7], expected: 4, label: 'עם ערכים שליליים' },
    ],
    hints: [
      { title: 'רמז 1: Prefix Sum', content: 'חשבו על Prefix Sum. סכום תת-מערך [i,j] שווה ל-prefix[j] - prefix[i-1].' },
      { title: 'רמז 2: HashMap', content: 'שמרו HashMap של prefix sums שראיתם עד כה. לכל prefix sum נוכחי, בדקו אם (current_sum - k) קיים ב-HashMap.' },
    ],
  },
  {
    id: 22,
    title: 'Find All Duplicates',
    titleHe: 'מצא את כל הכפילויות',
    topic: 'Arrays & Hashing',
    difficulty: 'medium',
    acceptance: 73,
    companies: ['Amazon', 'Google'],
    descriptionHe: 'בהינתן מערך שלמים nums באורך n, שבו כל מספר נמצא בטווח [1,n] ויכול להופיע פעם אחת או פעמיים, מצאו את כל האלמנטים שמופיעים פעמיים. פתרו בזמן O(n) ובמרחב O(1) נוסף (מלבד הפלט).',
    examples: [
      { input: 'nums = [4,3,2,7,8,2,3,1]', output: '[2,3]' },
      { input: 'nums = [1,1,2]', output: '[1]' },
      { input: 'nums = [1]', output: '[]' },
    ],
    constraints: [
      'n == len(nums)',
      '1 <= n <= 10^5',
      '1 <= nums[i] <= n',
      'כל מספר מופיע פעם אחת או פעמיים',
    ],
    starterCode: {
      python: `def find_duplicates(nums):
    """Find all elements that appear twice in the array."""
    pass`,
    },
    functionName: 'find_duplicates',
    testCases: [
      { inputs: [[4, 3, 2, 7, 8, 2, 3, 1]], expected: [2, 3], label: 'שתי כפילויות' },
      { inputs: [[1, 1, 2]], expected: [1], label: 'כפילות אחת' },
      { inputs: [[1]], expected: [], label: 'ללא כפילויות' },
    ],
    hints: [
      { title: 'רמז 1: שימוש בסימן', content: 'מכיוון שכל ערך הוא בטווח [1,n], ניתן להשתמש בסימן של nums[abs(nums[i])-1] כדי לסמן ביקור.' },
      { title: 'רמז 2: סימון', content: 'הפכו את הסימן של האלמנט בינדקס nums[i]-1. אם הסימן כבר שלילי — מצאתם כפילות.' },
    ],
  },
  {
    id: 23,
    title: 'Rotate Array',
    titleHe: 'סיבוב מערך',
    topic: 'Arrays & Hashing',
    difficulty: 'medium',
    acceptance: 39,
    companies: ['Microsoft', 'Amazon', 'Apple'],
    descriptionHe: 'בהינתן מערך שלמים nums, סובבו את המערך k צעדים ימינה. סיבוב ימינה אחד מזיז את האלמנט האחרון לתחילת המערך. k יכול להיות גדול מאורך המערך. נסו לפתור עם O(1) מרחב נוסף.',
    examples: [
      { input: 'nums = [1,2,3,4,5,6,7], k = 3', output: '[5,6,7,1,2,3,4]' },
      { input: 'nums = [-1,-100,3,99], k = 2', output: '[3,99,-1,-100]' },
    ],
    constraints: [
      '1 <= len(nums) <= 10^5',
      '-2^31 <= nums[i] <= 2^31 - 1',
      '0 <= k <= 10^5',
    ],
    starterCode: {
      python: `def rotate(nums, k):
    """Rotate array to the right by k steps, return the rotated array."""
    pass`,
    },
    functionName: 'rotate',
    testCases: [
      { inputs: [[1, 2, 3, 4, 5, 6, 7], 3], expected: [5, 6, 7, 1, 2, 3, 4], label: 'k=3' },
      { inputs: [[-1, -100, 3, 99], 2], expected: [3, 99, -1, -100], label: 'k=2' },
      { inputs: [[1, 2, 3], 0], expected: [1, 2, 3], label: 'k=0' },
      { inputs: [[1, 2], 3], expected: [2, 1], label: 'k גדול מהאורך' },
    ],
    hints: [
      { title: 'רמז 1: Modulo', content: 'k יכול להיות גדול מאורך המערך. השתמשו ב-k % len(nums) כדי לקבל את הסיבוב האפקטיבי.' },
      { title: 'רמז 2: היפוך', content: 'שיטה יעילה: היפכו את כל המערך, היפכו את k האלמנטים הראשונים, ואז היפכו את השאר.' },
    ],
  },
  {
    id: 24,
    title: 'First Missing Positive',
    titleHe: 'המספר החיובי החסר הראשון',
    topic: 'Arrays & Hashing',
    difficulty: 'hard',
    acceptance: 37,
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft'],
    descriptionHe: 'בהינתן מערך שלמים nums ללא מיון, מצאו את המספר החיובי השלם הקטן ביותר שאינו מופיע במערך. האלגוריתם חייב לרוץ בזמן O(n) ולהשתמש ב-O(1) מרחב נוסף. זוהי אחת הבעיות הקשות ביותר בנושא Arrays - הפתרון הנאיבי אינו מספיק.',
    examples: [
      { input: 'nums = [1,2,0]', output: '3' },
      { input: 'nums = [3,4,-1,1]', output: '2' },
      { input: 'nums = [7,8,9,11,12]', output: '1' },
    ],
    constraints: [
      '1 <= len(nums) <= 10^5',
      '-2^31 <= nums[i] <= 2^31 - 1',
    ],
    starterCode: {
      python: `def first_missing_positive(nums):
    """Find the smallest missing positive integer."""
    pass`,
    },
    functionName: 'first_missing_positive',
    testCases: [
      { inputs: [[1, 2, 0]], expected: 3, label: 'חסר 3' },
      { inputs: [[3, 4, -1, 1]], expected: 2, label: 'חסר 2' },
      { inputs: [[7, 8, 9, 11, 12]], expected: 1, label: 'חסר 1' },
      { inputs: [[1]], expected: 2, label: 'רק 1' },
    ],
    hints: [
      { title: 'רמז 1: טווח', content: 'התשובה תמיד בטווח [1, n+1] כאשר n הוא אורך המערך. זה מאפשר שימוש במערך עצמו כ-HashSet.' },
      { title: 'רמז 2: סידור במקום', content: 'נסו למקם כל מספר x בינדקס x-1 (אם x בטווח [1,n]). לאחר מכן, הינדקס הראשון שבו nums[i] != i+1 הוא התשובה.' },
    ],
  },
  {
    id: 25,
    title: 'Majority Element',
    titleHe: 'האלמנט הרוב',
    topic: 'Arrays & Hashing',
    difficulty: 'easy',
    acceptance: 64,
    companies: ['Amazon', 'Google', 'Apple', 'Netflix'],
    descriptionHe: 'בהינתן מערך nums באורך n, מצאו את האלמנט הרוב. האלמנט הרוב הוא האלמנט שמופיע יותר מ-n/2 פעמים. מובטח שתמיד קיים אלמנט רוב במערך. נסו לפתור בזמן O(n) ומרחב O(1).',
    examples: [
      { input: 'nums = [3,2,3]', output: '3' },
      { input: 'nums = [2,2,1,1,1,2,2]', output: '2' },
    ],
    constraints: [
      'n == len(nums)',
      '1 <= n <= 5*10^4',
      '-10^9 <= nums[i] <= 10^9',
      'תמיד קיים אלמנט רוב',
    ],
    starterCode: {
      python: `def majority_element(nums):
    """Find the majority element that appears more than n/2 times."""
    pass`,
    },
    functionName: 'majority_element',
    testCases: [
      { inputs: [[3, 2, 3]], expected: 3, label: 'דוגמה בסיסית' },
      { inputs: [[2, 2, 1, 1, 1, 2, 2]], expected: 2, label: 'מספר גדול' },
      { inputs: [[1]], expected: 1, label: 'אלמנט בודד' },
      { inputs: [[6, 5, 5]], expected: 5, label: 'שלושה אלמנטים' },
    ],
    hints: [
      { title: 'רמז 1: Boyer-Moore', content: 'אלגוריתם Boyer-Moore Voting מאפשר מציאת הרוב ב-O(n) ו-O(1) מרחב. שמרו מועמד ומונה.' },
      { title: 'רמז 2: מונה', content: 'הגדילו את המונה כשרואים את המועמד, הקטינו אחרת. כשהמונה מגיע ל-0, עדכנו את המועמד.' },
    ],
  },
  {
    id: 26,
    title: 'Maximum Product Subarray',
    titleHe: 'תת-מערך עם מכפלה מקסימלית',
    topic: 'Arrays & Hashing',
    difficulty: 'medium',
    acceptance: 35,
    companies: ['Amazon', 'Google', 'LinkedIn'],
    descriptionHe: 'בהינתן מערך שלמים nums, מצאו את תת-המערך הרציף שיש לו את המכפלה הגדולה ביותר, והחזירו את המכפלה. שימו לב שמספרים שליליים יכולים להפוך למינימום למקסימום אם מוכפלים במספר שלילי נוסף.',
    examples: [
      { input: 'nums = [2,3,-2,4]', output: '6', explanation: '[2,3] has product 6' },
      { input: 'nums = [-2,0,-1]', output: '0' },
    ],
    constraints: [
      '1 <= len(nums) <= 2*10^4',
      '-10 <= nums[i] <= 10',
      'המכפלה מובטחת להתאים ל-32 ביט',
    ],
    starterCode: {
      python: `def max_product(nums):
    """Find the maximum product subarray."""
    pass`,
    },
    functionName: 'max_product',
    testCases: [
      { inputs: [[2, 3, -2, 4]], expected: 6, label: 'עם שלילי' },
      { inputs: [[-2, 0, -1]], expected: 0, label: 'עם אפס' },
      { inputs: [[-2]], expected: -2, label: 'אלמנט בודד שלילי' },
      { inputs: [[-2, 3, -4]], expected: 24, label: 'שניים שליליים' },
    ],
    hints: [
      { title: 'רמז 1: מעקב אחר מינימום ומקסימום', content: 'עקבו הן אחר המכפלה המקסימלית והן אחר המינימלית הנוכחית, כי שני שליליים נותנים חיובי.' },
      { title: 'רמז 2: עדכון', content: 'בכל צעד, חשבו את המקסימום והמינימום החדשים לפני עדכון. max_cur = max(num, num*max_prev, num*min_prev).' },
    ],
  },
  {
    id: 27,
    title: 'Find the Duplicate Number',
    titleHe: 'מצא את המספר הכפול',
    topic: 'Arrays & Hashing',
    difficulty: 'medium',
    acceptance: 59,
    companies: ['Amazon', 'Google', 'Apple'],
    descriptionHe: 'בהינתן מערך nums המכיל n+1 מספרים שלמים בטווח [1,n], קיים בדיוק מספר כפול אחד, מצאו אותו. אסור לשנות את המערך ואסור להשתמש במרחב נוסף מעבר ל-O(1). ניתן להשתמש ב-Floyd\'s cycle detection כאמצעי מתקדם.',
    examples: [
      { input: 'nums = [1,3,4,2,2]', output: '2' },
      { input: 'nums = [3,1,3,4,2]', output: '3' },
    ],
    constraints: [
      '1 <= n <= 10^5',
      'len(nums) == n + 1',
      '1 <= nums[i] <= n',
      'קיים בדיוק מספר כפול אחד',
    ],
    starterCode: {
      python: `def find_duplicate(nums):
    """Find the duplicate number without modifying the array."""
    pass`,
    },
    functionName: 'find_duplicate',
    testCases: [
      { inputs: [[1, 3, 4, 2, 2]], expected: 2, label: 'כפול באמצע' },
      { inputs: [[3, 1, 3, 4, 2]], expected: 3, label: 'כפול בהתחלה' },
      { inputs: [[1, 1]], expected: 1, label: 'מינימלי' },
    ],
    hints: [
      { title: 'רמז 1: Floyd\'s Detection', content: 'חשבו על המערך כרשימה מקושרת שבה nums[i] מצביע על הצומת הבא. הכפול יוצר מעגל.' },
      { title: 'רמז 2: שלב מציאת מעגל', content: 'השתמשו ב-slow/fast pointers למציאת נקודת הפגישה, ואז מצאו את כניסת המעגל.' },
    ],
  },
  {
    id: 28,
    title: 'Valid Sudoku (Row/Col Check)',
    titleHe: 'סודוקו תקין (בדיקת שורות/עמודות)',
    topic: 'Arrays & Hashing',
    difficulty: 'medium',
    acceptance: 57,
    companies: ['Amazon', 'Apple', 'Microsoft'],
    descriptionHe: 'בהינתן לוח סודוקו 9x9 כרשימה של רשימות (כאשר "." מייצג תא ריק), בדקו האם הלוח תקין. לוח תקין אם: כל שורה מכילה את הספרות 1-9 ללא חזרות, וכל עמודה מכילה את הספרות 1-9 ללא חזרות. לא נדרש לבדוק את קוביות 3x3.',
    examples: [
      { input: 'board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]', output: 'True' },
    ],
    constraints: [
      'board.length == 9',
      'board[i].length == 9',
      'board[i][j] הוא ספרה 1-9 או "."',
    ],
    starterCode: {
      python: `def is_valid_sudoku(board):
    """Check if a Sudoku board is valid (rows and columns only)."""
    pass`,
    },
    functionName: 'is_valid_sudoku',
    testCases: [
      { inputs: [[['5','3','.','.','7','.','.','.','.'],['6','.','.','1','9','5','.','.','.'],['.','9','8','.','.','.','.','6','.'],['8','.','.','.','6','.','.','.','3'],['4','.','.','8','.','3','.','.','1'],['7','.','.','.','2','.','.','.','6'],['.','6','.','.','.','.','2','8','.'],['.','.','.','4','1','9','.','.','5'],['.','.','.','.','8','.','.','7','9']]], expected: true, label: 'לוח תקין' },
      { inputs: [[['8','3','.','.','7','.','.','.','.'],['6','.','.','1','9','5','.','.','.'],['.','9','8','.','.','.','.','6','.'],['8','.','.','.','6','.','.','.','3'],['4','.','.','8','.','3','.','.','1'],['7','.','.','.','2','.','.','.','6'],['.','6','.','.','.','.','2','8','.'],['.','.','.','4','1','9','.','.','5'],['.','.','.','.','8','.','.','7','9']]], expected: false, label: 'לוח לא תקין (8 בשתי שורות בעמודה 0)' },
    ],
    hints: [
      { title: 'רמז 1: HashSet לכל שורה/עמודה', content: 'לכל שורה ולכל עמודה, שמרו HashSet של הספרות שנראו עד כה.' },
      { title: 'רמז 2: מעבר כפול', content: 'עברו על כל תאי הלוח. לכל תא שאינו ".", בדקו האם הספרה כבר קיימת ב-HashSet של השורה והעמודה המתאימות.' },
    ],
  },
  {
    id: 29,
    title: '3Sum',
    titleHe: 'שלושה מספרים',
    topic: 'Two Pointers',
    difficulty: 'medium',
    acceptance: 34,
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft'],
    descriptionHe: 'בהינתן מערך שלמים nums, מצאו את כל המשולשים [nums[i], nums[j], nums[k]] כך ש-i != j != k ו-nums[i] + nums[j] + nums[k] == 0. התשובה לא צריכה להכיל משולשים כפולים.',
    examples: [
      { input: 'nums = [-1,0,1,2,-1,-4]', output: '[[-1,-1,2],[-1,0,1]]' },
      { input: 'nums = [0,1,1]', output: '[]' },
      { input: 'nums = [0,0,0]', output: '[[0,0,0]]' },
    ],
    constraints: [
      '3 <= len(nums) <= 3000',
      '-10^5 <= nums[i] <= 10^5',
    ],
    starterCode: {
      python: `def three_sum(nums):
    """Find all unique triplets that sum to zero."""
    pass`,
    },
    functionName: 'three_sum',
    testCases: [
      { inputs: [[-1, 0, 1, 2, -1, -4]], expected: [[-1, -1, 2], [-1, 0, 1]], label: 'דוגמה בסיסית' },
      { inputs: [[0, 1, 1]], expected: [], label: 'אין משולשים' },
      { inputs: [[0, 0, 0]], expected: [[0, 0, 0]], label: 'שלושה אפסים' },
    ],
    hints: [
      { title: 'רמז 1: מיון', content: 'מיינו את המערך קודם. זה מאפשר שימוש ב-Two Pointers ומניעת כפילויות בקלות.' },
      { title: 'רמז 2: קיבוע + Two Pointers', content: 'קבעו את האלמנט הראשון בלולאה. לאחר מכן השתמשו ב-left/right pointers כדי למצוא זוגות שהסכום שלהם שווה לשלילת האלמנט הקבוע.' },
    ],
  },
  {
    id: 30,
    title: 'Container With Most Water',
    titleHe: 'מיכל עם הכי הרבה מים',
    topic: 'Two Pointers',
    difficulty: 'medium',
    acceptance: 54,
    companies: ['Amazon', 'Google', 'Meta', 'Apple'],
    descriptionHe: 'בהינתן מערך גבהים height, כאשר height[i] מייצג גובה קיר ב-i, מצאו שני קירות שיוצרים יחד עם ציר ה-x מיכל שמחזיק הכי הרבה מים. החזירו את הנפח המקסימלי של מים שניתן להחזיק.',
    examples: [
      { input: 'height = [1,8,6,2,5,4,8,3,7]', output: '49' },
      { input: 'height = [1,1]', output: '1' },
    ],
    constraints: [
      'n == len(height)',
      '2 <= n <= 10^5',
      '0 <= height[i] <= 10^4',
    ],
    starterCode: {
      python: `def max_area(height):
    """Find two lines that together with the x-axis form a container with most water."""
    pass`,
    },
    functionName: 'max_area',
    testCases: [
      { inputs: [[1, 8, 6, 2, 5, 4, 8, 3, 7]], expected: 49, label: 'דוגמה בסיסית' },
      { inputs: [[1, 1]], expected: 1, label: 'שני קירות' },
      { inputs: [[4, 3, 2, 1, 4]], expected: 16, label: 'קירות שווים בקצוות' },
      { inputs: [[1, 2, 1]], expected: 2, label: 'שלושה קירות' },
    ],
    hints: [
      { title: 'רמז 1: Two Pointers', content: 'התחילו עם מצביעים בשני הקצוות של המערך. זה מקסימום הרוחב.' },
      { title: 'רמז 2: הזזת המצביע', content: 'הזיזו את המצביע של הקיר הנמוך יותר פנימה, כי העברת הגבוה יותר לא תגדיל את הנפח.' },
    ],
  },
  {
    id: 31,
    title: 'Trapping Rain Water',
    titleHe: 'לכידת מי גשם',
    topic: 'Two Pointers',
    difficulty: 'hard',
    acceptance: 59,
    companies: ['Amazon', 'Google', 'Meta', 'Apple', 'Microsoft'],
    descriptionHe: 'בהינתן מערך גבהים height המייצג מפה גבהים, חשבו כמה מים ניתן ללכוד לאחר גשם. כל עמודה ברוחב 1. כמות המים מעל עמודה i היא ההפרש בין min(max_left[i], max_right[i]) לבין height[i].',
    examples: [
      { input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', output: '6' },
      { input: 'height = [4,2,0,3,2,5]', output: '9' },
    ],
    constraints: [
      'n == len(height)',
      '1 <= n <= 2*10^4',
      '0 <= height[i] <= 10^5',
    ],
    starterCode: {
      python: `def trap(height):
    """Calculate how much water can be trapped after raining."""
    pass`,
    },
    functionName: 'trap',
    testCases: [
      { inputs: [[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]], expected: 6, label: 'דוגמה בסיסית' },
      { inputs: [[4, 2, 0, 3, 2, 5]], expected: 9, label: 'גבהים גדולים' },
      { inputs: [[3, 0, 2, 0, 4]], expected: 7, label: 'שני ערוצים' },
      { inputs: [[1, 0, 1]], expected: 1, label: 'מינימלי' },
    ],
    hints: [
      { title: 'רמז 1: Two Pointers', content: 'השתמשו בשני מצביעים משני הקצוות. עקבו אחר max_left ו-max_right הנוכחיים.' },
      { title: 'רמז 2: הכרעה', content: 'בכל צעד, הזיזו את המצביע שצידו יש גובה מקסימלי קטן יותר, וחשבו את המים שנלכדים בנקודה הנוכחית.' },
    ],
  },
  {
    id: 32,
    title: 'Remove Duplicates from Sorted Array',
    titleHe: 'הסרת כפילויות ממערך ממוין',
    topic: 'Two Pointers',
    difficulty: 'easy',
    acceptance: 54,
    companies: ['Amazon', 'Apple', 'Microsoft'],
    descriptionHe: 'בהינתן מערך שלמים ממוין nums, הסירו את הכפילויות במקום (in-place) כך שכל אלמנט ייחודי יופיע רק פעם אחת. החזירו את מספר האלמנטים הייחודיים k. האלמנטים הייחודיים צריכים להופיע בתחילת המערך.',
    examples: [
      { input: 'nums = [1,1,2]', output: '2', explanation: 'המערך הופך ל-[1,2,_]' },
      { input: 'nums = [0,0,1,1,1,2,2,3,3,4]', output: '5' },
    ],
    constraints: [
      '1 <= len(nums) <= 3*10^4',
      '-100 <= nums[i] <= 100',
      'nums ממוין בסדר לא יורד',
    ],
    starterCode: {
      python: `def remove_duplicates(nums):
    """Remove duplicates in-place and return count of unique elements."""
    pass`,
    },
    functionName: 'remove_duplicates',
    testCases: [
      { inputs: [[1, 1, 2]], expected: 2, label: 'שתי ייחודיות' },
      { inputs: [[0, 0, 1, 1, 1, 2, 2, 3, 3, 4]], expected: 5, label: 'חמש ייחודיות' },
      { inputs: [[1]], expected: 1, label: 'אלמנט בודד' },
    ],
    hints: [
      { title: 'רמז 1: Slow/Fast Pointer', content: 'השתמשו בשני מצביעים: slow שמצביע על המיקום הבא לכתיבה, ו-fast שסורק קדימה.' },
      { title: 'רמז 2: השוואה', content: 'כאשר nums[fast] != nums[fast-1], העתיקו את nums[fast] לנקודה slow וקדמו את slow.' },
    ],
  },
  {
    id: 33,
    title: 'Move Zeroes',
    titleHe: 'הזזת אפסים',
    topic: 'Two Pointers',
    difficulty: 'easy',
    acceptance: 61,
    companies: ['Amazon', 'Google', 'Meta'],
    descriptionHe: 'בהינתן מערך שלמים nums, הזיזו את כל האפסים לסוף המערך תוך שמירה על הסדר היחסי של האלמנטים שאינם אפס. בצעו זאת במקום (in-place) ללא יצירת מערך חדש.',
    examples: [
      { input: 'nums = [0,1,0,3,12]', output: '[1,3,12,0,0]' },
      { input: 'nums = [0]', output: '[0]' },
    ],
    constraints: [
      '1 <= len(nums) <= 10^4',
      '-2^31 <= nums[i] <= 2^31 - 1',
    ],
    starterCode: {
      python: `def move_zeroes(nums):
    """Move all zeroes to end while maintaining relative order of non-zero elements."""
    pass`,
    },
    functionName: 'move_zeroes',
    testCases: [
      { inputs: [[0, 1, 0, 3, 12]], expected: [1, 3, 12, 0, 0], label: 'כמה אפסים' },
      { inputs: [[0]], expected: [0], label: 'אפס בלבד' },
      { inputs: [[1, 2, 3]], expected: [1, 2, 3], label: 'ללא אפסים' },
      { inputs: [[0, 0, 1]], expected: [1, 0, 0], label: 'אפסים בתחילה' },
    ],
    hints: [
      { title: 'רמז 1: Pointer לא-אפסים', content: 'שמרו מצביע pos שמצביע על המיקום הבא לכתיבת אלמנט שאינו אפס.' },
      { title: 'רמז 2: מילוי', content: 'לאחר מעבר על כל האלמנטים שאינם אפס, מלאו את שאר המערך באפסים.' },
    ],
  },
  {
    id: 34,
    title: 'Squares of a Sorted Array',
    titleHe: 'ריבועי מערך ממוין',
    topic: 'Two Pointers',
    difficulty: 'easy',
    acceptance: 72,
    companies: ['Amazon', 'Google'],
    descriptionHe: 'בהינתן מערך שלמים nums ממוין בסדר לא יורד, החזירו מערך של ריבועי כל מספר, ממוין בסדר לא יורד. שימו לב שהמערך עשוי להכיל מספרים שליליים, שריבועיהם עשויים להיות גדולים.',
    examples: [
      { input: 'nums = [-4,-1,0,3,10]', output: '[0,1,9,16,100]' },
      { input: 'nums = [-7,-3,2,3,11]', output: '[4,9,9,49,121]' },
    ],
    constraints: [
      '1 <= len(nums) <= 10^4',
      '-10^4 <= nums[i] <= 10^4',
      'nums ממוין בסדר לא יורד',
    ],
    starterCode: {
      python: `def sorted_squares(nums):
    """Return sorted array of squares."""
    pass`,
    },
    functionName: 'sorted_squares',
    testCases: [
      { inputs: [[-4, -1, 0, 3, 10]], expected: [0, 1, 9, 16, 100], label: 'עם שליליים' },
      { inputs: [[-7, -3, 2, 3, 11]], expected: [4, 9, 9, 49, 121], label: 'כפילות בריבוע' },
      { inputs: [[0, 1, 2]], expected: [0, 1, 4], label: 'כל חיוביים' },
    ],
    hints: [
      { title: 'רמז 1: Two Pointers מהקצוות', content: 'הריבועים הגדולים ביותר נמצאים בקצוות המערך (הגדולים בערך מוחלט). השתמשו ב-Two Pointers.' },
      { title: 'רמז 2: מילוי מהסוף', content: 'מלאו את מערך התוצאה מהסוף להתחלה, בכל פעם השוו את ריבועי הקצוות ובחרו את הגדול.' },
    ],
  },
  {
    id: 35,
    title: 'Three Sum Closest',
    titleHe: 'שלושה מספרים הקרובים ביותר',
    topic: 'Two Pointers',
    difficulty: 'medium',
    acceptance: 47,
    companies: ['Amazon', 'Google', 'Microsoft'],
    descriptionHe: 'בהינתן מערך שלמים nums ומספר שלם target, מצאו שלושה מספרים ב-nums שסכומם קרוב ביותר ל-target. החזירו את הסכום של שלושת המספרים. מובטח שיש בדיוק תשובה אחת.',
    examples: [
      { input: 'nums = [-1,2,1,-4], target = 1', output: '2', explanation: '-1+2+1=2' },
      { input: 'nums = [0,0,0], target = 1', output: '0' },
    ],
    constraints: [
      '3 <= len(nums) <= 500',
      '-1000 <= nums[i] <= 1000',
      '-10^4 <= target <= 10^4',
    ],
    starterCode: {
      python: `def three_sum_closest(nums, target):
    """Find three integers whose sum is closest to target."""
    pass`,
    },
    functionName: 'three_sum_closest',
    testCases: [
      { inputs: [[-1, 2, 1, -4], 1], expected: 2, label: 'דוגמה בסיסית' },
      { inputs: [[0, 0, 0], 1], expected: 0, label: 'כל אפסים' },
      { inputs: [[1, 1, 1, 0], -100], expected: 2, label: 'target שלילי מאוד' },
    ],
    hints: [
      { title: 'רמז 1: מיון + Two Pointers', content: 'מיינו את המערך. לכל אינדקס i, השתמשו ב-Two Pointers על שאר המערך.' },
      { title: 'רמז 2: עדכון המינימום', content: 'עקבו אחר הסכום הקרוב ביותר שמצאתם עד כה. עדכנו אותו כאשר מוצאים סכום עם הפרש קטן יותר.' },
    ],
  },
  {
    id: 36,
    title: 'Sort Colors',
    titleHe: 'מיון צבעים',
    topic: 'Two Pointers',
    difficulty: 'medium',
    acceptance: 57,
    companies: ['Amazon', 'Google', 'Microsoft', 'Apple'],
    descriptionHe: 'בהינתן מערך nums עם n עצמים צבועים באדום, לבן או כחול, מיינו אותם במקום כך שעצמים מאותו צבע יהיו סמוכים, בסדר אדום, לבן, כחול. אדום=0, לבן=1, כחול=2. פתרו במעבר אחד בלבד.',
    examples: [
      { input: 'nums = [2,0,2,1,1,0]', output: '[0,0,1,1,2,2]' },
      { input: 'nums = [2,0,1]', output: '[0,1,2]' },
    ],
    constraints: [
      'n == len(nums)',
      '1 <= n <= 300',
      'nums[i] הוא 0, 1, או 2',
    ],
    starterCode: {
      python: `def sort_colors(nums):
    """Sort array of 0s, 1s, and 2s in-place."""
    pass`,
    },
    functionName: 'sort_colors',
    testCases: [
      { inputs: [[2, 0, 2, 1, 1, 0]], expected: [0, 0, 1, 1, 2, 2], label: 'דוגמה בסיסית' },
      { inputs: [[2, 0, 1]], expected: [0, 1, 2], label: 'שלושה צבעים' },
      { inputs: [[0]], expected: [0], label: 'אחד' },
      { inputs: [[1, 0]], expected: [0, 1], label: 'שניים' },
    ],
    hints: [
      { title: 'רמז 1: Dutch National Flag', content: 'השתמשו באלגוריתם Dutch National Flag עם שלושה מצביעים: low, mid, high.' },
      { title: 'רמז 2: שלושה מצביעים', content: 'low מצביע על תחילת 1s, high על סוף 1s, mid סורק. החליפו לפי ערך nums[mid].' },
    ],
  },
  {
    id: 37,
    title: 'Minimum Size Subarray Sum',
    titleHe: 'תת-מערך מינימלי עם סכום לפחות S',
    topic: 'Two Pointers',
    difficulty: 'medium',
    acceptance: 45,
    companies: ['Amazon', 'Google', 'Microsoft'],
    descriptionHe: 'בהינתן מערך חיובי nums ומספר חיובי target, מצאו את האורך המינימלי של תת-מערך רציף שסכומו גדול או שווה ל-target. אם לא קיים תת-מערך כזה, החזירו 0.',
    examples: [
      { input: 'target = 7, nums = [2,3,1,2,4,3]', output: '2', explanation: '[4,3]' },
      { input: 'target = 4, nums = [1,4,4]', output: '1' },
      { input: 'target = 11, nums = [1,1,1,1,1,1,1,1]', output: '0' },
    ],
    constraints: [
      '1 <= target <= 10^9',
      '1 <= len(nums) <= 10^5',
      '1 <= nums[i] <= 10^4',
    ],
    starterCode: {
      python: `def min_sub_array_len(target, nums):
    """Find minimum length subarray with sum >= target."""
    pass`,
    },
    functionName: 'min_sub_array_len',
    testCases: [
      { inputs: [7, [2, 3, 1, 2, 4, 3]], expected: 2, label: 'אורך 2' },
      { inputs: [4, [1, 4, 4]], expected: 1, label: 'אורך 1' },
      { inputs: [11, [1, 1, 1, 1, 1, 1, 1, 1]], expected: 0, label: 'לא קיים' },
    ],
    hints: [
      { title: 'רמז 1: Sliding Window', content: 'השתמשו ב-Sliding Window עם שני מצביעים left ו-right.' },
      { title: 'רמז 2: כיווץ החלון', content: 'הרחיבו את החלון ימינה. כאשר הסכום >= target, כווצו משמאל ועדכנו את האורך המינימלי.' },
    ],
  },
  {
    id: 38,
    title: 'Longest Substring Without Repeating Characters',
    titleHe: 'תת-מחרוזת ארוכה ביותר ללא תווים חוזרים',
    topic: 'Sliding Window',
    difficulty: 'medium',
    acceptance: 34,
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Apple'],
    descriptionHe: 'בהינתן מחרוזת s, מצאו את אורך תת-המחרוזת הארוכה ביותר ללא תווים חוזרים. תת-מחרוזת היא רצף רציף של תווים. כל תו יכול להופיע לכל היותר פעם אחת בתת-המחרוזת.',
    examples: [
      { input: 's = "abcabcbb"', output: '3', explanation: '"abc"' },
      { input: 's = "bbbbb"', output: '1', explanation: '"b"' },
      { input: 's = "pwwkew"', output: '3', explanation: '"wke"' },
    ],
    constraints: [
      '0 <= len(s) <= 5*10^4',
      's מורכב מאותיות אנגליות, ספרות, סימנים ורווחים',
    ],
    starterCode: {
      python: `def length_of_longest_substring(s):
    """Find length of longest substring without repeating characters."""
    pass`,
    },
    functionName: 'length_of_longest_substring',
    testCases: [
      { inputs: ['abcabcbb'], expected: 3, label: 'abcabcbb' },
      { inputs: ['bbbbb'], expected: 1, label: 'כל אותה אות' },
      { inputs: ['pwwkew'], expected: 3, label: 'pwwkew' },
      { inputs: [''], expected: 0, label: 'מחרוזת ריקה' },
    ],
    hints: [
      { title: 'רמז 1: Sliding Window + HashSet', content: 'השתמשו ב-Sliding Window עם HashSet שמכיל את התווים בחלון הנוכחי.' },
      { title: 'רמז 2: כיווץ', content: 'כאשר נמצא תו שכבר בחלון, הסירו תווים מהצד השמאלי עד שהתו יוסר.' },
    ],
  },
  {
    id: 39,
    title: 'Longest Repeating Character Replacement',
    titleHe: 'החלפת תווים לתת-מחרוזת ארוכה',
    topic: 'Sliding Window',
    difficulty: 'medium',
    acceptance: 51,
    companies: ['Amazon', 'Google', 'Microsoft'],
    descriptionHe: 'בהינתן מחרוזת s ומספר שלם k, תוכלו להחליף לכל היותר k תווים במחרוזת. מצאו את האורך הארוך ביותר של תת-מחרוזת המכילה רק אות אחת לאחר ביצוע ההחלפות. המחרוזת מכילה רק אותיות לועזיות גדולות.',
    examples: [
      { input: 's = "ABAB", k = 2', output: '4' },
      { input: 's = "AABABBA", k = 1', output: '4' },
    ],
    constraints: [
      '1 <= len(s) <= 10^5',
      's מורכב מאותיות לועזיות גדולות',
      '0 <= k <= len(s)',
    ],
    starterCode: {
      python: `def character_replacement(s, k):
    """Find longest substring with same letter after at most k replacements."""
    pass`,
    },
    functionName: 'character_replacement',
    testCases: [
      { inputs: ['ABAB', 2], expected: 4, label: 'ABAB k=2' },
      { inputs: ['AABABBA', 1], expected: 4, label: 'AABABBA k=1' },
      { inputs: ['AAAA', 0], expected: 4, label: 'כבר אחיד' },
    ],
    hints: [
      { title: 'רמז 1: Sliding Window', content: 'השתמשו ב-Sliding Window. עקבו אחר התו השכיח ביותר בחלון הנוכחי (max_count).' },
      { title: 'רמז 2: תנאי תקינות', content: 'החלון תקין אם (window_size - max_count) <= k. אם לא, הזיזו את left קדימה.' },
    ],
  },
  {
    id: 40,
    title: 'Permutation in String',
    titleHe: 'תמורה במחרוזת',
    topic: 'Sliding Window',
    difficulty: 'medium',
    acceptance: 44,
    companies: ['Amazon', 'Microsoft', 'Google'],
    descriptionHe: 'בהינתן שתי מחרוזות s1 ו-s2, החזירו true אם s2 מכילה תמורה של s1. במילים אחרות, אחד מהסידורים מחדש של s1 הוא תת-מחרוזת של s2. שתי המחרוזות מכילות רק אותיות לועזיות קטנות.',
    examples: [
      { input: 's1 = "ab", s2 = "eidbaooo"', output: 'True', explanation: '"ba" היא תמורה' },
      { input: 's1 = "ab", s2 = "eidboaoo"', output: 'False' },
    ],
    constraints: [
      '1 <= len(s1) <= 10^4',
      '1 <= len(s2) <= 10^4',
      's1 ו-s2 מורכבות מאותיות לועזיות קטנות',
    ],
    starterCode: {
      python: `def check_inclusion(s1, s2):
    """Return True if s2 contains a permutation of s1."""
    pass`,
    },
    functionName: 'check_inclusion',
    testCases: [
      { inputs: ['ab', 'eidbaooo'], expected: true, label: 'תמורה קיימת' },
      { inputs: ['ab', 'eidboaoo'], expected: false, label: 'אין תמורה' },
      { inputs: ['a', 'a'], expected: true, label: 'אות בודדת' },
    ],
    hints: [
      { title: 'רמז 1: Sliding Window בגודל len(s1)', content: 'השתמשו ב-Sliding Window בגודל len(s1) על s2. בדקו אם מספר האותיות בחלון שווה ל-s1.' },
      { title: 'רמז 2: Counter', content: 'השוו Counter של s1 עם Counter של החלון הנוכחי. עדכנו את Counter החלון בהזזה.' },
    ],
  },
  {
    id: 41,
    title: 'Maximum Sum Subarray of Size K',
    titleHe: 'תת-מערך בגודל K עם סכום מקסימלי',
    topic: 'Sliding Window',
    difficulty: 'easy',
    acceptance: 69,
    companies: ['Amazon', 'Google'],
    descriptionHe: 'בהינתן מערך שלמים nums ומספר שלם k, מצאו את הסכום המקסימלי של תת-מערך בגודל בדיוק k. תת-מערך הוא חלק רציף של המערך.',
    examples: [
      { input: 'nums = [2,1,5,1,3,2], k = 3', output: '9', explanation: '[5,1,3]' },
      { input: 'nums = [2,3,4,1,5], k = 2', output: '7', explanation: '[3,4]' },
    ],
    constraints: [
      '1 <= k <= len(nums) <= 10^5',
      '-10^4 <= nums[i] <= 10^4',
    ],
    starterCode: {
      python: `def max_sum_subarray(nums, k):
    """Find maximum sum of any subarray of size k."""
    pass`,
    },
    functionName: 'max_sum_subarray',
    testCases: [
      { inputs: [[2, 1, 5, 1, 3, 2], 3], expected: 9, label: 'k=3' },
      { inputs: [[2, 3, 4, 1, 5], 2], expected: 7, label: 'k=2' },
      { inputs: [[1, 2, 3], 3], expected: 6, label: 'כל המערך' },
    ],
    hints: [
      { title: 'רמז 1: Sliding Window קבוע', content: 'חשבו את סכום k האלמנטים הראשונים. ואז הזיזו את החלון: הוסיפו את הבא והסירו את הראשון.' },
      { title: 'רמז 2: עדכון', content: 'בכל הזזה: current_sum += nums[i] - nums[i-k]. עדכנו max_sum אם current_sum גדול יותר.' },
    ],
  },
  {
    id: 42,
    title: 'Fruit Into Baskets',
    titleHe: 'פירות לסלים',
    topic: 'Sliding Window',
    difficulty: 'medium',
    acceptance: 42,
    companies: ['Amazon', 'Google'],
    descriptionHe: 'בהינתן מערך fruits שבו כל fruits[i] מייצג סוג עץ, ויש לכם שני סלים בלבד (כל סל מחזיק סוג פרי אחד), מצאו את המספר המקסימלי של פירות שניתן לאסוף. יש לקחת קבוצה רציפה של עצים עם לכל היותר 2 סוגים שונים.',
    examples: [
      { input: 'fruits = [1,2,1]', output: '3' },
      { input: 'fruits = [0,1,2,2]', output: '3', explanation: '[1,2,2]' },
      { input: 'fruits = [1,2,3,2,2]', output: '4', explanation: '[2,3,2,2]' },
    ],
    constraints: [
      '1 <= len(fruits) <= 10^5',
      '0 <= fruits[i] <= len(fruits)',
    ],
    starterCode: {
      python: `def total_fruit(fruits):
    """Find max fruits collectable with two baskets (at most 2 types)."""
    pass`,
    },
    functionName: 'total_fruit',
    testCases: [
      { inputs: [[1, 2, 1]], expected: 3, label: 'כל אחד' },
      { inputs: [[0, 1, 2, 2]], expected: 3, label: 'שלושה' },
      { inputs: [[1, 2, 3, 2, 2]], expected: 4, label: 'ארבעה' },
    ],
    hints: [
      { title: 'רמז 1: Sliding Window', content: 'זוהי בעיה של Sliding Window עם לכל היותר 2 סוגים שונים בחלון.' },
      { title: 'רמז 2: HashMap', content: 'שמרו HashMap של מספר הפירות מכל סוג בחלון. כשיש יותר מ-2 סוגים, כווצו מהשמאל.' },
    ],
  },
  {
    id: 43,
    title: 'Max Consecutive Ones III',
    titleHe: 'מקסימום אחדות רצופות III',
    topic: 'Sliding Window',
    difficulty: 'medium',
    acceptance: 63,
    companies: ['Amazon', 'Google', 'Microsoft'],
    descriptionHe: 'בהינתן מערך בינארי nums ומספר שלם k, החזירו את האורך המקסימלי של תת-מערך רציף המכיל רק 1, לאחר שהפכתם לכל היותר k אפסים ל-1.',
    examples: [
      { input: 'nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2', output: '6' },
      { input: 'nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1,0], k = 3', output: '10' },
    ],
    constraints: [
      '1 <= len(nums) <= 10^5',
      'nums[i] הוא 0 או 1',
      '0 <= k <= len(nums)',
    ],
    starterCode: {
      python: `def longest_ones(nums, k):
    """Find max consecutive ones after flipping at most k zeros."""
    pass`,
    },
    functionName: 'longest_ones',
    testCases: [
      { inputs: [[1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 2], expected: 6, label: 'k=2' },
      { inputs: [[0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 3], expected: 10, label: 'k=3' },
      { inputs: [[0, 0, 0], 0], expected: 0, label: 'k=0 כל אפסים' },
    ],
    hints: [
      { title: 'רמז 1: Sliding Window', content: 'השתמשו ב-Sliding Window. עקבו אחר מספר האפסים בחלון (zeros_count).' },
      { title: 'רמז 2: כיווץ', content: 'כאשר zeros_count > k, הזיזו את left קדימה. עדכנו את zeros_count בהתאם.' },
    ],
  },
  {
    id: 44,
    title: 'Minimum Window Substring',
    titleHe: 'תת-מחרוזת חלון מינימלית',
    topic: 'Sliding Window',
    difficulty: 'hard',
    acceptance: 40,
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Uber'],
    descriptionHe: 'בהינתן שתי מחרוזות s ו-t, מצאו את תת-המחרוזת הקצרה ביותר של s המכילה את כל תווי t (כולל כפילויות). אם אין תת-מחרוזת כזו, החזירו מחרוזת ריקה. המחרוזות יכולות להכיל אותיות גדולות וקטנות.',
    examples: [
      { input: 's = "ADOBECODEBANC", t = "ABC"', output: '"BANC"' },
      { input: 's = "a", t = "a"', output: '"a"' },
      { input: 's = "a", t = "aa"', output: '""' },
    ],
    constraints: [
      '1 <= len(s), len(t) <= 10^5',
      's ו-t מורכבות מאותיות לועזיות גדולות וקטנות',
    ],
    starterCode: {
      python: `def min_window(s, t):
    """Find minimum window substring containing all characters of t."""
    pass`,
    },
    functionName: 'min_window',
    testCases: [
      { inputs: ['ADOBECODEBANC', 'ABC'], expected: 'BANC', label: 'דוגמה בסיסית' },
      { inputs: ['a', 'a'], expected: 'a', label: 'תו בודד' },
      { inputs: ['a', 'aa'], expected: '', label: 'לא קיים' },
    ],
    hints: [
      { title: 'רמז 1: Sliding Window', content: 'השתמשו ב-Sliding Window. עקבו אחר Counter של t ומספר התווים שכוסו בחלון הנוכחי.' },
      { title: 'רמז 2: have vs need', content: 'שמרו have (כמה תווים כוסו) ו-need (סה"כ תווים ייחודיים ב-t). כאשר have == need, כווצו מהשמאל.' },
    ],
  },
  {
    id: 45,
    title: 'Count Distinct in Window',
    titleHe: 'ספירת אלמנטים ייחודיים בחלון',
    topic: 'Sliding Window',
    difficulty: 'easy',
    acceptance: 68,
    companies: ['Google', 'Amazon'],
    descriptionHe: 'בהינתן מערך שלמים arr ומספר שלם k, מצאו את מספר האלמנטים הייחודיים בכל חלון ברוחב k. החזירו רשימה של מספרי האלמנטים הייחודיים בכל חלון.',
    examples: [
      { input: 'arr = [1,2,1,3,4,2,3], k = 4', output: '[3,4,4,3]' },
      { input: 'arr = [1,2,3], k = 2', output: '[2,2]' },
    ],
    constraints: [
      '1 <= k <= len(arr) <= 10^5',
      '0 <= arr[i] <= 10^5',
    ],
    starterCode: {
      python: `def count_distinct(arr, k):
    """Count distinct elements in each window of size k."""
    pass`,
    },
    functionName: 'count_distinct',
    testCases: [
      { inputs: [[1, 2, 1, 3, 4, 2, 3], 4], expected: [3, 4, 4, 3], label: 'k=4' },
      { inputs: [[1, 2, 3], 2], expected: [2, 2], label: 'k=2' },
      { inputs: [[1, 1, 1], 2], expected: [1, 1], label: 'כל אחד' },
    ],
    hints: [
      { title: 'רמז 1: Sliding Window + HashMap', content: 'שמרו HashMap של תדירות כל אלמנט בחלון הנוכחי.' },
      { title: 'רמז 2: כניסה/יציאה', content: 'כשאלמנט יוצא מהחלון, הורידו את תדירותו. אם הגיעה ל-0, הסירו מה-HashMap. גודל ה-HashMap הוא מספר הייחודיים.' },
    ],
  },
  {
    id: 46,
    title: 'Min Stack',
    titleHe: 'מחסנית עם מינימום',
    topic: 'Stack',
    difficulty: 'medium',
    acceptance: 54,
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft'],
    descriptionHe: 'עצבו מחסנית התומכת בפעולות push, pop, top ו-getMin בזמן O(1). getMin מחזירה את המינימום הנוכחי של המחסנית. ממשו את הפונקציה כרשימה של פעולות ותשובות.',
    examples: [
      { input: 'operations = ["push","push","push","getMin","pop","top","getMin"], values = [-2,0,-3,0,0,0,0]', output: '[-3,0,-2]' },
    ],
    constraints: [
      '-2^31 <= val <= 2^31 - 1',
      'מובטח שהמחסנית אינה ריקה בזמן קריאה ל-pop/top/getMin',
    ],
    starterCode: {
      python: `def min_stack_ops(operations, values):
    """Simulate MinStack operations and return results of getMin/top/pop."""
    stack = []
    min_stack = []
    results = []
    for op, val in zip(operations, values):
        if op == "push":
            stack.append(val)
            if not min_stack or val <= min_stack[-1]:
                min_stack.append(val)
            else:
                min_stack.append(min_stack[-1])
        elif op == "pop":
            stack.pop()
            min_stack.pop()
        elif op == "top":
            results.append(stack[-1])
        elif op == "getMin":
            results.append(min_stack[-1])
    return results`,
    },
    functionName: 'min_stack_ops',
    testCases: [
      { inputs: [['push', 'push', 'push', 'getMin', 'pop', 'top', 'getMin'], [-2, 0, -3, 0, 0, 0, 0]], expected: [-3, 0, -2], label: 'דוגמה בסיסית' },
      { inputs: [['push', 'push', 'getMin', 'pop', 'getMin'], [5, 3, 0, 0, 0]], expected: [3, 5], label: 'שני pushes' },
    ],
    hints: [
      { title: 'רמז 1: מחסנית עזר', content: 'שמרו מחסנית נוספת שבה כל אלמנט הוא המינימום של כל האלמנטים שמתחתיו.' },
      { title: 'רמז 2: סינכרון', content: 'בכל push, הוסיפו למחסנית העזר min(val, min_stack[-1]). בכל pop, הסירו גם ממחסנית העזר.' },
    ],
  },
  {
    id: 47,
    title: 'Evaluate Reverse Polish Notation',
    titleHe: 'חישוב ייצוג פולני הפוך',
    topic: 'Stack',
    difficulty: 'medium',
    acceptance: 44,
    companies: ['Amazon', 'Google', 'LinkedIn'],
    descriptionHe: 'בהינתן מערך של אסימונים tokens המייצג ביטוי אריתמטי ב-Reverse Polish Notation, חשבו והחזירו את ערכו. האופרטורים הם +, -, *, /. חילוק מחזיר מספר שלם (חיתוך לכיוון אפס). מובטח שהביטוי תקין.',
    examples: [
      { input: 'tokens = ["2","1","+","3","*"]', output: '9', explanation: '(2+1)*3=9' },
      { input: 'tokens = ["4","13","5","/","+"]', output: '6', explanation: '4+(13/5)=6' },
    ],
    constraints: [
      '1 <= len(tokens) <= 10^4',
      'tokens[i] הוא מספר שלם בין -200 ל-200, או אחד מ-+,-,*,/',
    ],
    starterCode: {
      python: `def eval_rpn(tokens):
    """Evaluate a Reverse Polish Notation expression."""
    pass`,
    },
    functionName: 'eval_rpn',
    testCases: [
      { inputs: [['2', '1', '+', '3', '*']], expected: 9, label: '(2+1)*3' },
      { inputs: [['4', '13', '5', '/', '+']], expected: 6, label: '4+(13/5)' },
      { inputs: [['10', '6', '9', '3', '+', '-11', '*', '/', '*', '17', '+', '5', '+']], expected: 22, label: 'ביטוי מורכב' },
    ],
    hints: [
      { title: 'רמז 1: Stack', content: 'השתמשו במחסנית. לכל מספר, הכניסו למחסנית. לכל אופרטור, הוציאו שני מספרים, חשבו ודחסו את התוצאה.' },
      { title: 'רמז 2: סדר אופרנדים', content: 'שימו לב לסדר: b = stack.pop(), a = stack.pop(), תוצאה = a op b (לא b op a).' },
    ],
  },
  {
    id: 48,
    title: 'Generate Parentheses',
    titleHe: 'יצירת סוגריים',
    topic: 'Stack',
    difficulty: 'medium',
    acceptance: 73,
    companies: ['Amazon', 'Google', 'Meta', 'Apple'],
    descriptionHe: 'בהינתן מספר שלם n, יצרו את כל השילובים האפשריים של n זוגות סוגריים תקינים. סוגריים תקינים הם שילוב שבו כל סגירה מתאימה לפתיחה קודמת.',
    examples: [
      { input: 'n = 3', output: '["((()))","(()())","(())()","()(())","()()()"]' },
      { input: 'n = 1', output: '["()"]' },
    ],
    constraints: [
      '1 <= n <= 8',
    ],
    starterCode: {
      python: `def generate_parenthesis(n):
    """Generate all combinations of well-formed parentheses."""
    pass`,
    },
    functionName: 'generate_parenthesis',
    testCases: [
      { inputs: [1], expected: ['()'], label: 'n=1' },
      { inputs: [2], expected: ['(())', '()()'], label: 'n=2' },
      { inputs: [3], expected: ['((()))', '(()())', '(())()', '()(())', '()()()'], label: 'n=3' },
    ],
    hints: [
      { title: 'רמז 1: Backtracking', content: 'השתמשו ב-Backtracking. עקבו אחר מספר הסוגריים הפתוחים והסגורים שהוספתם עד כה.' },
      { title: 'רמז 2: תנאי הוספה', content: 'הוסיפו "(" אם open < n, הוסיפו ")" אם close < open. הוסיפו לתוצאות כאשר open == close == n.' },
    ],
  },
  {
    id: 49,
    title: 'Daily Temperatures',
    titleHe: 'טמפרטורות יומיות',
    topic: 'Stack',
    difficulty: 'medium',
    acceptance: 68,
    companies: ['Amazon', 'Google', 'Uber'],
    descriptionHe: 'בהינתן מערך טמפרטורות temperatures, החזירו מערך answer כך ש-answer[i] הוא מספר הימים שיש לחכות אחרי יום i לטמפרטורה גבוהה יותר. אם אין יום כזה, answer[i] = 0.',
    examples: [
      { input: 'temperatures = [73,74,75,71,69,72,76,73]', output: '[1,1,4,2,1,1,0,0]' },
      { input: 'temperatures = [30,40,50,60]', output: '[1,1,1,0]' },
      { input: 'temperatures = [30,60,90]', output: '[1,1,0]' },
    ],
    constraints: [
      '1 <= len(temperatures) <= 10^5',
      '30 <= temperatures[i] <= 100',
    ],
    starterCode: {
      python: `def daily_temperatures(temperatures):
    """Return days to wait for a warmer temperature."""
    pass`,
    },
    functionName: 'daily_temperatures',
    testCases: [
      { inputs: [[73, 74, 75, 71, 69, 72, 76, 73]], expected: [1, 1, 4, 2, 1, 1, 0, 0], label: 'דוגמה בסיסית' },
      { inputs: [[30, 40, 50, 60]], expected: [1, 1, 1, 0], label: 'עולה' },
      { inputs: [[30, 60, 90]], expected: [1, 1, 0], label: 'שלוש' },
    ],
    hints: [
      { title: 'רמז 1: Monotonic Stack', content: 'השתמשו במחסנית מונוטונית (Monotonic Stack) שמחזיקה אינדקסים של ימים שעדיין לא מצאו טמפרטורה גבוהה יותר.' },
      { title: 'רמז 2: כאשר מוצאים', content: 'כאשר temperatures[i] > temperatures[stack.top()], הוציאו את האינדקס מהמחסנית ועדכנו answer.' },
    ],
  },
  {
    id: 50,
    title: 'Next Greater Element',
    titleHe: 'האלמנט הגדול הבא',
    topic: 'Stack',
    difficulty: 'easy',
    acceptance: 70,
    companies: ['Amazon', 'Google', 'Microsoft'],
    descriptionHe: 'בהינתן שני מערכים nums1 ו-nums2 ללא כפילויות, כאשר nums1 הוא תת-קבוצה של nums2, מצאו לכל אלמנט ב-nums1 את האלמנט הגדול הבא שלו ב-nums2. האלמנט הגדול הבא של x ב-nums2 הוא האלמנט הראשון מימין ל-x ב-nums2 שגדול ממנו. אם אין כזה, החזירו -1.',
    examples: [
      { input: 'nums1 = [4,1,2], nums2 = [1,3,4,2]', output: '[-1,3,-1]' },
      { input: 'nums1 = [2,4], nums2 = [1,2,3,4]', output: '[3,-1]' },
    ],
    constraints: [
      '1 <= len(nums1) <= len(nums2) <= 1000',
      '0 <= nums1[i], nums2[i] <= 10^4',
      'כל הערכים ייחודיים',
    ],
    starterCode: {
      python: `def next_greater_element(nums1, nums2):
    """Find next greater element for each element of nums1 in nums2."""
    pass`,
    },
    functionName: 'next_greater_element',
    testCases: [
      { inputs: [[4, 1, 2], [1, 3, 4, 2]], expected: [-1, 3, -1], label: 'דוגמה בסיסית' },
      { inputs: [[2, 4], [1, 2, 3, 4]], expected: [3, -1], label: 'שניים' },
      { inputs: [[1], [1]], expected: [-1], label: 'אלמנט בודד' },
    ],
    hints: [
      { title: 'רמז 1: Monotonic Stack על nums2', content: 'עברו על nums2 עם Monotonic Stack. עבור כל אלמנט, הוציאו מהמחסנית את כל האלמנטים הקטנים ממנו - אלה מצאו את Next Greater.' },
      { title: 'רמז 2: HashMap', content: 'שמרו HashMap של {value: next_greater} עבור nums2. לאחר מכן, לכל אלמנט ב-nums1 חפשו ב-HashMap.' },
    ],
  },
  {
    id: 51,
    title: 'Asteroid Collision',
    titleHe: 'התנגשות אסטרואידים',
    topic: 'Stack',
    difficulty: 'medium',
    acceptance: 44,
    companies: ['Amazon', 'Google'],
    descriptionHe: 'בהינתן מערך שלמים asteroids המייצג אסטרואידים בשורה, כל אסטרואיד נע ימינה (חיובי) או שמאלה (שלילי). אסטרואידים הנעים באותו כיוון לא יתנגשו. כאשר שניים מתנגשים, הקטן יותר נהרס. אם שווים שניהם נהרסים. החזירו את מצב האסטרואידים לאחר כל ההתנגשויות.',
    examples: [
      { input: 'asteroids = [5,10,-5]', output: '[5,10]', explanation: '10 ו-(-5) מתנגשים, 10 שורד' },
      { input: 'asteroids = [8,-8]', output: '[]' },
      { input: 'asteroids = [10,2,-5]', output: '[10]' },
    ],
    constraints: [
      '2 <= len(asteroids) <= 10^4',
      '-1000 <= asteroids[i] <= 1000',
      'asteroids[i] != 0',
    ],
    starterCode: {
      python: `def asteroid_collision(asteroids):
    """Simulate asteroid collisions and return surviving asteroids."""
    pass`,
    },
    functionName: 'asteroid_collision',
    testCases: [
      { inputs: [[5, 10, -5]], expected: [5, 10], label: 'שורד גדול' },
      { inputs: [[8, -8]], expected: [], label: 'מתבטלים' },
      { inputs: [[10, 2, -5]], expected: [10], label: 'שורד ראשון' },
      { inputs: [[-2, -1, 1, 2]], expected: [-2, -1, 1, 2], label: 'ללא התנגשות' },
    ],
    hints: [
      { title: 'רמז 1: Stack', content: 'השתמשו במחסנית. הכניסו אסטרואידים חיוביים. עבור אסטרואיד שלילי, בדקו התנגשות עם ראש המחסנית.' },
      { title: 'רמז 2: תנאי התנגשות', content: 'התנגשות קורית רק כאשר stack.top() > 0 ואסטרואיד נוכחי < 0. המשיכו לבדוק עד שאין התנגשות.' },
    ],
  },
  {
    id: 52,
    title: 'Largest Rectangle in Histogram',
    titleHe: 'המלבן הגדול ביותר בהיסטוגרמה',
    topic: 'Stack',
    difficulty: 'hard',
    acceptance: 42,
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft'],
    descriptionHe: 'בהינתן מערך גבהים heights המייצג היסטוגרמה, מצאו את שטח המלבן הגדול ביותר שניתן לצייר בתוך ההיסטוגרמה. כל עמודה ברוחב 1.',
    examples: [
      { input: 'heights = [2,1,5,6,2,3]', output: '10' },
      { input: 'heights = [2,4]', output: '4' },
    ],
    constraints: [
      '1 <= len(heights) <= 10^5',
      '0 <= heights[i] <= 10^4',
    ],
    starterCode: {
      python: `def largest_rectangle_area(heights):
    """Find largest rectangle area in histogram."""
    pass`,
    },
    functionName: 'largest_rectangle_area',
    testCases: [
      { inputs: [[2, 1, 5, 6, 2, 3]], expected: 10, label: 'דוגמה בסיסית' },
      { inputs: [[2, 4]], expected: 4, label: 'שתי עמודות' },
      { inputs: [[1]], expected: 1, label: 'עמודה אחת' },
      { inputs: [[6, 2, 5, 4, 5, 1, 6]], expected: 12, label: 'מורכב' },
    ],
    hints: [
      { title: 'רמז 1: Monotonic Stack', content: 'השתמשו ב-Monotonic Stack גדל. עבור כל עמודה, הוציאו עמודות גבוהות יותר וחשבו שטח.' },
      { title: 'רמז 2: רוחב חישוב', content: 'כאשר מוציאים עמודה h, הרוחב של המלבן הוא מהאינדקס שנשאר בראש המחסנית עד האינדקס הנוכחי.' },
    ],
  },
  {
    id: 53,
    title: 'Reverse Linked List (Array)',
    titleHe: 'היפוך רשימה מקושרת (מערך)',
    topic: 'Linked List (array-based)',
    difficulty: 'easy',
    acceptance: 73,
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Apple'],
    descriptionHe: 'בהינתן מערך המייצג רשימה מקושרת, היפכו אותו ב-in-place. החזירו את המערך ההפוך. זוהי גרסה מבוססת-מערך של בעיית היפוך רשימה מקושרת.',
    examples: [
      { input: 'head = [1,2,3,4,5]', output: '[5,4,3,2,1]' },
      { input: 'head = [1,2]', output: '[2,1]' },
      { input: 'head = []', output: '[]' },
    ],
    constraints: [
      '0 <= len(head) <= 5000',
      '-5000 <= head[i] <= 5000',
    ],
    starterCode: {
      python: `def reverse_list(head):
    """Reverse a linked list represented as an array."""
    pass`,
    },
    functionName: 'reverse_list',
    testCases: [
      { inputs: [[1, 2, 3, 4, 5]], expected: [5, 4, 3, 2, 1], label: 'חמישה אלמנטים' },
      { inputs: [[1, 2]], expected: [2, 1], label: 'שניים' },
      { inputs: [[]], expected: [], label: 'ריק' },
      { inputs: [[1]], expected: [1], label: 'בודד' },
    ],
    hints: [
      { title: 'רמז 1: Two Pointers', content: 'השתמשו בשני מצביעים: left בתחילת המערך ו-right בסופו. החליפו ביניהם והתקדמו פנימה.' },
      { title: 'רמז 2: פשוט', content: 'Python: return head[::-1] היא פתרון פשוט. לפתרון in-place השתמשו ב-while left < right.' },
    ],
  },
  {
    id: 54,
    title: 'Find Middle of Array',
    titleHe: 'מציאת האמצע של מערך',
    topic: 'Linked List (array-based)',
    difficulty: 'easy',
    acceptance: 76,
    companies: ['Amazon', 'Google', 'Apple'],
    descriptionHe: 'בהינתן מערך המייצג רשימה מקושרת, מצאו את האלמנט האמצעי. אם יש שני אמצעיים (כאשר המערך זוגי), החזירו את האמצעי השני. זוהי גרסה מבוססת-מערך של מציאת אמצע רשימה מקושרת.',
    examples: [
      { input: 'head = [1,2,3,4,5]', output: '3', explanation: 'האמצעי הוא 3' },
      { input: 'head = [1,2,3,4,5,6]', output: '4', explanation: 'האמצעי השני מתוך 3,4' },
    ],
    constraints: [
      '1 <= len(head) <= 100',
    ],
    starterCode: {
      python: `def middle_node(head):
    """Return the middle element of the array (second middle if even length)."""
    pass`,
    },
    functionName: 'middle_node',
    testCases: [
      { inputs: [[1, 2, 3, 4, 5]], expected: 3, label: 'אורך אי-זוגי' },
      { inputs: [[1, 2, 3, 4, 5, 6]], expected: 4, label: 'אורך זוגי' },
      { inputs: [[1]], expected: 1, label: 'בודד' },
      { inputs: [[1, 2]], expected: 2, label: 'שניים' },
    ],
    hints: [
      { title: 'רמז 1: אינדקס', content: 'האמצעי הוא האלמנט בינדקס len(head) // 2.' },
      { title: 'רמז 2: Slow/Fast', content: 'גרסה מקורית: השתמשו ב-slow/fast pointers. slow מתקדם צעד אחד, fast שניים. כשfast מגיע לסוף, slow באמצע.' },
    ],
  },
  {
    id: 55,
    title: 'Palindrome Array',
    titleHe: 'מערך פלינדרום',
    topic: 'Linked List (array-based)',
    difficulty: 'easy',
    acceptance: 50,
    companies: ['Amazon', 'Apple', 'Microsoft'],
    descriptionHe: 'בהינתן מערך המייצג רשימה מקושרת, בדקו האם הוא פלינדרום. פלינדרום הוא רצף שקריאתו זהה מראש ומסוף. זוהי גרסה מבוססת-מערך של בעיית "Palindrome Linked List".',
    examples: [
      { input: 'head = [1,2,2,1]', output: 'True' },
      { input: 'head = [1,2]', output: 'False' },
    ],
    constraints: [
      '1 <= len(head) <= 10^5',
      '0 <= head[i] <= 9',
    ],
    starterCode: {
      python: `def is_palindrome(head):
    """Check if array (linked list) is a palindrome."""
    pass`,
    },
    functionName: 'is_palindrome',
    testCases: [
      { inputs: [[1, 2, 2, 1]], expected: true, label: 'פלינדרום' },
      { inputs: [[1, 2]], expected: false, label: 'לא פלינדרום' },
      { inputs: [[1]], expected: true, label: 'בודד' },
      { inputs: [[1, 0, 1]], expected: true, label: 'אורך אי-זוגי' },
    ],
    hints: [
      { title: 'רמז 1: Two Pointers', content: 'השתמשו בשני מצביעים: left מהתחלה ו-right מהסוף. בדקו שהאלמנטים זהים.' },
      { title: 'רמז 2: פשוט', content: 'Python: return head == head[::-1] היא פתרון ישיר.' },
    ],
  },
  {
    id: 56,
    title: 'Add Two Numbers (Arrays)',
    titleHe: 'חיבור שני מספרים (מערכים)',
    topic: 'Linked List (array-based)',
    difficulty: 'medium',
    acceptance: 43,
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft'],
    descriptionHe: 'בהינתן שני מספרים לא-שליליים המיוצגים כרשימות (ספרות בסדר הפוך), חברו אותם והחזירו את הסכום כרשימה (גם בסדר הפוך). כל ספרה היא בין 0 ל-9. זוהי גרסה מבוססת-מערך של "Add Two Numbers".',
    examples: [
      { input: 'l1 = [2,4,3], l2 = [5,6,4]', output: '[7,0,8]', explanation: '342 + 465 = 807' },
      { input: 'l1 = [0], l2 = [0]', output: '[0]' },
      { input: 'l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]', output: '[8,9,9,9,0,0,0,1]' },
    ],
    constraints: [
      '1 <= len(l1), len(l2) <= 100',
      '0 <= l1[i], l2[i] <= 9',
      'המספרים אינם מכילים אפסים מובילים פרט ל-0 עצמו',
    ],
    starterCode: {
      python: `def add_two_numbers(l1, l2):
    """Add two numbers represented as reversed digit arrays."""
    pass`,
    },
    functionName: 'add_two_numbers',
    testCases: [
      { inputs: [[2, 4, 3], [5, 6, 4]], expected: [7, 0, 8], label: '342+465' },
      { inputs: [[0], [0]], expected: [0], label: 'אפס' },
      { inputs: [[9, 9, 9, 9, 9, 9, 9], [9, 9, 9, 9]], expected: [8, 9, 9, 9, 0, 0, 0, 1], label: 'נשא' },
    ],
    hints: [
      { title: 'רמז 1: ספרה-ספרה', content: 'עברו על שני המערכים בו-זמנית, חברו ספרות עם נשא (carry).' },
      { title: 'רמז 2: נשא', content: 'carry = (digit1 + digit2 + carry) // 10, ספרה = (digit1 + digit2 + carry) % 10. אל תשכחו נשא בסוף.' },
    ],
  },
  {
    id: 57,
    title: 'Merge K Sorted Arrays',
    titleHe: 'מיזוג K מערכים ממוינים',
    topic: 'Linked List (array-based)',
    difficulty: 'hard',
    acceptance: 48,
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft'],
    descriptionHe: 'בהינתן רשימה של k מערכים ממוינים, מזגו אותם למערך ממוין אחד. זוהי גרסה מבוססת-מערך של "Merge K Sorted Lists".',
    examples: [
      { input: 'lists = [[1,4,5],[1,3,4],[2,6]]', output: '[1,1,2,3,4,4,5,6]' },
      { input: 'lists = []', output: '[]' },
      { input: 'lists = [[]]', output: '[]' },
    ],
    constraints: [
      '0 <= len(lists) <= 10^4',
      '0 <= len(lists[i]) <= 500',
      '-10^4 <= lists[i][j] <= 10^4',
      'כל רשימה ממוינת בסדר עולה',
    ],
    starterCode: {
      python: `def merge_k_sorted(lists):
    """Merge k sorted arrays into one sorted array."""
    pass`,
    },
    functionName: 'merge_k_sorted',
    testCases: [
      { inputs: [[[1, 4, 5], [1, 3, 4], [2, 6]]], expected: [1, 1, 2, 3, 4, 4, 5, 6], label: 'שלושה מערכים' },
      { inputs: [[]], expected: [], label: 'ריק' },
      { inputs: [[[1], [0]]], expected: [0, 1], label: 'שניים פשוטים' },
    ],
    hints: [
      { title: 'רמז 1: Min-Heap', content: 'השתמשו ב-Min-Heap (heapq). הכניסו את הראשון מכל מערך ל-Heap. הוציאו את הקטן ביותר והוסיפו את הבא מאותו מערך.' },
      { title: 'רמז 2: חלוקה ומיזוג', content: 'גישה חלופית: מזגו מערכים שניים-שניים (Divide & Conquer) כמו merge sort.' },
    ],
  },
  {
    id: 58,
    title: 'Remove Nth From End',
    titleHe: 'הסרת האלמנט ה-N מהסוף',
    topic: 'Linked List (array-based)',
    difficulty: 'medium',
    acceptance: 42,
    companies: ['Amazon', 'Google', 'Microsoft'],
    descriptionHe: 'בהינתן מערך המייצג רשימה מקושרת ומספר n, הסירו את האלמנט ה-n מהסוף והחזירו את המערך המעודכן. מובטח ש-n תקין.',
    examples: [
      { input: 'head = [1,2,3,4,5], n = 2', output: '[1,2,3,5]' },
      { input: 'head = [1], n = 1', output: '[]' },
      { input: 'head = [1,2], n = 1', output: '[1]' },
    ],
    constraints: [
      '1 <= len(head) <= 30',
      '0 <= head[i] <= 100',
      '1 <= n <= len(head)',
    ],
    starterCode: {
      python: `def remove_nth_from_end(head, n):
    """Remove nth element from end of array."""
    pass`,
    },
    functionName: 'remove_nth_from_end',
    testCases: [
      { inputs: [[1, 2, 3, 4, 5], 2], expected: [1, 2, 3, 5], label: 'n=2' },
      { inputs: [[1], 1], expected: [], label: 'בודד' },
      { inputs: [[1, 2], 1], expected: [1], label: 'n=1' },
    ],
    hints: [
      { title: 'רמז 1: אינדקס מהסוף', content: 'האלמנט ה-n מהסוף נמצא בינדקס len(head) - n.' },
      { title: 'רמז 2: Two Pointers', content: 'גרסה מקורית: הניחו מרחק n בין שני מצביעים. כשהאחד מגיע לסוף, השני מצביע על האלמנט להסרה.' },
    ],
  },
  {
    id: 59,
    title: 'Reorder Array',
    titleHe: 'סידור מחדש של מערך',
    topic: 'Linked List (array-based)',
    difficulty: 'medium',
    acceptance: 60,
    companies: ['Amazon', 'Google'],
    descriptionHe: 'בהינתן מערך head, סדרו אותו כך שהסדר הוא: L0, Ln, L1, Ln-1, L2, Ln-2, ... לדוגמה [1,2,3,4,5] הופך ל-[1,5,2,4,3]. בצעו זאת in-place. זוהי גרסה מבוססת-מערך של "Reorder List".',
    examples: [
      { input: 'head = [1,2,3,4]', output: '[1,4,2,3]' },
      { input: 'head = [1,2,3,4,5]', output: '[1,5,2,4,3]' },
    ],
    constraints: [
      '1 <= len(head) <= 5*10^4',
      '1 <= head[i] <= 1000',
    ],
    starterCode: {
      python: `def reorder_list(head):
    """Reorder array as L0, Ln, L1, Ln-1, ..."""
    pass`,
    },
    functionName: 'reorder_list',
    testCases: [
      { inputs: [[1, 2, 3, 4]], expected: [1, 4, 2, 3], label: 'ארבעה' },
      { inputs: [[1, 2, 3, 4, 5]], expected: [1, 5, 2, 4, 3], label: 'חמישה' },
      { inputs: [[1]], expected: [1], label: 'בודד' },
    ],
    hints: [
      { title: 'רמז 1: שני חצאים', content: 'חלקו למערך לשני חצאים. היפכו את החצי השני ואז זרגו לסירוגין.' },
      { title: 'רמז 2: מיזוג', content: 'לאחר ההיפוך, קחו אלמנטים לסירוגין: אחד מהחצי הראשון, אחד מהחצי השני.' },
    ],
  },
  {
    id: 60,
    title: 'Binary Search',
    titleHe: 'חיפוש בינארי',
    topic: 'Binary Search',
    difficulty: 'easy',
    acceptance: 56,
    companies: ['Amazon', 'Google', 'Microsoft', 'Apple'],
    descriptionHe: 'בהינתן מערך שלמים ממוין nums ומספר שלם target, מצאו את האינדקס של target. אם target לא קיים, החזירו -1. מימשו את החיפוש הבינארי הקלאסי בזמן O(log n).',
    examples: [
      { input: 'nums = [-1,0,3,5,9,12], target = 9', output: '4' },
      { input: 'nums = [-1,0,3,5,9,12], target = 2', output: '-1' },
    ],
    constraints: [
      '1 <= len(nums) <= 10^4',
      '-10^4 < nums[i], target < 10^4',
      'כל ערכי nums ייחודיים',
      'nums ממוין בסדר עולה',
    ],
    starterCode: {
      python: `def search(nums, target):
    """Binary search - return index of target or -1 if not found."""
    pass`,
    },
    functionName: 'search',
    testCases: [
      { inputs: [[-1, 0, 3, 5, 9, 12], 9], expected: 4, label: 'נמצא' },
      { inputs: [[-1, 0, 3, 5, 9, 12], 2], expected: -1, label: 'לא נמצא' },
      { inputs: [[5], 5], expected: 0, label: 'בודד נמצא' },
      { inputs: [[5], 3], expected: -1, label: 'בודד לא נמצא' },
    ],
    hints: [
      { title: 'רמז 1: מציאת אמצע', content: 'הגדירו left=0, right=len-1. בכל איטרציה חשבו mid=(left+right)//2.' },
      { title: 'רמז 2: כיוון החיפוש', content: 'אם nums[mid] == target, מצאתם! אם target > nums[mid], חפשו ימין. אחרת שמאל.' },
    ],
  },
  {
    id: 61,
    title: 'Search in Rotated Sorted Array',
    titleHe: 'חיפוש במערך ממוין ומסובב',
    topic: 'Binary Search',
    difficulty: 'medium',
    acceptance: 39,
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Apple'],
    descriptionHe: 'בהינתן מערך ממוין בסדר עולה שסובב בנקודה כלשהי, ו-target, מצאו את אינדקס target. אם לא קיים, החזירו -1. הפתרון חייב להיות O(log n). הערכים במערך ייחודיים.',
    examples: [
      { input: 'nums = [4,5,6,7,0,1,2], target = 0', output: '4' },
      { input: 'nums = [4,5,6,7,0,1,2], target = 3', output: '-1' },
    ],
    constraints: [
      '1 <= len(nums) <= 5000',
      '-10^4 <= nums[i] <= 10^4',
      'כל ערכים ייחודיים',
      '0 <= k <= 5000',
    ],
    starterCode: {
      python: `def search_rotated(nums, target):
    """Search in rotated sorted array."""
    pass`,
    },
    functionName: 'search_rotated',
    testCases: [
      { inputs: [[4, 5, 6, 7, 0, 1, 2], 0], expected: 4, label: 'נמצא' },
      { inputs: [[4, 5, 6, 7, 0, 1, 2], 3], expected: -1, label: 'לא נמצא' },
      { inputs: [[1], 0], expected: -1, label: 'בודד' },
    ],
    hints: [
      { title: 'רמז 1: בינארי עם פיצול', content: 'בכל איטרציה, אחד משני החצאים (left-mid או mid-right) בהכרח ממוין. קבעו איזה.' },
      { title: 'רמז 2: בדיקת חצי', content: 'אם nums[left] <= nums[mid], החצי השמאלי ממוין. בדקו אם target בו ואחרת חפשו בימין.' },
    ],
  },
  {
    id: 62,
    title: 'Find Minimum in Rotated Sorted Array',
    titleHe: 'מציאת מינימום במערך ממוין ומסובב',
    topic: 'Binary Search',
    difficulty: 'medium',
    acceptance: 48,
    companies: ['Amazon', 'Google', 'Microsoft'],
    descriptionHe: 'בהינתן מערך ממוין בסדר עולה שסובב בנקודה כלשהי, מצאו את המינימום. הפתרון חייב להיות O(log n). הערכים במערך ייחודיים.',
    examples: [
      { input: 'nums = [3,4,5,1,2]', output: '1' },
      { input: 'nums = [4,5,6,7,0,1,2]', output: '0' },
      { input: 'nums = [11,13,15,17]', output: '11' },
    ],
    constraints: [
      'n == len(nums)',
      '1 <= n <= 5000',
      '-5000 <= nums[i] <= 5000',
      'כל ערכים ייחודיים',
    ],
    starterCode: {
      python: `def find_min(nums):
    """Find minimum element in rotated sorted array."""
    pass`,
    },
    functionName: 'find_min',
    testCases: [
      { inputs: [[3, 4, 5, 1, 2]], expected: 1, label: 'סיבוב' },
      { inputs: [[4, 5, 6, 7, 0, 1, 2]], expected: 0, label: 'נקודת סיבוב' },
      { inputs: [[11, 13, 15, 17]], expected: 11, label: 'לא מסובב' },
    ],
    hints: [
      { title: 'רמז 1: השוואה לימין', content: 'אם nums[mid] > nums[right], המינימום בחצי הימני. אחרת בחצי השמאלי (כולל mid).' },
      { title: 'רמז 2: תנאי עצירה', content: 'כאשר left == right, מצאתם את המינימום.' },
    ],
  },
  {
    id: 63,
    title: 'Search a 2D Matrix',
    titleHe: 'חיפוש במטריצה דו-ממדית',
    topic: 'Binary Search',
    difficulty: 'medium',
    acceptance: 50,
    companies: ['Amazon', 'Google', 'Microsoft'],
    descriptionHe: 'בהינתן מטריצה m x n שכל שורה ממוינת בסדר עולה ושורה ראשונה כל שורה גדולה מהאחרון בשורה הקודמת, בדקו האם target קיים. הפתרון חייב להיות O(log(m*n)).',
    examples: [
      { input: 'matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3', output: 'True' },
      { input: 'matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13', output: 'False' },
    ],
    constraints: [
      'm == len(matrix)',
      'n == len(matrix[0])',
      '1 <= m, n <= 100',
      '-10^4 <= matrix[i][j], target <= 10^4',
    ],
    starterCode: {
      python: `def search_matrix(matrix, target):
    """Search for target in m x n matrix using binary search."""
    pass`,
    },
    functionName: 'search_matrix',
    testCases: [
      { inputs: [[[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 3], expected: true, label: 'נמצא' },
      { inputs: [[[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 13], expected: false, label: 'לא נמצא' },
      { inputs: [[[1]], 1], expected: true, label: 'תא אחד' },
    ],
    hints: [
      { title: 'רמז 1: מטריצה כמערך', content: 'חשבו על המטריצה כמערך חד-ממדי ממוין. אינדקס i מתאים לשורה i//n ועמודה i%n.' },
      { title: 'רמז 2: בינארי על מספר וירטואלי', content: 'הריצו חיפוש בינארי על הטווח [0, m*n-1] והמירו כל mid לקואורדינטות במטריצה.' },
    ],
  },
  {
    id: 64,
    title: 'Find Peak Element',
    titleHe: 'מציאת אלמנט שיא',
    topic: 'Binary Search',
    difficulty: 'medium',
    acceptance: 53,
    companies: ['Amazon', 'Google', 'Microsoft', 'Facebook'],
    descriptionHe: 'אלמנט שיא הוא אלמנט שגדול משכניו. בהינתן מערך nums, מצאו אינדקס של אלמנט שיא. מובטח ש-nums[-1] = nums[n] = -infinity. הפתרון חייב להיות O(log n). אם יש כמה שיאים, החזירו כל אחד.',
    examples: [
      { input: 'nums = [1,2,3,1]', output: '2' },
      { input: 'nums = [1,2,1,3,5,6,4]', output: '5', explanation: 'אינדקס 1 או 5' },
    ],
    constraints: [
      '1 <= len(nums) <= 1000',
      '-2^31 <= nums[i] <= 2^31 - 1',
      'nums[i] != nums[i+1] לכל i תקין',
    ],
    starterCode: {
      python: `def find_peak_element(nums):
    """Find any peak element index using binary search."""
    pass`,
    },
    functionName: 'find_peak_element',
    testCases: [
      { inputs: [[1, 2, 3, 1]], expected: 2, label: 'שיא אחד' },
      { inputs: [[1]], expected: 0, label: 'בודד' },
      { inputs: [[1, 2]], expected: 1, label: 'שניים' },
    ],
    hints: [
      { title: 'רמז 1: Binary Search', content: 'אם nums[mid] < nums[mid+1], יש שיא בצד ימין. אחרת בצד שמאל (כולל mid).' },
      { title: 'רמז 2: תנאי עצירה', content: 'כאשר left == right, האינדקס הנוכחי הוא שיא.' },
    ],
  },
  {
    id: 65,
    title: 'Count Occurrences in Sorted Array',
    titleHe: 'ספירת הופעות במערך ממוין',
    topic: 'Binary Search',
    difficulty: 'easy',
    acceptance: 65,
    companies: ['Amazon', 'Google'],
    descriptionHe: 'בהינתן מערך שלמים ממוין nums ומספר target, מצאו את מספר ההופעות של target במערך. הפתרון חייב להיות O(log n). השתמשו בחיפוש בינארי למציאת ההופעה הראשונה והאחרונה.',
    examples: [
      { input: 'nums = [1,1,2,2,2,3,4], target = 2', output: '3' },
      { input: 'nums = [1,1,2,2,2,3,4], target = 5', output: '0' },
    ],
    constraints: [
      '1 <= len(nums) <= 10^5',
      '-10^4 <= nums[i], target <= 10^4',
      'nums ממוין',
    ],
    starterCode: {
      python: `def count_occurrences(nums, target):
    """Count occurrences of target in sorted array using binary search."""
    pass`,
    },
    functionName: 'count_occurrences',
    testCases: [
      { inputs: [[1, 1, 2, 2, 2, 3, 4], 2], expected: 3, label: 'שלוש הופעות' },
      { inputs: [[1, 1, 2, 2, 2, 3, 4], 5], expected: 0, label: 'לא קיים' },
      { inputs: [[1], 1], expected: 1, label: 'בודד' },
    ],
    hints: [
      { title: 'רמז 1: Lower/Upper Bound', content: 'מצאו את האינדקס הראשון שבו nums[i] >= target (lower bound) ואת האינדקס הראשון שבו nums[i] > target (upper bound).' },
      { title: 'רמז 2: ספירה', content: 'מספר ההופעות = upper_bound - lower_bound.' },
    ],
  },
  {
    id: 66,
    title: 'Search Insert Position',
    titleHe: 'מציאת מיקום הכנסה',
    topic: 'Binary Search',
    difficulty: 'easy',
    acceptance: 44,
    companies: ['Amazon', 'Google', 'Apple'],
    descriptionHe: 'בהינתן מערך ממוין nums עם ערכים ייחודיים ו-target, החזירו את האינדקס אם target נמצא. אחרת, החזירו את האינדקס שבו target יוכנס כדי שהמערך יישאר ממוין. הפתרון חייב להיות O(log n).',
    examples: [
      { input: 'nums = [1,3,5,6], target = 5', output: '2' },
      { input: 'nums = [1,3,5,6], target = 2', output: '1' },
      { input: 'nums = [1,3,5,6], target = 7', output: '4' },
    ],
    constraints: [
      '1 <= len(nums) <= 10^4',
      '-10^4 <= nums[i] <= 10^4',
      'nums ממוין עם ערכים ייחודיים',
    ],
    starterCode: {
      python: `def search_insert(nums, target):
    """Find index of target or where it should be inserted."""
    pass`,
    },
    functionName: 'search_insert',
    testCases: [
      { inputs: [[1, 3, 5, 6], 5], expected: 2, label: 'נמצא' },
      { inputs: [[1, 3, 5, 6], 2], expected: 1, label: 'הכנסה באמצע' },
      { inputs: [[1, 3, 5, 6], 7], expected: 4, label: 'הכנסה בסוף' },
      { inputs: [[1, 3, 5, 6], 0], expected: 0, label: 'הכנסה בתחילה' },
    ],
    hints: [
      { title: 'רמז 1: Binary Search', content: 'הריצו חיפוש בינארי. אם target נמצא, החזירו mid. אם לא, left בסוף הלולאה הוא מיקום ההכנסה.' },
      { title: 'רמז 2: left pointer', content: 'כאשר החיפוש מסתיים ללא מציאה, left מצביע על המיקום הנכון להכנסה.' },
    ],
  },
  {
    id: 67,
    title: 'Median of Two Sorted Arrays',
    titleHe: 'חציון של שני מערכים ממוינים',
    topic: 'Binary Search',
    difficulty: 'hard',
    acceptance: 36,
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Apple'],
    descriptionHe: 'בהינתן שני מערכים ממוינים nums1 ו-nums2, מצאו את החציון של שניהם יחד. הפתרון חייב להיות O(log(m+n)). החציון הוא האלמנט האמצעי (אם סך כולל אי-זוגי) או ממוצע שני האמצעיים (אם זוגי).',
    examples: [
      { input: 'nums1 = [1,3], nums2 = [2]', output: '2.0' },
      { input: 'nums1 = [1,2], nums2 = [3,4]', output: '2.5' },
    ],
    constraints: [
      '0 <= len(nums1) <= 1000',
      '0 <= len(nums2) <= 1000',
      '1 <= len(nums1) + len(nums2) <= 2000',
      '-10^6 <= nums1[i], nums2[i] <= 10^6',
    ],
    starterCode: {
      python: `def find_median_sorted_arrays(nums1, nums2):
    """Find median of two sorted arrays."""
    pass`,
    },
    functionName: 'find_median_sorted_arrays',
    testCases: [
      { inputs: [[1, 3], [2]], expected: 2.0, label: 'שלושה אלמנטים' },
      { inputs: [[1, 2], [3, 4]], expected: 2.5, label: 'ארבעה אלמנטים' },
      { inputs: [[0, 0], [0, 0]], expected: 0.0, label: 'כל אפסים' },
    ],
    hints: [
      { title: 'רמז 1: Binary Search על החתך', content: 'עשו Binary Search על nums1. לכל חתך i ב-nums1, קבעו חתך j ב-nums2 כך ש-i+j = (m+n)//2.' },
      { title: 'רמז 2: תנאי חתך תקין', content: 'החתך תקין אם nums1[i-1] <= nums2[j] ו-nums2[j-1] <= nums1[i]. כאשר תקין, חשבו חציון מהגבולות.' },
    ],
  },
  {
    id: 68,
    title: 'Climbing Stairs',
    titleHe: 'טיפוס מדרגות',
    topic: 'Dynamic Programming',
    difficulty: 'easy',
    acceptance: 52,
    companies: ['Amazon', 'Google', 'Apple', 'Microsoft'],
    descriptionHe: 'אתם מטפסים מדרגות ויש n מדרגות להגיע לראש. בכל פעם אפשר לטפס 1 או 2 מדרגות. בכמה דרכים שונות ניתן לטפס לראש? שימו לב שזוהי בעיה קלאסית של תכנות דינמי עם קשר לסדרת פיבונאצ\'י.',
    examples: [
      { input: 'n = 2', output: '2', explanation: '1+1, 2' },
      { input: 'n = 3', output: '3', explanation: '1+1+1, 1+2, 2+1' },
    ],
    constraints: [
      '1 <= n <= 45',
    ],
    starterCode: {
      python: `def climb_stairs(n):
    """Count distinct ways to climb n stairs (1 or 2 steps at a time)."""
    pass`,
    },
    functionName: 'climb_stairs',
    testCases: [
      { inputs: [2], expected: 2, label: 'n=2' },
      { inputs: [3], expected: 3, label: 'n=3' },
      { inputs: [1], expected: 1, label: 'n=1' },
      { inputs: [5], expected: 8, label: 'n=5' },
    ],
    hints: [
      { title: 'רמז 1: תת-בעיות', content: 'כדי להגיע למדרגה n, אפשר להגיע מ-n-1 (צעד 1) או מ-n-2 (צעד 2). לכן dp[n] = dp[n-1] + dp[n-2].' },
      { title: 'רמז 2: Fibonacci', content: 'זוהי בדיוק סדרת פיבונאצ\'י! dp[1]=1, dp[2]=2. חשבו הלאה.' },
    ],
  },
  {
    id: 69,
    title: 'House Robber',
    titleHe: 'שודד הבתים',
    topic: 'Dynamic Programming',
    difficulty: 'medium',
    acceptance: 50,
    companies: ['Amazon', 'Google', 'Microsoft', 'Airbnb'],
    descriptionHe: 'שודד רוצה לשדוד בתים ברחוב. כל בית[i] מכיל כסף nums[i]. לא ניתן לשדוד שני בתים סמוכים (מערכת אזעקה). מצאו את הסכום המקסימלי שניתן לגנוב. בתים לא מסודרים במעגל.',
    examples: [
      { input: 'nums = [1,2,3,1]', output: '4', explanation: 'שדוד 1+3=4' },
      { input: 'nums = [2,7,9,3,1]', output: '12', explanation: 'שדוד 2+9+1=12' },
    ],
    constraints: [
      '1 <= len(nums) <= 100',
      '0 <= nums[i] <= 400',
    ],
    starterCode: {
      python: `def rob(nums):
    """Find maximum amount you can rob without robbing adjacent houses."""
    pass`,
    },
    functionName: 'rob',
    testCases: [
      { inputs: [[1, 2, 3, 1]], expected: 4, label: 'דוגמה 1' },
      { inputs: [[2, 7, 9, 3, 1]], expected: 12, label: 'דוגמה 2' },
      { inputs: [[1]], expected: 1, label: 'בית אחד' },
      { inputs: [[2, 1, 1, 2]], expected: 4, label: 'שניים בקצוות' },
    ],
    hints: [
      { title: 'רמז 1: dp[i]', content: 'dp[i] = הסכום המקסימלי עם הבתים עד i. לכל בית, בחרו לשדוד (dp[i-2] + nums[i]) או לדלג (dp[i-1]).' },
      { title: 'רמז 2: dp[i] = max(dp[i-1], dp[i-2] + nums[i])', content: 'ניתן לחסוך מרחב: שמרו רק שני ערכים קודמים במקום מערך שלם.' },
    ],
  },
  {
    id: 70,
    title: 'Coin Change',
    titleHe: 'עודף מטבעות',
    topic: 'Dynamic Programming',
    difficulty: 'medium',
    acceptance: 42,
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Apple'],
    descriptionHe: 'בהינתן מטבעות coins ומספר שלם amount, מצאו את מספר המטבעות המינימלי הנדרש להגיע ל-amount. אפשר להשתמש בכל מטבע אינסוף פעמים. אם לא ניתן, החזירו -1.',
    examples: [
      { input: 'coins = [1,5,11], amount = 11', output: '1', explanation: '11=11' },
      { input: 'coins = [1,2,5], amount = 11', output: '3', explanation: '5+5+1' },
      { input: 'coins = [2], amount = 3', output: '-1' },
    ],
    constraints: [
      '1 <= len(coins) <= 12',
      '1 <= coins[i] <= 2^31 - 1',
      '0 <= amount <= 10^4',
    ],
    starterCode: {
      python: `def coin_change(coins, amount):
    """Find minimum number of coins to make amount."""
    pass`,
    },
    functionName: 'coin_change',
    testCases: [
      { inputs: [[1, 2, 5], 11], expected: 3, label: '5+5+1' },
      { inputs: [[2], 3], expected: -1, label: 'לא ניתן' },
      { inputs: [[1], 0], expected: 0, label: 'amount=0' },
      { inputs: [[1, 5, 11], 11], expected: 1, label: 'מטבע מושלם' },
    ],
    hints: [
      { title: 'רמז 1: Bottom-Up DP', content: 'הגדירו dp[i] = מינימום מטבעות ל-amount=i. dp[0]=0, dp[i]=infinity בהתחלה.' },
      { title: 'רמז 2: מעבר', content: 'לכל amount i, לכל מטבע c: dp[i] = min(dp[i], dp[i-c] + 1) אם i >= c.' },
    ],
  },
  {
    id: 71,
    title: 'Longest Common Subsequence',
    titleHe: 'תת-סדרה משותפת ארוכה ביותר',
    topic: 'Dynamic Programming',
    difficulty: 'medium',
    acceptance: 57,
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft'],
    descriptionHe: 'בהינתן שתי מחרוזות text1 ו-text2, מצאו את אורך תת-הסדרה המשותפת הארוכה ביותר. תת-סדרה היא רצף שנגזר ממחרוזת על ידי מחיקת תווים אחדים מבלי לשנות את הסדר. אם אין תת-סדרה משותפת, החזירו 0.',
    examples: [
      { input: 'text1 = "abcde", text2 = "ace"', output: '3', explanation: '"ace"' },
      { input: 'text1 = "abc", text2 = "abc"', output: '3' },
      { input: 'text1 = "abc", text2 = "def"', output: '0' },
    ],
    constraints: [
      '1 <= len(text1), len(text2) <= 1000',
      'text1 ו-text2 מורכבות מאותיות לועזיות קטנות',
    ],
    starterCode: {
      python: `def longest_common_subsequence(text1, text2):
    """Find length of longest common subsequence."""
    pass`,
    },
    functionName: 'longest_common_subsequence',
    testCases: [
      { inputs: ['abcde', 'ace'], expected: 3, label: '"ace"' },
      { inputs: ['abc', 'abc'], expected: 3, label: 'זהות' },
      { inputs: ['abc', 'def'], expected: 0, label: 'אין משותף' },
    ],
    hints: [
      { title: 'רמז 1: DP דו-ממדי', content: 'dp[i][j] = אורך ה-LCS של text1[:i] ו-text2[:j].' },
      { title: 'רמז 2: מעבר', content: 'אם text1[i-1] == text2[j-1]: dp[i][j] = dp[i-1][j-1] + 1. אחרת: dp[i][j] = max(dp[i-1][j], dp[i][j-1]).' },
    ],
  },
  {
    id: 72,
    title: 'Unique Paths',
    titleHe: 'מסלולים ייחודיים',
    topic: 'Dynamic Programming',
    difficulty: 'medium',
    acceptance: 63,
    companies: ['Amazon', 'Google', 'Microsoft', 'Uber'],
    descriptionHe: 'רובוט נמצא בפינה השמאלית-עליונה של רשת m x n. הרובוט יכול לנוע רק ימינה או למטה. מצאו את מספר המסלולים הייחודיים לפינה הימנית-תחתונה.',
    examples: [
      { input: 'm = 3, n = 7', output: '28' },
      { input: 'm = 3, n = 2', output: '3' },
    ],
    constraints: [
      '1 <= m, n <= 100',
    ],
    starterCode: {
      python: `def unique_paths(m, n):
    """Count unique paths from top-left to bottom-right in m x n grid."""
    pass`,
    },
    functionName: 'unique_paths',
    testCases: [
      { inputs: [3, 7], expected: 28, label: '3x7' },
      { inputs: [3, 2], expected: 3, label: '3x2' },
      { inputs: [1, 1], expected: 1, label: '1x1' },
    ],
    hints: [
      { title: 'רמז 1: dp[i][j]', content: 'dp[i][j] = מספר מסלולים ל-(i,j). השורה הראשונה והעמודה הראשונה = 1 (דרך אחת לכל תא).' },
      { title: 'רמז 2: מעבר', content: 'dp[i][j] = dp[i-1][j] + dp[i][j-1] (מגיעים מלמעלה או משמאל).' },
    ],
  },
  {
    id: 73,
    title: 'Jump Game',
    titleHe: 'משחק קפיצות',
    topic: 'Dynamic Programming',
    difficulty: 'medium',
    acceptance: 38,
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft'],
    descriptionHe: 'בהינתן מערך שלמים nums, כאשר nums[i] הוא מספר הצעדים המקסימלי שניתן לקפוץ מהאינדקס i, קבעו האם ניתן להגיע לאינדקס האחרון. מתחילים מאינדקס 0.',
    examples: [
      { input: 'nums = [2,3,1,1,4]', output: 'True', explanation: '0->1->4' },
      { input: 'nums = [3,2,1,0,4]', output: 'False', explanation: 'לא ניתן לעבור 0' },
    ],
    constraints: [
      '1 <= len(nums) <= 10^4',
      '0 <= nums[i] <= 10^5',
    ],
    starterCode: {
      python: `def can_jump(nums):
    """Determine if you can reach the last index."""
    pass`,
    },
    functionName: 'can_jump',
    testCases: [
      { inputs: [[2, 3, 1, 1, 4]], expected: true, label: 'ניתן' },
      { inputs: [[3, 2, 1, 0, 4]], expected: false, label: 'לא ניתן' },
      { inputs: [[0]], expected: true, label: 'בודד' },
      { inputs: [[1, 0, 1, 0]], expected: false, label: 'נתקע' },
    ],
    hints: [
      { title: 'רמז 1: max_reach', content: 'עקבו אחר max_reach - הגעה המקסימלית שניתן להגיע אליה.' },
      { title: 'רמז 2: בדיקה', content: 'לכל i, אם i > max_reach, לא ניתן להמשיך. עדכנו max_reach = max(max_reach, i + nums[i]).' },
    ],
  },
  {
    id: 74,
    title: 'Word Break',
    titleHe: 'שבירת מילה',
    topic: 'Dynamic Programming',
    difficulty: 'medium',
    acceptance: 45,
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Apple'],
    descriptionHe: 'בהינתן מחרוזת s ומילון wordDict, קבעו האם s יכולה להיות מחולקת לרצף של מילים מהמילון. ניתן להשתמש באותה מילה מספר פעמים.',
    examples: [
      { input: 's = "leetcode", wordDict = ["leet","code"]', output: 'True' },
      { input: 's = "applepenapple", wordDict = ["apple","pen"]', output: 'True' },
      { input: 's = "catsandog", wordDict = ["cats","dog","sand","and","cat"]', output: 'False' },
    ],
    constraints: [
      '1 <= len(s) <= 300',
      '1 <= len(wordDict) <= 1000',
      '1 <= len(wordDict[i]) <= 20',
    ],
    starterCode: {
      python: `def word_break(s, wordDict):
    """Return True if s can be segmented into words from wordDict."""
    pass`,
    },
    functionName: 'word_break',
    testCases: [
      { inputs: ['leetcode', ['leet', 'code']], expected: true, label: 'ניתן' },
      { inputs: ['applepenapple', ['apple', 'pen']], expected: true, label: 'שימוש כפול' },
      { inputs: ['catsandog', ['cats', 'dog', 'sand', 'and', 'cat']], expected: false, label: 'לא ניתן' },
    ],
    hints: [
      { title: 'רמז 1: dp[i]', content: 'dp[i] = האם s[:i] יכולה להיחלק. dp[0] = True. לכל i, בדקו כל מילה אפשרית שמסתיימת ב-i.' },
      { title: 'רמז 2: מעבר', content: 'dp[i] = True אם dp[j] == True וגם s[j:i] קיים במילון, עבור כל j < i.' },
    ],
  },
  {
    id: 75,
    title: 'Partition Equal Subset Sum',
    titleHe: 'חלוקה לתת-קבוצות בעלות סכום שווה',
    topic: 'Dynamic Programming',
    difficulty: 'medium',
    acceptance: 46,
    companies: ['Amazon', 'Google', 'Meta'],
    descriptionHe: 'בהינתן מערך שלמים חיוביים nums, קבעו האם ניתן לחלקו לשתי תת-קבוצות עם סכומים שווים. בעיה זו ניתנת לצמצום ל-Subset Sum: האם קיימת תת-קבוצה עם סכום = sum(nums)/2.',
    examples: [
      { input: 'nums = [1,5,11,5]', output: 'True', explanation: '[1,5,5] ו-[11]' },
      { input: 'nums = [1,2,3,5]', output: 'False' },
    ],
    constraints: [
      '1 <= len(nums) <= 200',
      '1 <= nums[i] <= 100',
    ],
    starterCode: {
      python: `def can_partition(nums):
    """Determine if array can be partitioned into two equal sum subsets."""
    pass`,
    },
    functionName: 'can_partition',
    testCases: [
      { inputs: [[1, 5, 11, 5]], expected: true, label: 'ניתן' },
      { inputs: [[1, 2, 3, 5]], expected: false, label: 'לא ניתן' },
      { inputs: [[1, 1]], expected: true, label: 'שניים שווים' },
    ],
    hints: [
      { title: 'רמז 1: Subset Sum', content: 'אם הסכום אי-זוגי, התשובה False. אחרת, חפשו תת-קבוצה עם סכום = total // 2.' },
      { title: 'רמז 2: DP', content: 'dp[j] = True אם ניתן להגיע לסכום j. לכל מספר nums[i], עדכנו dp מהסוף: dp[j] |= dp[j - nums[i]].' },
    ],
  },
  {
    id: 76,
    title: 'Longest Increasing Subsequence',
    titleHe: 'תת-סדרה עולה ארוכה ביותר',
    topic: 'Dynamic Programming',
    difficulty: 'medium',
    acceptance: 54,
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft'],
    descriptionHe: 'בהינתן מערך שלמים nums, מצאו את אורך תת-הסדרה העולה הארוכה ביותר. תת-סדרה נגזרת ממחרוזת בלי לשנות סדר. תת-סדרה עולה היא כזו שכל אלמנט גדול מקודמו.',
    examples: [
      { input: 'nums = [10,9,2,5,3,7,101,18]', output: '4', explanation: '[2,3,7,101]' },
      { input: 'nums = [0,1,0,3,2,3]', output: '4' },
      { input: 'nums = [7,7,7,7,7]', output: '1' },
    ],
    constraints: [
      '1 <= len(nums) <= 2500',
      '-10^4 <= nums[i] <= 10^4',
    ],
    starterCode: {
      python: `def length_of_lis(nums):
    """Find length of longest increasing subsequence."""
    pass`,
    },
    functionName: 'length_of_lis',
    testCases: [
      { inputs: [[10, 9, 2, 5, 3, 7, 101, 18]], expected: 4, label: '[2,3,7,101]' },
      { inputs: [[0, 1, 0, 3, 2, 3]], expected: 4, label: 'דוגמה 2' },
      { inputs: [[7, 7, 7, 7, 7]], expected: 1, label: 'כל שווים' },
    ],
    hints: [
      { title: 'רמז 1: dp[i]', content: 'dp[i] = אורך ה-LIS המסתיים ב-nums[i]. dp[i] = 1 + max(dp[j]) עבור j < i כאשר nums[j] < nums[i].' },
      { title: 'רמז 2: Binary Search אופטימיזציה', content: 'ניתן לפתור ב-O(n log n) עם Binary Search + מערך סיום.' },
    ],
  },
  {
    id: 77,
    title: 'Edit Distance',
    titleHe: 'מרחק עריכה',
    topic: 'Dynamic Programming',
    difficulty: 'hard',
    acceptance: 55,
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft'],
    descriptionHe: 'בהינתן שתי מחרוזות word1 ו-word2, מצאו את מספר הפעולות המינימלי לשינוי word1 ל-word2. הפעולות המותרות: הכנסת תו, מחיקת תו, החלפת תו. זה ידוע כמרחק לוונשטיין.',
    examples: [
      { input: 'word1 = "horse", word2 = "ros"', output: '3' },
      { input: 'word1 = "intention", word2 = "execution"', output: '5' },
    ],
    constraints: [
      '0 <= len(word1), len(word2) <= 500',
      'word1 ו-word2 מורכבות מאותיות לועזיות קטנות',
    ],
    starterCode: {
      python: `def min_distance(word1, word2):
    """Find minimum edit distance between word1 and word2."""
    pass`,
    },
    functionName: 'min_distance',
    testCases: [
      { inputs: ['horse', 'ros'], expected: 3, label: 'horse->ros' },
      { inputs: ['intention', 'execution'], expected: 5, label: 'ארוך' },
      { inputs: ['', ''], expected: 0, label: 'שניים ריקים' },
      { inputs: ['a', ''], expected: 1, label: 'מחיקה אחת' },
    ],
    hints: [
      { title: 'רמז 1: dp[i][j]', content: 'dp[i][j] = מרחק עריכה בין word1[:i] ל-word2[:j]. בסיס: dp[i][0]=i, dp[0][j]=j.' },
      { title: 'רמז 2: מעבר', content: 'אם word1[i-1] == word2[j-1]: dp[i][j] = dp[i-1][j-1]. אחרת: dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]).' },
    ],
  },
  {
    id: 78,
    title: 'Maximum Subarray (Kadane)',
    titleHe: 'תת-מערך מקסימלי (קדנה)',
    topic: 'Dynamic Programming',
    difficulty: 'medium',
    acceptance: 50,
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Apple'],
    descriptionHe: 'בהינתן מערך שלמים nums, מצאו את תת-המערך הרציף שיש לו את הסכום הגדול ביותר. החזירו את הסכום. תת-מערך חייב להכיל לפחות אלמנט אחד. השתמשו באלגוריתם קדנה.',
    examples: [
      { input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', output: '6', explanation: '[4,-1,2,1]' },
      { input: 'nums = [1]', output: '1' },
      { input: 'nums = [5,4,-1,7,8]', output: '23' },
    ],
    constraints: [
      '1 <= len(nums) <= 10^5',
      '-10^4 <= nums[i] <= 10^4',
    ],
    starterCode: {
      python: `def max_sub_array(nums):
    """Find maximum subarray sum using Kadane's algorithm."""
    pass`,
    },
    functionName: 'max_sub_array',
    testCases: [
      { inputs: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], expected: 6, label: '[4,-1,2,1]' },
      { inputs: [[1]], expected: 1, label: 'בודד' },
      { inputs: [[5, 4, -1, 7, 8]], expected: 23, label: 'כל חיוביים' },
      { inputs: [[-1, -2, -3]], expected: -1, label: 'כל שליליים' },
    ],
    hints: [
      { title: 'רמז 1: current_sum', content: 'שמרו current_sum - הסכום הנוכחי. בכל אלמנט, current_sum = max(num, current_sum + num).' },
      { title: 'רמז 2: max_sum', content: 'עדכנו max_sum = max(max_sum, current_sum) בכל צעד.' },
    ],
  },
  {
    id: 79,
    title: 'Decode Ways',
    titleHe: 'פענוח דרכים',
    topic: 'Dynamic Programming',
    difficulty: 'medium',
    acceptance: 32,
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft'],
    descriptionHe: 'הודעה מקודדת על ידי \'A\'->\'1\', \'B\'->\'2\', ..., \'Z\'->\'26\'. בהינתן מחרוזת s המכילה ספרות, ספרו את מספר הדרכים לפענח אותה. ספרות ספציפיות כמו \'0\' אינן יכולות להוות ספרה בודדת.',
    examples: [
      { input: 's = "12"', output: '2', explanation: '"AB" (1,2) או "L" (12)' },
      { input: 's = "226"', output: '3' },
      { input: 's = "06"', output: '0' },
    ],
    constraints: [
      '1 <= len(s) <= 100',
      's מורכב מספרות בלבד',
    ],
    starterCode: {
      python: `def num_decodings(s):
    """Count number of ways to decode the string."""
    pass`,
    },
    functionName: 'num_decodings',
    testCases: [
      { inputs: ['12'], expected: 2, label: '"12"' },
      { inputs: ['226'], expected: 3, label: '"226"' },
      { inputs: ['06'], expected: 0, label: 'מתחיל ב-0' },
      { inputs: ['1'], expected: 1, label: 'ספרה בודדת' },
    ],
    hints: [
      { title: 'רמז 1: dp[i]', content: 'dp[i] = מספר הדרכים לפענח s[:i]. dp[0]=1, dp[1]=0 אם s[0]==\'0\' אחרת 1.' },
      { title: 'רמז 2: מעבר', content: 'אם s[i-1] != \'0\': dp[i] += dp[i-1]. אם s[i-2:i] בין 10-26: dp[i] += dp[i-2].' },
    ],
  },
  {
    id: 80,
    title: 'Reverse String',
    titleHe: 'היפוך מחרוזת',
    topic: 'Strings',
    difficulty: 'easy',
    acceptance: 76,
    companies: ['Amazon', 'Google', 'Microsoft'],
    descriptionHe: 'בהינתן מערך תווים s, היפכו אותו in-place. בצעו זאת ב-O(1) מרחב נוסף. החזירו את המערך ההפוך.',
    examples: [
      { input: 's = ["h","e","l","l","o"]', output: '["o","l","l","e","h"]' },
      { input: 's = ["H","a","n","n","a","h"]', output: '["h","a","n","n","a","H"]' },
    ],
    constraints: [
      '1 <= len(s) <= 10^5',
      's[i] הוא תו ASCII הניתן להדפסה',
    ],
    starterCode: {
      python: `def reverse_string(s):
    """Reverse array of characters in-place."""
    pass`,
    },
    functionName: 'reverse_string',
    testCases: [
      { inputs: [['h', 'e', 'l', 'l', 'o']], expected: ['o', 'l', 'l', 'e', 'h'], label: 'hello' },
      { inputs: [['H', 'a', 'n', 'n', 'a', 'h']], expected: ['h', 'a', 'n', 'n', 'a', 'H'], label: 'Hannah' },
      { inputs: [['a']], expected: ['a'], label: 'בודד' },
    ],
    hints: [
      { title: 'רמז 1: Two Pointers', content: 'השתמשו בשני מצביעים: left=0 ו-right=len-1. החליפו והתקדמו פנימה.' },
      { title: 'רמז 2: Python', content: 'Python: s[:] = s[::-1] היא פתרון חלופי פשוט.' },
    ],
  },
  {
    id: 81,
    title: 'Valid Anagram',
    titleHe: 'אנגרמה תקינה',
    topic: 'Strings',
    difficulty: 'easy',
    acceptance: 63,
    companies: ['Amazon', 'Google', 'Apple'],
    descriptionHe: 'בהינתן שתי מחרוזות s ו-t, קבעו האם t היא אנגרמה של s. אנגרמה היא מילה שנוצרת על ידי סידור מחדש של כל אותיות מילה אחרת, כאשר כל אות משמשת פעם אחת בדיוק.',
    examples: [
      { input: 's = "anagram", t = "nagaram"', output: 'True' },
      { input: 's = "rat", t = "car"', output: 'False' },
    ],
    constraints: [
      '1 <= len(s), len(t) <= 5*10^4',
      's ו-t מורכבות מאותיות לועזיות קטנות',
    ],
    starterCode: {
      python: `def is_anagram(s, t):
    """Return True if t is an anagram of s."""
    pass`,
    },
    functionName: 'is_anagram',
    testCases: [
      { inputs: ['anagram', 'nagaram'], expected: true, label: 'אנגרמה' },
      { inputs: ['rat', 'car'], expected: false, label: 'לא אנגרמה' },
      { inputs: ['a', 'a'], expected: true, label: 'בודד' },
      { inputs: ['ab', 'a'], expected: false, label: 'אורך שונה' },
    ],
    hints: [
      { title: 'רמז 1: Counter', content: 'השוו את Counter של s עם Counter של t.' },
      { title: 'רמז 2: מיון', content: 'גישה אלטרנטיבית: sorted(s) == sorted(t).' },
    ],
  },
  {
    id: 82,
    title: 'Longest Common Prefix',
    titleHe: 'קידומת משותפת ארוכה ביותר',
    topic: 'Strings',
    difficulty: 'easy',
    acceptance: 41,
    companies: ['Amazon', 'Google', 'Microsoft', 'Apple'],
    descriptionHe: 'בהינתן מערך מחרוזות strs, מצאו את הקידומת המשותפת הארוכה ביותר בין כל המחרוזות. אם אין קידומת משותפת, החזירו מחרוזת ריקה "".',
    examples: [
      { input: 'strs = ["flower","flow","flight"]', output: '"fl"' },
      { input: 'strs = ["dog","racecar","car"]', output: '""' },
    ],
    constraints: [
      '1 <= len(strs) <= 200',
      '0 <= len(strs[i]) <= 200',
      'strs[i] מורכב מאותיות לועזיות קטנות',
    ],
    starterCode: {
      python: `def longest_common_prefix(strs):
    """Find the longest common prefix among all strings."""
    pass`,
    },
    functionName: 'longest_common_prefix',
    testCases: [
      { inputs: [['flower', 'flow', 'flight']], expected: 'fl', label: '"fl"' },
      { inputs: [['dog', 'racecar', 'car']], expected: '', label: 'ריק' },
      { inputs: [['a']], expected: 'a', label: 'מחרוזת בודדת' },
    ],
    hints: [
      { title: 'רמז 1: תו-תו', content: 'השוו תו אחרי תו: לכל מיקום, בדקו אם כל המחרוזות חולקות את אותו תו.' },
      { title: 'רמז 2: מיון', content: 'מיינו את המחרוזות ואז השוו רק את הראשונה והאחרונה - אם הן חולקות קידומת, כולן חולקות אותה.' },
    ],
  },
  {
    id: 83,
    title: 'Roman to Integer',
    titleHe: 'מספר רומי למספר שלם',
    topic: 'Strings',
    difficulty: 'easy',
    acceptance: 59,
    companies: ['Amazon', 'Google', 'Microsoft', 'Apple'],
    descriptionHe: 'המירו מספר רומי למספר שלם. כללי: I=1, V=5, X=10, L=50, C=100, D=500, M=1000. אם ערך קטן מגיע לפני ערך גדול, יש להחסיר (IV=4, IX=9, XL=40, XC=90, CD=400, CM=900).',
    examples: [
      { input: 's = "III"', output: '3' },
      { input: 's = "LVIII"', output: '58' },
      { input: 's = "MCMXCIV"', output: '1994' },
    ],
    constraints: [
      '1 <= len(s) <= 15',
      's מורכב מהתווים I,V,X,L,C,D,M',
      '1 <= ערך המספר <= 3999',
    ],
    starterCode: {
      python: `def roman_to_int(s):
    """Convert Roman numeral string to integer."""
    pass`,
    },
    functionName: 'roman_to_int',
    testCases: [
      { inputs: ['III'], expected: 3, label: '3' },
      { inputs: ['LVIII'], expected: 58, label: '58' },
      { inputs: ['MCMXCIV'], expected: 1994, label: '1994' },
      { inputs: ['IV'], expected: 4, label: '4' },
    ],
    hints: [
      { title: 'רמז 1: HashMap', content: 'שמרו HashMap של ערכי האותיות. עברו מימין לשמאל.' },
      { title: 'רמז 2: חיסור', content: 'אם הערך הנוכחי קטן מהערך הבא, חסרו; אחרת הוסיפו.' },
    ],
  },
  {
    id: 84,
    title: 'String Compression',
    titleHe: 'דחיסת מחרוזת',
    topic: 'Strings',
    difficulty: 'medium',
    acceptance: 48,
    companies: ['Amazon', 'Google', 'Microsoft'],
    descriptionHe: 'בהינתן מערך תווים chars, דחסו אותו in-place בצורה הבאה: לכל קבוצה של תווים עוקבים זהים, כתבו את התו ואחריו מספר ההופעות (אם יותר מ-1). החזירו את אורך המערך הדחוס. תווים בודדים אינם מלווים במספר.',
    examples: [
      { input: 'chars = ["a","a","b","b","c","c","c"]', output: '6', explanation: '["a","2","b","2","c","3"]' },
      { input: 'chars = ["a"]', output: '1' },
      { input: 'chars = ["a","b","b","b","b","b","b","b","b","b","b","b","b"]', output: '4', explanation: '["a","b","1","2"]' },
    ],
    constraints: [
      '1 <= len(chars) <= 2000',
      'chars[i] הוא אות קטנה, גדולה, ספרה, או סמל',
    ],
    starterCode: {
      python: `def compress(chars):
    """Compress chars array in-place and return new length."""
    pass`,
    },
    functionName: 'compress',
    testCases: [
      { inputs: [['a', 'a', 'b', 'b', 'c', 'c', 'c']], expected: 6, label: 'דוגמה בסיסית' },
      { inputs: [['a']], expected: 1, label: 'בודד' },
      { inputs: [['a', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b']], expected: 4, label: 'מספר דו-ספרתי' },
    ],
    hints: [
      { title: 'רמז 1: Two Pointers', content: 'השתמשו ב-read pointer (לסריקה) ו-write pointer (לכתיבה). ספרו ריצות של תווים.' },
      { title: 'רמז 2: המרת מספר', content: 'אם count > 1, כתבו כל ספרה של count בנפרד. str(count) יעזור.' },
    ],
  },
  {
    id: 85,
    title: 'Count and Say',
    titleHe: 'ספור ואמור',
    topic: 'Strings',
    difficulty: 'medium',
    acceptance: 54,
    companies: ['Amazon', 'Google', 'Apple'],
    descriptionHe: 'רצף "count-and-say" מוגדר כ: n=1: "1"; n=2: "11" (אחת 1); n=3: "21" (שתי 1); n=4: "1211" (אחת 2, אחת 1). בהינתן n, החזירו את האיבר ה-n ברצף זה. לכל קבוצת תווים עוקבים זהים, ספרו ותארו.',
    examples: [
      { input: 'n = 1', output: '"1"' },
      { input: 'n = 4', output: '"1211"' },
    ],
    constraints: [
      '1 <= n <= 30',
    ],
    starterCode: {
      python: `def count_and_say(n):
    """Return the nth term of count-and-say sequence."""
    pass`,
    },
    functionName: 'count_and_say',
    testCases: [
      { inputs: [1], expected: '1', label: 'n=1' },
      { inputs: [2], expected: '11', label: 'n=2' },
      { inputs: [4], expected: '1211', label: 'n=4' },
      { inputs: [5], expected: '111221', label: 'n=5' },
    ],
    hints: [
      { title: 'רמז 1: איטרציה', content: 'התחילו מ-"1" ובנו כל איבר מהקודם. עברו על האיבר הקודם וספרו ריצות של תווים.' },
      { title: 'רמז 2: בניית מחרוזת', content: 'עבור כל ריצה של תו c עם count k, הוסיפו str(k) + c לאיבר החדש.' },
    ],
  },
  {
    id: 86,
    title: 'Integer to Roman',
    titleHe: 'מספר שלם למספר רומי',
    topic: 'Strings',
    difficulty: 'medium',
    acceptance: 65,
    companies: ['Amazon', 'Google', 'Microsoft'],
    descriptionHe: 'המירו מספר שלם למספר רומי. המספר יהיה בטווח [1, 3999]. השתמשו בערכי המפתח: M=1000, CM=900, D=500, CD=400, C=100, XC=90, L=50, XL=40, X=10, IX=9, V=5, IV=4, I=1.',
    examples: [
      { input: 'num = 3', output: '"III"' },
      { input: 'num = 58', output: '"LVIII"' },
      { input: 'num = 1994', output: '"MCMXCIV"' },
    ],
    constraints: [
      '1 <= num <= 3999',
    ],
    starterCode: {
      python: `def int_to_roman(num):
    """Convert integer to Roman numeral string."""
    pass`,
    },
    functionName: 'int_to_roman',
    testCases: [
      { inputs: [3], expected: 'III', label: '3' },
      { inputs: [58], expected: 'LVIII', label: '58' },
      { inputs: [1994], expected: 'MCMXCIV', label: '1994' },
    ],
    hints: [
      { title: 'רמז 1: טבלה', content: 'שמרו רשימה של (ערך, מחרוזת) ממוינת מהגדול לקטן. עברו ברצף וחסרו כל פעם שניתן.' },
      { title: 'רמז 2: חזרה', content: 'while num >= val: result += symbol; num -= val. עברו לצמד הבא כשלא ניתן לחסור.' },
    ],
  },
  {
    id: 87,
    title: 'Zigzag Conversion',
    titleHe: 'המרת זיגזג',
    topic: 'Strings',
    difficulty: 'medium',
    acceptance: 45,
    companies: ['Amazon', 'Google', 'Microsoft'],
    descriptionHe: 'מחרוזת "PAYPALISHIRING" נכתבת בדפוס זיגזג עם numRows שורות. לאחר מכן קוראים שורה אחרי שורה. עבור numRows=3: שורה 1: P,A,H,N; שורה 2: A,P,L,S,I,I,G; שורה 3: Y,I,R. התוצאה: "PAHNAPLSIIGYIR".',
    examples: [
      { input: 's = "PAYPALISHIRING", numRows = 3', output: '"PAHNAPLSIIGYIR"' },
      { input: 's = "PAYPALISHIRING", numRows = 4', output: '"PINALSIGYAHRPI"' },
      { input: 's = "A", numRows = 1', output: '"A"' },
    ],
    constraints: [
      '1 <= len(s) <= 1000',
      's מורכב מאותיות לועזיות ופסיק וספרות',
      '1 <= numRows <= 1000',
    ],
    starterCode: {
      python: `def convert(s, numRows):
    """Convert string to zigzag pattern and read row by row."""
    pass`,
    },
    functionName: 'convert',
    testCases: [
      { inputs: ['PAYPALISHIRING', 3], expected: 'PAHNAPLSIIGYIR', label: '3 שורות' },
      { inputs: ['PAYPALISHIRING', 4], expected: 'PINALSIGYAHRPI', label: '4 שורות' },
      { inputs: ['A', 1], expected: 'A', label: 'שורה אחת' },
    ],
    hints: [
      { title: 'רמז 1: מערך שורות', content: 'צרו מערך של מחרוזות לכל שורה. הוסיפו כל תו לשורה המתאימה.' },
      { title: 'רמז 2: כיוון', content: 'שמרו משתנה כיוון (1 או -1). שנו כיוון כשמגיעים לשורה הראשונה או האחרונה.' },
    ],
  },
  {
    id: 88,
    title: 'Merge Intervals',
    titleHe: 'מיזוג רווחים',
    topic: 'Sorting & Searching',
    difficulty: 'medium',
    acceptance: 46,
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Apple'],
    descriptionHe: 'בהינתן מערך של רווחים intervals, כאשר intervals[i] = [start, end], מזגו את כל הרווחים החופפים והחזירו מערך של רווחים שאינם חופפים המכסים את כל הרווחים מהקלט.',
    examples: [
      { input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]', output: '[[1,6],[8,10],[15,18]]' },
      { input: 'intervals = [[1,4],[4,5]]', output: '[[1,5]]' },
    ],
    constraints: [
      '1 <= len(intervals) <= 10^4',
      'intervals[i].length == 2',
      '0 <= start_i <= end_i <= 10^4',
    ],
    starterCode: {
      python: `def merge(intervals):
    """Merge all overlapping intervals."""
    pass`,
    },
    functionName: 'merge',
    testCases: [
      { inputs: [[[1, 3], [2, 6], [8, 10], [15, 18]]], expected: [[1, 6], [8, 10], [15, 18]], label: 'שלושה רווחים' },
      { inputs: [[[1, 4], [4, 5]]], expected: [[1, 5]], label: 'נגיעה' },
      { inputs: [[[1, 4], [0, 4]]], expected: [[0, 4]], label: 'כולל' },
    ],
    hints: [
      { title: 'רמז 1: מיון', content: 'מיינו לפי start של כל רווח. זה מפשט את ההחלטה אם להזיג.' },
      { title: 'רמז 2: מיזוג', content: 'לכל רווח חדש, אם start <= merged[-1][1], הרחיבו את הרווח האחרון. אחרת הוסיפו חדש.' },
    ],
  },
  {
    id: 89,
    title: 'Insert Interval',
    titleHe: 'הכנסת רווח',
    topic: 'Sorting & Searching',
    difficulty: 'medium',
    acceptance: 39,
    companies: ['Amazon', 'Google', 'Meta', 'LinkedIn'],
    descriptionHe: 'בהינתן מערך רווחים ממוינים לפי start ורווח חדש newInterval, הכניסו את newInterval למערך (תוך מיזוג אם יש חפיפה). החזירו את מערך הרווחים לאחר ההכנסה.',
    examples: [
      { input: 'intervals = [[1,3],[6,9]], newInterval = [2,5]', output: '[[1,5],[6,9]]' },
      { input: 'intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]', output: '[[1,2],[3,10],[12,16]]' },
    ],
    constraints: [
      '0 <= len(intervals) <= 10^4',
      'intervals ממוין לפי start',
      'newInterval.length == 2',
    ],
    starterCode: {
      python: `def insert(intervals, newInterval):
    """Insert newInterval into sorted intervals list, merging as needed."""
    pass`,
    },
    functionName: 'insert',
    testCases: [
      { inputs: [[[1, 3], [6, 9]], [2, 5]], expected: [[1, 5], [6, 9]], label: 'מיזוג אחד' },
      { inputs: [[[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], [4, 8]], expected: [[1, 2], [3, 10], [12, 16]], label: 'מיזוגים מרובים' },
      { inputs: [[], [5, 7]], expected: [[5, 7]], label: 'מערך ריק' },
    ],
    hints: [
      { title: 'רמז 1: שלושה שלבים', content: 'עברו שלושה שלבים: (1) הוסיפו רווחים שסיימים לפני newInterval, (2) מזגו רווחים חופפים, (3) הוסיפו רווחים שמתחילים אחרי.' },
      { title: 'רמז 2: תנאי חפיפה', content: 'חפיפה קיימת אם interval[0] <= newInterval[1] ו-interval[1] >= newInterval[0].' },
    ],
  },
  {
    id: 90,
    title: 'Meeting Rooms',
    titleHe: 'חדרי ישיבות',
    topic: 'Sorting & Searching',
    difficulty: 'easy',
    acceptance: 57,
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Uber'],
    descriptionHe: 'בהינתן מערך של פגישות intervals, כאשר intervals[i] = [start, end], קבעו האם אדם יכול להשתתף בכל הפגישות. כלומר, אין שתי פגישות שחופפות בזמן.',
    examples: [
      { input: 'intervals = [[0,30],[5,10],[15,20]]', output: 'False' },
      { input: 'intervals = [[7,10],[2,4]]', output: 'True' },
    ],
    constraints: [
      '0 <= len(intervals) <= 10^4',
      '0 <= start_i < end_i <= 10^6',
    ],
    starterCode: {
      python: `def can_attend_meetings(intervals):
    """Return True if a person can attend all meetings without overlap."""
    pass`,
    },
    functionName: 'can_attend_meetings',
    testCases: [
      { inputs: [[[0, 30], [5, 10], [15, 20]]], expected: false, label: 'חפיפה' },
      { inputs: [[[7, 10], [2, 4]]], expected: true, label: 'ללא חפיפה' },
      { inputs: [[]], expected: true, label: 'ריק' },
    ],
    hints: [
      { title: 'רמז 1: מיון', content: 'מיינו לפי start. לאחר מיון, בדקו אם start[i] < end[i-1] לכל i.' },
      { title: 'רמז 2: בדיקה', content: 'אם פגישה מתחילה לפני שהקודמת הסתיימה, יש חפיפה.' },
    ],
  },
  {
    id: 91,
    title: 'Sort Characters By Frequency',
    titleHe: 'מיון תווים לפי תדירות',
    topic: 'Sorting & Searching',
    difficulty: 'medium',
    acceptance: 69,
    companies: ['Amazon', 'Google', 'Meta'],
    descriptionHe: 'בהינתן מחרוזת s, מיינו את תווי המחרוזת בסדר יורד לפי תדירות הופעתם. אם שני תווים זהים בתדירות, הסדר ביניהם אינו חשוב.',
    examples: [
      { input: 's = "tree"', output: '"eert"', explanation: '"e" מופיע פעמיים' },
      { input: 's = "cccaaa"', output: '"cccaaa"', explanation: '"c" ו-"a" מופיעים 3 פעמים כל אחד' },
      { input: 's = "Aabb"', output: '"bbAa"' },
    ],
    constraints: [
      '1 <= len(s) <= 5*10^5',
      's מורכב מאותיות לועזיות גדולות וקטנות וספרות',
    ],
    starterCode: {
      python: `def frequency_sort(s):
    """Sort characters by frequency in descending order."""
    pass`,
    },
    functionName: 'frequency_sort',
    testCases: [
      { inputs: ['tree'], expected: 'eert', label: 'tree' },
      { inputs: ['Aabb'], expected: 'bbAa', label: 'Aabb' },
      { inputs: ['a'], expected: 'a', label: 'בודד' },
    ],
    hints: [
      { title: 'רמז 1: Counter', content: 'ספרו תדירות כל תו עם Counter.' },
      { title: 'רמז 2: מיון', content: 'מיינו לפי תדירות בסדר יורד ובנו מחרוזת: כל תו * תדירות.' },
    ],
  },
  {
    id: 92,
    title: 'Happy Number',
    titleHe: 'מספר שמח',
    topic: 'Math & Logic',
    difficulty: 'easy',
    acceptance: 54,
    companies: ['Amazon', 'Google', 'Apple'],
    descriptionHe: 'מספר שמח מוגדר בתהליך: החלפו את המספר בסכום ריבועי ספרותיו, חזרו עד שהמספר יהיה 1 (שמח) או יכנס ללולאה אינסופית (לא שמח). קבעו האם n הוא מספר שמח.',
    examples: [
      { input: 'n = 19', output: 'True', explanation: '1^2+9^2=82, 8^2+2^2=68, ..., 1' },
      { input: 'n = 2', output: 'False' },
    ],
    constraints: [
      '1 <= n <= 2^31 - 1',
    ],
    starterCode: {
      python: `def is_happy(n):
    """Determine if n is a happy number."""
    pass`,
    },
    functionName: 'is_happy',
    testCases: [
      { inputs: [19], expected: true, label: 'שמח' },
      { inputs: [2], expected: false, label: 'לא שמח' },
      { inputs: [1], expected: true, label: 'n=1' },
      { inputs: [7], expected: true, label: 'n=7' },
    ],
    hints: [
      { title: 'רמז 1: HashSet', content: 'שמרו HashSet של מספרים שכבר ראיתם. אם נראה שוב, יש לולאה.' },
      { title: 'רמז 2: Floyd\'s Cycle', content: 'השתמשו ב-slow/fast pointers (Floyd\'s cycle detection) - slow צעד אחד, fast שניים. אם פוגשים ב-1 - שמח.' },
    ],
  },
  {
    id: 93,
    title: 'Power of Two',
    titleHe: 'חזקה של שתיים',
    topic: 'Math & Logic',
    difficulty: 'easy',
    acceptance: 46,
    companies: ['Amazon', 'Google', 'Apple'],
    descriptionHe: 'בהינתן מספר שלם n, קבעו האם הוא חזקה של 2. חזקה של 2 היא מספר שניתן לכתוב כ-2^k לאיזשהו מספר שלם k >= 0.',
    examples: [
      { input: 'n = 1', output: 'True', explanation: '2^0 = 1' },
      { input: 'n = 16', output: 'True', explanation: '2^4 = 16' },
      { input: 'n = 3', output: 'False' },
    ],
    constraints: [
      '-2^31 <= n <= 2^31 - 1',
    ],
    starterCode: {
      python: `def is_power_of_two(n):
    """Return True if n is a power of two."""
    pass`,
    },
    functionName: 'is_power_of_two',
    testCases: [
      { inputs: [1], expected: true, label: '2^0' },
      { inputs: [16], expected: true, label: '2^4' },
      { inputs: [3], expected: false, label: 'לא חזקה' },
      { inputs: [0], expected: false, label: 'אפס' },
    ],
    hints: [
      { title: 'רמז 1: ביט', content: 'חזקה של 2 בייצוג בינארי מכילה בדיוק ביט 1 אחד. n & (n-1) == 0 אם n > 0.' },
      { title: 'רמז 2: חלוקה', content: 'גישה אחרת: חלקו ב-2 עד שהתוצאה 1 (חזקה) או אי-זוגי (לא חזקה).' },
    ],
  },
  {
    id: 94,
    title: 'Reverse Integer',
    titleHe: 'היפוך מספר שלם',
    topic: 'Math & Logic',
    difficulty: 'medium',
    acceptance: 28,
    companies: ['Amazon', 'Google', 'Microsoft', 'Apple'],
    descriptionHe: 'בהינתן מספר שלם 32-ביט x, הפכו את ספרותיו. אם ההיפוך גורם לgoverflow (מחוץ לטווח [-2^31, 2^31-1]), החזירו 0. שימו לב לסימן: -123 הופך ל--321.',
    examples: [
      { input: 'x = 123', output: '321' },
      { input: 'x = -123', output: '-321' },
      { input: 'x = 120', output: '21' },
    ],
    constraints: [
      '-2^31 <= x <= 2^31 - 1',
    ],
    starterCode: {
      python: `def reverse_int(x):
    """Reverse digits of integer, return 0 if overflow."""
    pass`,
    },
    functionName: 'reverse_int',
    testCases: [
      { inputs: [123], expected: 321, label: '123' },
      { inputs: [-123], expected: -321, label: '-123' },
      { inputs: [120], expected: 21, label: 'אפס בסוף' },
      { inputs: [0], expected: 0, label: 'אפס' },
    ],
    hints: [
      { title: 'רמז 1: המרה למחרוזת', content: 'המירו למחרוזת, היפכו, המירו חזרה. שמרו על הסימן.' },
      { title: 'רמז 2: בדיקת overflow', content: 'לאחר ההיפוך, בדקו אם הערך בטווח [-2^31, 2^31-1]. ב-Python int אין overflow טבעי.' },
    ],
  },
  {
    id: 95,
    title: 'Palindrome Number',
    titleHe: 'מספר פלינדרום',
    topic: 'Math & Logic',
    difficulty: 'easy',
    acceptance: 53,
    companies: ['Amazon', 'Google', 'Apple', 'Microsoft'],
    descriptionHe: 'בהינתן מספר שלם x, קבעו האם הוא פלינדרום. מספר פלינדרום הוא מספר שקריאתו זהה מימין לשמאל ומשמאל לימין. מספרים שליליים אינם פלינדרומים.',
    examples: [
      { input: 'x = 121', output: 'True' },
      { input: 'x = -121', output: 'False', explanation: 'שלילי' },
      { input: 'x = 10', output: 'False', explanation: '01 != 10' },
    ],
    constraints: [
      '-2^31 <= x <= 2^31 - 1',
    ],
    starterCode: {
      python: `def is_palindrome_number(x):
    """Return True if integer x is a palindrome."""
    pass`,
    },
    functionName: 'is_palindrome_number',
    testCases: [
      { inputs: [121], expected: true, label: '121' },
      { inputs: [-121], expected: false, label: 'שלילי' },
      { inputs: [10], expected: false, label: '10' },
      { inputs: [0], expected: true, label: 'אפס' },
    ],
    hints: [
      { title: 'רמז 1: המרה למחרוזת', content: 'המירו ל-str(x) ובדקו s == s[::-1]. מספרים שליליים אוטומטית False.' },
      { title: 'רמז 2: מספרי', content: 'גישה ללא המרה: היפכו את המספר עצמו ובדקו שווה. מספרים שליליים ואלה המסתיימים ב-0 (פרט ל-0) הם לא פלינדרומים.' },
    ],
  },
  {
    id: 96,
    title: 'Car Fleet',
    titleHe: 'שיירת מכוניות',
    topic: 'Stack',
    difficulty: 'medium',
    acceptance: 49,
    companies: ['Amazon', 'Google'],
    descriptionHe: 'n מכוניות נוסעות לנקודת יעד target. position[i] הוא מיקום מכונית i ו-speed[i] מהירותה. מכונית שמגיעה לאחרת הופכת לחלק מאותה שיירה. ספרו את מספר השיירות שמגיעות ליעד.',
    examples: [
      { input: 'target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]', output: '3' },
      { input: 'target = 10, position = [3], speed = [3]', output: '1' },
    ],
    constraints: [
      'n == len(position) == len(speed)',
      '1 <= n <= 10^5',
      '0 < target <= 10^6',
      '0 <= position[i] < target',
      '0 < speed[i] <= 10^6',
    ],
    starterCode: {
      python: `def car_fleet(target, position, speed):
    """Count number of car fleets that arrive at destination."""
    pass`,
    },
    functionName: 'car_fleet',
    testCases: [
      { inputs: [12, [10, 8, 0, 5, 3], [2, 4, 1, 1, 3]], expected: 3, label: 'דוגמה בסיסית' },
      { inputs: [10, [3], [3]], expected: 1, label: 'מכונית בודדת' },
      { inputs: [100, [0, 2, 4], [4, 2, 1]], expected: 1, label: 'שיירה אחת' },
    ],
    hints: [
      { title: 'רמז 1: מיון', content: 'מיינו מכוניות לפי מיקום (מהקרובה ליעד). חשבו זמן הגעה = (target - pos) / speed לכל מכונית.' },
      { title: 'רמז 2: Stack', content: 'השתמשו ב-Stack של זמני הגעה. אם הנוכחית <= ראש המחסנית, היא תהיה באותה שיירה. אחרת שיירה חדשה.' },
    ],
  },
  {
    id: 97,
    title: 'Kth Smallest Element in Sorted Matrix',
    titleHe: 'האלמנט ה-K הקטן במטריצה ממוינת',
    topic: 'Binary Search',
    difficulty: 'medium',
    acceptance: 60,
    companies: ['Amazon', 'Google', 'Microsoft'],
    descriptionHe: 'בהינתן מטריצה n x n ממוינת (כל שורה וכל עמודה ממוינות בסדר עולה) ומספר k, מצאו את האלמנט ה-k הקטן במטריצה. k מובטח בטווח תקין.',
    examples: [
      { input: 'matrix = [[1,5,9],[10,11,13],[12,13,15]], k = 8', output: '13' },
      { input: 'matrix = [[-5]], k = 1', output: '-5' },
    ],
    constraints: [
      'n == len(matrix) == len(matrix[0])',
      '1 <= n <= 300',
      '-10^9 <= matrix[i][j] <= 10^9',
      '1 <= k <= n^2',
    ],
    starterCode: {
      python: `def kth_smallest(matrix, k):
    """Find kth smallest element in sorted matrix."""
    pass`,
    },
    functionName: 'kth_smallest',
    testCases: [
      { inputs: [[[1, 5, 9], [10, 11, 13], [12, 13, 15]], 8], expected: 13, label: 'k=8' },
      { inputs: [[[-5]], 1], expected: -5, label: 'מטריצה 1x1' },
      { inputs: [[[1, 2], [3, 4]], 2], expected: 2, label: 'k=2' },
    ],
    hints: [
      { title: 'רמז 1: Min-Heap', content: 'השתמשו ב-Min-Heap. הכניסו את כל האלמנטים (או רק הראשון מכל שורה) ושלפו k פעמים.' },
      { title: 'רמז 2: Binary Search', content: 'גישה יעילה יותר: Binary Search על הערך. לכל mid, ספרו כמה אלמנטים <= mid וכווצו לפי k.' },
    ],
  },
  {
    id: 98,
    title: 'Longest Subarray With Ones After Replacement',
    titleHe: 'תת-מערך ארוך ביותר עם 1 לאחר החלפה',
    topic: 'Sliding Window',
    difficulty: 'medium',
    acceptance: 56,
    companies: ['Amazon', 'Google'],
    descriptionHe: 'בהינתן מערך בינארי nums המכיל 0 ו-1 בלבד, ומספר שלם k המייצג מספר פעולות החלפה מקסימלי (0->1), מצאו את האורך המקסימלי של תת-מערך המכיל רק 1 לאחר ביצוע לכל היותר k החלפות.',
    examples: [
      { input: 'nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2', output: '6' },
      { input: 'nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1,0], k = 3', output: '10' },
    ],
    constraints: [
      '1 <= len(nums) <= 10^5',
      'nums[i] הוא 0 או 1',
      '0 <= k <= len(nums)',
    ],
    starterCode: {
      python: `def longest_subarray_ones(nums, k):
    """Find longest subarray of ones after at most k replacements."""
    pass`,
    },
    functionName: 'longest_subarray_ones',
    testCases: [
      { inputs: [[1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 2], expected: 6, label: 'k=2' },
      { inputs: [[0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 3], expected: 10, label: 'k=3' },
      { inputs: [[1, 1, 1], 0], expected: 3, label: 'כל 1 k=0' },
    ],
    hints: [
      { title: 'רמז 1: Sliding Window', content: 'השתמשו ב-Sliding Window. ספרו כמה אפסים בחלון הנוכחי.' },
      { title: 'רמז 2: כיווץ', content: 'כאשר מספר האפסים > k, הזיזו left. האורך המקסימלי הוא max(right - left + 1).' },
    ],
  },
  {
    id: 99,
    title: 'Decode Ways II (Simplified)',
    titleHe: 'פענוח מסלולים - שאלת DP נוספת',
    topic: 'Dynamic Programming',
    difficulty: 'hard',
    acceptance: 38,
    companies: ['Amazon', 'Google', 'Meta'],
    descriptionHe: 'בהינתן מחרוזת s המכילה ספרות ו-"*" (שיכולה לייצג כל ספרה 1-9), ספרו את מספר הדרכים לפענוח את ההודעה לפי כללי \'A\'->\'1\'...\'Z\'->\'26\'. החזירו את התוצאה modulo 10^9+7.',
    examples: [
      { input: 's = "*"', output: '9', explanation: '"*" יכול להיות 1-9' },
      { input: 's = "1*"', output: '18' },
      { input: 's = "2*"', output: '15' },
    ],
    constraints: [
      '1 <= len(s) <= 10^5',
      's[i] הוא ספרה 0-9 או "*"',
    ],
    starterCode: {
      python: `def num_decodings_ii(s):
    """Count decode ways with wildcard *, return mod 10^9+7."""
    pass`,
    },
    functionName: 'num_decodings_ii',
    testCases: [
      { inputs: ['*'], expected: 9, label: '*' },
      { inputs: ['1*'], expected: 18, label: '1*' },
      { inputs: ['2*'], expected: 15, label: '2*' },
      { inputs: ['**'], expected: 96, label: '**' },
    ],
    hints: [
      { title: 'רמז 1: DP עם מקרים', content: 'הרחיבו את dp מ-Decode Ways. לכל "*", ספרו כמה אפשרויות יש לספרה בודדת (9) וכפול לשילובים דו-ספרתיים.' },
      { title: 'רמז 2: מקרים', content: 'לכל תו, בדקו: (1) ספרה בודדת - כמה דרכים? (2) שילוב עם הקודם - כמה דרכים? חשבו כל מקרה (*+*, *+ספרה, ספרה+*, ספרה+ספרה).' },
    ],
  },
  {
    id: 100,
    title: 'Kth Largest Element in Array',
    titleHe: 'האלמנט ה-K הגדול במערך',
    topic: 'Arrays & Hashing',
    difficulty: 'medium',
    acceptance: 67,
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Apple'],
    descriptionHe: 'בהינתן מערך שלמים nums ומספר שלם k, מצאו את האלמנט ה-k הגדול במערך. שימו לב: זהו ה-k הגדול בסדר מיון, לא ה-k הגדול הייחודי. ניתן להשתמש ב-Min-Heap בגודל k.',
    examples: [
      { input: 'nums = [3,2,1,5,6,4], k = 2', output: '5' },
      { input: 'nums = [3,2,3,1,2,4,5,5,6], k = 4', output: '4' },
    ],
    constraints: [
      '1 <= k <= len(nums) <= 10^4',
      '-10^4 <= nums[i] <= 10^4',
    ],
    starterCode: {
      python: `def find_kth_largest(nums, k):
    """Find the kth largest element in the array."""
    pass`,
    },
    functionName: 'find_kth_largest',
    testCases: [
      { inputs: [[3, 2, 1, 5, 6, 4], 2], expected: 5, label: 'k=2' },
      { inputs: [[3, 2, 3, 1, 2, 4, 5, 5, 6], 4], expected: 4, label: 'k=4' },
      { inputs: [[1], 1], expected: 1, label: 'בודד' },
    ],
    hints: [
      { title: 'רמז 1: מיון', content: 'הפתרון הפשוט: מיינו בסדר יורד והחזירו nums[k-1].' },
      { title: 'רמז 2: Min-Heap', content: 'גישה יעילה: שמרו Min-Heap בגודל k. לכל אלמנט חדש, אם גדול מהראש, הוציאו את הראש והכניסו. בסוף, ראש ה-Heap הוא התשובה.' },
    ],
  },

];

export function getProblemById(id) {
  return PROBLEMS_DATA.find((p) => p.id === id);
}
