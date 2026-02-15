
export enum MusicalPeriod {
  GREGORIAN = 'Gregoriansk sång',
  MEDIEVAL = 'Medeltiden',
  RENAISSANCE = 'Renässansen',
  BAROQUE = 'Barocken',
  CLASSICAL = 'Wienklassicismen',
  ROMANTIC = 'Romantiken',
  IMPRESSIONIST = 'Impressionismen',
  EXPRESSIONIST = 'Expressionismen'
}

export interface MusicPiece {
  id: string;
  title: string;
  composer: string;
  year: number;
  period: MusicalPeriod;
  description: string;
  fileName: string;
  audioUrl: string; // Pre-defined URL for default access
}

export interface UserFile {
  file: File;
  url: string;
  matchedId?: string;
}

export interface QuizState {
  currentPieceId: string | null;
  isPlaying: boolean;
  score: number;
  totalAnswered: number;
  feedback: 'correct' | 'wrong' | null;
}
