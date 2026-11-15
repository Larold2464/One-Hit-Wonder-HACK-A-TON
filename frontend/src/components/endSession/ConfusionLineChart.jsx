import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function ConfusionLineChart({
  chartPoints,
  totalParticipants,
  avgConfusion,
}) {
  return (
    <div className="flex flex-col space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold">Class Confusion Chart</span>
        <span className="badge badge-sm badge-outline whitespace-nowrap text-base-content/70 border-base-content/30">
          Scale 1 (Clear) – 5 (Lost)
        </span>
      </div>

      <div className="card bg-neutral text-neutral-content border-2 border-base-300 p-4 shadow-sm">
        <LineChart
          style={{ width: "100%", height: 220 }}
          responsive
          data={chartPoints}
          margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis domain={[1, 5]} width="auto" />
          <Tooltip />
          <Line
            name="Confusion"
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
        <p className="text-sm font-semibold">
          Total Participants:{" "}
          <span className="text-primary">{totalParticipants}</span>
        </p>
        <p className="text-xs opacity-75">
          Session Avg Confusion:{" "}
          <strong>{Number(avgConfusion).toFixed(1)} / 5.0</strong>
        </p>
      </div>
    </div>
  );
}
