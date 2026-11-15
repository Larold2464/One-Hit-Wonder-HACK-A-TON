import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ParticipantProvider } from "./context/ParticipantContext";
import HomeScreen from "./components/home/HomeScreen";
import TeacherScreen from "./components/teacher/TeacherScreen";
import StudentScreen from "./components/student/StudentScreen";
import EndSessionScreen from "./components/endSession/EndSessionScreen";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ParticipantProvider>
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
      </ParticipantProvider>
    </QueryClientProvider>
  );
}
