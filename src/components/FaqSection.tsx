import React, { useState } from 'react';
import { ChevronDown, MapPin, Bus, Car, AlertCircle, HelpCircle } from 'lucide-react';
import { FAQ_ITEMS } from '../data/festivalData';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 border-t border-zinc-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Access & Venue Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono-nums text-red-500 uppercase tracking-widest font-semibold">
                <span>06. ACCESS & GUIDELINES</span>
                <span className="text-zinc-600" aria-hidden="true">·</span>
                <span>アクセス＆ご案内</span>
              </div>
              <h2 className="font-display text-3xl font-extrabold text-white tracking-tight">
                会場アクセス ＆ 注意事項
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed">
                浦山学園キャンパス（富山）。当日は最寄り駅より無料直通シャトルバスを10分間隔で運行します。
              </p>
            </div>

            <div className="bg-[#101014] border border-zinc-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="text-sm font-bold text-white">会場所在地</div>
                  <div className="text-xs text-zinc-400">
                    〒939-0341 富山県射水市三ケ576 浦山学園特設会場
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-zinc-800/80">
                <Bus className="w-5 h-5 text-zinc-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="text-sm font-bold text-white">無料シャトルバス運行</div>
                  <div className="text-xs text-zinc-400">
                    あいの風とやま鉄道「小杉駅」南口 ⇄ 学園正門前（両日9:00〜20:30運行）
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-zinc-800/80">
                <Car className="w-5 h-5 text-zinc-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="text-sm font-bold text-white">お車でのご来場</div>
                  <div className="text-xs text-zinc-400">
                    北陸自動車道 小杉ICより約5分（キャンパス北側臨時駐車場 200台）
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: FAQ Accordions */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2 mb-4">
              <HelpCircle className="w-4 h-4 text-red-500" />
              よくあるご質問 (FAQ)
            </h3>

            <div className="space-y-3">
              {FAQ_ITEMS.map((item, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div
                    key={idx}
                    className="bg-[#101014] border border-zinc-800 rounded-xl overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => toggle(idx)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm text-zinc-200 hover:text-white"
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="font-mono-nums text-xs font-bold text-red-500">
                          Q{idx + 1}.
                        </span>
                        <span>{item.question}</span>
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-zinc-500 shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-white' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-zinc-800/50">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
