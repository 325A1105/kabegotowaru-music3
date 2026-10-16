/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { LiveEventsSection } from './components/LiveEventsSection';
import { TimetableSection } from './components/TimetableSection';
import { StallsAndMapSection } from './components/StallsAndMapSection';
import { LotterySection } from './components/LotterySection';
import { GrandPrixVoting } from './components/GrandPrixVoting';
import { MerchSection } from './components/MerchSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { DigitalPassModal } from './components/DigitalPassModal';
import { PerformerModal } from './components/PerformerModal';
import { StallModal } from './components/StallModal';
import { MyScheduleDrawer } from './components/MyScheduleDrawer';
import { TimetableItem, StallItem } from './data/festivalData';

export default function App() {
  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  const [scheduleDrawerOpen, setScheduleDrawerOpen] = useState(false);
  const [selectedPerformer, setSelectedPerformer] = useState<TimetableItem | null>(null);
  const [selectedStall, setSelectedStall] = useState<StallItem | null>(null);
  const [savedItemIds, setSavedItemIds] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('urayama_fest_saved_items');
    if (saved) {
      try {
        setSavedItemIds(JSON.parse(saved));
      } catch {
        // fallback
      }
    }
  }, []);

  const handleToggleBookmark = (id: string) => {
    let updated: string[];
    let message = '';
    if (savedItemIds.includes(id)) {
      updated = savedItemIds.filter((item) => item !== id);
      message = 'マイ予定から削除しました';
    } else {
      updated = [...savedItemIds, id];
      message = 'マイ予定に追加しました';
    }
    setSavedItemIds(updated);
    localStorage.setItem('urayama_fest_saved_items', JSON.stringify(updated));

    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleClearAllSchedule = () => {
    setSavedItemIds([]);
    localStorage.removeItem('urayama_fest_saved_items');
    setToastMessage('マイ予定をすべてクリアしました');
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleScrollToTimetable = () => {
    const el = document.getElementById('timetable');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] bg-grid-dark selection:bg-red-600 selection:text-white">
      {/* Top Bar Navigation */}
      <Navbar
        onOpenTicketModal={() => setTicketModalOpen(true)}
        onOpenScheduleDrawer={() => setScheduleDrawerOpen(true)}
        savedCount={savedItemIds.length}
      />

      {/* Main Content Sections */}
      <main>
        <Hero
          onOpenTicketModal={() => setTicketModalOpen(true)}
          onScrollToTimetable={handleScrollToTimetable}
        />

        <AboutSection />

        <LiveEventsSection
          onScrollToTimetable={handleScrollToTimetable}
          onOpenTicketModal={() => setTicketModalOpen(true)}
        />

        <TimetableSection
          onSelectPerformer={(item) => setSelectedPerformer(item)}
          savedItemIds={savedItemIds}
          onToggleBookmark={handleToggleBookmark}
        />

        <StallsAndMapSection
          savedItemIds={savedItemIds}
          onToggleBookmark={handleToggleBookmark}
          onSelectStall={(stall) => setSelectedStall(stall)}
        />

        <LotterySection
          onOpenTicketModal={() => setTicketModalOpen(true)}
        />

        <GrandPrixVoting />

        <MerchSection />

        <FaqSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals & Drawers */}
      <DigitalPassModal
        isOpen={ticketModalOpen}
        onClose={() => setTicketModalOpen(false)}
      />

      <PerformerModal
        item={selectedPerformer}
        onClose={() => setSelectedPerformer(null)}
        isSaved={selectedPerformer ? savedItemIds.includes(selectedPerformer.id) : false}
        onToggleBookmark={handleToggleBookmark}
      />

      <StallModal
        stall={selectedStall}
        onClose={() => setSelectedStall(null)}
        isSaved={selectedStall ? savedItemIds.includes(selectedStall.id) : false}
        onToggleBookmark={handleToggleBookmark}
      />

      <MyScheduleDrawer
        isOpen={scheduleDrawerOpen}
        onClose={() => setScheduleDrawerOpen(false)}
        savedItemIds={savedItemIds}
        onToggleBookmark={handleToggleBookmark}
        onClearAll={handleClearAllSchedule}
      />

      {/* Subtle feedback toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-zinc-900 border border-zinc-700 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-xl animate-in slide-in-from-bottom-2">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
