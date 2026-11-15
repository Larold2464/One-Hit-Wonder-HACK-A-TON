import React from "react";
import { QRCodeSVG } from "qrcode.react";

export default function QrCodePanel({ roomNumber }) {
  const joinUrl = new URL("/", window.location.origin);
  joinUrl.searchParams.set("code", roomNumber);

  return (
    <div className="lg:w-72 shrink-0 flex flex-col min-h-0">
      <div className="flex items-center justify-between h-6 mb-2 px-1">
        <span className="text-sm font-semibold">Scan to join!</span>
      </div>

      <div className="bg-base-200/50 border-2 border-base-300 rounded-box flex-1 flex flex-col items-center justify-center p-6 gap-4 text-center">
        <div className="bg-base-100 border border-base-300 rounded-box p-4 shadow-sm">
          <QRCodeSVG value={joinUrl.toString()} size={144} includeMargin />
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
