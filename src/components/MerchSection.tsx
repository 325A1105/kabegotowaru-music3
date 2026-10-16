import React, { useState } from 'react';
import { ShoppingBag, Check, ShieldAlert, Sparkles } from 'lucide-react';
import { MERCH_DATA, MerchItem } from '../data/festivalData';

export const MerchSection: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<MerchItem | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('L');
  const [reservedIds, setReservedIds] = useState<string[]>([]);
  const [reservedNotice, setReservedNotice] = useState<string | null>(null);

  const handleReserve = (item: MerchItem) => {
    if (!reservedIds.includes(item.id)) {
      setReservedIds([...reservedIds, item.id]);
    }
    setReservedNotice(`「${item.name}」の会場受取整理券を確保しました（ブースにて提示）`);
    setTimeout(() => {
      setReservedNotice(null);
    }, 4000);
    setSelectedItem(null);
  };

  return (
    <section id="merch" className="py-20 border-t border-zinc-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono-nums text-red-500 uppercase tracking-widest font-semibold">
            <span>05. OFFICIAL FESTIVAL MERCH</span>
            <span className="text-zinc-600" aria-hidden="true">·</span>
            <span>公式グッズ</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            漆黒の公式ストリートウェア
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            重厚な14オンス極厚裏起毛フーディやアシッドウォッシュツアーT、演出連動RGBリストバンド。当日物販ブースおよびWeb事前取り置き受付中。
          </p>
        </div>

        {reservedNotice && (
          <div className="mb-8 p-4 bg-red-950/80 border border-red-500 rounded-xl text-white text-xs sm:text-sm font-semibold flex items-center justify-between animate-in fade-in">
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              {reservedNotice}
            </span>
          </div>
        )}

        {/* Hero Merch Showcase Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          {/* Main Visual Image Card */}
          <div className="lg:col-span-6 bg-[#101014] border border-zinc-800 rounded-2xl overflow-hidden relative group">
            <img
              src="/src/assets/images/merch_hoodie_streetwear_1792127064027.jpg"
              alt="学園祭公式フーディ＆パス"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[11px] font-mono-nums text-red-400 font-bold uppercase tracking-wider block mb-1">
                LIMITED COLLECTOR&apos;S ITEM
              </span>
              <h3 className="text-xl font-bold text-white font-display">
                HAKYAKU 14.0oz HEAVYWEIGHT HOODIE
              </h3>
              <p className="text-xs text-zinc-300 mt-1">
                限定数販売。会場およびオンライン整理券保持者優先受取。
              </p>
            </div>
          </div>

          {/* Merch Items List */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-4">
            {MERCH_DATA.map((item) => {
              const isReserved = reservedIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  className="bg-[#101014] border border-zinc-800 hover:border-zinc-700 rounded-xl p-5 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono-nums text-xs text-red-400 font-bold">
                        {item.statusLabel}
                      </span>
                    </div>
                    <h4 className="font-display text-base font-bold text-white truncate">
                      {item.name}
                    </h4>
                    <p className="text-xs text-zinc-400 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="font-mono-nums text-sm font-extrabold text-white pt-1">
                      ¥{item.price.toLocaleString()}
                      <span className="text-[10px] text-zinc-500 font-normal ml-1">
                        (税込)
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0 self-end sm:self-center">
                    <button
                      onClick={() => setSelectedItem(item)}
                      className={`px-4 py-2.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                        isReserved
                          ? 'bg-zinc-800 text-zinc-300 border border-zinc-700'
                          : 'bg-red-600 hover:bg-red-500 text-white shadow-[0_0_12px_rgba(239,68,68,0.3)]'
                      }`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>{isReserved ? '受取整理券確保済' : '事前受取を予約'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Merch Reservation Modal */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
            <div className="bg-[#101014] border border-zinc-800 w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <h3 className="font-display text-base font-bold text-white">
                  グッズ事前受取予約
                </h3>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="text-zinc-500 hover:text-white text-xs font-mono-nums"
                >
                  ✕ 閉じる
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="text-xs text-zinc-400 font-mono-nums">
                    {selectedItem.englishName}
                  </div>
                  <div className="text-lg font-bold text-white mt-0.5">
                    {selectedItem.name}
                  </div>
                  <div className="text-base font-bold text-red-500 font-mono-nums mt-1">
                    ¥{selectedItem.price.toLocaleString()} (税込)
                  </div>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-950 p-3 rounded-lg border border-zinc-800">
                  {selectedItem.description}
                </p>

                {selectedItem.sizes && (
                  <div className="space-y-1.5">
                    <label className="text-xs text-zinc-400 font-medium">
                      サイズ選択:
                    </label>
                    <div className="flex items-center gap-2">
                      {selectedItem.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`w-10 h-10 rounded-lg text-xs font-mono-nums font-bold border transition-all ${
                            selectedSize === size
                              ? 'bg-red-600 border-red-500 text-white'
                              : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-zinc-800">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
                >
                  キャンセル
                </button>
                <button
                  onClick={() => handleReserve(selectedItem)}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-red-600 hover:bg-red-500 rounded-lg shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all"
                >
                  受取整理券を確保する
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
