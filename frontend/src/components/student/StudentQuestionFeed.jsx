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
        {questions.map((q) => {
          const isAnswered = q.status === "ANSWERED";

          return (
            <div
              key={q.id}
              className={`card border p-3.5 shadow-sm ${
                isAnswered
                  ? "bg-base-200/70 border-base-300 opacity-75"
                  : "bg-base-100 border-base-300"
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <div className="flex items-center flex-wrap gap-2">
                  <span className="font-bold text-sm">{q.title}</span>

                  {isAnswered && (
                    <span className="badge badge-success badge-sm">
                      Answered
                    </span>
                  )}
                </div>

                <span className="text-xs opacity-60 font-mono whitespace-nowrap">
                  {new Date(q.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              <p className="text-xs opacity-90 leading-relaxed">{q.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
