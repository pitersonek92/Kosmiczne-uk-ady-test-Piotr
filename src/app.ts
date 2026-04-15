import { getData, path, setState } from '@/zpe-port';
import _cssRaw from './styles/style.css';

// ─── TYPES ───────────────────────────────────────────────────────────────────
interface PlanetData {
  id: string; name: string; color: string; r: number;
  orbit: number; speed: number; desc: string;
  stats: { l: string; v: string }[];
  glow?: boolean; hasSaturn?: boolean;
  _px?: number; _py?: number; _pr?: number;
}

interface AstroData {
  id: string; name: string; img: string; imgH: string; portrait: string;
  bio: string; modelTitle: string; systemName: string; planetSet: string;
}

interface Settings {
  textSize: number; highContrast: boolean; reduceMotion: boolean;
  showOrbits: boolean; colorFilter: string; learnMode: boolean;
  cursorSize: string; cursorColor: string; soundOn: boolean; volume: number;
}

interface AppState {
  screen: 'welcome' | 'solar' | 'model';
  popup: string; activeAstroId: string | null; modelAstroId: string | null;
  onboardStep: number; onboardDone: boolean; settings: Settings;
}

// ─── PLANET DATA ─────────────────────────────────────────────────────────────
const PLANETS_DATA: Record<string, PlanetData[]> = {
  ptolemeusz: [
    { id:'ziemia', name:'Ziemia', color:'#4a8fe0', r:22, orbit:0, speed:0, desc:'Centrum Wszechświata wg Ptolemeusza. Nieruchoma, otoczona sferami niebieskimi.', stats:[{l:'Model',v:'Geocentryczny'},{l:'Pozycja',v:'Centrum'},{l:'Ruch',v:'Brak'},{l:'Epoka',v:'II w. n.e.'}] },
    { id:'ksiezyc', name:'Księżyc', color:'#c8c8c8', r:12, orbit:60, speed:1.8, desc:'Pierwsza sfera niebieska. Krąży wokół nieruchomej Ziemi.', stats:[{l:'Odległość',v:'~384 400 km'},{l:'Okres',v:'27,3 doby'}] },
    { id:'merkury_g', name:'Merkury', color:'#aaaaaa', r:10, orbit:100, speed:1.5, desc:'W modelu Ptolemeusza porusza się po epicyklach wokół Ziemi.', stats:[{l:'Okres',v:'~88 dni'},{l:'Model',v:'Epicykl'}] },
    { id:'wenus_g', name:'Wenus', color:'#e8c080', r:14, orbit:145, speed:1.1, desc:'Wenus wg Ptolemeusza — porusza się po skomplikowanych epicyklach.', stats:[{l:'Okres',v:'~225 dni'},{l:'Epicykl',v:'Tak'}] },
    { id:'slonce_g', name:'Słońce', color:'#ffcc00', r:20, orbit:195, speed:0.8, desc:'W geocentrycznym modelu Słońce krąży wokół Ziemi, a nie odwrotnie.', stats:[{l:'Pozycja',v:'4. sfera'},{l:'Model',v:'Geocentryczny'}], glow:true },
    { id:'mars_g', name:'Mars', color:'#d9573a', r:13, orbit:250, speed:0.6, desc:'Mars na 5. sferze wg Ptolemeusza.', stats:[{l:'Okres',v:'~687 dni'},{l:'Epicykl',v:'Tak'}] },
    { id:'jowisz_g', name:'Jowisz', color:'#c8a060', r:18, orbit:305, speed:0.4, desc:'Jowisz na 6. sferze niebieskiej.', stats:[{l:'Okres',v:'~12 lat'},{l:'Epicykl',v:'Tak'}] },
  ],
  kopernik: [
    { id:'slonce', name:'Słońce', color:'#FFB700', r:28, orbit:0, speed:0, desc:'Centrum układu heliocentrycznego wg Kopernika. Słońce stoi nieruchomo, a wokół niego krążą planety.', stats:[{l:'Model',v:'Heliocentryczny'},{l:'Pozycja',v:'Centrum'},{l:'Promień',v:'~695 700 km'},{l:'Temp.',v:'~5 500°C'}], glow:true },
    { id:'merkury', name:'Merkury', color:'#aaaaaa', r:8, orbit:65, speed:2.2, desc:'Najbliższa Słońcu planeta. Kopernik poprawnie umieścił ją na 1. orbicie.', stats:[{l:'Odległość',v:'57,9 mln km'},{l:'Okres',v:'88 dni'},{l:'Średnica',v:'4 879 km'},{l:'Temp.',v:'430°C / -180°C'}] },
    { id:'wenus', name:'Wenus', color:'#e8c080', r:12, orbit:110, speed:1.6, desc:'Wenus — planeta bliźniaczka Ziemi. Kopernik poprawnie umieścił ją na 2. orbicie od Słońca.', stats:[{l:'Odległość',v:'108,2 mln km'},{l:'Okres',v:'225 dni'},{l:'Średnica',v:'12 104 km'},{l:'Atm.',v:'CO₂ 96%'}] },
    { id:'ziemia', name:'Ziemia', color:'#4a8fe0', r:13, orbit:165, speed:1.0, desc:'Nasza planeta — Kopernik odkrył, że Ziemia krąży wokół Słońca, a nie odwrotnie.', stats:[{l:'Odległość',v:'149,6 mln km'},{l:'Okres',v:'365,25 dni'},{l:'Średnica',v:'12 742 km'},{l:'Księżyce',v:'1'}] },
    { id:'mars', name:'Mars', color:'#d9573a', r:11, orbit:225, speed:0.7, desc:'Czerwona planeta. Kopernik umieścił ją poprawnie za orbitą Ziemi.', stats:[{l:'Odległość',v:'227,9 mln km'},{l:'Okres',v:'687 dni'},{l:'Średnica',v:'6 779 km'},{l:'Księżyce',v:'2'}] },
    { id:'jowisz', name:'Jowisz', color:'#c8a060', r:22, orbit:300, speed:0.35, desc:'Największa planeta. Kopernik poprawnie umieścił go za Marsem.', stats:[{l:'Odległość',v:'778 mln km'},{l:'Okres',v:'11,9 lat'},{l:'Średnica',v:'139 820 km'},{l:'Księżyce',v:'95'}] },
    { id:'saturn', name:'Saturn', color:'#d4b870', r:20, orbit:370, speed:0.22, hasSaturn:true, desc:'Planeta z pierścieniami. Kopernik poprawnie umieścił ją na 6. orbicie od Słońca.', stats:[{l:'Odległość',v:'1 427 mln km'},{l:'Okres',v:'29,5 lat'},{l:'Średnica',v:'116 460 km'},{l:'Księżyce',v:'146'}] },
  ],
  wspolczesny: [
    { id:'slonce_w', name:'Słońce', color:'#FFB700', r:28, orbit:0, speed:0, desc:'Centrum układu słonecznego. Gwiazda główna ciągu gwiazdowego typu G.', stats:[{l:'Typ',v:'Gwiazda G2V'},{l:'Masa',v:'1,989 × 10³⁰ kg'},{l:'Wiek',v:'4,6 mld lat'},{l:'Temp.',v:'5 778 K'}], glow:true },
    { id:'merkury_w', name:'Merkury', color:'#aaaaaa', r:7, orbit:55, speed:2.5, desc:'Najmniejsza planeta Układu Słonecznego. Jeden rok trwa tylko 88 dni ziemskich.', stats:[{l:'Odległość',v:'57,9 mln km'},{l:'Okres',v:'88 dni'},{l:'Temp. max',v:'430°C'},{l:'Księżyce',v:'0'}] },
    { id:'wenus_w', name:'Wenus', color:'#e8c080', r:11, orbit:95, speed:1.7, desc:'Najgorętsza planeta, mimo że nie jest najbliżej Słońca. Gęsta atmosfera z CO₂.', stats:[{l:'Odległość',v:'108 mln km'},{l:'Temp.',v:'462°C'},{l:'Dzień',v:'243 ziemskie dni'},{l:'Księżyce',v:'0'}] },
    { id:'ziemia_w', name:'Ziemia', color:'#4a8fe0', r:12, orbit:140, speed:1.0, desc:'Jedyna znana planeta z życiem. Jeden rok = 365,25 dni.', stats:[{l:'Odległość',v:'149,6 mln km'},{l:'Temp. średnia',v:'15°C'},{l:'Powierzchnia',v:'510 mln km²'},{l:'Księżyce',v:'1'}] },
    { id:'mars_w', name:'Mars', color:'#d9573a', r:10, orbit:195, speed:0.65, desc:'Czerwona planeta z największym wulkanem w Układzie Słonecznym (Olympus Mons).', stats:[{l:'Odległość',v:'227,9 mln km'},{l:'Temp. średnia',v:'-63°C'},{l:'Dzień',v:'24h 37min'},{l:'Księżyce',v:'2'}] },
    { id:'jowisz_w', name:'Jowisz', color:'#c8a060', r:24, orbit:265, speed:0.33, desc:'Największa planeta. Gdyby był 80x masywniejszy, zostałby gwiazdą.', stats:[{l:'Odległość',v:'778 mln km'},{l:'Średnica',v:'139 820 km'},{l:'Masa',v:'318 × Ziemia'},{l:'Księżyce',v:'95'}] },
    { id:'saturn_w', name:'Saturn', color:'#d4b870', r:21, orbit:340, speed:0.22, hasSaturn:true, desc:'Pierścienie Saturna mają grubość zaledwie 10-100 m, ale rozciągają się tysiące km.', stats:[{l:'Odległość',v:'1,43 mld km'},{l:'Pierścienie',v:'Tak (lód + skały)'},{l:'Gęstość',v:'0,69 g/cm³'},{l:'Księżyce',v:'146'}] },
    { id:'uran_w', name:'Uran', color:'#7de8e8', r:16, orbit:405, speed:0.13, desc:'Obraca się na boku — jego oś nachylona jest o 97,77°.', stats:[{l:'Odległość',v:'2,87 mld km'},{l:'Okres',v:'84 lata'},{l:'Temp.',v:'-224°C'},{l:'Księżyce',v:'28'}] },
    { id:'neptun_w', name:'Neptun', color:'#3a70e8', r:15, orbit:460, speed:0.09, desc:'Najdalej od Słońca. Wiatry sięgają 2 100 km/h — najsilniejsze w Układzie Słonecznym.', stats:[{l:'Odległość',v:'4,5 mld km'},{l:'Okres',v:'165 lat'},{l:'Temp.',v:'-218°C'},{l:'Księżyce',v:'16'}] },
  ]
};

const ASTRONOMERS: AstroData[] = [
  { id:'ptolemeusz', name:'Klaudiusz Ptolemeusz', img:'pp_01.png', imgH:'pp_01.png', portrait:'pp_01.png',
    bio:`<strong>Klaudiusz Ptolemeusz</strong> (ok. 100–170 n.e.) był greckim astronomem, matematykiem i geografem działającym w Aleksandrii. Stworzył geocentryczny model Wszechświata opisany w dziele <em>Almagest</em>, który dominował przez ponad 1400 lat.<br><br>Według modelu Ptolemeusza <strong>Ziemia znajdowała się w centrum Wszechświata</strong>, a Słońce, Księżyc i planety krążyły wokół niej po epicyklach.`,
    modelTitle:'Geocentryczny model układu wg. Ptolemeusza', systemName:'Układ Ptolemeusza', planetSet:'ptolemeusz' },
  { id:'kopernik', name:'Mikołaj Kopernik', img:'pp_02.png', imgH:'pp_02_over.png', portrait:'kopernik.png',
    bio:`<strong>Mikołaj Kopernik</strong> (1473–1543) był polskim astronomem, który zaproponował heliocentryczny model Wszechświata. W dziele <em>De revolutionibus</em> (1543) umieścił Słońce w centrum, a Ziemię na orbicie.<br><br>Była to rewolucja, która zmieniła postrzeganie miejsca człowieka we Wszechświecie i zapoczątkowała nowoczesną astronomię.`,
    modelTitle:'Heliocentryczny model układu wg. Kopernika', systemName:'Układ Kopernika', planetSet:'kopernik' },
  { id:'wspolczesny', name:'Współczesny widok na układ słoneczny', img:'pp_03.png', imgH:'pp_03.png', portrait:'pp_03.png',
    bio:`<strong>Współczesny model układu słonecznego</strong> oparty jest na obserwacjach teleskopowych i misjach kosmicznych XX i XXI w.<br><br>Układ Słoneczny liczy <strong>8 planet</strong> krążących wokół Słońca: Merkury, Wenus, Ziemia, Mars, Jowisz, Saturn, Uran i Neptun. Jest jednym z miliardów układów planetarnych w Drodze Mlecznej.`,
    modelTitle:'Współczesny widok na układ słoneczny', systemName:'Współczesny układ słoneczny', planetSet:'wspolczesny' },
];

const ONBOARD_STEPS = [
  { icon:'👁️', title:'Nawigacja', text:'<strong>Komputer:</strong> Przesuwaj widok trzymając lewy przycisk myszy. Przybliżaj/oddalaj kółkiem myszy lub przyciskami +/-.<br><br><strong>Dotyk:</strong> Przesuwaj palcem. Uszczypnij, aby zmienić powiększenie.' },
  { icon:'🖱️', title:'Interakcje', text:'Kliknij <strong>Lewym przyciskiem myszy (LPM)</strong>, aby zobaczyć szczegóły planety.<br><br><strong>Prawy przycisk myszy (PPM)</strong> otwiera szybki opis.<br><br><strong>Najazd kursorem:</strong> Zatrzymuje planetę na orbicie i wyświetla jej nazwę.' },
  { icon:'⚙️', title:'Dostępność', text:'Kliknij ikonę ustawień (trybik) w górnym rogu, aby dostosować <strong>kontrast, wielkość tekstu, kursor, filtry kolorów</strong> lub wyłączyć animacje.' },
];

// ─── AUDIO ───────────────────────────────────────────────────────────────────
let _audioCtx: AudioContext | null = null;
let _audioGain: GainNode | null = null;
let _masterVol = 0.75;
let _muted = false;

function audioInit(): void {
  if (_audioCtx) return;
  try {
    _audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    _audioGain = _audioCtx.createGain();
    _audioGain.gain.value = _masterVol;
    _audioGain.connect(_audioCtx.destination);
  } catch (_) {}
}

function audioPlay(f1: number, f2: number | null, dur: number): void {
  if (_muted) return;
  audioInit();
  if (!_audioCtx || !_audioGain) return;
  try {
    const osc = _audioCtx.createOscillator();
    const gain = _audioCtx.createGain();
    osc.connect(gain); gain.connect(_audioGain);
    osc.frequency.setValueAtTime(f1, _audioCtx.currentTime);
    if (f2) osc.frequency.exponentialRampToValueAtTime(f2, _audioCtx.currentTime + dur * 0.8);
    gain.gain.setValueAtTime(0.25, _audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, _audioCtx.currentTime + dur);
    osc.start(); osc.stop(_audioCtx.currentTime + dur);
  } catch (_) {}
}

const audioClick = () => audioPlay(880, 440, 0.1);
const audioHover = () => audioPlay(660, null, 0.06);

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function imgSrc(name: string): string { return path(`images/${name}`); }

function lighten(hex: string): string {
  const n = parseInt(hex.replace('#',''), 16);
  const r = Math.min(255, ((n >> 16) & 255) + 60);
  const g = Math.min(255, ((n >> 8) & 255) + 60);
  const b = Math.min(255, (n & 255) + 60);
  return `rgb(${r},${g},${b})`;
}

function buildCursorSVG(size: string, color: string): string {
  const s = ({ normal: 24, duz: 36, bduzy: 52 } as any)[size] || 24;
  const fill = ({ domyslny: '#1a6eff', bialy: '#ffffff', zolty: '#FFD700', blekitny: '#00ccff' } as any)[color] || '#1a6eff';
  return `<svg width="${s}" height="${s}" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M5 5L17 35L22 22L35 17Z" fill="${fill}" stroke="#000" stroke-width="2.5" stroke-linejoin="round"/></svg>`;
}

function el<K extends keyof HTMLElementTagNameMap>(tag: K, cls?: string, html?: string): HTMLElementTagNameMap[K] {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html !== undefined) e.innerHTML = html;
  return e;
}

// ─── APP STATE ───────────────────────────────────────────────────────────────
let root: HTMLElement;
let isFrozen = false;
let appState: AppState = {
  screen: 'welcome',
  popup: '',
  activeAstroId: null,
  modelAstroId: null,
  onboardStep: 0,
  onboardDone: false,
  settings: {
    textSize: 1, highContrast: false, reduceMotion: false,
    showOrbits: true, colorFilter: 'none', learnMode: false,
    cursorSize: 'normal', cursorColor: 'domyslny', soundOn: true, volume: 75
  }
};

// ─── CANVAS STATE ────────────────────────────────────────────────────────────
let canvasState = {
  zoom: 1, panX: 0, panY: 0,
  dragging: false, dragStart: { x: 0, y: 0 }, panStart: { x: 0, y: 0 },
  angles: {} as Record<string, number>,
  hoveredId: null as string | null,
  frozenId: null as string | null,
  animId: null as number | null,
  trails: {} as Record<string, { x: number; y: number }[]>,
};

let canvasEl: HTMLCanvasElement | null = null;
let planetDetailEl: HTMLElement | null = null;
let quickTipEl: HTMLElement | null = null;

// ─── SAVE STATE ──────────────────────────────────────────────────────────────
function saveState(): void {
  if (isFrozen) return;
  setState({
    screen: appState.screen,
    popup: appState.popup,
    activeAstroId: appState.activeAstroId,
    onboardDone: appState.onboardDone,
    settings: appState.settings,
  }).catch(() => {});
}

// ─── APPLY WCAG ──────────────────────────────────────────────────────────────
function applyWcag(): void {
  const s = appState.settings;
  const classes = [
    s.textSize > 1 ? `ku-size-${s.textSize}` : '',
    s.highContrast ? 'ku-contrast' : '',
    s.colorFilter === 'grayscale' ? 'ku-filter-grayscale' : '',
    s.colorFilter === 'deuteranopia' ? 'ku-filter-deuteranopia' : '',
    s.colorFilter === 'protanopia' ? 'ku-filter-protanopia' : '',
    s.colorFilter === 'tritanopia' ? 'ku-filter-tritanopia' : '',
    s.reduceMotion ? 'ku-no-anim' : '',
    (s.cursorSize !== 'normal' || s.cursorColor !== 'domyslny') ? 'ku-cursor-none' : '',
  ].filter(Boolean);

  root.className = 'ku-root ' + classes.join(' ');

  // Custom cursor
  const cursorEl = document.getElementById('ku-custom-cursor');
  if (cursorEl) {
    const useCustom = s.cursorSize !== 'normal' || s.cursorColor !== 'domyslny';
    cursorEl.innerHTML = useCustom ? buildCursorSVG(s.cursorSize, s.cursorColor) : '';
    cursorEl.style.display = useCustom ? 'block' : 'none';
  }

  // Audio
  _muted = !s.soundOn;
  _masterVol = s.volume / 100;
  if (_audioGain) _audioGain.gain.setTargetAtTime(_muted ? 0 : _masterVol, _audioCtx!.currentTime, 0.1);
}

// ─── CANVAS DRAW ─────────────────────────────────────────────────────────────
function drawCanvas(): void {
  const canvas = canvasEl;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const s = canvasState;
  const W = canvas.width, H = canvas.height;
  const cx = W / 2 + s.panX, cy = H / 2 + s.panY;
  const z = s.zoom;
  const astro = ASTRONOMERS.find(a => a.id === appState.activeAstroId);
  const planets = astro ? (PLANETS_DATA[astro.planetSet] || []) : [];
  const showOrbits = appState.settings.showOrbits;
  const learnMode = appState.settings.learnMode;

  ctx.clearRect(0, 0, W, H);

  // Draw orbits
  if (showOrbits) {
    planets.forEach(p => {
      if (p.orbit === 0) return;
      ctx.save();
      ctx.strokeStyle = 'rgba(255,255,255,0.18)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, p.orbit * z, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    });
  }

  // Draw trails (learn mode)
  if (learnMode) {
    planets.forEach(p => {
      const trail = s.trails[p.id];
      if (!trail || trail.length < 2) return;
      ctx.save();
      ctx.strokeStyle = p.color + '55';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(trail[0].x, trail[0].y);
      trail.forEach(pt => ctx.lineTo(pt.x, pt.y));
      ctx.stroke();
      ctx.restore();
    });
  }

  // Draw planets
  planets.forEach(p => {
    const angle = s.angles[p.id] || 0;
    const px = p.orbit === 0 ? cx : cx + Math.cos(angle) * p.orbit * z;
    const py = p.orbit === 0 ? cy : cy + Math.sin(angle) * p.orbit * z;
    const pr = p.r * Math.max(0.6, z);

    // Store for hit test
    p._px = px; p._py = py; p._pr = pr;

    // Trail update
    if (learnMode && p.orbit > 0) {
      if (!s.trails[p.id]) s.trails[p.id] = [];
      s.trails[p.id].push({ x: px, y: py });
      if (s.trails[p.id].length > 200) s.trails[p.id].shift();
    }

    // Glow for sun
    if (p.glow) {
      const grad = ctx.createRadialGradient(px, py, pr * 0.3, px, py, pr * 2.5);
      grad.addColorStop(0, 'rgba(255,200,0,.6)');
      grad.addColorStop(1, 'rgba(255,200,0,0)');
      ctx.save();
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(px, py, pr * 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Planet body
    const grad2 = ctx.createRadialGradient(px - pr * 0.3, py - pr * 0.3, pr * 0.1, px, py, pr);
    grad2.addColorStop(0, lighten(p.color));
    grad2.addColorStop(1, p.color);
    ctx.save();
    ctx.fillStyle = grad2;
    ctx.beginPath();
    ctx.arc(px, py, pr, 0, Math.PI * 2);
    ctx.fill();

    // Saturn rings
    if (p.hasSaturn) {
      ctx.strokeStyle = 'rgba(210,185,120,.7)';
      ctx.lineWidth = pr * 0.35;
      ctx.beginPath();
      ctx.ellipse(px, py, pr * 2.1, pr * 0.5, -Math.PI / 7, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Hover highlight
    const isHovered = s.hoveredId === p.id || s.frozenId === p.id;
    if (isHovered) {
      ctx.strokeStyle = '#FFD700';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(px, py, pr + 4, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();

    // Label
    if (isHovered) {
      ctx.save();
      ctx.font = `bold ${Math.max(12, 13 * z)}px 'Segoe UI', Arial`;
      ctx.fillStyle = '#FFD700';
      ctx.textAlign = 'center';
      ctx.shadowColor = 'rgba(0,0,0,.8)';
      ctx.shadowBlur = 4;
      ctx.fillText(p.name, px, py - pr - 8);
      ctx.restore();
    }
  });
}

function tickCanvas(): void {
  const s = canvasState;
  const astro = ASTRONOMERS.find(a => a.id === appState.activeAstroId);
  const planets = astro ? (PLANETS_DATA[astro.planetSet] || []) : [];

  if (!appState.settings.reduceMotion) {
    planets.forEach(p => {
      if (p.orbit === 0) return;
      if (s.frozenId === p.id) return;
      s.angles[p.id] = (s.angles[p.id] || 0) + p.speed * 0.008;
    });
  }
  drawCanvas();
  s.animId = requestAnimationFrame(tickCanvas);
}

function startCanvas(): void {
  stopCanvas();
  canvasState.animId = requestAnimationFrame(tickCanvas);
}

function stopCanvas(): void {
  if (canvasState.animId) {
    cancelAnimationFrame(canvasState.animId);
    canvasState.animId = null;
  }
}

function initAngles(planetSet: string): void {
  const planets = PLANETS_DATA[planetSet] || [];
  planets.forEach((p, i) => {
    if (!canvasState.angles[p.id]) {
      canvasState.angles[p.id] = (i / planets.length) * Math.PI * 2;
    }
  });
}

function hitTest(clientX: number, clientY: number): PlanetData | null {
  if (!canvasEl) return null;
  const rect = canvasEl.getBoundingClientRect();
  const mx = clientX - rect.left;
  const my = clientY - rect.top;
  const astro = ASTRONOMERS.find(a => a.id === appState.activeAstroId);
  const planets = astro ? (PLANETS_DATA[astro.planetSet] || []) : [];
  let best: PlanetData | null = null, bestDist = 9999;
  planets.forEach(p => {
    if (p._px === undefined) return;
    const d = Math.hypot(mx - p._px!, my - p._py!);
    if (d < Math.max((p._pr || 0) + 10, 20) && d < bestDist) {
      bestDist = d; best = p;
    }
  });
  return best;
}

// ─── RENDER ──────────────────────────────────────────────────────────────────
function render(): void {
  stopCanvas();
  root.innerHTML = '';

  // SVG daltonism filters
  const svgFilters = el('svg', '');
  svgFilters.style.cssText = 'position:absolute!important;width:0!important;height:0!important;';
  svgFilters.setAttribute('aria-hidden', 'true');
  svgFilters.innerHTML = `<defs>
    <filter id="filter-deuteranopia"><feColorMatrix type="matrix" values="0.367 0.861 -0.228 0 0  0.280 0.673 0.047 0 0  -0.012 0.043 0.969 0 0  0 0 0 1 0"/></filter>
    <filter id="filter-protanopia"><feColorMatrix type="matrix" values="0.152 1.053 -0.205 0 0  0.115 0.786 0.099 0 0  -0.004 -0.048 1.052 0 0  0 0 0 1 0"/></filter>
    <filter id="filter-tritanopia"><feColorMatrix type="matrix" values="1.256 -0.077 -0.179 0 0  -0.078 0.931 0.148 0 0  0.005 0.691 0.304 0 0  0 0 0 1 0"/></filter>
  </defs>`;
  root.appendChild(svgFilters);

  // Background
  const bg = el('div', 'ku-bg');
  bg.style.backgroundImage = `url(${imgSrc('bg_all.png')})`;
  root.appendChild(bg);

  // Topbar
  root.appendChild(renderTopbar());

  // Content
  const content = el('div', 'ku-content');
  root.appendChild(content);

  if (appState.screen === 'welcome') renderWelcome(content);
  else if (appState.screen === 'solar') renderSolar(content);
  else if (appState.screen === 'model') renderModel(content);

  // Popup overlay
  if (appState.popup) renderPopupOverlay(root);

  // Onboarding
  if (!appState.onboardDone && appState.screen === 'solar') renderOnboarding(root);

  applyWcag();

  // Custom cursor tracking
  const cursorEl = document.getElementById('ku-custom-cursor');
  if (cursorEl && (appState.settings.cursorSize !== 'normal' || appState.settings.cursorColor !== 'domyslny')) {
    root.addEventListener('mousemove', (e) => {
      const rect = root.getBoundingClientRect();
      cursorEl.style.left = (e.clientX - rect.left) + 'px';
      cursorEl.style.top = (e.clientY - rect.top) + 'px';
    });
  }
}

// ─── TOPBAR ──────────────────────────────────────────────────────────────────
function renderTopbar(): HTMLElement {
  const bar = el('div', 'ku-topbar');
  bar.appendChild(el('span', 'ku-topbar-title', 'Kosmiczne układy'));
  const btns = el('div', 'ku-topbar-btns');

  const soundBtn = el('button', 'ku-cbtn');
  soundBtn.title = appState.settings.soundOn ? 'Wycisz dźwięk' : 'Włącz dźwięk';
  soundBtn.setAttribute('aria-label', soundBtn.title);
  soundBtn.innerHTML = `<img src="${imgSrc(appState.settings.soundOn ? 'ico_sound_on.svg' : 'ico_sound_off.svg')}" alt="">`;
  soundBtn.addEventListener('click', () => {
    audioClick();
    appState.settings.soundOn = !appState.settings.soundOn;
    _muted = !appState.settings.soundOn;
    saveState(); render();
  });
  btns.appendChild(soundBtn);

  const helpBtn = el('button', 'ku-cbtn');
  helpBtn.title = 'Instrukcja'; helpBtn.setAttribute('aria-label', 'Instrukcja');
  helpBtn.innerHTML = `<img src="${imgSrc('ico_help_ico.svg')}" alt="">`;
  helpBtn.addEventListener('click', () => { audioClick(); appState.popup = 'instruction'; render(); });
  btns.appendChild(helpBtn);

  const settBtn = el('button', 'ku-cbtn');
  settBtn.title = 'Ustawienia'; settBtn.setAttribute('aria-label', 'Ustawienia');
  settBtn.innerHTML = `<img src="${imgSrc('ico_setting.svg')}" alt="">`;
  settBtn.addEventListener('click', () => { audioClick(); appState.popup = 'settings'; render(); });
  btns.appendChild(settBtn);

  bar.appendChild(btns);
  return bar;
}

// ─── WELCOME ─────────────────────────────────────────────────────────────────
function renderWelcome(parent: HTMLElement): void {
  const wrap = el('div', 'ku-welcome');

  // Decorations
  const decos: [string, string][] = [
    ['rys_04.png', 'ku-deco ku-deco-earth'],
    ['rys_03.png', 'ku-deco ku-deco-sat'],
    ['rys_02.png', 'ku-deco ku-deco-rocket'],
    ['rys_05.png', 'ku-deco ku-deco-astronaut'],
  ];
  decos.forEach(([name, cls]) => {
    const img = el('img', cls) as HTMLImageElement;
    img.src = imgSrc(name); img.alt = '';
    wrap.appendChild(img);
  });

  const box = el('div', 'ku-welcome-box');
  box.appendChild(el('h1', 'ku-welcome-title', 'Witaj w grze'));
  box.appendChild(el('p', 'ku-welcome-desc',
    'Od wieków ludzkość wpatruje się w gwiazdy, próbując zrozumieć<br>ich porządek… W tej grze staniesz się badaczem idei,<br>które kształtowały nasz obraz Wszechświata. Każda teoria,<br>każdy model to krok w stronę prawdy.'));

  const task = el('div', 'ku-welcome-task');
  const taskImg = el('img', '') as HTMLImageElement;
  taskImg.src = imgSrc('icon_clipboard.svg.png'); taskImg.alt = '';
  taskImg.style.cssText = 'width:50px!important;height:50px!important;flex-shrink:0!important;';
  task.appendChild(taskImg);
  task.appendChild(el('p', 'ku-welcome-task-text',
    '<strong>Twoje zadanie:</strong> poznaj trzy wizje kosmosu: od układu geocentrycznego po heliocentryczny. Zobacz jak zmieniała się ta wizja w zależności od epoki.'));
  box.appendChild(task);

  const btnsWrap = el('div', 'ku-welcome-btns');
  const instrBtn = el('button', 'ku-btn ku-btn-280', 'Instrukcja');
  instrBtn.addEventListener('click', () => { audioClick(); appState.popup = 'instruction'; render(); });
  instrBtn.addEventListener('mouseenter', () => audioHover());
  btnsWrap.appendChild(instrBtn);

  const startBtn = el('button', 'ku-btn ku-btn-280', 'Rozpocznij grę');
  startBtn.addEventListener('click', () => {
    audioClick();
    appState.screen = 'solar';
    appState.activeAstroId = 'wspolczesny';
    initAngles('wspolczesny');
    saveState(); render();
  });
  startBtn.addEventListener('mouseenter', () => audioHover());
  btnsWrap.appendChild(startBtn);
  box.appendChild(btnsWrap);

  wrap.appendChild(box);
  parent.appendChild(wrap);
}

// ─── SOLAR SCREEN ────────────────────────────────────────────────────────────
function renderSolar(parent: HTMLElement): void {
  const wrap = el('div', 'ku-solar');

  // Left panel
  const panel = el('div', 'ku-left-panel');
  ASTRONOMERS.forEach(a => {
    const btnWrap = el('div', '');
    btnWrap.style.cssText = 'position:relative!important;';
    const abtn = el('button', `ku-astro-btn${appState.activeAstroId === a.id ? ' active' : ''}`);
    abtn.setAttribute('aria-label', `Biografia: ${a.name}`);
    abtn.title = `Biografia: ${a.name}`;
    const aimg = el('img', '') as HTMLImageElement;
    aimg.src = imgSrc(a.img); aimg.alt = a.name;
    abtn.appendChild(aimg);

    const tooltip = el('div', 'ku-astro-tooltip', `Biografia: <strong>${a.name}</strong>`);
    tooltip.style.display = 'none';
    btnWrap.appendChild(abtn);
    btnWrap.appendChild(tooltip);

    abtn.addEventListener('mouseenter', () => {
      audioHover();
      aimg.src = imgSrc(a.imgH);
      tooltip.style.display = 'block';
    });
    abtn.addEventListener('mouseleave', () => {
      if (appState.activeAstroId !== a.id) aimg.src = imgSrc(a.img);
      tooltip.style.display = 'none';
    });
    abtn.addEventListener('focus', () => { tooltip.style.display = 'block'; });
    abtn.addEventListener('blur', () => { tooltip.style.display = 'none'; });
    abtn.addEventListener('click', () => {
      audioClick();
      appState.activeAstroId = a.id;
      appState.popup = 'bio';
      initAngles(a.planetSet);
      canvasState.trails = {};
      saveState(); render();
    });
    panel.appendChild(btnWrap);
  });
  wrap.appendChild(panel);

  // Canvas area
  const canvasWrap = el('div', 'ku-canvas-wrap');

  const astro = ASTRONOMERS.find(a => a.id === appState.activeAstroId) || ASTRONOMERS[2];
  const titleDiv = el('div', 'ku-solar-title', astro.systemName);
  canvasWrap.appendChild(titleDiv);

  const canvas = el('canvas', '') as HTMLCanvasElement;
  canvas.width = 1090; canvas.height = 654;
  canvas.style.cssText = 'width:100%!important;height:100%!important;cursor:grab!important;display:block!important;';
  canvasWrap.appendChild(canvas);
  canvasEl = canvas;

  // Zoom buttons
  const zoomBtns = el('div', 'ku-zoom-btns');
  const zoomIn = el('button', 'ku-zoom-btn', '+');
  zoomIn.title = 'Przybliż'; zoomIn.setAttribute('aria-label', 'Przybliż');
  zoomIn.addEventListener('click', () => { audioClick(); canvasState.zoom = Math.min(3, canvasState.zoom + 0.2); });
  const zoomOut = el('button', 'ku-zoom-btn', '−');
  zoomOut.title = 'Oddal'; zoomOut.setAttribute('aria-label', 'Oddal');
  zoomOut.addEventListener('click', () => { audioClick(); canvasState.zoom = Math.max(0.3, canvasState.zoom - 0.2); });
  const zoomReset = el('button', 'ku-zoom-btn', '⊡');
  zoomReset.title = 'Reset widoku'; zoomReset.setAttribute('aria-label', 'Reset widoku');
  zoomReset.style.cssText = 'font-size:14px!important;';
  zoomReset.addEventListener('click', () => { audioClick(); canvasState.zoom = 1; canvasState.panX = 0; canvasState.panY = 0; });
  zoomBtns.appendChild(zoomIn); zoomBtns.appendChild(zoomOut); zoomBtns.appendChild(zoomReset);
  canvasWrap.appendChild(zoomBtns);

  // Astronaut deco
  const astronaut = el('img', 'ku-astronaut-deco') as HTMLImageElement;
  astronaut.src = imgSrc('rys_04.png'); astronaut.alt = '';
  canvasWrap.appendChild(astronaut);

  // Bottom bar with model button
  const bottomBar = el('div', 'ku-solar-bottom-bar');
  const modelBtn = el('button', 'ku-btn ku-btn-420', astro.systemName);
  modelBtn.addEventListener('click', () => {
    audioClick();
    appState.modelAstroId = appState.activeAstroId;
    appState.screen = 'model';
    saveState(); render();
  });
  modelBtn.addEventListener('mouseenter', () => audioHover());
  bottomBar.appendChild(modelBtn);
  canvasWrap.appendChild(bottomBar);

  // Planet detail popup container
  planetDetailEl = el('div', '');
  planetDetailEl.style.cssText = 'position:absolute!important;inset:0!important;z-index:400!important;pointer-events:none!important;';
  canvasWrap.appendChild(planetDetailEl);

  // Quick tip container
  quickTipEl = el('div', '');
  quickTipEl.style.cssText = 'position:absolute!important;inset:0!important;z-index:300!important;pointer-events:none!important;';
  canvasWrap.appendChild(quickTipEl);

  wrap.appendChild(canvasWrap);
  parent.appendChild(wrap);

  // Canvas events
  canvas.addEventListener('mousemove', onCanvasMouseMove);
  canvas.addEventListener('mousedown', onCanvasMouseDown);
  canvas.addEventListener('mouseup', onCanvasMouseUp);
  canvas.addEventListener('contextmenu', onCanvasContextMenu);
  canvas.addEventListener('mouseleave', onCanvasMouseLeave);
  canvas.addEventListener('wheel', onCanvasWheel, { passive: false });

  // Keyboard on canvas
  canvas.tabIndex = 0;
  canvas.addEventListener('keydown', (e) => {
    const astro2 = ASTRONOMERS.find(a => a.id === appState.activeAstroId);
    const planets = astro2 ? (PLANETS_DATA[astro2.planetSet] || []) : [];
    if (e.key === 'Enter' || e.key === ' ') {
      // Focus on hovered planet
      const hovered = planets.find(p => p.id === canvasState.hoveredId);
      if (hovered) {
        audioClick();
        if (e.key === 'Enter') showPlanetDetail(hovered);
        else showQuickTip(hovered, 400, 300);
      }
      e.preventDefault();
    }
  });

  startCanvas();
}

function onCanvasMouseMove(e: MouseEvent): void {
  const s = canvasState;
  if (s.dragging) {
    s.panX = s.panStart.x + (e.clientX - s.dragStart.x);
    s.panY = s.panStart.y + (e.clientY - s.dragStart.y);
    return;
  }
  const planet = hitTest(e.clientX, e.clientY);
  const prev = s.hoveredId;
  s.hoveredId = planet?.id || null;
  s.frozenId = planet?.id || null;
  if (planet?.id !== prev && planet) audioHover();
  if (canvasEl) canvasEl.style.cursor = planet ? 'pointer' : 'grab';
}

function onCanvasMouseDown(e: MouseEvent): void {
  const s = canvasState;
  s.dragging = true;
  s.dragStart = { x: e.clientX, y: e.clientY };
  s.panStart = { x: s.panX, y: s.panY };
  if (canvasEl) canvasEl.style.cursor = 'grabbing';
}

function onCanvasMouseUp(e: MouseEvent): void {
  const s = canvasState;
  const moved = Math.abs(e.clientX - s.dragStart.x) + Math.abs(e.clientY - s.dragStart.y);
  s.dragging = false;
  if (moved < 6) {
    const planet = hitTest(e.clientX, e.clientY);
    if (planet) {
      audioClick();
      if (e.button === 0) showPlanetDetail(planet);
      else if (e.button === 2) showQuickTip(planet, e.clientX, e.clientY);
    } else {
      hidePlanetDetail();
      hideQuickTip();
    }
  }
  if (canvasEl) canvasEl.style.cursor = 'grab';
}

function onCanvasContextMenu(e: MouseEvent): void {
  e.preventDefault();
  const planet = hitTest(e.clientX, e.clientY);
  if (planet) { audioClick(); showQuickTip(planet, e.clientX, e.clientY); }
}

function onCanvasMouseLeave(): void {
  canvasState.hoveredId = null;
  canvasState.frozenId = null;
}

function onCanvasWheel(e: WheelEvent): void {
  e.preventDefault();
  const delta = e.deltaY > 0 ? -0.12 : 0.12;
  canvasState.zoom = Math.min(3, Math.max(0.3, canvasState.zoom + delta));
}

function showPlanetDetail(planet: PlanetData): void {
  if (!planetDetailEl) return;
  planetDetailEl.style.pointerEvents = 'auto';
  const popup = el('div', 'ku-planet-popup');
  popup.innerHTML = `<h3>${planet.name}</h3><p>${planet.desc}</p>
    <div class="stats">${(planet.stats || []).map(s => `<div class="stat-item"><strong>${s.l}</strong>${s.v}</div>`).join('')}</div>`;
  const closeBtn = el('button', 'ku-planet-close', 'Zamknij');
  closeBtn.addEventListener('click', () => hidePlanetDetail());
  popup.appendChild(closeBtn);
  setTimeout(() => closeBtn.focus(), 50);

  const wrap = el('div', 'ku-planet-popup-wrap');
  wrap.appendChild(popup);
  wrap.addEventListener('click', (e) => { if (e.target === wrap) hidePlanetDetail(); });
  planetDetailEl.innerHTML = '';
  planetDetailEl.appendChild(wrap);
}

function hidePlanetDetail(): void {
  if (planetDetailEl) { planetDetailEl.innerHTML = ''; planetDetailEl.style.pointerEvents = 'none'; }
}

function showQuickTip(planet: PlanetData, cx: number, cy: number): void {
  if (!quickTipEl || !canvasEl) return;
  const rect = canvasEl.getBoundingClientRect();
  const lx = cx - rect.left - 220;
  const ly = cy - rect.top - 80;
  const tip = el('div', 'ku-planet-tooltip');
  tip.style.cssText = `left:${Math.max(0, lx)}px!important;top:${Math.max(0, ly)}px!important;`;
  tip.innerHTML = `<strong>${planet.name}</strong>${planet.desc}`;
  quickTipEl.innerHTML = '';
  quickTipEl.appendChild(tip);
  setTimeout(() => { document.addEventListener('click', hideQuickTip, { once: true }); }, 10);
}

function hideQuickTip(): void {
  if (quickTipEl) quickTipEl.innerHTML = '';
}

// ─── MODEL SCREEN ────────────────────────────────────────────────────────────
function renderModel(parent: HTMLElement): void {
  const astro = ASTRONOMERS.find(a => a.id === (appState.modelAstroId || appState.activeAstroId)) || ASTRONOMERS[2];
  const wrap = el('div', 'ku-model-screen');

  const title = el('div', 'ku-model-title', astro.modelTitle);
  wrap.appendChild(title);

  const imgWrap = el('div', 'ku-model-img-wrap');
  imgWrap.title = 'Kliknij, aby powiększyć';

  if (astro.id === 'ptolemeusz') {
    // Draw geocentric model on canvas (Earth in center)
    const canvas = document.createElement('canvas') as HTMLCanvasElement;
    canvas.width = 700; canvas.height = 420;
    canvas.style.cssText = 'width:100%;height:100%;display:block;';
    const ctx2 = canvas.getContext('2d')!;
    // Background
    ctx2.fillStyle = '#0a0a1a';
    ctx2.fillRect(0, 0, 700, 420);
    // Draw stars
    for (let i = 0; i < 80; i++) {
      ctx2.fillStyle = `rgba(255,255,255,${0.3 + Math.random() * 0.5})`;
      ctx2.beginPath();
      ctx2.arc(Math.random()*700, Math.random()*420, Math.random()*1.5, 0, Math.PI*2);
      ctx2.fill();
    }
    const cx = 350, cy = 210;
    const geocPlanets = [
      { name:'Księżyc', orbit:55, color:'#cccccc', r:8 },
      { name:'Merkury', orbit:90, color:'#aaaaaa', r:7 },
      { name:'Wenus', orbit:125, color:'#e8c080', r:10 },
      { name:'Słońce', orbit:165, color:'#FFB700', r:16, glow:true },
      { name:'Mars', orbit:200, color:'#d9573a', r:9 },
      { name:'Jowisz', orbit:235, color:'#c8a87a', r:13 },
      { name:'Saturn', orbit:270, color:'#e0d090', r:12 },
    ];
    // Draw orbits
    geocPlanets.forEach(p => {
      ctx2.strokeStyle = 'rgba(100,150,255,0.25)';
      ctx2.lineWidth = 1;
      ctx2.beginPath();
      ctx2.arc(cx, cy, p.orbit, 0, Math.PI*2);
      ctx2.stroke();
    });
    // Draw Earth at center
    const gEarth = ctx2.createRadialGradient(cx-4, cy-4, 2, cx, cy, 20);
    gEarth.addColorStop(0, '#6ab4f5');
    gEarth.addColorStop(0.5, '#4a8fe0');
    gEarth.addColorStop(1, '#1a3a6a');
    ctx2.fillStyle = gEarth;
    ctx2.beginPath(); ctx2.arc(cx, cy, 20, 0, Math.PI*2); ctx2.fill();
    ctx2.strokeStyle = '#88ccff'; ctx2.lineWidth = 1.5;
    ctx2.beginPath(); ctx2.arc(cx, cy, 20, 0, Math.PI*2); ctx2.stroke();
    ctx2.fillStyle = '#ffffff'; ctx2.font = 'bold 11px Arial'; ctx2.textAlign = 'center';
    ctx2.fillText('Ziemia', cx, cy + 34);
    ctx2.fillStyle = '#aaddff'; ctx2.font = '9px Arial';
    ctx2.fillText('(centrum)', cx, cy + 46);
    // Draw planets at fixed positions
    const angles = [0.3, 1.1, 2.0, 3.2, 4.1, 5.0, 5.8];
    geocPlanets.forEach((p, i) => {
      const angle = angles[i];
      const px = cx + Math.cos(angle) * p.orbit;
      const py = cy + Math.sin(angle) * p.orbit;
      if ((p as any).glow) {
        const gSun = ctx2.createRadialGradient(px, py, 0, px, py, p.r*2);
        gSun.addColorStop(0, '#ffffff'); gSun.addColorStop(0.3, '#FFD700');
        gSun.addColorStop(0.7, '#FF8C00'); gSun.addColorStop(1, 'transparent');
        ctx2.fillStyle = gSun;
        ctx2.beginPath(); ctx2.arc(px, py, p.r*2, 0, Math.PI*2); ctx2.fill();
      }
      const g = ctx2.createRadialGradient(px-p.r*0.3, py-p.r*0.3, p.r*0.1, px, py, p.r);
      g.addColorStop(0, lighten(p.color));
      g.addColorStop(1, p.color);
      ctx2.fillStyle = g;
      ctx2.beginPath(); ctx2.arc(px, py, p.r, 0, Math.PI*2); ctx2.fill();
      ctx2.fillStyle = '#ffffff'; ctx2.font = '10px Arial'; ctx2.textAlign = 'center';
      ctx2.fillText(p.name, px, py - p.r - 4);
    });
    // Title label
    ctx2.fillStyle = 'rgba(255,220,100,0.9)'; ctx2.font = 'bold 13px Arial'; ctx2.textAlign = 'center';
    ctx2.fillText('Model geocentryczny — Ziemia w centrum Wszechświata', cx, 18);
    imgWrap.appendChild(canvas);
  } else {
    const modelImg = el('img', '') as HTMLImageElement;
    const modelImgMap: Record<string, string> = { kopernik: 'planet_01.png', wspolczesny: 'planet_02.png' };
    modelImg.src = imgSrc(modelImgMap[astro.id] || 'planet_01.png');
    modelImg.alt = astro.modelTitle;
    imgWrap.appendChild(modelImg);
  }

  imgWrap.addEventListener('click', () => {
    audioClick();
    imgWrap.classList.toggle('zoomed');
    imgWrap.title = imgWrap.classList.contains('zoomed') ? 'Kliknij, aby pomniejszyć' : 'Kliknij, aby powiększyć';
  });
  wrap.appendChild(imgWrap);

  const footer = el('div', 'ku-model-footer');
  const backBtn = el('button', 'ku-btn ku-btn-280', 'Powrót');
  backBtn.addEventListener('click', () => { audioClick(); appState.screen = 'solar'; saveState(); render(); });
  backBtn.addEventListener('mouseenter', () => audioHover());
  footer.appendChild(backBtn);
  wrap.appendChild(footer);

  parent.appendChild(wrap);
}

// ─── POPUP OVERLAY ───────────────────────────────────────────────────────────
function renderPopupOverlay(parent: HTMLElement): void {
  const overlay = el('div', 'ku-overlay');
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) { appState.popup = ''; render(); }
  });
  const popup = el('div', 'ku-popup');

  if (appState.popup === 'bio') renderBioPopup(popup);
  else if (appState.popup === 'instruction') renderInstructionPopup(popup);
  else if (appState.popup === 'settings') renderSettingsPopup(popup);
  else if (appState.popup === 'history') renderHistoryPopup(popup);

  overlay.appendChild(popup);
  parent.appendChild(overlay);
}

function popupInner(popup: HTMLElement, title: string, width: number, height: number): HTMLElement {
  popup.style.cssText = `width:${width}px!important;height:${height}px!important;`;
  const inner = el('div', 'ku-popup-inner');
  inner.appendChild(el('div', 'ku-popup-title', title));
  inner.appendChild(el('div', 'ku-popup-sep'));
  popup.appendChild(inner);
  return inner;
}

function popupFooter(inner: HTMLElement, ...btns: HTMLElement[]): void {
  const footer = el('div', 'ku-popup-footer');
  btns.forEach(b => footer.appendChild(b));
  inner.appendChild(footer);
}

function mkBtn(text: string, cls: string, onClick: () => void): HTMLButtonElement {
  const b = el('button', cls, text);
  b.addEventListener('click', () => { audioClick(); onClick(); });
  b.addEventListener('mouseenter', () => audioHover());
  return b;
}

function renderBioPopup(popup: HTMLElement): void {
  const astro = ASTRONOMERS.find(a => a.id === appState.activeAstroId) || ASTRONOMERS[0];
  const inner = popupInner(popup, astro.name, 740, 480);
  const body = el('div', 'ku-popup-body');
  const bioContent = el('div', 'ku-bio-content');
  const portrait = el('img', 'ku-bio-portrait') as HTMLImageElement;
  portrait.src = imgSrc(astro.portrait); portrait.alt = astro.name;
  bioContent.appendChild(portrait);
  const bioText = el('div', 'ku-bio-text');
  bioText.innerHTML = astro.bio;
  bioContent.appendChild(bioText);
  body.appendChild(bioContent);
  inner.appendChild(body);
  const closeBtn = mkBtn('Zamknij', 'ku-btn ku-btn-280', () => { appState.popup = ''; render(); });
  const modelBtn = mkBtn(astro.systemName, 'ku-btn ku-btn-420', () => {
    appState.modelAstroId = astro.id;
    appState.popup = '';
    appState.screen = 'model';
    saveState(); render();
  });
  popupFooter(inner, modelBtn, closeBtn);
  setTimeout(() => closeBtn.focus(), 50);
}

function renderInstructionPopup(popup: HTMLElement): void {
  const inner = popupInner(popup, 'Instrukcja', 700, 500);
  const body = el('div', 'ku-popup-body');
  body.innerHTML = `<strong>Jak grać?</strong><br><br>Eksploruj trzy modele układu słonecznego — od geocentrycznego po heliocentryczny.<br><br>
    <strong>🔭 Portrety astronomów (lewa kolumna)</strong><br>Kliknij portret, aby zobaczyć biografię. Najedź myszką, aby zobaczyć podpowiedź.<br><br>
    <strong>🪐 Interaktywny układ słoneczny</strong><br>
    • <strong>LPM</strong> na planecie → szczegółowe informacje<br>
    • <strong>PPM</strong> na planecie → szybki opis<br>
    • <strong>Hover</strong> → zamraża planetę i wyświetla nazwę<br>
    • <strong>Kółko myszy</strong> lub <strong>+/-</strong> → przybliżanie/oddalanie<br>
    • <strong>Przeciąganie</strong> → przesuwanie widoku<br><br>
    <strong>⌨️ Klawiatura (WCAG)</strong><br>
    • TAB — przejście do kolejnego elementu<br>
    • Enter — zatwierdzenie / szczegóły planety<br>
    • Spacja — szybki opis planety<br>
    • Escape — zamknięcie okna`;
  inner.appendChild(body);
  const closeBtn = mkBtn('Zamknij', 'ku-btn ku-btn-280', () => { appState.popup = ''; render(); });
  popupFooter(inner, closeBtn);
  setTimeout(() => closeBtn.focus(), 50);
}

function renderSettingsPopup(popup: HTMLElement): void {
  const inner = popupInner(popup, 'Ustawienia', 740, 530);
  const body = el('div', 'ku-popup-body');
  const grid = el('div', 'ku-settings-grid');

  // Text size
  const card1 = el('div', 'ku-setting-card');
  card1.appendChild(el('div', 'ku-setting-label', '🔠 Wielkość tekstu'));
  const sizeBtns = el('div', 'ku-textsize-btns');
  [{ v: 1, s: '14px' }, { v: 2, s: '17px' }, { v: 3, s: '20px' }].forEach(({ v, s }) => {
    const b = el('button', `ku-textsize-btn${appState.settings.textSize === v ? ' active' : ''}`);
    b.style.fontSize = s; b.textContent = 'A';
    b.setAttribute('aria-label', `Rozmiar ${v}`);
    b.addEventListener('click', () => { audioClick(); appState.settings.textSize = v; applyWcag(); saveState(); renderSettingsPopup(popup); });
    sizeBtns.appendChild(b);
  });
  card1.appendChild(sizeBtns);
  grid.appendChild(card1);

  // High contrast
  const card2 = el('div', 'ku-setting-card');
  card2.appendChild(el('div', 'ku-setting-label', '👁️ Wysoki kontrast'));
  const contBtn = el('button', `ku-toggle-btn ${appState.settings.highContrast ? 'on' : 'off'}`,
    appState.settings.highContrast ? 'WŁĄCZONY' : 'WYŁĄCZONY');
  contBtn.addEventListener('click', () => { audioClick(); appState.settings.highContrast = !appState.settings.highContrast; applyWcag(); saveState(); renderSettingsPopup(popup); });
  card2.appendChild(contBtn);
  grid.appendChild(card2);

  // Reduce motion
  const card3 = el('div', 'ku-setting-card');
  card3.appendChild(el('div', 'ku-setting-label', '〰 Redukcja ruchu'));
  const motBtn = el('button', `ku-toggle-btn ${appState.settings.reduceMotion ? 'on' : 'off'}`,
    appState.settings.reduceMotion ? 'WŁĄCZONA' : 'WYŁĄCZONA');
  motBtn.addEventListener('click', () => { audioClick(); appState.settings.reduceMotion = !appState.settings.reduceMotion; applyWcag(); saveState(); renderSettingsPopup(popup); });
  card3.appendChild(motBtn);
  grid.appendChild(card3);

  // Show orbits
  const card4 = el('div', 'ku-setting-card');
  card4.appendChild(el('div', 'ku-setting-label', '〰 Widoczność orbit'));
  const orbBtn = el('button', `ku-toggle-btn ${appState.settings.showOrbits ? 'on' : 'off'}`,
    appState.settings.showOrbits ? 'WŁĄCZONA' : 'WYŁĄCZONA');
  orbBtn.addEventListener('click', () => { audioClick(); appState.settings.showOrbits = !appState.settings.showOrbits; saveState(); renderSettingsPopup(popup); });
  card4.appendChild(orbBtn);
  grid.appendChild(card4);

  // Color filter
  const card5 = el('div', 'ku-setting-card');
  card5.appendChild(el('div', 'ku-setting-label', '🎨 Filtr kolorów'));
  const colorSel = el('select', 'ku-select') as HTMLSelectElement;
  [['none', 'Brak'], ['grayscale', 'Skala szarości'], ['deuteranopia', 'Daltonizm (Deuteranopia)'],
   ['protanopia', 'Daltonizm (Protanopia)'], ['tritanopia', 'Daltonizm (Tritanopia)']].forEach(([v, t]) => {
    const opt = el('option', ''); opt.setAttribute('value', v); opt.textContent = t;
    if (appState.settings.colorFilter === v) opt.selected = true;
    colorSel.appendChild(opt);
  });
  colorSel.addEventListener('change', () => { appState.settings.colorFilter = colorSel.value; applyWcag(); saveState(); });
  card5.appendChild(colorSel);
  grid.appendChild(card5);

  // Learn mode
  const card6 = el('div', 'ku-setting-card');
  card6.appendChild(el('div', 'ku-setting-label', '📖 Tryb nauki (ślady)'));
  const learnBtn = el('button', `ku-toggle-btn ${appState.settings.learnMode ? 'on' : 'off'}`,
    appState.settings.learnMode ? 'WŁĄCZONY' : 'WYŁĄCZONY');
  learnBtn.addEventListener('click', () => { audioClick(); appState.settings.learnMode = !appState.settings.learnMode; canvasState.trails = {}; saveState(); renderSettingsPopup(popup); });
  card6.appendChild(learnBtn);
  grid.appendChild(card6);

  // Cursor
  const cardCursor = el('div', 'ku-setting-card-full');
  cardCursor.appendChild(el('div', 'ku-setting-label', '🖱️ Kursor'));
  const cursorRow = el('div', 'ku-cursor-row');
  cursorRow.style.marginTop = '6px';

  const sizeDiv = el('div', '');
  sizeDiv.appendChild(el('div', 'ku-setting-desc', 'Rozmiar:'));
  const sizeSel = el('select', 'ku-select') as HTMLSelectElement;
  [['normal', 'Normalny'], ['duz', 'Duży'], ['bduzy', 'Bardzo duży']].forEach(([v, t]) => {
    const opt = el('option', ''); opt.setAttribute('value', v); opt.textContent = t;
    if (appState.settings.cursorSize === v) opt.selected = true;
    sizeSel.appendChild(opt);
  });
  sizeSel.addEventListener('change', () => { appState.settings.cursorSize = sizeSel.value; applyWcag(); saveState(); });
  sizeDiv.appendChild(sizeSel);
  cursorRow.appendChild(sizeDiv);

  const colorDiv = el('div', '');
  colorDiv.appendChild(el('div', 'ku-setting-desc', 'Kolor:'));
  const colorCursorSel = el('select', 'ku-select') as HTMLSelectElement;
  [['domyslny', 'Domyślny'], ['bialy', 'Biały'], ['zolty', 'Żółty'], ['blekitny', 'Błękitny']].forEach(([v, t]) => {
    const opt = el('option', ''); opt.setAttribute('value', v); opt.textContent = t;
    if (appState.settings.cursorColor === v) opt.selected = true;
    colorCursorSel.appendChild(opt);
  });
  colorCursorSel.addEventListener('change', () => { appState.settings.cursorColor = colorCursorSel.value; applyWcag(); saveState(); });
  colorDiv.appendChild(colorCursorSel);
  cursorRow.appendChild(colorDiv);

  cardCursor.appendChild(cursorRow);
  grid.appendChild(cardCursor);

  body.appendChild(grid);
  inner.appendChild(body);
  const closeBtn = mkBtn('Zamknij', 'ku-btn ku-btn-280', () => { appState.popup = ''; render(); });
  popupFooter(inner, closeBtn);
  setTimeout(() => closeBtn.focus(), 50);
}

function renderHistoryPopup(popup: HTMLElement): void {
  const inner = popupInner(popup, 'Historia modeli Wszechświata', 700, 500);
  const body = el('div', 'ku-popup-body');
  body.innerHTML = `<p>Przez wieki ludzkość próbowała zrozumieć budowę Wszechświata. Oto jak zmieniały się modele kosmologiczne:</p>
    <div style="display:flex!important;flex-direction:column!important;gap:16px!important;margin-top:14px!important;">
      ${ASTRONOMERS.map(a => `
        <div style="display:flex!important;gap:14px!important;align-items:flex-start!important;padding:12px!important;background:rgba(255,255,255,.05)!important;border-radius:8px!important;border-left:4px solid #FFD700!important;">
          <img src="${imgSrc(a.portrait)}" alt="${a.name}" style="width:56px!important;height:70px!important;object-fit:cover!important;border-radius:4px!important;flex-shrink:0!important;">
          <div>
            <div style="font-size:16px!important;font-weight:700!important;color:#FFD700!important;margin-bottom:4px!important;">${a.name}</div>
            <div style="font-size:13px!important;color:#e8e8f0!important;">${a.modelTitle}</div>
          </div>
        </div>`).join('')}
    </div>
    <p style="margin-top:16px!important;color:#aad4ff!important;font-style:italic!important;">Każdy model był krokiem naprzód — nawet jeśli okazał się błędny, przybliżał nas do prawdy.</p>`;
  inner.appendChild(body);
  const closeBtn = mkBtn('Zamknij', 'ku-btn ku-btn-280', () => { appState.popup = ''; render(); });
  popupFooter(inner, closeBtn);
  setTimeout(() => closeBtn.focus(), 50);
}

// ─── ONBOARDING ──────────────────────────────────────────────────────────────
function renderOnboarding(parent: HTMLElement): void {
  const step = ONBOARD_STEPS[appState.onboardStep];
  const overlay = el('div', 'ku-onboard-overlay');
  const box = el('div', 'ku-onboard-box');

  box.appendChild(el('span', 'ku-onboard-icon', step.icon));
  box.appendChild(el('div', 'ku-onboard-title', step.title));
  const text = el('div', 'ku-onboard-text');
  text.innerHTML = step.text;
  box.appendChild(text);

  const dots = el('div', 'ku-onboard-dots');
  ONBOARD_STEPS.forEach((_, i) => {
    dots.appendChild(el('div', `ku-onboard-dot${i === appState.onboardStep ? ' active' : ''}`));
  });
  box.appendChild(dots);

  const btnsRow = el('div', 'ku-onboard-btns');
  const skipBtn = el('button', 'ku-onboard-btn', 'Pomiń');
  skipBtn.addEventListener('click', () => {
    audioClick();
    appState.onboardDone = true;
    saveState(); render();
  });
  btnsRow.appendChild(skipBtn);

  const isLast = appState.onboardStep >= ONBOARD_STEPS.length - 1;
  const nextBtn = el('button', 'ku-onboard-btn primary', isLast ? 'Rozumiem' : 'Dalej');
  nextBtn.addEventListener('click', () => {
    audioClick();
    if (isLast) {
      appState.onboardDone = true;
      saveState(); render();
    } else {
      appState.onboardStep++;
      render();
    }
  });
  btnsRow.appendChild(nextBtn);
  box.appendChild(btnsRow);

  overlay.appendChild(box);
  parent.appendChild(overlay);
  setTimeout(() => nextBtn.focus(), 50);
}

// ─── KEYBOARD ────────────────────────────────────────────────────────────────
function setupKeyboard(): void {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (appState.popup) { appState.popup = ''; render(); }
      else if (!appState.onboardDone) { appState.onboardDone = true; render(); }
    }
  });
}

/// ─── SCALING ─────────────────────────────────────────────────────────────────
const GAME_W = 1280;
const GAME_H = 720;

function scaleRoot(): void {
  if (!root) return;
  const parent = root.parentElement;
  if (!parent) return;
  const cw = parent.clientWidth || GAME_W;
  const scale = Math.min(cw / GAME_W, 1);
  const scaledH = Math.round(GAME_H * scale);
  root.style.cssText = `width:${GAME_W}px!important;height:${GAME_H}px!important;transform:scale(${scale})!important;transform-origin:top left!important;overflow:hidden!important;position:relative!important;`;
  parent.style.cssText = `width:100%;height:${scaledH}px;overflow:hidden;position:relative;`;
}

// ─── ZPE-PORT LIFECYCLE ──────────────────────────────────────────────────────
export function init(container: HTMLElement): Promise<void> {
  return new Promise((resolve) => {
    // Inject CSS into document head
    if (!document.getElementById('ku-styles')) {
      const styleEl = document.createElement('style');
      styleEl.id = 'ku-styles';
      styleEl.textContent = _cssRaw;
      document.head.appendChild(styleEl);
    }

    root = el('div', 'ku-root');
    container.appendChild(root);

    // Custom cursor element (outside root to avoid filter issues)
    const cursor = document.createElement('div');
    cursor.id = 'ku-custom-cursor';
    cursor.style.cssText = 'position:fixed!important;pointer-events:none!important;z-index:99999!important;display:none!important;transform:translate(-4px,-4px)!important;';
    document.body.appendChild(cursor);

    setupKeyboard();
    // Scale to fit container
    scaleRoot();
    const ro = new ResizeObserver(() => scaleRoot());
    ro.observe(container);
    resolve();
  });
}

export function run(stateData: Record<string, any> | null, frozen: boolean): void {
  isFrozen = frozen;
  if (stateData) {
    appState.screen = stateData.screen || 'welcome';
    appState.activeAstroId = stateData.activeAstroId || null;
    appState.onboardDone = stateData.onboardDone || false;
    if (stateData.settings) {
      appState.settings = { ...appState.settings, ...stateData.settings };
    }
    _muted = !appState.settings.soundOn;
    _masterVol = appState.settings.volume / 100;
  }
  if (appState.activeAstroId) initAngles(ASTRONOMERS.find(a => a.id === appState.activeAstroId)?.planetSet || 'wspolczesny');
  render();
}

export function unload(): void {
  stopCanvas();
  saveState();
}

export function destroy(): void {
  stopCanvas();
  if (_audioCtx) { _audioCtx.close(); _audioCtx = null; }
  const cursor = document.getElementById('ku-custom-cursor');
  if (cursor) cursor.remove();
  if (root && root.parentNode) root.parentNode.removeChild(root);
}
