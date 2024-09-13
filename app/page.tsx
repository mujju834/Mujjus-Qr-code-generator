"use client";

import { useState } from "react";
import QRCode from "react-qr-code";

// Helper function to validate URL
const isValidURL = (data: string) => {
  try {
    new URL(data);
    return true;
  } catch (_) {
    return false;
  }
};

export default function Home() {
  const [url, setUrl] = useState("");
  const [qrValue, setQrValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  // Handle QR Code generation
  const handleGenerateQRCode = () => {
    if (!url) {
      alert("Please enter a URL!");
      return;
    }

    if (!isValidURL(url)) {
      alert("Please enter a valid URL!");
      return;
    }

    setIsLoading(true);
    setHasGenerated(true); // Hide previous QR code during loading

    setTimeout(() => {
      setQrValue(url);
      setIsLoading(false);
    }, 2000); // Simulating a 2-second loading
  };

  // Function to download QR code
  const handleDownloadQRCode = () => {
    const svg = document.getElementById("qrcode");
    
    // Check if the SVG element exists
    if (!svg) {
      alert("No QR code available for download.");
      return;
    }
    
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
  
    // Check if 'ctx' is not null
    if (!ctx) {
      alert("Unable to get canvas context.");
      return;
    }
  
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
  
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngFile;
      downloadLink.download = "qr-code.png";
      downloadLink.click();
    };
  
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };
  
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-5">
      <h1 className="text-4xl font-bold mb-5 text-center">Mujju - QR Code Generator</h1>
      <p className="text-center text-lg mb-5">Generate QR codes quickly by entering any valid URL below!</p>

      <div className="bg-white rounded-lg shadow-lg p-8 text-gray-800 max-w-md w-full">
        <p className="text-lg mb-4 text-center">Enter a URL to generate a QR code:</p>

        {/* Textarea for URL input */}
        <textarea
          placeholder="Enter a URL for the QR code"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm mb-5"
        />

        {/* Generate QR Code Button */}
        <button
          onClick={handleGenerateQRCode}
          className={`w-full py-3 px-6 bg-indigo-600 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            isLoading ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex justify-center items-center">
              <svg
                className="animate-spin mr-2 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
                ></path>
              </svg>
              Generating...
            </span>
          ) : (
            "Generate QR Code"
          )}
        </button>

        {/* QR Code Display */}
        <div className="mt-8 flex justify-center">
          {hasGenerated && !isLoading && qrValue && (
            <div className="p-4 bg-gray-100 rounded-lg shadow-md">
              <QRCode id="qrcode" value={qrValue} />
            </div>
          )}
        </div>

        {/* Download QR Code Button */}
        {!isLoading && qrValue && (
          <button
            onClick={handleDownloadQRCode}
            className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-lg shadow-md mt-5 hover:bg-green-700 transition"
          >
            Download QR Code
          </button>
        )}
      </div>
    </div>
  );
}
