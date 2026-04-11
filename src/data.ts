// ============================================================
// DATA.TS — Dane planet, astronomów, stanu aplikacji
// Kosmiczne Układy v1.0 | Vanta AI Studio
// ============================================================

export interface PlanetStat {
  l: string; // label
  v: string; // value
}

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
  stats?: PlanetStat[];
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
      { id:'ziemia',    name:'Ziemia',  r:22, orbit:0,   speed:0,    glow:false, clr:'#4488cc', palette:{h:'#88ccff',c:'#2266aa',d:'#0a2244',atm:'rgba(80,140,255,0.5)'},
        desc:'Centrum Wszechświata według Ptolemeusza. Ziemia stała nieruchomo, a Słońce, Księżyc i planety krążyły wokół niej.',
        stats:[{l:'Pozycja:',v:'Centrum Wszechświata'},{l:'Ruch:',v:'Nieruchoma'},{l:'Model:',v:'Geocentryczny'},{l:'Autor:',v:'Ptolemeusz, ok. 150 n.e.'}] },
      { id:'ksiezyc',   name:'Księżyc', r:10, orbit:65,  speed:2.0,  glow:false, clr:'#c8c8c8', palette:{h:'#e0e0e0',c:'#999',d:'#555'},
        desc:'Pierwsza sfera niebieska wokół Ziemi. Księżyc wyznaczał granicę między światem ziemskim a niebiańskim.',
        stats:[{l:'Sfera:',v:'1. (najbliższa Ziemi)'},{l:'Okres obiegu:',v:'ok. 27 dni'},{l:'Rola:',v:'Granica ziemsko-niebieska'},{l:'Widzialność:',v:'Gołym okiem'}] },
      { id:'merkury_p', name:'Merkury', r:9,  orbit:105, speed:1.6,  glow:false, clr:'#aaaaaa', palette:{h:'#e0e0e0',c:'#999',d:'#555'},
        desc:'Poruszał się po epicyklach — małych kołach na głównych orbitach. Tłumaczyło to pozorny ruch wsteczny planety na tle gwiazd.',
        stats:[{l:'Sfera:',v:'2.'},{l:'Ruch:',v:'Epicykle'},{l:'Okres obiegu:',v:'ok. 116 dni'},{l:'Widoczność:',v:'Nisko nad horyzontem'}] },
      { id:'wenus_p',   name:'Wenus',   r:13, orbit:150, speed:1.1,  glow:false, clr:'#e8c060', palette:{h:'#ffe8a0',c:'#d4a840',d:'#806020',atm:'rgba(255,220,120,0.5)'},
        desc:'Najjaśniejsza po Słońcu i Księżycu. Tak jak Merkury, poruszała się po epicyklach, blisko Słońca na niebie.',
        stats:[{l:'Sfera:',v:'3.'},{l:'Ruch:',v:'Epicykle'},{l:'Okres obiegu:',v:'ok. 584 dni'},{l:'Jasność:',v:'Najjaśniejsza planeta'}] },
      { id:'slonce_p',  name:'Słońce',  r:22, orbit:205, speed:0.75, glow:true,  clr:'#FFA500',
        desc:'W modelu Ptolemeusza Słońce krążyło wokół nieruchomej Ziemi. Jego roczna wędrówka po nieboskłonie wyznaczała pory roku.',
        stats:[{l:'Sfera:',v:'4. (środkowa)'},{l:'Okres obiegu:',v:'365,25 dnia'},{l:'Rola:',v:'Wyznacza pory roku'},{l:'Epicykle:',v:'Nie'}] },
      { id:'mars_p',    name:'Mars',    r:12, orbit:258, speed:0.55, glow:false, clr:'#cc4422', palette:{h:'#ee8866',c:'#aa3311',d:'#551108',atm:'rgba(200,80,40,0.5)'},
        desc:'Dla wytłumaczenia zmiennej prędkości Marsa Ptolemeusz wprowadził punktum ekwans — punkt równomiernego ruchu kątowego.',
        stats:[{l:'Sfera:',v:'5.'},{l:'Okres obiegu:',v:'ok. 780 dni'},{l:'Ruch wsteczny:',v:'Tak (epicykle)'},{l:'Barwa:',v:'Czerwona'}] },
      { id:'jowisz_p',  name:'Jowisz',  r:17, orbit:315, speed:0.36, glow:false, clr:'#c8a060', palette:{h:'#f0d090',c:'#a07030',d:'#503010',bands:true},
        desc:'Jedna z dwóch najdalszych planet w modelu Ptolemeusza. Powolny ruch po szerokich epicyklach, okres obiegu ok. 12 lat.',
        stats:[{l:'Sfera:',v:'6.'},{l:'Okres obiegu:',v:'ok. 12 lat'},{l:'Ruch wsteczny:',v:'Tak (epicykle)'},{l:'Barwa:',v:'Żółtawa'}] },
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
      { id:'slonce_k',  name:'Słońce',  r:30, orbit:0,   speed:0,    glow:true,  clr:'#FFB700',
        desc:'Centrum Wszechświata według Kopernika. To rewolucyjna zmiana — Słońce, nie Ziemia, stało się osią, wokół której krążą planety.',
        stats:[{l:'Pozycja:',v:'Centrum Układu'},{l:'Ruch:',v:'Nieruchome'},{l:'Przełom:',v:'Rok 1543'},{l:'Dzieło:',v:'De revolutionibus'}] },
      { id:'merkury_k', name:'Merkury', r:8,  orbit:65,  speed:2.3,  glow:false, clr:'#aaaaaa', palette:{h:'#e0e0e0',c:'#999',d:'#555'},
        desc:'Pierwsza planeta od Słońca w systemie Kopernika. Jej szybki ruch po małej orbicie był argumentem za heliocentryzmem.',
        stats:[{l:'Kolejność:',v:'1. od Słońca'},{l:'Okres obiegu:',v:'88 dni (wg Kopernika)'},{l:'Odległość:',v:'Najmniejsza'},{l:'Widzialność:',v:'Nisko nad horyzontem'}] },
      { id:'wenus_k',   name:'Wenus',   r:12, orbit:110, speed:1.55, glow:false, clr:'#e8c060', palette:{h:'#ffe8a0',c:'#d4a840',d:'#806020',atm:'rgba(255,220,120,0.5)'},
        desc:'Kopernik poprawnie umieścił Wenus bliżej Słońca niż Ziemię. Stąd jej fazy — podobne do księżycowych — odkryte przez Galileusza.',
        stats:[{l:'Kolejność:',v:'2. od Słońca'},{l:'Okres obiegu:',v:'225 dni (wg Kopernika)'},{l:'Fazy:',v:'Tak (potwierdzenie teorii)'},{l:'Jasność:',v:'Najjaśniejsza planeta'}] },
      { id:'ziemia_k',  name:'Ziemia',  r:13, orbit:165, speed:1.0,  glow:false, clr:'#4488cc', palette:{h:'#88ccff',c:'#2266aa',d:'#0a2244',atm:'rgba(80,140,255,0.5)'},
        desc:'Kopernik uczynił Ziemię zwykłą planetą — trzecią od Słońca. To fundamentalna zmiana w myśleniu o miejscu człowieka we Wszechświecie.',
        stats:[{l:'Kolejność:',v:'3. od Słońca'},{l:'Okres obiegu:',v:'365,25 dnia'},{l:'Księżyc:',v:'1 naturalny satelita'},{l:'Rola:',v:'Nie centrum, lecz planeta'}] },
      { id:'mars_k',    name:'Mars',    r:11, orbit:225, speed:0.65, glow:false, clr:'#cc4422', palette:{h:'#ee8866',c:'#aa3311',d:'#551108',atm:'rgba(200,80,40,0.5)'},
        desc:'Czerwona planeta na czwartej orbicie. Kopernik obliczył jej okres obiegu na ok. 687 dni — wynik bardzo zbliżony do prawdziwego.',
        stats:[{l:'Kolejność:',v:'4. od Słońca'},{l:'Okres obiegu:',v:'ok. 687 dni'},{l:'Barwa:',v:'Czerwona'},{l:'Widoczność:',v:'Gołym okiem'}] },
      { id:'jowisz_k',  name:'Jowisz',  r:22, orbit:300, speed:0.33, glow:false, clr:'#c8a060', palette:{h:'#f0d090',c:'#a07030',d:'#503010',bands:true},
        desc:'Największa planeta w modelu Kopernika. Jej wolny ruch i jasność były dobrze znane starożytnym. Kopernik podał okres 12 lat.',
        stats:[{l:'Kolejność:',v:'5. od Słońca'},{l:'Okres obiegu:',v:'ok. 12 lat (wg Kopernika)'},{l:'Księżyce:',v:'Odkryto 4 (Galileusz, 1610)'},{l:'Barwa:',v:'Żółtawa, z pasami'}] },
      { id:'saturn_k',  name:'Saturn',  r:20, orbit:375, speed:0.20, glow:false, clr:'#d4b870', ring:true, palette:{h:'#f8e0a0',c:'#b09040',d:'#604808',bands:true},
        desc:'Najdalsza znana planeta w modelu Kopernika. Jej powolny ruch (ok. 30 lat) był łatwy do zaobserwowania przez stulecia.',
        stats:[{l:'Kolejność:',v:'6. od Słońca (ostatnia)'},{l:'Okres obiegu:',v:'ok. 30 lat (wg Kopernika)'},{l:'Pierścienie:',v:'Odkryto przez Huyghensa (1655)'},{l:'Barwa:',v:'Jasna, złotawa'}] },
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
      { id:'slonce_w',  name:'Słońce',  r:30, orbit:0,   speed:0,    glow:true,  clr:'#FFB700',
        desc:'Gwiazda centralna Układu Słonecznego — żółty karzeł.',
        stats:[{l:'Typ:',v:'Żółty karzeł (G2V)'},{l:'Średnica:',v:'1,39 mln km'},{l:'Masa:',v:'2×10³⁰ kg'},{l:'Temperatura:',v:'5 778 K'}] },
      { id:'merkury_w', name:'Merkury', r:7,  orbit:58,  speed:2.5,  glow:false, clr:'#aaaaaa', palette:{h:'#e0e0e0',c:'#999',d:'#555'},
        desc:'Najmniejsza planeta, najbliżej Słońca. Ogromne wahania temperatur.',
        stats:[{l:'Odległość:',v:'57,9 mln km'},{l:'Rok:',v:'88 dni'},{l:'Średnica:',v:'4 879 km'},{l:'Temperatura:',v:'-180 do +430°C'}] },
      { id:'wenus_w',   name:'Wenus',   r:11, orbit:100, speed:1.65, glow:false, clr:'#e8c060', palette:{h:'#ffe8a0',c:'#d4a840',d:'#806020',atm:'rgba(255,220,120,0.5)'},
        desc:'Najjaśniejszy punkt nieba po Słońcu i Księżycu. Gęsta atmosfera CO₂.',
        stats:[{l:'Odległość:',v:'108,2 mln km'},{l:'Rok:',v:'225 dni'},{l:'Średnica:',v:'12 104 km'},{l:'Temperatura:',v:'465°C'}] },
      { id:'ziemia_w',  name:'Ziemia',  r:12, orbit:148, speed:1.0,  glow:false, clr:'#4488cc', palette:{h:'#88ccff',c:'#2266aa',d:'#0a2244',atm:'rgba(80,140,255,0.5)'},
        desc:'Nasza planeta — jedyne znane miejsce z życiem we Wszechświecie.',
        stats:[{l:'Odległość:',v:'149,6 mln km'},{l:'Rok:',v:'365,25 dnia'},{l:'Średnica:',v:'12 742 km'},{l:'Księżyce:',v:'1'}] },
      { id:'mars_w',    name:'Mars',    r:10, orbit:200, speed:0.62, glow:false, clr:'#cc4422', palette:{h:'#ee8866',c:'#aa3311',d:'#551108',atm:'rgba(200,80,40,0.5)'},
        desc:'Czerwona planeta. Ma najwyższy wulkan i najgłębszy kanion w Układzie.',
        stats:[{l:'Odległość:',v:'227,9 mln km'},{l:'Rok:',v:'687 dni'},{l:'Średnica:',v:'6 779 km'},{l:'Księżyce:',v:'2'}] },
      { id:'jowisz_w',  name:'Jowisz',  r:24, orbit:265, speed:0.31, glow:false, clr:'#c8a060', palette:{h:'#f0d090',c:'#a07030',d:'#503010',bands:true},
        desc:'Największa planeta — gazowy olbrzym. Wielka Czerwona Plama to burza od 350 lat.',
        stats:[{l:'Odległość:',v:'778,5 mln km'},{l:'Rok:',v:'11,86 lat'},{l:'Średnica:',v:'139 820 km'},{l:'Księżyce:',v:'95'}] },
      { id:'saturn_w',  name:'Saturn',  r:21, orbit:335, speed:0.21, glow:false, clr:'#d4b870', ring:true, palette:{h:'#f8e0a0',c:'#b09040',d:'#604808',bands:true},
        desc:'Planeta z pierścieniami z lodu i skał. Lżejsza od wody.',
        stats:[{l:'Odległość:',v:'1,43 mld km'},{l:'Rok:',v:'29,46 lat'},{l:'Średnica:',v:'116 460 km'},{l:'Księżyce:',v:'146'}] },
      { id:'uran_w',    name:'Uran',    r:16, orbit:400, speed:0.12, glow:false, clr:'#7de8e8', palette:{h:'#b0ffff',c:'#40c0c0',d:'#105050',atm:'rgba(100,230,230,0.5)'},
        desc:'Lodowy olbrzym obraca się na boku — jego oś nachylona jest o 98°.',
        stats:[{l:'Odległość:',v:'2,87 mld km'},{l:'Rok:',v:'84 lata'},{l:'Średnica:',v:'50 724 km'},{l:'Księżyce:',v:'28'}] },
      { id:'neptun_w',  name:'Neptun',  r:15, orbit:460, speed:0.08, glow:false, clr:'#3a70e8', palette:{h:'#80b0ff',c:'#2050cc',d:'#0a1866',atm:'rgba(60,100,240,0.5)'},
        desc:'Najbardziej oddalona planeta. Ma najsilniejsze wiatry w Układzie Słonecznym.',
        stats:[{l:'Odległość:',v:'4,5 mld km'},{l:'Rok:',v:'164,8 lat'},{l:'Średnica:',v:'49 244 km'},{l:'Księżyce:',v:'16'}] },
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
