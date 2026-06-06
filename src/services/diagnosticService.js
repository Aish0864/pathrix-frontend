// diagnosticService.js — logic only, imports data from diagnosticQuestions.js

import diagnosticQuestions from "../data/diagnosticQuestions";

// Returns 15 random questions — 5 from each section
export function getRandomDiagnosticQuestions(perSection = 5) {
  return diagnosticQuestions.sections.flatMap((section) => {
    const shuffled = [...section.questions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, perSection);
  });
}

// Returns section titles for progress display
export function getSections() {
  return diagnosticQuestions.sections.map((s) => s.title);
}

// Converts answers array to interactions format for backend
export function buildInteractions(answers) {
  return answers.map((a) => [a.skill_id, a.correct ? 1 : 0]);
}
