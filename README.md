
# Feedy

**An interactive classroom engagement platform that helps instructors understand student confusion in real time.**

## Overview

Feedy is a full-stack web application designed to improve communication and engagement between instructors and students.

Students may hesitate to ask questions when they don't understand something. This can make it difficult for instructors to recognize when students are struggling, especially during online lessons.

Feedy addresses this problem by giving students a simple way to submit questions and communicate their confusion levels during a lesson. Instructors can monitor student questions and classroom confusion through a live dashboard.

## Features

### For Instructors

- **Create classroom sessions:** Start a session with a custom title.
- **QR code access:** Generate a QR code that students can scan to join a session.
- **Live participation monitoring:** See how many participants are currently active.
- **Question management:** View questions submitted by students and mark them as answered or pending.
- **Confusion monitoring:** Monitor the average confusion level of the classroom.
- **Session management:** End an active session when the lesson is finished.
- **Historical confusion tracking:** Review recorded confusion data after a session ends.

### For Students

- **Easy session joining:** Join a classroom session using a QR code or room code.
- **Submit questions:** Ask questions during a lesson without interrupting the instructor.
- **Shared question feed:** View questions submitted by other students in the session.
- **Confusion level selection:** Communicate how well they understand the lesson using a five levels of confusion.
- **Automatic activity tracking:** Send periodic heartbeats so the application can track active participants.

## How It Works
## when testing
please use the pre-resgitered user

username : testInstructor
password: passtest12345

use these credentials to sign in as Speaker/Instructor

This project is not deployed, so you will need to use Cloudflare Tunnel
- Install: winget install Cloudflare.cloudflared
- make an frontend/.env file with VITE_API_URL=/api inside.
- Run the django develpment server
- Run the frontend development server
- run the command: cloudflared tunnel --url http://localhost:5173 (this will give you a link)

### 1. Instructor creates a session

The instructor creates a new session by providing a title. Feedy generates a unique room code and a QR code that students can use to join.

### 2. Students join the session

Students scan the QR code or enter the room code. After successfully joining, each student receives a unique participant token that identifies their participation in the session.

Students DO NOT need to sign in, they also don't provide a name or username, this makes them anonymous.

### 3. Students participate

While the lesson is happening, students can:

- Submit questions that are visible in the session's question feed.
- View questions submitted by other participants.
- Update their confusion level as the lesson progresses.

### 4. Instructor monitors the classroom

The instructor dashboard displays:

- The number of active participants.
- Questions submitted by students.
- The current average classroom confusion level.
- The session QR code for students who still need to join.

The dashboard periodically retrieves updated questions and confusion statistics.

### 5. Session ends and results are reviewed

When the instructor ends the session, the application records the session's end time and provides access to the session results.

Feedy stores periodic confusion snapshots during the session, allowing the application to preserve historical classroom engagement data.

## Confusion Level System

Students can select one of five levels to communicate how well they understand the lesson.

| Level | Description |
| ----- | ----------------- |
| 0     | I'm Good          |
| 1     | A Little Confused |
| 2     | Somewhat Lost     |
| 3     | Very Confused     |
| 4     | Completely Lost   |

These values are used to calculate aggregate classroom confusion statistics.

## Technical Details

Feedy is built using a full-stack architecture with a React frontend and a Django backend.

### Frontend

- React
- React Router
- TanStack Query (used for data fetching and updates)
- Tailwind CSS / DaisyUI

### Backend

- Python
- Django
- Django REST Framework

### Deployment
- Using Cloudflare Tunnel

### Data Models

The backend uses the following main models:

| Model | Responsibility |
| ------------------- | ---------------------------------------------------------------------------------------------------------- |
| `Session` | Stores classroom sessions, including the instructor, title, room code, start time, and end time. |
| `Participant` | Represents a student participating in a session, including their unique token and current confusion level. |
| `Question` | Stores questions submitted by participants, including their text, status, and creation time. |
| `ConfusionSnapshot` | Stores periodic classroom confusion statistics for historical analysis. |

### Data Relationships

- An instructor can create multiple sessions (one at a time).
- Each session belongs to one instructor.
- A session can have multiple participants.
- A session can contain multiple questions.
- Each question belongs to a participant and a session.
- A session can contain multiple confusion snapshots.

## Live Data Updates

Feedy uses polling to keep the instructor dashboard updated during an active session.

The current frontend implementation is configured to:

- Retrieve updated confusion statistics every **3 seconds**.
- Retrieve the latest questions every **3 seconds**.
- Save a confusion snapshot every **30 seconds** for historical analysis.

This allows instructors to monitor classroom engagement without manually refreshing the page.

## Project Architecture

The application is divided into two main parts:

- **Frontend:** Handles the user interface, navigation, session participation, and instructor dashboard.
- **Backend:** Handles session creation, participant management, question submission, confusion tracking, and historical data storage.

The frontend communicates with the backend through REST API endpoints.

## Purpose

Feedy aims to make classrooms more interactive and inclusive by giving students a comfortable way to communicate when they need help.

By providing instructors with visibility into student questions and confusion levels, Feedy helps them identify areas where students may need additional explanations or support.

## AI Usage
- This project was about 85-90 percent generated by ai, but 95% of the code was reviewed and understood before using it.
- Ai was also used for suggestions, and arquitechture decisions, and only using them if they made sense.
- Ai was also used to make this file.
