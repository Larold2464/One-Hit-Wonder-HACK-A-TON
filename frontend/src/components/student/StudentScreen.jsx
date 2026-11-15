import React from "react";
import { Navigate } from "react-router";
import { useParticipant } from "../../context/ParticipantContext";
import { useHeartbeat } from "../../hooks/useStudent";
import { useQuestions } from "../../hooks/useQuestion";
import StudentHeader from "./StudentHeader";
import AskQuestionCard from "./AskQuestionCard";
import ConfusionLevelSelector from "./ConfusionLevelSelector";
import StudentQuestionFeed from "./StudentQuestionFeed";

// Data comes from ParticipantContext (set by the JOIN button on the home page).
// AskQuestionCard and ConfusionLevelSelector read the context themselves for the token.
export default function StudentScreen() {
  const { participant } = useParticipant();

  const { data: questionData } = useQuestions(participant?.session_id);
  useHeartbeat(participant?.participant_token); // keeps this student counted as active

  // Not joined, or the context was cleared (session ended / token rejected)
  if (!participant) return <Navigate to="/" replace />;

  return (
    <div className="h-screen w-full overflow-hidden flex flex-col bg-base-100 p-6 gap-5">
      <StudentHeader roomNumber={participant.code ?? participant.session_title} />

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AskQuestionCard />
        <StudentQuestionFeed questions={questionData?.questions ?? []} />
      </div>

      <ConfusionLevelSelector />
    </div>
  );
}
