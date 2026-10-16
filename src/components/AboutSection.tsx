import React from 'react';
import { Sparkles, Zap, Radio, ShieldCheck } from 'lucide-react';
import { FESTIVAL_INFO } from '../data/festivalData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 border-t border-zinc-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono-nums text-red-500 uppercase tracking-widest font-semibold">
            <span>01. CONCEPT & STATEMENT</span>
            <span className="text-zinc-600" aria-hidden="true">·</span>
            <span>浦山学園祭 2026</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            曖昧な看板を剥がし、
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-400">
              実力で空気を奪還する。
            </span>
          </h2>
          <p className="text-base text-zinc-400 leading-relaxed pt-2">
            2026年のテーマは『破却』。予定調和の学園祭を解体し、学生たちのリアルなパッション、ストリートカルチャー、重低音サウンド、最先端の学術成果をひとつに凝縮した漆黒の2日間です。
          </p>
        </div>

        {/* Asymmetric Bento Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Card 1: Live Stage Spotlight (Col Span 7) */}
          <div className="lg:col-span-7 bg-[#101014] border border-zinc-800 rounded-2xl overflow-hidden group flex flex-col justify-between">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src="/src/assets/images/stage_live_performer_1792127062239.jpg"
                alt="ストリートサイファー＆ライブステージ"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 contrast-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101014] via-transparent to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="font-mono-nums text-[11px] font-bold text-red-400 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded border border-red-900/60 flex items-center gap-1.5">
                  <Radio className="w-3 h-3 text-red-500 animate-pulse" />
                  ARENA & UNDERGROUND
                </span>
              </div>
            </div>
            <div className="p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono-nums text-zinc-500">
                <span>40組以上の出演者</span>
                <span aria-hidden="true">·</span>
                <span>ラップバトル / バンド / ダンス</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-red-400 transition-colors">
                沈黙を裂く、圧倒的音圧のライブステージ
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                体育館メインアリーナと中庭特設アンダーグラウンドステージの2会場で同時開催。学内選抜ラッパーによるフリースタイルバトルやビッグバンド、ゲストアーティストによる熱狂のステージ。
              </p>
            </div>
          </div>

          {/* Right Column (Col Span 5): Stacked Bento Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Card 2: Food Trucks & Night Stalls */}
            <div className="bg-[#101014] border border-zinc-800 rounded-2xl overflow-hidden group flex flex-col flex-1">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="/src/assets/images/food_truck_night_stall_1792127063715.jpg"
                  alt="漆黒模擬店とナイトフードトラック"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 contrast-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101014] via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="font-mono-nums text-[11px] font-semibold text-zinc-300 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded border border-zinc-700">
                    FOOD & DRINK
                  </span>
                </div>
              </div>
              <div className="p-5 sm:p-6 space-y-2">
                <h3 className="font-display text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                  夜を灯す、30店舗超のストリート模擬店
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  黒鉄スモークタコスや漆黒から揚げ、挽きたて濃厚抹茶ラテなど、ここでしか味わえないオリジナルフェス飯が集結。
                </p>
              </div>
            </div>

            {/* Card 3: Cyber Lab & Interactive Art */}
            <div className="bg-[#101014] border border-zinc-800 rounded-2xl overflow-hidden group flex flex-col flex-1">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="/src/assets/images/exhibition_cyber_lab_1792127064196.jpg"
                  alt="サイバーロボティクスとメディアアート"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 contrast-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101014] via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="font-mono-nums text-[11px] font-semibold text-zinc-300 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded border border-zinc-700">
                    TECH & ART
                  </span>
                </div>
              </div>
              <div className="p-5 sm:p-6 space-y-2">
                <h3 className="font-display text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                  先端ロボティクス＆暗室アート体験
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  自作AIロボット操縦体験から暗闇密室脱出ゲーム、光と音のインスタレーションまで、知的好奇心を刺激する展示空間。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quantified Impact Strip (Proof) */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-zinc-950 border border-zinc-800/80 rounded-2xl">
          <div className="space-y-1">
            <span className="text-xs font-mono-nums text-zinc-500 uppercase tracking-wider block">
              TOTAL ARTISTS
            </span>
            <div className="font-mono-nums text-2xl sm:text-3xl font-extrabold text-white">
              40<span className="text-red-500 text-lg font-normal">+組</span>
            </div>
            <p className="text-xs text-zinc-400">ライブ・サイファー・DJ</p>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-mono-nums text-zinc-500 uppercase tracking-wider block">
              STALLS & LABS
            </span>
            <div className="font-mono-nums text-2xl sm:text-3xl font-extrabold text-white">
              32<span className="text-red-500 text-lg font-normal">ブース</span>
            </div>
            <p className="text-xs text-zinc-400">飲食屋台＆研究・展示</p>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-mono-nums text-zinc-500 uppercase tracking-wider block">
              DAYS & STAGES
            </span>
            <div className="font-mono-nums text-2xl sm:text-3xl font-extrabold text-white">
              2<span className="text-zinc-500 text-lg font-normal">DAYS /</span> 3<span className="text-zinc-500 text-lg font-normal">STAGES</span>
            </div>
            <p className="text-xs text-zinc-400">アリーナ・中庭・ホール</p>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-mono-nums text-zinc-500 uppercase tracking-wider block">
              ADMISSION
            </span>
            <div className="font-mono-nums text-2xl sm:text-3xl font-extrabold text-red-500">
              ¥0<span className="text-white text-xs font-normal ml-2">完全無料</span>
            </div>
            <p className="text-xs text-zinc-400">デジタル整理券で入場</p>
          </div>
        </div>
      </div>
    </section>
  );
};
