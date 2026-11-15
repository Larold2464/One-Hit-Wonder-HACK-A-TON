import React, { useState } from "react";
import { useParticipant } from "../../context/ParticipantContext";
import { useCreateQuestion } from "../../hooks/useQuestion";

const MAX_TEXT = 300; // backend limit
const MAX_TITLE = 100; // Question.title max_length

export default function AskQuestionCard() {
  const { participant } = useParticipant();
  const createQuestion = useCreateQuestion();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const canSend = text.trim().length > 0 && !createQuestion.isPending;

  const handleSend = (e) => {
    e.preventDefault();
    if (!canSend) return;
    const cleanText = text.trim();
    createQuestion.mutate(
      {
        session_id: participant.session_id,
        participant_token: participant.participant_token,
        text: cleanText,
        // title is optional in the UI; fall back to the start of the question
        title: (title.trim() || cleanText).slice(0, MAX_TITLE),
      },
      {
        onSuccess: () => {
          setTitle("");
          setText("");
        },
      },
    );
  };

  return (
    <form onSubmit={handleSend} className="card bg-base-200/60 border-2 border-base-300 h-full">
      <div className="card-body p-5 flex flex-col gap-3">
        <h2 className="card-title text-base font-bold">Ask A Question</h2>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={MAX_TITLE}
          placeholder="Short topic / title (optional)"
          className="input input-bordered input-sm bg-base-100 w-full"
        />

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={MAX_TEXT}
          placeholder="Type the question...."
          className="textarea textarea-bordered bg-base-100 w-full flex-1 text-sm leading-relaxed resize-none"
        />
        <div className="text-[11px] opacity-60 text-right -mt-2">
          {text.length} / {MAX_TEXT}
        </div>

        {createQuestion.isError && (
          <p className="text-error text-xs">
            {createQuestion.error.message || "Could not send the question"}
          </p>
        )}

        <div className="card-actions justify-center pt-1">
          <button type="submit" className="btn btn-primary btn-sm px-12" disabled={!canSend}>
            {createQuestion.isPending ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </form>
  );
}
