import React, { useState, useEffect } from 'react';
import { X, QrCode, Download, ShieldCheck, Sparkles, Check, Printer } from 'lucide-react';
import confetti from 'canvas-confetti';
import { FESTIVAL_INFO } from '../data/festivalData';

interface DigitalPassModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DigitalPassModal: React.FC<DigitalPassModalProps> = ({
  isOpen,
  onClose
}) => {
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState<'general' | 'highschool' | 'student' | 'alumni'>('general');
  const [attendDay, setAttendDay] = useState<'day1' | 'day2' | 'both'>('both');
  const [issuedPass, setIssuedPass] = useState<{
    serial: string;
    name: string;
    roleLabel: string;
    dayLabel: string;
    issuedAt: string;
  } | null>(null);

  useEffect(() => {
    const savedPass = localStorage.getItem('urayama_fest_digital_pass');
    if (savedPass) {
      try {
        setIssuedPass(JSON.parse(savedPass));
      } catch {
        // fallback
      }
    }
  }, []);

  if (!isOpen) return null;

  const roleLabels: Record<string, string> = {
    general: '一般来場者 (General Guest)',
    highschool: '高校生・受験生 (Prospective Student)',
    student: '学内生 (Current Student)',
    alumni: '卒業生・保護者 (Alumni & Family)'
  };

  const dayLabels: Record<string, string> = {
    day1: 'DAY 1 (11.01 SAT)',
    day2: 'DAY 2 (11.02 SUN)',
    both: '2DAYS ALL PASS (11.01 - 11.02)'
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = userName.trim() || 'GUEST-ATTENDEE';
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const serial = `URF-2026-${randomDigits}`;
    const newPass = {
      serial,
      name: finalName,
      roleLabel: roleLabels[userRole],
      dayLabel: dayLabels[attendDay],
      issuedAt: new Date().toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    setIssuedPass(newPass);
    localStorage.setItem('urayama_fest_digital_pass', JSON.stringify(newPass));

    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ef4444', '#f59e0b', '#ffffff']
    });
  };

  const handleResetPass = () => {
    localStorage.removeItem('urayama_fest_digital_pass');
    setIssuedPass(null);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="bg-[#101014] border border-zinc-800 w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
          <div>
            <span className="text-[11px] font-mono-nums text-red-500 font-bold uppercase tracking-wider">
              FREE ADMISSION PASS
            </span>
            <h3 className="text-lg font-bold text-white font-display">
              デジタル入場整理券（QRパス）
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

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {!issuedPass ? (
            <form onSubmit={handleGenerate} className="space-y-4">
              <p className="text-xs text-zinc-400 leading-relaxed">
                混雑緩和・安全管理のため、ご来場者様ごとにデジタル整理券を発行しています。入場料は完全無料です。
              </p>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">
                  お名前 または ニックネーム
                </label>
                <input
                  type="text"
                  required
                  placeholder="例: 山田 太郎 / KEN"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-red-500 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">
                  ご来場区分
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { id: 'general', label: '一般来場者' },
                    { id: 'highschool', label: '高校生・受験生' },
                    { id: 'student', label: '在学生' },
                    { id: 'alumni', label: '卒業生・保護者' }
                  ].map((r) => (
                    <button
                      type="button"
                      key={r.id}
                      onClick={() => setUserRole(r.id as any)}
                      className={`p-2.5 rounded-lg border text-left transition-all ${
                        userRole === r.id
                          ? 'bg-red-950/50 border-red-500 text-white font-semibold'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">
                  来場予定日
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs font-mono-nums">
                  {[
                    { id: 'both', label: '2日間両日' },
                    { id: 'day1', label: '11.01 (土)' },
                    { id: 'day2', label: '11.02 (日)' }
                  ].map((d) => (
                    <button
                      type="button"
                      key={d.id}
                      onClick={() => setAttendDay(d.id as any)}
                      className={`p-2 rounded-lg border text-center transition-all ${
                        attendDay === d.id
                          ? 'bg-red-950/50 border-red-500 text-white font-bold'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 text-sm font-bold text-white bg-red-600 hover:bg-red-500 active:scale-95 rounded-xl shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>整理券（QRパス）を即時発行する</span>
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              {/* Luxury Dark Pass Card */}
              <div className="bg-gradient-to-br from-zinc-900 via-[#0a0a0c] to-black border-2 border-red-600/70 rounded-2xl p-6 shadow-2xl relative overflow-hidden print:border-black">
                {/* Holographic glowing lines effect */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-rose-600/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                  <div>
                    <span className="text-[10px] font-mono-nums text-red-500 font-extrabold uppercase tracking-widest block">
                      OFFICIAL ADMISSION PASS
                    </span>
                    <h4 className="font-display text-lg font-black text-white tracking-wide">
                      URAYAMA FESTIVAL 2026
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="font-mono-nums text-xs font-bold text-zinc-300 block">
                      {issuedPass.serial}
                    </span>
                    <span className="text-[9px] font-mono-nums text-emerald-400 flex items-center gap-1 justify-end">
                      <ShieldCheck className="w-3 h-3" /> VERIFIED
                    </span>
                  </div>
                </div>

                <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-6">
                  {/* Visitor details */}
                  <div className="space-y-3 w-full sm:w-auto text-center sm:text-left">
                    <div>
                      <span className="text-[10px] font-mono-nums text-zinc-500 uppercase">
                        ATTENDEE NAME
                      </span>
                      <div className="text-xl font-black text-white tracking-tight">
                        {issuedPass.name}
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono-nums text-zinc-500 uppercase">
                        CATEGORY / TICKET TYPE
                      </span>
                      <div className="text-xs font-semibold text-red-400">
                        {issuedPass.roleLabel}
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono-nums text-zinc-500 uppercase">
                        VALID DATES
                      </span>
                      <div className="text-xs font-mono-nums text-zinc-300">
                        {issuedPass.dayLabel}
                      </div>
                    </div>
                  </div>

                  {/* High Tech Dark QR Code SVG */}
                  <div className="bg-white p-3 rounded-xl shadow-lg shrink-0">
                    <svg width="100" height="100" viewBox="0 0 100 100" className="w-[100px] h-[100px]">
                      {/* Corner 1 */}
                      <rect x="5" y="5" width="26" height="26" fill="#000" />
                      <rect x="9" y="9" width="18" height="18" fill="#fff" />
                      <rect x="13" y="13" width="10" height="10" fill="#000" />

                      {/* Corner 2 */}
                      <rect x="69" y="5" width="26" height="26" fill="#000" />
                      <rect x="73" y="9" width="18" height="18" fill="#fff" />
                      <rect x="77" y="13" width="10" height="10" fill="#000" />

                      {/* Corner 3 */}
                      <rect x="5" y="69" width="26" height="26" fill="#000" />
                      <rect x="9" y="73" width="18" height="18" fill="#fff" />
                      <rect x="13" y="77" width="10" height="10" fill="#000" />

                      {/* Data dots matrix */}
                      <rect x="36" y="10" width="5" height="5" fill="#dc2626" />
                      <rect x="46" y="10" width="5" height="5" fill="#000" />
                      <rect x="56" y="15" width="5" height="5" fill="#000" />
                      <rect x="36" y="24" width="5" height="5" fill="#000" />
                      <rect x="48" y="24" width="5" height="5" fill="#000" />

                      <rect x="10" y="38" width="5" height="5" fill="#000" />
                      <rect x="22" y="44" width="5" height="5" fill="#000" />
                      <rect x="38" y="38" width="8" height="8" fill="#000" />
                      <rect x="52" y="38" width="5" height="5" fill="#dc2626" />
                      <rect x="62" y="44" width="6" height="6" fill="#000" />
                      <rect x="74" y="38" width="5" height="5" fill="#000" />
                      <rect x="85" y="44" width="5" height="5" fill="#000" />

                      <rect x="38" y="52" width="6" height="6" fill="#000" />
                      <rect x="48" y="52" width="6" height="6" fill="#dc2626" />
                      <rect x="58" y="56" width="5" height="5" fill="#000" />
                      <rect x="72" y="52" width="5" height="5" fill="#000" />

                      <rect x="36" y="72" width="5" height="5" fill="#000" />
                      <rect x="46" y="76" width="5" height="5" fill="#000" />
                      <rect x="56" y="72" width="8" height="8" fill="#dc2626" />
                      <rect x="72" y="72" width="6" height="6" fill="#000" />
                      <rect x="84" y="80" width="6" height="6" fill="#000" />
                    </svg>
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[10px] font-mono-nums text-zinc-500">
                  <span>ISSUED: {issuedPass.issuedAt}</span>
                  <span className="text-zinc-400">PRESENT AT ENTRANCE GATE</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={handleResetPass}
                  className="text-xs text-zinc-500 hover:text-red-400 transition-colors"
                >
                  新しく作り直す
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrint}
                    className="px-4 py-2 text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-800 rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>印刷・PDF保存</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="px-5 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-500 rounded-lg shadow-[0_0_12px_rgba(239,68,68,0.3)] transition-all"
                  >
                    完了
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
