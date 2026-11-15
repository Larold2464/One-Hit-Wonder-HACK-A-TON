import React from "react";
import { Link, Navigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { usePulse, useTimeline } from "../../hooks/useSession";
import { useQuestions } from "../../hooks/useQuestion";
import { displayAverage } from "../../utils/confusion";
import SessionQuestionArchive from "./SessionQuestionArchive";
import ConfusionLineChart from "./ConfusionLineChart";

// Data comes from AuthContext.hostSession:
//   timeline  -> the snapshots the teacher screen saved once a minute
//   questions -> every question asked in the session
//   pulse     -> current participant count
export default function EndSessionScreen() {
  const { isAuthenticated, hostSession, clearHostSession } = useAuth();
  const sessionId = hostSession?.session_id;

  const { data: timelineData, isLoading } = useTimeline(sessionId);
  const { data: questionData } = useQuestions(sessionId);
  const { data: pulse } = usePulse(sessionId);

  if (!isAuthenticated || !hostSession) return <Navigate to="/" replace />;

  const timeline = timelineData?.timeline ?? [];

  const chartPoints = timeline.map((point) => ({
    time: new Date(point.timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    // null leaves a gap for minutes when nobody was active
    value: point.total_participants ? displayAverage(point.avg_confusion, 1) : null,
  }));

  const activePoints = timeline.filter((p) => p.total_participants);
  const sessionAvg = activePoints.length
    ? activePoints.reduce((sum, p) => sum + displayAverage(p.avg_confusion, 1), 0) /
      activePoints.length
    : 0;

  // Peak attendance across the session (the live count drops as students leave)
  const totalParticipants = Math.max(
    pulse?.total_participants ?? 0,
    ...timeline.map((p) => p.total_participants),
  );

  return (
    <div className="h-screen w-full overflow-hidden flex flex-col bg-base-100 p-6 gap-6">
      <div className="flex items-center justify-between border-b border-base-300 pb-3">
        <div>
          <h1 className="text-2xl font-bold">End Session · {hostSession.title}</h1>
          <p className="text-xs opacity-75">Room: #{hostSession.code}</p>
        </div>
        <div className="flex gap-2">
          <Link to="/teacher" className="btn btn-sm btn-outline">
            Back to Session
          </Link>
          {/* Finish forgets this session so the home page offers a fresh start */}
          <Link to="/" onClick={clearHostSession} className="btn btn-sm btn-primary">
            Finish
          </Link>
        </div>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 min-h-0 flex flex-col">
          <SessionQuestionArchive questions={questionData?.questions ?? []} />
        </div>
        <div className="lg:col-span-7 flex flex-col justify-center">
          {!isLoading && timeline.length === 0 && (
            <p className="text-xs opacity-60 mb-2">
              No chart points yet: the teacher screen saves one every minute.
            </p>
          )}
          <ConfusionLineChart
            chartPoints={chartPoints}
            totalParticipants={totalParticipants}
            avgConfusion={sessionAvg}
          />
        </div>
      </div>
    </div>
  );
}
