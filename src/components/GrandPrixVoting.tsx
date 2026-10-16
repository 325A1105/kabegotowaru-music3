import React, { useState, useEffect } from 'react';
import { Trophy, Check, Flame, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GRAND_PRIX_CANDIDATES } from '../data/festivalData';

export const GrandPrixVoting: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'stage' | 'stall' | 'exhibit'>('stage');
  const [votes, setVotes] = useState<Record<string, number>>({});
  const [userVoted, setUserVoted] = useState<Record<string, string>>({}); // { category: candidateId }

  useEffect(() => {
    // Load persisted votes and user's voted choices
    const savedVotes = localStorage.getItem('urayama_fest_votes');
    const savedUserVoted = localStorage.getItem('urayama_fest_user_voted');

    if (savedVotes) {
      try {
        setVotes(JSON.parse(savedVotes));
      } catch {
        // fallback
      }
    } else {
      const initial: Record<string, number> = {};
      GRAND_PRIX_CANDIDATES.forEach((c) => {
        initial[c.id] = c.votes;
      });
      setVotes(initial);
    }

    if (savedUserVoted) {
      try {
        setUserVoted(JSON.parse(savedUserVoted));
      } catch {
        // fallback
      }
    }
  }, []);

  const candidatesForCategory = GRAND_PRIX_CANDIDATES.filter(
    (c) => c.category === activeTab
  );

  const totalVotesInCategory = candidatesForCategory.reduce(
    (acc, c) => acc + (votes[c.id] || c.votes),
    0
  );

  const handleVote = (candidateId: string) => {
    const prevChoice = userVoted[activeTab];
    const newVotes = { ...votes };

    if (prevChoice && prevChoice !== candidateId) {
      newVotes[prevChoice] = Math.max(0, (newVotes[prevChoice] || 0) - 1);
    }

    if (prevChoice !== candidateId) {
      newVotes[candidateId] = (newVotes[candidateId] || 0) + 1;
    }

    const newUserVoted = { ...userVoted, [activeTab]: candidateId };

    setVotes(newVotes);
    setUserVoted(newUserVoted);

    localStorage.setItem('urayama_fest_votes', JSON.stringify(newVotes));
    localStorage.setItem('urayama_fest_user_voted', JSON.stringify(newUserVoted));

    // Celebratory confetti burst
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#ef4444', '#dc2626', '#f59e0b', '#ffffff']
    });
  };

  return (
    <section id="grandprix" className="py-20 border-t border-zinc-800/80 relative bg-zinc-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono-nums text-red-500 uppercase tracking-widest font-semibold">
              <span>04. FESTIVAL GRAND PRIX</span>
              <span className="text-zinc-600" aria-hidden="true">·</span>
              <span>来場者リアルタイム投票</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
              学祭グランプリ 2026
              <Trophy className="w-8 h-8 text-amber-500" />
            </h2>
            <p className="text-sm text-zinc-400 max-w-xl">
              あなたの1票が頂点を決める。ステージ・模擬店グルメ・展示企画の3部門でリアルタイム投票を受付中。結果は2日目フィナーレで発表！
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-zinc-900 border border-zinc-800 rounded-xl self-start md:self-auto">
            <button
              onClick={() => setActiveTab('stage')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'stage'
                  ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              ステージ部門
            </button>
            <button
              onClick={() => setActiveTab('stall')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'stall'
                  ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              模擬店グルメ部門
            </button>
            <button
              onClick={() => setActiveTab('exhibit')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'exhibit'
                  ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              展示・企画部門
            </button>
          </div>
        </div>

        {/* Candidates List with Animated Progress Bars */}
        <div className="space-y-4">
          {candidatesForCategory.map((candidate, index) => {
            const currentCount = votes[candidate.id] || candidate.votes;
            const percentage = totalVotesInCategory > 0
              ? Math.round((currentCount / totalVotesInCategory) * 100)
              : 0;
            const isMyChoice = userVoted[activeTab] === candidate.id;

            return (
              <div
                key={candidate.id}
                className={`bg-[#101014] border rounded-2xl p-6 transition-all ${
                  isMyChoice
                    ? 'border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.2)] bg-gradient-to-r from-red-950/20 via-[#101014] to-[#101014]'
                    : 'border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  {/* Left: Info */}
                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono-nums text-xs font-bold text-zinc-500">
                        #{index + 1}
                      </span>
                      <span className="text-zinc-600" aria-hidden="true">·</span>
                      <span className="text-xs font-mono-nums text-red-400 font-medium">
                        {candidate.type}
                      </span>
                      {isMyChoice && (
                        <span className="text-[10px] font-mono-nums bg-red-600 text-white px-2 py-0.5 rounded font-bold ml-2 flex items-center gap-1">
                          <Check className="w-3 h-3" /> 投票済み
                        </span>
                      )}
                    </div>

                    <h3 className="font-display text-xl font-bold text-white truncate">
                      {candidate.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                      {candidate.description}
                    </p>

                    {/* Progress Bar & Stats */}
                    <div className="pt-2 space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-mono-nums">
                        <span className="text-zinc-400">得票率 {percentage}%</span>
                        <span className="text-white font-bold tabular-nums">
                          {currentCount.toLocaleString()} 票
                        </span>
                      </div>
                      <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 rounded-full ${
                            index === 0
                              ? 'bg-gradient-to-r from-red-600 to-amber-500'
                              : 'bg-zinc-600'
                          }`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right: Vote Action Button */}
                  <div className="shrink-0 self-end md:self-center">
                    <button
                      onClick={() => handleVote(candidate.id)}
                      className={`px-5 py-3 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
                        isMyChoice
                          ? 'bg-zinc-800 text-zinc-300 border border-zinc-700'
                          : 'bg-red-600 hover:bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)] active:scale-95'
                      }`}
                    >
                      <Flame className={`w-4 h-4 ${isMyChoice ? 'text-red-500' : 'text-white'}`} />
                      <span>{isMyChoice ? '投票を取り消す' : 'この企画に投票する'}</span>
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
