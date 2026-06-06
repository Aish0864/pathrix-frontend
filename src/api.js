import axios from "axios";

// const BASE = "http://127.0.0.1:8000";
const BASE = "https://pathrix-api.onrender.com";

export const register = (name, email, password) =>
  axios.post(`${BASE}/register`, { name, email, password });

export const login = (email, password) =>
  axios.post(`${BASE}/login`, { email, password });

export const startSession = (studentId) =>
  axios.post(`${BASE}/start_session`, { student_id: studentId });

export const submitQuiz = (
  sessionId,
  studentId,
  skillId,
  correct,
  timeTaken,
  timedOut,
) =>
  axios.post(`${BASE}/submit_quiz`, {
    session_id: sessionId,
    student_id: studentId,
    skill_id: skillId,
    correct,
    time_taken_seconds: timeTaken,
    timed_out: timedOut,
  });

export const getRecommendation = (sessionId) =>
  axios.post(`${BASE}/get_recommendation`, { session_id: sessionId });

export const getPath = (sessionId, steps = 6) =>
  axios.post(`${BASE}/get_path`, { session_id: sessionId, steps });

export const getExplanation = (sessionId) =>
  axios.get(`${BASE}/get_explanation`, { params: { session_id: sessionId } });

export const checkFirstLogin = (studentId) =>
  axios.get(`${BASE}/check_first_login`, { params: { student_id: studentId } });

export const markMastered = (studentId, conceptId, score, total) =>
  axios.post(`${BASE}/mark_mastered`, {
    student_id: studentId,
    concept_id: conceptId,
    score: score,
    total: total,
  });

export const getStudentMastery = (studentId) =>
  axios.get(`${BASE}/student_mastery/${studentId}`);

export const getOverallMastery = (studentId) =>
  axios.get(`${BASE}/overall_mastery/${studentId}`);
