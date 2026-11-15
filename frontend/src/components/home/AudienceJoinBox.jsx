import React from "react";
import { Link } from "react-router";

export default function AudienceJoinBox() {
  return (
    <div className="flex flex-col items-center space-y-3">
      <h2 className="text-2xl font-bold">Audience</h2>
      <p className="text-sm opacity-75">Type the room code to join</p>
      <div className="flex gap-2 w-full max-w-xs">
        <input
          placeholder="Enter room code"
          className="input input-bordered flex-1 text-center"
        />
        <Link to="/student" className="btn btn-primary px-6">
          JOIN
        </Link>
      </div>
    </div>
  );
}
