import React from 'react';
import { X, MapPin, Bookmark, Utensils, Clock, Users } from 'lucide-react';
import { StallItem } from '../data/festivalData';

interface StallModalProps {
  stall: StallItem | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleBookmark: (id: string) => void;
}

export const StallModal: React.FC<StallModalProps> = ({
  stall,
  onClose,
  isSaved,
  onToggleBookmark
}) => {
  if (!stall) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#101014] border border-zinc-800 w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
          <span className="font-mono-nums text-[11px] text-zinc-400 font-bold uppercase tracking-wider">
            {stall.categoryLabel}
          </span>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
            aria-label="閉じる"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-nums text-red-400 font-bold">
              <MapPin className="w-3.5 h-3.5" />
              <span>{stall.location}</span>
              <span className="text-zinc-600">·</span>
              <span>目安価格: {stall.priceRange}</span>
            </div>
            <h3 className="font-display text-2xl font-black text-white mt-1">
              {stall.name}
            </h3>
            <div className="text-xs text-zinc-400 mt-1">
              運営: {stall.organization}
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-zinc-950 rounded-xl border border-zinc-800 text-xs">
            <span
              className={`font-mono-nums text-[11px] font-bold px-2 py-0.5 rounded ${
                stall.congestion === 'crowded'
                  ? 'bg-rose-950/80 text-rose-300 border border-rose-800'
                  : stall.congestion === 'normal'
                  ? 'bg-amber-950/80 text-amber-300 border border-amber-800'
                  : 'bg-emerald-950/80 text-emerald-300 border border-emerald-800'
              }`}
            >
              現在の状況: {stall.congestionLabel}
            </span>
            <span className="text-zinc-400 font-mono-nums">
              {stall.waitTimeMinutes > 0 ? `待ち時間 約${stall.waitTimeMinutes}分` : '即時案内中'}
            </span>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-mono-nums text-zinc-400 font-semibold uppercase">
              企画・店舗紹介
            </h4>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed bg-zinc-950 p-4 rounded-xl border border-zinc-800">
              {stall.description}
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-mono-nums text-zinc-400 font-semibold uppercase">
              おすすめメニュー / 見どころ
            </h4>
            <div className="bg-zinc-950 rounded-xl border border-zinc-800 divide-y divide-zinc-900 font-mono-nums text-xs">
              {stall.menuOrHighlights.map((m, idx) => (
                <div key={idx} className="p-3 text-zinc-200 flex items-center gap-2">
                  <span className="text-red-500 font-bold">›</span>
                  <span>{m}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-950/60 flex items-center justify-between">
          <button
            onClick={() => onToggleBookmark(stall.id)}
            className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all flex items-center gap-2 ${
              isSaved
                ? 'bg-red-600 border-red-500 text-white shadow-[0_0_12px_rgba(239,68,68,0.3)]'
                : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>{isSaved ? '予定から外す' : '行きたいリストに追加'}</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};
