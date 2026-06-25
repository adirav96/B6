"""
Quick sanity check for problemsData test cases.
Run: python verify_tests.py
Each function below is a known-correct reference solution.
If a test fails, the expected value in problemsData.js is likely wrong.
"""

failures = []

def test(problem_name, fn, test_cases):
    for tc in test_cases:
        inputs, expected, label = tc
        try:
            result = fn(*inputs)
            if result != expected:
                failures.append(f"FAIL  [{problem_name}] '{label}': got {repr(result)}, expected {repr(expected)}")
        except Exception as e:
            failures.append(f"ERROR [{problem_name}] '{label}': {e}")

# ── Arrays & Hashing ─────────────────────────────────────────────────────────

def two_sum(nums, target):
    seen = {}
    for i, n in enumerate(nums):
        if target - n in seen:
            return [seen[target - n], i]
        seen[n] = i

test("Two Sum", two_sum, [
    ([[2,7,11,15], 9], [0,1], "basic"),
    ([[3,2,4], 6], [1,2], "non-adjacent"),
    ([[3,3], 6], [0,1], "duplicates"),
])

def contains_duplicate(nums):
    return len(nums) != len(set(nums))

test("Contains Duplicate", contains_duplicate, [
    ([[1,2,3,1],], True, "has duplicate"),
    ([[1,2,3,4],], False, "no duplicate"),
    ([[1,1,1,3,3,4,3,2,4,2],], True, "many dupes"),
])

def product_except_self(nums):
    n = len(nums)
    result = [1] * n
    left = 1
    for i in range(n):
        result[i] = left
        left *= nums[i]
    right = 1
    for i in range(n-1, -1, -1):
        result[i] *= right
        right *= nums[i]
    return result

test("Product Except Self", product_except_self, [
    ([[1,2,3,4],], [24,12,8,6], "basic"),
    ([[-1,1,0,-3,3],], [0,0,9,0,0], "with zero"),
])

def max_profit(prices):
    min_p, max_p = float('inf'), 0
    for p in prices:
        min_p = min(min_p, p)
        max_p = max(max_p, p - min_p)
    return max_p

test("Best Time to Buy Stock", max_profit, [
    ([[7,1,5,3,6,4],], 5, "profit exists"),
    ([[7,6,4,3,1],], 0, "no profit"),
    ([[2,4,1],], 2, "early profit"),
    ([[1],], 0, "single day"),
])

def majority_element(nums):
    count, candidate = 0, 0
    for n in nums:
        if count == 0:
            candidate = n
        count += 1 if n == candidate else -1
    return candidate

test("Majority Element", majority_element, [
    ([[3,2,3],], 3, "basic"),
    ([[2,2,1,1,1,2,2],], 2, "longer"),
    ([[1],], 1, "single"),
])

def max_product(nums):
    res = max(nums)
    cur_min = cur_max = 1
    for n in nums:
        if n == 0:
            cur_min = cur_max = 1
            continue
        candidates = (n, cur_max * n, cur_min * n)
        cur_max, cur_min = max(candidates), min(candidates)
        res = max(res, cur_max)
    return res

test("Maximum Product Subarray", max_product, [
    ([[2,3,-2,4],], 6, "basic"),
    ([[-2,0,-1],], 0, "with zero"),
    ([[-2,3,-4],], 24, "negatives"),
])

def first_missing_positive(nums):
    nums = set(nums)
    i = 1
    while i in nums:
        i += 1
    return i

test("First Missing Positive", first_missing_positive, [
    ([[1,2,0],], 3, "basic"),
    ([[3,4,-1,1],], 2, "gap"),
    ([[7,8,9,11,12],], 1, "starts missing 1"),
])

# ── Two Pointers ─────────────────────────────────────────────────────────────

def is_palindrome(s):
    filtered = [c.lower() for c in s if c.isalnum()]
    return filtered == filtered[::-1]

test("Valid Palindrome", is_palindrome, [
    (["A man, a plan, a canal: Panama"], True, "palindrome"),
    (["race a car"], False, "not palindrome"),
    ([" "], True, "space only"),
])

def remove_duplicates(nums):
    if not nums:
        return 0
    k = 1
    for i in range(1, len(nums)):
        if nums[i] != nums[i-1]:
            nums[k] = nums[i]
            k += 1
    return k

test("Remove Duplicates", remove_duplicates, [
    ([[1,1,2],], 2, "one dup"),
    ([[0,0,1,1,1,2,2,3,3,4],], 5, "many dups"),
    ([[1],], 1, "single"),
])

def move_zeroes(nums):
    k = 0
    for n in nums:
        if n != 0:
            nums[k] = n
            k += 1
    while k < len(nums):
        nums[k] = 0
        k += 1
    return nums

test("Move Zeroes", move_zeroes, [
    ([[0,1,0,3,12],], [1,3,12,0,0], "basic"),
    ([[0],], [0], "single zero"),
    ([[1],], [1], "no zeroes"),
])

def sorted_squares(nums):
    return sorted(x*x for x in nums)

test("Squares of Sorted Array", sorted_squares, [
    ([[-4,-1,0,3,10],], [0,1,9,16,100], "with negatives"),
    ([[-7,-3,2,3,11],], [4,9,9,49,121], "mixed"),
])

# ── Sliding Window ────────────────────────────────────────────────────────────

def length_of_longest_substring(s):
    seen = {}
    left = result = 0
    for right, c in enumerate(s):
        if c in seen and seen[c] >= left:
            left = seen[c] + 1
        seen[c] = right
        result = max(result, right - left + 1)
    return result

test("Longest Substring Without Repeating Chars", length_of_longest_substring, [
    (["abcabcbb"], 3, "basic"),
    (["bbbbb"], 1, "all same"),
    (["pwwkew"], 3, "end window"),
    ([""], 0, "empty"),
])

def max_subarray_size_k(nums, k):
    window = sum(nums[:k])
    best = window
    for i in range(k, len(nums)):
        window += nums[i] - nums[i-k]
        best = max(best, window)
    return best

test("Max Sum Subarray of Size K", max_subarray_size_k, [
    ([[2,1,5,1,3,2], 3], 9, "basic"),
    ([[2,3,4,1,5], 2], 7, "k=2"),
    ([[1,2,3,4,5], 1], 5, "k=1"),
])

# ── Stack ─────────────────────────────────────────────────────────────────────

def is_valid(s):
    stack = []
    mapping = {')': '(', ']': '[', '}': '{'}
    for c in s:
        if c in mapping:
            if not stack or stack[-1] != mapping[c]:
                return False
            stack.pop()
        else:
            stack.append(c)
    return not stack

test("Valid Parentheses", is_valid, [
    (["()"], True, "single pair"),
    (["()[]{}"], True, "three types"),
    (["(]"], False, "mismatch"),
    (["([)]"], False, "wrong order"),
    (["{[]}"], True, "nested"),
])

def eval_rpn(tokens):
    stack = []
    ops = {'+': lambda a,b: a+b, '-': lambda a,b: a-b,
           '*': lambda a,b: a*b, '/': lambda a,b: int(a/b)}
    for t in tokens:
        if t in ops:
            b, a = stack.pop(), stack.pop()
            stack.append(ops[t](a, b))
        else:
            stack.append(int(t))
    return stack[0]

test("Evaluate RPN", eval_rpn, [
    ([["2","1","+","3","*"]], 9, "basic"),
    ([["4","13","5","/","+"]], 6, "division"),
    ([["10","6","9","3","+","-11","*","/","*","17","+","5","+"]], 22, "complex"),
])

def daily_temperatures(temps):
    result = [0] * len(temps)
    stack = []
    for i, t in enumerate(temps):
        while stack and temps[stack[-1]] < t:
            idx = stack.pop()
            result[idx] = i - idx
        stack.append(i)
    return result

test("Daily Temperatures", daily_temperatures, [
    ([[73,74,75,71,69,72,76,73],], [1,1,4,2,1,1,0,0], "basic"),
    ([[30,40,50,60],], [1,1,1,0], "increasing"),
    ([[30,60,90],], [1,1,0], "three"),
])

# ── Binary Search ─────────────────────────────────────────────────────────────

def binary_search(nums, target):
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1

test("Binary Search", binary_search, [
    ([[-1,0,3,5,9,12], 9], 4, "found"),
    ([[-1,0,3,5,9,12], 2], -1, "not found"),
    ([[5], 5], 0, "single element found"),
    ([[5], 3], -1, "single element not found"),
])

def search_insert(nums, target):
    left, right = 0, len(nums)
    while left < right:
        mid = (left + right) // 2
        if nums[mid] < target:
            left = mid + 1
        else:
            right = mid
    return left

test("Search Insert Position", search_insert, [
    ([[1,3,5,6], 5], 2, "found"),
    ([[1,3,5,6], 2], 1, "not found, middle"),
    ([[1,3,5,6], 7], 4, "insert at end"),
    ([[1,3,5,6], 0], 0, "insert at start"),
])

# ── Dynamic Programming ───────────────────────────────────────────────────────

def climb_stairs(n):
    if n <= 2:
        return n
    a, b = 1, 2
    for _ in range(3, n+1):
        a, b = b, a + b
    return b

test("Climbing Stairs", climb_stairs, [
    ([1], 1, "n=1"),
    ([2], 2, "n=2"),
    ([3], 3, "n=3"),
    ([5], 8, "n=5"),
    ([10], 89, "n=10"),
])

def rob(nums):
    if not nums:
        return 0
    if len(nums) == 1:
        return nums[0]
    prev2, prev1 = 0, 0
    for n in nums:
        prev2, prev1 = prev1, max(prev1, prev2 + n)
    return prev1

test("House Robber", rob, [
    ([[1,2,3,1]], 4, "basic"),
    ([[2,7,9,3,1]], 12, "longer"),
    ([[1]], 1, "single"),
    ([[2,1]], 2, "two houses"),
])

def coin_change(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for a in range(1, amount + 1):
        for c in coins:
            if c <= a:
                dp[a] = min(dp[a], dp[a-c] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1

test("Coin Change", coin_change, [
    ([[1,5,11], 15], 3, "basic"),
    ([[2], 3], -1, "impossible"),
    ([[1], 0], 0, "amount zero"),
    ([[1,2,5], 11], 3, "three coins"),
])

def unique_paths(m, n):
    dp = [[1]*n for _ in range(m)]
    for i in range(1, m):
        for j in range(1, n):
            dp[i][j] = dp[i-1][j] + dp[i][j-1]
    return dp[m-1][n-1]

test("Unique Paths", unique_paths, [
    ([3, 7], 28, "3x7"),
    ([3, 2], 3, "3x2"),
    ([1, 1], 1, "1x1"),
    ([7, 3], 28, "7x3"),
])

def max_subarray(nums):
    best = cur = nums[0]
    for n in nums[1:]:
        cur = max(n, cur + n)
        best = max(best, cur)
    return best

test("Maximum Subarray (Kadane)", max_subarray, [
    ([[-2,1,-3,4,-1,2,1,-5,4]], 6, "basic"),
    ([[1]], 1, "single positive"),
    ([[5,4,-1,7,8]], 23, "all positive except one"),
])

def can_jump(nums):
    reach = 0
    for i, n in enumerate(nums):
        if i > reach:
            return False
        reach = max(reach, i + n)
    return True

test("Jump Game", can_jump, [
    ([[2,3,1,1,4]], True, "can reach"),
    ([[3,2,1,0,4]], False, "cannot reach"),
    ([[0]], True, "single zero"),
    ([[1,0,0]], False, "blocked by zero"),
])

# ── Strings ───────────────────────────────────────────────────────────────────

def reverse_string(s):
    return list(reversed(s))

test("Reverse String", reverse_string, [
    ([['h','e','l','l','o']], ['o','l','l','e','h'], "basic"),
    ([['H','a','n','n','a','h']], ['h','a','n','n','a','H'], "mixed case"),
])

def is_anagram(s, t):
    from collections import Counter
    return Counter(s) == Counter(t)

test("Valid Anagram", is_anagram, [
    (["anagram","nagaram"], True, "is anagram"),
    (["rat","car"], False, "not anagram"),
    (["a","a"], True, "single char"),
])

def longest_common_prefix(strs):
    if not strs:
        return ""
    prefix = strs[0]
    for s in strs[1:]:
        while not s.startswith(prefix):
            prefix = prefix[:-1]
            if not prefix:
                return ""
    return prefix

test("Longest Common Prefix", longest_common_prefix, [
    ([["flower","flow","flight"]], "fl", "basic"),
    ([["dog","racecar","car"]], "", "no common prefix"),
    ([["abc"]], "abc", "single string"),
])

def roman_to_int(s):
    val = {'I':1,'V':5,'X':10,'L':50,'C':100,'D':500,'M':1000}
    result = 0
    for i in range(len(s)):
        if i+1 < len(s) and val[s[i]] < val[s[i+1]]:
            result -= val[s[i]]
        else:
            result += val[s[i]]
    return result

test("Roman to Integer", roman_to_int, [
    (["III"], 3, "basic"),
    (["LVIII"], 58, "mixed"),
    (["MCMXCIV"], 1994, "complex"),
    (["IV"], 4, "subtraction"),
])

# ── Sorting ───────────────────────────────────────────────────────────────────

def merge_intervals(intervals):
    if not intervals:
        return []
    intervals.sort()
    merged = [intervals[0]]
    for start, end in intervals[1:]:
        if start <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])
    return merged

test("Merge Intervals", merge_intervals, [
    ([[[1,3],[2,6],[8,10],[15,18]]], [[1,6],[8,10],[15,18]], "basic"),
    ([[[1,4],[4,5]]], [[1,5]], "touching"),
    ([[[1,4],[2,3]]], [[1,4]], "contained"),
])

# ── Math & Logic ──────────────────────────────────────────────────────────────

def is_happy(n):
    seen = set()
    while n != 1:
        if n in seen:
            return False
        seen.add(n)
        n = sum(int(d)**2 for d in str(n))
    return True

test("Happy Number", is_happy, [
    ([19], True, "happy"),
    ([2], False, "not happy"),
    ([1], True, "already 1"),
    ([7], True, "happy 7"),
])

def is_power_of_two(n):
    return n > 0 and (n & (n-1)) == 0

test("Power of Two", is_power_of_two, [
    ([1], True, "2^0"),
    ([16], True, "2^4"),
    ([3], False, "odd"),
    ([0], False, "zero"),
])

def reverse_integer(x):
    sign = -1 if x < 0 else 1
    rev = int(str(abs(x))[::-1])
    result = sign * rev
    if result < -2**31 or result > 2**31 - 1:
        return 0
    return result

test("Reverse Integer", reverse_integer, [
    ([123], 321, "positive"),
    ([-123], -321, "negative"),
    ([120], 21, "trailing zero"),
    ([0], 0, "zero"),
])

def is_palindrome_num(x):
    if x < 0:
        return False
    return str(x) == str(x)[::-1]

test("Palindrome Number", is_palindrome_num, [
    ([121], True, "palindrome"),
    ([-121], False, "negative"),
    ([10], False, "trailing zero"),
    ([0], True, "zero"),
])

# ── Report ────────────────────────────────────────────────────────────────────

print(f"\n{'='*50}")
if failures:
    print(f"❌  {len(failures)} FAILURES FOUND:\n")
    for f in failures:
        print(f"  {f}")
else:
    print("✅  All tested problems passed!")
print(f"{'='*50}\n")
print("Note: only ~30 problems are tested here.")
print("For untested problems, solve them in the app and submit to verify.")
