import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import HomeScreen from "./components/home/HomeScreen";
import TeacherScreen from "./components/teacher/TeacherScreen";
import StudentScreen from "./components/student/StudentScreen";
import EndSessionScreen from "./components/endSession/EndSessionScreen";

// Screens no longer get `sessionData` props. Each one reads its own context:
//   /teacher, /end -> AuthContext (logged-in teacher + hostSession)
//   /student       -> ParticipantContext (joined student)
// and sends you back to "/" if that context is empty.
// The mock data stays in src/data/mockSessionData.js for UI work without the backend.
export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen w-full bg-base-100 text-base-content">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/teacher" element={<TeacherScreen />} />
          <Route path="/student" element={<StudentScreen />} />
          <Route path="/end" element={<EndSessionScreen />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
