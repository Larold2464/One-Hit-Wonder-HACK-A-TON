import React from 'react';
import { useParticipant } from '../../context/ParticipantContext';
import { useSetConfusion } from '../../hooks/useStudent';
import { toApiLevel, toDisplayLevel } from '../../utils/confusion';

const LEVELS = [
  { value: 1, label: '1', desc: 'Following well', colorClass: 'bg-success text-success-content' },
  { value: 2, label: '2', desc: 'Mostly clear', colorClass: 'bg-success/80 text-success-content' },
  { value: 3, label: '3', desc: 'Somewhat unsure', colorClass: 'bg-warning text-warning-content' },
  { value: 4, label: '4', desc: 'Confused', colorClass: 'bg-warning/80 text-warning-content' },
  { value: 5, label: '5', desc: 'Very lost', colorClass: 'bg-error text-error-content' },
];

// Errors that mean this student can't continue: clear the context so the
// student screen redirects back to the join box.
const FATAL_ERRORS = ['This session has ended', 'Participant not found'];

export default function ConfusionLevelSelector() {
  const { participant, updateConfusionLevel, clearParticipant } = useParticipant();
  const setConfusion = useSetConfusion();

  // This student's own level (not the class average), shown on the 1-5 scale
  const selectedLevel = toDisplayLevel(participant.confusion_level ?? 0);

  const choose = (displayLevel) => {
    const previous = participant.confusion_level;
    const apiLevel = toApiLevel(displayLevel);
    updateConfusionLevel(apiLevel); // update the UI right away

    setConfusion.mutate(
      { participant_token: participant.participant_token, confusion_level: apiLevel },
      {
        onError: (err) => {
          if (FATAL_ERRORS.includes(err.message)) clearParticipant();
          else updateConfusionLevel(previous); // undo on a normal failure
        },
      },
    );
  };

  return (
    <div className="space-y-3">
      <div className="card bg-base-100 border-2 border-base-300 py-2.5 px-4 text-center">
        <div className="font-semibold text-sm">
          Confusion Level : <span className="text-primary font-bold">{selectedLevel} / 5</span>
        </div>
        <div className="text-xs opacity-70">How well are you following?</div>
      </div>

      <div className="join w-full border-2 border-base-300 rounded-box overflow-hidden shadow-sm">
        {LEVELS.map((lvl) => (
          <button
            key={lvl.value}
            type="button"
            onClick={() => choose(lvl.value)}
            aria-pressed={selectedLevel === lvl.value}
            className={`join-item flex-1 py-3 px-2 flex flex-col items-center justify-center border-r border-base-300 last:border-r-0 ${lvl.colorClass} ${
              selectedLevel === lvl.value ? 'ring-4 ring-inset ring-base-content/60 font-bold' : 'opacity-70'
            }`}
          >
            <span className="text-base font-bold leading-none">{lvl.label}</span>
            <span className="text-[10px] hidden sm:inline mt-1">{lvl.desc}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
