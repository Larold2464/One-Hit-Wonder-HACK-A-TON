import React from "react";

const TWO_MINUTES = 2 * 60 * 1000;

export default function QuestionCard({ question, onToggleStatus }) {
  const isAnswered = question.status === "ANSWERED";
  // Re-checked on every render; the question list refetches every 3s
  const isRedAlert =
    !isAnswered &&
    Date.now() - new Date(question.created_at).getTime() > TWO_MINUTES;

  return (
    <div
      className={`card border ${
        isRedAlert
          ? "bg-error text-error-content border-error shadow-sm"
          : isAnswered
            ? "bg-base-200/70 border-base-300 opacity-75"
            : "bg-base-100 border-base-300"
      }`}
    >
      <div className="card-body p-4 gap-1.5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-bold text-base leading-snug">
              {question.title}
            </h3>
            {isRedAlert && (
              <span className="badge badge-sm bg-base-100 text-error border-0 font-semibold">
                Notice: &gt;2m Unanswered
              </span>
            )}
            {isAnswered && (
              <span className="badge badge-success badge-sm">Answered</span>
            )}
          </div>

          <span className="text-xs opacity-80 whitespace-nowrap font-mono">
            {new Date(question.created_at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>

        <p className="text-sm leading-relaxed">{question.text}</p>

        <div className="card-actions justify-end items-center mt-2 pt-1 border-t border-current/10">
          <button
            type="button"
            onClick={() => onToggleStatus?.(question)}
            className={`btn btn-xs ${
              isRedAlert
                ? "bg-base-100 text-error hover:bg-base-200 border-0"
                : isAnswered
                  ? "btn-neutral btn-outline"
                  : "btn-primary btn-outline"
            }`}
          >
            {isAnswered ? "Reopen" : "Mark Answered"}
          </button>
        </div>
      </div>
    </div>
  );
}
