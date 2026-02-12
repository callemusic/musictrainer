
import { MusicPiece, MusicalPeriod } from './types';

export const PERIOD_COLORS: Record<MusicalPeriod, string> = {
  [MusicalPeriod.MEDIEVAL]: 'bg-amber-900',
  [MusicalPeriod.RENAISSANCE]: 'bg-emerald-800',
  [MusicalPeriod.BAROQUE]: 'bg-indigo-800',
  [MusicalPeriod.CLASSICAL]: 'bg-blue-600',
  [MusicalPeriod.ROMANTIC]: 'bg-rose-700',
  [MusicalPeriod.IMPRESSIONIST]: 'bg-teal-700',
  [MusicalPeriod.EXPRESSIONIST]: 'bg-slate-700',
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
    description: 'Grunden för västerländsk musik: sakral, monofon, ackompanjemangslös vokalmusik från den romersk-katolska kyrkan.',
    fileName: 'Nr 001 Gregoriansk sa\u030ang (medeltid).mp3',
    audioUrl: createAudioPath('Nr 001 Gregoriansk sa\u030ang (medeltid).mp3')
  },
  {
    id: 'medieval-secular',
    title: 'Medeltida profan musik (Strada Bransle)',
    composer: 'Anonymous',
    year: 1300,
    period: MusicalPeriod.MEDIEVAL,
    description: 'Profan dansmusik från medeltiden, ofta med rytmisk vitalitet och tidiga folkinstrument.',
    fileName: 'Nr 002 Medeltida profan musik (Strada Bransle).mp3',
    audioUrl: createAudioPath('Nr 002 Medeltida profan musik (Strada Bransle).mp3')
  },
  {
    id: 'bach-toccata',
    title: 'Toccata och fuga i D-moll',
    composer: 'J. S. Bach',
    year: 1704,
    period: MusicalPeriod.BAROQUE,
    description: 'Ett av historiens mest kända orgelverk, känt för sin dramatik och kontrapunkt.',
    fileName: 'Nr 003  Toccata och fuga i D-moll.mp3',
    audioUrl: createAudioPath('Nr 003  Toccata och fuga i D-moll.mp3')
  },
  {
    id: 'vivaldi-spring',
    title: 'Våren (Spring) - The Four Seasons',
    composer: 'Antonio Vivaldi',
    year: 1723,
    period: MusicalPeriod.BAROQUE,
    description: 'Ett mästerverk inom programmusiken som skildrar vårens ankomst genom livfulla violintekniker.',
    fileName: 'Nr 005 Va\u030aren (ur De fyra a\u030arstiderna).mp3',
    audioUrl: createAudioPath('Nr 005 Va\u030aren (ur De fyra a\u030arstiderna).mp3')
  },
  {
    id: 'handel-hallelujah',
    title: 'Halleluja (Messiah)',
    composer: 'George Frideric Handel',
    year: 1741,
    period: MusicalPeriod.BAROQUE,
    description: 'Det triumfatoriska höjdpunkten i barockoratoriet, en hyllning till andlig seger.',
    fileName: 'Nr 006 Halleluja (ur Messias).mp3',
    audioUrl: createAudioPath('Nr 006 Halleluja (ur Messias).mp3')
  },
  {
    id: 'hildegard-hortus',
    title: 'Hortus Deliciarum',
    composer: 'Hildegard von Bingen',
    year: 1175,
    period: MusicalPeriod.MEDIEVAL,
    description: 'Eterisk monofon sång från en av medeltidens mest anmärkningsvärda gestalter.',
    fileName: 'Hildegard von Bingen - Hortus Deliciarum-short.mp3',
    audioUrl: createAudioPath('Hildegard von Bingen - Hortus Deliciarum-short.mp3')
  },
  {
    id: 'tallis-spem',
    title: 'Spem In Alium',
    composer: 'Thomas Tallis',
    year: 1570,
    period: MusicalPeriod.RENAISSANCE,
    description: 'En monumental 40-stämmig renässansmotet som visar höjdpunkten av engelsk polyfoni.',
    fileName: 'Spem In Alium (Thomas Tallis) - Tallis Scholars.mp3',
    audioUrl: createAudioPath('Spem In Alium (Thomas Tallis) - Tallis Scholars.mp3')
  },
  {
    id: 'dowland-lute',
    title: 'Lute Classical Music',
    composer: 'John Dowland',
    year: 1600,
    period: MusicalPeriod.RENAISSANCE,
    description: 'Melankoliska och intrikata lutsånger som definierade senrenässansens estetik.',
    fileName: 'John Dowland Lute Classical Music.mp3',
    audioUrl: createAudioPath('John Dowland Lute Classical Music.mp3')
  },
  {
    id: 'bach-harpsichord',
    title: 'Harpsichord Concertos',
    composer: 'J. S. Bach',
    year: 1738,
    period: MusicalPeriod.BAROQUE,
    description: 'Virtuost klaverskrivande som hjälpte cembalon att bli ett soloinstrument.',
    fileName: 'J. S. Bach - Harpsichord Concertos.mp3',
    audioUrl: createAudioPath('J. S. Bach - Harpsichord Concertos.mp3')
  },
  {
    id: 'mozart-nachtmusik',
    title: 'Eine Kleine Nachtmusik',
    composer: 'Wolfgang Amadeus Mozart',
    year: 1787,
    period: MusicalPeriod.CLASSICAL,
    description: 'Ett typexempel på den klassiska stilen: balanserad, elegant och perfekt strukturerad.',
    fileName: 'Eine Kleine Nachtmusik - Mozart.mp3',
    audioUrl: createAudioPath('Eine Kleine Nachtmusik - Mozart.mp3')
  },
  {
    id: 'beethoven-sym1',
    title: 'Symphony No. 1 in C Major',
    composer: 'Ludwig van Beethoven',
    year: 1800,
    period: MusicalPeriod.CLASSICAL,
    description: 'Beethovens symfoniska debut, en hyllning till Haydn och Mozart med en antydan om hans framtida revolutionära anda.',
    fileName: 'Beethoven Symphony No. 1 in C Major, Op. 21 III. Menuetto. Allegro molto e vivace.mp3',
    audioUrl: createAudioPath('Beethoven Symphony No. 1 in C Major, Op. 21 III. Menuetto. Allegro molto e vivace.mp3')
  },
  {
    id: 'wienklassicism',
    title: 'Wienklassicism Representative',
    composer: 'Viennese Masters',
    year: 1780,
    period: MusicalPeriod.CLASSICAL,
    description: 'Musik som representerar höjdpunkten av Wienklassicismen.',
    fileName: 'wienklassicism.mp3',
    audioUrl: createAudioPath('wienklassicism.mp3')
  },
  {
    id: 'tchaikovsky-swan',
    title: 'Swan Lake',
    composer: 'Pyotr Ilyich Tchaikovsky',
    year: 1875,
    period: MusicalPeriod.ROMANTIC,
    description: 'Mycket emotionell och lyrisk balettmusik som definierar senromantiken.',
    fileName: 'Swan Lake - Tchaikovsky.mp3',
    audioUrl: createAudioPath('Swan Lake - Tchaikovsky.mp3')
  },
  {
    id: 'puccini-la-boheme',
    title: 'Musetta\'s Waltz (La Bohème)',
    composer: 'Giacomo Puccini',
    year: 1896,
    period: MusicalPeriod.ROMANTIC,
    description: 'En flirtig och svepande aria som visar Puccinis begåvning för verismens melodik.',
    fileName: 'Puccini - La Bohe\u0300me - Musettas Waltz.mp3',
    audioUrl: createAudioPath('Puccini - La Bohe\u0300me - Musettas Waltz.mp3')
  },
  {
    id: 'peterson-berger',
    title: 'Frösöblomster',
    composer: 'Wilhelm Peterson-Berger',
    year: 1896,
    period: MusicalPeriod.ROMANTIC,
    description: 'Svensk nationalromantik när den är som bäst, med Jämtlands landskap som inspiration.',
    fileName: 'Wilhelm Peterson-Berger - Fro\u0308so\u0308blomster.mp3',
    audioUrl: createAudioPath('Wilhelm Peterson-Berger - Fro\u0308so\u0308blomster.mp3')
  },
  {
    id: 'debussy-clair',
    title: 'Clair de Lune',
    composer: 'Claude Debussy',
    year: 1905,
    period: MusicalPeriod.IMPRESSIONIST,
    description: 'Det definitiva impressionistiska pianoverket, där klangfärg och stämning prioriteras framför traditionell harmoni.',
    fileName: 'CLAUDE DEBUSSY  CLAIR DE LUNE.mp3',
    audioUrl: createAudioPath('CLAUDE DEBUSSY  CLAIR DE LUNE.mp3')
  },
  {
    id: 'satie-gymnopedie',
    title: 'Gymnopédie No.1',
    composer: 'Erik Satie',
    year: 1888,
    period: MusicalPeriod.IMPRESSIONIST,
    description: 'Minimalistiskt och atmosfäriskt, en utmaning mot senromantikens tunga texturer.',
    fileName: 'Erik Satie - Gymnope\u0301die No.1.mp3',
    audioUrl: createAudioPath('Erik Satie - Gymnope\u0301die No.1.mp3')
  },
  {
    id: 'schoenberg-suite',
    title: 'Suite for Piano, Op.25',
    composer: 'Arnold Schoenberg',
    year: 1921,
    period: MusicalPeriod.EXPRESSIONIST,
    description: 'En revolutionär tolvtonskomposition som omdefinierade musikalisk organisation.',
    fileName: 'Schoenberg Suite for Piano, Op.25 (Boffard).mp3',
    audioUrl: createAudioPath('Schoenberg Suite for Piano, Op.25 (Boffard).mp3')
  },
  {
    id: 'webern-5pieces',
    title: '5 Pieces for Orchestra',
    composer: 'Anton Webern',
    year: 1913,
    period: MusicalPeriod.EXPRESSIONIST,
    description: 'Hyperkondenserad expressionism där varje enskild ton bär intensiv tyngd.',
    fileName: 'Webern 5 Pieces for Orchestra, Op. posth III. Sehr bewegte Viertel.mp3',
    audioUrl: createAudioPath('Webern 5 Pieces for Orchestra, Op. posth III. Sehr bewegte Viertel.mp3')
  }
];
