# Pathrix — Frontend

> React frontend for Pathrix, an AI-based adaptive learning system that personalises Python concept recommendations using Deep Knowledge Tracing and Reinforcement Learning.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-brightgreen)](https://pathrix-frontend.vercel.app)
[![Backend Repo](https://img.shields.io/badge/Backend-GitHub-black)](https://github.com/Aish0864/pathrix-api)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)](https://vercel.com)

---

## Live Demo

🌐 **https://pathrix-frontend.vercel.app**

> Demo access available on request.

---

## What is Pathrix?

Pathrix is an adaptive learning platform for Python programming. It identifies what each learner already knows and recommends the next concept to study — skipping content they have mastered and prioritising gaps in their knowledge.

Every recommendation includes a natural language explanation of why that concept was chosen.

👉 **Full project details:** https://github.com/Aish0864/pathrix-api

---

## Screens

### Student Flow

| Screen | Description |
|---|---|
| Landing Page | Introduction to Pathrix with login/register options |
| Register | Create new account |
| Login | Student authentication |
| Diagnostic Quiz | Initial assessment to determine learner profile |
| Dashboard | Progress overview — mastery %, concepts studied, profile level, cognitive load |
| Learning Page | Current recommended concept with WHY explanation and confidence indicator |
| Quiz Page | Concept-specific questions to test mastery |
| Result Page | Quiz result with mastery update and next recommendation preview |
| Path View | Visual overview of learning path across 54 Python concepts |
| Profile Page | Account details and learning statistics |
| Completion Page | Session completion summary |

### Admin Flow

| Screen | Description |
|---|---|
| Admin Login | Separate admin authentication |
| Admin Dashboard | Overview of all registered students and activity |
| Student Detail | Individual student mastery, interactions, cognitive load |
| A/B Comparison | Compare adaptive vs fixed path performance |
| Pipeline View | Live AI pipeline status — DKT model + RL agent health |

---

## Tech Stack

| Component | Technology |
|---|---|
| Framework | React 18 |
| Routing | React Router |
| HTTP Client | Fetch API |
| Styling | CSS Modules |
| Deployment | Vercel |
| Build Tool | Create React App |

---

## Project Structure

```
pathrix-frontend/
├── public/
│   └── index.html
├── src/
│   ├── pages/
│   │   ├── LandingPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── learner/
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── LearnPage.jsx
│   │   │   ├── QuizPage.jsx
│   │   │   ├── ResultPage.jsx
│   │   │   ├── PathPage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   └── CompletionPage.jsx
│   │   └── admin/
│   │       ├── AdminLoginPage.jsx
│   │       ├── DashboardTab.jsx
│   │       ├── StudentDetailTab.jsx
│   │       ├── ABComparisonTab.jsx
│   │       └── PipelineTab.jsx
│   ├── layouts/
│   │   ├── LearnerLayout.jsx
│   │   └── AdminLayout.jsx
│   ├── App.jsx
│   └── index.js
└── package.json
```

---

## How to Run Locally

### Prerequisites
```
Node.js 18+
```

### Setup

```bash
# Clone the repo
git clone https://github.com/Aish0864/pathrix-frontend
cd pathrix-frontend

# Install dependencies
npm install

# Start development server
npm start
```

Frontend runs at `http://localhost:3000`

### Environment Variables

Create a `.env` file in the root:

```
REACT_APP_API_URL=http://localhost:8000
```

For production:
```
REACT_APP_API_URL=https://pathrix-api.onrender.com
```

### Build for Production

```bash
npm run build
```

---

## Learner Flow

```
Register / Login
      │
      ▼
Diagnostic Quiz
      │
      ▼
Profile Assigned
(Beginner / Intermediate / Advanced)
      │
      ▼
Dashboard
      │
      ▼
Learning Page → Quiz Page → Result Page
      │
      ▼
Repeat until session complete
      │
      ▼
Completion Page
```

---

## Key Features

- **Adaptive recommendations** — next concept chosen by Q-Learning agent
- **Natural language explanations** — every recommendation includes a WHY string
- **Cognitive load indicator** — displayed on dashboard and learning page
- **Profile-based personalisation** — beginner, intermediate, advanced profiles
- **Mastery tracking** — real-time mastery updates after every quiz
- **Admin dashboard** — full student management and AI pipeline monitoring
- **A/B comparison view** — adaptive vs fixed path performance

---

## Deployment Notes

Deployed on Vercel with automatic deployments from main branch.

Set these environment variables in Vercel:
```
CI=false
REACT_APP_API_URL=https://pathrix-api.onrender.com
```

---

## Research Context

MTech Computer Engineering Dissertation
Vidyalankar Institute of Technology, Wadala, Maharashtra, India

**Author:** Aishwarya Nalawade
**Guide:** Dr. Kavita P. Shirsat

---

## Related

- 📦 Backend repo: https://github.com/Aish0864/pathrix-api
- 🌐 Live system: https://pathrix-frontend.vercel.app
- 📄 API docs: https://pathrix-api.onrender.com/docs
