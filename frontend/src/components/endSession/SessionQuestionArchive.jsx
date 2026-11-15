import React from "react";

export default function SessionQuestionArchive({ questions }) {
  return (
    <div className="flex-1 min-h-0 flex flex-col">
      <div className="text-xs font-semibold mb-2">
        Session Questions ({questions.length})
      </div>

      <div className="bg-base-200/50 border-2 border-base-300 rounded-box flex-1 min-h-0 overflow-y-auto p-3 space-y-2.5">
        {questions.map((q) => {
          const isAnswered = q.status === "ANSWERED";

          return (
            <div
              key={q.id}
              className={`card border p-3 shadow-sm ${
                isAnswered
                  ? "bg-base-200/70 border-base-300 opacity-75"
                  : "bg-base-100 border-base-300"
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <div className="flex items-center flex-wrap gap-2">
                  <h3 className="font-bold text-sm">{q.title}</h3>

                  {isAnswered && (
                    <span className="badge badge-success badge-sm">
                      Answered
                    </span>
                  )}
                </div>

                <span className="text-[11px] font-mono opacity-70 whitespace-nowrap">
                  {new Date(q.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              <p className="text-xs opacity-85">{q.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
