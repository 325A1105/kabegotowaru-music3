import React from 'react';
import { X, Clock, MapPin, Music, ListMusic, Bookmark, Users } from 'lucide-react';
import { TimetableItem } from '../data/festivalData';

interface PerformerModalProps {
  item: TimetableItem | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleBookmark: (id: string) => void;
}

export const PerformerModal: React.FC<PerformerModalProps> = ({
  item,
  onClose,
  isSaved,
  onToggleBookmark
}) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#101014] border border-zinc-800 w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <span className="font-mono-nums text-[11px] text-red-500 font-bold uppercase tracking-wider">
              DAY {item.day} · {item.stageName}
            </span>
          </div>
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
              <Clock className="w-3.5 h-3.5" />
              <span>{item.startTime} 〜 {item.endTime}</span>
              <span className="text-zinc-600">·</span>
              <span>{item.genre}</span>
            </div>
            <h3 className="font-display text-2xl font-black text-white mt-1">
              {item.title}
            </h3>
            <div className="text-sm font-semibold text-zinc-300 mt-1">
              出演: {item.artist}
            </div>
          </div>

          <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-2">
            <h4 className="text-xs font-mono-nums text-zinc-400 font-semibold uppercase">
              ステージ概要
            </h4>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {item.description}
            </p>
          </div>

          {item.members && (
            <div className="flex items-center gap-2 text-xs text-zinc-400 bg-zinc-950/60 p-3 rounded-lg border border-zinc-800/80">
              <Users className="w-4 h-4 text-zinc-500 shrink-0" />
              <span>構成・出演: {item.members}</span>
            </div>
          )}

          {item.setlist && item.setlist.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-mono-nums text-zinc-400 font-semibold uppercase">
                <ListMusic className="w-3.5 h-3.5 text-red-500" />
                <span>予定セットリスト / 演奏楽曲</span>
              </div>
              <div className="bg-zinc-950 rounded-xl border border-zinc-800 divide-y divide-zinc-900 font-mono-nums text-xs">
                {item.setlist.map((track, idx) => (
                  <div key={idx} className="p-3 flex items-center justify-between text-zinc-300">
                    <span className="flex items-center gap-2">
                      <span className="text-zinc-600 font-bold">0{idx + 1}.</span>
                      <span>{track}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-950/60 flex items-center justify-between">
          <button
            onClick={() => onToggleBookmark(item.id)}
            className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all flex items-center gap-2 ${
              isSaved
                ? 'bg-red-600 border-red-500 text-white shadow-[0_0_12px_rgba(239,68,68,0.3)]'
                : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>{isSaved ? '予定から外す' : 'マイ予定に追加'}</span>
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
