import React from "react";
import { Link } from "react-router";

export default function ConfusionMeterBar({ confusionLevel }) {
  const pct = Math.min(100, Math.max(0, (confusionLevel / 5) * 100));

  return (
    <div className="pt-4 border-t border-base-300 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
      <div className="flex-1 space-y-1.5">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span>Class Confusion Level</span>
          <span className="badge badge-sm badge-neutral">
            Avg: {Number(confusionLevel).toFixed(1)} / 5.0
          </span>
        </div>

        <div className="p-2 bg-base-200 border border-base-300 rounded-box flex items-center gap-3">
          <progress
            className="progress progress-warning w-full h-4"
            value={pct}
            max="100"
          ></progress>
        </div>
      </div>

      <Link to="/end" className="btn btn-primary px-8">
        End Session
      </Link>
    </div>
  );
}
