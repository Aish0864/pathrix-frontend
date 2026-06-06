// Static content library — all 54 concepts, 3 tiers each
// tier: 'easy' (beginner), 'medium' (intermediate), 'hard' (advanced)

const content = {
  Variables: {
    easy: {
      explanation:
        "A variable is a named container that stores a value in your program. You create a variable by giving it a name and assigning it a value using the equals sign. Python automatically figures out what type of data you're storing.",
      code: `# Creating variables
name = "Alice"
age = 25
height = 5.6
is_student = True

print(name)   # Alice
print(age)    # 25`,
      keypoints: [
        "Variables store data that can be used and changed throughout your program",
        "Use = to assign a value: x = 10 means x now holds the value 10",
        "Variable names should be descriptive — use student_name not sn",
      ],
      quiz: [
        {
          q: "What symbol is used to assign a value to a variable in Python?",
          opts: ["==", "=", "->", ":="],
          ans: 1,
        },
        {
          q: "Which variable name is valid in Python?",
          opts: ["2name", "my-name", "my_name", "my name"],
          ans: 2,
        },
        {
          q: "What does x = 5 do?",
          opts: [
            "Checks if x equals 5",
            "Stores 5 in variable x",
            "Prints 5",
            "Deletes x",
          ],
          ans: 1,
        },
      ],
    },
    medium: {
      explanation:
        "Variables in Python are references to objects in memory. Multiple variables can point to the same object, and reassignment changes what the variable points to, not the object itself.",
      code: `x = [1, 2, 3]
y = x          # y points to same list
y.append(4)
print(x)       # [1, 2, 3, 4]

a = 10
b = a
b = 20
print(a)       # 10 — ints are immutable`,
      keypoints: [
        "Variables are references to objects, not the objects themselves",
        "Mutable objects (lists, dicts) share state when assigned to multiple variables",
        "Use id() to check if two variables point to the same object",
      ],
      quiz: [
        {
          q: "What is printed: x=5; y=x; y=10; print(x)?",
          opts: ["10", "5", "None", "Error"],
          ans: 1,
        },
        {
          q: "Which type is mutable in Python?",
          opts: ["int", "str", "tuple", "list"],
          ans: 3,
        },
        {
          q: "What does id(x) return?",
          opts: [
            "Value of x",
            "Type of x",
            "Memory address of x",
            "Length of x",
          ],
          ans: 2,
        },
      ],
    },
    hard: {
      explanation:
        "Python variables use late binding in closures and follow LEGB scope resolution. Understanding variable internals — interning, reference counting, and the distinction between is and == — is critical for writing efficient code.",
      code: `import sys
x = 256; y = 256
print(x is y)    # True — small ints are interned

a = 257; b = 257
print(a is b)    # False — not interned

# Walrus operator
if n := len([1,2,3]):
    print(f"Length: {n}")`,
      keypoints: [
        "Python interns small integers (-5 to 256) and short strings for memory efficiency",
        "The walrus operator := assigns and returns a value in a single expression",
        "Use is for identity comparison, == for equality comparison",
      ],
      quiz: [
        {
          q: "What does the walrus operator := do?",
          opts: [
            "Assigns and returns value",
            "Compares identity",
            "Creates a copy",
            "Deletes variable",
          ],
          ans: 0,
        },
        {
          q: "Which integers does Python intern by default?",
          opts: ["0 to 100", "-5 to 256", "0 to 256", "All integers"],
          ans: 1,
        },
        {
          q: "What is the difference between is and ==?",
          opts: [
            "No difference",
            "is checks identity, == checks equality",
            "is checks equality, == checks identity",
            "is is faster",
          ],
          ans: 1,
        },
      ],
    },
  },

  "Data Types": {
    easy: {
      explanation:
        "Python has several built-in data types to represent different kinds of information. The main ones are integers (whole numbers), floats (decimal numbers), strings (text), and booleans (True/False). Python automatically detects the type when you assign a value.",
      code: `age = 25           # int
price = 9.99       # float
name = "Alice"     # str
active = True      # bool

print(type(age))   # <class 'int'>
print(type(name))  # <class 'str'>`,
      keypoints: [
        "int stores whole numbers, float stores decimal numbers",
        "Strings are text enclosed in single or double quotes",
        "Use type() to check what data type a variable holds",
      ],
      quiz: [
        {
          q: "What type is 3.14 in Python?",
          opts: ["int", "str", "float", "bool"],
          ans: 2,
        },
        {
          q: "What does type('hello') return?",
          opts: ["string", "<class 'str'>", "text", "char"],
          ans: 1,
        },
        {
          q: "Which is a boolean value?",
          opts: ["'True'", "1.0", "True", "yes"],
          ans: 2,
        },
      ],
    },
    medium: {
      explanation:
        "Python's type system is dynamic but strongly typed — types are checked at runtime and implicit conversions are limited. Type hints (PEP 484) add optional static typing for better code documentation and tooling support.",
      code: `from typing import Union

def process(val: Union[int, float]) -> str:
    return str(val * 2)

# Type conversion
x = int("42")       # str to int
y = float(10)       # int to float
z = str(3.14)       # float to str
print(isinstance(x, int))  # True`,
      keypoints: [
        "Type hints improve code readability but don't enforce types at runtime",
        "Use isinstance() for type checking instead of type() == comparisons",
        "Explicit conversion functions: int(), float(), str(), bool()",
      ],
      quiz: [
        {
          q: "What does int('3.14') return?",
          opts: ["3", "3.14", "ValueError", "3.0"],
          ans: 2,
        },
        {
          q: "Which checks type safely?",
          opts: [
            "type(x)==int",
            "isinstance(x, int)",
            "x.type==int",
            "checktype(x)",
          ],
          ans: 1,
        },
        { q: "What is bool(0)?", opts: ["True", "False", "0", "None"], ans: 1 },
      ],
    },
    hard: {
      explanation:
        "Python's data model defines how types interact through dunder methods. Understanding type coercion rules, the numeric tower (numbers.Number hierarchy), and abstract base classes is essential for writing type-safe, extensible code.",
      code: `from numbers import Number
from abc import ABC, abstractmethod

class Vector(ABC):
    @abstractmethod
    def magnitude(self) -> float: ...

    def __add__(self, other):
        if not isinstance(other, type(self)):
            return NotImplemented
        return self._add(other)`,
      keypoints: [
        "Implement __eq__, __hash__, and __lt__ for full comparison support",
        "Return NotImplemented (not raise) from dunder methods to allow fallback",
        "Use ABC and abstractmethod to define type contracts",
      ],
      quiz: [
        {
          q: "What should __add__ return if types are incompatible?",
          opts: ["None", "False", "NotImplemented", "TypeError"],
          ans: 2,
        },
        {
          q: "Which module provides the numeric tower?",
          opts: ["typing", "numbers", "math", "abc"],
          ans: 1,
        },
        {
          q: "What makes a class abstract in Python?",
          opts: [
            "abstract keyword",
            "ABC base + abstractmethod",
            "interface keyword",
            "virtual methods",
          ],
          ans: 1,
        },
      ],
    },
  },

  Operators: {
    easy: {
      explanation:
        "Operators are symbols that perform operations on values. Python has arithmetic operators (+, -, *, /), comparison operators (==, !=, <, >), and logical operators (and, or, not). They are the building blocks of all expressions in Python.",
      code: `# Arithmetic
print(10 + 3)   # 13
print(10 // 3)  # 3 (floor division)
print(10 % 3)   # 1 (remainder)
print(2 ** 3)   # 8 (power)

# Comparison
print(5 > 3)    # True
print(5 == 5)   # True`,
      keypoints: [
        "// is floor division (rounds down), % gives the remainder",
        "== checks equality, = assigns a value — don't confuse them",
        "and/or/not combine boolean conditions logically",
      ],
      quiz: [
        { q: "What is 17 % 5?", opts: ["3", "2", "12", "85"], ans: 1 },
        {
          q: "What does ** do?",
          opts: ["Multiply", "Floor divide", "Power/exponent", "Modulo"],
          ans: 2,
        },
        {
          q: "What is True and False?",
          opts: ["True", "False", "None", "Error"],
          ans: 1,
        },
      ],
    },
    medium: {
      explanation:
        "Python operators follow precedence rules (PEMDAS-like) and support augmented assignment (+=, -=). Bitwise operators work on integer binary representations and are commonly used in flags, masks, and performance-critical code.",
      code: `x = 15  # 1111 in binary
y = 9   # 1001 in binary

print(x & y)   # 9  (AND)
print(x | y)   # 15 (OR)
print(x ^ y)   # 6  (XOR)
print(x >> 1)  # 7  (right shift)
print(~x)      # -16 (NOT)`,
      keypoints: [
        "Bitwise AND (&) keeps bits where both are 1; OR (|) keeps bits where either is 1",
        "Left shift (<<) multiplies by 2, right shift (>>) divides by 2",
        "Use parentheses to make precedence explicit and avoid bugs",
      ],
      quiz: [
        { q: "What is 5 & 3?", opts: ["7", "1", "15", "0"], ans: 1 },
        {
          q: "What does x <<= 2 do?",
          opts: [
            "Multiplies x by 2",
            "Multiplies x by 4",
            "Divides x by 4",
            "Shifts right",
          ],
          ans: 1,
        },
        { q: "What is 6 ^ 3?", opts: ["5", "7", "18", "0"], ans: 0 },
      ],
    },
    hard: {
      explanation:
        "Python's operator model is fully customisable through dunder methods. Operator overloading, reflected operators (__radd__), and in-place operators (__iadd__) give complete control over how custom types interact with Python's operator syntax.",
      code: `class Money:
    def __init__(self, amount, currency="GBP"):
        self.amount = amount
        self.currency = currency

    def __add__(self, other):
        if self.currency != other.currency:
            raise ValueError("Currency mismatch")
        return Money(self.amount + other.amount, self.currency)

    def __repr__(self):
        return f"{self.currency} {self.amount:.2f}"`,
      keypoints: [
        "Implement __radd__ for right-side operations: 5 + obj calls obj.__radd__(5)",
        "__iadd__ enables += with in-place mutation for performance",
        "Always check type compatibility in dunder methods before operating",
      ],
      quiz: [
        {
          q: "When is __radd__ called?",
          opts: [
            "obj + 5",
            "5 + obj when obj.__add__ fails",
            "Always",
            "Never",
          ],
          ans: 1,
        },
        {
          q: "What enables += in-place behaviour?",
          opts: ["__add__", "__iadd__", "__plus__", "__set__"],
          ans: 1,
        },
        {
          q: "What should __add__ return on type mismatch?",
          opts: ["None", "False", "NotImplemented", "0"],
          ans: 2,
        },
      ],
    },
  },

  "If/Else": {
    easy: {
      explanation:
        "If/else statements let your program make decisions. If a condition is True, one block of code runs; otherwise, the else block runs. This is how you add logic and branching to your programs.",
      code: `age = 18

if age >= 18:
    print("You can vote")
else:
    print("Too young to vote")

# One-line shorthand
status = "adult" if age >= 18 else "minor"`,
      keypoints: [
        "The if block runs when the condition is True, else runs when it's False",
        "Indentation (4 spaces) defines what's inside each block",
        "You can write simple if/else on one line using a ternary expression",
      ],
      quiz: [
        {
          q: "What runs when an if condition is False?",
          opts: ["if block", "else block", "Nothing", "Error"],
          ans: 1,
        },
        {
          q: "What defines a block in Python?",
          opts: ["Curly braces", "Indentation", "Brackets", "BEGIN/END"],
          ans: 1,
        },
        {
          q: "What is x = 5 if True else 10?",
          opts: ["5", "10", "True", "Error"],
          ans: 0,
        },
      ],
    },
    medium: {
      explanation:
        "Python evaluates conditions using truthiness — any object can be evaluated as True or False. Understanding falsy values and short-circuit evaluation helps write concise, efficient conditional logic.",
      code: `# Falsy values
falsy = [0, "", [], {}, None, False]
for val in falsy:
    print(bool(val))   # All False

# Short-circuit evaluation
name = None
display = name or "Anonymous"  # "Anonymous"

# Chained comparisons
x = 5
print(1 < x < 10)   # True`,
      keypoints: [
        "Falsy values: 0, empty strings/lists/dicts, None, and False",
        "or returns first truthy value; and returns first falsy value",
        "Python supports chained comparisons: 1 < x < 10 is valid",
      ],
      quiz: [
        {
          q: "What is bool([])?",
          opts: ["True", "False", "None", "Error"],
          ans: 1,
        },
        {
          q: "What does None or 'default' return?",
          opts: ["None", "True", "'default'", "False"],
          ans: 2,
        },
        {
          q: "Is 1 < 5 < 10 valid Python?",
          opts: ["Yes", "No", "Only in Python 3", "Syntax error"],
          ans: 0,
        },
      ],
    },
    hard: {
      explanation:
        "Structural pattern matching (match/case, PEP 634) extends conditional logic to destructuring and type matching. Combined with guard clauses and the walrus operator, Python offers expressive control flow for complex decision trees.",
      code: `def classify(point):
    match point:
        case (0, 0):
            return "origin"
        case (x, 0) if x > 0:
            return f"positive x-axis at {x}"
        case (0, y):
            return f"y-axis at {y}"
        case (x, y):
            return f"point ({x}, {y})"

print(classify((3, 0)))  # positive x-axis at 3`,
      keypoints: [
        "match/case supports structural pattern matching with destructuring",
        "Guard clauses (if after case) add conditions to patterns",
        "Early returns reduce nesting and improve readability over deep if/else",
      ],
      quiz: [
        {
          q: "What Python version introduced match/case?",
          opts: ["3.8", "3.9", "3.10", "3.11"],
          ans: 2,
        },
        {
          q: "What is a guard clause in match/case?",
          opts: [
            "Default case",
            "if condition after case pattern",
            "Break statement",
            "Return value",
          ],
          ans: 1,
        },
        {
          q: "What does case _ match?",
          opts: [
            "Nothing",
            "Only None",
            "Everything (wildcard)",
            "Only strings",
          ],
          ans: 2,
        },
      ],
    },
  },

  "For Loop": {
    easy: {
      explanation:
        "A for loop repeats a block of code for each item in a sequence. You can loop over lists, strings, ranges, and any iterable. The loop variable takes each value one at a time automatically.",
      code: `# Loop over a list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# Loop with range
for i in range(5):
    print(i)    # 0, 1, 2, 3, 4`,
      keypoints: [
        "for x in collection loops through every item one at a time",
        "range(n) generates numbers from 0 to n-1",
        "range(start, stop, step) gives more control over the sequence",
      ],
      quiz: [
        {
          q: "How many times does range(5) iterate?",
          opts: ["4", "5", "6", "0"],
          ans: 1,
        },
        {
          q: "What does range(2, 8, 2) produce?",
          opts: ["2,4,6,8", "2,4,6", "2,3,4,5,6,7", "0,2,4,6"],
          ans: 1,
        },
        {
          q: "Can you loop over a string with for?",
          opts: ["Yes", "No", "Only in Python 3", "Only with list()"],
          ans: 0,
        },
      ],
    },
    medium: {
      explanation:
        "Python's for loop works with any iterable through the iterator protocol. enumerate() adds indices, zip() pairs sequences, and comprehensions provide a compact loop syntax for transforming data.",
      code: `names = ["Alice", "Bob", "Charlie"]
scores = [92, 87, 95]

# enumerate + zip together
for i, (name, score) in enumerate(zip(names, scores)):
    print(f"{i+1}. {name}: {score}")

# Comprehension
squares = [x**2 for x in range(10) if x % 2 == 0]`,
      keypoints: [
        "enumerate(iterable) yields (index, value) pairs",
        "zip(a, b) pairs elements from two iterables together",
        "List comprehensions are faster and more readable than equivalent for loops",
      ],
      quiz: [
        {
          q: "What does enumerate(['a','b']) yield?",
          opts: ["['a','b']", "(0,'a'),(1,'b')", "0,1", "Error"],
          ans: 1,
        },
        {
          q: "What does zip([1,2],[3,4]) produce?",
          opts: ["[1,2,3,4]", "(1,3),(2,4)", "[1,3],[2,4]", "Error"],
          ans: 1,
        },
        {
          q: "What is [x*2 for x in range(3)]?",
          opts: ["[0,2,4]", "[1,2,3]", "[2,4,6]", "[0,1,2]"],
          ans: 0,
        },
      ],
    },
    hard: {
      explanation:
        "Advanced iteration uses itertools for memory-efficient processing of large datasets. Understanding lazy evaluation, the iterator protocol (__iter__, __next__), and generator-based loops is key for high-performance Python.",
      code: `import itertools

data = range(1_000_000)

# Lazy chaining — no memory allocation
result = itertools.islice(
    filter(lambda x: x % 2 == 0,
           map(lambda x: x ** 2, data)),
    10
)
print(list(result))  # First 10 even squares`,
      keypoints: [
        "itertools functions return lazy iterators — data is processed on demand",
        "islice() limits iteration without materialising the full sequence",
        "Chaining map/filter/islice avoids intermediate list creation",
      ],
      quiz: [
        {
          q: "What does itertools.islice(it, 5) do?",
          opts: ["Skips 5", "Takes first 5", "Shuffles", "Reverses"],
          ans: 1,
        },
        {
          q: "Which is more memory efficient for 1M items?",
          opts: [
            "list comprehension",
            "generator expression",
            "Same",
            "Depends on type",
          ],
          ans: 1,
        },
        {
          q: "What method must an iterator implement?",
          opts: ["__loop__", "__next__", "__yield__", "__step__"],
          ans: 1,
        },
      ],
    },
  },

  "While Loop": {
    easy: {
      explanation:
        "A while loop keeps running as long as a condition is True. It's used when you don't know in advance how many times you need to repeat something. Always make sure the condition eventually becomes False or the loop will run forever.",
      code: `count = 0
while count < 5:
    print(count)
    count += 1

# User input loop
while True:
    answer = input("Type 'quit' to stop: ")
    if answer == "quit":
        break`,
      keypoints: [
        "while condition: keeps looping until condition becomes False",
        "Always update the loop variable or condition to avoid infinite loops",
        "while True with break is used for loops that check condition in the middle",
      ],
      quiz: [
        {
          q: "When does a while loop stop?",
          opts: [
            "After 10 iterations",
            "When condition is False",
            "When condition is True",
            "Never",
          ],
          ans: 1,
        },
        {
          q: "What causes an infinite loop?",
          opts: [
            "Using break",
            "Condition never becomes False",
            "Using continue",
            "Empty body",
          ],
          ans: 1,
        },
        {
          q: "What does while True mean?",
          opts: [
            "Loop once",
            "Loop forever until break",
            "Loop while True exists",
            "Syntax error",
          ],
          ans: 1,
        },
      ],
    },
    medium: {
      explanation:
        "While loops support else clauses that run when the condition becomes False naturally (not via break). This pattern is useful for search algorithms where you need to know if a loop completed without finding a result.",
      code: `# while/else pattern
target = 7
nums = [1, 3, 5, 9, 11]
i = 0
while i < len(nums):
    if nums[i] == target:
        print(f"Found at {i}")
        break
    i += 1
else:
    print("Not found")  # Runs if no break`,
      keypoints: [
        "while/else: the else block runs only if the loop exits normally (no break)",
        "This pattern cleanly handles 'not found' cases in search loops",
        "Use a flag variable as an alternative to while/else for clarity",
      ],
      quiz: [
        {
          q: "When does while/else execute the else?",
          opts: [
            "Always",
            "When break is hit",
            "When no break occurs",
            "Never",
          ],
          ans: 2,
        },
        {
          q: "What is the main risk of while loops?",
          opts: [
            "Too slow",
            "Infinite loops",
            "Memory errors",
            "Syntax errors",
          ],
          ans: 1,
        },
        {
          q: "Which is better for known iteration count?",
          opts: ["while", "for", "Both equal", "Neither"],
          ans: 1,
        },
      ],
    },
    hard: {
      explanation:
        "While loops in async contexts become async for/while patterns. Understanding event-driven loops, polling with backoff strategies, and cooperative multitasking via asyncio.sleep() is essential for building responsive async applications.",
      code: `import asyncio

async def poll_with_backoff(check_fn, max_attempts=5):
    delay = 1
    for attempt in range(max_attempts):
        if await check_fn():
            return True
        await asyncio.sleep(delay)
        delay = min(delay * 2, 30)  # Exponential backoff
    return False`,
      keypoints: [
        "Exponential backoff prevents overwhelming services during polling",
        "asyncio.sleep() yields control to the event loop — never use time.sleep() in async code",
        "Cap the backoff delay to avoid waiting too long between retries",
      ],
      quiz: [
        {
          q: "Why use asyncio.sleep() instead of time.sleep() in async code?",
          opts: [
            "It's faster",
            "It yields control to event loop",
            "It's more accurate",
            "No difference",
          ],
          ans: 1,
        },
        {
          q: "What is exponential backoff?",
          opts: [
            "Fixed delay",
            "Doubling delay each retry",
            "Random delay",
            "No delay",
          ],
          ans: 1,
        },
        {
          q: "What does await do?",
          opts: [
            "Blocks thread",
            "Pauses and yields to event loop",
            "Raises exception",
            "Returns None",
          ],
          ans: 1,
        },
      ],
    },
  },

  Strings: {
    easy: {
      explanation:
        "Strings are sequences of characters used to store text. You can create them with single or double quotes. Python provides many built-in methods to manipulate strings like upper(), lower(), split(), and replace().",
      code: `name = "Alice"
greeting = 'Hello'

# Common methods
print(name.upper())         # ALICE
print(name.lower())         # alice
print(len(name))            # 5
print(f"Hi, {name}!")       # Hi, Alice!
print("hello world".split()) # ['hello', 'world']`,
      keypoints: [
        "Strings are immutable — methods return new strings, they don't change the original",
        "f-strings (f'Hello {name}') are the modern way to insert variables into strings",
        "Use len() to get the number of characters in a string",
      ],
      quiz: [
        {
          q: "What does 'hello'.upper() return?",
          opts: ["hello", "HELLO", "Hello", "Error"],
          ans: 1,
        },
        { q: "What is len('Python')?", opts: ["5", "6", "7", "Error"], ans: 1 },
        {
          q: "How do you create an f-string?",
          opts: ["s'text'", "f'text {var}'", "'{var}'", "format('text')"],
          ans: 1,
        },
      ],
    },
    medium: {
      explanation:
        "Strings support slicing, formatting, and a rich set of methods. Understanding string internals — immutability, interning, and efficient concatenation — helps avoid common performance pitfalls like repeated + concatenation in loops.",
      code: `s = "Hello, World!"

# Slicing
print(s[7:12])      # World
print(s[::-1])      # !dlroW ,olleH

# Efficient join
words = ["join", "is", "fast"]
result = " ".join(words)

# String methods
print("  trim me  ".strip())
print("a,b,c".split(","))`,
      keypoints: [
        "Use ''.join(list) instead of += in loops for O(n) vs O(n²) performance",
        "Slicing s[start:stop:step] — negative step reverses the string",
        "strip(), lstrip(), rstrip() remove whitespace or specified characters",
      ],
      quiz: [
        {
          q: "What is 'Python'[1:4]?",
          opts: ["Pyt", "yth", "ytho", "ython"],
          ans: 1,
        },
        {
          q: "Why is ''.join(list) better than += in loops?",
          opts: [
            "Shorter code",
            "O(n) vs O(n²) time",
            "More readable",
            "No difference",
          ],
          ans: 1,
        },
        {
          q: "What does 'hello'[::-1] return?",
          opts: ["hello", "olleh", "h", "Error"],
          ans: 1,
        },
      ],
    },
    hard: {
      explanation:
        "Advanced string handling involves regex patterns, Unicode normalization, and efficient parsing. Python's re module provides powerful pattern matching, while unicodedata handles internationalization concerns in production applications.",
      code: `import re
import unicodedata

# Regex with named groups
pattern = r'(?P<year>\\d{4})-(?P<month>\\d{2})-(?P<day>\\d{2})'
match = re.match(pattern, "2026-04-13")
print(match.group('year'))   # 2026

# Unicode normalisation
s = "caf\\u00e9"
normalized = unicodedata.normalize('NFC', s)`,
      keypoints: [
        "Named groups (?P<name>pattern) make regex matches self-documenting",
        "Use re.compile() for patterns used multiple times — avoids recompilation",
        "Unicode has multiple representations — normalize to NFC for consistent comparison",
      ],
      quiz: [
        {
          q: "What does re.compile() do?",
          opts: [
            "Runs regex",
            "Pre-compiles pattern for reuse",
            "Validates string",
            "Escapes string",
          ],
          ans: 1,
        },
        {
          q: "What is NFC normalization?",
          opts: [
            "Encrypting text",
            "Canonical Unicode composition",
            "Removing spaces",
            "Converting to ASCII",
          ],
          ans: 1,
        },
        {
          q: "What do named groups do in regex?",
          opts: [
            "Speed up matching",
            "Allow access by name not index",
            "Make pattern optional",
            "Match case-insensitively",
          ],
          ans: 1,
        },
      ],
    },
  },

  Lists: {
    easy: {
      explanation:
        "A list is an ordered collection of items that can be changed. Lists can hold any type of data and are created with square brackets. You can add, remove, and access items using index numbers starting from 0.",
      code: `fruits = ["apple", "banana", "cherry"]

print(fruits[0])      # apple
print(fruits[-1])     # cherry

fruits.append("mango")
fruits.remove("banana")
print(len(fruits))    # 3`,
      keypoints: [
        "Lists are ordered and mutable — you can change them after creation",
        "Index starts at 0; negative indices count from the end (-1 is last)",
        "append() adds to end, remove() deletes first match, len() gives size",
      ],
      quiz: [
        { q: "What is [1,2,3][1]?", opts: ["1", "2", "3", "Error"], ans: 1 },
        {
          q: "What does append() do?",
          opts: ["Remove item", "Add to start", "Add to end", "Sort list"],
          ans: 2,
        },
        { q: "What is len([1,2,3,4])?", opts: ["3", "4", "5", "0"], ans: 1 },
      ],
    },
    medium: {
      explanation:
        "Lists have O(1) append and index access but O(n) insert/delete at arbitrary positions. Understanding list internals, slicing, sorting with key functions, and list comprehensions makes your code significantly more Pythonic.",
      code: `data = [3, 1, 4, 1, 5, 9, 2, 6]

# Sort with key
words = ["banana", "apple", "fig"]
words.sort(key=len)          # Sort by length

# List operations
data[2:5] = [99, 98, 97]    # Slice assignment
evens = [x for x in data if x % 2 == 0]
flat = [x for sub in [[1,2],[3,4]] for x in sub]`,
      keypoints: [
        "sort(key=fn) sorts by custom criteria without changing the original type",
        "Slice assignment data[a:b] = [...] replaces a range of elements",
        "Nested list comprehensions flatten 2D lists efficiently",
      ],
      quiz: [
        {
          q: "What is the time complexity of list.append()?",
          opts: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
          ans: 2,
        },
        {
          q: "What does sort(key=len) sort by?",
          opts: ["Alphabetically", "By length", "By value", "Randomly"],
          ans: 1,
        },
        {
          q: "What is [x for sub in [[1,2],[3,4]] for x in sub]?",
          opts: ["[[1,2],[3,4]]", "[1,2,3,4]", "Error", "[1,3,2,4]"],
          ans: 1,
        },
      ],
    },
    hard: {
      explanation:
        "CPython lists are dynamic arrays with over-allocation for amortized O(1) appends. For performance-critical code, consider array.array for homogeneous data, collections.deque for O(1) both-end operations, or numpy arrays for vectorised computation.",
      code: `from collections import deque
import array

# Deque — O(1) both ends
q = deque([1, 2, 3], maxlen=5)
q.appendleft(0)
q.rotate(2)

# Typed array — memory efficient
arr = array.array('i', [1, 2, 3, 4, 5])
print(arr.buffer_info())  # (address, length)`,
      keypoints: [
        "deque with maxlen automatically discards oldest items — ideal for sliding windows",
        "array.array stores homogeneous C types — 4-8x less memory than list",
        "CPython list over-allocates by ~12.5% to amortize append costs",
      ],
      quiz: [
        {
          q: "What is deque's advantage over list?",
          opts: [
            "Faster indexing",
            "O(1) both-end operations",
            "Less memory",
            "Faster sorting",
          ],
          ans: 1,
        },
        {
          q: "When is array.array better than list?",
          opts: [
            "Mixed types",
            "Homogeneous numeric data",
            "Small collections",
            "Nested data",
          ],
          ans: 1,
        },
        {
          q: "What is CPython list's append complexity?",
          opts: ["O(n)", "O(1) amortized", "O(log n)", "O(n²)"],
          ans: 1,
        },
      ],
    },
  },

  Functions: {
    easy: {
      explanation:
        "A function is a reusable block of code that performs a specific task. You define it once with the def keyword and call it whenever you need it. Functions help you avoid repeating code and make programs easier to understand.",
      code: `def greet(name):
    message = f"Hello, {name}!"
    return message

# Call the function
result = greet("Alice")
print(result)       # Hello, Alice!

def add(a, b):
    return a + b

print(add(3, 4))    # 7`,
      keypoints: [
        "Define functions with def function_name(parameters): followed by indented code",
        "return sends a value back to where the function was called",
        "Functions must be defined before they are called",
      ],
      quiz: [
        {
          q: "What keyword defines a function?",
          opts: ["func", "define", "def", "function"],
          ans: 2,
        },
        {
          q: "What does return do?",
          opts: [
            "Prints value",
            "Ends program",
            "Sends value back to caller",
            "Creates variable",
          ],
          ans: 2,
        },
        {
          q: "What is returned if no return statement?",
          opts: ["0", "''", "None", "Error"],
          ans: 2,
        },
      ],
    },
    medium: {
      explanation:
        "Functions are first-class objects in Python — they can be passed as arguments, returned from other functions, and stored in variables. Understanding closures, *args/**kwargs, and higher-order functions unlocks powerful functional programming patterns.",
      code: `def apply(func, values):
    return [func(x) for x in values]

def make_multiplier(n):
    def multiply(x):        # Closure
        return x * n
    return multiply

double = make_multiplier(2)
print(apply(double, [1,2,3,4]))  # [2,4,6,8]

def log(*args, **kwargs):
    print(args, kwargs)`,
      keypoints: [
        "Closures capture variables from the enclosing scope — useful for factories",
        "*args collects positional arguments as tuple, **kwargs as dict",
        "Higher-order functions take or return other functions",
      ],
      quiz: [
        {
          q: "What does *args collect?",
          opts: [
            "Keyword args as dict",
            "Positional args as tuple",
            "All args as list",
            "Named args",
          ],
          ans: 1,
        },
        {
          q: "What is a closure?",
          opts: [
            "A locked function",
            "Function capturing outer scope variable",
            "Anonymous function",
            "Recursive function",
          ],
          ans: 1,
        },
        {
          q: "Can functions be passed as arguments?",
          opts: ["Yes", "No", "Only built-ins", "Only in Python 3"],
          ans: 0,
        },
      ],
    },
    hard: {
      explanation:
        "Advanced function features include functools decorators (lru_cache, partial, wraps), signature inspection via inspect module, and protocol-based callable objects. Understanding __call__ allows any object to behave like a function.",
      code: `from functools import lru_cache, wraps
import time

def timer(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        print(f"{func.__name__}: {time.perf_counter()-start:.4f}s")
        return result
    return wrapper

@lru_cache(maxsize=128)
@timer
def fib(n):
    return n if n < 2 else fib(n-1) + fib(n-2)`,
      keypoints: [
        "Use @wraps(func) to preserve the wrapped function's metadata (__name__, __doc__)",
        "lru_cache memoizes function results — ideal for pure functions with repeated calls",
        "Stacking decorators applies them bottom-up: @timer above @lru_cache runs timer first",
      ],
      quiz: [
        {
          q: "Why use @wraps in decorators?",
          opts: [
            "Makes it faster",
            "Preserves original function metadata",
            "Required for all decorators",
            "Handles exceptions",
          ],
          ans: 1,
        },
        {
          q: "What does lru_cache do?",
          opts: [
            "Logs calls",
            "Memoizes return values",
            "Limits call frequency",
            "Retries on failure",
          ],
          ans: 1,
        },
        {
          q: "In what order are stacked decorators applied?",
          opts: ["Top to bottom", "Bottom to top", "Alphabetical", "Random"],
          ans: 1,
        },
      ],
    },
  },

  Classes: {
    easy: {
      explanation:
        "A class is a blueprint for creating objects. It defines what data (attributes) and actions (methods) objects of that type will have. You create an object from a class using the class name followed by parentheses.",
      code: `class Dog:
    def __init__(self, name, breed):
        self.name = name
        self.breed = breed

    def bark(self):
        return f"{self.name} says: Woof!"

my_dog = Dog("Rex", "Labrador")
print(my_dog.bark())   # Rex says: Woof!`,
      keypoints: [
        "__init__ is the constructor — it runs automatically when you create an object",
        "self refers to the current object instance inside methods",
        "Attributes (self.name) store data; methods define behaviour",
      ],
      quiz: [
        {
          q: "What is __init__ used for?",
          opts: [
            "Destroying objects",
            "Initialising objects",
            "Printing objects",
            "Comparing objects",
          ],
          ans: 1,
        },
        {
          q: "What does self refer to?",
          opts: [
            "The class",
            "The current instance",
            "The parent class",
            "A method",
          ],
          ans: 1,
        },
        {
          q: "How do you create an object from class Dog?",
          opts: ["Dog.create()", "new Dog()", "Dog()", "make Dog()"],
          ans: 2,
        },
      ],
    },
    medium: {
      explanation:
        "Classes support inheritance, class methods, static methods, and properties. Understanding the Method Resolution Order (MRO) and using super() correctly is essential for building reliable class hierarchies.",
      code: `class Animal:
    def __init__(self, name):
        self._name = name

    @property
    def name(self):
        return self._name

    @classmethod
    def create(cls, name):
        return cls(name)

class Dog(Animal):
    def speak(self):
        return f"{super().name}: Woof!"`,
      keypoints: [
        "@property creates a getter — access it like an attribute, not a method call",
        "@classmethod receives the class (cls) not the instance — used for factory methods",
        "super() calls the parent class method — always use it in __init__ of subclasses",
      ],
      quiz: [
        {
          q: "What does @property do?",
          opts: [
            "Creates private attribute",
            "Makes method callable as attribute",
            "Validates input",
            "Creates class variable",
          ],
          ans: 1,
        },
        {
          q: "What does @classmethod receive as first arg?",
          opts: ["self", "cls", "super", "None"],
          ans: 1,
        },
        {
          q: "What is MRO?",
          opts: [
            "Memory Reference Object",
            "Method Resolution Order",
            "Multiple Return Object",
            "Module Reference Order",
          ],
          ans: 1,
        },
      ],
    },
    hard: {
      explanation:
        "Advanced OOP uses metaclasses, descriptors, and __slots__ for memory optimisation. Metaclasses control class creation itself, descriptors manage attribute access, and abstract base classes enforce interface contracts.",
      code: `from abc import ABC, abstractmethod

class Singleton(type):
    _instances = {}
    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super().__call__(*args, **kwargs)
        return cls._instances[cls]

class Config(metaclass=Singleton):
    __slots__ = ['host', 'port']
    def __init__(self):
        self.host = "localhost"
        self.port = 8000`,
      keypoints: [
        "__slots__ replaces __dict__ with fixed attributes — reduces memory by ~40%",
        "Metaclasses control class creation — type is the default metaclass",
        "Singleton pattern ensures only one instance exists using metaclass __call__",
      ],
      quiz: [
        {
          q: "What does __slots__ do?",
          opts: [
            "Limits method count",
            "Replaces __dict__ to save memory",
            "Creates thread locks",
            "Defines abstract methods",
          ],
          ans: 1,
        },
        {
          q: "What is the default metaclass in Python?",
          opts: ["object", "type", "meta", "class"],
          ans: 1,
        },
        {
          q: "What does a Singleton pattern guarantee?",
          opts: [
            "Thread safety",
            "Only one instance exists",
            "Fast creation",
            "Immutability",
          ],
          ans: 1,
        },
      ],
    },
  },

  "Exception Handling": {
    easy: {
      explanation:
        "Exception handling lets your program deal with errors gracefully instead of crashing. You use try to wrap risky code and except to handle errors if they occur. This keeps your program running even when something unexpected happens.",
      code: `try:
    number = int(input("Enter a number: "))
    result = 10 / number
    print(f"Result: {result}")
except ValueError:
    print("That's not a valid number!")
except ZeroDivisionError:
    print("Cannot divide by zero!")`,
      keypoints: [
        "try contains code that might fail; except handles specific errors",
        "Always catch specific exceptions — avoid bare except: which catches everything",
        "Multiple except blocks handle different error types differently",
      ],
      quiz: [
        {
          q: "What block contains risky code?",
          opts: ["except", "try", "finally", "error"],
          ans: 1,
        },
        {
          q: "What error does int('abc') raise?",
          opts: ["TypeError", "ValueError", "NameError", "KeyError"],
          ans: 1,
        },
        {
          q: "What is bad practice in exception handling?",
          opts: [
            "Multiple except",
            "Bare except:",
            "Using finally",
            "Raising exceptions",
          ],
          ans: 1,
        },
      ],
    },
    medium: {
      explanation:
        "Python's exception hierarchy allows catching groups of related errors. The else clause runs when no exception occurs, finally always runs for cleanup. Custom exceptions extend Exception to create domain-specific error types.",
      code: `class InsufficientFundsError(Exception):
    def __init__(self, amount, balance):
        self.amount = amount
        super().__init__(f"Need {amount}, have {balance}")

def withdraw(balance, amount):
    if amount > balance:
        raise InsufficientFundsError(amount, balance)
    return balance - amount

try:
    withdraw(100, 150)
except InsufficientFundsError as e:
    print(e)
finally:
    print("Transaction complete")`,
      keypoints: [
        "Custom exceptions should inherit from Exception, not BaseException",
        "finally always runs — ideal for closing files, connections, or releasing locks",
        "else in try/except runs only when no exception was raised",
      ],
      quiz: [
        {
          q: "When does the finally block run?",
          opts: [
            "Only on success",
            "Only on error",
            "Always",
            "Only with return",
          ],
          ans: 2,
        },
        {
          q: "What should custom exceptions inherit from?",
          opts: ["BaseException", "Exception", "Error", "RuntimeError"],
          ans: 1,
        },
        {
          q: "When does try/except/else's else run?",
          opts: [
            "Always",
            "On exception",
            "No exception raised",
            "After finally",
          ],
          ans: 2,
        },
      ],
    },
    hard: {
      explanation:
        "Advanced exception handling involves exception chaining (raise from), context managers for resource management, and using ExceptionGroup (Python 3.11+) for handling multiple concurrent exceptions from async code.",
      code: `# Exception chaining
try:
    data = json.loads("{invalid}")
except json.JSONDecodeError as e:
    raise ValueError("Config file corrupted") from e

# ExceptionGroup (Python 3.11+)
try:
    raise ExceptionGroup("multiple", [
        ValueError("bad value"),
        TypeError("bad type")
    ])
except* ValueError as eg:
    print(f"Value errors: {eg.exceptions}")`,
      keypoints: [
        "raise X from Y chains exceptions — preserves original cause in __cause__",
        "ExceptionGroup handles multiple exceptions from concurrent tasks (3.11+)",
        "except* matches specific types within an ExceptionGroup",
      ],
      quiz: [
        {
          q: "What does raise X from Y do?",
          opts: [
            "Raises both",
            "Chains exceptions preserving cause",
            "Suppresses Y",
            "Merges messages",
          ],
          ans: 1,
        },
        {
          q: "What Python version added ExceptionGroup?",
          opts: ["3.9", "3.10", "3.11", "3.12"],
          ans: 2,
        },
        {
          q: "What syntax handles ExceptionGroup types?",
          opts: ["except []", "except*", "except multi:", "except group:"],
          ans: 1,
        },
      ],
    },
  },

  Comprehensions: {
    easy: {
      explanation:
        "Comprehensions are a concise way to create lists, sets, or dictionaries from existing data. They combine a loop and optional condition in a single line, making common data transformation patterns much more readable.",
      code: `# List comprehension
squares = [x**2 for x in range(10)]

# With condition
evens = [x for x in range(20) if x % 2 == 0]

# Dict comprehension
word_lengths = {w: len(w) for w in ["hi", "hello", "hey"]}

# Set comprehension
unique = {x % 3 for x in range(10)}`,
      keypoints: [
        "List: [expr for x in iterable if condition]",
        "Dict: {key: value for x in iterable}",
        "Set: {expr for x in iterable} — automatically removes duplicates",
      ],
      quiz: [
        {
          q: "What does [x*2 for x in range(4)] produce?",
          opts: ["[1,2,3,4]", "[0,2,4,6]", "[2,4,6,8]", "[0,1,2,3]"],
          ans: 1,
        },
        {
          q: "What type does {x for x in [1,1,2,2]} return?",
          opts: ["list", "tuple", "set", "dict"],
          ans: 2,
        },
        {
          q: "How do you add a condition to a list comprehension?",
          opts: ["if at start", "if at end", "filter() only", "where clause"],
          ans: 1,
        },
      ],
    },
    medium: {
      explanation:
        "Generator expressions use the same syntax as list comprehensions but with parentheses — they yield items lazily without creating the full list in memory. This is critical for processing large datasets efficiently.",
      code: `import sys

# Memory comparison
list_comp = [x**2 for x in range(1000000)]
gen_exp = (x**2 for x in range(1000000))

print(sys.getsizeof(list_comp))  # ~8MB
print(sys.getsizeof(gen_exp))    # ~112 bytes

# Chained generators
result = sum(x**2 for x in range(1000) if x % 2 == 0)`,
      keypoints: [
        "Generator expressions use () instead of [] — memory stays constant regardless of size",
        "sum(), max(), min() accept generators directly — no need to create a list",
        "Nested comprehensions: outer loop first, inner loop second in syntax",
      ],
      quiz: [
        {
          q: "What syntax creates a generator expression?",
          opts: ["[x for x]", "(x for x)", "{x for x}", "gen(x for x)"],
          ans: 1,
        },
        {
          q: "What is the memory size of a generator regardless of data size?",
          opts: [
            "Depends on size",
            "Constant small size",
            "Doubles each item",
            "Zero",
          ],
          ans: 1,
        },
        {
          q: "Can sum() accept a generator?",
          opts: ["Yes", "No", "Only with list()", "Only integers"],
          ans: 0,
        },
      ],
    },
    hard: {
      explanation:
        "Advanced comprehension patterns include walrus operator assignment, complex nested structures, and performance profiling. Understanding when NOT to use comprehensions — deeply nested logic, side effects — is as important as knowing how to use them.",
      code: `import re
from itertools import chain

# Walrus in comprehension
results = [
    clean for text in texts
    if (clean := re.sub(r'\\s+', ' ', text).strip())
    if len(clean) > 10
]

# Flat nested with chain
matrix = [[1,2,3],[4,5,6],[7,8,9]]
flat = list(chain.from_iterable(matrix))`,
      keypoints: [
        "Walrus operator := in comprehensions avoids recomputing expensive expressions",
        "chain.from_iterable() is faster than nested comprehensions for flattening",
        "Avoid comprehensions with side effects — use regular loops for clarity",
      ],
      quiz: [
        {
          q: "What does := do in a comprehension?",
          opts: [
            "Creates generator",
            "Assigns and reuses value",
            "Filters items",
            "Breaks loop",
          ],
          ans: 1,
        },
        {
          q: "When should you NOT use comprehensions?",
          opts: [
            "Large data",
            "With side effects",
            "Simple transforms",
            "With conditions",
          ],
          ans: 1,
        },
        {
          q: "What is chain.from_iterable() best for?",
          opts: [
            "Sorting",
            "Flattening nested iterables",
            "Filtering",
            "Zipping",
          ],
          ans: 1,
        },
      ],
    },
  },

  Decorators: {
    easy: {
      explanation:
        "A decorator is a function that wraps another function to add extra behaviour without modifying its code. You apply decorators using the @ symbol above a function definition. They're widely used for logging, timing, and access control.",
      code: `def shout(func):
    def wrapper(*args, **kwargs):
        result = func(*args, **kwargs)
        return result.upper()
    return wrapper

@shout
def greet(name):
    return f"hello, {name}"

print(greet("alice"))  # HELLO, ALICE`,
      keypoints: [
        "A decorator takes a function, wraps it in another function, and returns the wrapper",
        "@decorator is shorthand for function = decorator(function)",
        "Use *args and **kwargs in the wrapper to accept any arguments",
      ],
      quiz: [
        {
          q: "What does @decorator do?",
          opts: [
            "Deletes function",
            "Wraps function with decorator",
            "Copies function",
            "Renames function",
          ],
          ans: 1,
        },
        {
          q: "What is @shout equivalent to?",
          opts: [
            "shout(greet)",
            "greet = shout(greet)",
            "shout.greet()",
            "greet.shout()",
          ],
          ans: 1,
        },
        {
          q: "Why use *args, **kwargs in wrapper?",
          opts: [
            "To log calls",
            "To accept any arguments",
            "Required syntax",
            "To return None",
          ],
          ans: 1,
        },
      ],
    },
    medium: {
      explanation:
        "Parametrised decorators add a layer of nesting — a decorator factory returns the actual decorator. Using functools.wraps preserves the original function's metadata, and class-based decorators enable stateful behaviour.",
      code: `from functools import wraps

def retry(times=3):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(times):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == times - 1:
                        raise
            return wrapper
        return decorator
    return decorator

@retry(times=5)
def fetch_data():
    pass`,
      keypoints: [
        "Parametrised decorators need three levels of nesting: factory → decorator → wrapper",
        "@wraps(func) copies __name__, __doc__, and __module__ to the wrapper",
        "Class decorators with __call__ allow stateful tracking across invocations",
      ],
      quiz: [
        {
          q: "How many nesting levels does a parametrised decorator need?",
          opts: ["1", "2", "3", "4"],
          ans: 2,
        },
        {
          q: "What does @wraps preserve?",
          opts: [
            "Return value",
            "Function metadata",
            "Arguments",
            "Side effects",
          ],
          ans: 1,
        },
        {
          q: "What enables stateful decorators?",
          opts: [
            "*args",
            "Class with __call__",
            "global vars",
            "closures only",
          ],
          ans: 1,
        },
      ],
    },
    hard: {
      explanation:
        "Descriptor-based decorators, decorator stacking order, and thread-safe stateful decorators require deep understanding of Python's object model. Combining decorators with async functions requires special handling to preserve coroutine behaviour.",
      code: `import asyncio
from functools import wraps

def async_retry(times=3, delay=1.0):
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            for i in range(times):
                try:
                    return await func(*args, **kwargs)
                except Exception:
                    if i < times - 1:
                        await asyncio.sleep(delay * (2 ** i))
                    else:
                        raise
        return wrapper
    return decorator`,
      keypoints: [
        "Async decorators must use async def wrapper and await the wrapped function",
        "Decorator stacking is applied bottom-up — innermost decorator runs first",
        "Thread-safe stateful decorators require threading.Lock for shared state",
      ],
      quiz: [
        {
          q: "What must an async decorator's wrapper be?",
          opts: ["Regular function", "async def", "Generator", "Class method"],
          ans: 1,
        },
        {
          q: "In what order are stacked decorators applied?",
          opts: ["Top to bottom", "Bottom to top", "Alphabetical", "Random"],
          ans: 1,
        },
        {
          q: "What ensures thread safety in stateful decorators?",
          opts: ["@wraps", "threading.Lock", "async", "global"],
          ans: 1,
        },
      ],
    },
  },

  Threading: {
    easy: {
      explanation:
        "Threading allows your program to run multiple tasks concurrently. Each thread is a separate path of execution. Python's threading module makes it easy to run functions in parallel, though the GIL limits true CPU parallelism for compute-heavy tasks.",
      code: `import threading
import time

def task(name, delay):
    time.sleep(delay)
    print(f"{name} done")

t1 = threading.Thread(target=task, args=("Task A", 2))
t2 = threading.Thread(target=task, args=("Task B", 1))

t1.start(); t2.start()
t1.join();  t2.join()
print("All done")`,
      keypoints: [
        "Thread(target=fn, args=(..)) creates a thread; .start() runs it",
        ".join() waits for a thread to finish before continuing",
        "Threads are good for I/O tasks (network, files) but limited for CPU tasks by the GIL",
      ],
      quiz: [
        {
          q: "What does thread.start() do?",
          opts: [
            "Creates thread",
            "Begins thread execution",
            "Waits for thread",
            "Stops thread",
          ],
          ans: 1,
        },
        {
          q: "What does thread.join() do?",
          opts: [
            "Starts thread",
            "Stops thread",
            "Waits for thread to finish",
            "Merges threads",
          ],
          ans: 2,
        },
        {
          q: "What limits CPU parallelism in Python threads?",
          opts: ["RAM", "GIL", "OS", "CPU cores"],
          ans: 1,
        },
      ],
    },
    medium: {
      explanation:
        "Thread synchronisation prevents race conditions using locks, events, and semaphores. The threading.local() object provides thread-local storage, and daemon threads automatically terminate when the main program exits.",
      code: `import threading

counter = 0
lock = threading.Lock()

def increment(n):
    global counter
    for _ in range(n):
        with lock:       # Thread-safe
            counter += 1

threads = [threading.Thread(target=increment, args=(1000,)) for _ in range(5)]
[t.start() for t in threads]
[t.join() for t in threads]
print(counter)   # Always 5000`,
      keypoints: [
        "Use with lock: as a context manager — automatically acquires and releases",
        "Without locks, concurrent writes cause race conditions and data corruption",
        "threading.Event() is for signalling between threads; Semaphore limits concurrency",
      ],
      quiz: [
        {
          q: "What is a race condition?",
          opts: [
            "Thread running too fast",
            "Concurrent access corrupting shared data",
            "Thread deadlock",
            "Memory overflow",
          ],
          ans: 1,
        },
        {
          q: "What does with lock: do?",
          opts: [
            "Creates thread",
            "Acquires/releases lock automatically",
            "Kills thread",
            "Copies data",
          ],
          ans: 1,
        },
        {
          q: "What is threading.Event used for?",
          opts: [
            "Locking",
            "Signalling between threads",
            "Creating threads",
            "Timing",
          ],
          ans: 1,
        },
      ],
    },
    hard: {
      explanation:
        "Advanced threading involves thread pools, barrier synchronisation, and avoiding deadlocks. concurrent.futures.ThreadPoolExecutor provides a high-level interface for managing thread pools with futures for result collection.",
      code: `from concurrent.futures import ThreadPoolExecutor, as_completed
import requests

urls = ["https://example.com"] * 5

def fetch(url):
    return len(url)  # Simulate fetch

with ThreadPoolExecutor(max_workers=4) as executor:
    futures = {executor.submit(fetch, url): url for url in urls}
    for future in as_completed(futures):
        url = futures[future]
        print(f"{url}: {future.result()}")`,
      keypoints: [
        "ThreadPoolExecutor manages a pool of reusable threads — avoids creation overhead",
        "as_completed() yields futures as they finish, not in submission order",
        "Deadlocks occur when threads wait on each other — always acquire locks in the same order",
      ],
      quiz: [
        {
          q: "What does as_completed() return futures in?",
          opts: [
            "Submission order",
            "Completion order",
            "Alphabetical",
            "Random",
          ],
          ans: 1,
        },
        {
          q: "What causes a deadlock?",
          opts: [
            "Too many threads",
            "Threads waiting on each other",
            "No lock used",
            "GIL",
          ],
          ans: 1,
        },
        {
          q: "What is the advantage of ThreadPoolExecutor?",
          opts: [
            "Bypasses GIL",
            "Reuses threads avoiding creation overhead",
            "True parallelism",
            "No sync needed",
          ],
          ans: 1,
        },
      ],
    },
  },

  "Async/Await": {
    easy: {
      explanation:
        "Async/await lets you write concurrent code that looks like sequential code. async def creates a coroutine function; await pauses execution until a result is ready without blocking other tasks. It's ideal for I/O-heavy applications.",
      code: `import asyncio

async def say_hello(name, delay):
    await asyncio.sleep(delay)
    print(f"Hello, {name}!")

async def main():
    await asyncio.gather(
        say_hello("Alice", 2),
        say_hello("Bob", 1)
    )

asyncio.run(main())
# Bob first (1s), then Alice (2s)`,
      keypoints: [
        "async def defines a coroutine — it must be awaited to run",
        "await pauses the current coroutine and lets others run",
        "asyncio.gather() runs multiple coroutines concurrently",
      ],
      quiz: [
        {
          q: "What does async def create?",
          opts: ["Thread", "Coroutine function", "Generator", "Process"],
          ans: 1,
        },
        {
          q: "What does await do?",
          opts: [
            "Blocks program",
            "Pauses coroutine and lets others run",
            "Creates thread",
            "Raises exception",
          ],
          ans: 1,
        },
        {
          q: "What runs multiple coroutines concurrently?",
          opts: [
            "asyncio.run()",
            "asyncio.gather()",
            "asyncio.wait()",
            "asyncio.start()",
          ],
          ans: 1,
        },
      ],
    },
    medium: {
      explanation:
        "Async context managers and iterators extend the async model to resource management. asyncio.TaskGroup (3.11+) provides structured concurrency with automatic cancellation on failure, replacing error-prone gather() patterns.",
      code: `import asyncio
import aiohttp

async def fetch_all(urls):
    async with aiohttp.ClientSession() as session:
        async with asyncio.TaskGroup() as tg:
            tasks = [
                tg.create_task(fetch_one(session, url))
                for url in urls
            ]
    return [t.result() for t in tasks]

async def fetch_one(session, url):
    async with session.get(url) as resp:
        return await resp.text()`,
      keypoints: [
        "async with is for async context managers — aiohttp sessions, database connections",
        "TaskGroup (3.11+) cancels all tasks if any fails — safer than gather()",
        "async for iterates over async generators without blocking",
      ],
      quiz: [
        {
          q: "What is async with used for?",
          opts: [
            "Running tasks",
            "Async context managers",
            "Creating threads",
            "Importing modules",
          ],
          ans: 1,
        },
        {
          q: "What does TaskGroup do on task failure?",
          opts: [
            "Ignores it",
            "Cancels all remaining tasks",
            "Retries",
            "Logs error",
          ],
          ans: 1,
        },
        {
          q: "What version added TaskGroup?",
          opts: ["3.8", "3.9", "3.10", "3.11"],
          ans: 3,
        },
      ],
    },
    hard: {
      explanation:
        "Deep async involves custom event loops, protocol/transport layers, and async generators. Understanding the event loop internals — selector, callbacks, futures, and task scheduling — enables building high-performance network servers and custom async frameworks.",
      code: `import asyncio

class EchoProtocol(asyncio.Protocol):
    def connection_made(self, transport):
        self.transport = transport

    def data_received(self, data):
        self.transport.write(data)  # Echo back

    def connection_lost(self, exc):
        pass

async def main():
    loop = asyncio.get_event_loop()
    server = await loop.create_server(EchoProtocol, '127.0.0.1', 8888)
    async with server:
        await server.serve_forever()`,
      keypoints: [
        "Protocol/Transport separates connection logic from data handling",
        "The event loop uses selectors (epoll/kqueue) for O(1) I/O multiplexing",
        "Custom event loop policies allow replacing the default loop implementation",
      ],
      quiz: [
        {
          q: "What does asyncio.Protocol handle?",
          opts: [
            "Thread management",
            "Connection and data events",
            "Task scheduling",
            "Memory management",
          ],
          ans: 1,
        },
        {
          q: "What system call does the event loop use for I/O?",
          opts: [
            "select() only",
            "epoll/kqueue (platform-dependent)",
            "poll() only",
            "read/write directly",
          ],
          ans: 1,
        },
        {
          q: "What separates connection logic from data in asyncio?",
          opts: [
            "Coroutines",
            "Protocol/Transport",
            "Tasks/Futures",
            "Streams",
          ],
          ans: 1,
        },
      ],
    },
  },
  "Input/Output": {
    easy: {
      explanation:
        "Input and output are how your program communicates with the user. print() displays information on the screen, and input() reads text the user types. input() always returns a string, so you need to convert it if you want a number.",
      code: `# Output
print("Hello, World!")
print("Sum:", 3 + 4)

# Input
name = input("What is your name? ")
print(f"Hello, {name}!")

# Convert input to number
age = int(input("Enter your age: "))
print(f"Next year you'll be {age + 1}")`,
      keypoints: [
        "print() displays values to the screen — separate multiple values with commas",
        "input() always returns a string — use int() or float() to convert to a number",
        "f-strings make it easy to include variables inside print statements",
      ],
    },
    medium: {
      explanation:
        "Advanced I/O includes formatted output with f-strings, controlling print() with sep and end, and reading from files. The sep and end parameters of print() give fine-grained control over output formatting.",
      code: `# Print control
print("a", "b", "c", sep="-")    # a-b-c
print("loading", end="...")       # loading...

# Format numbers
pi = 3.14159
print(f"{pi:.2f}")      # 3.14
print(f"{1000000:,}")   # 1,000,000
print(f"{'hi':>10}")    # right-align in 10 chars`,
      keypoints: [
        "sep= controls separator between print() arguments (default is space)",
        "end= controls what print() appends at the end (default is newline)",
        "f'{value:.2f}' formats floats; f'{value:,}' adds thousand separators",
      ],
    },
    hard: {
      explanation:
        "Production I/O involves buffering strategies, binary vs text mode, and in-memory buffers. Understanding io.StringIO, io.BytesIO, and proper resource cleanup is essential for reliable file and stream handling.",
      code: `import io
import sys

# In-memory buffer
buf = io.StringIO()
buf.write("buffered content")
buf.seek(0)
print(buf.read())    # buffered content

# Redirect stdout
old_stdout = sys.stdout
sys.stdout = io.StringIO()
print("captured")
output = sys.stdout.getvalue()
sys.stdout = old_stdout
print(f"Got: {output.strip()}")`,
      keypoints: [
        "io.StringIO() is an in-memory text buffer — useful for testing and capturing output",
        "io.BytesIO() is the binary equivalent for raw bytes",
        "Redirecting sys.stdout captures print() output — useful in testing",
      ],
    },
  },

  Comments: {
    easy: {
      explanation:
        "Comments are notes in your code that Python ignores when running the program. They explain what your code does and why. Single-line comments start with # and multi-line comments use triple quotes.",
      code: `# This is a single-line comment
name = "Alice"  # Inline comment after code

# Multi-line comment using triple quotes
"""
This section handles user authentication.
It checks credentials and returns a token.
"""

# TODO: add error handling later
x = 10  # NOTE: must be positive`,
      keypoints: [
        "# starts a comment — everything after it on that line is ignored by Python",
        "Triple quotes create multi-line strings that are used as block comments",
        "Write comments that explain WHY, not WHAT — the code itself shows what",
      ],
    },
    medium: {
      explanation:
        "Docstrings are special strings that document functions, classes, and modules. They're accessible at runtime via __doc__ and used by tools like help() and documentation generators like Sphinx.",
      code: `def calculate_area(width: float, height: float) -> float:
    """
    Calculate the area of a rectangle.

    Args:
        width: The width in metres.
        height: The height in metres.

    Returns:
        The area in square metres.

    Raises:
        ValueError: If width or height is negative.
    """
    if width < 0 or height < 0:
        raise ValueError("Dimensions must be positive")
    return width * height

print(calculate_area.__doc__)`,
      keypoints: [
        "Docstrings use triple quotes as the first statement in a function or class",
        "Access docstrings at runtime with function.__doc__ or help(function)",
        "Follow Google or NumPy style for consistent, readable documentation",
      ],
    },
    hard: {
      explanation:
        "Type annotations combined with docstrings enable static analysis tools like mypy to catch bugs before runtime. PEP 526 variable annotations provide runtime-accessible type information stored in __annotations__.",
      code: `from typing import Optional
from dataclasses import dataclass, field

@dataclass
class Config:
    """Application configuration.

    Attributes:
        host: Server hostname.
        port: Server port number.
        debug: Enable debug mode.
    """
    host: str = "localhost"
    port: int = 8000
    debug: bool = False
    tags: list[str] = field(default_factory=list)

# Access annotations at runtime
print(Config.__annotations__)`,
      keypoints: [
        "Type annotations are stored in __annotations__ dict and accessible at runtime",
        "@dataclass auto-generates __init__, __repr__, __eq__ from annotations",
        "field(default_factory=list) avoids the mutable default argument pitfall",
      ],
    },
  },

  Elif: {
    easy: {
      explanation:
        "elif (short for else if) lets you check multiple conditions in sequence. Python checks each condition from top to bottom and runs the first block that is True. If none match, the else block runs.",
      code: `score = 75

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
elif score >= 60:
    grade = "D"
else:
    grade = "F"

print(f"Grade: {grade}")  # Grade: C`,
      keypoints: [
        "elif checks another condition only if the previous if/elif was False",
        "Only the first matching block runs — the rest are skipped",
        "You can have as many elif blocks as you need between if and else",
      ],
    },
    medium: {
      explanation:
        "elif chains are evaluated lazily — Python stops at the first True condition. For many discrete values, a dictionary dispatch is often cleaner and more maintainable than a long elif chain.",
      code: `# Dictionary dispatch — cleaner than long elif
def get_discount(tier):
    discounts = {
        "bronze": 0.05,
        "silver": 0.10,
        "gold":   0.20,
    }
    return discounts.get(tier, 0.0)

# match/case alternative (Python 3.10+)
def classify(n):
    match n:
        case n if n < 0: return "negative"
        case 0:          return "zero"
        case _:          return "positive"`,
      keypoints: [
        "Dictionary dispatch replaces elif chains for discrete value mapping",
        "dict.get(key, default) returns default if key not found — no KeyError",
        "match/case (Python 3.10+) is cleaner than elif for pattern matching",
      ],
    },
    hard: {
      explanation:
        "Long elif chains are O(n) — each condition evaluated sequentially. Dictionary lookups are O(1). functools.singledispatch enables type-based dispatch as a clean alternative to isinstance elif chains.",
      code: `from functools import singledispatch

@singledispatch
def process(value):
    raise TypeError(f"Unsupported: {type(value)}")

@process.register(int)
def _(value):
    return value * 2

@process.register(str)
def _(value):
    return value.upper()

@process.register(list)
def _(value):
    return [process(x) for x in value]

print(process(5))         # 10
print(process("hello"))   # HELLO
print(process([1, 2, 3])) # [2, 4, 6]`,
      keypoints: [
        "singledispatch dispatches to different implementations based on argument type",
        "Dictionary lookup is O(1) vs O(n) for elif chains on hot paths",
        "Register new types with @function.register(type) without modifying original",
      ],
    },
  },

  "Break/Continue": {
    easy: {
      explanation:
        "break and continue control how loops execute. break immediately exits the entire loop. continue skips the rest of the current iteration and moves to the next one. Both work in for and while loops.",
      code: `# break — exit loop early
for i in range(10):
    if i == 5:
        break
    print(i)    # 0, 1, 2, 3, 4

print("Loop ended")

# continue — skip current iteration
for i in range(10):
    if i % 2 == 0:
        continue
    print(i)    # 1, 3, 5, 7, 9`,
      keypoints: [
        "break exits the entire loop — execution continues after the loop",
        "continue skips the rest of the current iteration and goes to the next",
        "Both break and continue work inside for and while loops",
      ],
    },
    medium: {
      explanation:
        "break only exits the innermost loop in nested loops. To break out of multiple levels, refactor into a function and use return, which exits all loops at once.",
      code: `# Problem: break only exits innermost
def find_pair(limit):
    for i in range(5):
        for j in range(5):
            if i * j > limit:
                return i, j   # Exits all loops cleanly
    return None

result = find_pair(10)
print(result)   # (3, 4)

# for/else — detects natural completion
for n in range(2, 10):
    for x in range(2, n):
        if n % x == 0:
            break
    else:
        print(f"{n} is prime")`,
      keypoints: [
        "break only exits the innermost loop — use return to exit all nested loops",
        "Refactoring nested loops into a function makes return the clean exit",
        "for/else: the else runs only if the loop completed without hitting break",
      ],
    },
    hard: {
      explanation:
        "itertools.takewhile() and dropwhile() are functional alternatives to break and continue. They enable clean stream processing without manual loop control in data pipelines.",
      code: `import itertools

data = [1, 3, 5, 8, 11, 14, 7, 2]

# takewhile — yield while condition True (like break)
odds_first = list(
    itertools.takewhile(lambda x: x % 2 != 0, data)
)
print(odds_first)    # [1, 3, 5]

# dropwhile — skip while condition True (like continue)
after_small = list(
    itertools.dropwhile(lambda x: x < 10, data)
)
print(after_small)   # [11, 14, 7, 2]`,
      keypoints: [
        "itertools.takewhile() yields items while condition is True — cleaner than break",
        "itertools.dropwhile() skips items while condition is True — cleaner than continue",
        "These functions return lazy iterators — no intermediate list is created",
      ],
    },
  },

  Pass: {
    easy: {
      explanation:
        "pass is a placeholder statement that does nothing. It is used when Python requires a statement syntactically but you have no code to write yet. Common uses include empty functions, empty classes, and placeholder loop bodies.",
      code: `# Empty function placeholder
def future_feature():
    pass

# Empty class skeleton
class TodoItem:
    pass

# Placeholder in loop
for i in range(10):
    if i % 2 == 0:
        pass    # handle evens later
    else:
        print(i)`,
      keypoints: [
        "pass does absolutely nothing — it is a valid Python statement that is ignored",
        "Use pass when Python requires a statement but you have no code yet",
        "Common in empty functions, classes, if blocks, and exception handlers",
      ],
    },
    medium: {
      explanation:
        "pass is often compared to Ellipsis (...) which serves a similar placeholder role but carries the semantic meaning of 'not yet implemented'. Ellipsis is preferred in abstract methods and type stubs.",
      code: `from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self) -> float:
        ...   # Ellipsis — preferred for abstract stubs

    @abstractmethod
    def perimeter(self) -> float:
        pass  # Also valid but less idiomatic

# In type stubs (.pyi files)
def process(data: list) -> None: ...`,
      keypoints: [
        "... (Ellipsis) is preferred over pass in abstract methods and type stubs",
        "pass and ... are functionally identical but carry different semantic intent",
        "Use pass for blocks you plan to fill; use ... for intentional abstract stubs",
      ],
    },
    hard: {
      explanation:
        "In AST manipulation and code generation, pass corresponds to the ast.Pass node. Understanding Python's AST enables building linters, formatters, and code transformation tools.",
      code: `import ast

source = """
def empty_function():
    pass

class EmptyClass:
    pass
"""

tree = ast.parse(source)
pass_count = sum(
    1 for node in ast.walk(tree)
    if isinstance(node, ast.Pass)
)
print(f"Found {pass_count} pass statements")  # 2

# Generate code with pass
func = ast.FunctionDef(
    name="stub",
    args=ast.arguments([], [], None, [], [], None, []),
    body=[ast.Pass()],
    decorator_list=[]
)`,
      keypoints: [
        "ast.Pass is the AST node representing a pass statement",
        "ast.walk() recursively traverses all nodes in an AST tree",
        "AST manipulation enables code analysis tools, linters, and transformers",
      ],
    },
  },

  Tuples: {
    easy: {
      explanation:
        "A tuple is an ordered collection like a list, but it cannot be changed after creation — it is immutable. Tuples are created with parentheses and are commonly used to group related values together, like coordinates or RGB colours.",
      code: `# Creating tuples
point = (3, 4)
rgb = (255, 128, 0)
single = (42,)    # Note the comma — required for single item

# Accessing items
print(point[0])   # 3
print(point[-1])  # 4

# Unpacking
x, y = point
print(x, y)       # 3 4

# Tuples are immutable
# point[0] = 10   # TypeError!`,
      keypoints: [
        "Tuples use parentheses () and are immutable — you cannot change them after creation",
        "A single-item tuple needs a trailing comma: (42,) not (42)",
        "Tuple unpacking assigns each value to a separate variable in one line",
      ],
    },
    medium: {
      explanation:
        "Tuples are hashable (if all elements are hashable), making them usable as dictionary keys and set members. Named tuples add field names to make tuple data self-documenting without the overhead of a full class.",
      code: `from collections import namedtuple

# Named tuple — self-documenting
Point = namedtuple('Point', ['x', 'y'])
p = Point(3, 4)
print(p.x, p.y)        # 3 4
print(p._asdict())     # {'x': 3, 'y': 4}

# Tuple as dict key (hashable)
grid = {(0,0): "origin", (1,0): "east"}
print(grid[(0,0)])     # origin

# Swap without temp variable
a, b = 1, 2
a, b = b, a
print(a, b)            # 2 1`,
      keypoints: [
        "Tuples are hashable — they can be used as dictionary keys or set elements",
        "namedtuple adds field names to tuples — more readable than index access",
        "Python uses tuple packing/unpacking for multiple assignment and swapping",
      ],
    },
    hard: {
      explanation:
        "typing.NamedTuple provides a class-based syntax for named tuples with type annotations. dataclasses with frozen=True offer similar immutability with more flexibility. Understanding tuple's memory advantages over lists matters at scale.",
      code: `from typing import NamedTuple
import sys

class Coordinate(NamedTuple):
    x: float
    y: float
    z: float = 0.0

    def distance(self) -> float:
        return (self.x**2 + self.y**2 + self.z**2) ** 0.5

c = Coordinate(3.0, 4.0)
print(c.distance())    # 5.0
print(c._replace(z=1.0))

# Memory comparison
t = tuple(range(1000))
l = list(range(1000))
print(sys.getsizeof(t))  # ~8056 bytes
print(sys.getsizeof(l))  # ~8056 + overhead`,
      keypoints: [
        "typing.NamedTuple supports type annotations and default values",
        "_replace() returns a new tuple with specified fields changed — tuple stays immutable",
        "Tuples use slightly less memory than lists due to no over-allocation",
      ],
    },
  },
  Sets: {
    easy: {
      explanation:
        "A set is an unordered collection of unique items. Sets automatically remove duplicates and are great for membership testing and removing repeated values from lists. Sets are created with curly braces or the set() function.",
      code: `# Creating sets
fruits = {"apple", "banana", "cherry"}
numbers = {1, 2, 3, 2, 1}   # Duplicates removed
print(numbers)               # {1, 2, 3}

# Membership test
print("apple" in fruits)     # True

# Add and remove
fruits.add("mango")
fruits.discard("banana")     # No error if missing

# From list — removes duplicates
unique = set([1, 2, 2, 3, 3, 3])
print(unique)   # {1, 2, 3}`,
      keypoints: [
        "Sets store only unique values — duplicates are automatically removed",
        "Use set() to remove duplicates from a list",
        "in operator is O(1) for sets — much faster than searching a list",
      ],
    },
    medium: {
      explanation:
        "Sets support mathematical operations — union, intersection, difference, and symmetric difference. These make set operations on collections of data concise and expressive.",
      code: `a = {1, 2, 3, 4, 5}
b = {4, 5, 6, 7, 8}

print(a | b)   # Union:        {1,2,3,4,5,6,7,8}
print(a & b)   # Intersection: {4, 5}
print(a - b)   # Difference:   {1, 2, 3}
print(a ^ b)   # Symmetric:    {1,2,3,6,7,8}

# Subset / superset
print({1,2} <= a)   # True — is subset
print(a >= {1,2})   # True — is superset

# Frozen set — immutable, hashable
fs = frozenset([1, 2, 3])`,
      keypoints: [
        "| union, & intersection, - difference, ^ symmetric difference",
        "<= checks subset, >= checks superset",
        "frozenset is an immutable set — can be used as a dictionary key",
      ],
    },
    hard: {
      explanation:
        "Sets are implemented as hash tables giving O(1) average for add, remove, and lookup. Understanding hash collisions, load factors, and when sets outperform lists is critical for writing efficient Python.",
      code: `import timeit

data_list = list(range(100000))
data_set  = set(range(100000))

# Membership test comparison
list_time = timeit.timeit(
    lambda: 99999 in data_list, number=1000
)
set_time = timeit.timeit(
    lambda: 99999 in data_set, number=1000
)

print(f"List: {list_time:.4f}s")  # ~2s
print(f"Set:  {set_time:.4f}s")   # ~0.0001s

# Set comprehension
squares = {x**2 for x in range(20) if x % 2 == 0}`,
      keypoints: [
        "Set lookup is O(1) average vs O(n) for list — critical for large collections",
        "Sets require hashable elements — lists and dicts cannot be set members",
        "Set comprehensions {expr for x in iterable} create sets efficiently",
      ],
    },
  },

  Dictionaries: {
    easy: {
      explanation:
        "A dictionary stores data as key-value pairs. You look up values by their key instead of a position. Dictionaries are created with curly braces and are perfect for storing structured data like a person's details.",
      code: `# Creating a dictionary
person = {
    "name": "Alice",
    "age": 25,
    "city": "London"
}

# Accessing values
print(person["name"])          # Alice
print(person.get("age"))       # 25
print(person.get("email", "N/A"))  # N/A

# Adding and updating
person["email"] = "alice@example.com"
person["age"] = 26

# Looping
for key, value in person.items():
    print(f"{key}: {value}")`,
      keypoints: [
        "Dictionaries store key-value pairs — access values with dict[key]",
        "Use .get(key, default) to avoid KeyError when key might not exist",
        ".items() returns key-value pairs, .keys() returns keys, .values() returns values",
      ],
    },
    medium: {
      explanation:
        "Dictionaries support powerful patterns like defaultdict, Counter, and dict comprehensions. Understanding dictionary merging, unpacking, and the guaranteed insertion order (Python 3.7+) helps write cleaner data processing code.",
      code: `from collections import defaultdict, Counter

# defaultdict — no KeyError for missing keys
word_count = defaultdict(int)
for word in "the cat sat on the mat".split():
    word_count[word] += 1

# Counter — frequency counting
c = Counter("mississippi")
print(c.most_common(3))   # [('s',4),('i',4),('p',2)]

# Dict comprehension
squares = {x: x**2 for x in range(5)}

# Merge dicts (Python 3.9+)
d1 = {"a": 1}; d2 = {"b": 2}
merged = d1 | d2`,
      keypoints: [
        "defaultdict(type) returns a default value for missing keys — no KeyError",
        "Counter counts hashable objects — .most_common(n) returns top n items",
        "| merges dictionaries (Python 3.9+); ** unpacking works in all versions",
      ],
    },
    hard: {
      explanation:
        "CPython dictionaries use open addressing hash tables with O(1) average operations. Understanding hash collisions, dictionary views, and memory layout enables writing high-performance code that minimises hash collisions.",
      code: `import sys

# Dictionary views — live, memory-efficient
d = {"a": 1, "b": 2, "c": 3}
keys_view = d.keys()
d["d"] = 4
print(keys_view)    # dict_keys(['a','b','c','d']) — updates live!

# Memory-efficient iteration
for k, v in d.items():   # No copy created
    pass

# ChainMap — layered lookup
from collections import ChainMap
defaults = {"color": "red", "size": "M"}
custom   = {"color": "blue"}
config   = ChainMap(custom, defaults)
print(config["color"])  # blue
print(config["size"])   # M`,
      keypoints: [
        "Dictionary views (.keys(), .values(), .items()) are live — they reflect changes",
        "ChainMap provides layered lookup across multiple dicts without copying",
        "Python 3.7+ guarantees dict insertion order is preserved",
      ],
    },
  },

  "List Slicing": {
    easy: {
      explanation:
        "Slicing lets you extract a portion of a list using the syntax list[start:stop:step]. Start is inclusive, stop is exclusive. Negative indices count from the end. Slicing creates a new list — the original is unchanged.",
      code: `nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

print(nums[2:5])    # [2, 3, 4]
print(nums[:4])     # [0, 1, 2, 3]
print(nums[6:])     # [6, 7, 8, 9]
print(nums[-3:])    # [7, 8, 9]
print(nums[::2])    # [0, 2, 4, 6, 8] — every 2nd
print(nums[::-1])   # [9,8,7,6,5,4,3,2,1,0] — reversed`,
      keypoints: [
        "list[start:stop] extracts from start up to (not including) stop",
        "Omit start or stop to slice from the beginning or to the end",
        "list[::-1] reverses a list — step of -1 goes backwards",
      ],
    },
    medium: {
      explanation:
        "Slices are first-class objects in Python — you can store them in variables using slice(). Slice assignment replaces a section of a list in place. Understanding copy semantics prevents bugs when working with nested lists.",
      code: `data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

# Slice assignment — modifies in place
data[2:5] = [20, 30, 40]
print(data)   # [0,1,20,30,40,5,6,7,8,9]

# Delete a range
del data[3:6]
print(data)   # [0, 1, 20, 6, 7, 8, 9]

# Reusable slice object
last_three = slice(-3, None)
print(data[last_three])   # [7, 8, 9]

# Shallow copy
copy = data[:]
copy.append(99)
print(data[-1])   # 9 — original unchanged`,
      keypoints: [
        "Slice assignment data[a:b] = [...] replaces elements in place",
        "slice(start, stop, step) creates a reusable slice object",
        "list[:] creates a shallow copy — nested objects are still shared",
      ],
    },
    hard: {
      explanation:
        "The __getitem__ dunder method handles slice access for custom types. numpy uses advanced indexing with boolean arrays and integer arrays — understanding these patterns is essential for scientific computing.",
      code: `class RingBuffer:
    def __init__(self, data):
        self._data = data

    def __getitem__(self, key):
        if isinstance(key, slice):
            start, stop, step = key.indices(len(self._data))
            return [self._data[i % len(self._data)]
                    for i in range(start, stop, step or 1)]
        return self._data[key % len(self._data)]

buf = RingBuffer([1, 2, 3, 4, 5])
print(buf[0:3])    # [1, 2, 3]
print(buf[3:7])    # [4, 5, 1, 2]`,
      keypoints: [
        "__getitem__ with isinstance(key, slice) enables custom slice behaviour",
        "slice.indices(length) returns (start, stop, step) clamped to valid range",
        "Boolean and integer array indexing in numpy is more powerful than standard slicing",
      ],
    },
  },

  Arguments: {
    easy: {
      explanation:
        "Arguments are the values you pass into a function when you call it. Parameters are the names defined in the function signature. Python supports positional arguments (order matters) and keyword arguments (name=value).",
      code: `def greet(first_name, last_name):
    print(f"Hello, {first_name} {last_name}!")

# Positional — order matters
greet("Alice", "Smith")

# Keyword — order doesn't matter
greet(last_name="Jones", first_name="Bob")

# Mix — positional first, then keyword
greet("Charlie", last_name="Brown")`,
      keypoints: [
        "Positional arguments are matched by position — order matters",
        "Keyword arguments use name=value — order doesn't matter",
        "Positional arguments must come before keyword arguments in a call",
      ],
    },
    medium: {
      explanation:
        "*args collects any number of positional arguments as a tuple. **kwargs collects keyword arguments as a dictionary. These allow functions to accept a flexible number of inputs.",
      code: `def log(*args, **kwargs):
    for arg in args:
        print(arg)
    for key, val in kwargs.items():
        print(f"{key}={val}")

log("error", "warning", level="high", source="db")

# Unpacking into function call
def add(a, b, c):
    return a + b + c

nums = [1, 2, 3]
print(add(*nums))         # 6

opts = {"a": 1, "b": 2, "c": 3}
print(add(**opts))        # 6`,
      keypoints: [
        "*args collects extra positional arguments as a tuple",
        "**kwargs collects extra keyword arguments as a dictionary",
        "* and ** also unpack sequences/dicts when calling functions",
      ],
    },
    hard: {
      explanation:
        "Keyword-only arguments (after *) and positional-only arguments (before /) enforce calling conventions. The inspect module provides runtime access to function signatures for building decorators and validation tools.",
      code: `import inspect

def strict(pos_only, /, normal, *, kw_only):
    """
    pos_only: positional only (before /)
    normal: positional or keyword
    kw_only: keyword only (after *)
    """
    return pos_only + normal + kw_only

# strict(1, 2, kw_only=3)  ✅
# strict(pos_only=1, ...)  ❌ TypeError

sig = inspect.signature(strict)
for name, param in sig.parameters.items():
    print(f"{name}: {param.kind.name}")`,
      keypoints: [
        "Parameters before / are positional-only — cannot be passed as keyword",
        "Parameters after * are keyword-only — must be passed by name",
        "inspect.signature() gives runtime access to parameter names and kinds",
      ],
    },
  },

  "Return Values": {
    easy: {
      explanation:
        "The return statement sends a value back from a function to the caller. A function can return any type of value — a number, string, list, or even another function. If no return is specified, the function returns None.",
      code: `def add(a, b):
    return a + b

result = add(3, 4)
print(result)    # 7

def get_info(name, age):
    return name, age    # Returns a tuple

name, age = get_info("Alice", 25)
print(name, age)         # Alice 25

def no_return():
    x = 10              # No return statement

print(no_return())       # None`,
      keypoints: [
        "return sends a value back to the caller — execution stops there",
        "A function with no return statement returns None automatically",
        "You can return multiple values as a tuple: return a, b",
      ],
    },
    medium: {
      explanation:
        "Functions can return different types based on conditions, return early to avoid deep nesting, or return callables for advanced patterns. Understanding None returns and using Optional type hints prevents bugs.",
      code: `from typing import Optional

def find_user(user_id: int) -> Optional[dict]:
    users = {1: {"name": "Alice"}, 2: {"name": "Bob"}}
    return users.get(user_id)   # Returns None if not found

user = find_user(3)
if user is None:
    print("User not found")

# Early return reduces nesting
def process(data):
    if not data:
        return []          # Early return
    if len(data) < 2:
        return data        # Early return
    return sorted(data)    # Main logic`,
      keypoints: [
        "Optional[type] signals a function may return None — document this explicitly",
        "Early returns reduce nesting — return as soon as you know the answer",
        "Always check for None when calling functions that might not find a result",
      ],
    },
    hard: {
      explanation:
        "Functions that return generators use yield instead of return, enabling lazy evaluation. Understanding the difference between return and yield, and how to use send() with generators, enables building efficient data pipelines.",
      code: `from typing import Generator

def fibonacci() -> Generator[int, None, None]:
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

# Only generates values on demand
fib = fibonacci()
print([next(fib) for _ in range(8)])
# [0, 1, 1, 2, 3, 5, 8, 13]

# Generator with send()
def accumulator():
    total = 0
    while True:
        value = yield total
        if value is None:
            break
        total += value`,
      keypoints: [
        "yield turns a function into a generator — values produced lazily on demand",
        "Generator[yield_type, send_type, return_type] annotates generator functions",
        "send(value) resumes a generator and passes a value to the yield expression",
      ],
    },
  },
  "Default Args": {
    easy: {
      explanation:
        "Default arguments let you define a value that a parameter uses when no argument is passed. This makes functions more flexible — callers can omit arguments they don't need to change.",
      code: `def greet(name, greeting="Hello", punctuation="!"):
    return f"{greeting}, {name}{punctuation}"

print(greet("Alice"))                  # Hello, Alice!
print(greet("Bob", "Hi"))             # Hi, Bob!
print(greet("Charlie", "Hey", "."))   # Hey, Charlie.

# Common use — mutable default pitfall
def add_item(item, lst=None):
    if lst is None:
        lst = []    # Safe default
    lst.append(item)
    return lst`,
      keypoints: [
        "Default values are used when the caller does not provide that argument",
        "Parameters with defaults must come after parameters without defaults",
        "Never use mutable objects (list, dict) as defaults — use None instead",
      ],
    },
    medium: {
      explanation:
        "Default argument values are evaluated once at function definition time, not each time the function is called. This causes the famous mutable default argument bug. Understanding this prevents subtle bugs in production code.",
      code: `# The mutable default bug
def broken_append(item, lst=[]):
    lst.append(item)
    return lst

print(broken_append(1))  # [1]
print(broken_append(2))  # [2] expected, got [1, 2]!
print(broken_append(3))  # [1, 2, 3] — shared!

# The fix
def safe_append(item, lst=None):
    if lst is None:
        lst = []
    lst.append(item)
    return lst

# Inspect defaults
print(broken_append.__defaults__)  # ([1, 2, 3],)`,
      keypoints: [
        "Default values are evaluated ONCE at definition — not on each call",
        "Mutable defaults (list, dict) are shared across all calls — use None",
        "Access current default values via function.__defaults__ tuple",
      ],
    },
    hard: {
      explanation:
        "functools.partial() creates new functions with some arguments pre-filled — a form of partial application. Combined with default arguments and keyword-only parameters, it enables powerful function factories.",
      code: `from functools import partial
import operator

# Partial application
double   = partial(operator.mul, 2)
triple   = partial(operator.mul, 3)

print(double(5))   # 10
print(triple(5))   # 15

# Factory pattern with defaults
def make_validator(min_val=0, max_val=100, allow_none=False):
    def validate(value):
        if allow_none and value is None:
            return True
        return min_val <= value <= max_val
    return validate

age_validator  = make_validator(0, 150)
pct_validator  = make_validator(0, 100)`,
      keypoints: [
        "functools.partial() pre-fills arguments to create specialised functions",
        "Closure-based factories use default args to configure returned functions",
        "Partial application is a form of currying — transforming multi-arg functions",
      ],
    },
  },

  Scope: {
    easy: {
      explanation:
        "Scope determines where a variable is accessible. Variables created inside a function are local — they only exist inside that function. Variables created outside functions are global and accessible everywhere.",
      code: `x = 10   # Global variable

def show():
    y = 20   # Local variable
    print(x)  # Can read global
    print(y)  # Local is fine

show()
print(x)   # 10
# print(y)  # NameError — y is local!

def modify():
    global x   # Declare we mean the global x
    x = 99

modify()
print(x)   # 99`,
      keypoints: [
        "Local variables exist only inside the function where they are created",
        "Functions can read global variables but cannot change them without global",
        "Use global sparingly — it makes code harder to understand and test",
      ],
    },
    medium: {
      explanation:
        "Python uses LEGB scope resolution: Local, Enclosing, Global, Built-in. The nonlocal keyword accesses variables from an enclosing function scope without making them global.",
      code: `# LEGB in action
x = "global"

def outer():
    x = "enclosing"

    def inner():
        nonlocal x        # Refers to enclosing x
        x = "modified"
        print(x)          # modified

    inner()
    print(x)              # modified

outer()
print(x)                  # global — unchanged

# Closure counter
def make_counter():
    count = 0
    def increment():
        nonlocal count
        count += 1
        return count
    return increment`,
      keypoints: [
        "LEGB: Python searches Local → Enclosing → Global → Built-in for names",
        "nonlocal accesses the nearest enclosing scope variable — not global",
        "Closures capture enclosing scope variables — used in factories and decorators",
      ],
    },
    hard: {
      explanation:
        "Python's scoping interacts with class bodies, comprehensions, and lambda in subtle ways. Class bodies do not create an enclosing scope for methods — a common source of confusion with closures inside classes.",
      code: `# Class bodies don't create enclosing scope
class MyClass:
    x = 10
    # This doesn't work as expected:
    # funcs = [lambda: x for x in range(3)]  # x is loop var

    # Correct — capture with default arg
    funcs = [lambda i=i: i for i in range(3)]

# Late binding in closures
def make_adders():
    return [lambda x, n=n: x + n for n in range(5)]

adders = make_adders()
print(adders[2](10))   # 12 — n captured correctly`,
      keypoints: [
        "Class bodies do not create an enclosing scope for nested functions",
        "Late binding: closures look up variables at call time, not definition time",
        "Fix late binding by capturing loop variable as default argument: lambda i=i: i",
      ],
    },
  },

  Lambda: {
    easy: {
      explanation:
        "A lambda is a small anonymous function defined in a single line. It can take any number of arguments but can only have one expression. Lambdas are useful for short, throwaway functions — especially as arguments to map(), filter(), and sorted().",
      code: `# Basic lambda
square = lambda x: x ** 2
print(square(5))    # 25

# Lambda with multiple args
add = lambda a, b: a + b
print(add(3, 4))    # 7

# Common use — sort by custom key
names = ["Charlie", "Alice", "Bob"]
names.sort(key=lambda name: len(name))
print(names)        # ['Bob', 'Alice', 'Charlie']`,
      keypoints: [
        "Lambda syntax: lambda parameters: expression",
        "Lambda can only contain one expression — no statements or multiple lines",
        "Most commonly used as a key function in sorted(), sort(), min(), max()",
      ],
    },
    medium: {
      explanation:
        "Lambdas are functions — they can be stored, passed, and returned. However, they have limitations: no statements, no assignments, no docstrings. Named functions are preferred when logic is complex or reused.",
      code: `from functools import reduce

nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# map + filter + reduce pipeline
result = reduce(
    lambda acc, x: acc + x,
    filter(lambda x: x % 2 == 0,
           map(lambda x: x ** 2, nums))
)
print(result)   # 220 (sum of even squares)

# Conditional expression in lambda
classify = lambda x: "pos" if x > 0 else "neg" if x < 0 else "zero"
print(classify(-5))   # neg`,
      keypoints: [
        "Lambda functions can be chained with map(), filter(), and reduce()",
        "Lambda supports conditional expressions: lambda x: a if cond else b",
        "Use named functions when logic exceeds one simple expression",
      ],
    },
    hard: {
      explanation:
        "Lambdas interact with closures and late binding in non-obvious ways. Understanding when to use lambda vs operator module functions and when list comprehensions are clearer is key to writing idiomatic Python.",
      code: `import operator
from functools import reduce

# operator module — faster than lambda
nums = [1, 2, 3, 4, 5]
product = reduce(operator.mul, nums)   # Faster than lambda x,y: x*y

# Late binding trap
funcs = [lambda: i for i in range(5)]
print([f() for f in funcs])   # [4,4,4,4,4] — all capture same i

# Fix with default arg
funcs = [lambda i=i: i for i in range(5)]
print([f() for f in funcs])   # [0,1,2,3,4]

# attrgetter/itemgetter
from operator import attrgetter, itemgetter
data = [{"name": "Bob", "age": 25}, {"name": "Alice", "age": 30}]
data.sort(key=itemgetter("age"))`,
      keypoints: [
        "operator.mul, operator.add are faster than equivalent lambdas",
        "Late binding: all lambdas in a loop share the same variable — fix with i=i",
        "operator.itemgetter() and attrgetter() replace simple key lambdas cleanly",
      ],
    },
  },

  "Base Case": {
    easy: {
      explanation:
        "A base case is the stopping condition in a recursive function. Without a base case, the function calls itself forever and causes a stack overflow. Every recursive function must have at least one base case that returns a value directly.",
      code: `# Countdown — base case is n == 0
def countdown(n):
    if n == 0:          # Base case
        print("Done!")
        return
    print(n)
    countdown(n - 1)    # Recursive case

countdown(5)
# 5, 4, 3, 2, 1, Done!

# Factorial — base case is n == 0
def factorial(n):
    if n == 0:          # Base case
        return 1
    return n * factorial(n - 1)

print(factorial(5))   # 120`,
      keypoints: [
        "The base case returns a value without making another recursive call",
        "Every recursive function needs a base case to stop infinite recursion",
        "Recursive case moves towards the base case with each call",
      ],
    },
    medium: {
      explanation:
        "Recursive functions can have multiple base cases. Identifying the correct base cases is the most important step in designing a recursive solution. Missing or incorrect base cases are the most common source of recursion bugs.",
      code: `# Multiple base cases
def binary_search(arr, target, low, high):
    if low > high:          # Base case 1: not found
        return -1
    mid = (low + high) // 2
    if arr[mid] == target:  # Base case 2: found
        return mid
    elif arr[mid] < target:
        return binary_search(arr, target, mid+1, high)
    else:
        return binary_search(arr, target, low, mid-1)

nums = [1, 3, 5, 7, 9, 11, 13]
print(binary_search(nums, 7, 0, len(nums)-1))  # 3`,
      keypoints: [
        "Multiple base cases handle different termination conditions",
        "Each base case should be a condition where the answer is known immediately",
        "Binary search has two base cases: found and not found",
      ],
    },
    hard: {
      explanation:
        "Tail recursion is a special case where the recursive call is the last operation. Python does not optimise tail calls, so deep recursion hits the call stack limit. Trampolining converts tail recursion to iteration.",
      code: `import sys
sys.setrecursionlimit(10000)

# Tail recursive factorial
def factorial_tail(n, accumulator=1):
    if n == 0:
        return accumulator          # Base case
    return factorial_tail(n-1, n * accumulator)

# Trampoline — avoids stack overflow
def trampoline(f):
    result = f
    while callable(result):
        result = result()
    return result

def fac_tramp(n, acc=1):
    if n == 0:
        return acc
    return lambda: fac_tramp(n-1, n*acc)

print(trampoline(fac_tramp(10)))   # 3628800`,
      keypoints: [
        "Tail recursion has the recursive call as the last operation — accumulator pattern",
        "Python does not optimise tail calls — deep recursion hits sys.getrecursionlimit()",
        "Trampolining converts recursion to iteration using thunks (zero-arg lambdas)",
      ],
    },
  },

  "Recursive Functions": {
    easy: {
      explanation:
        "A recursive function is one that calls itself to solve a smaller version of the same problem. Each call works on a simpler input until it reaches the base case. Recursion is natural for problems that have a self-similar structure.",
      code: `# Sum of a list recursively
def sum_list(lst):
    if len(lst) == 0:    # Base case
        return 0
    return lst[0] + sum_list(lst[1:])

print(sum_list([1, 2, 3, 4, 5]))  # 15

# Power function
def power(base, exp):
    if exp == 0:         # Base case
        return 1
    return base * power(base, exp - 1)

print(power(2, 8))       # 256`,
      keypoints: [
        "Recursive functions call themselves with a smaller or simpler input",
        "Each recursive call must move closer to the base case",
        "The call stack stores each function call until the base case is reached",
      ],
    },
    medium: {
      explanation:
        "Tree and graph traversal are natural recursive problems. Recursive solutions are often elegant but can be inefficient due to repeated computation. Understanding the call stack depth and recursion limits is important.",
      code: `# Flatten nested list recursively
def flatten(lst):
    result = []
    for item in lst:
        if isinstance(item, list):
            result.extend(flatten(item))
        else:
            result.append(item)
    return result

nested = [1, [2, [3, 4], 5], [6, 7]]
print(flatten(nested))   # [1, 2, 3, 4, 5, 6, 7]

# Tree traversal
def tree_sum(node):
    if node is None:
        return 0
    return node["val"] + tree_sum(node.get("left")) + tree_sum(node.get("right"))`,
      keypoints: [
        "Recursion excels at tree traversal, nested structures, and divide-and-conquer",
        "Python's default recursion limit is 1000 — use sys.setrecursionlimit() with care",
        "Recursive solutions often have an equivalent iterative version using a stack",
      ],
    },
    hard: {
      explanation:
        "Mutual recursion, continuation-passing style, and converting recursion to iteration are advanced patterns. Understanding stack frames and how Python manages the call stack helps debug and optimise recursive code.",
      code: `# Mutual recursion
def is_even(n):
    if n == 0: return True
    return is_odd(n - 1)

def is_odd(n):
    if n == 0: return False
    return is_even(n - 1)

# Convert to iterative using explicit stack
def flatten_iterative(lst):
    stack = [lst]
    result = []
    while stack:
        item = stack.pop()
        if isinstance(item, list):
            stack.extend(reversed(item))
        else:
            result.append(item)
    return result

print(flatten_iterative([1,[2,[3,4]],5]))`,
      keypoints: [
        "Mutual recursion: two functions call each other — both need base cases",
        "Any recursion can be converted to iteration using an explicit stack",
        "Continuation-passing style threads a callback through recursive calls",
      ],
    },
  },

  Memoization: {
    easy: {
      explanation:
        "Memoization is an optimisation technique that caches the results of expensive function calls. When the function is called again with the same arguments, it returns the cached result instead of recomputing. This dramatically speeds up recursive functions.",
      code: `# Without memoization — slow
def fib_slow(n):
    if n <= 1: return n
    return fib_slow(n-1) + fib_slow(n-2)

# With manual cache
cache = {}
def fib_fast(n):
    if n in cache: return cache[n]
    if n <= 1: return n
    cache[n] = fib_fast(n-1) + fib_fast(n-2)
    return cache[n]

# With functools.lru_cache
from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n <= 1: return n
    return fib(n-1) + fib(n-2)

print(fib(50))   # Instant!`,
      keypoints: [
        "Memoization stores results so the same computation is never repeated",
        "@lru_cache is Python's built-in memoization decorator",
        "maxsize=None means unlimited cache — use a number to limit memory",
      ],
    },
    medium: {
      explanation:
        "lru_cache implements a Least Recently Used cache with a size limit. cache_info() reports hits and misses. functools.cache (Python 3.9+) is a simpler unbounded cache. Memoization only works correctly for pure functions.",
      code: `from functools import lru_cache, cache
import time

@lru_cache(maxsize=128)
def expensive(n):
    time.sleep(0.01)   # Simulate work
    return n ** 2

# Check cache performance
for i in range(10):
    expensive(i % 5)    # Some repeated calls

info = expensive.cache_info()
print(f"Hits: {info.hits}, Misses: {info.misses}")

# Clear cache
expensive.cache_clear()

# Python 3.9+ simpler version
@cache
def fib(n):
    if n < 2: return n
    return fib(n-1) + fib(n-2)`,
      keypoints: [
        "cache_info() returns (hits, misses, maxsize, currsize)",
        "LRU evicts least recently used entries when cache is full",
        "functools.cache (3.9+) is equivalent to lru_cache(maxsize=None)",
      ],
    },
    hard: {
      explanation:
        "Custom memoization with TTL (time-to-live), thread-safe caches, and decorator factories give full control over caching behaviour. For distributed systems, Redis-backed caches extend memoization across processes.",
      code: `import time
from functools import wraps

def ttl_cache(seconds=60):
    def decorator(func):
        cache = {}
        @wraps(func)
        def wrapper(*args):
            now = time.time()
            if args in cache:
                result, ts = cache[args]
                if now - ts < seconds:
                    return result
            result = func(*args)
            cache[args] = (result, now)
            return result
        wrapper.cache = cache
        return wrapper
    return decorator

@ttl_cache(seconds=5)
def fetch_rate(currency):
    return 1.0   # Simulate API call`,
      keypoints: [
        "TTL cache expires entries after a time period — prevents stale data",
        "Thread-safe caches require locking — use threading.Lock for concurrent access",
        "Expose cache internals (wrapper.cache) for monitoring and manual invalidation",
      ],
    },
  },

  Iterators: {
    easy: {
      explanation:
        "An iterator is an object that returns items one at a time using next(). Every for loop uses iterators internally. You can manually create an iterator from any iterable using iter() and get items with next().",
      code: `# Every for loop uses iterators
fruits = ["apple", "banana", "cherry"]
it = iter(fruits)           # Create iterator

print(next(it))   # apple
print(next(it))   # banana
print(next(it))   # cherry
# next(it)        # StopIteration!

# for loop does this automatically
for fruit in fruits:
    print(fruit)

# Iterating a string
for char in iter("hello"):
    print(char)`,
      keypoints: [
        "iter() creates an iterator from any iterable (list, string, dict)",
        "next() returns the next item — raises StopIteration when exhausted",
        "for loops automatically call iter() and next() behind the scenes",
      ],
    },
    medium: {
      explanation:
        "Custom iterators implement __iter__ and __next__ methods. The iterator protocol powers all of Python's iteration — for loops, comprehensions, and unpacking all rely on it.",
      code: `class CountUp:
    def __init__(self, start, stop):
        self.current = start
        self.stop    = stop

    def __iter__(self):
        return self   # Iterator returns itself

    def __next__(self):
        if self.current >= self.stop:
            raise StopIteration
        value = self.current
        self.current += 1
        return value

for n in CountUp(1, 6):
    print(n)   # 1, 2, 3, 4, 5

# Infinite iterator
import itertools
counter = itertools.count(start=0, step=2)
print([next(counter) for _ in range(5)])  # [0,2,4,6,8]`,
      keypoints: [
        "__iter__ returns the iterator object itself (usually self)",
        "__next__ returns the next value or raises StopIteration",
        "itertools.count() creates an infinite iterator — always pair with islice or break",
      ],
    },
    hard: {
      explanation:
        "Iterator chaining, lazy pipelines, and coroutine-based iterators enable memory-efficient data processing. Understanding the difference between iterables, iterators, and generators is fundamental to writing efficient Python.",
      code: `import itertools

# Lazy pipeline — no intermediate lists
def process_pipeline(data):
    squared   = map(lambda x: x**2, data)
    filtered  = filter(lambda x: x > 10, squared)
    limited   = itertools.islice(filtered, 5)
    return list(limited)

result = process_pipeline(range(100))
print(result)   # [16, 25, 36, 49, 64]

# Tee — split one iterator into n independent iterators
a, b = itertools.tee(iter(range(5)), 2)
print(list(a))   # [0,1,2,3,4]
print(list(b))   # [0,1,2,3,4]`,
      keypoints: [
        "Lazy pipelines process data on demand — constant memory regardless of input size",
        "itertools.tee() duplicates an iterator — but both share the same buffer internally",
        "An iterable has __iter__; an iterator has both __iter__ and __next__",
      ],
    },
  },

  Generators: {
    easy: {
      explanation:
        "A generator is a special function that uses yield instead of return to produce values one at a time. Unlike regular functions, generators remember where they left off between calls. They are memory-efficient for large sequences.",
      code: `# Generator function
def count_up(start, stop):
    current = start
    while current < stop:
        yield current    # Pause and return value
        current += 1     # Resume here next time

gen = count_up(1, 6)
print(next(gen))   # 1
print(next(gen))   # 2

for n in count_up(1, 6):
    print(n)       # 1, 2, 3, 4, 5

# Generator expression
squares = (x**2 for x in range(10))
print(next(squares))   # 0`,
      keypoints: [
        "yield pauses the function and returns a value — resumes on next call",
        "Generators are memory-efficient — values computed one at a time",
        "Generator expressions use () instead of [] — lazy evaluation",
      ],
    },
    medium: {
      explanation:
        "Generators support send() to pass values back in, and can be chained with yield from. They are the foundation for coroutines and async/await. Understanding generator state makes them powerful for stateful pipelines.",
      code: `# yield from — delegate to sub-generator
def chain(*iterables):
    for it in iterables:
        yield from it

print(list(chain([1,2], [3,4], [5])))  # [1,2,3,4,5]

# send() — two-way communication
def accumulator():
    total = 0
    while True:
        value = yield total    # Yield total, receive value
        total += value

acc = accumulator()
next(acc)           # Prime the generator
print(acc.send(10)) # 10
print(acc.send(5))  # 15
print(acc.send(3))  # 18`,
      keypoints: [
        "yield from delegates to a sub-generator — flattens nested generators",
        "send(value) resumes the generator and sends a value to the yield expression",
        "Generators must be primed with next() before using send()",
      ],
    },
    hard: {
      explanation:
        "Generators underpin Python's async model — coroutines are enhanced generators. throw() and close() enable exception injection and cleanup. Understanding generator lifecycle (created, running, suspended, closed) is essential for async programming.",
      code: `def managed_resource():
    print("Acquiring resource")
    try:
        value = yield "ready"
        print(f"Processing: {value}")
        yield "done"
    except GeneratorExit:
        print("Cleanup on close")
    finally:
        print("Resource released")

gen = managed_resource()
print(next(gen))          # ready
print(gen.send("data"))   # done
gen.close()               # Triggers GeneratorExit`,
      keypoints: [
        "throw(exc) injects an exception at the yield point inside the generator",
        "close() throws GeneratorExit — use try/finally for cleanup",
        "Generators have 4 states: created, running, suspended, closed",
      ],
    },
  },
  Objects: {
    easy: {
      explanation:
        "An object is an instance of a class. When you create an object, it gets its own copy of the attributes defined in the class. Each object is independent — changing one object's data does not affect other objects of the same class.",
      code: `class Dog:
    def __init__(self, name, breed):
        self.name  = name
        self.breed = breed

    def bark(self):
        return f"{self.name} says Woof!"

# Create two independent objects
dog1 = Dog("Rex",   "Labrador")
dog2 = Dog("Bella", "Poodle")

print(dog1.bark())   # Rex says Woof!
print(dog2.bark())   # Bella says Woof!

dog1.name = "Max"    # Only affects dog1
print(dog1.name)     # Max
print(dog2.name)     # Bella`,
      keypoints: [
        "Each object is an independent instance with its own attribute values",
        "Changing one object's attributes does not affect other objects",
        "Access attributes and methods using dot notation: object.attribute",
      ],
    },
    medium: {
      explanation:
        "Objects in Python are dictionaries under the hood — attributes are stored in __dict__. Understanding object identity (id()), equality (==), and how Python manages object memory enables writing correct comparisons.",
      code: `class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __eq__(self, other):
        return self.x == other.x and self.y == other.y

    def __repr__(self):
        return f"Point({self.x}, {self.y})"

p1 = Point(1, 2)
p2 = Point(1, 2)
p3 = p1

print(p1 == p2)      # True — same values
print(p1 is p2)      # False — different objects
print(p1 is p3)      # True — same object
print(p1.__dict__)   # {'x': 1, 'y': 2}`,
      keypoints: [
        "__dict__ stores an object's attributes as a dictionary",
        "== checks equality (uses __eq__); is checks identity (same memory address)",
        "__repr__ defines the string representation used in debugging",
      ],
    },
    hard: {
      explanation:
        "Python objects use reference counting and cyclic garbage collection for memory management. __slots__ replaces __dict__ with a fixed-size array reducing memory by ~40%. Weak references allow referencing objects without preventing garbage collection.",
      code: `import weakref
import sys

class Node:
    __slots__ = ['value', 'next']   # No __dict__

    def __init__(self, value):
        self.value = value
        self.next  = None

n = Node(42)
print(sys.getsizeof(n))   # Smaller than dict-based

# Weak reference — doesn't prevent GC
class Cache:
    def __init__(self):
        self._store = weakref.WeakValueDictionary()

    def set(self, key, obj):
        self._store[key] = obj`,
      keypoints: [
        "__slots__ removes __dict__ and uses fixed slots — reduces memory significantly",
        "weakref.ref() references an object without incrementing its reference count",
        "WeakValueDictionary automatically removes entries when values are garbage collected",
      ],
    },
  },

  Constructors: {
    easy: {
      explanation:
        "A constructor is the __init__ method that runs automatically when you create a new object. It sets up the initial state of the object by assigning values to its attributes. Every class can have one __init__ method.",
      code: `class Person:
    def __init__(self, name, age):
        self.name = name
        self.age  = age

    def introduce(self):
        return f"I'm {self.name}, {self.age} years old."

# Constructor runs automatically
p = Person("Alice", 25)
print(p.introduce())   # I'm Alice, 25 years old.

# Default values in constructor
class Circle:
    def __init__(self, radius=1.0):
        self.radius = radius
        self.area   = 3.14159 * radius ** 2`,
      keypoints: [
        "__init__ runs automatically when you create an object with ClassName()",
        "self is the new object being created — use it to set attributes",
        "Constructor parameters can have default values just like regular functions",
      ],
    },
    medium: {
      explanation:
        "Python classes can have multiple ways to create objects using class methods as alternative constructors. __new__ is called before __init__ and actually creates the object — rarely needed but important for immutable types and singletons.",
      code: `from datetime import date

class Employee:
    def __init__(self, name, department, salary):
        self.name       = name
        self.department = department
        self.salary     = salary

    @classmethod
    def from_string(cls, emp_string):
        name, dept, salary = emp_string.split("-")
        return cls(name, dept, float(salary))

    @classmethod
    def intern(cls, name):
        return cls(name, "General", 0)

emp = Employee.from_string("Alice-Engineering-75000")
intern = Employee.intern("Bob")
print(emp.salary)    # 75000.0`,
      keypoints: [
        "@classmethod factory methods provide alternative ways to create objects",
        "cls refers to the class itself — calling cls() creates a new instance",
        "Multiple constructors via classmethods is more Pythonic than overloading",
      ],
    },
    hard: {
      explanation:
        "__new__ creates the instance before __init__ initialises it. Overriding __new__ is needed for immutable types (like subclassing int or str), implementing singletons, and metaclass-based object creation.",
      code: `class Singleton:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

    def __init__(self, value):
        self.value = value

a = Singleton(1)
b = Singleton(2)
print(a is b)     # True — same instance
print(a.value)    # 2 — __init__ ran again

# Subclassing immutable type
class PositiveInt(int):
    def __new__(cls, value):
        if value <= 0:
            raise ValueError("Must be positive")
        return super().__new__(cls, value)`,
      keypoints: [
        "__new__ creates the instance; __init__ initialises it — __new__ runs first",
        "Override __new__ for immutable types (int, str, tuple) since __init__ can't change them",
        "Singleton pattern uses __new__ to return the same instance every time",
      ],
    },
  },

  Inheritance: {
    easy: {
      explanation:
        "Inheritance lets a class take on the attributes and methods of another class. The child class inherits everything from the parent and can add new features or override existing ones. This avoids repeating code across similar classes.",
      code: `class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return "..."

    def __str__(self):
        return f"{self.name} ({type(self).__name__})"

class Dog(Animal):
    def speak(self):            # Override parent method
        return "Woof!"

class Cat(Animal):
    def speak(self):
        return "Meow!"

dog = Dog("Rex")
cat = Cat("Whiskers")
print(dog.speak())   # Woof!
print(cat)           # Whiskers (Cat)`,
      keypoints: [
        "Child class inherits all methods and attributes from the parent class",
        "Override a method by defining it with the same name in the child class",
        "Use isinstance(obj, Class) to check if an object is an instance of a class",
      ],
    },
    medium: {
      explanation:
        "super() calls parent class methods — essential in __init__ to ensure the parent is properly initialised. Python supports multiple inheritance with Method Resolution Order (MRO) determining which method is called.",
      code: `class Vehicle:
    def __init__(self, make, model):
        self.make  = make
        self.model = model

    def info(self):
        return f"{self.make} {self.model}"

class ElectricVehicle(Vehicle):
    def __init__(self, make, model, range_km):
        super().__init__(make, model)   # Call parent __init__
        self.range_km = range_km

    def info(self):
        return f"{super().info()} — {self.range_km}km range"

ev = ElectricVehicle("Tesla", "Model 3", 580)
print(ev.info())

# Check MRO
print(ElectricVehicle.__mro__)`,
      keypoints: [
        "super().__init__() calls the parent constructor — always do this in child __init__",
        "MRO (Method Resolution Order) defines which method is called in inheritance chains",
        "super() uses MRO to find the next class in the hierarchy",
      ],
    },
    hard: {
      explanation:
        "Multiple inheritance with mixins is a powerful pattern for composing behaviour. Understanding the C3 linearisation algorithm that produces MRO prevents diamond inheritance problems.",
      code: `class LogMixin:
    def log(self, message):
        print(f"[{type(self).__name__}] {message}")

class ValidateMixin:
    def validate(self, value):
        if value < 0:
            raise ValueError(f"Invalid: {value}")
        return value

class BankAccount(LogMixin, ValidateMixin):
    def __init__(self, balance=0):
        self.balance = balance

    def deposit(self, amount):
        amount = self.validate(amount)
        self.balance += amount
        self.log(f"Deposited {amount}")

acc = BankAccount()
acc.deposit(100)
print(BankAccount.__mro__)`,
      keypoints: [
        "Mixins add behaviour to classes through multiple inheritance without deep hierarchy",
        "C3 linearisation ensures consistent MRO — no ambiguity in diamond inheritance",
        "Keep mixins focused on one concern — logging, validation, serialisation",
      ],
    },
  },

  Polymorphism: {
    easy: {
      explanation:
        "Polymorphism means different objects can be used in the same way even if they are different types. In Python, if two objects have the same method name, you can call that method on either without knowing which type you have.",
      code: `class Dog:
    def speak(self):
        return "Woof!"

class Cat:
    def speak(self):
        return "Meow!"

class Duck:
    def speak(self):
        return "Quack!"

# Polymorphism — same interface, different behaviour
animals = [Dog(), Cat(), Duck()]
for animal in animals:
    print(animal.speak())   # Woof! Meow! Quack!`,
      keypoints: [
        "Polymorphism: different objects respond to the same method call differently",
        "Python uses duck typing — if it has the method, you can call it",
        "No need for explicit interface declarations — just implement the method",
      ],
    },
    medium: {
      explanation:
        "Python's duck typing means polymorphism works without inheritance. The built-in functions len(), str(), and operators like + work polymorphically through dunder methods. Abstract base classes formalise interfaces.",
      code: `from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self) -> float: ...

    @abstractmethod
    def perimeter(self) -> float: ...

    def describe(self):
        return f"Area: {self.area():.2f}, Perimeter: {self.perimeter():.2f}"

class Circle(Shape):
    def __init__(self, r): self.r = r
    def area(self):        return 3.14159 * self.r**2
    def perimeter(self):   return 2 * 3.14159 * self.r

class Rectangle(Shape):
    def __init__(self, w, h): self.w, self.h = w, h
    def area(self):           return self.w * self.h
    def perimeter(self):      return 2 * (self.w + self.h)

shapes = [Circle(5), Rectangle(4, 6)]
for s in shapes:
    print(s.describe())`,
      keypoints: [
        "Abstract base classes (ABC) enforce that subclasses implement required methods",
        "Duck typing: Python checks for method existence at call time, not declaration",
        "Dunder methods (__len__, __add__) enable polymorphism with built-in operators",
      ],
    },
    hard: {
      explanation:
        "Protocol classes (typing.Protocol) enable structural subtyping — duck typing with static type checking. This allows defining interfaces without inheritance, and type checkers like mypy verify compliance at analysis time.",
      code: `from typing import Protocol, runtime_checkable

@runtime_checkable
class Drawable(Protocol):
    def draw(self) -> str: ...
    def resize(self, factor: float) -> None: ...

class Circle:
    def __init__(self, r: float): self.r = r
    def draw(self) -> str:        return f"Circle(r={self.r})"
    def resize(self, f: float):   self.r *= f

class Square:
    def __init__(self, s: float): self.s = s
    def draw(self) -> str:        return f"Square(s={self.s})"
    def resize(self, f: float):   self.s *= f

def render(shape: Drawable) -> None:
    print(shape.draw())

render(Circle(5))    # Works — structural match
print(isinstance(Circle(1), Drawable))   # True`,
      keypoints: [
        "Protocol defines a structural interface — no inheritance required",
        "@runtime_checkable enables isinstance() checks against protocols",
        "mypy verifies Protocol compliance statically — catches missing methods early",
      ],
    },
  },

  Encapsulation: {
    easy: {
      explanation:
        "Encapsulation means keeping an object's internal data private and only exposing what is needed. In Python, a single underscore prefix (_name) signals private by convention, and double underscore (__name) triggers name mangling for stronger privacy.",
      code: `class BankAccount:
    def __init__(self, owner, balance):
        self.owner    = owner      # Public
        self._balance = balance    # Private by convention

    def deposit(self, amount):
        if amount > 0:
            self._balance += amount

    def get_balance(self):
        return self._balance

acc = BankAccount("Alice", 1000)
acc.deposit(500)
print(acc.get_balance())   # 1500
# acc._balance = -999      # Possible but rude!`,
      keypoints: [
        "Single underscore _name signals private — convention, not enforced",
        "Double underscore __name triggers name mangling — harder to access from outside",
        "Provide public methods to interact with private data safely",
      ],
    },
    medium: {
      explanation:
        "Python's @property decorator creates managed attributes — computed getters, validated setters, and deletion handlers. This is the Pythonic way to add validation and computed values without changing the public API.",
      code: `class Temperature:
    def __init__(self, celsius=0):
        self._celsius = celsius

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("Below absolute zero!")
        self._celsius = value

    @property
    def fahrenheit(self):
        return self._celsius * 9/5 + 32

t = Temperature(25)
print(t.fahrenheit)    # 77.0
t.celsius = 100
print(t.fahrenheit)    # 212.0
# t.celsius = -300     # ValueError!`,
      keypoints: [
        "@property creates a getter — access like an attribute, not a method call",
        "@attribute.setter adds validation when the attribute is assigned",
        "Computed properties (@property with no setter) are read-only",
      ],
    },
    hard: {
      explanation:
        "Descriptors implement the full attribute access protocol (__get__, __set__, __delete__). They are the mechanism behind @property, @classmethod, and @staticmethod. Custom descriptors enable reusable validation across multiple classes.",
      code: `class Validated:
    def __set_name__(self, owner, name):
        self.name = name
        self.private = f"_{name}"

    def __get__(self, obj, objtype=None):
        if obj is None: return self
        return getattr(obj, self.private, None)

    def __set__(self, obj, value):
        self.validate(value)
        setattr(obj, self.private, value)

    def validate(self, value):
        pass  # Override in subclass

class PositiveNumber(Validated):
    def validate(self, value):
        if value <= 0:
            raise ValueError(f"{self.name} must be positive")

class Rectangle:
    width  = PositiveNumber()
    height = PositiveNumber()

    def __init__(self, w, h):
        self.width  = w
        self.height = h`,
      keypoints: [
        "Descriptors implement __get__/__set__/__delete__ for reusable attribute logic",
        "__set_name__ is called at class creation — receives the attribute name automatically",
        "@property is syntactic sugar for a descriptor — they use the same protocol",
      ],
    },
  },

  Modules: {
    easy: {
      explanation:
        "A module is a Python file containing functions, classes, and variables that you can import and use in other files. Python comes with many built-in modules like math, random, and os. You can also create your own modules.",
      code: `# Using built-in modules
import math
import random

print(math.pi)           # 3.14159...
print(math.sqrt(16))     # 4.0
print(math.floor(3.7))   # 3

# Random numbers
print(random.randint(1, 10))
print(random.choice(["a", "b", "c"]))

# Import specific items
from math import pi, sqrt
print(pi)       # 3.14159...
print(sqrt(25)) # 5.0`,
      keypoints: [
        "import module loads a module — access items with module.item",
        "from module import name imports specific items directly",
        "Python's standard library has modules for almost everything",
      ],
    },
    medium: {
      explanation:
        "Modules have a __name__ attribute — when run directly it is '__main__', when imported it is the module name. This enables the if __name__ == '__main__' pattern for code that should only run when the file is executed directly.",
      code: `# mymodule.py
def add(a, b):
    return a + b

def multiply(a, b):
    return a * b

# Only runs when executed directly, not when imported
if __name__ == "__main__":
    print("Running tests...")
    print(add(2, 3))        # 5
    print(multiply(3, 4))   # 12

# In another file:
# import mymodule
# mymodule.add(1, 2)   — works, tests don't run

# Reload a module (useful in development)
import importlib
import mymodule
importlib.reload(mymodule)`,
      keypoints: [
        "__name__ == '__main__' is True only when the file is run directly",
        "Use this pattern to add tests or demo code that won't run on import",
        "importlib.reload() re-imports a module — useful during development",
      ],
    },
    hard: {
      explanation:
        "Python's import system uses sys.path to find modules. Custom importers, namespace packages, and __init__.py files give full control over how modules are discovered and loaded. Understanding import caching in sys.modules prevents redundant loading.",
      code: `import sys
import importlib.util

# Check import path
print(sys.path)

# Check if module is cached
print("math" in sys.modules)   # True after import math

# Dynamic import
def load_module(path, name):
    spec   = importlib.util.spec_from_file_location(name, path)
    module = importlib.util.module_from_spec(spec)
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module

# Lazy import pattern
def get_numpy():
    import numpy as np   # Only imported when needed
    return np`,
      keypoints: [
        "sys.modules caches imported modules — import only runs once per process",
        "sys.path lists directories Python searches for modules",
        "importlib.util enables dynamic loading of modules from file paths",
      ],
    },
  },
  Packages: {
    easy: {
      explanation:
        "A package is a folder containing multiple Python modules. It must contain an __init__.py file to be recognised as a package. Packages help organise large projects by grouping related modules together.",
      code: `# Package structure:
# mypackage/
#   __init__.py
#   math_utils.py
#   string_utils.py

# math_utils.py
def add(a, b):
    return a + b

# __init__.py
from .math_utils import add

# Using the package
import mypackage
print(mypackage.add(2, 3))   # 5

# Or import directly
from mypackage.math_utils import add
print(add(2, 3))   # 5`,
      keypoints: [
        "A package is a directory with an __init__.py file inside",
        "__init__.py controls what is available when you import the package",
        "Use from .module import name for relative imports within a package",
      ],
    },
    medium: {
      explanation:
        "Modern Python packages use pyproject.toml for configuration. Namespace packages (no __init__.py) allow splitting a package across multiple directories. Understanding absolute vs relative imports prevents common import errors.",
      code: `# Relative imports within a package
# mypackage/utils.py
from .helpers import format_date      # Relative
from mypackage.models import User     # Absolute

# __init__.py — control public API
from .core import Engine
from .utils import helper
__all__ = ["Engine", "helper"]   # Public API

# pyproject.toml (modern packaging)
"""
[build-system]
requires = ["setuptools"]

[project]
name = "mypackage"
version = "1.0.0"
dependencies = ["requests>=2.0"]
"""`,
      keypoints: [
        "Relative imports (.module) work within a package; absolute imports use full path",
        "__all__ defines the public API — controls what from package import * exports",
        "pyproject.toml is the modern standard for package configuration",
      ],
    },
    hard: {
      explanation:
        "Plugin systems, entry points, and dynamic package loading enable extensible applications. importlib.metadata reads package metadata, and pkg_resources or importlib.resources accesses package data files.",
      code: `import importlib.metadata
import importlib.resources

# Read installed package metadata
try:
    version = importlib.metadata.version("requests")
    print(f"requests version: {version}")
except importlib.metadata.PackageNotFoundError:
    print("requests not installed")

# Access package data files (Python 3.9+)
# Assuming mypackage has a data/ folder
# with importlib.resources.files("mypackage") as pkg:
#     data = (pkg / "data" / "config.json").read_text()

# List entry points (plugin discovery)
eps = importlib.metadata.entry_points()
print(dict(eps))`,
      keypoints: [
        "importlib.metadata reads installed package versions and entry points",
        "importlib.resources accesses data files bundled inside packages",
        "Entry points enable plugin architectures — packages register hooks by name",
      ],
    },
  },

  "File Read": {
    easy: {
      explanation:
        "Reading files lets your program load data from disk. Use open() with 'r' mode to read a file. Always use a with statement — it automatically closes the file when you are done, even if an error occurs.",
      code: `# Read entire file
with open("data.txt", "r") as f:
    content = f.read()
    print(content)

# Read line by line
with open("data.txt", "r") as f:
    for line in f:
        print(line.strip())   # strip removes newline

# Read all lines into a list
with open("data.txt", "r") as f:
    lines = f.readlines()
    print(lines[0])   # First line`,
      keypoints: [
        "open(filename, 'r') opens a file for reading — 'r' is the default mode",
        "Always use with open() as f: — it closes the file automatically",
        "read() returns the whole file; readlines() returns a list of lines",
      ],
    },
    medium: {
      explanation:
        "Large files should be read line by line to avoid loading the entire file into memory. File encoding matters — always specify encoding='utf-8' for text files. pathlib.Path provides a modern, readable alternative to os.path.",
      code: `from pathlib import Path

# pathlib — modern file handling
path = Path("data.txt")

if path.exists():
    content = path.read_text(encoding="utf-8")
    lines   = path.read_text().splitlines()

# Memory-efficient: read large files line by line
def count_lines(filepath):
    count = 0
    with open(filepath, encoding="utf-8") as f:
        for _ in f:
            count += 1
    return count

# Read CSV
import csv
with open("data.csv", newline="") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row["name"], row["age"])`,
      keypoints: [
        "Always specify encoding='utf-8' to handle international characters correctly",
        "Iterate over the file object directly for memory-efficient line-by-line reading",
        "pathlib.Path is the modern way to handle file paths — cleaner than os.path",
      ],
    },
    hard: {
      explanation:
        "Memory-mapped files (mmap) allow treating file contents as a byte array in memory — ideal for large binary files. Binary mode ('rb') reads raw bytes and is required for images, PDFs, and other non-text formats.",
      code: `import mmap
import json
from pathlib import Path

# Memory-mapped file — efficient random access
with open("large_file.bin", "rb") as f:
    with mmap.mmap(f.fileno(), 0, access=mmap.ACCESS_READ) as mm:
        header = mm[:4]    # Read first 4 bytes
        mm.seek(100)
        chunk  = mm.read(50)

# Read JSON efficiently
def load_json(path: Path) -> dict:
    with path.open(encoding="utf-8") as f:
        return json.load(f)

# Generator for large line-based files
def read_chunks(path, chunk_size=1024):
    with open(path, "rb") as f:
        while chunk := f.read(chunk_size):
            yield chunk`,
      keypoints: [
        "mmap maps a file into memory — supports random access without loading fully",
        "Binary mode 'rb' reads raw bytes — required for non-text files",
        "Generator-based chunked reading processes large files with constant memory",
      ],
    },
  },

  "File Write": {
    easy: {
      explanation:
        "Writing files lets your program save data to disk. Use open() with 'w' mode to write (overwrites existing content) or 'a' mode to append (adds to existing content). Always use a with statement for safe file handling.",
      code: `# Write to file — overwrites existing content
with open("output.txt", "w") as f:
    f.write("Hello, World!\\n")
    f.write("Second line\\n")

# Append to file — adds to existing content
with open("output.txt", "a") as f:
    f.write("Third line\\n")

# Write multiple lines at once
lines = ["line 1\\n", "line 2\\n", "line 3\\n"]
with open("output.txt", "w") as f:
    f.writelines(lines)`,
      keypoints: [
        "'w' mode overwrites the file — creates it if it does not exist",
        "'a' mode appends to the file — creates it if it does not exist",
        "writelines() writes a list of strings — does not add newlines automatically",
      ],
    },
    medium: {
      explanation:
        "Writing structured data formats like CSV and JSON requires dedicated modules. Atomic writes prevent data corruption — write to a temporary file then rename. pathlib.Path.write_text() is a convenient one-liner for simple writes.",
      code: `import csv
import json
from pathlib import Path
import tempfile
import os

# Write CSV
with open("data.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=["name", "age"])
    writer.writeheader()
    writer.writerows([{"name": "Alice", "age": 25}])

# Write JSON
data = {"users": [{"name": "Alice", "age": 25}]}
Path("data.json").write_text(json.dumps(data, indent=2))

# Atomic write — prevents corruption
def atomic_write(path, content):
    tmp = path + ".tmp"
    with open(tmp, "w") as f:
        f.write(content)
    os.replace(tmp, path)   # Atomic on most OS`,
      keypoints: [
        "csv.DictWriter writes dictionaries as CSV rows with a header",
        "json.dumps(data, indent=2) produces readable formatted JSON",
        "Atomic write: write to temp file then rename — prevents partial writes",
      ],
    },
    hard: {
      explanation:
        "High-performance file writing uses buffered I/O, binary formats, and async writes. Understanding file system semantics — fsync, buffering, and write-ahead logging — is critical for data integrity in production systems.",
      code: `import io
import struct
import asyncio
import aiofiles

# Binary write — struct for fixed-format data
with open("data.bin", "wb") as f:
    for i in range(1000):
        f.write(struct.pack(">I", i))   # Big-endian uint32

# Buffered write — explicit flush control
with io.BufferedWriter(io.FileIO("out.bin", "w"), 
                        buffer_size=65536) as f:
    f.write(b"data" * 10000)
    f.flush()   # Flush buffer to OS

# Async file write
async def write_async(path, content):
    async with aiofiles.open(path, "w") as f:
        await f.write(content)`,
      keypoints: [
        "struct.pack() writes binary data in a specific format — efficient for numeric data",
        "BufferedWriter controls buffer size — larger buffers mean fewer system calls",
        "aiofiles provides async file I/O — prevents blocking the event loop",
      ],
    },
  },

  "Try/Except": {
    easy: {
      explanation:
        "Try/except blocks let you handle errors gracefully. Code that might fail goes in the try block. If an error occurs, Python jumps to the except block instead of crashing. You can handle different error types with multiple except blocks.",
      code: `# Basic try/except
try:
    number = int(input("Enter a number: "))
    result = 10 / number
    print(f"Result: {result}")
except ValueError:
    print("That is not a valid number!")
except ZeroDivisionError:
    print("Cannot divide by zero!")

# Catch any exception
try:
    risky_operation()
except Exception as e:
    print(f"Something went wrong: {e}")`,
      keypoints: [
        "try contains code that might raise an exception",
        "except ExceptionType catches a specific error type",
        "Use except Exception as e: to catch any error and access the message",
      ],
    },
    medium: {
      explanation:
        "The else clause runs when no exception occurs. finally always runs — perfect for cleanup. Raising exceptions with raise communicates errors to callers. Re-raising with raise (no argument) preserves the original traceback.",
      code: `def read_config(path):
    try:
        with open(path) as f:
            return json.load(f)
    except FileNotFoundError:
        raise FileNotFoundError(f"Config not found: {path}")
    except json.JSONDecodeError as e:
        raise ValueError(f"Invalid JSON in {path}") from e

# try/except/else/finally
try:
    result = risky()
except ValueError as e:
    print(f"Value error: {e}")
else:
    print(f"Success: {result}")   # Runs if no exception
finally:
    print("Always runs")          # Cleanup goes here`,
      keypoints: [
        "else runs only when the try block completes without any exception",
        "finally always runs — use it for cleanup like closing files or connections",
        "raise X from Y chains exceptions — Y is stored in __cause__ for debugging",
      ],
    },
    hard: {
      explanation:
        "Exception groups (Python 3.11+) handle multiple concurrent exceptions from async tasks. Context suppression with contextlib.suppress() and ExitStack enable clean multi-resource management with fine-grained exception control.",
      code: `from contextlib import suppress, ExitStack
import contextlib

# Suppress specific exceptions cleanly
with suppress(FileNotFoundError):
    os.remove("temp.txt")   # No error if file missing

# ExitStack — manage multiple context managers
with ExitStack() as stack:
    files = [stack.enter_context(open(f)) for f in file_list]
    process(files)   # All files closed on exit

# ExceptionGroup (Python 3.11+)
try:
    raise ExceptionGroup("errors", [
        ValueError("bad value"),
        TypeError("bad type")
    ])
except* ValueError as eg:
    print(f"Value errors: {eg.exceptions}")
except* TypeError as eg:
    print(f"Type errors: {eg.exceptions}")`,
      keypoints: [
        "contextlib.suppress() is cleaner than try/except for expected, ignorable errors",
        "ExitStack dynamically manages multiple context managers — useful for variable resource lists",
        "except* handles specific types within an ExceptionGroup — Python 3.11+",
      ],
    },
  },
  "Context Managers": {
    easy: {
      explanation:
        "A context manager sets up and tears down resources automatically. The with statement is how you use them. The most common example is opening files — the file is automatically closed when the with block ends, even if an error occurs.",
      code: `# File context manager
with open("data.txt", "r") as f:
    content = f.read()
# File is automatically closed here

# Multiple context managers
with open("input.txt") as inp, open("output.txt", "w") as out:
    out.write(inp.read())

# Timer context manager example
import time

class Timer:
    def __enter__(self):
        self.start = time.time()
        return self

    def __exit__(self, *args):
        self.elapsed = time.time() - self.start

with Timer() as t:
    sum(range(1000000))
print(f"Took {t.elapsed:.3f}s")`,
      keypoints: [
        "with statement guarantees cleanup even if an exception occurs",
        "__enter__ runs at the start of the with block and returns the resource",
        "__exit__ runs when the with block ends — handles cleanup",
      ],
    },
    medium: {
      explanation:
        "contextlib.contextmanager turns a generator function into a context manager using yield. This is much simpler than writing a full class with __enter__ and __exit__. contextlib.suppress() silences specific exceptions cleanly.",
      code: `from contextlib import contextmanager, suppress
import os

@contextmanager
def managed_temp_file(path):
    try:
        yield path              # Setup — provide the resource
    finally:
        with suppress(FileNotFoundError):
            os.remove(path)     # Teardown — always runs

with managed_temp_file("temp.txt") as path:
    with open(path, "w") as f:
        f.write("temporary data")
# temp.txt deleted automatically

# Suppress expected errors
with suppress(KeyError):
    value = my_dict["missing_key"]   # No crash`,
      keypoints: [
        "@contextmanager converts a generator into a context manager — yield splits setup/teardown",
        "Code before yield is setup (__enter__); code after yield is teardown (__exit__)",
        "contextlib.suppress() is cleaner than try/except for ignorable errors",
      ],
    },
    hard: {
      explanation:
        "Reentrant context managers, async context managers, and ExitStack enable advanced resource management patterns. Understanding __exit__ return value (True suppresses exceptions) gives full control over error handling.",
      code: `from contextlib import AsyncExitStack, asynccontextmanager
import asyncio

@asynccontextmanager
async def async_managed_connection(url):
    conn = await create_connection(url)
    try:
        yield conn
    finally:
        await conn.close()

# AsyncExitStack — dynamic async resource management
async def process_multiple(urls):
    async with AsyncExitStack() as stack:
        conns = [
            await stack.enter_async_context(
                async_managed_connection(url)
            )
            for url in urls
        ]
        await asyncio.gather(*[fetch(c) for c in conns])`,
      keypoints: [
        "__exit__ returning True suppresses the exception — use carefully",
        "@asynccontextmanager works like @contextmanager but for async code",
        "AsyncExitStack manages variable numbers of async context managers",
      ],
    },
  },

  Math: {
    easy: {
      explanation:
        "Python's math module provides mathematical functions and constants. It includes trigonometry, logarithms, rounding, and constants like pi and e. For basic arithmetic Python's built-in operators are sufficient, but math adds precision and advanced functions.",
      code: `import math

# Constants
print(math.pi)        # 3.14159...
print(math.e)         # 2.71828...

# Common functions
print(math.sqrt(16))  # 4.0
print(math.floor(3.7)) # 3
print(math.ceil(3.2))  # 4
print(math.abs(-5))    # Use abs() built-in instead
print(abs(-5))         # 5

# Power and log
print(math.pow(2, 10))     # 1024.0
print(math.log(100, 10))   # 2.0
print(math.log2(8))        # 3.0`,
      keypoints: [
        "math.sqrt(), math.floor(), math.ceil() are common rounding and root functions",
        "math.pi and math.e are high-precision constants",
        "math.log(x, base) computes logarithm — math.log2() and math.log10() are shortcuts",
      ],
    },
    medium: {
      explanation:
        "The math module handles real numbers precisely. For complex numbers use the cmath module. math.isclose() safely compares floats, avoiding the classic floating-point equality pitfall.",
      code: `import math

# Safe float comparison
a = 0.1 + 0.2
print(a == 0.3)                  # False! Floating point
print(math.isclose(a, 0.3))      # True

# Trigonometry (radians)
angle = math.radians(45)
print(math.sin(angle))            # 0.7071...
print(math.cos(angle))            # 0.7071...

# Combinations and permutations
print(math.comb(10, 3))           # 120
print(math.perm(10, 3))           # 720

# Greatest common divisor
print(math.gcd(48, 18))           # 6
print(math.lcm(12, 18))           # 36`,
      keypoints: [
        "Never use == to compare floats — use math.isclose(a, b) instead",
        "Trig functions use radians — convert with math.radians() and math.degrees()",
        "math.comb(n,r) counts combinations; math.perm(n,r) counts permutations",
      ],
    },
    hard: {
      explanation:
        "For numerical computing at scale, the math module is supplemented by numpy for vectorised operations. Python's decimal module provides arbitrary precision arithmetic for financial calculations where float rounding is unacceptable.",
      code: `from decimal import Decimal, getcontext
import math
import statistics

# Arbitrary precision decimal
getcontext().prec = 50
result = Decimal("0.1") + Decimal("0.2")
print(result)    # 0.3 (exact)

# Statistics module
data = [2, 4, 4, 4, 5, 5, 7, 9]
print(statistics.mean(data))      # 5.0
print(statistics.stdev(data))     # 2.0
print(statistics.median(data))    # 4.5

# math.fsum — exact floating point sum
nums = [0.1] * 10
print(sum(nums))          # 0.9999999... (imprecise)
print(math.fsum(nums))    # 1.0 (exact)`,
      keypoints: [
        "Decimal provides exact decimal arithmetic — essential for financial calculations",
        "math.fsum() compensates for floating-point errors in summing sequences",
        "statistics module provides mean, median, stdev, variance for data analysis",
      ],
    },
  },

  OS: {
    easy: {
      explanation:
        "The os module provides functions for interacting with the operating system — working with files, directories, and environment variables. It makes your code work across Windows, Mac, and Linux without changes.",
      code: `import os

# Current directory
print(os.getcwd())              # /home/user/project

# List directory contents
files = os.listdir(".")
print(files)

# Create and remove directories
os.mkdir("new_folder")
os.rmdir("new_folder")

# Check if path exists
print(os.path.exists("data.txt"))   # True/False
print(os.path.isfile("data.txt"))   # Is it a file?
print(os.path.isdir("myfolder"))    # Is it a directory?

# Environment variables
home = os.environ.get("HOME", "/tmp")`,
      keypoints: [
        "os.getcwd() returns current working directory; os.chdir() changes it",
        "os.path.exists(), isfile(), isdir() check path types safely",
        "os.environ.get(key, default) reads environment variables safely",
      ],
    },
    medium: {
      explanation:
        "os.walk() recursively traverses directory trees. os.path.join() builds cross-platform paths. pathlib.Path (modern alternative) provides an object-oriented interface that is cleaner than os.path string operations.",
      code: `import os
from pathlib import Path

# Walk directory tree
for root, dirs, files in os.walk("myproject"):
    level = root.replace("myproject", "").count(os.sep)
    indent = " " * 2 * level
    print(f"{indent}{os.path.basename(root)}/")
    for file in files:
        print(f"{indent}  {file}")

# Cross-platform path building
path = os.path.join("data", "2026", "report.csv")

# pathlib equivalent — cleaner
p = Path("data") / "2026" / "report.csv"
print(p.stem)       # report
print(p.suffix)     # .csv
print(p.parent)     # data/2026`,
      keypoints: [
        "os.walk() yields (root, dirs, files) for each directory recursively",
        "os.path.join() builds paths correctly for the current OS",
        "pathlib.Path / operator joins paths — cleaner than os.path.join()",
      ],
    },
    hard: {
      explanation:
        "os.fork(), subprocess, and os.exec* enable process management. File descriptors, pipes, and signals provide low-level IPC. Understanding process groups and sessions is essential for building daemons and process supervisors.",
      code: `import os
import subprocess

# Run subprocess safely
result = subprocess.run(
    ["python3", "--version"],
    capture_output=True,
    text=True,
    timeout=10
)
print(result.stdout)   # Python 3.x.x

# Environment manipulation
env = os.environ.copy()
env["MY_VAR"] = "hello"
result = subprocess.run(["env"], env=env,
                        capture_output=True, text=True)

# File descriptor operations
r_fd, w_fd = os.pipe()
os.write(w_fd, b"hello pipe")
data = os.read(r_fd, 1024)
os.close(r_fd); os.close(w_fd)`,
      keypoints: [
        "subprocess.run() is the modern way to run external commands safely",
        "capture_output=True captures stdout and stderr; text=True decodes to string",
        "os.pipe() creates a unidirectional byte channel between processes",
      ],
    },
  },

  Sys: {
    easy: {
      explanation:
        "The sys module provides access to Python interpreter settings and runtime information. The most common uses are reading command-line arguments with sys.argv, controlling output with sys.stdout, and exiting with sys.exit().",
      code: `import sys

# Command-line arguments
# Running: python script.py hello world
print(sys.argv)        # ['script.py', 'hello', 'world']
print(sys.argv[0])     # script.py (script name)
print(sys.argv[1])     # hello

# Python version
print(sys.version)
print(sys.version_info.major)   # 3

# Exit program
if len(sys.argv) < 2:
    print("Usage: script.py <name>")
    sys.exit(1)   # Exit with error code`,
      keypoints: [
        "sys.argv is a list — argv[0] is the script name, argv[1:] are the arguments",
        "sys.version_info gives structured version info — check sys.version_info >= (3, 10)",
        "sys.exit(0) exits successfully; sys.exit(1) signals an error",
      ],
    },
    medium: {
      explanation:
        "sys.path controls where Python looks for modules. sys.stdin/stdout/stderr are file objects for standard I/O. sys.getrecursionlimit() and sys.setrecursionlimit() manage the call stack depth.",
      code: `import sys

# Module search path
print(sys.path)
sys.path.insert(0, "/my/custom/modules")

# Redirect stdout
import io
buffer = io.StringIO()
old_stdout = sys.stdout
sys.stdout = buffer

print("captured output")

sys.stdout = old_stdout
print(buffer.getvalue())   # captured output

# Recursion limit
print(sys.getrecursionlimit())    # 1000
sys.setrecursionlimit(5000)

# Object size
print(sys.getsizeof([1,2,3]))     # bytes`,
      keypoints: [
        "sys.path.insert(0, path) adds a directory to search first for imports",
        "sys.getsizeof() returns object memory in bytes — useful for profiling",
        "sys.setrecursionlimit() increases the call stack — use with caution",
      ],
    },
    hard: {
      explanation:
        "sys.settrace() and sys.setprofile() enable writing custom debuggers and profilers. sys.exc_info() accesses the current exception. sys.intern() optimises string memory by caching identical strings.",
      code: `import sys

# Custom profiler
def profiler(frame, event, arg):
    if event == "call":
        print(f"Calling: {frame.f_code.co_name}")
    return profiler

sys.setprofile(profiler)
# Now every function call is traced

# Current exception info
try:
    1 / 0
except:
    exc_type, exc_val, exc_tb = sys.exc_info()
    print(exc_type)   # <class 'ZeroDivisionError'>

# String interning
a = sys.intern("repeated_string")
b = sys.intern("repeated_string")
print(a is b)   # True — same object`,
      keypoints: [
        "sys.settrace() installs a trace function called on every line — used in debuggers",
        "sys.exc_info() returns (type, value, traceback) of current exception",
        "sys.intern() forces string sharing — reduces memory for repeated strings",
      ],
    },
  },

  DateTime: {
    easy: {
      explanation:
        "The datetime module handles dates and times in Python. You can create date and time objects, get the current time, and format dates as strings. It handles all the complexity of calendars, timezones, and time arithmetic.",
      code: `from datetime import datetime, date, timedelta

# Current date and time
now   = datetime.now()
today = date.today()
print(now)     # 2026-04-19 10:30:00.123456
print(today)   # 2026-04-19

# Create specific date
birthday = date(1995, 6, 15)
print(birthday.strftime("%d %B %Y"))   # 15 June 1995

# Date arithmetic
in_30_days = today + timedelta(days=30)
print(in_30_days)`,
      keypoints: [
        "datetime.now() returns current local date and time",
        "strftime() formats a date as a string — %Y year, %m month, %d day",
        "timedelta represents a duration — add or subtract from dates",
      ],
    },
    medium: {
      explanation:
        "Timezone-aware datetimes prevent bugs in applications that handle multiple timezones. Always store UTC internally and convert to local time for display. The zoneinfo module (Python 3.9+) provides IANA timezone database support.",
      code: `from datetime import datetime, timezone
from zoneinfo import ZoneInfo

# UTC datetime — always timezone-aware
now_utc = datetime.now(timezone.utc)
print(now_utc)

# Convert to local timezone
london = ZoneInfo("Europe/London")
mumbai = ZoneInfo("Asia/Kolkata")

london_time = now_utc.astimezone(london)
mumbai_time = now_utc.astimezone(mumbai)

print(london_time.strftime("%H:%M %Z"))
print(mumbai_time.strftime("%H:%M %Z"))

# Parse string to datetime
dt = datetime.strptime("2026-04-19", "%Y-%m-%d")
print(dt)`,
      keypoints: [
        "Always use timezone-aware datetimes — naive datetimes cause bugs across timezones",
        "Store in UTC, display in local time — datetime.astimezone() converts",
        "datetime.strptime() parses a string into a datetime using a format pattern",
      ],
    },
    hard: {
      explanation:
        "High-performance time measurement uses time.perf_counter() not datetime. dateutil extends datetime with relative deltas and fuzzy parsing. For financial systems, calendar arithmetic requires handling business days and holidays.",
      code: `import time
from datetime import datetime
from dateutil.relativedelta import relativedelta

# Precise timing
start = time.perf_counter()
result = sum(range(1_000_000))
elapsed = time.perf_counter() - start
print(f"{elapsed:.6f}s")

# relativedelta — calendar-aware arithmetic
now = datetime(2026, 1, 31)
# Add 1 month — handles different month lengths
next_month = now + relativedelta(months=1)
print(next_month)   # 2026-02-28 (not March 3)

# ISO week number
dt = datetime(2026, 4, 19)
print(dt.isocalendar())   # (year, week, weekday)`,
      keypoints: [
        "time.perf_counter() is the most precise timer — use for benchmarking",
        "relativedelta handles calendar-aware month/year arithmetic correctly",
        "datetime.isocalendar() returns ISO year, week number, and weekday",
      ],
    },
  },

  Collections: {
    easy: {
      explanation:
        "The collections module provides specialised container types that extend Python's built-in list, dict, and tuple. The most useful are Counter for counting, defaultdict for missing keys, and deque for fast both-end operations.",
      code: `from collections import Counter, defaultdict, deque

# Counter — count occurrences
words = ["apple", "banana", "apple", "cherry", "banana", "apple"]
count = Counter(words)
print(count)                    # Counter({'apple': 3, ...})
print(count.most_common(2))     # [('apple', 3), ('banana', 2)]

# defaultdict — no KeyError
word_lengths = defaultdict(list)
for word in words:
    word_lengths[len(word)].append(word)

# deque — fast both-end operations
q = deque([1, 2, 3])
q.appendleft(0)    # [0, 1, 2, 3]
q.append(4)        # [0, 1, 2, 3, 4]
q.popleft()        # Returns 0`,
      keypoints: [
        "Counter counts hashable items and supports most_common(n)",
        "defaultdict(type) auto-creates missing keys with the given type",
        "deque has O(1) append and pop from both ends — list is O(n) for left end",
      ],
    },
    medium: {
      explanation:
        "OrderedDict remembers insertion order (less relevant since Python 3.7 dicts are ordered). namedtuple creates lightweight, immutable record types. ChainMap provides a layered view over multiple dictionaries.",
      code: `from collections import namedtuple, ChainMap, OrderedDict

# namedtuple — lightweight record
Point = namedtuple("Point", ["x", "y"])
p = Point(3, 4)
print(p.x, p.y)        # 3 4
print(p._asdict())     # {'x': 3, 'y': 4}
x, y = p               # Unpack like tuple

# ChainMap — layered config
defaults = {"color": "blue", "size": "M", "debug": False}
env_vars = {"color": "red"}
cli_args = {"size": "L"}

config = ChainMap(cli_args, env_vars, defaults)
print(config["color"])   # red   (env_var wins)
print(config["size"])    # L     (cli wins)
print(config["debug"])   # False (default)`,
      keypoints: [
        "namedtuple is immutable and memory-efficient — ideal for records and coordinates",
        "ChainMap layers dicts — first dict wins on key conflicts",
        "ChainMap does not copy data — changes to original dicts are reflected",
      ],
    },
    hard: {
      explanation:
        "UserDict, UserList, and UserString are base classes for creating custom container types that are easier to subclass than the built-in dict and list. Understanding when to use each collection type optimises both performance and readability.",
      code: `from collections import UserDict

class CaseInsensitiveDict(UserDict):
    def __setitem__(self, key, value):
        super().__setitem__(key.lower(), value)

    def __getitem__(self, key):
        return super().__getitem__(key.lower())

    def __contains__(self, key):
        return super().__contains__(key.lower())

d = CaseInsensitiveDict()
d["Name"] = "Alice"
print(d["name"])     # Alice
print(d["NAME"])     # Alice
print("name" in d)   # True`,
      keypoints: [
        "UserDict is easier to subclass than dict — wraps dict in self.data",
        "Override __setitem__, __getitem__, __contains__ for custom dict behaviour",
        "collections.abc provides abstract base classes for custom containers",
      ],
    },
  },

  Itertools: {
    easy: {
      explanation:
        "The itertools module provides functions for working with iterators efficiently. All itertools functions return lazy iterators — they compute values on demand without storing the full sequence in memory.",
      code: `import itertools

# chain — concatenate iterables
combined = list(itertools.chain([1,2], [3,4], [5,6]))
print(combined)   # [1, 2, 3, 4, 5, 6]

# islice — take first n items
first5 = list(itertools.islice(range(100), 5))
print(first5)     # [0, 1, 2, 3, 4]

# count — infinite counter
counter = itertools.count(start=10, step=2)
print([next(counter) for _ in range(5)])  # [10,12,14,16,18]

# cycle — repeat sequence forever
colours = itertools.cycle(["red", "green", "blue"])
print([next(colours) for _ in range(6)])`,
      keypoints: [
        "itertools functions return lazy iterators — memory-efficient for large data",
        "chain() concatenates iterables; islice() limits how many items to take",
        "count() and cycle() create infinite iterators — always pair with islice or break",
      ],
    },
    medium: {
      explanation:
        "itertools provides combinatorial functions — permutations, combinations, and product. These are essential for search algorithms, testing, and mathematical computations without manual nested loops.",
      code: `import itertools

# Combinations and permutations
items = ["A", "B", "C"]
print(list(itertools.combinations(items, 2)))
# [('A','B'), ('A','C'), ('B','C')]

print(list(itertools.permutations(items, 2)))
# [('A','B'), ('A','C'), ('B','A'), ...]

# Cartesian product
print(list(itertools.product([1,2], ["a","b"])))
# [(1,'a'), (1,'b'), (2,'a'), (2,'b')]

# groupby — group consecutive elements
data = [("A",1),("A",2),("B",3),("B",4),("A",5)]
for key, group in itertools.groupby(data, key=lambda x: x[0]):
    print(key, list(group))`,
      keypoints: [
        "combinations(n, r) gives r-length combos without repetition — order irrelevant",
        "permutations(n, r) gives r-length arrangements — order matters",
        "groupby() groups consecutive identical keys — sort data first for full grouping",
      ],
    },
    hard: {
      explanation:
        "Advanced itertools usage involves building lazy data pipelines, implementing sliding windows, and using accumulate for running aggregations. These patterns process large datasets with minimal memory.",
      code: `import itertools
import operator

# accumulate — running total
data = [1, 2, 3, 4, 5]
running_sum = list(itertools.accumulate(data))
print(running_sum)   # [1, 3, 6, 10, 15]

running_max = list(itertools.accumulate(data, func=max))
print(running_max)   # [1, 2, 3, 4, 5]

# Sliding window
def sliding_window(iterable, n):
    it = iter(iterable)
    window = tuple(itertools.islice(it, n))
    if len(window) == n:
        yield window
    for item in it:
        window = window[1:] + (item,)
        yield window

print(list(sliding_window([1,2,3,4,5], 3)))
# [(1,2,3), (2,3,4), (3,4,5)]`,
      keypoints: [
        "accumulate() computes running aggregations — sum, max, product, custom function",
        "Sliding window pattern uses deque or islice to maintain a fixed-size view",
        "Lazy pipelines chain itertools functions for O(1) memory regardless of data size",
      ],
    },
  },

  Multiprocessing: {
    easy: {
      explanation:
        "Multiprocessing runs code in separate processes, bypassing Python's GIL. Unlike threads, each process has its own memory space. This enables true CPU parallelism for compute-intensive tasks like data processing and scientific computing.",
      code: `from multiprocessing import Process, cpu_count
import os

def worker(name):
    print(f"{name} running in PID {os.getpid()}")

if __name__ == "__main__":   # Required on Windows/macOS
    print(f"CPUs: {cpu_count()}")

    p1 = Process(target=worker, args=("Worker-1",))
    p2 = Process(target=worker, args=("Worker-2",))

    p1.start()
    p2.start()
    p1.join()
    p2.join()
    print("All workers done")`,
      keypoints: [
        "Each process has its own memory — no shared state by default",
        "if __name__ == '__main__': is required to prevent recursive spawning",
        "Multiprocessing bypasses the GIL — enables true CPU parallelism",
      ],
    },
    medium: {
      explanation:
        "ProcessPoolExecutor provides a high-level interface for parallel execution. Pool.map() distributes work across processes. Queue and Pipe enable communication between processes safely.",
      code: `from concurrent.futures import ProcessPoolExecutor
from multiprocessing import Queue, Pool
import math

def is_prime(n):
    if n < 2: return False
    return all(n % i != 0 for i in range(2, int(math.sqrt(n))+1))

if __name__ == "__main__":
    numbers = range(2, 10000)

    # ProcessPoolExecutor
    with ProcessPoolExecutor() as executor:
        primes = list(filter(None,
            executor.map(is_prime, numbers)
        ))

    # Pool.map — simpler
    with Pool() as pool:
        results = pool.map(is_prime, numbers)`,
      keypoints: [
        "ProcessPoolExecutor is the modern high-level API for process pools",
        "Pool.map() distributes a list across processes and collects results",
        "Use multiprocessing for CPU-bound work; threading for I/O-bound work",
      ],
    },
    hard: {
      explanation:
        "Shared memory, Manager objects, and process synchronisation with Lock and Semaphore enable safe inter-process communication. Understanding copy-on-write semantics and pickling constraints prevents common multiprocessing bugs.",
      code: `from multiprocessing import Process, Lock, Value, Array
import ctypes

def increment(counter, lock, n):
    for _ in range(n):
        with lock:
            counter.value += 1

if __name__ == "__main__":
    counter = Value(ctypes.c_int, 0)
    lock    = Lock()

    processes = [
        Process(target=increment, args=(counter, lock, 1000))
        for _ in range(4)
    ]
    [p.start() for p in processes]
    [p.join()  for p in processes]
    print(counter.value)   # Always 4000`,
      keypoints: [
        "Value and Array share memory between processes — require Lock for safety",
        "All arguments to Process must be picklable — lambdas and closures cannot be pickled",
        "Manager() creates server process with proxies — slower but supports any Python object",
      ],
    },
  },

  "Event Loop": {
    easy: {
      explanation:
        "The event loop is the engine that runs async code. It manages all coroutines, scheduling them to run when they are ready. asyncio.run() creates an event loop, runs your async main function, and closes the loop when done.",
      code: `import asyncio

async def task(name, delay):
    print(f"{name} starting")
    await asyncio.sleep(delay)
    print(f"{name} done after {delay}s")

async def main():
    # Run concurrently — total ~2s not 5s
    await asyncio.gather(
        task("A", 2),
        task("B", 1),
        task("C", 2)
    )

asyncio.run(main())
# B done after 1s
# A done after 2s
# C done after 2s`,
      keypoints: [
        "The event loop runs one coroutine at a time but switches between them at await points",
        "asyncio.run() is the entry point — creates and closes the event loop automatically",
        "asyncio.gather() runs multiple coroutines concurrently in the same event loop",
      ],
    },
    medium: {
      explanation:
        "asyncio.create_task() schedules coroutines to run concurrently without waiting immediately. asyncio.wait_for() adds timeout support. asyncio.Queue enables producer-consumer patterns in async code.",
      code: `import asyncio

async def producer(queue):
    for i in range(5):
        await queue.put(i)
        print(f"Produced {i}")
        await asyncio.sleep(0.1)
    await queue.put(None)   # Sentinel

async def consumer(queue):
    while True:
        item = await queue.get()
        if item is None:
            break
        print(f"Consumed {item}")
        queue.task_done()

async def main():
    queue = asyncio.Queue(maxsize=3)
    await asyncio.gather(
        producer(queue),
        consumer(queue)
    )

asyncio.run(main())`,
      keypoints: [
        "asyncio.Queue is thread-safe and async-safe for producer-consumer patterns",
        "create_task() schedules a coroutine without awaiting immediately",
        "asyncio.wait_for(coro, timeout) cancels the coroutine if it takes too long",
      ],
    },
    hard: {
      explanation:
        "Direct event loop access via asyncio.get_event_loop() enables custom scheduling, loop policies, and integrating with external event loops like uvloop. Understanding loop internals — selectors, callbacks, and handle scheduling — enables building high-performance async frameworks.",
      code: `import asyncio
import uvloop   # 2-4x faster than default

# Custom event loop policy
asyncio.set_event_loop_policy(uvloop.EventLoopPolicy())

async def main():
    loop = asyncio.get_running_loop()

    # Schedule a callback
    loop.call_soon(lambda: print("Scheduled callback"))

    # Run blocking code without blocking loop
    result = await loop.run_in_executor(
        None,   # Default thread pool
        lambda: sum(range(1_000_000))
    )
    print(f"Result: {result}")

asyncio.run(main())`,
      keypoints: [
        "uvloop replaces the default event loop with a libuv-based implementation — 2-4x faster",
        "loop.run_in_executor() runs blocking code in a thread pool without blocking the loop",
        "loop.call_soon() schedules a callback for the next iteration of the event loop",
      ],
    },
  },

  "Locks/Semaphores": {
    easy: {
      explanation:
        "Locks and semaphores prevent race conditions when multiple threads access shared data. A Lock allows only one thread at a time. A Semaphore allows a limited number of threads. Both can be used as context managers with with.",
      code: `import threading
import time

counter = 0
lock = threading.Lock()

def increment():
    global counter
    for _ in range(1000):
        with lock:       # Only one thread at a time
            counter += 1

threads = [threading.Thread(target=increment)
           for _ in range(5)]

[t.start() for t in threads]
[t.join()  for t in threads]
print(counter)   # Always 5000 — no race condition`,
      keypoints: [
        "Lock allows only one thread to execute the protected block at a time",
        "with lock: acquires on entry and releases on exit — even if exception occurs",
        "Without locks, concurrent writes cause race conditions and incorrect results",
      ],
    },
    medium: {
      explanation:
        "RLock (reentrant lock) can be acquired multiple times by the same thread. Semaphore limits concurrent access to a fixed number. Event signals between threads. Condition enables wait/notify patterns for producer-consumer scenarios.",
      code: `import threading

# Semaphore — limit concurrent connections
db_semaphore = threading.Semaphore(3)   # Max 3 concurrent

def query_database(query_id):
    with db_semaphore:
        print(f"Query {query_id} running")
        # Only 3 run at once

# Event — signal between threads
ready = threading.Event()

def server():
    print("Server starting...")
    ready.set()   # Signal that server is ready

def client():
    ready.wait()  # Block until server is ready
    print("Client connecting...")

threading.Thread(target=server).start()
threading.Thread(target=client).start()`,
      keypoints: [
        "Semaphore(n) allows up to n threads simultaneously — useful for connection pools",
        "Event.set() signals all waiting threads; Event.wait() blocks until set",
        "RLock allows the same thread to acquire the lock multiple times safely",
      ],
    },
    hard: {
      explanation:
        "asyncio provides async-native synchronisation primitives — asyncio.Lock, Semaphore, Event, and Condition. These are non-blocking and must be used in async code. Mixing threading primitives with async code causes deadlocks.",
      code: `import asyncio

# Async semaphore — limit concurrent API calls
async def fetch(session, url, semaphore):
    async with semaphore:
        await asyncio.sleep(0.1)   # Simulate request
        return f"Result from {url}"

async def main():
    semaphore = asyncio.Semaphore(3)   # Max 3 concurrent

    urls = [f"https://api.example.com/{i}" for i in range(10)]
    tasks = [fetch(None, url, semaphore) for url in urls]
    results = await asyncio.gather(*tasks)
    print(f"Got {len(results)} results")

asyncio.run(main())`,
      keypoints: [
        "asyncio.Semaphore limits concurrent async operations — rate limiting, connection pools",
        "Never use threading.Lock in async code — use asyncio.Lock instead",
        "asyncio.Condition enables wait/notify patterns in async producer-consumer code",
      ],
    },
  },
};

// Fill remaining concepts with generated defaults
const defaultContent = (name, level) => ({
  easy: {
    explanation: `${name} is a fundamental Python concept at level ${level}. It provides essential functionality that builds on previous concepts and enables more advanced programming patterns.`,
    code: `# ${name} example\n# Study this concept to understand its usage\nprint("Learning ${name}")`,
    keypoints: [
      `${name} is used to solve specific programming problems efficiently`,
      "Understanding this concept builds on what you've already learned",
      "Practice with small examples before applying to larger programs",
    ],
    quiz: [
      {
        q: `What is the primary purpose of ${name} in Python?`,
        opts: [
          "Data storage",
          "Control flow",
          "Depends on context",
          "None of above",
        ],
        ans: 2,
      },
      {
        q: `At what level is ${name} introduced?`,
        opts: [
          `Level ${level - 1}`,
          `Level ${level}`,
          `Level ${level + 1}`,
          "Level 0",
        ],
        ans: 1,
      },
      {
        q: `Which is true about ${name}?`,
        opts: [
          "Rarely used",
          "Core Python feature",
          "Only in Python 2",
          "External library",
        ],
        ans: 1,
      },
    ],
  },
  medium: {
    explanation: `${name} at the intermediate level involves understanding its internals and common patterns. This knowledge allows you to write more efficient and idiomatic Python code.`,
    code: `# Intermediate ${name} usage\n# Apply patterns learned from basics\nprint("Intermediate ${name}")`,
    keypoints: [
      `Intermediate use of ${name} focuses on efficiency and best practices`,
      "Common patterns and idioms help write more Pythonic code",
      "Understanding internals helps avoid common pitfalls",
    ],
    quiz: [
      {
        q: `What is an intermediate use of ${name}?`,
        opts: [
          "Basic creation",
          "Advanced patterns",
          "Both A and B",
          "Neither",
        ],
        ans: 2,
      },
      {
        q: `Which improves ${name} performance?`,
        opts: [
          "Avoiding it",
          "Using built-in optimisations",
          "More memory",
          "Fewer imports",
        ],
        ans: 1,
      },
      {
        q: `What is a common ${name} pattern?`,
        opts: ["Antipattern", "Idiomatic usage", "Workaround", "Hack"],
        ans: 1,
      },
    ],
  },
  hard: {
    explanation: `Advanced ${name} usage involves edge cases, performance optimisation, and integration with Python's object model. This level targets professional Python development.`,
    code: `# Advanced ${name}\n# Professional patterns and optimisations\nprint("Advanced ${name}")`,
    keypoints: [
      `Advanced ${name} requires deep understanding of Python internals`,
      "Performance considerations become critical at this level",
      "Integration with the broader Python ecosystem is key",
    ],
    quiz: [
      {
        q: `What characterises advanced ${name} usage?`,
        opts: [
          "Simplicity",
          "Performance + internals",
          "Basic patterns",
          "Avoiding it",
        ],
        ans: 1,
      },
      {
        q: `When does ${name} performance matter most?`,
        opts: ["Always", "Never", "Production scale", "Testing only"],
        ans: 2,
      },
      {
        q: `What enables expert-level ${name} usage?`,
        opts: [
          "Memorisation",
          "Deep internals knowledge",
          "More libraries",
          "Copying examples",
        ],
        ans: 1,
      },
    ],
  },
});

const allConcepts = [
  "Variables",
  "Data Types",
  "Operators",
  "Input/Output",
  "Comments",
  "If/Else",
  "Elif",
  "For Loop",
  "While Loop",
  "Break/Continue",
  "Pass",
  "Strings",
  "Lists",
  "Tuples",
  "Sets",
  "Dictionaries",
  "List Slicing",
  "Functions",
  "Arguments",
  "Return Values",
  "Default Args",
  "Scope",
  "Lambda",
  "Base Case",
  "Recursive Functions",
  "Memoization",
  "Classes",
  "Objects",
  "Constructors",
  "Inheritance",
  "Polymorphism",
  "Encapsulation",
  "Modules",
  "Packages",
  "File Read",
  "File Write",
  "Exception Handling",
  "Try/Except",
  "Comprehensions",
  "Iterators",
  "Generators",
  "Decorators",
  "Context Managers",
  "Math",
  "OS",
  "Sys",
  "DateTime",
  "Collections",
  "Itertools",
  "Threading",
  "Multiprocessing",
  "Async/Await",
  "Event Loop",
  "Locks/Semaphores",
];

allConcepts.forEach((name, i) => {
  if (!content[name]) {
    const level = Math.floor(i / 6);
    content[name] = defaultContent(name, level);
  }
});

export default content;
