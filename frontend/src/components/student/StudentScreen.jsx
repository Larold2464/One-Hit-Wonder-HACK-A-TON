import React from "react";
import StudentHeader from "./StudentHeader";
import AskQuestionCard from "./AskQuestionCard";
import ConfusionLevelSelector from "./ConfusionLevelSelector";
import StudentQuestionFeed from "./StudentQuestionFeed";

export default function StudentScreen({ sessionData }) {
  return (
    <div className="h-screen w-full overflow-hidden flex flex-col bg-base-100 p-6 gap-5">
      <StudentHeader roomNumber={sessionData.code} />

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AskQuestionCard />
        <StudentQuestionFeed questions={sessionData.questions} />
      </div>

      <ConfusionLevelSelector selectedLevel={sessionData.avg_confusion} />
    </div>
  );
}
