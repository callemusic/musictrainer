
import { MusicPiece, MusicalPeriod } from './types';

export const PERIOD_COLORS: Record<MusicalPeriod, string> = {
  [MusicalPeriod.GREGORIAN]: 'bg-yellow-800',
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
    period: MusicalPeriod.GREGORIAN,
    description: 'Kyrklig sång med bara en melodi (monofoni) och utan instrument. Detta var grunden för all västerländsk musik.',
    fileName: 'Nr 001 Gregoriansk sa\u030ang (medeltid).mp3',
    audioUrl: createAudioPath('Nr 001 Gregoriansk sa\u030ang (medeltid).mp3')
  },
  {
    id: 'medieval-secular',
    title: 'Medeltida profan musik (Strada Bransle)',
    composer: 'Anonymous',
    year: 1300,
    period: MusicalPeriod.MEDIEVAL,
    description: 'Världslig (icke-kyrklig) dansmusik från medeltiden med livfull rytm och enkla folkinstrument.',
    fileName: 'Nr 002 Medeltida profan musik (Strada Bransle).mp3',
    audioUrl: createAudioPath('Nr 002 Medeltida profan musik (Strada Bransle).mp3')
  },
  {
    id: 'bach-toccata',
    title: 'Toccata och fuga i D-moll',
    composer: 'J. S. Bach',
    year: 1704,
    period: MusicalPeriod.BAROQUE,
    description: 'Ett av historiens mest kända orgelverk. Kontrapunkt betyder att flera melodier spelas samtidigt och flätas samman.',
    fileName: 'Nr 003  Toccata och fuga i D-moll.mp3',
    audioUrl: createAudioPath('Nr 003  Toccata och fuga i D-moll.mp3')
  },
  {
    id: 'vivaldi-spring',
    title: 'Våren (Spring) - The Four Seasons',
    composer: 'Antonio Vivaldi',
    year: 1723,
    period: MusicalPeriod.BAROQUE,
    description: 'Programmusik = musik som berättar en historia. Här målar Vivaldi upp vårens ankomst med livfulla violiner.',
    fileName: 'Nr 005 Va\u030aren (ur De fyra a\u030arstiderna).mp3',
    audioUrl: createAudioPath('Nr 005 Va\u030aren (ur De fyra a\u030arstiderna).mp3')
  },
  {
    id: 'handel-hallelujah',
    title: 'Halleluja (Messiah)',
    composer: 'George Frideric Handel',
    year: 1741,
    period: MusicalPeriod.BAROQUE,
    description: 'Den mäktiga höjdpunkten i ett oratorium (= stort musikverk för kör och orkester med religiöst tema).',
    fileName: 'Nr 006 Halleluja (ur Messias).mp3',
    audioUrl: createAudioPath('Nr 006 Halleluja (ur Messias).mp3')
  },
  {
    id: 'hildegard-hortus',
    title: 'Hortus Deliciarum',
    composer: 'Hildegard von Bingen',
    year: 1175,
    period: MusicalPeriod.MEDIEVAL,
    description: 'Drömskt vacker ensam sångmelodi (monofoni) av en av medeltidens mest fascinerande personer — nun, författare och kompositör.',
    fileName: 'Hildegard von Bingen - Hortus Deliciarum-short.mp3',
    audioUrl: createAudioPath('Hildegard von Bingen - Hortus Deliciarum-short.mp3')
  },
  {
    id: 'tallis-spem',
    title: 'Spem In Alium',
    composer: 'Thomas Tallis',
    year: 1570,
    period: MusicalPeriod.RENAISSANCE,
    description: 'En enorm motet (= kyrkligt körstycke) för 40 röster! Polyfoni betyder att alla stämmor har egna melodier samtidigt.',
    fileName: 'Spem In Alium (Thomas Tallis) - Tallis Scholars.mp3',
    audioUrl: createAudioPath('Spem In Alium (Thomas Tallis) - Tallis Scholars.mp3')
  },
  {
    id: 'dowland-lute',
    title: 'Lute Classical Music',
    composer: 'John Dowland',
    year: 1600,
    period: MusicalPeriod.RENAISSANCE,
    description: 'Vemodiga och detaljrika sånger med luta (= gitarrliknande stränginstrument). Typiskt för den sena renässansen.',
    fileName: 'John Dowland Lute Classical Music.mp3',
    audioUrl: createAudioPath('John Dowland Lute Classical Music.mp3')
  },
  {
    id: 'bach-harpsichord',
    title: 'Harpsichord Concertos',
    composer: 'J. S. Bach',
    year: 1738,
    period: MusicalPeriod.BAROQUE,
    description: 'Tekniskt imponerande musik för cembalo (= tangentinstrument som knäpper strängarna istället för att slå på dem som ett piano).',
    fileName: 'J. S. Bach - Harpsichord Concertos.mp3',
    audioUrl: createAudioPath('J. S. Bach - Harpsichord Concertos.mp3')
  },
  {
    id: 'mozart-nachtmusik',
    title: 'Eine Kleine Nachtmusik',
    composer: 'Wolfgang Amadeus Mozart',
    year: 1787,
    period: MusicalPeriod.CLASSICAL,
    description: 'Klassisk musik i sitt tydligaste: snyggt balanserad, elegant och med tydlig struktur. En av Mozarts mest kända melodier.',
    fileName: 'Eine Kleine Nachtmusik - Mozart.mp3',
    audioUrl: createAudioPath('Eine Kleine Nachtmusik - Mozart.mp3')
  },
  {
    id: 'beethoven-sym1',
    title: 'Symphony No. 1 in C Major',
    composer: 'Ludwig van Beethoven',
    year: 1800,
    period: MusicalPeriod.CLASSICAL,
    description: 'Beethovens första symfoni. Han följer Haydn och Mozarts stil men visar redan tecken på sin egen kraftfulla och nytänkande stil.',
    fileName: 'Beethoven Symphony No. 1 in C Major, Op. 21 III. Menuetto. Allegro molto e vivace.mp3',
    audioUrl: createAudioPath('Beethoven Symphony No. 1 in C Major, Op. 21 III. Menuetto. Allegro molto e vivace.mp3')
  },
  {
    id: 'wienklassicism',
    title: 'Pukslaget',
    composer: 'Joseph Haydn',
    year: 1780,
    period: MusicalPeriod.CLASSICAL,
    description: 'Symfonin där ett plötsligt högt pukslag (= slag på en stor trumma) mitt i en lugn del skulle väcka sovande publik!',
    fileName: 'wienklassicism.mp3',
    audioUrl: createAudioPath('wienklassicism.mp3')
  },
  {
    id: 'tchaikovsky-swan',
    title: 'Swan Lake',
    composer: 'Pyotr Ilyich Tchaikovsky',
    year: 1875,
    period: MusicalPeriod.ROMANTIC,
    description: 'Känslosam och melodisk balettmusik. Romantiken handlade om starka känslor, dramatik och fantasi.',
    fileName: 'Swan Lake - Tchaikovsky.mp3',
    audioUrl: createAudioPath('Swan Lake - Tchaikovsky.mp3')
  },
  {
    id: 'puccini-la-boheme',
    title: 'Musetta\'s Waltz (La Bohème)',
    composer: 'Giacomo Puccini',
    year: 1896,
    period: MusicalPeriod.ROMANTIC,
    description: 'En charmig och svepande aria (= solosång i en opera). Verism = operastil som skildrar vardagliga människors liv och känslor.',
    fileName: 'Puccini - La Bohe\u0300me - Musettas Waltz.mp3',
    audioUrl: createAudioPath('Puccini - La Bohe\u0300me - Musettas Waltz.mp3')
  },
  {
    id: 'peterson-berger',
    title: 'Frösöblomster',
    composer: 'Wilhelm Peterson-Berger',
    year: 1896,
    period: MusicalPeriod.ROMANTIC,
    description: 'Svensk nationalromantik — musik inspirerad av den svenska naturen, här Jämtlands landskap. Stämningsfullt och vackert.',
    fileName: 'Wilhelm Peterson-Berger - Fro\u0308so\u0308blomster.mp3',
    audioUrl: createAudioPath('Wilhelm Peterson-Berger - Fro\u0308so\u0308blomster.mp3')
  },
  {
    id: 'debussy-clair',
    title: 'Clair de Lune',
    composer: 'Claude Debussy',
    year: 1905,
    period: MusicalPeriod.IMPRESSIONIST,
    description: 'Det mest kända impressionistiska pianostycket. Impressionism i musik = fokus på stämning och klangfärg, som ett "måleri i ljud".',
    fileName: 'CLAUDE DEBUSSY  CLAIR DE LUNE.mp3',
    audioUrl: createAudioPath('CLAUDE DEBUSSY  CLAIR DE LUNE.mp3')
  },
  {
    id: 'satie-gymnopedie',
    title: 'Gymnopédie No.1',
    composer: 'Erik Satie',
    year: 1888,
    period: MusicalPeriod.IMPRESSIONIST,
    description: 'Avskalat och drömskt — en reaktion mot romantikens tunga och stora orkesterljud. Få toner, mycket känsla.',
    fileName: 'Erik Satie - Gymnope\u0301die No.1.mp3',
    audioUrl: createAudioPath('Erik Satie - Gymnope\u0301die No.1.mp3')
  },
  {
    id: 'schoenberg-suite',
    title: 'Suite for Piano, Op.25',
    composer: 'Arnold Schoenberg',
    year: 1921,
    period: MusicalPeriod.EXPRESSIONIST,
    description: 'Tolvtonsteknik = alla 12 toner i en oktav används lika mycket, ingen ton är "hemma". Låter ovant och spännande!',
    fileName: 'Schoenberg Suite for Piano, Op.25 (Boffard).mp3',
    audioUrl: createAudioPath('Schoenberg Suite for Piano, Op.25 (Boffard).mp3')
  },
  {
    id: 'webern-5pieces',
    title: '5 Pieces for Orchestra',
    composer: 'Anton Webern',
    year: 1913,
    period: MusicalPeriod.EXPRESSIONIST,
    description: 'Extremt korta stycken där varje ton räknas. Expressionism = musik som uttrycker starka, ofta mörka känslor.',
    fileName: 'Webern 5 Pieces for Orchestra, Op. posth III. Sehr bewegte Viertel.mp3',
    audioUrl: createAudioPath('Webern 5 Pieces for Orchestra, Op. posth III. Sehr bewegte Viertel.mp3')
  },
  {
    id: 'propinan-melyor',
    title: 'Propinan de Melyor',
    composer: 'Anonymous',
    year: 1450,
    period: MusicalPeriod.RENAISSANCE,
    description: 'Livlig dansmusik från 1400-talets Spanien. En folklig melodi som visar renässansens glädje och energi — långt från kyrkans strikta musik.',
    fileName: 'Renaissance melodies - Propinan de Melyor XV Century (Anonymus).mp3',
    audioUrl: createAudioPath('Renaissance melodies - Propinan de Melyor XV Century (Anonymus).mp3')
  },
  {
    id: 'grieg-peer-gynt',
    title: 'Peer Gynt Suite',
    composer: 'Edvard Grieg',
    year: 1875,
    period: MusicalPeriod.ROMANTIC,
    description: 'Norsk nationalromantik — dramatisk orkestermusik skriven till Henrik Ibsens teaterpjäs. Innehåller bland annat den berömda "I Dovregubbens hall".',
    fileName: 'Peer Gynt Suite Edvard Griegs Masterpiece.mp3',
    audioUrl: createAudioPath('Peer Gynt Suite Edvard Griegs Masterpiece.mp3')
  },
  {
    id: 'schoenberg-wind-quintet',
    title: 'Wind Quintet, Op. 26',
    composer: 'Arnold Schoenberg',
    year: 1924,
    period: MusicalPeriod.EXPRESSIONIST,
    description: 'Tolvtonsmusik för blåskvintett (flöjt, oboe, klarinett, fagott och horn). Visar att Schoenbergs revolutionära teknik fungerar även i mindre, intim kammarmusik.',
    fileName: 'Arnold Schoenberg - Wind Quintet.mp3',
    audioUrl: createAudioPath('Arnold Schoenberg - Wind Quintet.mp3')
  }
];
