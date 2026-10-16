import React, { useState } from 'react';
import { MapPin, Users, Utensils, Zap, Compass, Bookmark, Check, Eye } from 'lucide-react';
import { STALLS_DATA, StallItem } from '../data/festivalData';

interface StallsAndMapSectionProps {
  savedItemIds: string[];
  onToggleBookmark: (id: string) => void;
  onSelectStall: (stall: StallItem) => void;
}

export const StallsAndMapSection: React.FC<StallsAndMapSectionProps> = ({
  savedItemIds,
  onToggleBookmark,
  onSelectStall
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedZone, setSelectedZone] = useState<string>('all');

  const filteredStalls = STALLS_DATA.filter((stall) => {
    if (selectedCategory !== 'all' && stall.category !== selectedCategory) return false;
    if (selectedZone !== 'all' && stall.zone !== selectedZone) return false;
    return true;
  });

  const zones = [
    { id: 'all', name: '全エリア表示' },
    { id: 'courtyard', name: '中庭フードエリア' },
    { id: 'arena', name: 'メインアリーナ・多目的' },
    { id: 'bldg1', name: '1号館 (教室企画・脱出)' },
    { id: 'bldg2', name: '2号館 (ロボティクスLab)' }
  ];

  return (
    <section id="stalls-map" className="py-20 border-t border-zinc-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono-nums text-red-500 uppercase tracking-widest font-semibold">
            <span>03. FOOD & EXHIBITION MAP</span>
            <span className="text-zinc-600" aria-hidden="true">·</span>
            <span>模擬店＆マップ</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            漆黒の屋台街 ＆ キャンパスマップ
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            竹炭タコスや激辛からあげ、脱出ホラー病棟からAIロボット体験まで。各エリアの混雑状況・リアルタイム待ち時間を確認できます。
          </p>
        </div>

        {/* Interactive Campus Map Visualizer Banner */}
        <div className="bg-[#101014] border border-zinc-800 rounded-2xl p-6 mb-10 overflow-hidden relative">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-zinc-800">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Compass className="w-4 h-4 text-red-500" />
                エリアを選択して絞り込み
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                ピンまたはボタンをクリックすると、そのエリアの出展ブースのみを瞬時に表示します。
              </p>
            </div>

            {/* Zone Selector Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              {zones.map((z) => (
                <button
                  key={z.id}
                  onClick={() => setSelectedZone(z.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                    selectedZone === z.id
                      ? 'bg-red-600 text-white border-red-500 shadow-[0_0_12px_rgba(239,68,68,0.3)]'
                      : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
                  }`}
                >
                  {z.name}
                </button>
              ))}
            </div>
          </div>

          {/* Graphical Map Representation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
            <div
              onClick={() => setSelectedZone('courtyard')}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                selectedZone === 'courtyard'
                  ? 'bg-red-950/40 border-red-500'
                  : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono-nums mb-2">
                <span className="text-red-400 font-bold">ZONE A</span>
                <span className="text-zinc-500">1F 屋外</span>
              </div>
              <h4 className="text-sm font-bold text-white">中庭ストリート</h4>
              <p className="text-xs text-zinc-400 mt-1">フードトラック・特設ステージ</p>
              <div className="mt-3 text-[11px] font-mono-nums text-emerald-400 flex items-center gap-1">
                <span>混雑度: 75%</span>
              </div>
            </div>

            <div
              onClick={() => setSelectedZone('arena')}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                selectedZone === 'arena'
                  ? 'bg-red-950/40 border-red-500'
                  : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono-nums mb-2">
                <span className="text-red-400 font-bold">ZONE B</span>
                <span className="text-zinc-500">アリーナ</span>
              </div>
              <h4 className="text-sm font-bold text-white">体育館 ＆ 多目的棟</h4>
              <p className="text-xs text-zinc-400 mt-1">メインライブ・アート展示</p>
              <div className="mt-3 text-[11px] font-mono-nums text-amber-400 flex items-center gap-1">
                <span>混雑度: 88%</span>
              </div>
            </div>

            <div
              onClick={() => setSelectedZone('bldg1')}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                selectedZone === 'bldg1'
                  ? 'bg-red-950/40 border-red-500'
                  : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono-nums mb-2">
                <span className="text-red-400 font-bold">ZONE C</span>
                <span className="text-zinc-500">1号館 1〜3F</span>
              </div>
              <h4 className="text-sm font-bold text-white">1号館 教室企画</h4>
              <p className="text-xs text-zinc-400 mt-1">脱出病棟・カフェ・休憩所</p>
              <div className="mt-3 text-[11px] font-mono-nums text-emerald-400 flex items-center gap-1">
                <span>混雑度: 60%</span>
              </div>
            </div>

            <div
              onClick={() => setSelectedZone('bldg2')}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                selectedZone === 'bldg2'
                  ? 'bg-red-950/40 border-red-500'
                  : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono-nums mb-2">
                <span className="text-red-400 font-bold">ZONE D</span>
                <span className="text-zinc-500">2号館 実習棟</span>
              </div>
              <h4 className="text-sm font-bold text-white">2号館 テック棟</h4>
              <p className="text-xs text-zinc-400 mt-1">ロボット体験・VR体験</p>
              <div className="mt-3 text-[11px] font-mono-nums text-emerald-400 flex items-center gap-1">
                <span>混雑度: 45%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {[
            { id: 'all', label: 'すべて表示' },
            { id: 'food', label: 'フード＆ドリンク' },
            { id: 'activity', label: '体験＆アトラクション' },
            { id: 'tech', label: '先端技術・ロボティクス' },
            { id: 'art', label: 'アート＆展示' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg border transition-all ${
                selectedCategory === cat.id
                  ? 'bg-zinc-800 text-white border-zinc-700'
                  : 'bg-zinc-950 text-zinc-400 border-zinc-800/80 hover:text-zinc-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Stalls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStalls.map((stall) => {
            const isSaved = savedItemIds.includes(stall.id);
            return (
              <div
                key={stall.id}
                className="bg-[#101014] border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between hover:border-zinc-700 transition-all group"
              >
                <div className="space-y-3.5">
                  {/* Top Meta: Category & Congestion */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono-nums text-zinc-400 font-medium">
                      {stall.categoryLabel}
                    </span>
                    <span
                      className={`font-mono-nums text-[11px] font-bold px-2 py-0.5 rounded ${
                        stall.congestion === 'crowded'
                          ? 'bg-rose-950/80 text-rose-300 border border-rose-800'
                          : stall.congestion === 'normal'
                          ? 'bg-amber-950/80 text-amber-300 border border-amber-800'
                          : 'bg-emerald-950/80 text-emerald-300 border border-emerald-800'
                      }`}
                    >
                      {stall.congestionLabel}
                      {stall.waitTimeMinutes > 0 && ` (約${stall.waitTimeMinutes}分)`}
                    </span>
                  </div>

                  {/* Title & Organization */}
                  <div>
                    <h3
                      onClick={() => onSelectStall(stall)}
                      className="font-display text-lg font-bold text-white hover:text-red-400 cursor-pointer transition-colors"
                    >
                      {stall.name}
                    </h3>
                    <p className="text-xs text-zinc-500 mt-0.5">{stall.organization}</p>
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {stall.description}
                  </p>

                  {/* Highlights or Menu */}
                  <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800/80 space-y-1">
                    <div className="text-[11px] font-mono-nums text-zinc-500 font-semibold uppercase">
                      看板メニュー / 特徴
                    </div>
                    <ul className="text-xs text-zinc-300 space-y-0.5 font-mono-nums">
                      {stall.menuOrHighlights.map((menu, idx) => (
                        <li key={idx} className="flex items-center gap-1.5 truncate">
                          <span className="text-red-500">›</span>
                          <span>{menu}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer: Price, Location & Action */}
                <div className="pt-4 mt-4 border-t border-zinc-800/80 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-xs font-mono-nums font-bold text-red-400">
                      {stall.priceRange}
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-zinc-500 truncate max-w-[170px]">
                      <MapPin className="w-3 h-3 text-zinc-500 shrink-0" />
                      <span className="truncate">{stall.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectStall(stall)}
                      className="p-2 text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg transition-colors"
                      title="詳細を見る"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onToggleBookmark(stall.id)}
                      className={`p-2 rounded-lg border transition-all ${
                        isSaved
                          ? 'bg-red-600 border-red-500 text-white shadow-[0_0_10px_rgba(239,68,68,0.4)]'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                      }`}
                      title={isSaved ? '予定から外す' : '行きたいリストに追加'}
                    >
                      {isSaved ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
