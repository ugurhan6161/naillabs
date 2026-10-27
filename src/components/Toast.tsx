import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2 } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useApp();
  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce duration-300">
      <div className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#1b1b1b] text-white shadow-xl border border-[#a9876d]/40">
        <CheckCircle2 className="w-5 h-5 text-[#a9876d] shrink-0" />
        <span className="text-xs md:text-sm font-medium tracking-wide">{toastMessage}</span>
      </div>
    </div>
  );
};
