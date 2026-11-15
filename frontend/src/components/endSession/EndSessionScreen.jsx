import React from "react";
import { Link } from "react-router";
import SessionQuestionArchive from "./SessionQuestionArchive";
import ConfusionLineChart from "./ConfusionLineChart";

export default function EndSessionScreen({ sessionData }) {
  const chartPoints = sessionData.timeline.map((point) => ({
    time: new Date(point.timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    value: point.avg_confusion,
  }));

  return (
    <div className="h-screen w-full overflow-hidden flex flex-col bg-base-100 p-6 gap-6">
      <div className="flex items-center justify-between border-b border-base-300 pb-3">
        <div>
          <h1 className="text-2xl font-bold">End Session</h1>
          <p className="text-xs opacity-75">Room: #{sessionData.code}</p>
        </div>
        <div className="flex gap-2">
          <Link to="/teacher" className="btn btn-sm btn-outline">
            Back to Session
          </Link>
          <Link to="/" className="btn btn-sm btn-primary">
            Home
          </Link>
        </div>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 min-h-0 flex flex-col">
          <SessionQuestionArchive questions={sessionData.questions} />
        </div>
        <div className="lg:col-span-7 flex flex-col justify-center">
          <ConfusionLineChart
            chartPoints={chartPoints}
            totalParticipants={sessionData.total_participants}
            avgConfusion={sessionData.avg_confusion}
          />
        </div>
      </div>
    </div>
  );
}
