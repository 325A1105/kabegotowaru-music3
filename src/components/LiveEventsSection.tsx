import React from 'react';
import { Radio, Users, Sparkles, Clock, MapPin, Bookmark, Flame } from 'lucide-react';
import { SPECIAL_LIVE_EVENTS } from '../data/festivalData';

interface LiveEventsSectionProps {
  onScrollToTimetable: () => void;
  onOpenTicketModal: () => void;
}

export const LiveEventsSection: React.FC<LiveEventsSectionProps> = ({
  onScrollToTimetable,
  onOpenTicketModal,
}) => {
  return (
    <section id="live-events" className="py-20 border-t border-zinc-800/80 relative bg-zinc-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono-nums text-red-500 uppercase tracking-widest font-semibold">
              <span>SPECIAL EVENT 01</span>
              <span className="text-zinc-600" aria-hidden="true">·</span>
              <span>LIVE & CYPHER</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight flex items-center gap-3">
              特設ライブイベント
              <Flame className="w-8 h-8 text-red-500 animate-pulse" />
            </h2>
            <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed">
              総勢40組以上の出演者から選りすぐりの3大特別ライブ。極限の音圧とレーザーが交錯するメインアリーナから、即興フリースタイルが火花を散らす中庭サイファーまで。
            </p>
          </div>

          <button
            onClick={onScrollToTimetable}
            className="px-4 py-2.5 text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors self-start md:self-auto whitespace-nowrap"
          >
            タイムテーブル全編を見る
          </button>
        </div>

        {/* 3 Marquee Live Event Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {SPECIAL_LIVE_EVENTS.map((live, index) => (
            <div
              key={live.id}
              className="bg-[#101014] border border-zinc-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-zinc-700 transition-all group"
            >
              <div>
                {/* Visual Image Banner */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={live.image}
                    alt={live.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 contrast-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101014] via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="font-mono-nums text-[11px] font-bold text-red-400 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded border border-red-900/60 flex items-center gap-1.5">
                      <Radio className="w-3 h-3 text-red-500 animate-pulse" />
                      {live.status}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono-nums text-zinc-400">
                    <Clock className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span>{live.date}</span>
                  </div>

                  <h3 className="font-display text-lg sm:text-xl font-bold text-white group-hover:text-red-400 transition-colors leading-snug">
                    {live.title}
                  </h3>

                  <div className="text-xs font-semibold text-zinc-300">
                    出演: {live.artist}
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed pt-1">
                    {live.description}
                  </p>
                </div>
              </div>

              {/* Bottom Card Strip */}
              <div className="p-6 pt-0 space-y-4">
                <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800/80 text-[11px] font-mono-nums text-zinc-400 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span className="truncate">{live.stage}</span>
                  </span>
                  <span className="text-zinc-500 shrink-0 ml-2">{live.capacity}</span>
                </div>

                <button
                  onClick={onOpenTicketModal}
                  className="w-full py-2.5 text-xs font-bold text-white bg-red-600 hover:bg-red-500 rounded-lg shadow-[0_0_12px_rgba(239,68,68,0.3)] transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>入場整理券で優先席を確保</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
