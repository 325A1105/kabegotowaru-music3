import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, ArrowRight, Ticket, Flame } from 'lucide-react';
import { FESTIVAL_INFO } from '../data/festivalData';
import { AudioThemePlayer } from './AudioThemePlayer';

interface HeroProps {
  onOpenTicketModal: () => void;
  onScrollToTimetable: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenTicketModal,
  onScrollToTimetable,
}) => {
  // Countdown to Nov 1, 2026 10:00 AM JST
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date('2026-11-01T10:00:00+09:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden pt-6 pb-12">
      {/* Background Hero Image with Dramatic Dark Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_festival_stage_1792127062193.jpg"
          alt="浦山学園祭2026 メインステージ"
          className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-125 scale-105 transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        {/* Measured dark gradient scrims */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#09090b]/90 via-[#09090b]/50 to-transparent" />
        {/* Subtle red ambient light spot */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-10">
        <div className="max-w-3xl space-y-6">
          {/* Quiet Unboxed Metadata Kicker */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono-nums text-zinc-400">
            <span className="text-red-500 font-bold uppercase tracking-wider flex items-center gap-1">
              <Flame className="w-3.5 h-3.5" />
              URAYAMA CULTURAL FESTIVAL 2026
            </span>
            <span className="text-zinc-600" aria-hidden="true">
              ·
            </span>
            <span className="flex items-center gap-1 text-zinc-300">
              <Calendar className="w-3.5 h-3.5 text-zinc-400" />
              {FESTIVAL_INFO.dates}
            </span>
            <span className="text-zinc-600" aria-hidden="true">
              ·
            </span>
            <span className="flex items-center gap-1 text-zinc-300">
              <MapPin className="w-3.5 h-3.5 text-zinc-400" />
              富山キャンパス
            </span>
          </div>

          {/* Headline with balanced wrap and dark aesthetic presence */}
          <div className="space-y-2">
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08] [text-wrap:balance]">
              限界を破却せよ。
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-400">
                ここからだ。
              </span>
            </h1>
            <p className="text-base sm:text-lg text-zinc-300 max-w-xl font-normal leading-relaxed pt-2">
              重低音アリーナライブ、ストリートサイファー、深夜系暗黒模擬店、先端メディアアート。静寂を切り裂く、2日間の漆黒カルチャーフェス。
            </p>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-4 pt-3">
            <button
              onClick={onOpenTicketModal}
              className="px-6 py-3.5 text-sm font-bold text-white bg-red-600 hover:bg-red-500 active:scale-95 rounded-xl transition-all shadow-[0_0_25px_rgba(239,68,68,0.4)] flex items-center gap-2"
            >
              <Ticket className="w-4 h-4" />
              <span>デジタル整理券を発行（無料）</span>
            </button>

            <button
              onClick={onScrollToTimetable}
              className="px-6 py-3.5 text-sm font-semibold text-zinc-300 hover:text-white bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/80 rounded-xl transition-all flex items-center gap-2 group"
            >
              <span>タイムテーブルを見る</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Countdown Timer with Tabular Numerals */}
          <div className="pt-4 border-t border-zinc-800/80">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <span className="text-xs font-mono-nums text-zinc-500 uppercase tracking-widest">
                COUNTDOWN TO OPENING
              </span>
              <div className="flex items-center gap-2 font-mono-nums">
                <div className="bg-zinc-900/80 border border-zinc-800 px-3 py-1.5 rounded-lg text-center min-w-[56px]">
                  <span className="text-xl font-bold text-white tabular-nums">
                    {String(timeLeft.days).padStart(2, '0')}
                  </span>
                  <span className="block text-[10px] text-zinc-500 uppercase">
                    DAYS
                  </span>
                </div>
                <span className="text-zinc-600 font-bold">:</span>
                <div className="bg-zinc-900/80 border border-zinc-800 px-3 py-1.5 rounded-lg text-center min-w-[56px]">
                  <span className="text-xl font-bold text-white tabular-nums">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="block text-[10px] text-zinc-500 uppercase">
                    HOURS
                  </span>
                </div>
                <span className="text-zinc-600 font-bold">:</span>
                <div className="bg-zinc-900/80 border border-zinc-800 px-3 py-1.5 rounded-lg text-center min-w-[56px]">
                  <span className="text-xl font-bold text-white tabular-nums">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="block text-[10px] text-zinc-500 uppercase">
                    MINS
                  </span>
                </div>
                <span className="text-zinc-600 font-bold">:</span>
                <div className="bg-zinc-900/80 border border-zinc-800 px-3 py-1.5 rounded-lg text-center min-w-[56px]">
                  <span className="text-xl font-bold text-red-500 tabular-nums">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="block text-[10px] text-zinc-500 uppercase">
                    SECS
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Official Audio Theme Player Docked at Bottom of Hero */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-6">
        <AudioThemePlayer />
      </div>
    </section>
  );
};
