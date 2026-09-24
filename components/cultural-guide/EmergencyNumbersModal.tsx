import React from 'react';
import { X, Phone, ShieldAlert, Ambulance, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface EmergencyNumbersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const emergencyNumbers = [
  { name: 'پلیس عمومی', number: '۱۳۳', icon: ShieldAlert, color: 'text-blue-600' },
  { name: 'آتش‌نشانی', number: '۱۲۲', icon: Flame, color: 'text-red-600' },
  { name: 'آمبولانس و اورژانس', number: '۱۴۴', icon: Ambulance, color: 'text-emerald-600' },
  { name: 'امداد عمومی اروپا', number: '۱۱۲', icon: Phone, color: 'text-amber-600' },
];

const EmergencyNumbersModal: React.FC<EmergencyNumbersModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
            dir="rtl"
          >
            <button onClick={onClose} className="absolute top-4 left-4 p-1 hover:bg-stone-100 rounded-full">
              <X className="w-5 h-5 text-stone-500" />
            </button>
            <h2 className="text-xl font-black text-stone-900 mb-6 text-center">شماره‌های اضطراری اتریش</h2>
            <div className="space-y-4">
              {emergencyNumbers.map((item, index) => (
                <a
                  key={index}
                  href={`tel:${item.number}`}
                  className="flex items-center justify-between p-4 bg-stone-50 rounded-2xl border border-stone-100 hover:border-red-200 hover:bg-red-50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                    <span className="font-bold text-stone-700">{item.name}</span>
                  </div>
                  <span className="font-mono text-lg font-black text-stone-900 group-hover:text-red-700">
                    {item.number}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EmergencyNumbersModal;
