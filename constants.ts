
import { MusicPiece, MusicalPeriod } from './types';

export const PERIOD_COLORS: Record<MusicalPeriod, string> = {
  [MusicalPeriod.MEDIEVAL]: 'bg-amber-900',
  [MusicalPeriod.RENAISSANCE]: 'bg-emerald-800',
  [MusicalPeriod.BAROQUE]: 'bg-indigo-800',
  [MusicalPeriod.CLASSICAL]: 'bg-blue-600',
  [MusicalPeriod.ROMANTIC]: 'bg-rose-700',
  [MusicalPeriod.MODERN]: 'bg-slate-700',
};

/**
 * Generates a Firebase Storage public download URL.
 * @param fileName The name of the file in the bucket
 */
const createAudioPath = (fileName: string) => {
  const baseUrl = "https://firebasestorage.googleapis.com/v0/b/musictrainer-6ddbe.firebasestorage.app/o/";
  // alt=media is required to tell Firebase to serve the file content instead of metadata
  return `${baseUrl}${encodeURIComponent(fileName)}?alt=media`;
};

export const MUSIC_LIBRARY: MusicPiece[] = [
  {
    id: 'gregorian-chant',
    title: 'Gregoriansk sång',
    composer: 'Anonymous',
    year: 800,
    period: MusicalPeriod.MEDIEVAL,
    description: 'The foundation of Western music: sacred, monophonic, unaccompanied vocal music of the Roman Catholic Church.',
    fileName: 'Nr 001  Gregoriansk sång (medelid).mp3',
    audioUrl: createAudioPath('Nr 001  Gregoriansk sång (medelid).mp3')
  },
  {
    id: 'medieval-secular',
    title: 'Medeltida profan musik (Strada Bransle)',
    composer: 'Anonymous',
    year: 1300,
    period: MusicalPeriod.MEDIEVAL,
    description: 'Secular dance music of the Middle Ages, often featuring rhythmic vitality and early folk instruments.',
    fileName: 'Nr 002  Medeltida profan musik (Strada Bransle).mp3',
    audioUrl: createAudioPath('Nr 002  Medeltida profan musik (Strada Bransle).mp3')
  },
  {
    id: 'bach-toccata',
    title: 'Toccata och fuga i D-moll',
    composer: 'J. S. Bach',
    year: 1704,
    period: MusicalPeriod.BAROQUE,
    description: 'One of the most famous organ pieces in history, known for its dramatic flair and counterpoint.',
    fileName: 'Nr 003  Toccata och fuga i D-moll.mp3',
    audioUrl: createAudioPath('Nr 003  Toccata och fuga i D-moll.mp3')
  },
  {
    id: 'vivaldi-spring',
    title: 'Våren (Spring) - The Four Seasons',
    composer: 'Antonio Vivaldi',
    year: 1723,
    period: MusicalPeriod.BAROQUE,
    description: 'A masterpiece of programmatic music, depicting the arrival of spring through vivid violin techniques.',
    fileName: 'Nr 005  Våren (ur De fyra årstiderna).mp3',
    audioUrl: createAudioPath('Nr 005  Våren (ur De fyra årstiderna).mp3')
  },
  {
    id: 'handel-hallelujah',
    title: 'Halleluja (Messiah)',
    composer: 'George Frideric Handel',
    year: 1741,
    period: MusicalPeriod.BAROQUE,
    description: 'The triumphant pinnacle of the Baroque oratorio, celebrating spiritual victory.',
    fileName: 'Nr 006  Halleluja (ur Messias).mp3',
    audioUrl: createAudioPath('Nr 006  Halleluja (ur Messias).mp3')
  },
  {
    id: 'hildegard-hortus',
    title: 'Hortus Deliciarum',
    composer: 'Hildegard von Bingen',
    year: 1175,
    period: MusicalPeriod.MEDIEVAL,
    description: 'Ethereal monophonic chant from one of the most remarkable figures of the Middle Ages.',
    fileName: 'Hildegard von Bingen - Hortus Deliciarum.mp3',
    audioUrl: createAudioPath('Hildegard von Bingen - Hortus Deliciarum.mp3')
  },
  {
    id: 'tallis-spem',
    title: 'Spem In Alium',
    composer: 'Thomas Tallis',
    year: 1570,
    period: MusicalPeriod.RENAISSANCE,
    description: 'A monumental 40-part Renaissance motet, showcasing the peak of English polyphony.',
    fileName: 'Spem In Alium (Thomas Tallis) - Tallis Scholars.mp3',
    audioUrl: createAudioPath('Spem In Alium (Thomas Tallis) - Tallis Scholars.mp3')
  },
  {
    id: 'dowland-lute',
    title: 'Lute Classical Music',
    composer: 'John Dowland',
    year: 1600,
    period: MusicalPeriod.RENAISSANCE,
    description: 'Melancholic and intricate lute songs that defined the late Renaissance aesthetic.',
    fileName: 'John Dowland - 2 Hours With The Best Lute Classical Music HQ.mp3',
    audioUrl: createAudioPath('John Dowland - 2 Hours With The Best Lute Classical Music HQ.mp3')
  },
  {
    id: 'bach-harpsichord',
    title: 'Harpsichord Concertos',
    composer: 'J. S. Bach',
    year: 1738,
    period: MusicalPeriod.BAROQUE,
    description: 'Virtuosic keyboard writing that helped transition the harpsichord to a solo instrument status.',
    fileName: 'J. S. Bach - Harpsichord Concertos.mp3',
    audioUrl: createAudioPath('J. S. Bach - Harpsichord Concertos.mp3')
  },
  {
    id: 'mozart-nachtmusik',
    title: 'Eine Kleine Nachtmusik',
    composer: 'Wolfgang Amadeus Mozart',
    year: 1787,
    period: MusicalPeriod.CLASSICAL,
    description: 'A quintessential example of the Classical style: balanced, elegant, and perfectly structured.',
    fileName: 'Eine Kleine Nachtmusik - Mozart.mp3',
    audioUrl: createAudioPath('Eine Kleine Nachtmusik - Mozart.mp3')
  },
  {
    id: 'beethoven-sym1',
    title: 'Symphony No. 1 in C Major',
    composer: 'Ludwig van Beethoven',
    year: 1800,
    period: MusicalPeriod.CLASSICAL,
    description: 'Beethoven\'s symphonic debut, honoring Haydn and Mozart while hinting at his future revolutionary spirit.',
    fileName: 'Beethoven Symphony No. 1 in C Major, Op. 21 III. Menuetto. Allegro molto e vivace.mp3',
    audioUrl: createAudioPath('Beethoven Symphony No. 1 in C Major, Op. 21 III. Menuetto. Allegro molto e vivace.mp3')
  },
  {
    id: 'wienklassicism',
    title: 'Wienklassicism Representative',
    composer: 'Viennese Masters',
    year: 1780,
    period: MusicalPeriod.CLASSICAL,
    description: 'Music representing the peak of the Viennese Classical period.',
    fileName: 'wienklassicism.mp3',
    audioUrl: createAudioPath('wienklassicism.mp3')
  },
  {
    id: 'tchaikovsky-swan',
    title: 'Swan Lake',
    composer: 'Pyotr Ilyich Tchaikovsky',
    year: 1875,
    period: MusicalPeriod.ROMANTIC,
    description: 'Highly emotional and lyrical ballet music that defines the late Romantic period.',
    fileName: 'Swan Lake - Tchaikovsky.mp3',
    audioUrl: createAudioPath('Swan Lake - Tchaikovsky.mp3')
  },
  {
    id: 'puccini-la-boheme',
    title: 'Musetta\'s Waltz (La Bohème)',
    composer: 'Giacomo Puccini',
    year: 1896,
    period: MusicalPeriod.ROMANTIC,
    description: 'A flirtatious and sweeping aria showcasing Puccini\'s gift for verismo melody.',
    fileName: 'Puccini - La Bohème - Musettas Waltz.mp3',
    audioUrl: createAudioPath('Puccini - La Bohème - Musettas Waltz.mp3')
  },
  {
    id: 'peterson-berger',
    title: 'Frösöblomster',
    composer: 'Wilhelm Peterson-Berger',
    year: 1896,
    period: MusicalPeriod.ROMANTIC,
    description: 'Swedish national romanticism at its finest, evoking the landscapes of Jämtland.',
    fileName: 'Wilhelm Peterson-Berger - Frösöblomster.mp3',
    audioUrl: createAudioPath('Wilhelm Peterson-Berger - Frösöblomster.mp3')
  },
  {
    id: 'debussy-clair',
    title: 'Clair de Lune',
    composer: 'Claude Debussy',
    year: 1905,
    period: MusicalPeriod.MODERN,
    description: 'The definitive Impressionist piano work, prioritizing color and mood over traditional harmony.',
    fileName: 'CLAUDE DEBUSSY  CLAIR DE LUNE.mp3',
    audioUrl: createAudioPath('CLAUDE DEBUSSY  CLAIR DE LUNE.mp3')
  },
  {
    id: 'satie-gymnopedie',
    title: 'Gymnopédie No.1',
    composer: 'Erik Satie',
    year: 1888,
    period: MusicalPeriod.MODERN,
    description: 'Minimalist and atmospheric, challenging the heavy textures of late Romanticism.',
    fileName: 'Erik Satie - Gymnopédie No.1.mp3',
    audioUrl: createAudioPath('Erik Satie - Gymnopédie No.1.mp3')
  },
  {
    id: 'schoenberg-suite',
    title: 'Suite for Piano, Op.25',
    composer: 'Arnold Schoenberg',
    year: 1921,
    period: MusicalPeriod.MODERN,
    description: 'A revolutionary twelve-tone composition that redefined musical organization.',
    fileName: 'Schoenberg Suite for Piano, Op.25 (Boffard).mp3',
    audioUrl: createAudioPath('Schoenberg Suite for Piano, Op.25 (Boffard).mp3')
  },
  {
    id: 'webern-5pieces',
    title: '5 Pieces for Orchestra',
    composer: 'Anton Webern',
    year: 1913,
    period: MusicalPeriod.MODERN,
    description: 'Hyper-condensed expressionism where every single note carries intense weight.',
    fileName: 'Webern 5 Pieces for Orchestra, Op. posth III. Sehr bewegte Viertel.mp3',
    audioUrl: createAudioPath('Webern 5 Pieces for Orchestra, Op. posth III. Sehr bewegte Viertel.mp3')
  }
];
