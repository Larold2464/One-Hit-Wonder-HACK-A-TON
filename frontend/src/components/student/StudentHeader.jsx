import React from "react";
import { Link } from "react-router";

export default function StudentHeader({ roomNumber }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <Link to="/" className="btn btn-outline btn-sm px-5 font-bold">
        Feedy
      </Link>

      <div className="badge badge-outline badge-lg py-4 px-4 font-mono text-xs sm:text-sm">
        Connected To: <strong className="ml-1 underline">#{roomNumber}</strong>
      </div>
    </div>
  );
}
