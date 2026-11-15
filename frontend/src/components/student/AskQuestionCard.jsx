import React from 'react';

export default function AskQuestionCard() {
  return (
    <div className="card bg-base-200/60 border-2 border-base-300 h-full">
      <div className="card-body p-5 flex flex-col gap-3">
        <h2 className="card-title text-base font-bold">Ask A Question</h2>

        <input
          type="text"
          placeholder="Short topic / title (optional)"
          className="input input-bordered input-sm bg-base-100 w-full"
        />

        <textarea
          placeholder="Type the question...."
          className="textarea textarea-bordered bg-base-100 w-full flex-1 text-sm leading-relaxed resize-none"
        />

        <div className="card-actions justify-center pt-1">
          <button type="button" className="btn btn-primary btn-sm px-12">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
