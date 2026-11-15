import React from 'react';

export default function QrCodePanel({ roomNumber }) {
  return (
    <div className="lg:w-72 shrink-0 flex flex-col min-h-0">
      <div className="flex items-center justify-between h-6 mb-2 px-1">
        <span className="text-sm font-semibold">Scan to join!</span>
      </div>

      <div className="bg-base-200/50 border-2 border-base-300 rounded-box flex-1 flex flex-col items-center justify-center p-6 gap-4 text-center">
        <div className="bg-base-100 border border-base-300 rounded-box p-4 shadow-sm">
          <svg
            className="w-36 h-36"
            viewBox="0 0 100 100"
            fill="currentColor"
          >
            <rect x="10" y="10" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="6" />
            <rect x="18" y="18" width="12" height="12" />
            <rect x="62" y="10" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="6" />
            <rect x="70" y="18" width="12" height="12" />
            <rect x="10" y="62" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="6" />
            <rect x="18" y="70" width="12" height="12" />
            <rect x="46" y="14" width="8" height="8" />
            <rect x="46" y="30" width="8" height="16" />
            <rect x="14" y="46" width="16" height="8" />
            <rect x="46" y="54" width="16" height="8" />
            <rect x="70" y="46" width="16" height="8" />
            <rect x="46" y="70" width="8" height="18" />
            <rect x="62" y="62" width="12" height="12" />
            <rect x="78" y="74" width="12" height="14" />
          </svg>
        </div>

        <div>
          <p className="font-mono font-bold text-base">Room #{roomNumber}</p>
          <p className="text-xs opacity-70 mt-0.5">
            Scan QR code or enter room code
          </p>
        </div>
      </div>
    </div>
  );
}
