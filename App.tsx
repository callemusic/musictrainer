
import React, { useState } from 'react';
import { Timeline } from './components/Timeline';
import { Quiz } from './components/Quiz';
import { BookOpen, Gamepad2, Info, Cloud } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'quiz'>('timeline');

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
              <BookOpen size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-stone-800 tracking-tight">Musikepoker</h1>
              <p className="text-xs text-stone-500 font-medium uppercase tracking-widest">Musikhistoria</p>
            </div>
          </div>

          <nav className="flex bg-stone-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('timeline')}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-all duration-200 ${
                activeTab === 'timeline'
                  ? 'bg-white text-indigo-600 shadow-sm font-semibold'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <Info size={18} />
              <span>Tidslinje</span>
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-all duration-200 ${
                activeTab === 'quiz'
                  ? 'bg-white text-indigo-600 shadow-sm font-semibold'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <Gamepad2 size={18} />
              <span>Lyssna & Gissa</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-5xl mx-auto w-full px-4 py-8">
        {activeTab === 'timeline' ? <Timeline /> : <Quiz />}
      </main>

      {/* Footer */}
      <footer className="bg-stone-100 border-t border-stone-200 py-8 text-center text-stone-500 text-sm">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Cloud size={14} className="text-indigo-400" />
          <p>© 2024 Musikepoker. Ansluten till Firebase Storage.</p>
        </div>
        <p className="text-[10px] opacity-60">Använd tidslinjen för att spara filer lokalt för offlinestudier.</p>
      </footer>
    </div>
  );
};

export default App;
