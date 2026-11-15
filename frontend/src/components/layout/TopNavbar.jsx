import React from "react";
import { Link } from "react-router";

export default function TopNavbar() {
  return (
    <div className="navbar bg-base-100 border-b border-base-300 px-8">
      <div className="navbar-start">
        <Link
          to="/"
          className="btn btn-ghost text-2xl font-bold tracking-widest"
        >
          FEEDY
        </Link>
      </div>
      <div className="navbar-center"></div>
      <div className="navbar-end"></div>
    </div>
  );
}
