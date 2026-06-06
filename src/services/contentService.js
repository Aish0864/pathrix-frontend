import { getOverallMastery } from "../api";

const CONCEPT_FILE_MAP = {
  Variables: "variables",
  "Data Types": "data_types",
  Operators: "operators",
  "Input/Output": "input_output",
  Comments: "comments",
  "If/Else": "if_else",
  Elif: "elif",
  "For Loop": "for_loop",
  "While Loop": "while_loop",
  "Break/Continue": "break_continue",
  Pass: "pass",
  Strings: "strings",
  Lists: "lists",
  Tuples: "tuples",
  Sets: "sets",
  Dictionaries: "dictionaries",
  "List Slicing": "list_slicing",
  Functions: "functions",
  Arguments: "arguments",
  "Return Values": "return_values",
  "Default Args": "default_args",
  Scope: "scope",
  Lambda: "lambda",
  "Base Case": "base_case",
  "Recursive Functions": "recursive_functions",
  Memoization: "memoization",
  Classes: "classes",
  Objects: "objects",
  Constructors: "constructors",
  Inheritance: "inheritance",
  Polymorphism: "polymorphism",
  Encapsulation: "encapsulation",
  Modules: "modules",
  Packages: "packages",
  "File Read": "file_read",
  "File Write": "file_write",
  "Exception Handling": "exception_handling",
  "Try/Except": "try_except",
  Comprehensions: "comprehensions",
  Iterators: "iterators",
  Generators: "generators",
  Decorators: "decorators",
  "Context Managers": "context_managers",
  Math: "math",
  OS: "os",
  Sys: "sys",
  DateTime: "datetime",
  Collections: "collections",
  Itertools: "itertools",
  Threading: "multithreading",
  Multiprocessing: "multiprocessing",
  "Async/Await": "async_programming",
  "Event Loop": "event_loop",
  "Locks/Semaphores": "locks_semaphores",
};

function pickRandom(arr, n) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

export async function generateConceptContent(
  conceptName,
  profile = "beginner",
  masteryPct = 0,
  recentScore = null,
  cognitiveLoad = "low",
) {
  const tier = masteryPct < 45 ? "easy" : masteryPct > 65 ? "hard" : "medium";

  await new Promise((r) => setTimeout(r, 800));

  try {
    const fileName = CONCEPT_FILE_MAP[conceptName];
    if (!fileName) throw new Error(`No file map for: ${conceptName}`);

    const data = await import(`../data/questions/${fileName}.json`);
    const questions = data.default || data;

    // Pick 2 easy + 2 medium + 1 hard
    const easy = pickRandom(questions.easy || [], 2);
    const medium = pickRandom(questions.medium || [], 2);
    const hard = pickRandom(questions.hard || [], 1);
    const selected = [...easy, ...medium, ...hard].sort(
      () => Math.random() - 0.5,
    );

    // Get content from conceptContent.js for explanation/code/keypoints
    const conceptContent = await import("../data/conceptContent");
    const content = conceptContent.default[conceptName];
    const tierContent = content?.[tier] || content?.easy;

    return {
      explanation:
        tierContent?.explanation || `Learn about ${conceptName} in Python.`,
      code: tierContent?.code || `# ${conceptName} example\nprint("Hello")`,
      keypoints: tierContent?.keypoints || [
        `${conceptName} is a core Python concept`,
      ],
      quiz: selected,
    };
  } catch (e) {
    console.error("Content load error:", e);
    throw new Error(`Failed to load content for: ${conceptName}`);
  }
}
