import React, { useState } from 'react';
import { Phone } from 'lucide-react';
import EmergencyNumbersModal from './EmergencyNumbersModal';

const EmergencyNumbersButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 bg-red-650 hover:bg-red-700 text-white p-4 rounded-full shadow-lg flex items-center gap-2 hover:scale-105 transition-all"
        title="شماره‌های اضطراری اتریش"
      >
        <Phone className="w-6 h-6" />
        <span className="font-black text-sm hidden sm:inline">شماره‌های اضطراری</span>
      </button>
      <EmergencyNumbersModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default EmergencyNumbersButton;
