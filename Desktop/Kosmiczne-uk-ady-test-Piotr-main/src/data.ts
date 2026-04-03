// ============================================================
// DATA.TS — Dane planet, astronomów, stanu aplikacji
// Kosmiczne Układy v1.0 | Vanta AI Studio
// ============================================================

export interface Planet {
  id: string;
  name: string;
  r: number;
  orbit: number;
  speed: number;
  glow?: boolean;
  ring?: boolean;
  clr: string;
  // Palette for photorealistic rendering
  palette?: {
    h: string; c: string; d: string; atm?: string; bands?: boolean;
  };
  desc?: string;
}

export interface AstronomerData {
  id: string;
  name: string;
  portrait: string;
  portraitHover: string;
  bioPic: string;
  bio: string;
  modelTitle: string;
  screenTitle: string;
  planets: Planet[];
}

export const ASTRONOMERS: AstronomerData[] = [
  {
    id: 'ptolemeusz',
    name: 'Ptolemeusz',
    portrait: 'pp_01.png',
    portraitHover: 'pp_01.png',
    bioPic: 'pp_01.png',
    bio: `<p>Klaudiusz Ptolemeusz (ok. 100–170 n.e.) był greckim astronomem, matematykiem i geografem, działającym w Aleksandrii. Stworzył geocentryczny model Wszechświata opisany w dziele <em>Almagest</em>, który dominował przez ponad 1400 lat.</p>
<p>Według modelu Ptolemeusza <strong>Ziemia znajdowała się w centrum Wszechświata</strong>, a Słońce, Księżyc i planety krążyły wokół niej po skomplikowanych torach zwanych epicyklami.</p>`,
    modelTitle: 'Układ słoneczny Ptolemeusza',
    screenTitle: 'Geocentryczny model układu słonecznego',
    planets: [
      { id:'ziemia',    name:'Ziemia',  r:22, orbit:0,   speed:0,    glow:false, clr:'#4488cc', palette:{h:'#88ccff',c:'#2266aa',d:'#0a2244',atm:'rgba(80,140,255,0.5)'} },
      { id:'ksiezyc',   name:'Księżyc', r:10, orbit:65,  speed:2.0,  glow:false, clr:'#c8c8c8', palette:{h:'#e0e0e0',c:'#999',d:'#555'} },
      { id:'merkury_p', name:'Merkury', r:9,  orbit:105, speed:1.6,  glow:false, clr:'#aaaaaa', palette:{h:'#e0e0e0',c:'#999',d:'#555'} },
      { id:'wenus_p',   name:'Wenus',   r:13, orbit:150, speed:1.1,  glow:false, clr:'#e8c060', palette:{h:'#ffe8a0',c:'#d4a840',d:'#806020',atm:'rgba(255,220,120,0.5)'} },
      { id:'slonce_p',  name:'Słońce',  r:22, orbit:205, speed:0.75, glow:true,  clr:'#FFA500' },
      { id:'mars_p',    name:'Mars',    r:12, orbit:258, speed:0.55, glow:false, clr:'#cc4422', palette:{h:'#ee8866',c:'#aa3311',d:'#551108',atm:'rgba(200,80,40,0.5)'} },
      { id:'jowisz_p',  name:'Jowisz',  r:17, orbit:315, speed:0.36, glow:false, clr:'#c8a060', palette:{h:'#f0d090',c:'#a07030',d:'#503010',bands:true} },
    ]
  },
  {
    id: 'kopernik',
    name: 'Mikołaj Kopernik',
    portrait: 'pp_02.png',
    portraitHover: 'pp_02_over.png',
    bioPic: 'kopernik.png',
    bio: `<p><strong>Mikołaj Kopernik</strong> był wybitnym polskim astronomem, matematykiem, lekarzem i duchownym, żył w latach 1473–1543. Urodzony w Toruniu, dorastał we Fromborku, gdzie spędził większość swojego życia prowadząc badania.</p>
<p>Kopernik zasłynął przede wszystkim jako <strong>twórca heliocentrycznej teorii budowy świata</strong>, według której Ziemia i inne planety krążą wokół Słońca. Była to rewolucyjna koncepcja, która zmieniła sposób myślenia o Wszechświecie i zapoczątkowała nowoczesną astronomię.</p>`,
    modelTitle: 'Układ słoneczny Mikołaja Kopernika',
    screenTitle: 'Model układu słonecznego wg. Mikołaja Kopernika',
    planets: [
      { id:'slonce_k',  name:'Słońce',  r:30, orbit:0,   speed:0,    glow:true,  clr:'#FFB700' },
      { id:'merkury_k', name:'Merkury', r:8,  orbit:65,  speed:2.3,  glow:false, clr:'#aaaaaa', palette:{h:'#e0e0e0',c:'#999',d:'#555'} },
      { id:'wenus_k',   name:'Wenus',   r:12, orbit:110, speed:1.55, glow:false, clr:'#e8c060', palette:{h:'#ffe8a0',c:'#d4a840',d:'#806020',atm:'rgba(255,220,120,0.5)'} },
      { id:'ziemia_k',  name:'Ziemia',  r:13, orbit:165, speed:1.0,  glow:false, clr:'#4488cc', palette:{h:'#88ccff',c:'#2266aa',d:'#0a2244',atm:'rgba(80,140,255,0.5)'} },
      { id:'mars_k',    name:'Mars',    r:11, orbit:225, speed:0.65, glow:false, clr:'#cc4422', palette:{h:'#ee8866',c:'#aa3311',d:'#551108',atm:'rgba(200,80,40,0.5)'} },
      { id:'jowisz_k',  name:'Jowisz',  r:22, orbit:300, speed:0.33, glow:false, clr:'#c8a060', palette:{h:'#f0d090',c:'#a07030',d:'#503010',bands:true} },
      { id:'saturn_k',  name:'Saturn',  r:20, orbit:375, speed:0.20, glow:false, clr:'#d4b870', ring:true, palette:{h:'#f8e0a0',c:'#b09040',d:'#604808',bands:true} },
    ]
  },
  {
    id: 'wspolczesny',
    name: 'Współczesny widok na układ słoneczny',
    portrait: 'pp_03.png',
    portraitHover: 'pp_03.png',
    bioPic: 'pp_03.png',
    bio: `<p><strong>Współczesny model układu słonecznego</strong> oparty jest na obserwacjach teleskopowych i misjach kosmicznych XX i XXI w.</p>
<p>Układ Słoneczny liczy <strong>8 planet</strong> krążących wokół Słońca: Merkury, Wenus, Ziemia, Mars, Jowisz, Saturn, Uran i Neptun. Jest jednym z miliardów układów planetarnych w Drodze Mlecznej.</p>`,
    modelTitle: 'Układ słoneczny Współczesny',
    screenTitle: 'Współczesny model układu słonecznego',
    planets: [
      { id:'slonce_w',  name:'Słońce',  r:30, orbit:0,   speed:0,    glow:true,  clr:'#FFB700' },
      { id:'merkury_w', name:'Merkury', r:7,  orbit:58,  speed:2.5,  glow:false, clr:'#aaaaaa', palette:{h:'#e0e0e0',c:'#999',d:'#555'} },
      { id:'wenus_w',   name:'Wenus',   r:11, orbit:100, speed:1.65, glow:false, clr:'#e8c060', palette:{h:'#ffe8a0',c:'#d4a840',d:'#806020',atm:'rgba(255,220,120,0.5)'} },
      { id:'ziemia_w',  name:'Ziemia',  r:12, orbit:148, speed:1.0,  glow:false, clr:'#4488cc', palette:{h:'#88ccff',c:'#2266aa',d:'#0a2244',atm:'rgba(80,140,255,0.5)'} },
      { id:'mars_w',    name:'Mars',    r:10, orbit:200, speed:0.62, glow:false, clr:'#cc4422', palette:{h:'#ee8866',c:'#aa3311',d:'#551108',atm:'rgba(200,80,40,0.5)'} },
      { id:'jowisz_w',  name:'Jowisz',  r:24, orbit:265, speed:0.31, glow:false, clr:'#c8a060', palette:{h:'#f0d090',c:'#a07030',d:'#503010',bands:true} },
      { id:'saturn_w',  name:'Saturn',  r:21, orbit:335, speed:0.21, glow:false, clr:'#d4b870', ring:true, palette:{h:'#f8e0a0',c:'#b09040',d:'#604808',bands:true} },
      { id:'uran_w',    name:'Uran',    r:16, orbit:400, speed:0.12, glow:false, clr:'#7de8e8', palette:{h:'#b0ffff',c:'#40c0c0',d:'#105050',atm:'rgba(100,230,230,0.5)'} },
      { id:'neptun_w',  name:'Neptun',  r:15, orbit:460, speed:0.08, glow:false, clr:'#3a70e8', palette:{h:'#80b0ff',c:'#2050cc',d:'#0a1866',atm:'rgba(60,100,240,0.5)'} },
    ]
  }
];

export interface WcagState {
  textSize: 1 | 2 | 3;
  highContrast: boolean;
  reduceMotion: boolean;
  showOrbits: boolean;
  learnMode: boolean;
  colorFilter: 'none' | 'gray' | 'deut' | 'prot' | 'trit';
  cursorSize: 'n' | 'd' | 'b';
  cursorColor: 'def' | 'w' | 'y' | 'b2';
  soundEnabled: boolean;
}

export const DEFAULT_WCAG: WcagState = {
  textSize: 1,
  highContrast: false,
  reduceMotion: false,
  showOrbits: true,
  learnMode: false,
  colorFilter: 'none',
  cursorSize: 'n',
  cursorColor: 'def',
  soundEnabled: true
};

export interface AppState {
  currentScreen: 'welcome' | 'solar' | 'model';
  activeAstronomerIndex: number;
  visitedAstronomers: string[];
  wcag: WcagState;
}

export const DEFAULT_STATE: AppState = {
  currentScreen: 'welcome',
  activeAstronomerIndex: -1,
  visitedAstronomers: [],
  wcag: { ...DEFAULT_WCAG }
};
