import React from "react";
import { Link } from "react-router";

export default function HostBox() {
  return (
    <div className="flex flex-col items-center space-y-3">
      <h2 className="text-2xl font-bold">Host</h2>
      <p className="text-sm opacity-75">Want to make a Room?</p>
      <Link to="/teacher" className="btn btn-primary px-8">
        Host Login
      </Link>
    </div>
  );
}
