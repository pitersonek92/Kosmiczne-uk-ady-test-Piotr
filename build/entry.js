define(() => { return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ main)
});

;// ../../zpe-port/dist/zpe.js
let _container;
let _exerciseApi;
let _engineOptions;
let _data;
let _state = null;
let _isStateRestored = false;
let _isFrozen = false;
let _isRunning = false;
// Główna funkcja starująca aplikację.
// Aplikacja pracuje jako biblioteka AMD wywoływana przez platformę.
// Przykład użycia:
//
// plik src/index.ts:
// 
// import * as ZPE from "./zpe";
// import { init, destroy } from "./app";
//
// export default ZPE.create(init, run, destroy, unload);
//
// gdzie:
//   init - funkcja inicjalizująca aplikację. Przyjmuje kontener HTML jako argument i zwraca Promise który
//          rozwiązuje się gdy aplikacja jest gotowa do użycia.
//   destroy - funkcja sprzątająca zasoby przy niszczeniu aplikacji
//
// 1. Razem z funkcją init przekazwyana jest kontener HTML. Tylko w nim aplikacja może tworzyć swoje elementy.
// 2. Funkcja init musi zwracać Promise, który powinien się rozwiązać gdy aplikacja jest gotowa do użycia.
// 3. Funkcja destroy jest wywoływana przy niszczeniu aplikacji i powinna posprzątać zasoby (usunąć elementy z DOM itp.)
function create(initFn, runFn, unloadFn, destroyFn) {
    if (!initFn) {
        throw new Error("Init function is required to create the engine.");
    }
    if (!runFn) {
        throw new Error("Run function is required to create the engine.");
    }
    if (!unloadFn) {
        throw new Error("Unload function is required to create the engine.");
    }
    if (!destroyFn) {
        throw new Error("Destroy function is required to create the engine.");
    }
    return function () {
        return {
            init: (container, api, options) => {
                return new Promise((resolve) => {
                    log("ZPE initializing engine with options:", options);
                    _container = container;
                    _exerciseApi = api;
                    _engineOptions = options;
                    _data = _engineOptions.data || {};
                    log("Hello, Engine!", _data, options);
                    initFn(container).then(() => {
                        resolve();
                    }).catch((e) => {
                        log("Error during init:", e);
                        resolve();
                    });
                });
            },
            destroy: () => {
                return Promise.resolve().then(() => {
                    log("ZPE destroying engine.");
                    try {
                        const result = unloadFn();
                        if (result instanceof Promise) {
                            return result;
                        }
                    }
                    catch (e) {
                        log("Error during unload:", e);
                    }
                    return Promise.resolve();
                }).then(() => {
                    try {
                        const result = destroyFn();
                        if (result instanceof Promise) {
                            return result;
                        }
                    }
                    catch (e) {
                        log("Error during destroy:", e);
                    }
                    return Promise.resolve();
                }).then(() => {
                    log("ZPE engine destroyed.");
                });
            },
            setState(stateData) {
                log("ZPE setting state:", stateData);
                _state = typeof stateData === "object" ? stateData : null;
                _isStateRestored = true;
                _isFrozen = false;
                waitForFrozenOrTimeout(1000).then(() => {
                    if (_isRunning && unloadFn) {
                        try {
                            const result = unloadFn();
                            if (result instanceof Promise) {
                                return result;
                            }
                        }
                        catch (e) {
                            log("Error during unload:", e);
                        }
                    }
                    return Promise.resolve();
                }).then(() => {
                    log("ZPE running engine with state:", _state, "frozen:", _isFrozen);
                    try {
                        runFn(structuredClone(_state), _isFrozen);
                    }
                    catch (e) {
                        log("Error during run:", e);
                    }
                    _isRunning = true;
                });
            },
            getState() {
                log("ZPE getting state:", _state);
                return _state;
            },
            setStateFrozen(value) {
                _isFrozen = value;
                log("Setting state frozen:", _isFrozen);
            },
            getStateProgress(data) {
                log("Getting state progress with data:", data);
                return {};
            }
        };
    };
}
function log(...args) {
    console.log("[ZPEPort]", ...args);
}
// function waitForStateRestore(): Promise<void> {
//     return new Promise((resolve) => {
//         if (_isStateRestored) {
//             resolve();
//         } else {
//             const checkInterval = setInterval(() => {
//                 if (_isStateRestored) {
//                     clearInterval(checkInterval);
//                     resolve();
//                 }
//             }, 100);
//         }
//     });
// }
// function wait(ms: number): Promise<void> {
//     return new Promise((resolve) => setTimeout(resolve, ms));
// }
function waitForFrozenOrTimeout(ms) {
    return new Promise((resolve) => {
        const timeout = setTimeout(() => {
            resolve();
        }, ms);
        const checkInterval = setInterval(() => {
            if (_isFrozen) {
                clearInterval(timeout);
                clearInterval(checkInterval);
                resolve();
            }
        }, 100);
    });
}
// Zwraca pełną ścieżkę do zasobu wewnątrz silnika na podstawie ścieżki względnej
// np. path("img/image.png") zwróci coś w stylu "https://example.com/engine/img/image.png"
function path(relativePath) {
    return _exerciseApi.enginePath(relativePath);
}
// Zwraca dane zmienne (te które moe zmieniać nauczyciel podczas tworzenia ćwiczenia)
// Jeeli nauczyciel nic nie zmienił, zwraca dane domyślne które znajdują się w engine.json 
// w sekcji "editor/defaultData"
function getData() {
    return structuredClone(_data);
}
// Zwraca stan ćwiczenia (np. odpowiedzi ucznia) które zostały zapisane wcześniej
// za pomocą setState. Jeżeli nie ma zapisanego stanu, zwraca null
function getState() {
    return _exerciseApi.triggerStateRestore().then(() => {
        log("State restored.");
        return _state;
    });
}
;
// Ustawia stan ćwiczenia (np. odpowiedzi ucznia) które zostaną przywrócone w ćwiczeniu
// Jeżeli stan jest nieprawidłowy lub pusty, ćwiczenie powinno zainicjować się w stanie domyślnym
function setState(stateData) {
    if (_isFrozen) {
        log("State is frozen, returning null.");
        return Promise.resolve();
    }
    _state = stateData;
    return _exerciseApi.triggerStateSave();
}

//# sourceMappingURL=zpe.js.map
;// ./src/app.ts

// ═══════════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════════
const GAME_W = 1920;
const GAME_H = 1080;
const TOPBAR_H = 72;
// ═══════════════════════════════════════════════════════════════════
// ASSET PATHS — all graphics from client
// ═══════════════════════════════════════════════════════════════════
function img(name) { return path(name); }
const ASSETS = {
    bg: () => img("bg_all.png"),
    topBar: () => img("top_bar.png"),
    aplaDark: () => img("apla_dark.png"),
    // Buttons
    btn280: () => img("btn_280x80.png"),
    btn420: () => img("btn_420x80.png"),
    btn620: () => img("btn_620x80.png"),
    btnCircle: () => img("btn_circle_bg.png"),
    // Icons
    icoSoundOn: () => img("ico_sound_on.svg"),
    icoSoundOff: () => img("ico_sound_off.svg"),
    icoHelp: () => img("ico_help_ico.svg"),
    icoSetting: () => img("ico_setting.svg"),
    icoClipboard: () => img("icon_clipboard.svg.png"),
    // Portraits
    pp01: () => img("pp_01.png"),
    pp02: () => img("pp_02.png"),
    pp02over: () => img("pp_02_over.png"),
    pp03: () => img("pp_03.png"),
    kopernik: () => img("kopernik.png"),
    // Solar system diagrams
    planet01: () => img("planet_01.png"),
    planet02: () => img("planet_02.png"),
    // Popup
    popupBg: () => img("popup_simple_920x650.png"),
    // Decorations
    rys01: () => img("rys_01.png"),
    rys02: () => img("rys_02.png"),
    rys03: () => img("rys_03.png"),
    rys04: () => img("rys_04.png"),
    rys05: () => img("rys_05.png"),
    // Separators
    sep500: () => img("sep_500.png"),
    sep980: () => img("sep_980.png"),
    // Slider
    sliderBg: () => img("slider_bg.png"),
    sliderThumb: () => img("slider_thumb.png"),
};
// ═══════════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════════
const ASTRONOMERS = [
    {
        id: "ptolemeusz",
        name: "Klaudiusz Ptolemeusz",
        years: "ok. 100 – ok. 168 n.e.",
        bio: 'Klaudiusz Ptolemeusz — grecki astronom, matematyk i geograf działający w Aleksandrii. Stworzył <strong>geocentryczny model Wszechświata</strong>, w którym nieruchoma Ziemia znajdowała się w centrum, a Słońce, Księżyc i planety krążyły wokół niej. Jego dzieło „Almagest" było podstawą astronomii przez ponad 1400 lat.',
        modelTitle: "Układ geocentryczny Ptolemeusza",
        modelType: "geocentric",
        portrait: ASSETS.pp01,
        portraitOver: ASSETS.pp01,
        bioPicture: ASSETS.pp01,
    },
    {
        id: "kopernik",
        name: "Mikołaj Kopernik",
        years: "1473–1543",
        bio: 'Mikołaj Kopernik — polski astronom, matematyk i lekarz. Jako pierwszy naukowo uzasadnił <strong>heliocentryczny model Wszechświata</strong>, w którym Słońce znajduje się w centrum, a Ziemia i inne planety krążą wokół niego po okrągłych orbitach. Jego przełomowe dzieło „De revolutionibus orbium coelestium" (O obrotach sfer niebieskich) z 1543 roku zapoczątkowało rewolucję kopernikańską.',
        modelTitle: "Układ słoneczny Mikołaja Kopernika",
        modelType: "heliocentric",
        portrait: ASSETS.pp02,
        portraitOver: ASSETS.pp02over,
        bioPicture: ASSETS.kopernik,
    },
    {
        id: "kepler",
        name: "Johannes Kepler",
        years: "1571–1630",
        bio: 'Johannes Kepler — niemiecki astronom i matematyk, uczeń Tychona Brahe. Odkrył trzy prawa ruchu planet, wykazując że planety poruszają się po <strong>eliptycznych orbitach</strong> ze Słońcem w jednym z ognisk. Jego prawa ruchu planet stanowiły fundament dla teorii grawitacji Newtona i nowoczesnej mechaniki niebieskiej.',
        modelTitle: "Układ słoneczny Jana Keplera",
        modelType: "kepler",
        portrait: ASSETS.pp03,
        portraitOver: ASSETS.pp03,
        bioPicture: ASSETS.pp03,
    },
];
const PLANETS_GEO = [
    { name: "Ziemia", type: "Planeta centralna", color: "#4488ff", radius: 18, orbit: 0, speed: 0, angle: 0 },
    { name: "Księżyc", type: "Satelita", color: "#cccccc", radius: 6, orbit: 50, speed: 0.025, angle: 0 },
    { name: "Merkury", type: "Planeta", color: "#b0b0b0", radius: 7, orbit: 90, speed: 0.018, angle: 1.2 },
    { name: "Wenus", type: "Planeta", color: "#e8c060", radius: 10, orbit: 130, speed: 0.014, angle: 2.5 },
    { name: "Słońce", type: "Gwiazda", color: "#FFD700", radius: 22, orbit: 175, speed: 0.01, angle: 0.8 },
    { name: "Mars", type: "Planeta", color: "#cc4422", radius: 9, orbit: 225, speed: 0.007, angle: 3.8 },
    { name: "Jowisz", type: "Planeta gazowa", color: "#d4a060", radius: 16, orbit: 290, speed: 0.004, angle: 5.1 },
    { name: "Saturn", type: "Planeta gazowa", color: "#c8a050", radius: 14, orbit: 360, speed: 0.002, angle: 1.5 },
];
const PLANETS_HELIO = [
    { name: "Słońce", type: "Gwiazda", color: "#FFD700", radius: 28, orbit: 0, speed: 0, angle: 0 },
    { name: "Merkury", type: "Planeta", color: "#b0b0b0", radius: 7, orbit: 55, speed: 0.035, angle: 0 },
    { name: "Wenus", type: "Planeta", color: "#e8c060", radius: 10, orbit: 90, speed: 0.025, angle: 1.5 },
    { name: "Ziemia", type: "Planeta", color: "#4488ff", radius: 11, orbit: 130, speed: 0.018, angle: 3.0 },
    { name: "Mars", type: "Planeta", color: "#cc4422", radius: 9, orbit: 175, speed: 0.012, angle: 4.5 },
    { name: "Jowisz", type: "Planeta gazowa", color: "#d4a060", radius: 18, orbit: 240, speed: 0.006, angle: 2.0 },
    { name: "Saturn", type: "Planeta gazowa", color: "#c8a050", radius: 15, orbit: 310, speed: 0.003, angle: 5.5 },
    { name: "Uran", type: "Planeta lodowa", color: "#66cccc", radius: 12, orbit: 370, speed: 0.0015, angle: 1.0 },
    { name: "Neptun", type: "Planeta lodowa", color: "#4466dd", radius: 11, orbit: 420, speed: 0.001, angle: 3.5 },
];
const PLANETS_KEPLER = [
    { name: "Słońce", type: "Gwiazda", color: "#FFD700", radius: 28, orbit: 0, speed: 0, angle: 0 },
    { name: "Merkury", type: "Planeta", color: "#b0b0b0", radius: 7, orbit: 55, speed: 0.035, angle: 0, eccentricity: 0.21 },
    { name: "Wenus", type: "Planeta", color: "#e8c060", radius: 10, orbit: 90, speed: 0.025, angle: 1.5, eccentricity: 0.007 },
    { name: "Ziemia", type: "Planeta", color: "#4488ff", radius: 11, orbit: 130, speed: 0.018, angle: 3.0, eccentricity: 0.017 },
    { name: "Mars", type: "Planeta", color: "#cc4422", radius: 9, orbit: 175, speed: 0.012, angle: 4.5, eccentricity: 0.09 },
    { name: "Jowisz", type: "Planeta gazowa", color: "#d4a060", radius: 18, orbit: 240, speed: 0.006, angle: 2.0, eccentricity: 0.049 },
    { name: "Saturn", type: "Planeta gazowa", color: "#c8a050", radius: 15, orbit: 310, speed: 0.003, angle: 5.5, eccentricity: 0.056 },
];
// ═══════════════════════════════════════════════════════════════════
// AUDIO
// ═══════════════════════════════════════════════════════════════════
let _audioCtx = null;
let _muted = false;
function getAudioCtx() {
    if (!_audioCtx)
        _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    return _audioCtx;
}
function playClick() {
    if (_muted)
        return;
    try {
        const ctx = getAudioCtx();
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = "sine";
        o.frequency.value = 800;
        g.gain.setValueAtTime(0.15, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
        o.connect(g);
        g.connect(ctx.destination);
        o.start();
        o.stop(ctx.currentTime + 0.1);
    }
    catch (e) { }
}
function playHover() {
    if (_muted)
        return;
    try {
        const ctx = getAudioCtx();
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = "sine";
        o.frequency.value = 600;
        g.gain.setValueAtTime(0.05, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
        o.connect(g);
        g.connect(ctx.destination);
        o.start();
        o.stop(ctx.currentTime + 0.06);
    }
    catch (e) { }
}
function lighten(hex, pct) {
    const n = parseInt(hex.replace("#", ""), 16);
    const r = Math.min(255, ((n >> 16) & 255) + Math.round(255 * pct));
    const g = Math.min(255, ((n >> 8) & 255) + Math.round(255 * pct));
    const b = Math.min(255, (n & 255) + Math.round(255 * pct));
    return `rgb(${r},${g},${b})`;
}
// ═══════════════════════════════════════════════════════════════════
// CSS INJECTION
// ═══════════════════════════════════════════════════════════════════
function injectCSS() {
    const existing = document.getElementById("ku-styles");
    if (existing)
        return;
    const style = document.createElement("style");
    style.id = "ku-styles";
    style.textContent = getCSS();
    document.head.appendChild(style);
}
function getCSS() {
    return `
/* ═══════════════════════════════════════════════════════════════
   KOSMICZNE UKŁADY — CSS (ZPE isolated, all !important)
   Namespace: #ku-root — uses ALL client graphic assets
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

/* ── Topbar with top_bar.png ── */
#ku-root .ku-topbar {
  position: absolute !important;
  top: 0 !important; left: 0 !important; right: 0 !important;
  height: ${TOPBAR_H}px !important;
  z-index: 800 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  padding: 0 24px !important;
  background-size: 100% 100% !important;
  background-repeat: no-repeat !important;
}

#ku-root .ku-topbar-title {
  font-size: 24px !important;
  font-weight: 700 !important;
  letter-spacing: 4px !important;
  text-transform: uppercase !important;
  color: #FFD700 !important;
  text-shadow: 0 0 15px rgba(255,215,0,0.6) !important;
}

#ku-root .ku-topbar-btns {
  display: flex !important;
  gap: 12px !important;
  align-items: center !important;
}

/* Circle buttons with btn_circle_bg.png */
#ku-root .ku-topbar-btn {
  width: 52px !important;
  height: 52px !important;
  border: none !important;
  border-radius: 50% !important;
  background-size: contain !important;
  background-repeat: no-repeat !important;
  background-position: center !important;
  background-color: transparent !important;
  cursor: pointer !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  transition: transform 0.2s, filter 0.2s !important;
  padding: 0 !important;
}

#ku-root .ku-topbar-btn:hover {
  transform: scale(1.1) !important;
  filter: brightness(1.3) !important;
}

#ku-root .ku-topbar-btn:focus {
  outline: 2px solid #FFD700 !important;
  outline-offset: 2px !important;
}

#ku-root .ku-topbar-btn img {
  width: 28px !important;
  height: 28px !important;
  pointer-events: none !important;
}

/* ── Content area ── */
#ku-root .ku-content {
  position: absolute !important;
  top: ${TOPBAR_H}px !important;
  left: 0 !important; right: 0 !important; bottom: 0 !important;
  overflow: hidden !important;
}

/* ── Background with bg_all.png ── */
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
   WELCOME SCREEN — with decorations rys_01-05, clipboard icon, separators
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
  padding: 44px 56px !important;
  max-width: 860px !important;
  width: 90% !important;
  text-align: center !important;
  backdrop-filter: blur(10px) !important;
  box-shadow: 0 0 60px rgba(50, 100, 255, 0.3) !important;
  position: relative !important;
}

#ku-root .ku-clipboard-icon {
  width: 64px !important;
  height: 64px !important;
  margin-bottom: 12px !important;
}

#ku-root .ku-welcome-title {
  font-size: 32px !important;
  font-weight: 700 !important;
  color: #FFD700 !important;
  margin-bottom: 16px !important;
  letter-spacing: 2px !important;
}

#ku-root .ku-sep-img {
  display: block !important;
  margin: 16px auto !important;
  max-width: 100% !important;
  height: auto !important;
}

#ku-root .ku-welcome-text {
  font-size: 18px !important;
  color: #cce0ff !important;
  line-height: 1.7 !important;
  margin-bottom: 28px !important;
}

#ku-root .ku-welcome-btns {
  display: flex !important;
  gap: 24px !important;
  justify-content: center !important;
}

/* Decorative images around welcome popup */
#ku-root .ku-deco {
  position: absolute !important;
  pointer-events: none !important;
  z-index: 1 !important;
}

#ku-root .ku-deco img {
  max-width: 100% !important;
  height: auto !important;
}

/* ══════════════════════════════════════════════════════════════
   BUTTONS — using btn_*.png as background-image
══════════════════════════════════════════════════════════════ */

#ku-root .ku-btn {
  border: none !important;
  border-radius: 0 !important;
  font-size: 16px !important;
  font-weight: 700 !important;
  cursor: pointer !important;
  letter-spacing: 1.5px !important;
  text-transform: uppercase !important;
  transition: transform 0.15s, filter 0.15s !important;
  background-color: transparent !important;
  background-size: 100% 100% !important;
  background-repeat: no-repeat !important;
  background-position: center !important;
  color: #fff !important;
  text-shadow: 0 1px 3px rgba(0,0,0,0.5) !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
}

#ku-root .ku-btn:hover {
  transform: scale(1.04) !important;
  filter: brightness(1.2) !important;
}

#ku-root .ku-btn:focus {
  outline: 3px solid #FFD700 !important;
  outline-offset: 2px !important;
}

#ku-root .ku-btn-280 {
  width: 280px !important;
  height: 80px !important;
}

#ku-root .ku-btn-420 {
  width: 420px !important;
  height: 80px !important;
}

#ku-root .ku-btn-620 {
  width: 620px !important;
  height: 80px !important;
}

/* Fallback for small buttons without image */
#ku-root .ku-btn-small {
  padding: 12px 28px !important;
  background: linear-gradient(135deg, #1a6bc4, #0d4a8a) !important;
  border-radius: 8px !important;
  border: 1px solid rgba(100,180,255,0.4) !important;
  font-size: 14px !important;
}

#ku-root .ku-btn-small:hover {
  background: linear-gradient(135deg, #2a7bd4, #1a5a9a) !important;
}

#ku-root .ku-btn-gold {
  width: 280px !important;
  height: 80px !important;
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
  width: 190px !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
  align-items: center !important;
  gap: 16px !important;
  padding: 20px 10px !important;
  background: rgba(0,0,20,0.7) !important;
  border-right: 1px solid rgba(100,160,255,0.2) !important;
  z-index: 10 !important;
}

#ku-root .ku-portrait-btn {
  width: 160px !important;
  height: 160px !important;
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
  font-size: 12px !important;
  color: #aac8ff !important;
  text-align: center !important;
  margin-top: 4px !important;
  line-height: 1.3 !important;
  max-width: 160px !important;
}

/* Canvas area */
#ku-root .ku-canvas-area {
  position: absolute !important;
  left: 190px !important;
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
  font-size: 22px !important;
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
  width: 48px !important;
  height: 48px !important;
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
  background: rgba(0,0,0,0.88) !important;
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
   OVERLAY — with apla_dark.png as background
══════════════════════════════════════════════════════════════ */

#ku-root .ku-overlay {
  position: absolute !important;
  top: ${TOPBAR_H}px !important;
  left: 0 !important; right: 0 !important; bottom: 0 !important;
  background: rgba(0,0,0,0.65) !important;
  z-index: 600 !important;
  display: none !important;
  align-items: center !important;
  justify-content: center !important;
}

#ku-root .ku-overlay.ku-visible {
  display: flex !important;
}

/* ══════════════════════════════════════════════════════════════
   BIOGRAPHY POPUP — with popup_simple_920x650.png as background
══════════════════════════════════════════════════════════════ */

#ku-root .ku-bio-popup {
  width: 920px !important;
  height: 650px !important;
  background-size: 100% 100% !important;
  background-repeat: no-repeat !important;
  background-position: center !important;
  padding: 50px 60px !important;
  position: relative !important;
  display: flex !important;
  flex-direction: column !important;
}

#ku-root .ku-bio-header {
  display: flex !important;
  gap: 30px !important;
  align-items: flex-start !important;
  margin-bottom: 16px !important;
}

#ku-root .ku-bio-portrait {
  width: 130px !important;
  height: 130px !important;
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
  margin-bottom: 12px !important;
}

#ku-root .ku-bio-text {
  font-size: 16px !important;
  color: #cce0ff !important;
  line-height: 1.7 !important;
  flex: 1 !important;
  overflow-y: auto !important;
}

#ku-root .ku-bio-btns {
  display: flex !important;
  gap: 16px !important;
  margin-top: 20px !important;
  justify-content: center !important;
  flex-wrap: wrap !important;
}

#ku-root .ku-bio-close {
  position: absolute !important;
  top: 20px !important;
  right: 24px !important;
  width: 40px !important;
  height: 40px !important;
  border: none !important;
  background: rgba(255,255,255,0.1) !important;
  color: #fff !important;
  font-size: 20px !important;
  border-radius: 50% !important;
  cursor: pointer !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

#ku-root .ku-bio-close:hover {
  background: rgba(255,255,255,0.25) !important;
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
  width: 920px !important;
  min-height: 500px !important;
  background-size: 100% 100% !important;
  background-repeat: no-repeat !important;
  padding: 50px 60px !important;
  text-align: center !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: center !important;
}

#ku-root .ku-onboarding-icon {
  width: 80px !important;
  height: 80px !important;
  margin-bottom: 20px !important;
  object-fit: contain !important;
}

#ku-root .ku-onboarding-title {
  font-size: 26px !important;
  font-weight: 700 !important;
  color: #FFD700 !important;
  margin-bottom: 16px !important;
}

#ku-root .ku-onboarding-text {
  font-size: 16px !important;
  color: #cce0ff !important;
  line-height: 1.7 !important;
  margin-bottom: 30px !important;
  max-width: 700px !important;
}

#ku-root .ku-onboarding-dots {
  display: flex !important;
  gap: 8px !important;
  justify-content: center !important;
  margin-bottom: 24px !important;
}

#ku-root .ku-onboarding-dot {
  width: 12px !important;
  height: 12px !important;
  border-radius: 50% !important;
  background: rgba(255,255,255,0.3) !important;
  transition: background 0.2s !important;
}

#ku-root .ku-onboarding-dot.ku-active {
  background: #FFD700 !important;
}

#ku-root .ku-onboarding-btns {
  display: flex !important;
  gap: 16px !important;
  justify-content: center !important;
}

/* ══════════════════════════════════════════════════════════════
   SETTINGS PANEL — with popup bg, slider assets
══════════════════════════════════════════════════════════════ */

#ku-root .ku-settings-panel {
  width: 920px !important;
  min-height: 650px !important;
  background-size: 100% 100% !important;
  background-repeat: no-repeat !important;
  padding: 44px 50px !important;
  position: relative !important;
  display: flex !important;
  flex-direction: column !important;
}

#ku-root .ku-settings-title {
  font-size: 26px !important;
  font-weight: 700 !important;
  color: #FFD700 !important;
  text-align: center !important;
  margin-bottom: 24px !important;
}

#ku-root .ku-settings-sep {
  display: block !important;
  margin: 0 auto 20px auto !important;
  max-width: 100% !important;
}

#ku-root .ku-settings-grid {
  display: grid !important;
  grid-template-columns: 1fr 1fr !important;
  gap: 18px !important;
  margin-bottom: 24px !important;
  flex: 1 !important;
}

#ku-root .ku-settings-row {
  background: rgba(255,255,255,0.05) !important;
  border: 1px solid rgba(100,160,255,0.2) !important;
  border-radius: 10px !important;
  padding: 14px !important;
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
  gap: 16px !important;
  justify-content: center !important;
  margin-top: 16px !important;
}

/* ══════════════════════════════════════════════════════════════
   WCAG MODIFIERS
══════════════════════════════════════════════════════════════ */

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

#ku-root.ku-high-contrast {
  filter: contrast(1.5) brightness(1.1) !important;
}

#ku-root.ku-reduce-motion * {
  animation: none !important;
  transition: none !important;
}

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

#ku-root .ku-sep {
  width: 100% !important;
  height: 2px !important;
  background: rgba(100,160,255,0.2) !important;
  margin: 16px 0 !important;
}

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
function injectSVGFilters() {
    if (document.getElementById("ku-svg-filters"))
        return;
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
    canvas;
    ctx;
    planets = [];
    modelType = "heliocentric";
    animFrame = 0;
    zoom = 1;
    panX = 0;
    panY = 0;
    isDragging = false;
    lastMouseX = 0;
    lastMouseY = 0;
    orbitsVisible = true;
    reduceMotion = false;
    hoveredPlanet = null;
    tooltip = null;
    // Bound event handlers for proper removal
    _onMouseDown;
    _onMouseMove;
    _onMouseUp;
    _onWheel;
    _onTouchStart;
    _onTouchMove;
    _onTouchEnd;
    constructor(canvas, tooltip) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.tooltip = tooltip;
        this._onMouseDown = this.onMouseDown.bind(this);
        this._onMouseMove = this.onMouseMove.bind(this);
        this._onMouseUp = this.onMouseUp.bind(this);
        this._onWheel = this.onWheel.bind(this);
        this._onTouchStart = this.onTouchStart.bind(this);
        this._onTouchMove = this.onTouchMove.bind(this);
        this._onTouchEnd = this.onTouchEnd.bind(this);
        canvas.addEventListener("mousedown", this._onMouseDown);
        canvas.addEventListener("mousemove", this._onMouseMove);
        canvas.addEventListener("mouseup", this._onMouseUp);
        canvas.addEventListener("mouseleave", this._onMouseUp);
        canvas.addEventListener("wheel", this._onWheel, { passive: false });
        canvas.addEventListener("touchstart", this._onTouchStart, { passive: false });
        canvas.addEventListener("touchmove", this._onTouchMove, { passive: false });
        canvas.addEventListener("touchend", this._onTouchEnd);
    }
    setModel(type) {
        this.modelType = type;
        this.planets = type === "geocentric" ? [...PLANETS_GEO] :
            type === "kepler" ? [...PLANETS_KEPLER] : [...PLANETS_HELIO];
        this.zoom = 1;
        this.panX = 0;
        this.panY = 0;
    }
    setOrbitsVisible(v) { this.orbitsVisible = v; }
    setReduceMotion(v) { this.reduceMotion = v; }
    zoomIn() { this.zoom = Math.min(3, this.zoom * 1.2); }
    zoomOut() { this.zoom = Math.max(0.3, this.zoom / 1.2); }
    resetView() { this.zoom = 1; this.panX = 0; this.panY = 0; }
    start() { this.animate(); }
    stop() {
        if (this.animFrame)
            cancelAnimationFrame(this.animFrame);
        this.animFrame = 0;
    }
    destroy() {
        this.stop();
        this.canvas.removeEventListener("mousedown", this._onMouseDown);
        this.canvas.removeEventListener("mousemove", this._onMouseMove);
        this.canvas.removeEventListener("mouseup", this._onMouseUp);
        this.canvas.removeEventListener("mouseleave", this._onMouseUp);
        this.canvas.removeEventListener("wheel", this._onWheel);
        this.canvas.removeEventListener("touchstart", this._onTouchStart);
        this.canvas.removeEventListener("touchmove", this._onTouchMove);
        this.canvas.removeEventListener("touchend", this._onTouchEnd);
    }
    animate = () => {
        this.draw();
        if (!this.reduceMotion) {
            for (const p of this.planets) {
                if (p.orbit > 0)
                    p.angle += p.speed;
            }
        }
        this.animFrame = requestAnimationFrame(this.animate);
    };
    draw() {
        const w = this.canvas.width;
        const h = this.canvas.height;
        const cx = w / 2 + this.panX * this.zoom;
        const cy = h / 2 + this.panY * this.zoom;
        const ctx = this.ctx;
        // Dark space background
        ctx.fillStyle = "#050510";
        ctx.fillRect(0, 0, w, h);
        // Stars
        ctx.fillStyle = "rgba(255,255,255,0.4)";
        for (let i = 0; i < 200; i++) {
            const sx = (Math.sin(i * 127.1 + i) * 0.5 + 0.5) * w;
            const sy = (Math.cos(i * 311.7 + i) * 0.5 + 0.5) * h;
            ctx.fillRect(sx, sy, 1.2, 1.2);
        }
        // Draw orbits
        if (this.orbitsVisible) {
            ctx.strokeStyle = "rgba(100,160,255,0.15)";
            ctx.lineWidth = 1;
            for (const p of this.planets) {
                if (p.orbit === 0)
                    continue;
                const r = p.orbit * this.zoom;
                if (this.modelType === "kepler" && p.eccentricity) {
                    const a = r;
                    const b = a * Math.sqrt(1 - p.eccentricity * p.eccentricity);
                    ctx.beginPath();
                    ctx.ellipse(cx, cy, a, b, 0, 0, Math.PI * 2);
                    ctx.stroke();
                }
                else {
                    ctx.beginPath();
                    ctx.arc(cx, cy, r, 0, Math.PI * 2);
                    ctx.stroke();
                }
            }
        }
        // Draw planets
        for (const p of this.planets) {
            let px, py;
            if (p.orbit === 0) {
                px = cx;
                py = cy;
            }
            else {
                const r = p.orbit * this.zoom;
                if (this.modelType === "kepler" && p.eccentricity) {
                    const a = r;
                    const b = a * Math.sqrt(1 - p.eccentricity * p.eccentricity);
                    px = cx + a * Math.cos(p.angle);
                    py = cy + b * Math.sin(p.angle);
                }
                else {
                    px = cx + r * Math.cos(p.angle);
                    py = cy + r * Math.sin(p.angle);
                }
            }
            const pr = Math.max(3, p.radius * this.zoom * 0.6);
            // Glow
            const grd = ctx.createRadialGradient(px, py, 0, px, py, pr * 2.5);
            grd.addColorStop(0, p.color + "44");
            grd.addColorStop(1, "transparent");
            ctx.fillStyle = grd;
            ctx.beginPath();
            ctx.arc(px, py, pr * 2.5, 0, Math.PI * 2);
            ctx.fill();
            // Planet body
            const bodyGrd = ctx.createRadialGradient(px - pr * 0.3, py - pr * 0.3, 0, px, py, pr);
            bodyGrd.addColorStop(0, lighten(p.color, 0.3));
            bodyGrd.addColorStop(1, p.color);
            ctx.fillStyle = bodyGrd;
            ctx.beginPath();
            ctx.arc(px, py, pr, 0, Math.PI * 2);
            ctx.fill();
            // Label
            ctx.fillStyle = "#fff";
            ctx.font = `${Math.max(10, 12 * this.zoom * 0.7)}px 'Segoe UI', Arial, sans-serif`;
            ctx.textAlign = "center";
            let labelText = p.name;
            if (p.orbit === 0) {
                labelText += this.modelType === "geocentric" ? " (centrum)" : "";
            }
            ctx.fillText(labelText, px, py + pr + 16 * this.zoom * 0.6);
        }
        // Kepler annotation
        if (this.modelType === "kepler") {
            ctx.fillStyle = "rgba(255,215,0,0.7)";
            ctx.font = "italic 14px 'Segoe UI', Arial, sans-serif";
            ctx.textAlign = "left";
            ctx.fillText("Orbity eliptyczne (prawa Keplera)", 20, h - 20);
        }
    }
    hitTest(mx, my) {
        const w = this.canvas.width;
        const h = this.canvas.height;
        const cx = w / 2 + this.panX * this.zoom;
        const cy = h / 2 + this.panY * this.zoom;
        for (let i = this.planets.length - 1; i >= 0; i--) {
            const p = this.planets[i];
            let px, py;
            if (p.orbit === 0) {
                px = cx;
                py = cy;
            }
            else {
                const r = p.orbit * this.zoom;
                if (this.modelType === "kepler" && p.eccentricity) {
                    const a = r;
                    const b = a * Math.sqrt(1 - p.eccentricity * p.eccentricity);
                    px = cx + a * Math.cos(p.angle);
                    py = cy + b * Math.sin(p.angle);
                }
                else {
                    px = cx + r * Math.cos(p.angle);
                    py = cy + r * Math.sin(p.angle);
                }
            }
            const pr = Math.max(3, p.radius * this.zoom * 0.6);
            const dist = Math.sqrt((mx - px) ** 2 + (my - py) ** 2);
            if (dist <= pr + 8)
                return p;
        }
        return null;
    }
    onMouseDown(e) {
        this.isDragging = true;
        this.lastMouseX = e.clientX;
        this.lastMouseY = e.clientY;
    }
    onMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
        if (this.isDragging) {
            this.panX += (e.clientX - this.lastMouseX) / this.zoom;
            this.panY += (e.clientY - this.lastMouseY) / this.zoom;
            this.lastMouseX = e.clientX;
            this.lastMouseY = e.clientY;
            return;
        }
        const planet = this.hitTest(mx, my);
        if (planet && this.tooltip) {
            this.hoveredPlanet = planet;
            this.canvas.style.cursor = "pointer";
            const nameEl = this.tooltip.querySelector(".ku-tooltip-name");
            const typeEl = this.tooltip.querySelector(".ku-tooltip-type");
            if (nameEl)
                nameEl.textContent = planet.name;
            if (typeEl)
                typeEl.textContent = planet.type;
            this.tooltip.style.left = (mx + 20) + "px";
            this.tooltip.style.top = (my - 10) + "px";
            this.tooltip.classList.add("ku-visible");
            playHover();
        }
        else {
            this.hoveredPlanet = null;
            this.canvas.style.cursor = "grab";
            if (this.tooltip)
                this.tooltip.classList.remove("ku-visible");
        }
    }
    onMouseUp(_e) {
        this.isDragging = false;
    }
    onWheel(e) {
        e.preventDefault();
        if (e.deltaY < 0)
            this.zoomIn();
        else
            this.zoomOut();
    }
    onTouchStart(e) {
        if (e.touches.length === 1) {
            e.preventDefault();
            this.isDragging = true;
            this.lastMouseX = e.touches[0].clientX;
            this.lastMouseY = e.touches[0].clientY;
        }
    }
    onTouchMove(e) {
        if (e.touches.length === 1 && this.isDragging) {
            e.preventDefault();
            this.panX += (e.touches[0].clientX - this.lastMouseX) / this.zoom;
            this.panY += (e.touches[0].clientY - this.lastMouseY) / this.zoom;
            this.lastMouseX = e.touches[0].clientX;
            this.lastMouseY = e.touches[0].clientY;
        }
    }
    onTouchEnd(_e) {
        this.isDragging = false;
    }
}
// ═══════════════════════════════════════════════════════════════════
// MODEL CANVAS (for dedicated model screen)
// ═══════════════════════════════════════════════════════════════════
function renderModelCanvas(canvas, type) {
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const planets = type === "geocentric" ? PLANETS_GEO :
        type === "kepler" ? PLANETS_KEPLER : PLANETS_HELIO;
    // Background
    ctx.fillStyle = "#050510";
    ctx.fillRect(0, 0, w, h);
    // Stars
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    for (let i = 0; i < 300; i++) {
        const sx = (Math.sin(i * 127.1 + i) * 0.5 + 0.5) * w;
        const sy = (Math.cos(i * 311.7 + i) * 0.5 + 0.5) * h;
        ctx.fillRect(sx, sy, 1.5, 1.5);
    }
    const scale = 1.3;
    // Draw orbits
    ctx.strokeStyle = "rgba(100,160,255,0.2)";
    ctx.lineWidth = 1;
    for (const p of planets) {
        if (p.orbit === 0)
            continue;
        const r = p.orbit * scale;
        if (type === "kepler" && p.eccentricity) {
            const a = r;
            const b = a * Math.sqrt(1 - p.eccentricity * p.eccentricity);
            ctx.beginPath();
            ctx.ellipse(cx, cy, a, b, 0, 0, Math.PI * 2);
            ctx.stroke();
        }
        else {
            ctx.beginPath();
            ctx.arc(cx, cy, r, 0, Math.PI * 2);
            ctx.stroke();
        }
    }
    // Draw planets
    for (const p of planets) {
        let px, py;
        if (p.orbit === 0) {
            px = cx;
            py = cy;
        }
        else {
            const r = p.orbit * scale;
            if (type === "kepler" && p.eccentricity) {
                const a = r;
                const b = a * Math.sqrt(1 - p.eccentricity * p.eccentricity);
                px = cx + a * Math.cos(p.angle);
                py = cy + b * Math.sin(p.angle);
            }
            else {
                px = cx + r * Math.cos(p.angle);
                py = cy + r * Math.sin(p.angle);
            }
        }
        const pr = p.radius * 1.2;
        // Glow
        const grd = ctx.createRadialGradient(px, py, 0, px, py, pr * 3);
        grd.addColorStop(0, p.color + "55");
        grd.addColorStop(1, "transparent");
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(px, py, pr * 3, 0, Math.PI * 2);
        ctx.fill();
        // Body
        const bodyGrd = ctx.createRadialGradient(px - pr * 0.3, py - pr * 0.3, 0, px, py, pr);
        bodyGrd.addColorStop(0, lighten(p.color, 0.3));
        bodyGrd.addColorStop(1, p.color);
        ctx.fillStyle = bodyGrd;
        ctx.beginPath();
        ctx.arc(px, py, pr, 0, Math.PI * 2);
        ctx.fill();
        // Label
        ctx.fillStyle = "#fff";
        ctx.font = "bold 14px 'Segoe UI', Arial, sans-serif";
        ctx.textAlign = "center";
        let label = p.name;
        if (p.orbit === 0 && type === "geocentric")
            label += " (centrum)";
        ctx.fillText(label, px, py + pr + 20);
    }
    // Title
    const title = type === "geocentric" ? "Model geocentryczny — Ziemia w centrum Wszechświata" :
        type === "kepler" ? "Model heliocentryczny — orbity eliptyczne (prawa Keplera)" :
            "Model heliocentryczny — Słońce w centrum";
    ctx.fillStyle = "#FFD700";
    ctx.font = "bold 22px 'Segoe UI', Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(title, cx, 40);
    if (type === "kepler") {
        ctx.fillStyle = "rgba(255,215,0,0.6)";
        ctx.font = "italic 14px 'Segoe UI', Arial, sans-serif";
        ctx.textAlign = "left";
        ctx.fillText("Orbity eliptyczne (prawa Keplera)", 20, h - 20);
    }
    return 0;
}
// ═══════════════════════════════════════════════════════════════════
// APP CLASS
// ═══════════════════════════════════════════════════════════════════
class App {
    container;
    root = null;
    engine = null;
    overlay = null;
    onboardOverlay = null;
    resizeObserver = null;
    state = {
        screen: "welcome",
        astronomer: 0,
        wcag: {
            textSize: 1,
            narrator: false,
            audioDesc: false,
            orbitsVisible: true,
            highContrast: false,
            reduceMotion: false,
            colorFilter: "none",
        },
        muted: false,
        onboardDone: false,
    };
    constructor(container) {
        this.container = container;
    }
    mount() {
        injectCSS();
        injectSVGFilters();
        this.buildDOM();
        this.showScreen(this.state.screen);
        this.applyWcag();
        this.scaleRoot();
        this.setupResizeObserver();
    }
    unmount() {
        this.engine?.destroy();
        this.engine = null;
        this.resizeObserver?.disconnect();
        if (this.root) {
            this.container.removeChild(this.root);
            this.root = null;
        }
        const styles = document.getElementById("ku-styles");
        if (styles)
            styles.remove();
        const filters = document.getElementById("ku-svg-filters");
        if (filters)
            filters.remove();
    }
    restoreState(data) {
        if (data.screen)
            this.state.screen = data.screen;
        if (data.astronomer !== undefined)
            this.state.astronomer = data.astronomer;
        if (data.wcag)
            Object.assign(this.state.wcag, data.wcag);
        if (data.muted !== undefined) {
            this.state.muted = data.muted;
            _muted = data.muted;
        }
        if (data.onboardDone !== undefined)
            this.state.onboardDone = data.onboardDone;
        this.showScreen(this.state.screen);
        this.applyWcag();
    }
    freeze() { this.engine?.stop(); }
    resume() { this.engine?.start(); }
    removeListeners() { }
    async saveState() {
        try {
            await setState(this.state);
        }
        catch (e) { }
    }
    // ─── DOM BUILDING ─────────────────────────────────────────────
    buildDOM() {
        this.root = document.createElement("div");
        this.root.id = "ku-root";
        this.root.setAttribute("role", "application");
        this.root.setAttribute("aria-label", "Kosmiczne Układy — gra edukacyjna");
        // Topbar with top_bar.png
        const topbar = document.createElement("div");
        topbar.className = "ku-topbar";
        topbar.style.backgroundImage = `url('${ASSETS.topBar()}')`;
        const title = document.createElement("div");
        title.className = "ku-topbar-title";
        title.textContent = "KOSMICZNE UKŁADY";
        const btns = document.createElement("div");
        btns.className = "ku-topbar-btns";
        // Sound button with ico_sound_on/off.svg + btn_circle_bg.png
        const soundBtn = this.createTopbarBtn(this.state.muted ? ASSETS.icoSoundOff() : ASSETS.icoSoundOn(), this.state.muted ? "Włącz dźwięk" : "Wycisz dźwięk", () => {
            this.state.muted = !this.state.muted;
            _muted = this.state.muted;
            const ico = soundBtn.querySelector("img");
            if (ico)
                ico.src = this.state.muted ? ASSETS.icoSoundOff() : ASSETS.icoSoundOn();
            soundBtn.setAttribute("aria-label", this.state.muted ? "Włącz dźwięk" : "Wycisz dźwięk");
            playClick();
            this.saveState();
        });
        // Help button with ico_help_ico.svg
        const helpBtn = this.createTopbarBtn(ASSETS.icoHelp(), "Instrukcja", () => { playClick(); this.showOnboarding(); });
        // Settings button with ico_setting.svg
        const settingsBtn = this.createTopbarBtn(ASSETS.icoSetting(), "Ustawienia", () => { playClick(); this.showSettings(); });
        btns.appendChild(soundBtn);
        btns.appendChild(helpBtn);
        btns.appendChild(settingsBtn);
        topbar.appendChild(title);
        topbar.appendChild(btns);
        // Content area
        const content = document.createElement("div");
        content.className = "ku-content";
        // Background with bg_all.png
        const bg = document.createElement("div");
        bg.className = "ku-bg";
        bg.style.backgroundImage = `url('${ASSETS.bg()}')`;
        content.appendChild(bg);
        // Screens
        content.appendChild(this.buildWelcomeScreen());
        content.appendChild(this.buildGameScreen());
        content.appendChild(this.buildModelScreen());
        // Overlay for popups
        this.overlay = document.createElement("div");
        this.overlay.className = "ku-overlay";
        this.overlay.setAttribute("role", "dialog");
        content.appendChild(this.overlay);
        // Onboarding overlay
        this.onboardOverlay = document.createElement("div");
        this.onboardOverlay.className = "ku-onboarding-overlay";
        content.appendChild(this.onboardOverlay);
        this.root.appendChild(topbar);
        this.root.appendChild(content);
        this.container.appendChild(this.root);
    }
    createTopbarBtn(iconSrc, label, onClick) {
        const btn = document.createElement("button");
        btn.className = "ku-topbar-btn";
        btn.style.backgroundImage = `url('${ASSETS.btnCircle()}')`;
        btn.setAttribute("aria-label", label);
        btn.setAttribute("title", label);
        const ico = document.createElement("img");
        ico.src = iconSrc;
        ico.alt = label;
        btn.appendChild(ico);
        btn.addEventListener("click", onClick);
        return btn;
    }
    // ─── WELCOME SCREEN ──────────────────────────────────────────
    buildWelcomeScreen() {
        const screen = document.createElement("div");
        screen.className = "ku-screen ku-welcome";
        screen.dataset.screen = "welcome";
        // Decorative images from rys_01-05
        const decoPositions = [
            { src: ASSETS.rys01(), style: "left: 30px; top: 20px; width: 140px;" },
            { src: ASSETS.rys02(), style: "right: 30px; top: 20px; width: 140px;" },
            { src: ASSETS.rys03(), style: "left: 50px; bottom: 30px; width: 120px;" },
            { src: ASSETS.rys04(), style: "right: 50px; bottom: 30px; width: 120px;" },
            { src: ASSETS.rys05(), style: "left: 50%; bottom: 10px; transform: translateX(-50%); width: 100px;" },
        ];
        for (const d of decoPositions) {
            const deco = document.createElement("div");
            deco.className = "ku-deco";
            deco.setAttribute("style", d.style);
            const decoImg = document.createElement("img");
            decoImg.src = d.src;
            decoImg.alt = "";
            decoImg.setAttribute("aria-hidden", "true");
            deco.appendChild(decoImg);
            screen.appendChild(deco);
        }
        const popup = document.createElement("div");
        popup.className = "ku-welcome-popup";
        popup.style.position = "relative";
        popup.style.zIndex = "2";
        // Clipboard icon
        const clipIcon = document.createElement("img");
        clipIcon.className = "ku-clipboard-icon";
        clipIcon.src = ASSETS.icoClipboard();
        clipIcon.alt = "Zadanie";
        popup.appendChild(clipIcon);
        const h1 = document.createElement("div");
        h1.className = "ku-welcome-title";
        h1.textContent = "Witaj w grze";
        popup.appendChild(h1);
        // Separator with sep_500.png
        const sep1 = document.createElement("img");
        sep1.className = "ku-sep-img";
        sep1.src = ASSETS.sep500();
        sep1.alt = "";
        sep1.setAttribute("aria-hidden", "true");
        popup.appendChild(sep1);
        const text = document.createElement("div");
        text.className = "ku-welcome-text";
        text.innerHTML = "Poznaj trzy historyczne modele układu słonecznego stworzone przez wybitnych astronomów: <strong>Ptolemeusza</strong>, <strong>Kopernika</strong> i <strong>Keplera</strong>. Kliknij portret astronoma, aby poznać jego biografię i zobaczyć interaktywny model układu planetarnego.";
        popup.appendChild(text);
        // Separator with sep_980.png
        const sep2 = document.createElement("img");
        sep2.className = "ku-sep-img";
        sep2.src = ASSETS.sep980();
        sep2.alt = "";
        sep2.setAttribute("aria-hidden", "true");
        popup.appendChild(sep2);
        const btnsDiv = document.createElement("div");
        btnsDiv.className = "ku-welcome-btns";
        const settingsBtn = this.createBtn("USTAWIENIA", "280", () => {
            playClick();
            this.showSettings();
        });
        const startBtn = this.createBtn("ROZPOCZNIJ", "280", () => {
            playClick();
            this.showScreen("game");
            if (!this.state.onboardDone)
                this.showOnboarding();
        });
        btnsDiv.appendChild(settingsBtn);
        btnsDiv.appendChild(startBtn);
        popup.appendChild(btnsDiv);
        screen.appendChild(popup);
        return screen;
    }
    // ─── GAME SCREEN ─────────────────────────────────────────────
    buildGameScreen() {
        const screen = document.createElement("div");
        screen.className = "ku-screen ku-game";
        screen.dataset.screen = "game";
        // Portraits panel
        const panel = document.createElement("div");
        panel.className = "ku-portraits-panel";
        for (let i = 0; i < ASTRONOMERS.length; i++) {
            const a = ASTRONOMERS[i];
            const wrap = document.createElement("div");
            wrap.style.cssText = "text-align: center !important;";
            const btn = document.createElement("button");
            btn.className = "ku-portrait-btn" + (i === this.state.astronomer ? " ku-active-portrait" : "");
            btn.setAttribute("aria-label", a.name);
            btn.dataset.index = String(i);
            const pImg = document.createElement("img");
            pImg.src = a.portrait();
            pImg.alt = a.name;
            // Hover effect for Kopernik (pp_02 -> pp_02_over)
            btn.addEventListener("mouseenter", () => {
                pImg.src = a.portraitOver();
                playHover();
            });
            btn.addEventListener("mouseleave", () => {
                pImg.src = a.portrait();
            });
            btn.addEventListener("click", () => {
                playClick();
                this.selectAstronomer(i);
                this.showBiography(i);
            });
            btn.appendChild(pImg);
            wrap.appendChild(btn);
            const name = document.createElement("div");
            name.className = "ku-portrait-name";
            name.textContent = a.name;
            wrap.appendChild(name);
            panel.appendChild(wrap);
        }
        screen.appendChild(panel);
        // Canvas area
        const canvasArea = document.createElement("div");
        canvasArea.className = "ku-canvas-area";
        const canvas = document.createElement("canvas");
        canvas.className = "ku-solar-canvas";
        canvas.width = GAME_W - 190;
        canvas.height = GAME_H - TOPBAR_H;
        // Tooltip
        const tooltip = document.createElement("div");
        tooltip.className = "ku-tooltip";
        const ttName = document.createElement("div");
        ttName.className = "ku-tooltip-name";
        const ttType = document.createElement("div");
        ttType.className = "ku-tooltip-type";
        tooltip.appendChild(ttName);
        tooltip.appendChild(ttType);
        // Model title
        const modelTitle = document.createElement("div");
        modelTitle.className = "ku-model-title";
        modelTitle.textContent = ASTRONOMERS[this.state.astronomer].modelTitle;
        canvasArea.appendChild(canvas);
        canvasArea.appendChild(tooltip);
        canvasArea.appendChild(modelTitle);
        // Zoom controls
        const zoomDiv = document.createElement("div");
        zoomDiv.className = "ku-zoom-controls";
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
        zoomReset.setAttribute("aria-label", "Resetuj widok");
        zoomReset.addEventListener("click", () => { playClick(); this.engine?.resetView(); });
        zoomDiv.appendChild(zoomIn);
        zoomDiv.appendChild(zoomOut);
        zoomDiv.appendChild(zoomReset);
        canvasArea.appendChild(zoomDiv);
        screen.appendChild(canvasArea);
        // Initialize canvas engine
        this.engine = new CanvasEngine(canvas, tooltip);
        this.engine.setModel(ASTRONOMERS[this.state.astronomer].modelType);
        return screen;
    }
    // ─── MODEL SCREEN ────────────────────────────────────────────
    buildModelScreen() {
        const screen = document.createElement("div");
        screen.className = "ku-screen ku-model";
        screen.dataset.screen = "model";
        const container = document.createElement("div");
        container.className = "ku-model-container";
        const header = document.createElement("div");
        header.className = "ku-model-header";
        const heading = document.createElement("div");
        heading.className = "ku-model-heading";
        heading.textContent = "";
        header.appendChild(heading);
        const canvasWrap = document.createElement("div");
        canvasWrap.className = "ku-model-canvas-wrap";
        const canvas = document.createElement("canvas");
        canvas.className = "ku-model-canvas";
        canvas.width = 900;
        canvas.height = 700;
        canvasWrap.appendChild(canvas);
        const footer = document.createElement("div");
        footer.className = "ku-model-footer";
        const backBtn = this.createBtn("\u2190 POWRÓT", "280", () => {
            playClick();
            this.showScreen("game");
        });
        footer.appendChild(backBtn);
        container.appendChild(header);
        container.appendChild(canvasWrap);
        container.appendChild(footer);
        screen.appendChild(container);
        return screen;
    }
    // ─── BUTTON FACTORY ──────────────────────────────────────────
    createBtn(text, size, onClick) {
        const btn = document.createElement("button");
        btn.className = `ku-btn ku-btn-${size}`;
        const bgMap = {
            "280": ASSETS.btn280,
            "420": ASSETS.btn420,
            "620": ASSETS.btn620,
        };
        btn.style.backgroundImage = `url('${bgMap[size]()}')`;
        btn.textContent = text;
        btn.addEventListener("click", onClick);
        return btn;
    }
    // ─── SCREEN MANAGEMENT ───────────────────────────────────────
    showScreen(name) {
        if (!this.root)
            return;
        this.state.screen = name;
        const screens = this.root.querySelectorAll(".ku-screen");
        screens.forEach((s) => {
            s.classList.toggle("ku-active", s.dataset.screen === name);
        });
        if (name === "game") {
            this.engine?.setModel(ASTRONOMERS[this.state.astronomer].modelType);
            this.engine?.start();
            // Update model title
            const titleEl = this.root.querySelector(".ku-model-title");
            if (titleEl)
                titleEl.textContent = ASTRONOMERS[this.state.astronomer].modelTitle;
        }
        else {
            this.engine?.stop();
        }
        if (name === "model") {
            this.renderModelScreen();
        }
        this.closeOverlay();
        this.saveState();
    }
    renderModelScreen() {
        if (!this.root)
            return;
        const a = ASTRONOMERS[this.state.astronomer];
        const heading = this.root.querySelector(".ku-model-heading");
        if (heading)
            heading.textContent = a.modelTitle;
        const canvas = this.root.querySelector(".ku-model-canvas");
        if (canvas)
            renderModelCanvas(canvas, a.modelType);
    }
    selectAstronomer(index) {
        this.state.astronomer = index;
        if (!this.root)
            return;
        // Update portrait active state
        const btns = this.root.querySelectorAll(".ku-portrait-btn");
        btns.forEach((b, i) => {
            b.classList.toggle("ku-active-portrait", i === index);
        });
        // Update model
        this.engine?.setModel(ASTRONOMERS[index].modelType);
        // Update title
        const titleEl = this.root.querySelector(".ku-model-title");
        if (titleEl)
            titleEl.textContent = ASTRONOMERS[index].modelTitle;
        this.saveState();
    }
    // ─── BIOGRAPHY POPUP ─────────────────────────────────────────
    showBiography(index) {
        if (!this.overlay)
            return;
        const a = ASTRONOMERS[index];
        const popup = document.createElement("div");
        popup.className = "ku-bio-popup";
        popup.style.backgroundImage = `url('${ASSETS.popupBg()}')`;
        popup.setAttribute("role", "dialog");
        popup.setAttribute("aria-label", `Biografia: ${a.name}`);
        // Close button
        const closeBtn = document.createElement("button");
        closeBtn.className = "ku-bio-close";
        closeBtn.innerHTML = "✕";
        closeBtn.setAttribute("aria-label", "Zamknij");
        closeBtn.addEventListener("click", () => { playClick(); this.closeOverlay(); });
        popup.appendChild(closeBtn);
        // Header with portrait
        const header = document.createElement("div");
        header.className = "ku-bio-header";
        const portrait = document.createElement("img");
        portrait.className = "ku-bio-portrait";
        portrait.src = a.bioPicture();
        portrait.alt = a.name;
        const info = document.createElement("div");
        info.className = "ku-bio-info";
        const name = document.createElement("div");
        name.className = "ku-bio-name";
        name.textContent = a.name;
        const years = document.createElement("div");
        years.className = "ku-bio-years";
        years.textContent = a.years;
        info.appendChild(name);
        info.appendChild(years);
        header.appendChild(portrait);
        header.appendChild(info);
        popup.appendChild(header);
        // Separator
        const sep = document.createElement("img");
        sep.className = "ku-sep-img";
        sep.src = ASSETS.sep500();
        sep.alt = "";
        sep.setAttribute("aria-hidden", "true");
        popup.appendChild(sep);
        // Bio text
        const text = document.createElement("div");
        text.className = "ku-bio-text";
        text.innerHTML = a.bio;
        popup.appendChild(text);
        // Buttons
        const btnsDiv = document.createElement("div");
        btnsDiv.className = "ku-bio-btns";
        const modelBtn = this.createBtn(`UKŁAD SŁONECZNY ${a.name.split(" ").pop()?.toUpperCase() || ""}`, "420", () => {
            playClick();
            this.closeOverlay();
            this.showScreen("model");
        });
        const closeBtn2 = this.createBtn("ZAMKNIJ", "280", () => {
            playClick();
            this.closeOverlay();
        });
        btnsDiv.appendChild(modelBtn);
        btnsDiv.appendChild(closeBtn2);
        popup.appendChild(btnsDiv);
        this.overlay.innerHTML = "";
        this.overlay.appendChild(popup);
        this.overlay.classList.add("ku-visible");
    }
    closeOverlay() {
        if (this.overlay) {
            this.overlay.classList.remove("ku-visible");
            this.overlay.innerHTML = "";
        }
    }
    // ─── ONBOARDING ──────────────────────────────────────────────
    showOnboarding() {
        if (!this.onboardOverlay)
            return;
        const steps = [
            {
                icon: ASSETS.icoHelp(),
                title: "Nawigacja",
                text: "Użyj kółka myszy aby przybliżać i oddalać mapę. Kliknij i przeciągnij aby przesuwać widok. Na urządzeniach dotykowych użyj gestu szczypania i przeciągania.",
            },
            {
                icon: ASSETS.icoSetting(),
                title: "Interakcje",
                text: "Kliknij portret astronoma po lewej stronie, aby poznać jego biografię i zobaczyć model układu słonecznego. Najedź kursorem na planetę, aby zobaczyć jej nazwę i typ.",
            },
            {
                icon: ASSETS.icoSetting(),
                title: "Dostępność",
                text: "Kliknij ikonę ustawień (⚙️) w prawym górnym rogu, aby dostosować wielkość tekstu, kontrast, filtry kolorów i inne opcje dostępności.",
            },
        ];
        let currentStep = 0;
        const render = () => {
            if (!this.onboardOverlay)
                return;
            const step = steps[currentStep];
            const card = document.createElement("div");
            card.className = "ku-onboarding-card";
            card.style.backgroundImage = `url('${ASSETS.popupBg()}')`;
            const icon = document.createElement("img");
            icon.className = "ku-onboarding-icon";
            icon.src = step.icon;
            icon.alt = step.title;
            card.appendChild(icon);
            const title = document.createElement("div");
            title.className = "ku-onboarding-title";
            title.textContent = step.title;
            card.appendChild(title);
            const text = document.createElement("div");
            text.className = "ku-onboarding-text";
            text.textContent = step.text;
            card.appendChild(text);
            // Dots
            const dots = document.createElement("div");
            dots.className = "ku-onboarding-dots";
            for (let i = 0; i < steps.length; i++) {
                const dot = document.createElement("div");
                dot.className = "ku-onboarding-dot" + (i === currentStep ? " ku-active" : "");
                dots.appendChild(dot);
            }
            card.appendChild(dots);
            // Buttons
            const btnsDiv = document.createElement("div");
            btnsDiv.className = "ku-onboarding-btns";
            if (currentStep === 0) {
                const skipBtn = this.createBtn("POMIŃ", "280", () => {
                    playClick();
                    this.state.onboardDone = true;
                    this.onboardOverlay.classList.remove("ku-visible");
                    this.onboardOverlay.innerHTML = "";
                    this.saveState();
                });
                const nextBtn = this.createBtn("DALEJ", "280", () => {
                    playClick();
                    currentStep++;
                    render();
                });
                btnsDiv.appendChild(skipBtn);
                btnsDiv.appendChild(nextBtn);
            }
            else if (currentStep < steps.length - 1) {
                const backBtn = this.createBtn("COFNIJ", "280", () => {
                    playClick();
                    currentStep--;
                    render();
                });
                const nextBtn = this.createBtn("DALEJ", "280", () => {
                    playClick();
                    currentStep++;
                    render();
                });
                btnsDiv.appendChild(backBtn);
                btnsDiv.appendChild(nextBtn);
            }
            else {
                const backBtn = this.createBtn("COFNIJ", "280", () => {
                    playClick();
                    currentStep--;
                    render();
                });
                const closeBtn = this.createBtn("ZAMKNIJ", "280", () => {
                    playClick();
                    this.state.onboardDone = true;
                    this.onboardOverlay.classList.remove("ku-visible");
                    this.onboardOverlay.innerHTML = "";
                    this.saveState();
                });
                btnsDiv.appendChild(backBtn);
                btnsDiv.appendChild(closeBtn);
            }
            card.appendChild(btnsDiv);
            this.onboardOverlay.innerHTML = "";
            this.onboardOverlay.appendChild(card);
            this.onboardOverlay.classList.add("ku-visible");
        };
        render();
    }
    // ─── SETTINGS PANEL ──────────────────────────────────────────
    showSettings() {
        if (!this.overlay)
            return;
        const w = this.state.wcag;
        const panel = document.createElement("div");
        panel.className = "ku-settings-panel";
        panel.style.backgroundImage = `url('${ASSETS.popupBg()}')`;
        panel.setAttribute("role", "dialog");
        panel.setAttribute("aria-label", "Ustawienia dostępności");
        const title = document.createElement("div");
        title.className = "ku-settings-title";
        title.textContent = "USTAWIENIA";
        panel.appendChild(title);
        // Separator
        const sep = document.createElement("img");
        sep.className = "ku-settings-sep";
        sep.src = ASSETS.sep500();
        sep.alt = "";
        sep.setAttribute("aria-hidden", "true");
        panel.appendChild(sep);
        const grid = document.createElement("div");
        grid.className = "ku-settings-grid";
        // Text size
        grid.appendChild(this.buildSettingsRow("Wielkość tekstu", () => {
            const ctrl = document.createElement("div");
            ctrl.className = "ku-settings-controls";
            for (let s = 1; s <= 3; s++) {
                const btn = document.createElement("button");
                btn.className = "ku-size-btn" + (w.textSize === s ? " ku-active" : "");
                btn.textContent = "A";
                btn.style.fontSize = (12 + s * 4) + "px";
                btn.setAttribute("aria-label", `Rozmiar ${s}`);
                btn.addEventListener("click", () => {
                    w.textSize = s;
                    ctrl.querySelectorAll(".ku-size-btn").forEach((b, i) => {
                        b.classList.toggle("ku-active", i + 1 === s);
                    });
                });
                ctrl.appendChild(btn);
            }
            return ctrl;
        }));
        // Narrator
        grid.appendChild(this.buildSettingsRow("Wypowiedź lektora", () => {
            return this.buildToggle(w.narrator, (v) => { w.narrator = v; });
        }));
        // Audio description
        grid.appendChild(this.buildSettingsRow("Audiodeskrypcja", () => {
            return this.buildToggle(w.audioDesc, (v) => { w.audioDesc = v; });
        }));
        // Orbits visibility
        grid.appendChild(this.buildSettingsRow("Widoczność orbit", () => {
            return this.buildToggle(w.orbitsVisible, (v) => {
                w.orbitsVisible = v;
                this.engine?.setOrbitsVisible(v);
            });
        }));
        // High contrast
        grid.appendChild(this.buildSettingsRow("Tryb wysokiego kontrastu", () => {
            return this.buildToggle(w.highContrast, (v) => { w.highContrast = v; });
        }));
        // Reduce motion
        grid.appendChild(this.buildSettingsRow("Redukcja ruchu", () => {
            return this.buildToggle(w.reduceMotion, (v) => {
                w.reduceMotion = v;
                this.engine?.setReduceMotion(v);
            });
        }));
        // Color filter
        grid.appendChild(this.buildSettingsRow("Filtr kolorów", () => {
            const wrap = document.createElement("div");
            const sel = document.createElement("select");
            sel.className = "ku-select";
            const options = [
                { value: "none", label: "Brak" },
                { value: "protanopia", label: "Protanopia" },
                { value: "deuteranopia", label: "Deuteranopia" },
                { value: "tritanopia", label: "Tritanopia" },
                { value: "grayscale", label: "Skala szarości" },
            ];
            for (const o of options) {
                const opt = document.createElement("option");
                opt.value = o.value;
                opt.textContent = o.label;
                if (w.colorFilter === o.value)
                    opt.selected = true;
                sel.appendChild(opt);
            }
            sel.addEventListener("change", () => {
                w.colorFilter = sel.value;
            });
            wrap.appendChild(sel);
            return wrap;
        }));
        panel.appendChild(grid);
        // Footer with ZAPISZ button
        const footer = document.createElement("div");
        footer.className = "ku-settings-footer";
        const saveBtn = document.createElement("button");
        saveBtn.className = "ku-btn ku-btn-280";
        saveBtn.style.backgroundImage = `url('${ASSETS.btn280()}')`;
        saveBtn.textContent = "ZAPISZ";
        saveBtn.addEventListener("click", () => {
            playClick();
            this.applyWcag();
            this.saveState();
            this.closeOverlay();
        });
        footer.appendChild(saveBtn);
        panel.appendChild(footer);
        this.overlay.innerHTML = "";
        this.overlay.appendChild(panel);
        this.overlay.classList.add("ku-visible");
        setTimeout(() => saveBtn.focus(), 50);
    }
    buildSettingsRow(label, buildControl) {
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
    buildToggle(initial, onChange) {
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
    applyWcag() {
        if (!this.root)
            return;
        const w = this.state.wcag;
        this.root.classList.remove("ku-size-1", "ku-size-2", "ku-size-3");
        this.root.classList.add(`ku-size-${w.textSize}`);
        this.root.classList.toggle("ku-high-contrast", w.highContrast);
        this.root.classList.toggle("ku-reduce-motion", w.reduceMotion);
        this.engine?.setReduceMotion(w.reduceMotion);
        this.engine?.setOrbitsVisible(w.orbitsVisible);
        this.root.classList.remove("ku-filter-grayscale", "ku-filter-protanopia", "ku-filter-deuteranopia", "ku-filter-tritanopia");
        if (w.colorFilter !== "none") {
            this.root.classList.add(`ku-filter-${w.colorFilter}`);
        }
    }
    // ─── SCALING ──────────────────────────────────────────────────
    scaleRoot() {
        if (!this.root)
            return;
        const cw = this.container.clientWidth || GAME_W;
        const ch = this.container.clientHeight || GAME_H;
        const scaleX = cw / GAME_W;
        const scaleY = ch / GAME_H;
        const scale = Math.min(scaleX, scaleY);
        this.root.style.transform = `scale(${scale})`;
        this.container.style.height = Math.round(GAME_H * scale) + "px";
        this.container.style.overflow = "hidden";
    }
    setupResizeObserver() {
        if (typeof ResizeObserver === "undefined")
            return;
        this.resizeObserver = new ResizeObserver(() => this.scaleRoot());
        this.resizeObserver.observe(this.container);
    }
}
// ═══════════════════════════════════════════════════════════════════
// ZPE LIFECYCLE EXPORTS
// ═══════════════════════════════════════════════════════════════════
let _app = null;
async function init(container) {
    _app = new App(container);
    _app.mount();
}
async function run(stateData, isFrozen) {
    if (stateData && _app)
        _app.restoreState(stateData);
    if (isFrozen && _app)
        _app.freeze();
    else if (_app)
        _app.resume();
}
async function unload() {
    _app?.removeListeners();
}
async function destroy() {
    _app?.unmount();
    _app = null;
}

;// ./src/main.ts


// Główna funkcja eksportowana do ZPE
// Inicjalizuje, uruchamia i niszczy aplikację
/* harmony default export */ const main = (create(init, run, unload, destroy));

/******/ 	return __webpack_exports__;
/******/ })()
;
});;