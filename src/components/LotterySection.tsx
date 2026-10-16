import React, { useState, useEffect } from 'react';
import { Gift, Sparkles, CheckCircle2, Ticket, Trophy, Clock, MapPin, Search } from 'lucide-react';
import confetti from 'canvas-confetti';
import { LOTTERY_DATA } from '../data/festivalData';

interface LotterySectionProps {
  onOpenTicketModal: () => void;
}

export const LotterySection: React.FC<LotterySectionProps> = ({
  onOpenTicketModal,
}) => {
  const [userTicketSerial, setUserTicketSerial] = useState<string>('');
  const [checkResult, setCheckResult] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [slotResult, setSlotResult] = useState<string | null>(null);
  const [displayNumber, setDisplayNumber] = useState('0000');

  useEffect(() => {
    const savedPass = localStorage.getItem('urayama_fest_digital_pass');
    if (savedPass) {
      try {
        const parsed = JSON.parse(savedPass);
        if (parsed.serial) {
          setUserTicketSerial(parsed.serial);
        }
      } catch {
        // fallback
      }
    }
  }, []);

  const handleCheckTicket = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = userTicketSerial.trim();
    if (!query) {
      setCheckResult('整理券番号を入力してください（例: URF-2026-1042）');
      return;
    }

    const match = LOTTERY_DATA.winningNumbersSample.find(
      (w) => w.number.toLowerCase() === query.toLowerCase() || query.endsWith(w.number.replace(/\D/g, ''))
    );

    if (match) {
      setCheckResult(`【当選】おめでとうございます！「${match.prize}」に該当しています！本部で引き換えてください。`);
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ef4444', '#f59e0b', '#ffffff']
      });
    } else {
      setCheckResult(`「${query}」は現在発表済みの速報番号にはまだ当選していません。次回抽選会（DAY 2 17:30〜）をお楽しみに！`);
    }
  };

  const handleSpinSlot = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setSlotResult(null);

    let counter = 0;
    const interval = setInterval(() => {
      const random = Math.floor(1000 + Math.random() * 9000);
      setDisplayNumber(String(random));
      counter++;

      if (counter > 20) {
        clearInterval(interval);
        setIsSpinning(false);

        const outcomes = [
          { text: 'おめでとうございます！【3等: 模擬店¥500クーポン】当選！', win: true },
          { text: 'おめでとうございます！【破却賞: 限定ホログラムステッカー】当選！', win: true },
          { text: '惜しい！【参加賞: デジタル限定壁紙ダウンロード権】獲得！', win: false }
        ];
        const selected = outcomes[Math.floor(Math.random() * outcomes.length)];
        setSlotResult(selected.text);

        if (selected.win) {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.7 },
            colors: ['#ef4444', '#dc2626', '#f59e0b']
          });
        }
      }
    }, 80);
  };

  return (
    <section id="lottery" className="py-20 border-t border-zinc-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono-nums text-red-500 uppercase tracking-widest font-semibold">
            <span>SPECIAL EVENT 02</span>
            <span className="text-zinc-600" aria-hidden="true">·</span>
            <span>SHADOW LOTTERY</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight flex items-center gap-3">
            漆黒の大抽選会 2026
            <Gift className="w-8 h-8 text-red-500 animate-bounce" />
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            賞品総額100万円超。当サイトで「デジタル整理券」を発行するだけで、来場者全員に豪華ハイテク機器やフェス限定グッズが当たるチャンス！
          </p>
        </div>

        {/* Prizes Showcase & Hero Visual Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-14">
          {/* Main Visual Image Card */}
          <div className="lg:col-span-7 bg-[#101014] border border-zinc-800 rounded-2xl overflow-hidden relative group flex flex-col justify-between">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={LOTTERY_DATA.prizesImage}
                alt="豪華抽選会賞品"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101014] via-transparent to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="font-mono-nums text-[11px] font-bold text-amber-400 bg-black/80 backdrop-blur-md px-3 py-1 rounded border border-amber-500/40 flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5" />
                  GRAND PRIZE SHOWCASE
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono-nums text-zinc-400">
                <span>抽選対象: デジタル整理券をお持ちのすべての来場者</span>
                <span aria-hidden="true">·</span>
                <span className="text-red-400 font-bold">参加無料</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-white">
                特賞: クリエイタータブレット ＆ プレミアムヘッドホンセット
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                創作意欲を刺激するマットブラックの最新タブレット端末と、スタジオクオリティの重低音を響かせるノイズキャンセリングヘッドホンをセットで贈呈。
              </p>
            </div>
          </div>

          {/* Right Column: Prizes Tier List */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-3">
            <div className="bg-[#101014] border border-zinc-800 rounded-2xl p-6 space-y-4 flex-1">
              <h4 className="text-xs font-mono-nums text-red-500 font-bold uppercase tracking-wider flex items-center justify-between">
                <span>賞品ラインナップ一覧</span>
                <span className="text-zinc-500">計147名様に当選</span>
              </h4>

              <div className="space-y-3 font-mono-nums">
                {LOTTERY_DATA.prizes.map((prize, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-xl border transition-all ${
                      prize.highlight
                        ? 'bg-red-950/20 border-red-900/60'
                        : 'bg-zinc-950 border-zinc-800/80'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-red-400">{prize.tier} [{prize.tierName}]</span>
                      <span className="text-white font-bold bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                        {prize.quantity}
                      </span>
                    </div>
                    <div className="text-sm font-bold text-white font-display">
                      {prize.name}
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-1 font-sans">
                      {prize.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Schedule & Interactive Simulator 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Schedule & Rules */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-[#101014] border border-zinc-800 rounded-2xl p-6 space-y-5">
              <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-red-500" />
                抽選ステージ実施スケジュール
              </h3>

              <div className="space-y-3 font-mono-nums text-xs">
                {LOTTERY_DATA.schedules.map((s, idx) => (
                  <div key={idx} className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 space-y-1.5">
                    <div className="flex items-center justify-between text-red-400 font-bold">
                      <span>{s.round}</span>
                      <span>{s.time}</span>
                    </div>
                    <div className="text-white font-semibold flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                      <span>{s.venue}</span>
                    </div>
                    <p className="text-zinc-400 text-[11px] font-sans">
                      {s.note}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-zinc-800 space-y-2">
                <div className="text-xs font-bold text-zinc-300">抽選参加ルール</div>
                <ul className="text-xs text-zinc-400 space-y-1.5 list-disc list-inside leading-relaxed">
                  {LOTTERY_DATA.rules.map((rule, idx) => (
                    <li key={idx}>{rule}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right: Interactive Web Speed Lottery & Ticket Checker */}
          <div className="lg:col-span-6 space-y-6">
            {/* Interactive Web Slot Simulator */}
            <div className="bg-[#101014] border border-red-900/40 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono-nums text-red-500 font-bold uppercase tracking-wider block">
                    ONLINE LUCKY DRAW
                  </span>
                  <h3 className="font-display text-lg font-bold text-white">
                    Web限定 スピード運試しスロット
                  </h3>
                </div>
                <Sparkles className="w-5 h-5 text-amber-400 animate-spin" />
              </div>

              <p className="text-xs text-zinc-400">
                本番前の運試し！スロットを回して限定クーポンやデジタル壁紙をその場で獲得。
              </p>

              {/* Slot Wheel Box */}
              <div className="bg-black border-2 border-zinc-800 rounded-xl p-6 text-center space-y-3">
                <div className="font-mono-nums text-4xl sm:text-5xl font-black text-red-500 tracking-widest tabular-nums py-2 shadow-inner">
                  {displayNumber}
                </div>
                <button
                  onClick={handleSpinSlot}
                  disabled={isSpinning}
                  className={`px-6 py-3 text-sm font-bold text-white rounded-xl transition-all shadow-[0_0_20px_rgba(239,68,68,0.4)] ${
                    isSpinning
                      ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                      : 'bg-red-600 hover:bg-red-500 active:scale-95'
                  }`}
                >
                  {isSpinning ? 'スロット抽選中...' : '運試しのスロットを回す'}
                </button>
              </div>

              {slotResult && (
                <div className="p-3 bg-red-950/60 border border-red-500 rounded-xl text-xs text-white font-semibold text-center animate-in fade-in">
                  {slotResult}
                </div>
              )}
            </div>

            {/* Ticket Checker Form */}
            <div className="bg-[#101014] border border-zinc-800 rounded-2xl p-6 space-y-4">
              <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
                <Search className="w-4 h-4 text-red-500" />
                当選番号リアルタイム照合
              </h3>
              <p className="text-xs text-zinc-400">
                お持ちのデジタル整理券番号を入力して、当選状況を確認できます。
              </p>

              <form onSubmit={handleCheckTicket} className="flex gap-2">
                <input
                  type="text"
                  placeholder="例: URF-2026-1042"
                  value={userTicketSerial}
                  onChange={(e) => setUserTicketSerial(e.target.value)}
                  className="bg-zinc-950 border border-zinc-800 focus:border-red-500 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none flex-1 font-mono-nums"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 text-xs font-bold text-white bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg transition-colors whitespace-nowrap"
                >
                  照合する
                </button>
              </form>

              {checkResult && (
                <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-300 leading-relaxed">
                  {checkResult}
                </div>
              )}

              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="text-zinc-500">整理券をまだお持ちでない方</span>
                <button
                  onClick={onOpenTicketModal}
                  className="text-red-400 hover:text-red-300 font-semibold underline underline-offset-4"
                >
                  整理券を発行して抽選に参加 →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
