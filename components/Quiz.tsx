
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { MUSIC_LIBRARY, PERIOD_COLORS } from '../constants';
import { UserFile, MusicalPeriod, MusicPiece } from '../types';
import { Upload, Play, Pause, RotateCcw, CheckCircle2, XCircle, Music, FileAudio, LayoutDashboard, AlertCircle, Database } from 'lucide-react';
import { getAudioFile, saveAudioFile, getAllStoredFileNames } from '../audioStore';

export const Quiz: React.FC = () => {
  const [localAudioUrls, setLocalAudioUrls] = useState<Record<string, string>>({});
  const [currentQuizPiece, setCurrentQuizPiece] = useState<MusicPiece | null>(null);
  const [currentFileUrl, setCurrentFileUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);
  const [selectedComposer, setSelectedComposer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showUploader, setShowUploader] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [syncStatus, setSyncStatus] = useState<string>('Initierar...');

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Load persistent library
  useEffect(() => {
    const initStore = async () => {
      try {
        const names = await getAllStoredFileNames();
        const urls: Record<string, string> = {};
        for (const name of names) {
          const blob = await getAudioFile(name);
          if (blob) urls[name] = URL.createObjectURL(blob);
        }
        setLocalAudioUrls(urls);
        setSyncStatus(`Lokal lagring synkad: ${names.length} filer`);
      } catch (e) {
        setSyncStatus('Lagringsfel');
      }
    };
    initStore();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    
    const filesArray = Array.from(e.target.files) as File[];
    
    setSyncStatus('Sparar i webbläsarens lagring...');
    const newUrls: Record<string, string> = { ...localAudioUrls };
    
    for (const file of filesArray) {
      const normalizedFileName = file.name.toLowerCase();
      const match = MUSIC_LIBRARY.find(piece => 
        normalizedFileName.includes(piece.title.toLowerCase()) || 
        normalizedFileName.includes(piece.composer.toLowerCase()) ||
        normalizedFileName.includes(piece.fileName.toLowerCase())
      );
      
      if (match) {
        await saveAudioFile(match.fileName, file);
        newUrls[match.fileName] = URL.createObjectURL(file);
      }
    }
    
    setLocalAudioUrls(newUrls);
    const count = Object.keys(newUrls).length;
    setSyncStatus(`Lokal lagring synkad: ${count} filer`);
    setShowUploader(false);
  };

  const startNextRound = () => {
    setLoadError(null);
    const piece = MUSIC_LIBRARY[Math.floor(Math.random() * MUSIC_LIBRARY.length)];
    const url = localAudioUrls[piece.fileName] || piece.audioUrl;
    
    setCurrentQuizPiece(piece);
    setCurrentFileUrl(url);
    setFeedback(null);
    setIsAnswered(false);
    setSelectedPeriod(null);
    setSelectedComposer(null);
    setIsPlaying(false);
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = url;
      audioRef.current.load();
    }
  };

  const togglePlayback = () => {
    if (!audioRef.current || !currentFileUrl) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(e => {
        console.error("Quiz playback error:", e);
        setLoadError(`Webbläsaren blockerade ljudströmmen. Kontrollera att din Firebase-bucket är publik.`);
        setIsPlaying(false);
      });
    }
  };

  const handleAudioError = () => {
    const error = audioRef.current?.error;
    console.error("Quiz audio error:", error?.code, error?.message);
    setLoadError(`Uppspelningsfel: Kunde inte ladda "${currentQuizPiece?.fileName}" från molnet.`);
    setIsPlaying(false);
  };

  const checkAnswer = () => {
    if (!currentQuizPiece) return;
    
    const isPeriodCorrect = selectedPeriod === currentQuizPiece.period;
    const isComposerCorrect = selectedComposer === currentQuizPiece.composer;

    if (isPeriodCorrect && isComposerCorrect) {
      setScore(s => s + 1);
      setFeedback('correct');
    } else {
      setFeedback('wrong');
    }
    setTotalAttempts(t => t + 1);
    setIsAnswered(true);
    setIsPlaying(false);
    audioRef.current?.pause();
  };

  const composersList = useMemo(() => 
    Array.from(new Set(MUSIC_LIBRARY.map(p => p.composer))).sort()
  , []);

  const periodsList = Object.values(MusicalPeriod);

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-20">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="text-center bg-indigo-50 px-4 py-2 rounded-xl">
            <span className="block text-[10px] font-bold text-indigo-400 uppercase">Poäng</span>
            <span className="text-2xl font-black text-indigo-600">{score}</span>
          </div>
          <div className="text-center bg-stone-50 px-4 py-2 rounded-xl">
            <span className="block text-[10px] font-bold text-stone-400 uppercase">Spelade</span>
            <span className="text-2xl font-black text-stone-600">{totalAttempts}</span>
          </div>
        </div>
        <button 
          onClick={startNextRound}
          className="flex items-center gap-2 bg-stone-900 hover:bg-black text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm active:scale-95"
        >
          <RotateCcw size={16} />
          {currentQuizPiece ? 'Nytt stycke' : 'Starta quiz'}
        </button>
      </div>

      {!currentQuizPiece ? (
        <div className="bg-white p-12 rounded-3xl border border-stone-200 text-center shadow-sm">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center">
              <LayoutDashboard size={40} />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-2">Quizläge redo</h3>
          <p className="text-stone-500 mb-8 max-w-sm mx-auto">
            {syncStatus}
          </p>
          <button 
            onClick={startNextRound}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-12 py-4 rounded-2xl font-black text-lg shadow-xl shadow-indigo-100 transition-all active:scale-95 flex items-center gap-3 mx-auto"
          >
            <Play size={20} fill="currentColor" />
            STARTA LYSSNINGSTEST
          </button>
        </div>
      ) : (
        <div className="space-y-6 animate-in fade-in duration-500">
          <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm overflow-hidden relative">
            {/* Progress bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-stone-100">
               {audioRef.current && (
                 <div 
                   className="h-full bg-indigo-500 transition-all duration-300" 
                   style={{ width: `${(audioRef.current.currentTime / (audioRef.current.duration || 1)) * 100}%` }}
                 />
               )}
            </div>

            <div className="flex flex-col items-center gap-6">
              {loadError ? (
                <div className="bg-rose-50 border border-rose-100 p-6 rounded-2xl text-center max-w-sm">
                   <AlertCircle className="text-rose-500 mx-auto mb-3" size={32} />
                   <h4 className="text-rose-900 font-bold mb-1">Källan misslyckades</h4>
                   <p className="text-rose-700 text-xs leading-relaxed mb-4">{loadError}</p>
                   <button 
                     onClick={startNextRound}
                     className="bg-white border border-rose-200 text-rose-600 px-4 py-2 rounded-lg text-xs font-bold hover:bg-rose-100 transition-colors"
                   >
                     Hoppa över
                   </button>
                </div>
              ) : (
                <div className={`w-24 h-24 rounded-full flex items-center justify-center shadow-inner transition-all duration-500 ${isPlaying ? 'bg-indigo-100 scale-110' : 'bg-stone-50'}`}>
                  <Music className={`${isPlaying ? 'text-indigo-600 animate-pulse' : 'text-stone-300'}`} size={40} />
                </div>
              )}
              
              <audio 
                ref={audioRef} 
                crossOrigin="anonymous"
                src={currentFileUrl || ''} 
                onEnded={() => setIsPlaying(false)}
                onTimeUpdate={() => setIsPlaying(audioRef.current?.paused === false)}
                onError={handleAudioError}
              />

              {!loadError && (
                <button 
                  onClick={togglePlayback}
                  disabled={isAnswered}
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                    isAnswered ? 'bg-stone-100 text-stone-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-100 active:scale-95'
                  }`}
                >
                  {isPlaying ? <Pause fill="white" /> : <Play fill="white" className="ml-1" />}
                </button>
              )}
              
              <p className="text-stone-400 text-xs font-medium uppercase tracking-widest">
                {loadError ? "Anslutning nekad" : "Lyssningstest"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="space-y-2">
               <label className="text-xs font-bold text-stone-500 uppercase px-2">Musikepok</label>
               <select 
                 disabled={isAnswered}
                 value={selectedPeriod || ''}
                 onChange={(e) => setSelectedPeriod(e.target.value)}
                 className="w-full p-4 rounded-2xl border border-stone-200 bg-white focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer hover:border-stone-300 transition-colors"
               >
                 <option value="" disabled>Välj epok...</option>
                 {periodsList.map(p => <option key={p} value={p}>{p}</option>)}
               </select>
             </div>
             <div className="space-y-2">
               <label className="text-xs font-bold text-stone-500 uppercase px-2">Kompositör</label>
               <select 
                 disabled={isAnswered}
                 value={selectedComposer || ''}
                 onChange={(e) => setSelectedComposer(e.target.value)}
                 className="w-full p-4 rounded-2xl border border-stone-200 bg-white focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer hover:border-stone-300 transition-colors"
               >
                 <option value="" disabled>Välj kompositör...</option>
                 {composersList.map(c => <option key={c} value={c}>{c}</option>)}
               </select>
             </div>
          </div>

          <button
            onClick={checkAnswer}
            disabled={!selectedPeriod || !selectedComposer || isAnswered}
            className={`w-full py-4 rounded-2xl font-black text-lg transition-all ${
              !selectedPeriod || !selectedComposer || isAnswered
                ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg active:scale-[0.98]'
            }`}
          >
            SVARA
          </button>

          {feedback && (
            <div className={`p-8 rounded-3xl border-2 animate-in fade-in slide-in-from-bottom-4 duration-500 ${
              feedback === 'correct' ? 'bg-green-50 border-green-100' : 'bg-rose-50 border-rose-100'
            }`}>
              <div className="flex items-start gap-4">
                <div className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                  feedback === 'correct' ? 'bg-green-200 text-green-700' : 'bg-rose-200 text-rose-700'
                }`}>
                  {feedback === 'correct' ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
                </div>
                <div className="flex-grow">
                  <h4 className={`text-xl font-bold mb-1 ${
                    feedback === 'correct' ? 'text-green-800' : 'text-rose-800'
                  }`}>
                    {feedback === 'correct' ? 'Helt rätt!' : 'Inte riktigt rätt...'}
                  </h4>
                  <p className="text-stone-600 text-sm mb-4">
                    Det var <strong>{currentQuizPiece.title}</strong> av <strong>{currentQuizPiece.composer}</strong> ({currentQuizPiece.period}).
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className={`${PERIOD_COLORS[currentQuizPiece.period]} text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase`}>
                      {currentQuizPiece.period}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
