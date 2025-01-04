import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { ScanLine, RotateCcw } from 'lucide-react';

interface QRScannerProps {
  onResult: (result: string) => void;
}

export function QRScanner({ onResult }: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(true);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    scannerRef.current = new Html5QrcodeScanner(
      'reader',
      {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 10,
      },
      false
    );

    const success = (decodedText: string) => {
      setIsScanning(false);
      scannerRef.current?.clear();
      onResult(decodedText);
    };

    const error = () => {
      // Ignore errors
    };

    if (isScanning) {
      scannerRef.current.render(success, error);
    }

    return () => {
      scannerRef.current?.clear();
    };
  }, [onResult, isScanning]);

  const handleRescan = () => {
    setIsScanning(true);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {isScanning ? (
        <>
          <div className="mb-4">
            <ScanLine className="w-8 h-8 text-white animate-pulse" />
          </div>
          <div id="reader" className="w-full max-w-sm" />
        </>
      ) : (
        <button
          onClick={handleRescan}
          className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
          Scan Again
        </button>
      )}
    </div>
  );
}