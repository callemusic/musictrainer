
import React, { useState, useRef, useEffect } from 'react';
import { MUSIC_LIBRARY, PERIOD_COLORS } from '../constants';
import { MusicalPeriod } from '../types';
import { Music, Calendar, User, Play, Pause, AlertTriangle, Upload, CheckCircle, Info } from 'lucide-react';
import { getAudioFile, saveAudioFile, getAllStoredFileNames } from '../audioStore';

export const Timeline: React.FC = () => {
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);
  const [failedIds, setFailedIds] = useState<Set<string>>(new Set());
  const [localFileNames, setLocalFileNames] = useState<Set<string>>(new Set());
  const [objectUrls, setObjectUrls] = useState<Record<string, string>>({});
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const sortedLibrary = [...MUSIC_LIBRARY].sort((a, b) => a.year - b.year);
  const periods = Object.values(MusicalPeriod);

  // Load existing persistent local files on mount
  useEffect(() => {
    const loadLocalFiles = async () => {
      try {
        const names = await getAllStoredFileNames();
        setLocalFileNames(new Set(names));
        
        const urls: Record<string, string> = {};
        for (const name of names) {
          const blob = await getAudioFile(name);
          if (blob) urls[name] = URL.createObjectURL(blob);
        }
        setObjectUrls(urls);
      } catch (e) {
        console.error("Failed to initialize local storage", e);
      }
    };
    loadLocalFiles();
    
    return () => {
      Object.values(objectUrls).forEach(URL.revokeObjectURL);
    };
  }, []);

  const toggleAudio = async (piece: typeof MUSIC_LIBRARY[0]) => {
    const id = piece.id;
    const fileName = piece.fileName;

    if (activeAudioId === id) {
      audioRef.current?.pause();
      setActiveAudioId(null);
    } else {
      if (audioRef.current) {
        // Stop current
        audioRef.current.pause();
        
        // Decide source: Local DB first, then Firebase
        const url = objectUrls[fileName] || piece.audioUrl;
        
        try {
          audioRef.current.src = url;
          audioRef.current.load();
          await audioRef.current.play();
          setActiveAudioId(id);
          setFailedIds(prev => {
            const next = new Set(prev);
            next.delete(id);
            return next;
          });
        } catch (err) {
          console.error("Playback failed for piece:", piece.title, "URL:", url, err);
          setFailedIds(prev => new Set(prev).add(id));
          setActiveAudioId(null);
        }
      }
    }
  };

  const handleManualUpload = async (piece: typeof MUSIC_LIBRARY[0], e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    await saveAudioFile(piece.fileName, file);
    const url = URL.createObjectURL(file);
    setObjectUrls(prev => ({ ...prev, [piece.fileName]: url }));
    setLocalFileNames(prev => new Set(prev).add(piece.fileName));
    setFailedIds(prev => {
      const next = new Set(prev);
      next.delete(piece.id);
      return next;
    });
  };

  const handleAudioError = () => {
    if (activeAudioId) {
      const error = audioRef.current?.error;
      console.warn("Audio error occurred:", error?.code, error?.message);
      setFailedIds(prev => new Set(prev).add(activeAudioId));
      setActiveAudioId(null);
    }
  };

  return (
    <div className="space-y-12 pb-20">
      <audio 
        ref={audioRef} 
        crossOrigin="anonymous"
        onEnded={() => setActiveAudioId(null)} 
        onPause={() => setActiveAudioId(prev => prev === activeAudioId ? null : prev)}
        onError={handleAudioError}
      />
      
      <section className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 md:p-8">
        <h2 className="text-3xl font-bold text-indigo-900 mb-4">Study Guide</h2>
        <p className="text-indigo-800 leading-relaxed max-w-3xl">
          Explore the evolution of Western music. Tracks stream from <strong>Firebase Storage</strong>. 
          If a track fails, ensure your Firebase bucket allows <strong>public read access</strong>. 
          You can also manually upload files to cache them locally.
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          {periods.map(period => (
            <span 
              key={period} 
              className={`${PERIOD_COLORS[period]} text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider`}
            >
              {period}
            </span>
          ))}
        </div>
      </section>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-stone-200 -translate-x-1/2 rounded-full hidden md:block"></div>
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-stone-200 -translate-x-1/2 rounded-full md:hidden"></div>

        <div className="space-y-16">
          {sortedLibrary.map((piece, index) => {
            const isLeft = index % 2 === 0;
            const isPlaying = activeAudioId === piece.id;
            const hasFailed = failedIds.has(piece.id);
            const isLocal = localFileNames.has(piece.fileName);
            
            return (
              <div 
                key={piece.id} 
                className={`relative flex items-center w-full ${isLeft ? 'md:flex-row-reverse' : 'md:flex-row'} flex-row`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 w-6 h-6 rounded-full bg-white border-4 border-indigo-500 -translate-x-1/2 z-10 shadow-sm flex items-center justify-center">
                   <div className={`w-2 h-2 rounded-full ${PERIOD_COLORS[piece.period]}`}></div>
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-[45%] pl-16 md:pl-0 ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className={`bg-white rounded-2xl shadow-sm border p-6 transition-all duration-300 ${isPlaying ? 'border-indigo-500 ring-4 ring-indigo-50' : 'border-stone-200 hover:shadow-md'} ${hasFailed ? 'border-rose-300 bg-rose-50/30' : ''}`}>
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex gap-2 items-center">
                        <span className={`${PERIOD_COLORS[piece.period]} text-white text-[10px] font-black px-2 py-0.5 rounded-md uppercase`}>
                          {piece.period}
                        </span>
                        {isLocal && (
                          <span className="flex items-center gap-1 text-[10px] text-green-600 font-bold uppercase bg-green-50 px-2 py-0.5 rounded-md border border-green-100">
                            <CheckCircle size={10} /> Local
                          </span>
                        )}
                      </div>
                      <span className="flex items-center gap-1 text-stone-400 font-mono text-sm">
                        <Calendar size={14} />
                        {piece.year < 0 ? `${Math.abs(piece.year)} BC` : piece.year}
                      </span>
                    </div>
                    
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="text-xl font-bold text-stone-900 leading-tight flex items-center gap-2">
                        <Music className="text-indigo-500 shrink-0" size={20} />
                        {piece.title}
                      </h3>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => toggleAudio(piece)}
                          className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isPlaying ? 'bg-indigo-600 text-white' : hasFailed ? 'bg-rose-100 text-rose-600' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}
                        >
                          {isPlaying ? <Pause size={18} fill="currentColor" /> : hasFailed ? <AlertTriangle size={18} /> : <Play size={18} fill="currentColor" className="ml-1" />}
                        </button>
                        
                        {hasFailed && (
                          <label className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-indigo-50 text-indigo-600 hover:bg-indigo-100 cursor-pointer transition-colors shadow-sm" title="Upload missing file">
                            <Upload size={18} />
                            <input type="file" className="hidden" accept="audio/*" onChange={(e) => handleManualUpload(piece, e)} />
                          </label>
                        )}
                      </div>
                    </div>

                    {hasFailed && (
                      <p className="text-[10px] text-rose-500 font-bold uppercase mb-4 leading-tight">
                        Cloud source error. Check Firebase or upload manually.
                      </p>
                    )}

                    <div className="flex items-center gap-2 text-stone-600 mb-4">
                      <User size={16} />
                      <span className="text-sm font-medium">{piece.composer}</span>
                    </div>

                    <p className="text-stone-500 text-sm leading-relaxed border-t border-stone-100 pt-4 italic">
                      {piece.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
