import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useJoinSession } from "../../hooks/useStudent";

// Student entry point. useJoinSession saves the response into ParticipantContext,
// so all we do here is navigate once it succeeds.
export default function AudienceJoinBox() {
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const join = useJoinSession();

  const handleJoin = (e) => {
    e.preventDefault();
    if (!code.trim()) return;
    join.mutate({ code }, { onSuccess: () => navigate("/student") });
  };

  return (
    <form onSubmit={handleJoin} className="flex flex-col items-center space-y-3">
      <h2 className="text-2xl font-bold">Audience</h2>
      <p className="text-sm opacity-75">Type the room code to join</p>
      <div className="flex gap-2 w-full max-w-xs">
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter room code"
          className="input input-bordered flex-1 text-center"
        />
        <button
          type="submit"
          className="btn btn-primary px-6"
          disabled={join.isPending || !code.trim()}
        >
          {join.isPending ? "..." : "JOIN"}
        </button>
      </div>
      {join.isError && (
        <p className="text-error text-xs">{join.error.message || "Could not join"}</p>
      )}
    </form>
  );
}
