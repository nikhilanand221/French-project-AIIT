# French Learning App – React Developer Roadmap



---

## 1. Project Overview

Build a feature-rich, AI-powered French learning web app using React, TypeScript, Supabase, and Groq API. The focus is on modularity, scalability, and an engaging, gamified experience with real-time analytics and adaptive content.

---

## 2. Syllabus (Developer Mapping)

### Course 1: Introduction to French Culture & Language

| Module                                        | %   | Features to Build (Page/Component)                           | Data/Logic                          |
| ----------------------------------------------|-----|-------------------------------------------------------------|-------------------------------------|
| I. Introduction to French Language            | 15% | Intro page, self-intro form, greetings component             | User input, avatar upload           |
| II. A rendez-vous                            | 15% | Numbers game, time picker, dialogue widget                  | TTS, validation, progress saving    |
| III. Visiting a place                        | 25% | Family tree, drag-drop for objects/places, AR preview       | Media upload, AR/WebXR, scoring     |
| IV. An interview                             | 25% | Professions selector, nationality quiz                      | Quiz logic, result feedback         |
| V. At the discotheque                        | 20% | Conversation cards, Q&A, activity suggestion                | Chat UI, AI prompt, XP reward       |

---

### Course 2: French Grammar – I

| Module                        | %   | Features to Build (Page/Component)      | Data/Logic                   |
|-------------------------------|-----|----------------------------------------|------------------------------|
| I. About oneself              | 20% | Possessive adj. trainer, sentence builder | Grammar engine, hints       |
| II. Lifestyle                 | 25% | Pronominal verbs game, daily routine editor | Verb logic, calendar        |
| III. Personal activities      | 30% | IR verbs practice, party planner game   | Verb conjugation, scoring   |
| IV. French culture            | 25% | Disjunctive pronouns quiz, comprehension | Quiz logic, content parsing |

---

## 3. Technical Roadmap (Developer Tasks)

### Phase 1: Foundation (Weeks 1–4)

#### Week 1: Setup & Core Libraries
- [ ] Scaffold React + TypeScript project (Vite/CRA)
- [ ] Set up ESLint, Prettier, Husky
- [ ] Add MUI/Chakra UI, Framer Motion, React Router
- [ ] Connect Supabase (auth, db), .env setup
- [ ] Configure CI/CD (GitHub Actions, Vercel/Netlify)
- [ ] PWA setup (manifest, service worker)

#### Week 2: Core App Structure & Auth
- [ ] Create atomic folder structure (components, features, hooks, api, utils)
- [ ] Implement global state (Redux Toolkit/Zustand)
- [ ] Build landing page, auth UI (login/signup, Supabase)
- [ ] Profile page (avatar, user info)
- [ ] Routing (protected/private routes)

#### Week 3: Syllabus Mapping & Content Models
- [ ] Design DB schema for syllabus, modules, user progress
- [ ] Build syllabus navigation (sidebar or dashboard)
- [ ] Create dynamic course/module pages
- [ ] Render lessons from Supabase content
- [ ] Setup basic lesson progress tracking (local + remote)

#### Week 4: UI Kit & Reusable Components
- [ ] Build Button, Card, Dialog, ProgressBar, Avatar, Badge components
- [ ] Typography and theming (French palette)
- [ ] Responsive layout (mobile/tablet/desktop)
- [ ] Accessibility (ARIA roles, keyboard nav)

---

### Phase 2: Core Learning Engine (Weeks 5–8)

#### Week 5: Module I & II (Course 1)
- [ ] Self-intro form with validation
- [ ] Greetings and numbers mini-games
- [ ] TTS for pronunciation (browser API)
- [ ] Save/restore lesson progress

#### Week 6: Module III–V (Course 1)
- [ ] Family tree UI (drag-drop)
- [ ] AR/WebXR integration for object/place learning
- [ ] Conversation cards, Q&A chat widget (basic)

#### Week 7: Grammar Modules (Course 2)
- [ ] Sentence builder with grammar rules
- [ ] Verb conjugation trainer
- [ ] Daily routine editor/calendar integration
- [ ] Pronouns quiz

#### Week 8: Gamification MVP
- [ ] XP system, progress bars
- [ ] Streak logic, reward popups
- [ ] Achievement badges
- [ ] Leaderboard page (Supabase real-time)

---

### Phase 3: AI & Advanced Features (Weeks 9–12)

#### Week 9: AI Integration (Groq API)
- [ ] Connect Groq API for chat tutor
- [ ] AI-powered feedback for speaking/writing
- [ ] Adaptive content suggestion UI

#### Week 10: Social & Community
- [ ] Friend/challenge system
- [ ] Group leaderboard
- [ ] Messaging or comment system

#### Week 11: Analytics & Personalization
- [ ] Progress dashboard (Recharts/Chart.js)
- [ ] Predictive analytics (Groq API)
- [ ] Personalized recommendations

#### Week 12: Testing & QA
- [ ] Unit/integration tests (Jest, RTL)
- [ ] End-to-end tests (Cypress)
- [ ] Accessibility audit
- [ ] Performance optimization

---

### Ongoing: Content Expansion & Scaling

- [ ] Add new modules, lessons, quizzes
- [ ] Add more languages (i18n)
- [ ] Scale to React Native (optional)
- [ ] Monitor metrics (uptime, engagement, errors)

---

## 4. Tech Stack Reference

- **Frontend:** React + TypeScript, Vite/CRA, MUI/Chakra UI, Framer Motion, React Router
- **State:** Redux Toolkit or Zustand
- **Backend:** Supabase (auth, db, storage, real-time)
- **AI:** Groq API (REST/WebSocket)
- **Audio/Video:** Web APIs, react-h5-audio-player
- **Charts:** Recharts/Chart.js
- **Testing:** Jest, React Testing Library, Cypress
- **CI/CD:** GitHub Actions, Vercel/Netlify
- **PWA:** Service Worker, manifest

---

## 5. Implementation Guide

- **Clone & Install:**  
  `git clone ... && cd french-learning-react && npm install`
- **Env Vars:**  
  Add `.env` for Supabase/Groq keys
- **Dev Start:**  
  `npm run dev`
- **Test:**  
  `npm run test`
- **Deploy:**  
  Push to main (auto deploy via Vercel/Netlify)

---

## 6. Success Metrics

- User progress & retention
- Engagement with modules/games
- Conversion to premium
- Real-time feedback scores
- App performance & uptime

---

**This roadmap is designed for developers: it breaks down the syllabus into React features/components, structures the timeline for iterative delivery, and adopts modern best-practices for web, AI, and gamified learning.**
