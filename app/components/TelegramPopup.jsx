"use client";
import { useState, useEffect } from "react";

export default function TelegramPopup() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShowPopup(false);
  };

  const handleJoinTelegram = () => {
    window.open("https://t.me/hexTheme", "_blank");
    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-xs w-full mx-4 transform transition-all duration-300 scale-100 shadow-2xl">
        <div className="relative">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors z-10"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Popup content */}
          <div className="p-6 text-center">
            {/* Telegram icon */}
            <div className="mb-4">
              <div className="bg-blue-500 rounded-full w-14 h-14 mx-auto flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                </svg>
              </div>
            </div>
            
            <h3 className="text-lg font-bold text-gray-800 mb-3">
              🔥 Free Premium Sex Videos!
            </h3>
            
            <p className="text-gray-600 mb-6 text-sm">
              Available on Telegram<br/>
              <span className="font-semibold">Join and Watch</span>
            </p>
            
            <button
              onClick={handleJoinTelegram}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
              </svg>
              <span>Join Telegram</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
