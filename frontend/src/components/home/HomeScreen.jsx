import React from "react";
import { Link } from "react-router";
import TopNavbar from "../layout/TopNavbar";
import HeroIntro from "./HeroIntro";
import AudienceJoinBox from "./AudienceJoinBox";
import HostBox from "./HostBox";

export default function HomeScreen() {
  return (
    <div className="h-screen w-full overflow-hidden flex flex-col bg-base-100">
      <TopNavbar />

      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center px-8 gap-8">
        <div className="flex-1 flex flex-col items-center lg:items-start space-y-5">
          <HeroIntro />

          <div className="flex flex-wrap gap-2">
            <Link to="/student" className="btn btn-sm btn-secondary">
              Student Screen
            </Link>
            <Link to="/teacher" className="btn btn-sm btn-accent">
              Teacher Screen
            </Link>
            <Link to="/end" className="btn btn-sm btn-neutral">
              End Session
            </Link>
          </div>
        </div>

        <div className="divider lg:divider-horizontal" />

        <div className="flex-1 flex flex-col justify-center space-y-6 w-full max-w-md">
          <AudienceJoinBox />
          <div className="divider my-0" />
          <HostBox />
        </div>
      </div>
    </div>
  );
}
