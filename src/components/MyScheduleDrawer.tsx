import React, { useState } from 'react';
import { X, Trash2, Copy, Check, Clock, MapPin, Calendar } from 'lucide-react';
import { TIMETABLE_DATA, STALLS_DATA } from '../data/festivalData';

interface MyScheduleDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedItemIds: string[];
  onToggleBookmark: (id: string) => void;
  onClearAll: () => void;
}

export const MyScheduleDrawer: React.FC<MyScheduleDrawerProps> = ({
  isOpen,
  onClose,
  savedItemIds,
  onToggleBookmark,
  onClearAll
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const savedTimetable = TIMETABLE_DATA.filter((t) => savedItemIds.includes(t.id));
  const savedStalls = STALLS_DATA.filter((s) => savedItemIds.includes(s.id));

  const handleCopyItinerary = () => {
    let text = `【浦山学園祭2026 マイ予定表】\n\n`;
    if (savedTimetable.length > 0) {
      text += `▼ 観覧予定ステージ\n`;
      savedTimetable.forEach((t) => {
        text += `・[DAY ${t.day}] ${t.startTime}-${t.endTime} | ${t.title} (${t.artist}) @ ${t.stageName}\n`;
      });
      text += `\n`;
    }
    if (savedStalls.length > 0) {
      text += `▼ 行きたい模擬店・展示\n`;
      savedStalls.forEach((s) => {
        text += `・${s.name} (${s.categoryLabel}) @ ${s.location}\n`;
      });
    }
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#101014] border-l border-zinc-800 w-full max-w-md h-full flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-800">
          <div>
            <span className="text-[11px] font-mono-nums text-red-500 font-bold uppercase tracking-wider">
              PERSONAL ITINERARY
            </span>
            <h3 className="text-lg font-bold text-white font-display">
              マイフェス予定表
            </h3>
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
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {savedTimetable.length === 0 && savedStalls.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <Calendar className="w-10 h-10 text-zinc-600 mx-auto" />
              <p className="text-sm font-semibold text-zinc-400">
                まだ保存された予定はありません
              </p>
              <p className="text-xs text-zinc-500 max-w-xs mx-auto leading-relaxed">
                タイムテーブルや模擬店一覧のブックマークアイコンを押すと、自分専用のスケジュール表を作成できます。
              </p>
            </div>
          ) : (
            <>
              {savedTimetable.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-mono-nums text-zinc-400 font-semibold uppercase flex items-center justify-between">
                    <span>ステージ・演目 ({savedTimetable.length}件)</span>
                  </h4>
                  <div className="space-y-2">
                    {savedTimetable.map((item) => (
                      <div
                        key={item.id}
                        className="bg-zinc-950 p-4 rounded-xl border border-zinc-800/80 flex items-start justify-between gap-3"
                      >
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2 text-xs font-mono-nums text-red-400 font-bold">
                            <Clock className="w-3.5 h-3.5" />
                            <span>DAY {item.day} · {item.startTime} - {item.endTime}</span>
                          </div>
                          <div className="text-sm font-bold text-white truncate">
                            {item.title}
                          </div>
                          <div className="text-xs text-zinc-400">
                            {item.artist} · {item.stageName}
                          </div>
                        </div>
                        <button
                          onClick={() => onToggleBookmark(item.id)}
                          className="p-1.5 text-zinc-500 hover:text-red-400 rounded hover:bg-zinc-900 transition-colors"
                          title="削除"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {savedStalls.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-mono-nums text-zinc-400 font-semibold uppercase">
                    模擬店・展示ブース ({savedStalls.length}件)
                  </h4>
                  <div className="space-y-2">
                    {savedStalls.map((stall) => (
                      <div
                        key={stall.id}
                        className="bg-zinc-950 p-4 rounded-xl border border-zinc-800/80 flex items-start justify-between gap-3"
                      >
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2 text-xs font-mono-nums text-zinc-400">
                            <MapPin className="w-3.5 h-3.5 text-red-500" />
                            <span>{stall.location}</span>
                          </div>
                          <div className="text-sm font-bold text-white truncate">
                            {stall.name}
                          </div>
                          <div className="text-xs text-zinc-400">
                            {stall.organization} · {stall.priceRange}
                          </div>
                        </div>
                        <button
                          onClick={() => onToggleBookmark(stall.id)}
                          className="p-1.5 text-zinc-500 hover:text-red-400 rounded hover:bg-zinc-900 transition-colors"
                          title="削除"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        {(savedTimetable.length > 0 || savedStalls.length > 0) && (
          <div className="p-4 border-t border-zinc-800 bg-zinc-950/60 flex items-center justify-between gap-3">
            <button
              onClick={onClearAll}
              className="text-xs text-zinc-500 hover:text-red-400 transition-colors"
            >
              すべてクリア
            </button>

            <button
              onClick={handleCopyItinerary}
              className="px-4 py-2.5 text-xs font-bold text-white bg-red-600 hover:bg-red-500 rounded-lg shadow-[0_0_12px_rgba(239,68,68,0.3)] transition-all flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'コピー完了！' : '予定表テキストをコピー'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
