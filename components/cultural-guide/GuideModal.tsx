
import React from "react";

export interface GuideContent {
  title: string;
  points: string[];
  warnings: string[];
}

interface GuideModalProps {
  guide: GuideContent | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function GuideModal({ guide, isOpen, onClose }: GuideModalProps) {
  if (!isOpen || !guide) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
        <h3 className="text-lg font-bold text-stone-900 border-b border-stone-200 pb-2">{guide.title}</h3>
        <div className="space-y-2">
          <h4 className="text-sm font-bold text-stone-700">نکات کلیدی:</h4>
          <ul className="list-disc pr-4 text-xs space-y-1">
             {guide.points.map((p, i) => <li key={i} className="text-stone-600">{p}</li>)}
          </ul>
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-bold text-amber-700">هشدارهای مهم:</h4>
          <ul className="list-disc pr-4 text-xs space-y-1">
             {guide.warnings.map((w, i) => <li key={i} className="text-amber-800">{w}</li>)}
          </ul>
        </div>
        <button onClick={onClose} className="w-full bg-stone-900 text-white rounded-xl py-2.5 text-xs font-bold hover:bg-stone-800 transition-colors">بستن</button>
      </div>
    </div>
  );
}
