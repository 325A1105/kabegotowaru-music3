import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, FileText, Music2, X } from 'lucide-react';
import { darkBeatEngine } from '../utils/audioEngine';
import { FESTIVAL_INFO, LYRICS_LINES } from '../data/festivalData';

export const AudioThemePlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [showLyricsModal, setShowLyricsModal] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const unsubscribe = darkBeatEngine.addListener((_step, elapsedSec) => {
      // Find current lyric line based on elapsed time (loop around 90 seconds)
      const loopTime = elapsedSec % 90;
      let activeIndex = 0;
      for (let i = 0; i < LYRICS_LINES.length; i++) {
        if (loopTime >= LYRICS_LINES[i].time) {
          activeIndex = i;
        } else {
          break;
        }
      }
      setCurrentLineIndex(activeIndex);
    });

    return () => {
      unsubscribe();
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  // Canvas visualizer loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      animFrameRef.current = requestAnimationFrame(render);
      const analyser = darkBeatEngine.getAnalyser();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!analyser || !darkBeatEngine.getIsPlaying()) {
        // Idle gentle waveform
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.25)';
        ctx.lineWidth = 1.5;
        const width = canvas.width;
        const height = canvas.height;
        for (let x = 0; x < width; x += 3) {
          const y = height / 2 + Math.sin(x * 0.05 + Date.now() * 0.003) * 2;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        return;
      }

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(dataArray);

      const width = canvas.width;
      const height = canvas.height;
      const barCount = 28;
      const barWidth = Math.floor(width / barCount) - 2;

      for (let i = 0; i < barCount; i++) {
        // sample frequencies biased towards sub-bass and mids
        const index = Math.floor((i / barCount) * (bufferLength * 0.6));
        const value = dataArray[index] || 0;
        const percent = value / 255;
        const barHeight = Math.max(3, percent * (height - 4));

        const x = i * (barWidth + 2);
        const y = height - barHeight;

        // Gradient: from dark crimson to electric red/orange
        const grad = ctx.createLinearGradient(0, height, 0, y);
        grad.addColorStop(0, '#7f1d1d');
        grad.addColorStop(0.6, '#dc2626');
        grad.addColorStop(1, '#ef4444');

        ctx.fillStyle = grad;
        ctx.fillRect(x, y, barWidth, barHeight);
      }
    };

    render();

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  const handleTogglePlay = () => {
    const newState = darkBeatEngine.toggle();
    setIsPlaying(newState);
  };

  const handleToggleMute = () => {
    if (isMuted) {
      darkBeatEngine.setVolume(0.7);
      setIsMuted(false);
    } else {
      darkBeatEngine.setVolume(0);
      setIsMuted(true);
    }
  };

  return (
    <>
      <div className="w-full bg-zinc-950/90 border border-zinc-800/90 rounded-xl p-3 sm:p-4 backdrop-blur-md shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Track Info & Visualizer */}
          <div className="flex items-center gap-3.5 min-w-0 flex-1">
            <button
              onClick={handleTogglePlay}
              className={`w-11 h-11 rounded-lg flex items-center justify-center transition-all shrink-0 ${
                isPlaying
                  ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(239,68,68,0.5)]'
                  : 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-white'
              }`}
              title={isPlaying ? '停止' : '公式テーマソングを再生'}
              aria-label={isPlaying ? '音声を停止' : 'テーマソングを再生'}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-mono-nums text-red-500 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1">
                  <Music2 className="w-3 h-3 animate-pulse" />
                  THEME TRACK
                </span>
                <span className="text-zinc-600" aria-hidden="true">·</span>
                <span className="font-mono-nums text-zinc-400 text-[11px]">148 BPM / F Minor</span>
              </div>
              <h2 className="font-display text-sm font-bold text-white tracking-wide truncate">
                {FESTIVAL_INFO.officialTrack.title}
                <span className="text-zinc-400 font-normal text-xs ml-2 hidden sm:inline">
                  — {FESTIVAL_INFO.officialTrack.artist}
                </span>
              </h2>
            </div>
          </div>

          {/* Canvas Spectrum Display */}
          <div className="hidden lg:flex items-center bg-black/60 px-2.5 py-1.5 rounded border border-zinc-800/80 shrink-0">
            <canvas ref={canvasRef} width={130} height={28} className="w-[130px] h-[28px]" />
          </div>

          {/* Active Lyrics Ticker */}
          <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-3 shrink-0">
            <div className="bg-zinc-900/80 border border-zinc-800 px-3 py-1.5 rounded-lg flex items-center gap-2 max-w-[240px] sm:max-w-[260px]">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 animate-ping" />
              <p className="font-mono-nums text-xs text-zinc-200 truncate">
                &ldquo;{LYRICS_LINES[currentLineIndex]?.text || 'ここからだ。'}&rdquo;
              </p>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleToggleMute}
                className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded transition-colors"
                title={isMuted ? 'ミュート解除' : '消音'}
                aria-label={isMuted ? 'ミュート解除' : '消音'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setShowLyricsModal(true)}
                className="px-2.5 py-1.5 text-xs text-zinc-400 hover:text-white hover:bg-zinc-800 rounded border border-zinc-800 transition-colors flex items-center gap-1"
                title="歌詞カードを表示"
              >
                <FileText className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">歌詞</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lyrics Modal */}
      {showLyricsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#101014] border border-zinc-800 w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
              <div>
                <span className="text-[11px] font-mono-nums text-red-500 font-semibold uppercase tracking-wider">
                  OFFICIAL FESTIVAL ANTHEM
                </span>
                <h3 className="text-lg font-bold text-white">
                  {FESTIVAL_INFO.officialTrack.title} 歌詞
                </h3>
              </div>
              <button
                onClick={() => setShowLyricsModal(false)}
                className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
                aria-label="閉じる"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <div className="bg-zinc-950/70 p-3.5 rounded-lg border border-zinc-800/80 text-xs text-zinc-400 leading-relaxed">
                {FESTIVAL_INFO.officialTrack.description}
              </div>

              <div className="space-y-3 font-mono-nums text-sm">
                {LYRICS_LINES.map((line, idx) => {
                  const isActive = idx === currentLineIndex;
                  return (
                    <div
                      key={idx}
                      className={`p-2.5 rounded transition-all flex items-baseline justify-between ${
                        isActive
                          ? 'bg-red-950/40 text-red-400 border-l-2 border-red-500 pl-3 font-bold'
                          : 'text-zinc-300 hover:text-white'
                      }`}
                    >
                      <span>{line.text}</span>
                      <span className="text-[10px] text-zinc-600 font-mono-nums">
                        {String(Math.floor(line.time / 60)).padStart(2, '0')}:
                        {String(line.time % 60).padStart(2, '0')}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-4 border-t border-zinc-800 bg-zinc-950/50 flex justify-end">
              <button
                onClick={() => setShowLyricsModal(false)}
                className="px-4 py-2 text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
