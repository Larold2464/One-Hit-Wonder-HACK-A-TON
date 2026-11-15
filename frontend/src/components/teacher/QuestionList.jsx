import React from "react";
import QuestionCard from "./QuestionCard";

export default function QuestionList({ questions, onToggleStatus }) {
  return (
    <div className="flex-1 min-h-0 flex flex-col">
      <div className="flex items-center justify-between h-6 mb-2 px-1">
        <span className="text-sm font-semibold">
          Questions ({questions.length})
        </span>
        <span className="text-xs opacity-60">Red = unanswered &gt; 5m</span>
      </div>

      <div className="bg-base-200/50 border-2 border-base-300 rounded-box flex-1 min-h-0 overflow-y-auto p-4 space-y-3">
        {questions.length === 0 && (
          <p className="text-sm opacity-60 text-center py-6">No questions yet.</p>
        )}
        {questions.map((q) => (
          <QuestionCard key={q.id} question={q} onToggleStatus={onToggleStatus} />
        ))}
      </div>
    </div>
  );
}
