import React from "react";

export default function StudentQuestionFeed({ questions }) {
  return (
    <div className="card bg-base-200/60 border-2 border-base-300 h-full min-h-0 flex flex-col p-5 gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold">
          Live Questions ({questions.length})
        </h2>
        <span className="text-xs opacity-70">Anonymous session feed</span>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto space-y-2.5 pr-1">
        {questions.map((q) => (
          <div
            key={q.id}
            className="card bg-base-100 border border-base-300 p-3.5 shadow-sm"
          >
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="font-bold text-sm">{q.title}</span>
              <span className="text-xs opacity-60 font-mono">
                {new Date(q.created_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <p className="text-xs opacity-90 leading-relaxed">{q.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
