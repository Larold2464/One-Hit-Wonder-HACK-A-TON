import React from 'react';

const SCREENS = [
  ['home', 'Home'],
  ['teacher', 'Teacher'],
  ['student', 'Student'],
  ['end', 'End Session'],
];

export default function ScreenSwitcherBar({ activeScreen, onSelectScreen }) {
  return (
    <div className="bg-base-300 px-4 py-1.5 flex items-center justify-between text-xs">
      <span className="font-semibold opacity-70">Figma Screens:</span>
      <div role="tablist" className="tabs tabs-boxed tabs-xs bg-base-100">
        {SCREENS.map(([id, label]) => (
          <button
            key={id}
            role="tab"
            onClick={() => onSelectScreen(id)}
            className={`tab ${activeScreen === id ? 'tab-active font-bold' : ''}`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
