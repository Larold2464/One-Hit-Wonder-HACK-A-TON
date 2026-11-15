import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { INITIAL_SESSION_DATA } from "./data/mockSessionData";
import HomeScreen from "./components/home/HomeScreen";
import TeacherScreen from "./components/teacher/TeacherScreen";
import StudentScreen from "./components/student/StudentScreen";
import EndSessionScreen from "./components/endSession/EndSessionScreen";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen w-full bg-base-100 text-base-content">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route
            path="/teacher"
            element={<TeacherScreen sessionData={INITIAL_SESSION_DATA} />}
          />
          <Route
            path="/student"
            element={<StudentScreen sessionData={INITIAL_SESSION_DATA} />}
          />
          <Route
            path="/end"
            element={<EndSessionScreen sessionData={INITIAL_SESSION_DATA} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
