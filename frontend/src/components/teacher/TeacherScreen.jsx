import React from "react";
import { Link } from "react-router";
import QrCodePanel from "./QrCodePanel";
import QuestionList from "./QuestionList";
import ConfusionMeterBar from "./ConfusionMeterBar";

export default function TeacherScreen({ sessionData }) {
  return (
    <div className="h-screen w-full overflow-hidden flex flex-col bg-base-100 p-6 gap-4">
      <div className="flex items-center justify-between border-b border-base-300 pb-3">
        <div>
          <h1 className="text-2xl font-bold">Classroom Session</h1>
          <p className="text-xs opacity-75">Room: #{sessionData.code}</p>
        </div>
        <Link to="/" className="btn btn-sm btn-ghost">
          Home
        </Link>
      </div>

      <div className="flex-1 min-h-0 flex flex-col lg:flex-row items-stretch gap-6">
        <QrCodePanel roomNumber={sessionData.code} />
        <QuestionList questions={sessionData.questions} />
      </div>

      <ConfusionMeterBar
        confusionLevel={sessionData.timeline[0].avg_confusion}
      />
    </div>
  );
}
