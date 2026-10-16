import React, { useState } from 'react';
import { Bookmark, Menu, X, Ticket } from 'lucide-react';

interface NavbarProps {
  onOpenTicketModal: () => void;
  onOpenScheduleDrawer: () => void;
  savedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenTicketModal,
  onOpenScheduleDrawer,
  savedCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'ライブ特設', href: '#live-events' },
    { label: 'タイムテーブル', href: '#timetable' },
    { label: '模擬店＆マップ', href: '#stalls-map' },
    { label: '大抽選会', href: '#lottery' },
    { label: '学祭GP投票', href: '#grandprix' },
    { label: 'グッズ', href: '#merch' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#09090b]/85 border-b border-zinc-800/80 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 h-16">
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#" 
          className="font-display text-lg sm:text-xl font-extrabold tracking-tight text-white hover:text-red-500 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span className="text-red-500">■</span>
          <span>URAYAMA FEST &apos;26</span>
          <span className="text-zinc-500 text-xs font-normal font-mono-nums hidden sm:inline ml-1">
            [HAKYAKU]
          </span>
        </a>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-zinc-400">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-white transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-red-500/60"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action + My Schedule quick action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenScheduleDrawer}
            className="relative px-3 py-2 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors flex items-center gap-1.5 whitespace-nowrap"
            title="マイ予定表"
            aria-label="マイ予定表を開く"
          >
            <Bookmark className="w-3.5 h-3.5 text-zinc-400" />
            <span className="hidden sm:inline">マイ予定</span>
            {savedCount > 0 && (
              <span className="font-mono-nums text-[10px] bg-red-600 text-white font-bold px-1.5 py-0.2 rounded">
                {savedCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenTicketModal}
            className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-500 active:scale-95 rounded-lg transition-all shadow-[0_0_15px_rgba(239,68,68,0.35)] flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <Ticket className="w-3.5 h-3.5" />
            <span>デジタル整理券</span>
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white focus:outline-none"
            aria-label="メニューを開く"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-[#0c0c0e] px-4 py-4 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm text-zinc-300 hover:text-white bg-zinc-900/60 rounded border border-zinc-800/50"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
