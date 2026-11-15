import React from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { usePulse, useSaveSnapshot, useEndSession } from "../../hooks/useSession";
import { useQuestions, useUpdateQuestion } from "../../hooks/useQuestion";
import { displayAverage } from "../../utils/confusion";
import QrCodePanel from "./QrCodePanel";
import QuestionList from "./QuestionList";
import ConfusionMeterBar from "./ConfusionMeterBar";

// Data comes from AuthContext.hostSession (set when the teacher clicks Start):
//   pulse      -> live confusion, refreshes every 3s
//   questions  -> question list, refreshes every 3s
//   snapshot   -> saves one chart point a minute for the end screen

export default function TeacherScreen() {
  const { isAuthenticated, hostSession } = useAuth();
  const navigate = useNavigate();
  const sessionId = hostSession?.session_id;
  const { data: pulse } = usePulse(sessionId);
  const { data: questionData } = useQuestions(sessionId);
  const updateQuestion = useUpdateQuestion(sessionId);
  const endSession = useEndSession();
  useSaveSnapshot(sessionId, !endSession.isSuccess);
  
  


  // All hooks run before this, so the redirect never breaks the rules of hooks
  if (!isAuthenticated || !hostSession) return <Navigate to="/" replace />;

  const questions = questionData?.questions ?? [];
  const participants = pulse?.total_participants ?? 0;

  const toggleStatus = (question) =>
    updateQuestion.mutate({
      question_id: question.id,
      status: question.status === "ANSWERED" ? "PENDING" : "ANSWERED",
    });

  const handleEnd = () =>
    endSession.mutate(sessionId, { onSuccess: () => navigate("/end") });
  return (
    <div className="h-screen w-full overflow-hidden flex flex-col bg-base-100 p-6 gap-4">
      <div className="flex items-center justify-between border-b border-base-300 pb-3">
        <div>
          <h1 className="text-2xl font-bold">{hostSession.title}</h1>
          <p className="text-xs opacity-75">
            Room: #{hostSession.code} · {participants} active
          </p>
        </div>
        <Link to="/" className="btn btn-sm btn-ghost">
          Home
        </Link>
      </div>

      <div className="flex-1 min-h-0 flex flex-col lg:flex-row items-stretch gap-6">
        <QrCodePanel roomNumber={hostSession.code} />
        <QuestionList questions={questions} onToggleStatus={toggleStatus} />
      </div>

      <ConfusionMeterBar
        confusionLevel={displayAverage(pulse?.avg_confusion ?? 0, participants)}
        onEnd={handleEnd}
        isEnding={endSession.isPending}
      />
    </div>
  );
}
