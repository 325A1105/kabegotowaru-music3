import React, { useState } from 'react';
import { Bookmark, Clock, MapPin, Sparkles, User, ListMusic } from 'lucide-react';
import { TIMETABLE_DATA, TimetableItem } from '../data/festivalData';

interface TimetableSectionProps {
  onSelectPerformer: (item: TimetableItem) => void;
  savedItemIds: string[];
  onToggleBookmark: (id: string) => void;
}

export const TimetableSection: React.FC<TimetableSectionProps> = ({
  onSelectPerformer,
  savedItemIds,
  onToggleBookmark,
}) => {
  const [selectedDay, setSelectedDay] = useState<1 | 2>(1);
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');

  const filteredItems = TIMETABLE_DATA.filter((item) => {
    if (item.day !== selectedDay) return false;
    if (selectedStage !== 'all' && item.stage !== selectedStage) return false;
    if (selectedGenre !== 'all' && !item.genre.toLowerCase().includes(selectedGenre.toLowerCase())) return false;
    return true;
  });

  const genres = [
    { id: 'all', label: 'すべてのジャンル' },
    { id: 'rap', label: 'Rap & Hip-Hop' },
    { id: 'rock', label: 'Rock & Loud' },
    { id: 'dance', label: 'Street Dance' },
    { id: 'electro', label: 'DJ & Electro' },
    { id: 'sports', label: 'E-Sports' }
  ];

  return (
    <section id="timetable" className="py-20 border-t border-zinc-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono-nums text-red-500 uppercase tracking-widest font-semibold">
              <span>02. TIMETABLE & LINEUP</span>
              <span className="text-zinc-600" aria-hidden="true">·</span>
              <span>タイムテーブル</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              熱狂のタイムテーブル
            </h2>
            <p className="text-sm text-zinc-400 max-w-xl">
              メインアリーナ、中庭アンダーグラウンド、ブラックボックスの3ステージ。気になる演目はブックマークして自分だけのタイムテーブルを作成可能。
            </p>
          </div>

          {/* Day Segmented Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-zinc-900 border border-zinc-800 rounded-xl self-start md:self-auto">
            <button
              onClick={() => setSelectedDay(1)}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                selectedDay === 1
                  ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              DAY 1 (11.01 SAT)
            </button>
            <button
              onClick={() => setSelectedDay(2)}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                selectedDay === 2
                  ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              DAY 2 (11.02 SUN)
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-zinc-800/80">
          {/* Stage Filters */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
            <button
              onClick={() => setSelectedStage('all')}
              className={`px-3 py-1.5 rounded-lg border transition-colors ${
                selectedStage === 'all'
                  ? 'bg-zinc-800 text-white border-zinc-700'
                  : 'bg-zinc-950 text-zinc-400 border-zinc-800/80 hover:text-zinc-200'
              }`}
            >
              全ステージ
            </button>
            <button
              onClick={() => setSelectedStage('main')}
              className={`px-3 py-1.5 rounded-lg border transition-colors ${
                selectedStage === 'main'
                  ? 'bg-red-950/60 text-red-300 border-red-800'
                  : 'bg-zinc-950 text-zinc-400 border-zinc-800/80 hover:text-zinc-200'
              }`}
            >
              メインアリーナ
            </button>
            <button
              onClick={() => setSelectedStage('underground')}
              className={`px-3 py-1.5 rounded-lg border transition-colors ${
                selectedStage === 'underground'
                  ? 'bg-red-950/60 text-red-300 border-red-800'
                  : 'bg-zinc-950 text-zinc-400 border-zinc-800/80 hover:text-zinc-200'
              }`}
            >
              中庭特設
            </button>
            <button
              onClick={() => setSelectedStage('blackbox')}
              className={`px-3 py-1.5 rounded-lg border transition-colors ${
                selectedStage === 'blackbox'
                  ? 'bg-red-950/60 text-red-300 border-red-800'
                  : 'bg-zinc-950 text-zinc-400 border-zinc-800/80 hover:text-zinc-200'
              }`}
            >
              ブラックボックス
            </button>
          </div>

          {/* Genre Quick Filter */}
          <div className="flex items-center gap-2">
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 rounded-lg px-3 py-1.5 focus:outline-none focus:border-red-500"
              aria-label="ジャンルで絞り込み"
            >
              {genres.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Timetable Cards Grid */}
        <div className="space-y-4">
          {filteredItems.length === 0 ? (
            <div className="p-12 text-center bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-500 text-sm">
              該当する演目が見つかりませんでした。絞り込み条件を変更してください。
            </div>
          ) : (
            filteredItems.map((item) => {
              const isSaved = savedItemIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  className={`bg-[#101014] border rounded-xl p-5 sm:p-6 transition-all hover:border-zinc-700 flex flex-col md:flex-row md:items-center justify-between gap-6 group ${
                    item.featured
                      ? 'border-red-900/60 bg-gradient-to-r from-red-950/20 via-[#101014] to-[#101014]'
                      : 'border-zinc-800/90'
                  }`}
                >
                  {/* Left: Time & Stage */}
                  <div className="flex items-start md:items-center gap-4 shrink-0 md:w-56">
                    <div className="bg-zinc-950 border border-zinc-800 px-3 py-2 rounded-lg text-center shrink-0">
                      <div className="font-mono-nums text-lg font-bold text-white tabular-nums tracking-tight">
                        {item.startTime}
                      </div>
                      <div className="text-[10px] text-zinc-500 font-mono-nums tabular-nums">
                        〜 {item.endTime}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                        <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                        <span className="truncate">{item.stageName}</span>
                      </div>
                      <div className="text-[11px] font-mono-nums text-red-400/90">
                        {item.genre}
                      </div>
                    </div>
                  </div>

                  {/* Center: Title & Description */}
                  <div className="flex-1 space-y-1.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3
                        onClick={() => onSelectPerformer(item)}
                        className="font-display text-lg sm:text-xl font-bold text-white hover:text-red-400 cursor-pointer transition-colors truncate"
                      >
                        {item.title}
                      </h3>
                      {item.featured && (
                        <span className="text-[10px] font-mono-nums bg-red-600/20 border border-red-500/40 text-red-300 font-bold px-2 py-0.5 rounded shrink-0">
                          注目
                        </span>
                      )}
                    </div>
                    <div className="text-sm font-semibold text-zinc-300">
                      {item.artist}
                    </div>
                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                    <button
                      onClick={() => onSelectPerformer(item)}
                      className="px-3 py-2 text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
                    >
                      <ListMusic className="w-3.5 h-3.5" />
                      <span>詳細・セトリ</span>
                    </button>

                    <button
                      onClick={() => onToggleBookmark(item.id)}
                      className={`p-2 rounded-lg border transition-all ${
                        isSaved
                          ? 'bg-red-600 border-red-500 text-white shadow-[0_0_10px_rgba(239,68,68,0.4)]'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                      }`}
                      title={isSaved ? '予定から外す' : 'マイ予定に追加'}
                      aria-label={isSaved ? '予定から外す' : 'マイ予定に追加'}
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};
