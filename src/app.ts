import { path, setState } from "@/zpe-port";

// ═══════════════════════════════════════════════════════════════════
// TYPES & INTERFACES
// ═══════════════════════════════════════════════════════════════════

interface Planet {
  name: string;
  type: string;
  color: string;
  radius: number;
  orbitRadius: number;
  orbitSpeed: number;
  angle: number;
  eccentricity?: number; // for Kepler elliptical orbits
}

interface AstronomerModel {
  id: string;
  name: string;
  years: string;
  portrait: string;
  portraitOver: string;
  modelTitle: string;
  modelType: "geocentric" | "heliocentric" | "kepler";
  bio: string;
  planets: Planet[];
}

interface WcagSettings {
  textSize: 1 | 2 | 3;
  highContrast: boolean;
  reduceMotion: boolean;
  orbitsVisible: boolean;
  colorFilter: "none" | "protanopia" | "deuteranopia" | "tritanopia" | "grayscale";
  voiceover: boolean;
  audiodesc: boolean;
  cursorSize: "normal" | "large" | "xlarge";
  cursorColor: "default" | "white" | "yellow" | "cyan";
}

interface AppState {
  screen: "welcome" | "game" | "model";
  selectedAstronomer: number;
  modelAstronomer: number;
  wcag: WcagSettings;
  onboardingDone: boolean;
  onboardingStep: number;
}

// ═══════════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════════

const GAME_W = 1920;
const GAME_H = 1080;
const TOPBAR_H = 68;

// ═══════════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════════

const PTOLEMY_PLANETS: Planet[] = [
  { name: "Księżyc",  type: "Satelita",       color: "#C8C8C8", radius: 10, orbitRadius: 90,  orbitSpeed: 0.025, angle: 0 },
  { name: "Merkury",  type: "Planeta skalista",color: "#B5A07A", radius: 12, orbitRadius: 140, orbitSpeed: 0.020, angle: 1.0 },
  { name: "Wenus",    type: "Planeta skalista",color: "#E8C87A", radius: 18, orbitRadius: 195, orbitSpeed: 0.015, angle: 2.1 },
  { name: "Słońce",   type: "Gwiazda",         color: "#FFD700", radius: 30, orbitRadius: 260, orbitSpeed: 0.010, angle: 0.5 },
  { name: "Mars",     type: "Planeta skalista",color: "#C1440E", radius: 14, orbitRadius: 330, orbitSpeed: 0.008, angle: 3.2 },
  { name: "Jowisz",   type: "Planeta gazowa",  color: "#C88B3A", radius: 26, orbitRadius: 400, orbitSpeed: 0.005, angle: 1.7 },
  { name: "Saturn",   type: "Planeta gazowa",  color: "#E8D5A3", radius: 22, orbitRadius: 470, orbitSpeed: 0.003, angle: 4.1 },
];

const COPERNICUS_PLANETS: Planet[] = [
  { name: "Merkury",  type: "Planeta skalista",color: "#B5A07A", radius: 10, orbitRadius: 80,  orbitSpeed: 0.030, angle: 0 },
  { name: "Wenus",    type: "Planeta skalista",color: "#E8C87A", radius: 14, orbitRadius: 130, orbitSpeed: 0.022, angle: 1.2 },
  { name: "Ziemia",   type: "Planeta skalista",color: "#4A90D9", radius: 15, orbitRadius: 185, orbitSpeed: 0.017, angle: 2.5 },
  { name: "Mars",     type: "Planeta skalista",color: "#C1440E", radius: 12, orbitRadius: 245, orbitSpeed: 0.012, angle: 0.8 },
  { name: "Jowisz",   type: "Planeta gazowa",  color: "#C88B3A", radius: 28, orbitRadius: 330, orbitSpeed: 0.006, angle: 3.7 },
  { name: "Saturn",   type: "Planeta gazowa",  color: "#E8D5A3", radius: 24, orbitRadius: 420, orbitSpeed: 0.003, angle: 5.2 },
];

const KEPLER_PLANETS: Planet[] = [
  { name: "Merkury",  type: "Planeta skalista",color: "#B5A07A", radius: 10, orbitRadius: 80,  orbitSpeed: 0.030, angle: 0,   eccentricity: 0.206 },
  { name: "Wenus",    type: "Planeta skalista",color: "#E8C87A", radius: 14, orbitRadius: 130, orbitSpeed: 0.022, angle: 1.2, eccentricity: 0.007 },
  { name: "Ziemia",   type: "Planeta skalista",color: "#4A90D9", radius: 15, orbitRadius: 185, orbitSpeed: 0.017, angle: 2.5, eccentricity: 0.017 },
  { name: "Mars",     type: "Planeta skalista",color: "#C1440E", radius: 12, orbitRadius: 245, orbitSpeed: 0.012, angle: 0.8, eccentricity: 0.093 },
  { name: "Jowisz",   type: "Planeta gazowa",  color: "#C88B3A", radius: 28, orbitRadius: 330, orbitSpeed: 0.006, angle: 3.7, eccentricity: 0.049 },
  { name: "Saturn",   type: "Planeta gazowa",  color: "#E8D5A3", radius: 24, orbitRadius: 420, orbitSpeed: 0.003, angle: 5.2, eccentricity: 0.057 },
];

const ASTRONOMERS: AstronomerModel[] = [
  {
    id: "ptolemeusz",
    name: "Klaudiusz Ptolemeusz",
    years: "ok. 100–170 n.e.",
    portrait: "images/pp_01.png",
    portraitOver: "images/pp_01.png",
    modelTitle: "Układ geocentryczny Ptolemeusza",
    modelType: "geocentric",
    bio: `<b>Klaudiusz Ptolemeusz</b> (ok. 100–170 n.e.) był grecko-egipskim astronomem, matematykiem i geografem. W dziele <i>Almagest</i> opisał geocentryczny model Wszechświata, w którym <b>Ziemia stała nieruchomo w centrum</b>, a Słońce, Księżyc i planety krążyły wokół niej na sferach krystalicznych.<br><br>Model ten dominował w astronomii przez ponad 1400 lat.`,
    planets: PTOLEMY_PLANETS,
  },
  {
    id: "kopernik",
    name: "Mikołaj Kopernik",
    years: "1473–1543",
    portrait: "images/pp_02.png",
    portraitOver: "images/pp_02_over.png",
    modelTitle: "Układ słoneczny Mikołaja Kopernika",
    modelType: "heliocentric",
    bio: `<b>Mikołaj Kopernik</b> (1473–1543) był polskim astronomem, który zaproponował <b>heliocentryczny model Wszechświata</b>. W dziele <i>De revolutionibus</i> (1543) umieścił Słońce w centrum, a Ziemię na orbicie.<br><br>Była to rewolucja, która zmieniła postrzeganie miejsca człowieka we Wszechświecie i zapoczątkowała nowoczesną astronomię.`,
    planets: COPERNICUS_PLANETS,
  },
  {
    id: "kepler",
    name: "Johannes Kepler",
    years: "1571–1630",
    portrait: "images/pp_03.png",
    portraitOver: "images/pp_03.png",
    modelTitle: "Układ słoneczny Jana Keplera",
    modelType: "kepler",
    bio: `<b>Johannes Kepler</b> (1571–1630) był niemieckim astronomem i matematykiem. Odkrył, że planety poruszają się po <b>eliptycznych orbitach</b>, a nie kołowych. Jego trzy prawa ruchu planet stanowią fundament mechaniki nieba.<br><br>Prawa Keplera potwierdziły heliocentryczny model Kopernika i utorowały drogę dla teorii grawitacji Newtona.`,
    planets: KEPLER_PLANETS,
  },
];

const ONBOARDING_STEPS = [
  {
    icon: "🕹️",
    title: "Nawigacja",
    text: "Używaj <b>kółka myszy</b> lub przycisków <b>+/−</b> aby przybliżać i oddalać widok układu słonecznego. Przeciągaj myszą aby przesuwać widok.",
  },
  {
    icon: "🖱️",
    title: "Interakcje",
    text: "<b>Lewy przycisk myszy</b> na portrecie astronoma — otwiera jego biografię i model układu.<br><b>Najedź kursorem</b> na planetę — zobaczysz jej nazwę i typ.",
  },
  {
    icon: "⚙️",
    title: "Dostępność",
    text: "Kliknij przycisk <b>Ustawienia</b> aby dostosować rozmiar tekstu, kontrast, filtry kolorów i inne opcje dostępności.",
  },
];

// ═══════════════════════════════════════════════════════════════════
// CSS INJECTION
// ═══════════════════════════════════════════════════════════════════

function injectCSS(): void {
  const existing = document.getElementById("ku-styles");
  if (existing) return;
  const style = document.createElement("style");
  style.id = "ku-styles";
  style.textContent = getCSS();
  document.head.appendChild(style);
}

function getCSS(): string {
  return `
/* ═══════════════════════════════════════════════════════════════
   KOSMICZNE UKŁADY — CSS (ZPE isolated, all !important)
   Namespace: #ku-root
═══════════════════════════════════════════════════════════════ */

#ku-root * {
  box-sizing: border-box !important;
  margin: 0 !important;
  padding: 0 !important;
  font-family: 'Segoe UI', Arial, sans-serif !important;
}

#ku-root {
  position: relative !important;
  width: ${GAME_W}px !important;
  height: ${GAME_H}px !important;
  overflow: hidden !important;
  background: #000 !important;
  transform-origin: top left !important;
  user-select: none !important;
}

/* ── Topbar ── */
#ku-root .ku-topbar {
  position: absolute !important;
  top: 0 !important; left: 0 !important; right: 0 !important;
  height: ${TOPBAR_H}px !important;
  z-index: 800 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  padding: 0 20px !important;
  background-size: 100% 100% !important;
  background-repeat: no-repeat !important;
}

#ku-root .ku-topbar-title {
  font-size: 22px !important;
  font-weight: 700 !important;
  letter-spacing: 3px !important;
  text-transform: uppercase !important;
  color: #FFD700 !important;
  text-shadow: 0 0 15px rgba(255,215,0,0.6) !important;
}

#ku-root .ku-topbar-btns {
  display: flex !important;
  gap: 10px !important;
  align-items: center !important;
}

#ku-root .ku-topbar-btn {
  width: 44px !important;
  height: 44px !important;
  border: none !important;
  border-radius: 50% !important;
  background: rgba(255,255,255,0.1) !important;
  color: #fff !important;
  font-size: 18px !important;
  cursor: pointer !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  transition: background 0.2s !important;
}

#ku-root .ku-topbar-btn:hover {
  background: rgba(255,215,0,0.3) !important;
}

#ku-root .ku-topbar-btn:focus {
  outline: 2px solid #FFD700 !important;
  outline-offset: 2px !important;
}

/* ── Content area ── */
#ku-root .ku-content {
  position: absolute !important;
  top: ${TOPBAR_H}px !important;
  left: 0 !important; right: 0 !important; bottom: 0 !important;
  overflow: hidden !important;
}

/* ── Background ── */
#ku-root .ku-bg {
  position: absolute !important;
  top: 0 !important; left: 0 !important;
  width: 100% !important; height: 100% !important;
  background-size: cover !important;
  background-position: center !important;
  background-repeat: no-repeat !important;
}

/* ── Screen visibility ── */
#ku-root .ku-screen {
  position: absolute !important;
  top: 0 !important; left: 0 !important;
  width: 100% !important; height: 100% !important;
  display: none !important;
}

#ku-root .ku-screen.ku-active {
  display: flex !important;
}

/* ══════════════════════════════════════════════════════════════
   WELCOME SCREEN
══════════════════════════════════════════════════════════════ */

#ku-root .ku-welcome {
  flex-direction: column !important;
  align-items: center !important;
  justify-content: center !important;
}

#ku-root .ku-welcome-popup {
  background: rgba(10, 30, 80, 0.92) !important;
  border: 2px solid rgba(100, 160, 255, 0.5) !important;
  border-radius: 16px !important;
  padding: 50px 60px !important;
  max-width: 820px !important;
  width: 90% !important;
  text-align: center !important;
  backdrop-filter: blur(10px) !important;
  box-shadow: 0 0 60px rgba(50, 100, 255, 0.3) !important;
}

#ku-root .ku-welcome-title {
  font-size: 32px !important;
  font-weight: 700 !important;
  color: #FFD700 !important;
  margin-bottom: 20px !important;
  letter-spacing: 2px !important;
}

#ku-root .ku-welcome-text {
  font-size: 18px !important;
  color: #cce0ff !important;
  line-height: 1.7 !important;
  margin-bottom: 40px !important;
}

#ku-root .ku-welcome-btns {
  display: flex !important;
  gap: 20px !important;
  justify-content: center !important;
}

/* ══════════════════════════════════════════════════════════════
   BUTTONS
══════════════════════════════════════════════════════════════ */

#ku-root .ku-btn {
  padding: 14px 36px !important;
  border: none !important;
  border-radius: 8px !important;
  font-size: 16px !important;
  font-weight: 600 !important;
  cursor: pointer !important;
  letter-spacing: 1px !important;
  text-transform: uppercase !important;
  transition: all 0.2s !important;
  background-size: 100% 100% !important;
  background-repeat: no-repeat !important;
}

#ku-root .ku-btn:focus {
  outline: 3px solid #FFD700 !important;
  outline-offset: 2px !important;
}

#ku-root .ku-btn-primary {
  background: linear-gradient(135deg, #1a6bc4, #0d4a8a) !important;
  color: #fff !important;
  border: 1px solid rgba(100,180,255,0.4) !important;
}

#ku-root .ku-btn-primary:hover {
  background: linear-gradient(135deg, #2a7bd4, #1a5a9a) !important;
  box-shadow: 0 0 20px rgba(50,130,255,0.5) !important;
}

#ku-root .ku-btn-secondary {
  background: rgba(255,255,255,0.1) !important;
  color: #cce0ff !important;
  border: 1px solid rgba(100,160,255,0.3) !important;
}

#ku-root .ku-btn-secondary:hover {
  background: rgba(255,255,255,0.2) !important;
}

#ku-root .ku-btn-gold {
  background: linear-gradient(135deg, #c8a000, #a07800) !important;
  color: #fff !important;
  border: 1px solid rgba(255,215,0,0.4) !important;
}

#ku-root .ku-btn-gold:hover {
  background: linear-gradient(135deg, #e8c000, #c09000) !important;
  box-shadow: 0 0 20px rgba(255,215,0,0.4) !important;
}

/* ══════════════════════════════════════════════════════════════
   GAME SCREEN
══════════════════════════════════════════════════════════════ */

#ku-root .ku-game {
  flex-direction: row !important;
}

/* Left panel — astronomer portraits */
#ku-root .ku-portraits-panel {
  position: absolute !important;
  left: 0 !important; top: 0 !important; bottom: 0 !important;
  width: 180px !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
  align-items: center !important;
  gap: 16px !important;
  padding: 20px 10px !important;
  background: rgba(0,0,20,0.6) !important;
  border-right: 1px solid rgba(100,160,255,0.2) !important;
  z-index: 10 !important;
}

#ku-root .ku-portrait-btn {
  width: 155px !important;
  height: 155px !important;
  border: 3px solid rgba(100,160,255,0.3) !important;
  border-radius: 8px !important;
  overflow: hidden !important;
  cursor: pointer !important;
  background: none !important;
  padding: 0 !important;
  transition: border-color 0.2s, box-shadow 0.2s !important;
  position: relative !important;
}

#ku-root .ku-portrait-btn img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  display: block !important;
}

#ku-root .ku-portrait-btn:hover,
#ku-root .ku-portrait-btn.ku-active-portrait {
  border-color: #FFD700 !important;
  box-shadow: 0 0 20px rgba(255,215,0,0.4) !important;
}

#ku-root .ku-portrait-btn:focus {
  outline: 3px solid #FFD700 !important;
  outline-offset: 2px !important;
}

#ku-root .ku-portrait-name {
  font-size: 11px !important;
  color: #aac8ff !important;
  text-align: center !important;
  margin-top: 4px !important;
  line-height: 1.3 !important;
  max-width: 155px !important;
}

/* Canvas area */
#ku-root .ku-canvas-area {
  position: absolute !important;
  left: 180px !important;
  top: 0 !important; right: 0 !important; bottom: 0 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

#ku-root .ku-solar-canvas {
  display: block !important;
  cursor: grab !important;
}

#ku-root .ku-solar-canvas:active {
  cursor: grabbing !important;
}

/* Model title */
#ku-root .ku-model-title {
  position: absolute !important;
  top: 16px !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
  font-size: 20px !important;
  font-weight: 600 !important;
  color: #fff !important;
  text-shadow: 0 2px 8px rgba(0,0,0,0.8) !important;
  text-align: center !important;
  pointer-events: none !important;
  z-index: 5 !important;
  white-space: nowrap !important;
}

/* Zoom controls */
#ku-root .ku-zoom-controls {
  position: absolute !important;
  right: 20px !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 8px !important;
  z-index: 10 !important;
}

#ku-root .ku-zoom-btn {
  width: 44px !important;
  height: 44px !important;
  border: 1px solid rgba(100,160,255,0.4) !important;
  border-radius: 8px !important;
  background: rgba(10,30,80,0.8) !important;
  color: #fff !important;
  font-size: 22px !important;
  cursor: pointer !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  transition: background 0.2s !important;
}

#ku-root .ku-zoom-btn:hover {
  background: rgba(30,60,140,0.9) !important;
}

#ku-root .ku-zoom-btn:focus {
  outline: 2px solid #FFD700 !important;
}

/* Planet tooltip */
#ku-root .ku-tooltip {
  position: absolute !important;
  background: rgba(0,0,0,0.85) !important;
  border: 1px solid rgba(100,160,255,0.5) !important;
  border-radius: 8px !important;
  padding: 10px 14px !important;
  pointer-events: none !important;
  z-index: 50 !important;
  display: none !important;
}

#ku-root .ku-tooltip.ku-visible {
  display: block !important;
}

#ku-root .ku-tooltip-name {
  font-size: 15px !important;
  font-weight: 700 !important;
  color: #fff !important;
}

#ku-root .ku-tooltip-type {
  font-size: 12px !important;
  color: #aac8ff !important;
  margin-top: 4px !important;
  background: rgba(50,100,200,0.3) !important;
  border-radius: 4px !important;
  padding: 2px 6px !important;
  display: inline-block !important;
}

/* ══════════════════════════════════════════════════════════════
   OVERLAY (for popups, settings, onboarding)
══════════════════════════════════════════════════════════════ */

#ku-root .ku-overlay {
  position: absolute !important;
  top: ${TOPBAR_H}px !important;
  left: 0 !important; right: 0 !important; bottom: 0 !important;
  background: rgba(0,0,0,0.6) !important;
  z-index: 600 !important;
  display: none !important;
  align-items: center !important;
  justify-content: center !important;
}

#ku-root .ku-overlay.ku-visible {
  display: flex !important;
}

/* ══════════════════════════════════════════════════════════════
   BIOGRAPHY POPUP
══════════════════════════════════════════════════════════════ */

#ku-root .ku-bio-popup {
  background: linear-gradient(160deg, #0e2a52, #0a1e3d, #071530) !important;
  border: 1px solid rgba(100,160,255,0.3) !important;
  border-radius: 16px !important;
  padding: 40px !important;
  max-width: 920px !important;
  width: 90% !important;
  max-height: 80vh !important;
  overflow-y: auto !important;
  position: relative !important;
  box-shadow: 0 0 60px rgba(0,0,0,0.8) !important;
}

#ku-root .ku-bio-header {
  display: flex !important;
  gap: 30px !important;
  align-items: flex-start !important;
  margin-bottom: 24px !important;
}

#ku-root .ku-bio-portrait {
  width: 120px !important;
  height: 120px !important;
  border-radius: 8px !important;
  object-fit: cover !important;
  border: 2px solid rgba(255,215,0,0.4) !important;
  flex-shrink: 0 !important;
}

#ku-root .ku-bio-info {
  flex: 1 !important;
}

#ku-root .ku-bio-name {
  font-size: 26px !important;
  font-weight: 700 !important;
  color: #FFD700 !important;
  margin-bottom: 6px !important;
}

#ku-root .ku-bio-years {
  font-size: 14px !important;
  color: #aac8ff !important;
  margin-bottom: 16px !important;
}

#ku-root .ku-bio-text {
  font-size: 16px !important;
  color: #cce0ff !important;
  line-height: 1.7 !important;
}

#ku-root .ku-bio-btns {
  display: flex !important;
  gap: 16px !important;
  margin-top: 30px !important;
  flex-wrap: wrap !important;
}

#ku-root .ku-bio-close {
  position: absolute !important;
  top: 16px !important;
  right: 16px !important;
  width: 36px !important;
  height: 36px !important;
  border: none !important;
  background: rgba(255,255,255,0.1) !important;
  color: #fff !important;
  font-size: 18px !important;
  border-radius: 50% !important;
  cursor: pointer !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

#ku-root .ku-bio-close:hover {
  background: rgba(255,255,255,0.2) !important;
}

/* ══════════════════════════════════════════════════════════════
   MODEL SCREEN
══════════════════════════════════════════════════════════════ */

#ku-root .ku-model {
  flex-direction: column !important;
  align-items: center !important;
  justify-content: center !important;
}

#ku-root .ku-model-container {
  position: relative !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  gap: 20px !important;
  width: 100% !important;
  height: 100% !important;
}

#ku-root .ku-model-header {
  text-align: center !important;
  padding-top: 20px !important;
}

#ku-root .ku-model-heading {
  font-size: 28px !important;
  font-weight: 700 !important;
  color: #FFD700 !important;
  text-shadow: 0 0 20px rgba(255,215,0,0.4) !important;
}

#ku-root .ku-model-canvas-wrap {
  flex: 1 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 100% !important;
  cursor: pointer !important;
}

#ku-root .ku-model-canvas {
  display: block !important;
  border-radius: 8px !important;
}

#ku-root .ku-model-footer {
  padding-bottom: 20px !important;
}

/* ══════════════════════════════════════════════════════════════
   ONBOARDING
══════════════════════════════════════════════════════════════ */

#ku-root .ku-onboarding-overlay {
  position: absolute !important;
  top: ${TOPBAR_H}px !important;
  left: 0 !important; right: 0 !important; bottom: 0 !important;
  background: rgba(0,0,0,0.7) !important;
  z-index: 750 !important;
  display: none !important;
  align-items: center !important;
  justify-content: center !important;
}

#ku-root .ku-onboarding-overlay.ku-visible {
  display: flex !important;
}

#ku-root .ku-onboarding-card {
  background: linear-gradient(160deg, #0e2a52, #071530) !important;
  border: 1px solid rgba(100,160,255,0.4) !important;
  border-radius: 16px !important;
  padding: 40px 50px !important;
  max-width: 560px !important;
  width: 90% !important;
  text-align: center !important;
  box-shadow: 0 0 60px rgba(0,0,0,0.8) !important;
}

#ku-root .ku-onboarding-icon {
  font-size: 52px !important;
  margin-bottom: 16px !important;
  display: block !important;
}

#ku-root .ku-onboarding-title {
  font-size: 24px !important;
  font-weight: 700 !important;
  color: #FFD700 !important;
  margin-bottom: 16px !important;
}

#ku-root .ku-onboarding-text {
  font-size: 16px !important;
  color: #cce0ff !important;
  line-height: 1.7 !important;
  margin-bottom: 30px !important;
}

#ku-root .ku-onboarding-dots {
  display: flex !important;
  gap: 8px !important;
  justify-content: center !important;
  margin-bottom: 24px !important;
}

#ku-root .ku-onboarding-dot {
  width: 10px !important;
  height: 10px !important;
  border-radius: 50% !important;
  background: rgba(255,255,255,0.3) !important;
  transition: background 0.2s !important;
}

#ku-root .ku-onboarding-dot.ku-active {
  background: #FFD700 !important;
}

#ku-root .ku-onboarding-btns {
  display: flex !important;
  gap: 12px !important;
  justify-content: center !important;
}

/* ══════════════════════════════════════════════════════════════
   SETTINGS PANEL
══════════════════════════════════════════════════════════════ */

#ku-root .ku-settings-panel {
  background: linear-gradient(160deg, #0e2a52, #0a1e3d, #071530) !important;
  border: 1px solid rgba(100,160,255,0.3) !important;
  border-radius: 16px !important;
  padding: 36px 40px !important;
  max-width: 780px !important;
  width: 90% !important;
  max-height: 85vh !important;
  overflow-y: auto !important;
  box-shadow: 0 0 60px rgba(0,0,0,0.8) !important;
}

#ku-root .ku-settings-title {
  font-size: 24px !important;
  font-weight: 700 !important;
  color: #FFD700 !important;
  text-align: center !important;
  margin-bottom: 28px !important;
}

#ku-root .ku-settings-grid {
  display: grid !important;
  grid-template-columns: 1fr 1fr !important;
  gap: 20px !important;
  margin-bottom: 28px !important;
}

#ku-root .ku-settings-row {
  background: rgba(255,255,255,0.05) !important;
  border: 1px solid rgba(100,160,255,0.2) !important;
  border-radius: 10px !important;
  padding: 16px !important;
}

#ku-root .ku-settings-label {
  font-size: 13px !important;
  color: #aac8ff !important;
  margin-bottom: 10px !important;
  display: flex !important;
  align-items: center !important;
  gap: 6px !important;
}

#ku-root .ku-settings-controls {
  display: flex !important;
  gap: 8px !important;
  flex-wrap: wrap !important;
}

#ku-root .ku-size-btn {
  width: 44px !important;
  height: 44px !important;
  border: 2px solid rgba(100,160,255,0.3) !important;
  border-radius: 8px !important;
  background: rgba(255,255,255,0.05) !important;
  color: #fff !important;
  cursor: pointer !important;
  font-weight: 700 !important;
  transition: all 0.2s !important;
}

#ku-root .ku-size-btn.ku-active {
  border-color: #FFD700 !important;
  background: rgba(255,215,0,0.15) !important;
  color: #FFD700 !important;
}

#ku-root .ku-size-btn:focus {
  outline: 2px solid #FFD700 !important;
}

#ku-root .ku-toggle-btn {
  padding: 10px 18px !important;
  border: 2px solid rgba(100,160,255,0.3) !important;
  border-radius: 8px !important;
  background: rgba(255,255,255,0.05) !important;
  color: #aac8ff !important;
  cursor: pointer !important;
  font-size: 13px !important;
  font-weight: 600 !important;
  transition: all 0.2s !important;
}

#ku-root .ku-toggle-btn.ku-on {
  border-color: #FFD700 !important;
  background: rgba(255,215,0,0.15) !important;
  color: #FFD700 !important;
}

#ku-root .ku-toggle-btn:focus {
  outline: 2px solid #FFD700 !important;
}

#ku-root .ku-select {
  width: 100% !important;
  padding: 10px 12px !important;
  border: 2px solid rgba(100,160,255,0.3) !important;
  border-radius: 8px !important;
  background: rgba(10,20,50,0.8) !important;
  color: #cce0ff !important;
  font-size: 14px !important;
  cursor: pointer !important;
  appearance: none !important;
}

#ku-root .ku-select:focus {
  outline: 2px solid #FFD700 !important;
  border-color: #FFD700 !important;
}

#ku-root .ku-settings-footer {
  display: flex !important;
  gap: 12px !important;
  justify-content: center !important;
}

/* ══════════════════════════════════════════════════════════════
   WCAG MODIFIERS
══════════════════════════════════════════════════════════════ */

/* Text size — ONLY popup body content */
#ku-root.ku-size-2 .ku-bio-text,
#ku-root.ku-size-2 .ku-welcome-text,
#ku-root.ku-size-2 .ku-onboarding-text {
  font-size: 20px !important;
}

#ku-root.ku-size-3 .ku-bio-text,
#ku-root.ku-size-3 .ku-welcome-text,
#ku-root.ku-size-3 .ku-onboarding-text {
  font-size: 24px !important;
}

/* High contrast */
#ku-root.ku-high-contrast {
  filter: contrast(1.5) brightness(1.1) !important;
}

/* Reduce motion */
#ku-root.ku-reduce-motion * {
  animation: none !important;
  transition: none !important;
}

/* Color filters */
#ku-root.ku-filter-grayscale {
  filter: grayscale(1) !important;
}

#ku-root.ku-filter-protanopia {
  filter: url('#ku-protanopia') !important;
}

#ku-root.ku-filter-deuteranopia {
  filter: url('#ku-deuteranopia') !important;
}

#ku-root.ku-filter-tritanopia {
  filter: url('#ku-tritanopia') !important;
}

/* ══════════════════════════════════════════════════════════════
   SEPARATOR
══════════════════════════════════════════════════════════════ */

#ku-root .ku-sep {
  width: 100% !important;
  height: 2px !important;
  background: rgba(100,160,255,0.2) !important;
  margin: 16px 0 !important;
}

/* ══════════════════════════════════════════════════════════════
   SCROLLBAR (inside popups)
══════════════════════════════════════════════════════════════ */

#ku-root .ku-bio-popup::-webkit-scrollbar,
#ku-root .ku-settings-panel::-webkit-scrollbar {
  width: 6px !important;
}

#ku-root .ku-bio-popup::-webkit-scrollbar-track,
#ku-root .ku-settings-panel::-webkit-scrollbar-track {
  background: rgba(255,255,255,0.05) !important;
}

#ku-root .ku-bio-popup::-webkit-scrollbar-thumb,
#ku-root .ku-settings-panel::-webkit-scrollbar-thumb {
  background: rgba(100,160,255,0.4) !important;
  border-radius: 3px !important;
}
`;
}

// ═══════════════════════════════════════════════════════════════════
// SVG COLOR FILTERS
// ═══════════════════════════════════════════════════════════════════

function injectSVGFilters(): void {
  if (document.getElementById("ku-svg-filters")) return;
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.id = "ku-svg-filters";
  svg.setAttribute("style", "position:absolute;width:0;height:0;overflow:hidden");
  svg.innerHTML = `
    <defs>
      <filter id="ku-protanopia">
        <feColorMatrix type="matrix" values="0.567,0.433,0,0,0 0.558,0.442,0,0,0 0,0.242,0.758,0,0 0,0,0,1,0"/>
      </filter>
      <filter id="ku-deuteranopia">
        <feColorMatrix type="matrix" values="0.625,0.375,0,0,0 0.7,0.3,0,0,0 0,0.3,0.7,0,0 0,0,0,1,0"/>
      </filter>
      <filter id="ku-tritanopia">
        <feColorMatrix type="matrix" values="0.95,0.05,0,0,0 0,0.433,0.567,0,0 0,0.475,0.525,0,0 0,0,0,1,0"/>
      </filter>
    </defs>
  `;
  document.body.appendChild(svg);
}

// ═══════════════════════════════════════════════════════════════════
// CANVAS ENGINE
// ═══════════════════════════════════════════════════════════════════

class CanvasEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private planets: Planet[] = [];
  private modelType: "geocentric" | "heliocentric" | "kepler" = "heliocentric";
  private animFrame: number = 0;
  private zoom: number = 1;
  private panX: number = 0;
  private panY: number = 0;
  private isDragging: boolean = false;
  private lastMouseX: number = 0;
  private lastMouseY: number = 0;
  private orbitsVisible: boolean = true;
  private reduceMotion: boolean = false;
  private planetImages: { [key: string]: HTMLImageElement } = {};
  private sunImage: HTMLImageElement | null = null;
  private bgImage: HTMLImageElement | null = null;
  private hoveredPlanet: Planet | null = null;
  private hoverX: number = 0;
  private hoverY: number = 0;
  private onHover: ((planet: Planet | null, x: number, y: number) => void) | null = null;

  // Bound event handlers for proper removal
  private _onWheel: (e: WheelEvent) => void;
  private _onMouseDown: (e: MouseEvent) => void;
  private _onMouseMove: (e: MouseEvent) => void;
  private _onMouseUp: () => void;
  private _onMouseLeave: () => void;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    this._onWheel = this.onWheel.bind(this);
    this._onMouseDown = this.onMouseDown.bind(this);
    this._onMouseMove = this.onMouseMove.bind(this);
    this._onMouseUp = this.onMouseUp.bind(this);
    this._onMouseLeave = this.onMouseLeave.bind(this);
    this.loadImages();
    this.bindEvents();
  }

  private loadImages(): void {
    // Load background
    const bg = new Image();
    bg.src = path("images/bg_all.png");
    bg.onload = () => { this.bgImage = bg; };

    // Load planet images
    const planetFiles: { [key: string]: string } = {
      "Słońce":   "images/planet_01.png",
      "Ziemia":   "images/planet_02.png",
    };
    Object.keys(planetFiles).forEach(name => {
      const img = new Image();
      img.src = path(planetFiles[name]);
      img.onload = () => { this.planetImages[name] = img; };
    });
  }

  private bindEvents(): void {
    this.canvas.addEventListener("wheel", this._onWheel, { passive: false });
    this.canvas.addEventListener("mousedown", this._onMouseDown);
    this.canvas.addEventListener("mousemove", this._onMouseMove);
    this.canvas.addEventListener("mouseup", this._onMouseUp);
    this.canvas.addEventListener("mouseleave", this._onMouseLeave);
  }

  private onWheel(e: WheelEvent): void {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    this.zoom = Math.max(0.3, Math.min(4, this.zoom * delta));
  }

  private onMouseDown(e: MouseEvent): void {
    this.isDragging = true;
    this.lastMouseX = e.clientX;
    this.lastMouseY = e.clientY;
    this.canvas.style.cursor = "grabbing";
  }

  private onMouseMove(e: MouseEvent): void {
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;
    const mx = (e.clientX - rect.left) * scaleX;
    const my = (e.clientY - rect.top) * scaleY;

    if (this.isDragging) {
      const dx = (e.clientX - this.lastMouseX) * scaleX;
      const dy = (e.clientY - this.lastMouseY) * scaleY;
      this.panX += dx;
      this.panY += dy;
      this.lastMouseX = e.clientX;
      this.lastMouseY = e.clientY;
    }

    // Hit test for tooltip
    this.hoveredPlanet = this.hitTest(mx, my);
    this.hoverX = e.clientX - rect.left;
    this.hoverY = e.clientY - rect.top;
    if (this.onHover) this.onHover(this.hoveredPlanet, this.hoverX, this.hoverY);
  }

  private onMouseUp(): void {
    this.isDragging = false;
    this.canvas.style.cursor = "grab";
  }

  private onMouseLeave(): void {
    this.isDragging = false;
    this.canvas.style.cursor = "grab";
    this.hoveredPlanet = null;
    if (this.onHover) this.onHover(null, 0, 0);
  }

  private hitTest(mx: number, my: number): Planet | null {
    const cx = this.canvas.width / 2 + this.panX;
    const cy = this.canvas.height / 2 + this.panY;
    for (let i = this.planets.length - 1; i >= 0; i--) {
      const p = this.planets[i];
      const px = cx + Math.cos(p.angle) * p.orbitRadius * this.zoom;
      const py = cy + Math.sin(p.angle) * p.orbitRadius * this.zoom;
      const r = p.radius * this.zoom;
      const dist = Math.sqrt((mx - px) * (mx - px) + (my - py) * (my - py));
      if (dist < r + 8) return p;
    }
    return null;
  }

  setModel(planets: Planet[], modelType: "geocentric" | "heliocentric" | "kepler"): void {
    this.planets = planets.map(p => ({ ...p }));
    this.modelType = modelType;
    this.zoom = 1;
    this.panX = 0;
    this.panY = 0;
  }

  setOrbitsVisible(v: boolean): void { this.orbitsVisible = v; }
  setReduceMotion(v: boolean): void { this.reduceMotion = v; }
  setOnHover(fn: (planet: Planet | null, x: number, y: number) => void): void { this.onHover = fn; }

  zoomIn(): void { this.zoom = Math.min(4, this.zoom * 1.2); }
  zoomOut(): void { this.zoom = Math.max(0.3, this.zoom / 1.2); }
  resetView(): void { this.zoom = 1; this.panX = 0; this.panY = 0; }

  start(): void {
    this.stop();
    const tick = () => {
      this.update();
      this.draw();
      this.animFrame = requestAnimationFrame(tick);
    };
    this.animFrame = requestAnimationFrame(tick);
  }

  stop(): void {
    if (this.animFrame) {
      cancelAnimationFrame(this.animFrame);
      this.animFrame = 0;
    }
  }

  private update(): void {
    if (this.reduceMotion) return;
    this.planets.forEach(p => {
      if (this.modelType === "kepler" && p.eccentricity) {
        // Kepler's second law approximation: faster near perihelion
        const e = p.eccentricity;
        const r = p.orbitRadius * (1 - e * Math.cos(p.angle));
        const speedFactor = (p.orbitRadius / r) * (p.orbitRadius / r);
        p.angle += p.orbitSpeed * speedFactor;
      } else {
        p.angle += p.orbitSpeed;
      }
    });
  }

  private draw(): void {
    const w = this.canvas.width;
    const h = this.canvas.height;
    const cx = w / 2 + this.panX;
    const cy = h / 2 + this.panY;

    this.ctx.clearRect(0, 0, w, h);

    // Background
    if (this.bgImage) {
      this.ctx.drawImage(this.bgImage, 0, 0, w, h);
    } else {
      this.ctx.fillStyle = "#050a1a";
      this.ctx.fillRect(0, 0, w, h);
      this.drawStars(w, h);
    }

    // Orbits
    if (this.orbitsVisible) {
      this.planets.forEach(p => {
        this.ctx.beginPath();
        if (this.modelType === "kepler" && p.eccentricity) {
          const a = p.orbitRadius * this.zoom;
          const e = p.eccentricity;
          const b = a * Math.sqrt(1 - e * e);
          const focusOffset = a * e;
          this.ctx.ellipse(cx - focusOffset, cy, a, b, 0, 0, Math.PI * 2);
        } else {
          this.ctx.arc(cx, cy, p.orbitRadius * this.zoom, 0, Math.PI * 2);
        }
        this.ctx.strokeStyle = "rgba(150,180,255,0.25)";
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
      });
    }

    // Center body
    if (this.modelType === "geocentric") {
      this.drawPlanet(cx, cy, 28 * this.zoom, "#4A90D9", "Ziemia", true);
    } else {
      this.drawSun(cx, cy, 36 * this.zoom);
    }

    // Planets
    this.planets.forEach(p => {
      let px: number, py: number;
      if (this.modelType === "kepler" && p.eccentricity) {
        const a = p.orbitRadius * this.zoom;
        const e = p.eccentricity;
        const focusOffset = a * e;
        px = cx - focusOffset + Math.cos(p.angle) * a;
        py = cy + Math.sin(p.angle) * a * Math.sqrt(1 - e * e);
      } else {
        px = cx + Math.cos(p.angle) * p.orbitRadius * this.zoom;
        py = cy + Math.sin(p.angle) * p.orbitRadius * this.zoom;
      }
      const r = p.radius * this.zoom;
      const isHovered = this.hoveredPlanet === p;
      this.drawPlanet(px, py, r, p.color, p.name, isHovered);
    });
  }

  private drawStars(w: number, h: number): void {
    // Simple static stars
    this.ctx.fillStyle = "rgba(255,255,255,0.8)";
    for (let i = 0; i < 200; i++) {
      const x = (i * 137.5) % w;
      const y = (i * 89.3) % h;
      const r = (i % 3 === 0) ? 1.5 : 0.8;
      this.ctx.beginPath();
      this.ctx.arc(x, y, r, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  private drawSun(x: number, y: number, r: number): void {
    // Glow
    const grd = this.ctx.createRadialGradient(x, y, r * 0.3, x, y, r * 2.5);
    grd.addColorStop(0, "rgba(255,200,50,0.6)");
    grd.addColorStop(1, "rgba(255,100,0,0)");
    this.ctx.fillStyle = grd;
    this.ctx.beginPath();
    this.ctx.arc(x, y, r * 2.5, 0, Math.PI * 2);
    this.ctx.fill();

    // Core
    const core = this.ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, r * 0.1, x, y, r);
    core.addColorStop(0, "#fff7a0");
    core.addColorStop(0.4, "#FFD700");
    core.addColorStop(0.8, "#FF8C00");
    core.addColorStop(1, "#FF4500");
    this.ctx.fillStyle = core;
    this.ctx.beginPath();
    this.ctx.arc(x, y, r, 0, Math.PI * 2);
    this.ctx.fill();

    // Label
    this.ctx.fillStyle = "#fff";
    this.ctx.font = `bold ${Math.max(10, 13 * this.zoom)}px Arial`;
    this.ctx.textAlign = "center";
    this.ctx.fillText("Słońce", x, y + r + 14 * this.zoom);
  }

  private drawPlanet(x: number, y: number, r: number, color: string, name: string, highlight: boolean): void {
    // Glow on hover
    if (highlight) {
      this.ctx.shadowColor = "#FFD700";
      this.ctx.shadowBlur = 20;
    }

    const grd = this.ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, r * 0.1, x, y, r);
    grd.addColorStop(0, lighten(color, 60));
    grd.addColorStop(0.6, color);
    grd.addColorStop(1, darken(color, 40));
    this.ctx.fillStyle = grd;
    this.ctx.beginPath();
    this.ctx.arc(x, y, r, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.shadowBlur = 0;
    this.ctx.shadowColor = "transparent";

    // Label
    this.ctx.fillStyle = highlight ? "#FFD700" : "rgba(255,255,255,0.85)";
    this.ctx.font = `${Math.max(9, 11 * this.zoom)}px Arial`;
    this.ctx.textAlign = "center";
    this.ctx.fillText(name, x, y + r + 12 * this.zoom);
  }

  destroy(): void {
    this.stop();
    this.canvas.removeEventListener("wheel", this._onWheel);
    this.canvas.removeEventListener("mousedown", this._onMouseDown);
    this.canvas.removeEventListener("mousemove", this._onMouseMove);
    this.canvas.removeEventListener("mouseup", this._onMouseUp);
    this.canvas.removeEventListener("mouseleave", this._onMouseLeave);
  }
}

// ═══════════════════════════════════════════════════════════════════
// COLOR HELPERS
// ═══════════════════════════════════════════════════════════════════

function lighten(hex: string, amount: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, (num >> 16) + amount);
  const g = Math.min(255, ((num >> 8) & 0xff) + amount);
  const b = Math.min(255, (num & 0xff) + amount);
  return `rgb(${r},${g},${b})`;
}

function darken(hex: string, amount: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.max(0, (num >> 16) - amount);
  const g = Math.max(0, ((num >> 8) & 0xff) - amount);
  const b = Math.max(0, (num & 0xff) - amount);
  return `rgb(${r},${g},${b})`;
}

// ═══════════════════════════════════════════════════════════════════
// WEB AUDIO
// ═══════════════════════════════════════════════════════════════════

let audioCtx: AudioContext | null = null;

function getAudioCtx(): AudioContext | null {
  if (!audioCtx) {
    try {
      audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (e) { return null; }
  }
  return audioCtx;
}

function playClick(): void {
  const ctx = getAudioCtx();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.frequency.value = 800;
  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.1);
}

// ═══════════════════════════════════════════════════════════════════
// APP CLASS
// ═══════════════════════════════════════════════════════════════════

export class App {
  private container: HTMLElement;
  private root: HTMLElement | null = null;
  private engine: CanvasEngine | null = null;
  private state: AppState;
  private resizeObserver: ResizeObserver | null = null;
  private isMuted: boolean = false;

  // DOM refs
  private overlay: HTMLElement | null = null;
  private onboardingOverlay: HTMLElement | null = null;
  private tooltip: HTMLElement | null = null;
  private modelTitleEl: HTMLElement | null = null;
  private portraitBtns: HTMLButtonElement[] = [];

  constructor(container: HTMLElement) {
    this.container = container;
    this.state = {
      screen: "welcome",
      selectedAstronomer: 1,
      modelAstronomer: 1,
      wcag: {
        textSize: 1,
        highContrast: false,
        reduceMotion: false,
        orbitsVisible: true,
        colorFilter: "none",
        voiceover: false,
        audiodesc: false,
        cursorSize: "normal",
        cursorColor: "default",
      },
      onboardingDone: false,
      onboardingStep: 0,
    };
  }

  mount(): void {
    injectCSS();
    injectSVGFilters();
    this.buildDOM();
    this.scaleRoot();
    this.setupResizeObserver();
    this.showScreen("welcome");
  }

  unmount(): void {
    this.engine?.destroy();
    this.resizeObserver?.disconnect();
    if (this.root) {
      this.root.remove();
      this.root = null;
    }
    const filters = document.getElementById("ku-svg-filters");
    if (filters) filters.remove();
    const styles = document.getElementById("ku-styles");
    if (styles) styles.remove();
  }

  restoreState(data: Partial<AppState>): void {
    if (!data) return;
    if (data.wcag) this.state.wcag = { ...this.state.wcag, ...data.wcag };
    if (data.onboardingDone !== undefined) this.state.onboardingDone = data.onboardingDone;
    if (data.selectedAstronomer !== undefined) this.state.selectedAstronomer = data.selectedAstronomer;
    this.applyWcag();
  }

  getState(): AppState {
    return { ...this.state };
  }

  saveState(): void {
    setState(this.getState() as any).catch(() => {});
  }

  freeze(): void {
    if (this.root) this.root.style.pointerEvents = "none";
  }

  resume(): void {
    if (this.root) this.root.style.pointerEvents = "";
  }

  removeListeners(): void {
    this.engine?.stop();
  }

  // ─── DOM BUILD ────────────────────────────────────────────────

  private buildDOM(): void {
    this.root = document.createElement("div");
    this.root.id = "ku-root";

    // Topbar
    const topbar = this.buildTopbar();
    this.root.appendChild(topbar);

    // Content
    const content = document.createElement("div");
    content.className = "ku-content";

    // Welcome screen
    content.appendChild(this.buildWelcomeScreen());

    // Game screen
    content.appendChild(this.buildGameScreen());

    // Model screen
    content.appendChild(this.buildModelScreen());

    this.root.appendChild(content);

    // Overlay (for popups)
    this.overlay = document.createElement("div");
    this.overlay.className = "ku-overlay";
    this.root.appendChild(this.overlay);

    // Onboarding overlay
    this.onboardingOverlay = document.createElement("div");
    this.onboardingOverlay.className = "ku-onboarding-overlay";
    this.root.appendChild(this.onboardingOverlay);

    // Tooltip
    this.tooltip = document.createElement("div");
    this.tooltip.className = "ku-tooltip";
    this.tooltip.innerHTML = '<div class="ku-tooltip-name"></div><div class="ku-tooltip-type"></div>';
    this.root.appendChild(this.tooltip);

    this.container.appendChild(this.root);
  }

  private buildTopbar(): HTMLElement {
    const bar = document.createElement("div");
    bar.className = "ku-topbar";
    bar.style.setProperty("background-image", `url(${path("images/top_bar.png")})`);

    const title = document.createElement("div");
    title.className = "ku-topbar-title";
    title.textContent = "KOSMICZNE UKŁADY";

    const btns = document.createElement("div");
    btns.className = "ku-topbar-btns";

    const soundBtn = this.makeTopBtn("🔊", "Wycisz dźwięk", () => {
      this.isMuted = !this.isMuted;
      soundBtn.textContent = this.isMuted ? "🔇" : "🔊";
      soundBtn.setAttribute("aria-label", this.isMuted ? "Włącz dźwięk" : "Wycisz dźwięk");
    });

    const helpBtn = this.makeTopBtn("❓", "Instrukcja", () => {
      playClick();
      this.showOnboarding(0);
    });

    const settingsBtn = this.makeTopBtn("⚙️", "Ustawienia", () => {
      playClick();
      this.showSettings();
    });

    btns.appendChild(soundBtn);
    btns.appendChild(helpBtn);
    btns.appendChild(settingsBtn);
    bar.appendChild(title);
    bar.appendChild(btns);
    return bar;
  }

  private makeTopBtn(icon: string, label: string, onClick: () => void): HTMLButtonElement {
    const btn = document.createElement("button");
    btn.className = "ku-topbar-btn";
    btn.textContent = icon;
    btn.setAttribute("aria-label", label);
    btn.setAttribute("title", label);
    btn.addEventListener("click", onClick);
    return btn;
  }

  private buildWelcomeScreen(): HTMLElement {
    const screen = document.createElement("div");
    screen.className = "ku-screen ku-welcome";
    screen.setAttribute("data-screen", "welcome");

    // Background
    const bg = document.createElement("div");
    bg.className = "ku-bg";
    bg.style.setProperty("background-image", `url(${path("images/bg_all.png")})`);
    screen.appendChild(bg);

    // Popup
    const popup = document.createElement("div");
    popup.className = "ku-welcome-popup";

    const title = document.createElement("div");
    title.className = "ku-welcome-title";
    title.textContent = "Witaj w grze";

    const text = document.createElement("div");
    text.className = "ku-welcome-text";
    text.innerHTML = `Poznaj historię modeli układu słonecznego! Odkryj jak wielcy astronomowie — <b>Ptolemeusz</b>, <b>Kopernik</b> i <b>Kepler</b> — wyobrażali sobie ruch planet.<br><br>Kliknij na portret astronoma, aby poznać jego model i biografię.`;

    const btns = document.createElement("div");
    btns.className = "ku-welcome-btns";

    const settingsBtn = document.createElement("button");
    settingsBtn.className = "ku-btn ku-btn-secondary";
    settingsBtn.textContent = "USTAWIENIA";
    settingsBtn.addEventListener("click", () => { playClick(); this.showSettings(); });

    const startBtn = document.createElement("button");
    startBtn.className = "ku-btn ku-btn-primary";
    startBtn.textContent = "ROZPOCZNIJ";
    startBtn.addEventListener("click", () => {
      playClick();
      this.showScreen("game");
      if (!this.state.onboardingDone) {
        setTimeout(() => this.showOnboarding(0), 300);
      }
    });

    btns.appendChild(settingsBtn);
    btns.appendChild(startBtn);
    popup.appendChild(title);
    popup.appendChild(text);
    popup.appendChild(btns);
    screen.appendChild(popup);
    return screen;
  }

  private buildGameScreen(): HTMLElement {
    const screen = document.createElement("div");
    screen.className = "ku-screen ku-game";
    screen.setAttribute("data-screen", "game");

    // Background
    const bg = document.createElement("div");
    bg.className = "ku-bg";
    bg.style.setProperty("background-image", `url(${path("images/bg_all.png")})`);
    screen.appendChild(bg);

    // Model title
    const modelTitle = document.createElement("div");
    modelTitle.className = "ku-model-title";
    modelTitle.textContent = ASTRONOMERS[this.state.selectedAstronomer - 1].modelTitle;
    this.modelTitleEl = modelTitle;
    screen.appendChild(modelTitle);

    // Portraits panel
    const panel = document.createElement("div");
    panel.className = "ku-portraits-panel";
    this.portraitBtns = [];

    ASTRONOMERS.forEach((a, i) => {
      const wrap = document.createElement("div");

      const btn = document.createElement("button");
      btn.className = "ku-portrait-btn" + (i === this.state.selectedAstronomer - 1 ? " ku-active-portrait" : "");
      btn.setAttribute("aria-label", `Biografia: ${a.name}`);
      btn.setAttribute("title", a.name);

      const img = document.createElement("img");
      img.src = path(a.portrait);
      img.alt = a.name;
      img.addEventListener("mouseover", () => { img.src = path(a.portraitOver); });
      img.addEventListener("mouseout", () => { img.src = path(a.portrait); });

      btn.appendChild(img);
      btn.addEventListener("click", () => {
        playClick();
        this.selectAstronomer(i + 1);
        this.showBiography(i);
      });

      const name = document.createElement("div");
      name.className = "ku-portrait-name";
      name.textContent = a.name;

      wrap.appendChild(btn);
      wrap.appendChild(name);
      panel.appendChild(wrap);
      this.portraitBtns.push(btn);
    });

    screen.appendChild(panel);

    // Canvas area
    const canvasArea = document.createElement("div");
    canvasArea.className = "ku-canvas-area";

    const canvas = document.createElement("canvas") as HTMLCanvasElement;
    canvas.className = "ku-solar-canvas";
    const cw = GAME_W - 180;
    const ch = GAME_H - TOPBAR_H;
    canvas.width = cw;
    canvas.height = ch;
    canvas.style.width = cw + "px";
    canvas.style.height = ch + "px";
    canvasArea.appendChild(canvas);
    screen.appendChild(canvasArea);

    // Zoom controls
    const zoomCtrl = document.createElement("div");
    zoomCtrl.className = "ku-zoom-controls";

    const zoomIn = document.createElement("button");
    zoomIn.className = "ku-zoom-btn";
    zoomIn.textContent = "+";
    zoomIn.setAttribute("aria-label", "Przybliż");
    zoomIn.addEventListener("click", () => { playClick(); this.engine?.zoomIn(); });

    const zoomOut = document.createElement("button");
    zoomOut.className = "ku-zoom-btn";
    zoomOut.textContent = "−";
    zoomOut.setAttribute("aria-label", "Oddal");
    zoomOut.addEventListener("click", () => { playClick(); this.engine?.zoomOut(); });

    const zoomReset = document.createElement("button");
    zoomReset.className = "ku-zoom-btn";
    zoomReset.textContent = "⊡";
    zoomReset.setAttribute("aria-label", "Reset widoku");
    zoomReset.addEventListener("click", () => { playClick(); this.engine?.resetView(); });

    zoomCtrl.appendChild(zoomIn);
    zoomCtrl.appendChild(zoomOut);
    zoomCtrl.appendChild(zoomReset);
    screen.appendChild(zoomCtrl);

    // Init canvas engine
    this.engine = new CanvasEngine(canvas);
    const astro = ASTRONOMERS[this.state.selectedAstronomer - 1];
    this.engine.setModel(astro.planets, astro.modelType);
    this.engine.setOrbitsVisible(this.state.wcag.orbitsVisible);
    this.engine.setReduceMotion(this.state.wcag.reduceMotion);
    this.engine.setOnHover((planet, x, y) => this.updateTooltip(planet, x, y));

    return screen;
  }

  private buildModelScreen(): HTMLElement {
    const screen = document.createElement("div");
    screen.className = "ku-screen ku-model";
    screen.setAttribute("data-screen", "model");

    const bg = document.createElement("div");
    bg.className = "ku-bg";
    bg.style.setProperty("background-image", `url(${path("images/bg_all.png")})`);
    screen.appendChild(bg);

    const container = document.createElement("div");
    container.className = "ku-model-container";

    const header = document.createElement("div");
    header.className = "ku-model-header";
    const heading = document.createElement("div");
    heading.className = "ku-model-heading";
    heading.setAttribute("data-model-heading", "true");
    header.appendChild(heading);
    container.appendChild(header);

    const canvasWrap = document.createElement("div");
    canvasWrap.className = "ku-model-canvas-wrap";
    const modelCanvas = document.createElement("canvas") as HTMLCanvasElement;
    modelCanvas.className = "ku-model-canvas";
    modelCanvas.width = 1400;
    modelCanvas.height = 800;
    modelCanvas.style.width = "1400px";
    modelCanvas.style.height = "800px";
    canvasWrap.appendChild(modelCanvas);
    container.appendChild(canvasWrap);

    const footer = document.createElement("div");
    footer.className = "ku-model-footer";
    const backBtn = document.createElement("button");
    backBtn.className = "ku-btn ku-btn-primary";
    backBtn.textContent = "← Powrót";
    backBtn.addEventListener("click", () => { playClick(); this.showScreen("game"); });
    footer.appendChild(backBtn);
    container.appendChild(footer);

    screen.appendChild(container);
    return screen;
  }

  // ─── SCREEN MANAGEMENT ────────────────────────────────────────

  private showScreen(name: "welcome" | "game" | "model"): void {
    this.state.screen = name;
    const screens = this.root?.querySelectorAll(".ku-screen");
    screens?.forEach(s => s.classList.remove("ku-active"));
    const target = this.root?.querySelector(`[data-screen="${name}"]`);
    target?.classList.add("ku-active");

    if (name === "game") {
      this.engine?.start();
    } else {
      this.engine?.stop();
    }
    this.saveState();
  }

  private selectAstronomer(idx: number): void {
    this.state.selectedAstronomer = idx;
    this.portraitBtns.forEach((btn, i) => {
      btn.classList.toggle("ku-active-portrait", i === idx - 1);
    });
    const astro = ASTRONOMERS[idx - 1];
    if (this.modelTitleEl) this.modelTitleEl.textContent = astro.modelTitle;
    this.engine?.setModel(astro.planets, astro.modelType);
    this.engine?.setOrbitsVisible(this.state.wcag.orbitsVisible);
    this.engine?.setReduceMotion(this.state.wcag.reduceMotion);
    this.saveState();
  }

  // ─── BIOGRAPHY POPUP ──────────────────────────────────────────

  private showBiography(idx: number): void {
    const a = ASTRONOMERS[idx];
    if (!this.overlay) return;

    const popup = document.createElement("div");
    popup.className = "ku-bio-popup";
    popup.setAttribute("role", "dialog");
    popup.setAttribute("aria-modal", "true");
    popup.setAttribute("aria-label", `Biografia: ${a.name}`);

    const closeBtn = document.createElement("button");
    closeBtn.className = "ku-bio-close";
    closeBtn.textContent = "✕";
    closeBtn.setAttribute("aria-label", "Zamknij");
    closeBtn.addEventListener("click", () => { playClick(); this.closeOverlay(); });
    popup.appendChild(closeBtn);

    const header = document.createElement("div");
    header.className = "ku-bio-header";

    const portrait = document.createElement("img");
    portrait.className = "ku-bio-portrait";
    portrait.src = path(a.portrait);
    portrait.alt = a.name;
    header.appendChild(portrait);

    const info = document.createElement("div");
    info.className = "ku-bio-info";

    const nameEl = document.createElement("div");
    nameEl.className = "ku-bio-name";
    nameEl.textContent = a.name;

    const years = document.createElement("div");
    years.className = "ku-bio-years";
    years.textContent = a.years;

    const bioText = document.createElement("div");
    bioText.className = "ku-bio-text";
    bioText.innerHTML = a.bio;

    info.appendChild(nameEl);
    info.appendChild(years);
    info.appendChild(bioText);
    header.appendChild(info);
    popup.appendChild(header);

    const btns = document.createElement("div");
    btns.className = "ku-bio-btns";

    const modelBtn = document.createElement("button");
    modelBtn.className = "ku-btn ku-btn-primary";
    modelBtn.textContent = a.modelTitle;
    modelBtn.addEventListener("click", () => {
      playClick();
      this.closeOverlay();
      this.showModelScreen(idx);
    });

    const closeBtn2 = document.createElement("button");
    closeBtn2.className = "ku-btn ku-btn-secondary";
    closeBtn2.textContent = "Zamknij";
    closeBtn2.addEventListener("click", () => { playClick(); this.closeOverlay(); });

    btns.appendChild(modelBtn);
    btns.appendChild(closeBtn2);
    popup.appendChild(btns);

    this.overlay.innerHTML = "";
    this.overlay.appendChild(popup);
    this.overlay.classList.add("ku-visible");
    setTimeout(() => closeBtn.focus(), 50);
  }

  private closeOverlay(): void {
    if (this.overlay) {
      this.overlay.classList.remove("ku-visible");
      this.overlay.innerHTML = "";
    }
  }

  // ─── MODEL SCREEN ─────────────────────────────────────────────

  private showModelScreen(idx: number): void {
    const a = ASTRONOMERS[idx];
    this.state.modelAstronomer = idx + 1;

    // Update heading
    const heading = this.root?.querySelector("[data-model-heading]") as HTMLElement;
    if (heading) heading.textContent = a.modelTitle;

    // Draw static model on canvas
    const modelCanvas = this.root?.querySelector(".ku-model-canvas") as HTMLCanvasElement;
    if (modelCanvas) {
      this.drawStaticModel(modelCanvas, a);
    }

    this.showScreen("model");
  }

  private drawStaticModel(canvas: HTMLCanvasElement, a: AstronomerModel): void {
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;

    // Background
    ctx.fillStyle = "#050a1a";
    ctx.fillRect(0, 0, w, h);

    // Stars
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    for (let i = 0; i < 150; i++) {
      const x = (i * 137.5) % w;
      const y = (i * 89.3) % h;
      ctx.beginPath();
      ctx.arc(x, y, (i % 3 === 0) ? 1.5 : 0.8, 0, Math.PI * 2);
      ctx.fill();
    }

    // Orbits
    a.planets.forEach(p => {
      ctx.beginPath();
      if (a.modelType === "kepler" && p.eccentricity) {
        const e = p.eccentricity;
        const orb = p.orbitRadius * 1.3;
        const b = orb * Math.sqrt(1 - e * e);
        const focusOffset = orb * e;
        ctx.ellipse(cx - focusOffset, cy, orb, b, 0, 0, Math.PI * 2);
      } else {
        ctx.arc(cx, cy, p.orbitRadius * 1.3, 0, Math.PI * 2);
      }
      ctx.strokeStyle = "rgba(150,180,255,0.3)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    // Center body
    if (a.modelType === "geocentric") {
      const grd = ctx.createRadialGradient(cx - 8, cy - 8, 3, cx, cy, 28);
      grd.addColorStop(0, "#a0d0ff");
      grd.addColorStop(0.5, "#4A90D9");
      grd.addColorStop(1, "#1a3a6a");
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(cx, cy, 28, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.font = "bold 14px Arial";
      ctx.textAlign = "center";
      ctx.fillText("Ziemia", cx, cy + 42);
      ctx.fillStyle = "rgba(255,255,255,0.4)";
      ctx.font = "11px Arial";
      ctx.fillText("(centrum)", cx, cy + 56);
    } else {
      // Sun
      const grd = ctx.createRadialGradient(cx - 10, cy - 10, 4, cx, cy, 36);
      grd.addColorStop(0, "#fff7a0");
      grd.addColorStop(0.4, "#FFD700");
      grd.addColorStop(0.8, "#FF8C00");
      grd.addColorStop(1, "#FF4500");
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(cx, cy, 36, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.font = "bold 14px Arial";
      ctx.textAlign = "center";
      ctx.fillText("Słońce", cx, cy + 50);
    }

    // Planets at fixed positions
    a.planets.forEach((p, i) => {
      const angle = (i / a.planets.length) * Math.PI * 2;
      let px: number, py: number;
      if (a.modelType === "kepler" && p.eccentricity) {
        const orb = p.orbitRadius * 1.3;
        const e = p.eccentricity;
        const focusOffset = orb * e;
        px = cx - focusOffset + Math.cos(angle) * orb;
        py = cy + Math.sin(angle) * orb * Math.sqrt(1 - e * e);
      } else {
        px = cx + Math.cos(angle) * p.orbitRadius * 1.3;
        py = cy + Math.sin(angle) * p.orbitRadius * 1.3;
      }

      // Line from center to planet
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(px, py);
      ctx.strokeStyle = "rgba(255,255,255,0.1)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Planet
      const grd2 = ctx.createRadialGradient(px - p.radius * 0.3, py - p.radius * 0.3, 1, px, py, p.radius * 1.3);
      grd2.addColorStop(0, lighten(p.color, 60));
      grd2.addColorStop(0.6, p.color);
      grd2.addColorStop(1, darken(p.color, 40));
      ctx.fillStyle = grd2;
      ctx.beginPath();
      ctx.arc(px, py, p.radius * 1.3, 0, Math.PI * 2);
      ctx.fill();

      // Label
      ctx.fillStyle = "#fff";
      ctx.font = "12px Arial";
      ctx.textAlign = "center";
      ctx.fillText(p.name, px, py + p.radius * 1.3 + 14);
    });

    // Ellipse annotation for Kepler
    if (a.modelType === "kepler") {
      ctx.fillStyle = "rgba(255,215,0,0.7)";
      ctx.font = "italic 14px Arial";
      ctx.textAlign = "left";
      ctx.fillText("Orbity eliptyczne (prawa Keplera)", 20, h - 20);
    }
  }

  // ─── TOOLTIP ──────────────────────────────────────────────────

  private updateTooltip(planet: Planet | null, x: number, y: number): void {
    if (!this.tooltip) return;
    if (!planet) {
      this.tooltip.classList.remove("ku-visible");
      return;
    }
    const nameEl = this.tooltip.querySelector(".ku-tooltip-name") as HTMLElement;
    const typeEl = this.tooltip.querySelector(".ku-tooltip-type") as HTMLElement;
    nameEl.textContent = planet.name;
    typeEl.textContent = planet.type;

    // Position tooltip relative to root
    const rootRect = this.root!.getBoundingClientRect();
    const scale = GAME_W / rootRect.width;
    const tx = x + 15;
    const ty = y + TOPBAR_H / scale - 10;
    this.tooltip.style.left = tx + "px";
    this.tooltip.style.top = ty + "px";
    this.tooltip.classList.add("ku-visible");
  }

  // ─── ONBOARDING ───────────────────────────────────────────────

  private showOnboarding(step: number): void {
    if (!this.onboardingOverlay) return;
    this.state.onboardingStep = step;
    const s = ONBOARDING_STEPS[step];

    const card = document.createElement("div");
    card.className = "ku-onboarding-card";

    const icon = document.createElement("span");
    icon.className = "ku-onboarding-icon";
    icon.textContent = s.icon;

    const title = document.createElement("div");
    title.className = "ku-onboarding-title";
    title.textContent = s.title;

    const text = document.createElement("div");
    text.className = "ku-onboarding-text";
    text.innerHTML = s.text;

    const dots = document.createElement("div");
    dots.className = "ku-onboarding-dots";
    ONBOARDING_STEPS.forEach((_, i) => {
      const dot = document.createElement("div");
      dot.className = "ku-onboarding-dot" + (i === step ? " ku-active" : "");
      dots.appendChild(dot);
    });

    const btns = document.createElement("div");
    btns.className = "ku-onboarding-btns";

    if (step > 0) {
      const back = document.createElement("button");
      back.className = "ku-btn ku-btn-secondary";
      back.textContent = "COFNIJ";
      back.addEventListener("click", () => { playClick(); this.showOnboarding(step - 1); });
      btns.appendChild(back);
    } else {
      const skip = document.createElement("button");
      skip.className = "ku-btn ku-btn-secondary";
      skip.textContent = "POMIŃ";
      skip.addEventListener("click", () => { playClick(); this.closeOnboarding(); });
      btns.appendChild(skip);
    }

    if (step < ONBOARDING_STEPS.length - 1) {
      const next = document.createElement("button");
      next.className = "ku-btn ku-btn-primary";
      next.textContent = "DALEJ";
      next.addEventListener("click", () => { playClick(); this.showOnboarding(step + 1); });
      btns.appendChild(next);
    } else {
      const close = document.createElement("button");
      close.className = "ku-btn ku-btn-gold";
      close.textContent = "ZAMKNIJ";
      close.addEventListener("click", () => { playClick(); this.closeOnboarding(); });
      btns.appendChild(close);
    }

    card.appendChild(icon);
    card.appendChild(title);
    card.appendChild(text);
    card.appendChild(dots);
    card.appendChild(btns);

    this.onboardingOverlay.innerHTML = "";
    this.onboardingOverlay.appendChild(card);
    this.onboardingOverlay.classList.add("ku-visible");
  }

  private closeOnboarding(): void {
    this.state.onboardingDone = true;
    if (this.onboardingOverlay) {
      this.onboardingOverlay.classList.remove("ku-visible");
      this.onboardingOverlay.innerHTML = "";
    }
    this.saveState();
  }

  // ─── SETTINGS ─────────────────────────────────────────────────

  private showSettings(): void {
    if (!this.overlay) return;
    const w = this.state.wcag;

    const panel = document.createElement("div");
    panel.className = "ku-settings-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "true");
    panel.setAttribute("aria-label", "Ustawienia dostępności");

    const title = document.createElement("div");
    title.className = "ku-settings-title";
    title.textContent = "Ustawienia";
    panel.appendChild(title);

    const grid = document.createElement("div");
    grid.className = "ku-settings-grid";

    // Text size
    grid.appendChild(this.buildSettingsRow("🔠 Wielkość tekstu", () => {
      const ctrl = document.createElement("div");
      ctrl.className = "ku-settings-controls";
      [1, 2, 3].forEach(size => {
        const btn = document.createElement("button");
        btn.className = "ku-size-btn" + (w.textSize === size ? " ku-active" : "");
        btn.textContent = "A";
        btn.style.fontSize = (12 + size * 3) + "px";
        btn.setAttribute("aria-label", `Rozmiar ${size}`);
        btn.addEventListener("click", () => {
          w.textSize = size as 1 | 2 | 3;
          ctrl.querySelectorAll(".ku-size-btn").forEach((b, i) => {
            b.classList.toggle("ku-active", i + 1 === size);
          });
          this.applyWcag();
        });
        ctrl.appendChild(btn);
      });
      return ctrl;
    }));

    // Voiceover
    grid.appendChild(this.buildSettingsRow("🔊 Wypowiedź lektora", () => {
      return this.buildToggle(w.voiceover, (v) => { w.voiceover = v; });
    }));

    // Audio description
    grid.appendChild(this.buildSettingsRow("📢 Audiodeskrypcja", () => {
      return this.buildToggle(w.audiodesc, (v) => { w.audiodesc = v; });
    }));

    // Orbit visibility
    grid.appendChild(this.buildSettingsRow("🪐 Widoczność orbit", () => {
      return this.buildToggle(w.orbitsVisible, (v) => {
        w.orbitsVisible = v;
        this.engine?.setOrbitsVisible(v);
      });
    }));

    // High contrast
    grid.appendChild(this.buildSettingsRow("👁️ Tryb wysokiego kontrastu", () => {
      return this.buildToggle(w.highContrast, (v) => {
        w.highContrast = v;
        this.applyWcag();
      });
    }));

    // Reduce motion
    grid.appendChild(this.buildSettingsRow("🎞️ Redukcja ruchu", () => {
      return this.buildToggle(w.reduceMotion, (v) => {
        w.reduceMotion = v;
        this.engine?.setReduceMotion(v);
        this.applyWcag();
      });
    }));

    // Color filter
    grid.appendChild(this.buildSettingsRow("🎨 Filtr kolorów", () => {
      const sel = document.createElement("select");
      sel.className = "ku-select";
      const options: Array<[string, string]> = [
        ["none", "Brak"],
        ["protanopia", "Protanopia"],
        ["deuteranopia", "Deuteranopia"],
        ["tritanopia", "Tritanopia"],
        ["grayscale", "Skala szarości"],
      ];
      options.forEach(([val, label]) => {
        const opt = document.createElement("option");
        opt.value = val;
        opt.textContent = label;
        if (w.colorFilter === val) opt.selected = true;
        sel.appendChild(opt);
      });
      sel.addEventListener("change", () => {
        w.colorFilter = sel.value as WcagSettings["colorFilter"];
        this.applyWcag();
      });
      const wrap = document.createElement("div");
      wrap.appendChild(sel);
      return wrap;
    }));

    panel.appendChild(grid);

    const footer = document.createElement("div");
    footer.className = "ku-settings-footer";

    const saveBtn = document.createElement("button");
    saveBtn.className = "ku-btn ku-btn-gold";
    saveBtn.textContent = "ZAPISZ";
    saveBtn.addEventListener("click", () => { playClick(); this.applyWcag(); this.saveState(); this.closeOverlay(); });

    footer.appendChild(saveBtn);
    panel.appendChild(footer);

    this.overlay.innerHTML = "";
    this.overlay.appendChild(panel);
    this.overlay.classList.add("ku-visible");
    setTimeout(() => saveBtn.focus(), 50);
  }

  private buildSettingsRow(label: string, buildControl: () => HTMLElement): HTMLElement {
    const row = document.createElement("div");
    row.className = "ku-settings-row";

    const lbl = document.createElement("div");
    lbl.className = "ku-settings-label";
    lbl.textContent = label;

    const ctrl = buildControl();
    row.appendChild(lbl);
    row.appendChild(ctrl);
    return row;
  }

  private buildToggle(initial: boolean, onChange: (v: boolean) => void): HTMLElement {
    const wrap = document.createElement("div");
    const btn = document.createElement("button");
    btn.className = "ku-toggle-btn" + (initial ? " ku-on" : "");
    btn.textContent = initial ? "WŁĄCZONA" : "WYŁĄCZONA";
    btn.addEventListener("click", () => {
      const newVal = !btn.classList.contains("ku-on");
      btn.classList.toggle("ku-on", newVal);
      btn.textContent = newVal ? "WŁĄCZONA" : "WYŁĄCZONA";
      onChange(newVal);
    });
    wrap.appendChild(btn);
    return wrap;
  }

  // ─── WCAG APPLICATION ─────────────────────────────────────────

  private applyWcag(): void {
    if (!this.root) return;
    const w = this.state.wcag;

    // Text size
    this.root.classList.remove("ku-size-1", "ku-size-2", "ku-size-3");
    this.root.classList.add(`ku-size-${w.textSize}`);

    // High contrast
    this.root.classList.toggle("ku-high-contrast", w.highContrast);

    // Reduce motion
    this.root.classList.toggle("ku-reduce-motion", w.reduceMotion);
    this.engine?.setReduceMotion(w.reduceMotion);

    // Color filter
    this.root.classList.remove(
      "ku-filter-grayscale", "ku-filter-protanopia",
      "ku-filter-deuteranopia", "ku-filter-tritanopia"
    );
    if (w.colorFilter !== "none") {
      this.root.classList.add(`ku-filter-${w.colorFilter}`);
    }
  }

  // ─── SCALING ──────────────────────────────────────────────────

  private scaleRoot(): void {
    if (!this.root) return;
    const cw = this.container.clientWidth || GAME_W;
    const ch = this.container.clientHeight || GAME_H;
    const scaleX = cw / GAME_W;
    const scaleY = ch / GAME_H;
    const scale = Math.min(scaleX, scaleY);
    this.root.style.transform = `scale(${scale})`;
    this.container.style.height = Math.round(GAME_H * scale) + "px";
    this.container.style.overflow = "hidden";
  }

  private setupResizeObserver(): void {
    if (typeof ResizeObserver === "undefined") return;
    this.resizeObserver = new ResizeObserver(() => this.scaleRoot());
    this.resizeObserver.observe(this.container);
  }
}

// ═══════════════════════════════════════════════════════════════════
// ZPE LIFECYCLE EXPORTS (used by main.ts)
// ═══════════════════════════════════════════════════════════════════

let _app: App | null = null;

export async function init(container: HTMLElement): Promise<void> {
  _app = new App(container);
  _app.mount();
}

export async function run(stateData: Partial<AppState> | null, isFrozen: boolean): Promise<void> {
  if (stateData && _app) _app.restoreState(stateData);
  if (isFrozen && _app) _app.freeze();
  else if (_app) _app.resume();
}

export async function unload(): Promise<void> {
  _app?.removeListeners();
}

export async function destroy(): Promise<void> {
  _app?.unmount();
  _app = null;
}
