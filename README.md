# IntelliHire – Resume-Aware Technical Interview Evaluation System

## Overview
IntelliHire is a full-stack web application designed to simulate real technical interviews and provide structured feedback on user performance.  
It helps students prepare effectively by evaluating both written and oral responses and identifying skill gaps.

---

## Features

- Resume-based interview preparation (extensible)
- Written and oral interview modes
- Automated answer evaluation (keyword, structure, length)
- Speech analysis (WPM, filler words, confidence score)
- Session-based interview tracking
- Analytics dashboard with skill gap analysis
- JWT-based authentication system

---

## Tech Stack

**Frontend**
- React.js
- JavaScript, HTML, CSS

**Backend**
- Spring Boot (Java)
- REST APIs

**Database**
- MySQL

**Authentication**
- JWT (JSON Web Token)

---

## System Architecture

- React frontend interacts with backend via REST APIs
- Spring Boot handles business logic and evaluation
- MySQL stores structured data (sessions, answers, questions)
- JWT secures API communication

---

## Database Design

Key Entities:

- **InterviewSession**
  - Represents a single interview attempt

- **Answer**
  - Stores user responses and evaluation metrics

- **QuestionBank**
  - Stores interview questions and domains

### Relationships:
- One session → multiple answers
- One answer → one question

---

## Evaluation Logic

### Written Evaluation:
- Keyword matching
- Answer length
- Structure analysis

### Oral Evaluation:
- Speech-to-text conversion
- Words per minute (WPM)
- Filler word detection (um, uh, like)
- Confidence scoring

### Final Score:
Weighted combination of multiple parameters

---

## Analytics

- Domain-wise performance tracking
- Skill gap identification
- Recommendation system for improvement

---

## Screenshots

### Dashboard
![Dashboard](screenshots/dashboard.png)

### Interview
![Interview](screenshots/interview.png)

### Results
![Results](screenshots/result.png)

### Analytics
![Analytics](screenshots/analytics.png)

---

## How to Run the Project

### Backend (Spring Boot)

cd backend
mvn spring-boot:run

### Frontend (React)
cd intellihire-frontend
npm install
npm run dev


Future Improvements
NLP-based answer evaluation
AI-based question generation from resume
Real-time feedback system
Enhanced UI/UX with advanced analytics