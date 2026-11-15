import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";
import { ParticipantProvider } from "./context/ParticipantContext";
import "./index.css";

const queryClient = new QueryClient();

// Order matters:
//   QueryClientProvider  -> every useQuery / useMutation hook needs it
//   AuthProvider         -> teacher login + the session the teacher is hosting
//   ParticipantProvider  -> the student who joined from this browser
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ParticipantProvider>
          <App />
        </ParticipantProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
