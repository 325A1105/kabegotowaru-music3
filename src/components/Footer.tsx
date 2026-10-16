import React from 'react';
import { FESTIVAL_INFO } from '../data/festivalData';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-zinc-800 bg-[#070709] py-12 text-zinc-500 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-zinc-800/80">
          <div className="space-y-2">
            <div className="font-display text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <span className="text-red-500">■</span>
              <span>URAYAMA FESTIVAL 2026</span>
            </div>
            <p className="text-zinc-400 text-xs">
              主催: 浦山学園 学園祭実行委員会 / 学生自治会
            </p>
            <p className="text-zinc-500 text-[11px] font-mono-nums">
              {FESTIVAL_INFO.venue}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-zinc-400">
            <a href="#about" className="hover:text-white transition-colors">コンセプト</a>
            <a href="#timetable" className="hover:text-white transition-colors">タイムテーブル</a>
            <a href="#stalls-map" className="hover:text-white transition-colors">模擬店＆マップ</a>
            <a href="#grandprix" className="hover:text-white transition-colors">学祭GP投票</a>
            <a href="#merch" className="hover:text-white transition-colors">公式グッズ</a>
            <a href="#faq" className="hover:text-white transition-colors">アクセス</a>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono-nums text-zinc-600">
          <div>
            © 2026 Urayama Educational Institute Festival Executive Committee. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>#浦山学園祭2026</span>
            <span>#破却</span>
            <span>#HAKYAKU</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
