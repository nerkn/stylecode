import React, { useState } from 'react';
import { QRScanner } from './components/QRScanner';

function App() {
  const [url, setUrl] = useState<string | null>(null);

  const handleQRResult = (result: string) => {
    if (result.startsWith('http')) {
      setUrl(result);
    }
  };

  if (url) {
    return (
      <div className="min-h-screen bg-black">
        <div className="fixed inset-0 flex flex-col">
          <iframe src={url} className="w-full h-full border-none" />
          <div className="absolute bottom-8 left-0 right-0 flex justify-center">
            <button
              onClick={() => setUrl(null)}
              className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Scan New Code
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-8">Scan QR Code</h1>
        <QRScanner onResult={handleQRResult} />
      </div>
    </div>
  );
}

export default App;