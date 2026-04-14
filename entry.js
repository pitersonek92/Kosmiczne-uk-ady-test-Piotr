define(function() { return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ main; }
});

;// ./src/zpe-port/index.ts
// ============================================================
// ZPE-Port — local implementation
// Compatible with ZPE-Port 2.0 API (zpe-projekty/zpe-port)
// ============================================================
// Module-level storage — set by init(), used by path(), getData(), setState()
var _exerciseApi = null;
var _engineOptions = null;
var _state = null;
var _isFrozen = false;
var _isRunning = false;
/**
 * Resolves a resource path using the ZPE platform API.
 * ZPE exposes its CDN resolver via api.enginePath().
 */
function path(relativePath) {
    var cleanPath = relativePath.startsWith('/') ? relativePath.substring(1) : relativePath;
    // 1. Use stored API from init()
    if (_exerciseApi && typeof _exerciseApi.enginePath === 'function') {
        try {
            return _exerciseApi.enginePath(cleanPath);
        }
        catch (_) { }
    }
    // 2. Try global _exerciseApi (injected by ZPE platform)
    var globalApi = (typeof window !== 'undefined') ? window._exerciseApi : undefined;
    if (globalApi && typeof globalApi.enginePath === 'function') {
        try {
            return globalApi.enginePath(cleanPath);
        }
        catch (_) { }
    }
    // 3. Try __ZPE_BASE_URL__ (detected from script src)
    if (typeof window !== 'undefined' && window.__ZPE_BASE_URL__) {
        var base = window.__ZPE_BASE_URL__;
        if (!base.endsWith('/'))
            base += '/';
        return base + cleanPath;
    }
    // 4. Detect base URL from entry.js script tag
    if (typeof document !== 'undefined') {
        var scripts = document.getElementsByTagName('script');
        for (var i = 0; i < scripts.length; i++) {
            var src = scripts[i].src;
            if (src && (src.indexOf('entry.js') !== -1 || src.indexOf('loader.js') !== -1)) {
                var lastSlash = src.lastIndexOf('/');
                var detected = lastSlash !== -1 ? src.substring(0, lastSlash + 1) : './';
                window.__ZPE_BASE_URL__ = detected;
                return detected + cleanPath;
            }
        }
    }
    // 5. Fallback: return path as-is (local dev)
    return cleanPath;
}
/**
 * Returns the engine data (defaultData from engine.json editor section).
 */
function getData() {
    if (_engineOptions && _engineOptions.data) {
        return JSON.parse(JSON.stringify(_engineOptions.data));
    }
    return {};
}
/**
 * Creates a ZPE-compatible engine factory.
 *
 * export default ZPE.create(init, run, unload, destroy);
 *
 * ZPE platform calls:
 *   engine.init(container, api, options)  — sets up, calls initFn(container)
 *   engine.setState(stateData)            — restores state, calls runFn(state, frozen)
 *   engine.getState()                     — returns current state
 *   engine.setStateFrozen(value)          — toggles frozen mode
 *   engine.destroy(container)             — calls unloadFn then destroyFn
 */
function create(initFn, runFn, unloadFn, destroyFn) {
    return function engineFactory() {
        return {
            init: function (container, api, options) {
                _exerciseApi = api;
                _engineOptions = options;
                _state = null;
                _isFrozen = false;
                _isRunning = false;
                return initFn(container).catch(function (e) {
                    console.error('[ZPEPort] init error:', e);
                });
            },
            setState: function (stateData) {
                _state = (stateData && typeof stateData === 'object') ? stateData : null;
                _isFrozen = false;
                var self = this;
                // If already running, call unload first
                var unloadPromise;
                if (_isRunning) {
                    try {
                        var r = unloadFn();
                        unloadPromise = (r instanceof Promise) ? r : Promise.resolve();
                    }
                    catch (e) {
                        unloadPromise = Promise.resolve();
                    }
                }
                else {
                    unloadPromise = Promise.resolve();
                }
                unloadPromise.then(function () {
                    try {
                        var result = runFn(JSON.parse(JSON.stringify(_state)), _isFrozen);
                        if (result instanceof Promise)
                            return result;
                    }
                    catch (e) {
                        console.error('[ZPEPort] run error:', e);
                    }
                    _isRunning = true;
                });
            },
            getState: function () {
                return _state;
            },
            setStateFrozen: function (value) {
                _isFrozen = value;
            },
            getStateProgress: function (_data) {
                return {};
            },
            destroy: function (_container) {
                return Promise.resolve().then(function () {
                    try {
                        var r = unloadFn();
                        if (r instanceof Promise)
                            return r;
                    }
                    catch (e) { }
                }).then(function () {
                    try {
                        var r = destroyFn();
                        if (r instanceof Promise)
                            return r;
                    }
                    catch (e) { }
                    _isRunning = false;
                });
            }
        };
    };
}

;// ./src/data.ts
// ============================================================
// DATA.TS — Dane planet, astronomów, stanu aplikacji
// Kosmiczne Układy v1.0 | Vanta AI Studio
// ============================================================
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var ASTRONOMERS = [
    {
        id: 'ptolemeusz',
        name: 'Ptolemeusz',
        portrait: 'pp_01.png',
        portraitHover: 'pp_01.png',
        bioPic: 'pp_01.png',
        bio: "<p>Klaudiusz Ptolemeusz (ok. 100\u2013170 n.e.) by\u0142 greckim astronomem, matematykiem i geografem, dzia\u0142aj\u0105cym w Aleksandrii. Stworzy\u0142 geocentryczny model Wszech\u015Bwiata opisany w dziele <em>Almagest</em>, kt\u00F3ry dominowa\u0142 przez ponad 1400 lat.</p>\n<p>Wed\u0142ug modelu Ptolemeusza <strong>Ziemia znajdowa\u0142a si\u0119 w centrum Wszech\u015Bwiata</strong>, a S\u0142o\u0144ce, Ksi\u0119\u017Cyc i planety kr\u0105\u017Cy\u0142y wok\u00F3\u0142 niej po skomplikowanych torach zwanych epicyklami.</p>",
        modelTitle: 'Układ słoneczny Ptolemeusza',
        screenTitle: 'Geocentryczny model układu słonecznego',
        planets: [
            { id: 'ziemia', name: 'Ziemia', r: 22, orbit: 0, speed: 0, glow: false, clr: '#4488cc', palette: { h: '#88ccff', c: '#2266aa', d: '#0a2244', atm: 'rgba(80,140,255,0.5)' },
                desc: 'Centrum Wszechświata według Ptolemeusza. Ziemia stała nieruchomo, a Słońce, Księżyc i planety krążyły wokół niej.',
                stats: [{ l: 'Pozycja:', v: 'Centrum Wszechświata' }, { l: 'Ruch:', v: 'Nieruchoma' }, { l: 'Model:', v: 'Geocentryczny' }, { l: 'Autor:', v: 'Ptolemeusz, ok. 150 n.e.' }] },
            { id: 'ksiezyc', name: 'Księżyc', r: 10, orbit: 65, speed: 2.0, glow: false, clr: '#c8c8c8', palette: { h: '#e0e0e0', c: '#999', d: '#555' },
                desc: 'Pierwsza sfera niebieska wokół Ziemi. Księżyc wyznaczał granicę między światem ziemskim a niebiańskim.',
                stats: [{ l: 'Sfera:', v: '1. (najbliższa Ziemi)' }, { l: 'Okres obiegu:', v: 'ok. 27 dni' }, { l: 'Rola:', v: 'Granica ziemsko-niebieska' }, { l: 'Widzialność:', v: 'Gołym okiem' }] },
            { id: 'merkury_p', name: 'Merkury', r: 9, orbit: 105, speed: 1.6, glow: false, clr: '#aaaaaa', palette: { h: '#e0e0e0', c: '#999', d: '#555' },
                desc: 'Poruszał się po epicyklach — małych kołach na głównych orbitach. Tłumaczyło to pozorny ruch wsteczny planety na tle gwiazd.',
                stats: [{ l: 'Sfera:', v: '2.' }, { l: 'Ruch:', v: 'Epicykle' }, { l: 'Okres obiegu:', v: 'ok. 116 dni' }, { l: 'Widoczność:', v: 'Nisko nad horyzontem' }] },
            { id: 'wenus_p', name: 'Wenus', r: 13, orbit: 150, speed: 1.1, glow: false, clr: '#e8c060', palette: { h: '#ffe8a0', c: '#d4a840', d: '#806020', atm: 'rgba(255,220,120,0.5)' },
                desc: 'Najjaśniejsza po Słońcu i Księżycu. Tak jak Merkury, poruszała się po epicyklach, blisko Słońca na niebie.',
                stats: [{ l: 'Sfera:', v: '3.' }, { l: 'Ruch:', v: 'Epicykle' }, { l: 'Okres obiegu:', v: 'ok. 584 dni' }, { l: 'Jasność:', v: 'Najjaśniejsza planeta' }] },
            { id: 'slonce_p', name: 'Słońce', r: 22, orbit: 205, speed: 0.75, glow: true, clr: '#FFA500',
                desc: 'W modelu Ptolemeusza Słońce krążyło wokół nieruchomej Ziemi. Jego roczna wędrówka po nieboskłonie wyznaczała pory roku.',
                stats: [{ l: 'Sfera:', v: '4. (środkowa)' }, { l: 'Okres obiegu:', v: '365,25 dnia' }, { l: 'Rola:', v: 'Wyznacza pory roku' }, { l: 'Epicykle:', v: 'Nie' }] },
            { id: 'mars_p', name: 'Mars', r: 12, orbit: 258, speed: 0.55, glow: false, clr: '#cc4422', palette: { h: '#ee8866', c: '#aa3311', d: '#551108', atm: 'rgba(200,80,40,0.5)' },
                desc: 'Dla wytłumaczenia zmiennej prędkości Marsa Ptolemeusz wprowadził punktum ekwans — punkt równomiernego ruchu kątowego.',
                stats: [{ l: 'Sfera:', v: '5.' }, { l: 'Okres obiegu:', v: 'ok. 780 dni' }, { l: 'Ruch wsteczny:', v: 'Tak (epicykle)' }, { l: 'Barwa:', v: 'Czerwona' }] },
            { id: 'jowisz_p', name: 'Jowisz', r: 17, orbit: 315, speed: 0.36, glow: false, clr: '#c8a060', palette: { h: '#f0d090', c: '#a07030', d: '#503010', bands: true },
                desc: 'Jedna z dwóch najdalszych planet w modelu Ptolemeusza. Powolny ruch po szerokich epicyklach, okres obiegu ok. 12 lat.',
                stats: [{ l: 'Sfera:', v: '6.' }, { l: 'Okres obiegu:', v: 'ok. 12 lat' }, { l: 'Ruch wsteczny:', v: 'Tak (epicykle)' }, { l: 'Barwa:', v: 'Żółtawa' }] },
        ]
    },
    {
        id: 'kopernik',
        name: 'Mikołaj Kopernik',
        portrait: 'pp_02.png',
        portraitHover: 'pp_02_over.png',
        bioPic: 'kopernik.png',
        bio: "<p><strong>Miko\u0142aj Kopernik</strong> by\u0142 wybitnym polskim astronomem, matematykiem, lekarzem i duchownym, \u017Cy\u0142 w latach 1473\u20131543. Urodzony w Toruniu, dorasta\u0142 we Fromborku, gdzie sp\u0119dzi\u0142 wi\u0119kszo\u015B\u0107 swojego \u017Cycia prowadz\u0105c badania.</p>\n<p>Kopernik zas\u0142yn\u0105\u0142 przede wszystkim jako <strong>tw\u00F3rca heliocentrycznej teorii budowy \u015Bwiata</strong>, wed\u0142ug kt\u00F3rej Ziemia i inne planety kr\u0105\u017C\u0105 wok\u00F3\u0142 S\u0142o\u0144ca. By\u0142a to rewolucyjna koncepcja, kt\u00F3ra zmieni\u0142a spos\u00F3b my\u015Blenia o Wszech\u015Bwiecie i zapocz\u0105tkowa\u0142a nowoczesn\u0105 astronomi\u0119.</p>",
        modelTitle: 'Układ słoneczny Mikołaja Kopernika',
        screenTitle: 'Model układu słonecznego wg. Mikołaja Kopernika',
        planets: [
            { id: 'slonce_k', name: 'Słońce', r: 30, orbit: 0, speed: 0, glow: true, clr: '#FFB700',
                desc: 'Centrum Wszechświata według Kopernika. To rewolucyjna zmiana — Słońce, nie Ziemia, stało się osią, wokół której krążą planety.',
                stats: [{ l: 'Pozycja:', v: 'Centrum Układu' }, { l: 'Ruch:', v: 'Nieruchome' }, { l: 'Przełom:', v: 'Rok 1543' }, { l: 'Dzieło:', v: 'De revolutionibus' }] },
            { id: 'merkury_k', name: 'Merkury', r: 8, orbit: 65, speed: 2.3, glow: false, clr: '#aaaaaa', palette: { h: '#e0e0e0', c: '#999', d: '#555' },
                desc: 'Pierwsza planeta od Słońca w systemie Kopernika. Jej szybki ruch po małej orbicie był argumentem za heliocentryzmem.',
                stats: [{ l: 'Kolejność:', v: '1. od Słońca' }, { l: 'Okres obiegu:', v: '88 dni (wg Kopernika)' }, { l: 'Odległość:', v: 'Najmniejsza' }, { l: 'Widzialność:', v: 'Nisko nad horyzontem' }] },
            { id: 'wenus_k', name: 'Wenus', r: 12, orbit: 110, speed: 1.55, glow: false, clr: '#e8c060', palette: { h: '#ffe8a0', c: '#d4a840', d: '#806020', atm: 'rgba(255,220,120,0.5)' },
                desc: 'Kopernik poprawnie umieścił Wenus bliżej Słońca niż Ziemię. Stąd jej fazy — podobne do księżycowych — odkryte przez Galileusza.',
                stats: [{ l: 'Kolejność:', v: '2. od Słońca' }, { l: 'Okres obiegu:', v: '225 dni (wg Kopernika)' }, { l: 'Fazy:', v: 'Tak (potwierdzenie teorii)' }, { l: 'Jasność:', v: 'Najjaśniejsza planeta' }] },
            { id: 'ziemia_k', name: 'Ziemia', r: 13, orbit: 165, speed: 1.0, glow: false, clr: '#4488cc', palette: { h: '#88ccff', c: '#2266aa', d: '#0a2244', atm: 'rgba(80,140,255,0.5)' },
                desc: 'Kopernik uczynił Ziemię zwykłą planetą — trzecią od Słońca. To fundamentalna zmiana w myśleniu o miejscu człowieka we Wszechświecie.',
                stats: [{ l: 'Kolejność:', v: '3. od Słońca' }, { l: 'Okres obiegu:', v: '365,25 dnia' }, { l: 'Księżyc:', v: '1 naturalny satelita' }, { l: 'Rola:', v: 'Nie centrum, lecz planeta' }] },
            { id: 'mars_k', name: 'Mars', r: 11, orbit: 225, speed: 0.65, glow: false, clr: '#cc4422', palette: { h: '#ee8866', c: '#aa3311', d: '#551108', atm: 'rgba(200,80,40,0.5)' },
                desc: 'Czerwona planeta na czwartej orbicie. Kopernik obliczył jej okres obiegu na ok. 687 dni — wynik bardzo zbliżony do prawdziwego.',
                stats: [{ l: 'Kolejność:', v: '4. od Słońca' }, { l: 'Okres obiegu:', v: 'ok. 687 dni' }, { l: 'Barwa:', v: 'Czerwona' }, { l: 'Widoczność:', v: 'Gołym okiem' }] },
            { id: 'jowisz_k', name: 'Jowisz', r: 22, orbit: 300, speed: 0.33, glow: false, clr: '#c8a060', palette: { h: '#f0d090', c: '#a07030', d: '#503010', bands: true },
                desc: 'Największa planeta w modelu Kopernika. Jej wolny ruch i jasność były dobrze znane starożytnym. Kopernik podał okres 12 lat.',
                stats: [{ l: 'Kolejność:', v: '5. od Słońca' }, { l: 'Okres obiegu:', v: 'ok. 12 lat (wg Kopernika)' }, { l: 'Księżyce:', v: 'Odkryto 4 (Galileusz, 1610)' }, { l: 'Barwa:', v: 'Żółtawa, z pasami' }] },
            { id: 'saturn_k', name: 'Saturn', r: 20, orbit: 375, speed: 0.20, glow: false, clr: '#d4b870', ring: true, palette: { h: '#f8e0a0', c: '#b09040', d: '#604808', bands: true },
                desc: 'Najdalsza znana planeta w modelu Kopernika. Jej powolny ruch (ok. 30 lat) był łatwy do zaobserwowania przez stulecia.',
                stats: [{ l: 'Kolejność:', v: '6. od Słońca (ostatnia)' }, { l: 'Okres obiegu:', v: 'ok. 30 lat (wg Kopernika)' }, { l: 'Pierścienie:', v: 'Odkryto przez Huyghensa (1655)' }, { l: 'Barwa:', v: 'Jasna, złotawa' }] },
        ]
    },
    {
        id: 'wspolczesny',
        name: 'Współczesny widok na układ słoneczny',
        portrait: 'pp_03.png',
        portraitHover: 'pp_03.png',
        bioPic: 'pp_03.png',
        bio: "<p><strong>Wsp\u00F3\u0142czesny model uk\u0142adu s\u0142onecznego</strong> oparty jest na obserwacjach teleskopowych i misjach kosmicznych XX i XXI w.</p>\n<p>Uk\u0142ad S\u0142oneczny liczy <strong>8 planet</strong> kr\u0105\u017C\u0105cych wok\u00F3\u0142 S\u0142o\u0144ca: Merkury, Wenus, Ziemia, Mars, Jowisz, Saturn, Uran i Neptun. Jest jednym z miliard\u00F3w uk\u0142ad\u00F3w planetarnych w Drodze Mlecznej.</p>",
        modelTitle: 'Układ słoneczny Współczesny',
        screenTitle: 'Współczesny model układu słonecznego',
        planets: [
            { id: 'slonce_w', name: 'Słońce', r: 30, orbit: 0, speed: 0, glow: true, clr: '#FFB700',
                desc: 'Gwiazda centralna Układu Słonecznego — żółty karzeł.',
                stats: [{ l: 'Typ:', v: 'Żółty karzeł (G2V)' }, { l: 'Średnica:', v: '1,39 mln km' }, { l: 'Masa:', v: '2×10³⁰ kg' }, { l: 'Temperatura:', v: '5 778 K' }] },
            { id: 'merkury_w', name: 'Merkury', r: 7, orbit: 58, speed: 2.5, glow: false, clr: '#aaaaaa', palette: { h: '#e0e0e0', c: '#999', d: '#555' },
                desc: 'Najmniejsza planeta, najbliżej Słońca. Ogromne wahania temperatur.',
                stats: [{ l: 'Odległość:', v: '57,9 mln km' }, { l: 'Rok:', v: '88 dni' }, { l: 'Średnica:', v: '4 879 km' }, { l: 'Temperatura:', v: '-180 do +430°C' }] },
            { id: 'wenus_w', name: 'Wenus', r: 11, orbit: 100, speed: 1.65, glow: false, clr: '#e8c060', palette: { h: '#ffe8a0', c: '#d4a840', d: '#806020', atm: 'rgba(255,220,120,0.5)' },
                desc: 'Najjaśniejszy punkt nieba po Słońcu i Księżycu. Gęsta atmosfera CO₂.',
                stats: [{ l: 'Odległość:', v: '108,2 mln km' }, { l: 'Rok:', v: '225 dni' }, { l: 'Średnica:', v: '12 104 km' }, { l: 'Temperatura:', v: '465°C' }] },
            { id: 'ziemia_w', name: 'Ziemia', r: 12, orbit: 148, speed: 1.0, glow: false, clr: '#4488cc', palette: { h: '#88ccff', c: '#2266aa', d: '#0a2244', atm: 'rgba(80,140,255,0.5)' },
                desc: 'Nasza planeta — jedyne znane miejsce z życiem we Wszechświecie.',
                stats: [{ l: 'Odległość:', v: '149,6 mln km' }, { l: 'Rok:', v: '365,25 dnia' }, { l: 'Średnica:', v: '12 742 km' }, { l: 'Księżyce:', v: '1' }] },
            { id: 'mars_w', name: 'Mars', r: 10, orbit: 200, speed: 0.62, glow: false, clr: '#cc4422', palette: { h: '#ee8866', c: '#aa3311', d: '#551108', atm: 'rgba(200,80,40,0.5)' },
                desc: 'Czerwona planeta. Ma najwyższy wulkan i najgłębszy kanion w Układzie.',
                stats: [{ l: 'Odległość:', v: '227,9 mln km' }, { l: 'Rok:', v: '687 dni' }, { l: 'Średnica:', v: '6 779 km' }, { l: 'Księżyce:', v: '2' }] },
            { id: 'jowisz_w', name: 'Jowisz', r: 24, orbit: 265, speed: 0.31, glow: false, clr: '#c8a060', palette: { h: '#f0d090', c: '#a07030', d: '#503010', bands: true },
                desc: 'Największa planeta — gazowy olbrzym. Wielka Czerwona Plama to burza od 350 lat.',
                stats: [{ l: 'Odległość:', v: '778,5 mln km' }, { l: 'Rok:', v: '11,86 lat' }, { l: 'Średnica:', v: '139 820 km' }, { l: 'Księżyce:', v: '95' }] },
            { id: 'saturn_w', name: 'Saturn', r: 21, orbit: 335, speed: 0.21, glow: false, clr: '#d4b870', ring: true, palette: { h: '#f8e0a0', c: '#b09040', d: '#604808', bands: true },
                desc: 'Planeta z pierścieniami z lodu i skał. Lżejsza od wody.',
                stats: [{ l: 'Odległość:', v: '1,43 mld km' }, { l: 'Rok:', v: '29,46 lat' }, { l: 'Średnica:', v: '116 460 km' }, { l: 'Księżyce:', v: '146' }] },
            { id: 'uran_w', name: 'Uran', r: 16, orbit: 400, speed: 0.12, glow: false, clr: '#7de8e8', palette: { h: '#b0ffff', c: '#40c0c0', d: '#105050', atm: 'rgba(100,230,230,0.5)' },
                desc: 'Lodowy olbrzym obraca się na boku — jego oś nachylona jest o 98°.',
                stats: [{ l: 'Odległość:', v: '2,87 mld km' }, { l: 'Rok:', v: '84 lata' }, { l: 'Średnica:', v: '50 724 km' }, { l: 'Księżyce:', v: '28' }] },
            { id: 'neptun_w', name: 'Neptun', r: 15, orbit: 460, speed: 0.08, glow: false, clr: '#3a70e8', palette: { h: '#80b0ff', c: '#2050cc', d: '#0a1866', atm: 'rgba(60,100,240,0.5)' },
                desc: 'Najbardziej oddalona planeta. Ma najsilniejsze wiatry w Układzie Słonecznym.',
                stats: [{ l: 'Odległość:', v: '4,5 mld km' }, { l: 'Rok:', v: '164,8 lat' }, { l: 'Średnica:', v: '49 244 km' }, { l: 'Księżyce:', v: '16' }] },
        ]
    }
];
var DEFAULT_WCAG = {
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
var DEFAULT_STATE = {
    currentScreen: 'welcome',
    activeAstronomerIndex: -1,
    visitedAstronomers: [],
    wcag: __assign({}, DEFAULT_WCAG)
};

;// ./src/engine.ts
// ============================================================
// ENGINE.TS — Silnik animacji Canvas
// Kosmiczne Układy v1.0 | Vanta AI Studio
// ============================================================
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// Perspective: y scale for orbit ellipses
var PERSP = 0.38;
var ZOOM_MIN = 0.3;
var ZOOM_MAX = 3.5;
var CanvasEngine = /** @class */ (function () {
    function CanvasEngine(opts) {
        var _this = this;
        this.planets = [];
        this.states = {};
        this.zoom = 1;
        this.panX = 0;
        this.panY = 0;
        this.hoveredId = null;
        this.raf = 0;
        this.paused = false;
        this.bgImage = null;
        this.bgLoaded = false;
        this.planetImages = {};
        // Mouse drag state
        this.dragStart = null;
        this.panStart = null;
        this.dragged = false;
        this.tick = function () {
            if (!_this.paused && !_this.reduceMotion) {
                _this.planets.forEach(function (p) {
                    if (p.orbit === 0)
                        return;
                    if (_this.hoveredId === p.id)
                        return;
                    _this.states[p.id].angle += p.speed * 0.007;
                });
            }
            _this.draw();
            _this.raf = requestAnimationFrame(_this.tick);
        };
        this.canvas = opts.canvas;
        this.ctx = opts.canvas.getContext('2d');
        this.showOrbits = opts.showOrbits;
        this.reduceMotion = opts.reduceMotion;
        this.onHover = opts.onHover;
        this.onLeftClick = opts.onLeftClick;
        this.onRightClick = opts.onRightClick;
        this.pathFn = opts.pathFn;
        this.setPlanets(opts.planets);
        this.bindEvents();
    }
    CanvasEngine.prototype.setPlanets = function (planets) {
        var _this = this;
        this.planets = planets;
        // Initialize angles with spread
        planets.forEach(function (p, i) {
            if (!_this.states[p.id]) {
                _this.states[p.id] = { angle: (i / planets.length) * Math.PI * 2 };
            }
        });
        this.fitZoom();
        this.loadPlanetImages();
    };
    CanvasEngine.prototype.loadBackground = function (src) {
        var _this = this;
        var img = new Image();
        img.onload = function () { _this.bgImage = img; _this.bgLoaded = true; };
        img.onerror = function () { _this.bgLoaded = true; };
        img.src = src;
    };
    CanvasEngine.prototype.loadPlanetImages = function () {
        var _this = this;
        if (!this.pathFn)
            return;
        // Mapping planet base IDs to actual asset filenames (with images/ prefix)
        var imgMap = {
            'slonce': 'images/slonce.png',
            'ziemia': 'images/ziemia.png',
            'merkury': 'images/merkury.png',
            'wenus': 'images/wenus.png',
            'mars': 'images/mars.png',
            'jowisz': 'images/jowisz.png',
            'saturn': 'images/saturn.png',
            'uran': 'images/uran.png',
            'neptun': 'images/neptun.png',
            'ksiezyc': 'images/ksiezyc.png',
        };
        this.planets.forEach(function (p) {
            var baseId = p.id.split('_')[0];
            var imgFile = imgMap[baseId];
            if (imgFile && !_this.planetImages[baseId]) {
                var img_1 = new Image();
                img_1.onload = function () { _this.planetImages[baseId] = img_1; };
                img_1.src = _this.pathFn(imgFile);
            }
        });
    };
    CanvasEngine.prototype.fitZoom = function () {
        if (this.planets.length === 0)
            return;
        var maxOrbit = Math.max.apply(Math, this.planets.map(function (p) { return p.orbit; }));
        if (maxOrbit === 0) {
            this.zoom = 1;
            return;
        }
        var halfW = this.canvas.width * 0.44;
        this.zoom = Math.min(halfW / maxOrbit, 1.4);
        this.panX = 0;
        this.panY = 0;
    };
    CanvasEngine.prototype.setShowOrbits = function (v) { this.showOrbits = v; };
    CanvasEngine.prototype.setReduceMotion = function (v) { this.reduceMotion = v; if (v)
        this.paused = true;
    else
        this.paused = false; };
    CanvasEngine.prototype.setPaused = function (v) { this.paused = v; };
    /** Ustawia aktywną planetę z klawiatury (highlight jak hover) */
    CanvasEngine.prototype.setKeyboardFocus = function (planetId) {
        this.hoveredId = planetId;
        this.canvas.style.cursor = planetId ? 'pointer' : 'default';
    };
    /** Zwraca id aktualnie podświetlonej planety */
    CanvasEngine.prototype.getHoveredId = function () { return this.hoveredId; };
    /** Zwraca listę id planet w bieżącej kolejności */
    CanvasEngine.prototype.getPlanetIds = function () { return this.planets.map(function (p) { return p.id; }); };
    /** Zwraca obiekt planety po id */
    CanvasEngine.prototype.getPlanetById = function (id) {
        return this.planets.find(function (p) { return p.id === id; }) || null;
    };
    CanvasEngine.prototype.zoomBy = function (delta) {
        var cx = this.canvas.width / 2;
        var cy = this.canvas.height / 2;
        var factor = delta > 0 ? 1.15 : 0.88;
        var newZoom = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, this.zoom * factor));
        this.panX = cx - (cx - this.panX) * (newZoom / this.zoom);
        this.panY = cy - (cy - this.panY) * (newZoom / this.zoom);
        this.zoom = newZoom;
    };
    CanvasEngine.prototype.resetView = function () { this.fitZoom(); };
    CanvasEngine.prototype.start = function () {
        this.raf = requestAnimationFrame(this.tick);
    };
    CanvasEngine.prototype.stop = function () {
        cancelAnimationFrame(this.raf);
    };
    CanvasEngine.prototype.cx = function () { return this.canvas.width / 2 + this.panX; };
    CanvasEngine.prototype.cy = function () { return this.canvas.height / 2 + this.panY; };
    CanvasEngine.prototype.planetPos = function (p) {
        var _a, _b;
        var angle = (_b = (_a = this.states[p.id]) === null || _a === void 0 ? void 0 : _a.angle) !== null && _b !== void 0 ? _b : 0;
        return {
            x: this.cx() + Math.cos(angle) * p.orbit * this.zoom,
            y: this.cy() + Math.sin(angle) * p.orbit * this.zoom * PERSP,
        };
    };
    CanvasEngine.prototype.draw = function () {
        var _this = this;
        var _a = this, canvas = _a.canvas, ctx = _a.ctx;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Background
        if (this.bgImage && this.bgLoaded) {
            ctx.drawImage(this.bgImage, 0, 0, canvas.width, canvas.height);
        }
        else {
            // Fallback: dark space gradient
            var grad = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
            grad.addColorStop(0, '#0a0820');
            grad.addColorStop(1, '#000510');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            this.drawStars();
        }
        var cx = this.cx();
        var cy = this.cy();
        // Orbits
        if (this.showOrbits) {
            this.planets.forEach(function (p) {
                if (p.orbit === 0)
                    return;
                ctx.beginPath();
                ctx.ellipse(cx, cy, p.orbit * _this.zoom, p.orbit * _this.zoom * PERSP, 0, 0, Math.PI * 2);
                ctx.strokeStyle = 'rgba(255,255,255,0.35)';
                ctx.lineWidth = 1.5;
                ctx.stroke();
            });
        }
        // Sort planets by y for correct z-order (further back first)
        var sorted = __spreadArray([], this.planets, true).sort(function (a, b) {
            var ay = _this.planetPos(a).y;
            var by = _this.planetPos(b).y;
            return ay - by;
        });
        // Draw label lines first (behind planets)
        sorted.forEach(function (p) {
            var pos = _this.planetPos(p);
            _this.drawLabelLine(p, pos.x, pos.y);
        });
        // Draw planets
        sorted.forEach(function (p) {
            var pos = _this.planetPos(p);
            _this.drawPlanet(p, pos.x, pos.y);
        });
        // Draw label texts on top
        sorted.forEach(function (p) {
            var pos = _this.planetPos(p);
            _this.drawLabelText(p, pos.x, pos.y);
        });
    };
    CanvasEngine.prototype.drawStars = function () {
        var _this = this;
        var ctx = this.ctx;
        // Simple static star field
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        var stars = [
            [45, 23], [123, 67], [234, 12], [456, 78], [567, 34], [678, 89], [789, 45], [890, 23],
            [901, 67], [112, 234], [223, 189], [334, 145], [445, 201], [556, 167], [667, 223],
            [778, 178], [889, 234], [100, 300], [200, 350], [300, 280], [400, 320], [500, 290],
            [600, 340], [700, 310], [800, 270], [900, 330], [150, 400], [250, 450], [350, 380],
            [450, 420], [550, 390], [650, 440], [750, 410], [850, 370], [950, 430],
        ];
        stars.forEach(function (_a) {
            var x = _a[0], y = _a[1];
            ctx.fillRect(x % _this.canvas.width, y % _this.canvas.height, 1, 1);
        });
    };
    CanvasEngine.prototype.getLabelDir = function (p, px, py) {
        var cy = this.cy();
        // Go up if planet is in upper half, down if lower half
        return { dx: 0, dy: py < cy ? -1 : 1 };
    };
    CanvasEngine.prototype.getLabelLength = function (r) {
        return (40 + r) * Math.max(0.75, this.zoom);
    };
    CanvasEngine.prototype.drawLabelLine = function (p, px, py) {
        var ctx = this.ctx;
        var dy = this.getLabelDir(p, px, py).dy;
        var r = p.r * this.zoom;
        var len = this.getLabelLength(p.r);
        var isHovered = this.hoveredId === p.id;
        var color = isHovered ? '#FFD700' : '#FFD700';
        var startY = py + dy * r;
        var endY = py + dy * (r + len);
        ctx.beginPath();
        ctx.moveTo(px, startY);
        ctx.lineTo(px, endY);
        ctx.strokeStyle = color;
        ctx.lineWidth = isHovered ? 2 : 1.5;
        ctx.stroke();
        // Circle at end
        ctx.beginPath();
        ctx.arc(px, endY, 5, 0, Math.PI * 2);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();
    };
    CanvasEngine.prototype.drawLabelText = function (p, px, py) {
        var ctx = this.ctx;
        var dy = this.getLabelDir(p, px, py).dy;
        var r = p.r * this.zoom;
        var len = this.getLabelLength(p.r);
        var endY = py + dy * (r + len);
        var isHovered = this.hoveredId === p.id;
        var fontSize = Math.max(11, 13 * Math.min(1, this.zoom));
        ctx.font = "bold ".concat(fontSize, "px 'Segoe UI', Arial, sans-serif");
        var tw = ctx.measureText(p.name).width;
        var textY = endY + dy * (fontSize + 4);
        var bgX = px - tw / 2 - 5;
        var bgY = textY - fontSize - 2;
        var bgW = tw + 10;
        var bgH = fontSize + 6;
        // Background box
        ctx.fillStyle = 'rgba(0,0,0,0.82)';
        roundRect(ctx, bgX, bgY, bgW, bgH, 3);
        ctx.fill();
        // Text
        ctx.fillStyle = isHovered ? '#FFD700' : '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText(p.name, px, textY);
        ctx.textAlign = 'left';
        ctx.textBaseline = 'alphabetic';
    };
    CanvasEngine.prototype.drawPlanet = function (p, px, py) {
        var ctx = this.ctx;
        var r = p.r * this.zoom;
        var isHovered = this.hoveredId === p.id;
        var t = Date.now();
        var baseId = p.id.split('_')[0];
        var img = this.planetImages[baseId];
        if (p.glow && img) {
            this.drawSunFromImage(img, px, py, r);
        }
        else if (p.glow) {
            this.drawSun(px, py, r, t);
        }
        else if (img) {
            this.drawPlanetFromImage(img, p, px, py, r);
        }
        else {
            this.drawRegularPlanet(p, px, py, r, t);
        }
        if (p.ring) {
            this.drawRings(px, py, r);
        }
        // Hover ring
        if (isHovered) {
            ctx.beginPath();
            ctx.arc(px, py, r + 4, 0, Math.PI * 2);
            ctx.strokeStyle = '#FFD700';
            ctx.lineWidth = 2.5;
            ctx.setLineDash([4, 3]);
            ctx.stroke();
            ctx.setLineDash([]);
        }
    };
    CanvasEngine.prototype.drawPlanetFromImage = function (img, p, px, py, r) {
        var ctx = this.ctx;
        ctx.save();
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(img, px - r, py - r, r * 2, r * 2);
        ctx.restore();
        // Saturn rings drawn after
    };
    CanvasEngine.prototype.drawSunFromImage = function (img, px, py, r) {
        var ctx = this.ctx;
        // Outer glow
        var glow = ctx.createRadialGradient(px, py, r * 0.5, px, py, r * 3.5);
        glow.addColorStop(0, 'rgba(255,120,0,0.5)');
        glow.addColorStop(0.5, 'rgba(255,60,0,0.2)');
        glow.addColorStop(1, 'rgba(160,10,0,0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(px, py, r * 3.5, 0, Math.PI * 2);
        ctx.fill();
        // Draw sun image (includes flames and black ring - baked in PNG)
        ctx.drawImage(img, px - r, py - r, r * 2, r * 2);
        // "Słońce" text on top
        ctx.fillStyle = 'white';
        ctx.font = "bold ".concat(Math.max(10, r * 0.55), "px 'Segoe UI', Arial");
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Słońce', px, py);
        ctx.textAlign = 'left';
        ctx.textBaseline = 'alphabetic';
    };
    CanvasEngine.prototype.drawSun = function (px, py, r, t) {
        var ctx = this.ctx;
        // Outer glow
        var glow = ctx.createRadialGradient(px, py, r * 0.5, px, py, r * 4.5);
        glow.addColorStop(0, 'rgba(255,120,0,0.6)');
        glow.addColorStop(0.4, 'rgba(255,60,0,0.3)');
        glow.addColorStop(1, 'rgba(160,10,0,0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(px, py, r * 4.5, 0, Math.PI * 2);
        ctx.fill();
        // Animated flame spikes
        var spikes = 14;
        for (var i = 0; i < spikes; i++) {
            var angle = (i / spikes) * Math.PI * 2;
            var wave = Math.sin(t / 350 + i * 1.3) * 0.15 + 0.85;
            var spokeR = r * (1.35 + wave * 0.25);
            var x2 = px + Math.cos(angle) * spokeR;
            var y2 = py + Math.sin(angle) * spokeR;
            var fg = ctx.createRadialGradient(px, py, r * 0.8, px + Math.cos(angle) * r * 0.4, py + Math.sin(angle) * r * 0.4, spokeR);
            fg.addColorStop(0, 'rgba(255,200,0,0.7)');
            fg.addColorStop(1, 'rgba(255,80,0,0)');
            ctx.fillStyle = fg;
            ctx.beginPath();
            ctx.arc(x2, y2, r * 0.35, 0, Math.PI * 2);
            ctx.fill();
        }
        // Sun body
        var body = ctx.createRadialGradient(px - r * 0.3, py - r * 0.3, r * 0.1, px, py, r);
        body.addColorStop(0, '#ffee88');
        body.addColorStop(0.3, '#ffaa00');
        body.addColorStop(0.7, '#ee2200');
        body.addColorStop(1, '#880000');
        ctx.fillStyle = body;
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fill();
        // Sun label
        ctx.fillStyle = 'white';
        ctx.font = "bold ".concat(Math.max(10, r * 0.55), "px 'Segoe UI', Arial");
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Słońce', px, py);
        ctx.textAlign = 'left';
        ctx.textBaseline = 'alphabetic';
    };
    CanvasEngine.prototype.drawRegularPlanet = function (p, px, py, r, _t) {
        var ctx = this.ctx;
        var pal = p.palette;
        ctx.save();
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.clip();
        if (pal) {
            // Base gradient
            var base = ctx.createRadialGradient(px - r * 0.35, py - r * 0.35, r * 0.05, px, py, r);
            base.addColorStop(0, pal.h);
            base.addColorStop(0.5, pal.c);
            base.addColorStop(1, pal.d);
            ctx.fillStyle = base;
            ctx.fillRect(px - r, py - r, r * 2, r * 2);
            // Surface bands (Jupiter, Saturn)
            if (pal.bands) {
                var bandColors = ['rgba(255,255,255,0.06)', 'rgba(0,0,0,0.08)', 'rgba(255,255,255,0.04)'];
                for (var i = 0; i < 5; i++) {
                    var by = py - r + (i / 5) * r * 2;
                    ctx.fillStyle = bandColors[i % bandColors.length];
                    ctx.fillRect(px - r, by, r * 2, r * 2 / 5);
                }
            }
            // Shadow (right side)
            var shadow = ctx.createRadialGradient(px + r * 0.5, py, r * 0.1, px + r * 0.5, py, r * 1.8);
            shadow.addColorStop(0, 'rgba(0,0,0,0.6)');
            shadow.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = shadow;
            ctx.fillRect(px - r, py - r, r * 2, r * 2);
            // Specular (upper-left)
            var spec = ctx.createRadialGradient(px - r * 0.4, py - r * 0.4, 0, px - r * 0.4, py - r * 0.4, r * 0.8);
            spec.addColorStop(0, 'rgba(255,255,255,0.35)');
            spec.addColorStop(1, 'rgba(255,255,255,0)');
            ctx.fillStyle = spec;
            ctx.fillRect(px - r, py - r, r * 2, r * 2);
        }
        else {
            // Fallback color
            ctx.fillStyle = p.clr;
            ctx.fillRect(px - r, py - r, r * 2, r * 2);
        }
        ctx.restore();
        // Atmosphere glow (outside planet)
        if (pal === null || pal === void 0 ? void 0 : pal.atm) {
            var atm = ctx.createRadialGradient(px, py, r * 0.85, px, py, r * 1.4);
            atm.addColorStop(0, pal.atm);
            atm.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = atm;
            ctx.beginPath();
            ctx.arc(px, py, r * 1.4, 0, Math.PI * 2);
            ctx.fill();
        }
    };
    CanvasEngine.prototype.drawRings = function (px, py, r) {
        var ctx = this.ctx;
        var tilt = -Math.PI / 7;
        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(tilt);
        // Ring 1
        ctx.beginPath();
        ctx.ellipse(0, 0, r * 2.3, r * 0.56, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(210,185,120,0.72)';
        ctx.lineWidth = r * 0.42;
        ctx.stroke();
        // Ring 2
        ctx.beginPath();
        ctx.ellipse(0, 0, r * 2.75, r * 0.66, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(160,135,80,0.38)';
        ctx.lineWidth = r * 0.20;
        ctx.stroke();
        ctx.restore();
    };
    CanvasEngine.prototype.hitTest = function (clientX, clientY) {
        var _this = this;
        var rect = this.canvas.getBoundingClientRect();
        var mx = clientX - rect.left;
        var my = clientY - rect.top;
        var closest = null;
        var minDist = Infinity;
        this.planets.forEach(function (p) {
            var pos = _this.planetPos(p);
            var r = p.r * _this.zoom + 12;
            var dx = mx - pos.x;
            var dy = my - pos.y;
            var dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < r && dist < minDist) {
                minDist = dist;
                closest = p;
            }
        });
        return closest;
    };
    CanvasEngine.prototype.bindEvents = function () {
        var _this = this;
        var c = this.canvas;
        c.addEventListener('mousedown', function (e) {
            _this.dragStart = { x: e.clientX, y: e.clientY };
            _this.panStart = { x: _this.panX, y: _this.panY };
            _this.dragged = false;
        });
        c.addEventListener('mousemove', function (e) {
            var _a;
            if (_this.dragStart) {
                var dx = e.clientX - _this.dragStart.x;
                var dy = e.clientY - _this.dragStart.y;
                if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
                    _this.dragged = true;
                    _this.panX = _this.panStart.x + dx;
                    _this.panY = _this.panStart.y + dy;
                }
            }
            else {
                var hit = _this.hitTest(e.clientX, e.clientY);
                var newId = hit ? hit.id : null;
                if (newId !== _this.hoveredId) {
                    _this.hoveredId = newId;
                    _this.canvas.style.cursor = hit ? 'pointer' : 'default';
                    (_a = _this.onHover) === null || _a === void 0 ? void 0 : _a.call(_this, hit);
                }
            }
        });
        c.addEventListener('mouseup', function (e) {
            var _a, _b;
            if (!_this.dragged) {
                var hit = _this.hitTest(e.clientX, e.clientY);
                if (hit) {
                    if (e.button === 0)
                        (_a = _this.onLeftClick) === null || _a === void 0 ? void 0 : _a.call(_this, hit);
                    if (e.button === 2)
                        (_b = _this.onRightClick) === null || _b === void 0 ? void 0 : _b.call(_this, hit);
                }
            }
            _this.dragStart = null;
            _this.panStart = null;
        });
        c.addEventListener('mouseleave', function () {
            var _a;
            _this.dragStart = null;
            _this.panStart = null;
            if (_this.hoveredId) {
                _this.hoveredId = null;
                (_a = _this.onHover) === null || _a === void 0 ? void 0 : _a.call(_this, null);
            }
        });
        c.addEventListener('contextmenu', function (e) {
            var _a;
            e.preventDefault();
            if (!_this.dragged) {
                var hit = _this.hitTest(e.clientX, e.clientY);
                if (hit)
                    (_a = _this.onRightClick) === null || _a === void 0 ? void 0 : _a.call(_this, hit);
            }
        });
        c.addEventListener('wheel', function (e) {
            e.preventDefault();
            var rect = c.getBoundingClientRect();
            var mx = e.clientX - rect.left;
            var my = e.clientY - rect.top;
            var factor = e.deltaY > 0 ? 0.88 : 1.15;
            var newZoom = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, _this.zoom * factor));
            _this.panX = mx - (mx - _this.panX) * (newZoom / _this.zoom);
            _this.panY = my - (my - _this.panY) * (newZoom / _this.zoom);
            _this.zoom = newZoom;
        }, { passive: false });
    };
    CanvasEngine.prototype.destroy = function () {
        this.stop();
        // Events will be cleaned up when canvas is removed
    };
    return CanvasEngine;
}());

function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
}

;// ./src/wcag.ts
// ============================================================
// WCAG.TS — Zarządzanie dostępnością
// Kosmiczne Układy v1.0 | Vanta AI Studio
// ============================================================
var ROOT_ID = 'ku-root';
// Cursor SVG templates
var CURSORS = {
    n: {
        def: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M5 3l14 9-7 1-4 7z' fill='%23ffffff' stroke='%23000' stroke-width='1'/%3E%3C/svg%3E\") 5 3, auto",
        w: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M5 3l14 9-7 1-4 7z' fill='%23ffffff' stroke='%23333' stroke-width='1'/%3E%3C/svg%3E\") 5 3, auto",
        y: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M5 3l14 9-7 1-4 7z' fill='%23FFD700' stroke='%23333' stroke-width='1'/%3E%3C/svg%3E\") 5 3, auto",
        b2: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M5 3l14 9-7 1-4 7z' fill='%2300ccff' stroke='%23000' stroke-width='1'/%3E%3C/svg%3E\") 5 3, auto",
    },
    d: {
        def: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 36 36'%3E%3Cpath d='M7 4l21 14-11 1-6 10z' fill='%23ffffff' stroke='%23000' stroke-width='1.5'/%3E%3C/svg%3E\") 7 4, auto",
        w: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 36 36'%3E%3Cpath d='M7 4l21 14-11 1-6 10z' fill='%23ffffff' stroke='%23333' stroke-width='1.5'/%3E%3C/svg%3E\") 7 4, auto",
        y: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 36 36'%3E%3Cpath d='M7 4l21 14-11 1-6 10z' fill='%23FFD700' stroke='%23333' stroke-width='1.5'/%3E%3C/svg%3E\") 7 4, auto",
        b2: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 36 36'%3E%3Cpath d='M7 4l21 14-11 1-6 10z' fill='%2300ccff' stroke='%23000' stroke-width='1.5'/%3E%3C/svg%3E\") 7 4, auto",
    },
    b: {
        def: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cpath d='M9 5l28 18-14 2-8 14z' fill='%23ffffff' stroke='%23000' stroke-width='2'/%3E%3C/svg%3E\") 9 5, auto",
        w: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cpath d='M9 5l28 18-14 2-8 14z' fill='%23ffffff' stroke='%23333' stroke-width='2'/%3E%3C/svg%3E\") 9 5, auto",
        y: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cpath d='M9 5l28 18-14 2-8 14z' fill='%23FFD700' stroke='%23333' stroke-width='2'/%3E%3C/svg%3E\") 9 5, auto",
        b2: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cpath d='M9 5l28 18-14 2-8 14z' fill='%2300ccff' stroke='%23000' stroke-width='2'/%3E%3C/svg%3E\") 9 5, auto",
    }
};
function applyWcag(root, state) {
    var _a;
    root.className = root.className
        .split(' ')
        .filter(function (c) { return !c.startsWith('ku-') && !c.startsWith('kuf-'); })
        .join(' ');
    if (state.highContrast)
        root.classList.add('ku-hc');
    if (state.reduceMotion)
        root.classList.add('ku-noanim');
    if (!state.showOrbits)
        root.classList.add('ku-no-orbits');
    if (state.learnMode)
        root.classList.add('ku-learn');
    root.classList.add("ku-size-".concat(state.textSize));
    if (state.colorFilter !== 'none')
        root.classList.add("kuf-".concat(state.colorFilter));
    if (state.cursorSize !== 'n' || state.cursorColor !== 'def') {
        root.classList.add("ku-nc");
    }
    // Apply custom cursor to root and all children
    var cursorVal = ((_a = CURSORS[state.cursorSize]) === null || _a === void 0 ? void 0 : _a[state.cursorColor]) || 'auto';
    root.style.setProperty('--ku-cursor', cursorVal);
    root.style.cursor = cursorVal;
    // Apply color filter
    var svgFilter = document.getElementById('ku-color-filter');
    if (svgFilter) {
        var feMatrix = svgFilter.querySelector('feColorMatrix');
        if (feMatrix) {
            var matrices = {
                none: '1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0',
                gray: '0.299 0.587 0.114 0 0  0.299 0.587 0.114 0 0  0.299 0.587 0.114 0 0  0 0 0 1 0',
                deut: '0.367 0.861 -0.228 0 0  0.280 0.673 0.047 0 0  -0.012 0.043 0.969 0 0  0 0 0 1 0',
                prot: '0.197 0.803 0 0 0  0.196 0.804 0 0 0  0 0.045 0.955 0 0  0 0 0 1 0',
                trit: '0.95 0.05 0 0 0  0 0.433 0.567 0 0  0 0.475 0.525 0 0  0 0 0 1 0',
            };
            feMatrix.setAttribute('values', matrices[state.colorFilter] || matrices.none);
        }
        var filterEl = root.closest('#ku-app-wrapper') || document.body;
        if (state.colorFilter !== 'none') {
            filterEl.style.filter = 'url(#ku-color-filter-def)';
        }
        else {
            if (state.highContrast) {
                filterEl.style.filter = 'contrast(1.6) brightness(1.1)';
            }
            else {
                filterEl.style.filter = '';
            }
        }
    }
    else if (state.highContrast) {
        root.style.filter = 'contrast(1.6) brightness(1.1)';
    }
    else if (state.colorFilter === 'none') {
        root.style.filter = '';
    }
}
function createColorFilterSVG() {
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('id', 'ku-color-filter');
    svg.setAttribute('style', 'position:absolute;width:0;height:0;overflow:hidden');
    svg.innerHTML = "\n    <defs>\n      <filter id=\"ku-color-filter-def\" x=\"0%\" y=\"0%\" width=\"100%\" height=\"100%\" color-interpolation-filters=\"sRGB\">\n        <feColorMatrix id=\"ku-fcm\" type=\"matrix\" values=\"1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0\"/>\n      </filter>\n    </defs>";
    return svg;
}
// Sound system (Web Audio API synthesis)
var audioCtx = null;
function getAudioCtx() {
    if (!audioCtx) {
        try {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        catch (e) { }
    }
    return audioCtx;
}
function playClick(enabled) {
    if (!enabled)
        return;
    var ctx = getAudioCtx();
    if (!ctx)
        return;
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(440, ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.1);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.1);
}
function playHover(enabled) {
    if (!enabled)
        return;
    var ctx = getAudioCtx();
    if (!ctx)
        return;
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(700, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(600, ctx.currentTime + 0.07);
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.07);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.07);
}

;// ./src/app.ts
// ============================================================
// APP.TS — Główna logika aplikacji
// Kosmiczne Układy v1.0 | Vanta AI Studio
// ============================================================




var TOPBAR_H = 68;
// ============================================================
// CSS injection
// ============================================================
function injectCSS() {
    if (document.getElementById('ku-styles'))
        return;
    var style = document.createElement('style');
    style.id = 'ku-styles';
    style.textContent = "\n/* === KU ROOT ISOLATION === */\n#ku-root, #ku-root *, #ku-root *::before, #ku-root *::after {\n  box-sizing: border-box !important;\n  font-family: 'Segoe UI', Arial, sans-serif !important;\n}\n#ku-root {\n  position: absolute !important;\n  top: 0 !important;\n  left: 0 !important;\n  width: 1920px !important;\n  height: 1080px !important;\n  margin: 0 !important;\n  padding: 0 !important;\n  overflow: hidden !important;\n  transform-origin: 0 0 !important;\n  cursor: var(--ku-cursor, auto) !important;\n  background: #000510 !important;\n  overscroll-behavior: none !important;\n  touch-action: pan-x pan-y !important;\n}\n#ku-root *, #ku-root input, #ku-root button, #ku-root textarea {\n  cursor: inherit !important;\n}\n/* select musi mie\u0107 jawny kursor \u2014 inherit nie dzia\u0142a we wszystkich przegl\u0105darkach */\n#ku-root select { cursor: var(--ku-cursor, auto) !important; }\n\n/* === TOPBAR === */\n#ku-root .ku-topbar {\n  position: absolute !important;\n  top: 0 !important; left: 0 !important; right: 0 !important;\n  height: ".concat(TOPBAR_H, "px !important;\n  z-index: 800 !important;\n  display: flex !important;\n  align-items: center !important;\n  justify-content: center !important;\n  background-color: transparent !important;\n  background-size: 100% 100% !important;\n  background-repeat: no-repeat !important;\n  overflow: hidden !important;\n}\n#ku-root .ku-topbar-title {\n  position: absolute !important;\n  left: 50% !important;\n  transform: translateX(-50%) !important;\n  white-space: nowrap !important;\n  z-index: 1 !important;\n  color: #FFD700 !important;\n  font-size: 22px !important;\n  font-weight: 700 !important;\n  letter-spacing: 3px !important;\n  text-transform: uppercase !important;\n  text-shadow: 2px 2px 4px #8B6000, 0 0 12px rgba(255,215,0,0.5) !important;\n}\n#ku-root .ku-topbar-btns {\n  position: absolute !important;\n  right: 18px !important;\n  top: 55% !important;\n  transform: translateY(-50%) !important;\n  display: flex !important;\n  gap: 10px !important;\n  z-index: 1 !important;\n}\n#ku-root .ku-topbar-btn {\n  position: relative !important;\n  width: 52px !important; height: 52px !important;\n  display: flex !important;\n  align-items: center !important;\n  justify-content: center !important;\n  border: none !important;\n  background-color: transparent !important;\n  background-size: cover !important;\n  background-repeat: no-repeat !important;\n  padding: 0 !important;\n  cursor: inherit !important;\n  transition: transform 0.15s, filter 0.15s !important;\n  border-radius: 50% !important;\n  outline-offset: 3px !important;\n}\n#ku-root .ku-topbar-btn:hover { transform: scale(1.12) !important; filter: brightness(1.25) !important; }\n#ku-root .ku-topbar-btn:focus { outline: 3px solid #FFD700 !important; }\n#ku-root .ku-topbar-btn img { width: 28px !important; height: 28px !important; pointer-events: none !important; }\n\n/* === OVERLAY === */\n#ku-root .ku-overlay {\n  position: absolute !important;\n  top: ").concat(TOPBAR_H, "px !important;\n  left: 0 !important; right: 0 !important; bottom: 0 !important;\n  background: rgba(0,2,20,0.85) !important;\n  z-index: 600 !important;\n  display: flex !important;\n  align-items: center !important;\n  justify-content: center !important;\n}\n/* pe\u0142ny overlay (onboarding) \u2014 topbar (z-index 800) i tak go przykrywa */\n#ku-root .ku-overlay.ku-overlay-full {\n  top: 0 !important;\n  z-index: 750 !important;\n}\n\n/* === WELCOME SCREEN === */\n#ku-root .ku-welcome {\n  position: absolute !important;\n  inset: 0 !important;\n  display: flex !important;\n  align-items: center !important;\n  justify-content: center !important;\n}\n#ku-root .ku-welcome-bg {\n  position: absolute !important;\n  inset: 0 !important;\n  width: 100% !important; height: 100% !important;\n  object-fit: cover !important;\n}\n#ku-root .ku-welcome-popup {\n  position: relative !important;\n  z-index: 10 !important;\n  width: 680px !important;\n  display: flex !important;\n  flex-direction: column !important;\n  align-items: center !important;\n  padding: 36px 44px 28px !important;\n  background-color: transparent !important;\n  background-size: 100% 100% !important;\n  background-repeat: no-repeat !important;\n}\n#ku-root .ku-welcome-content { position: relative !important; z-index: 1 !important; width: 100% !important; }\n#ku-root .ku-welcome-btns {\n  display: flex !important;\n  gap: 14px !important;\n  justify-content: center !important;\n  margin-top: 8px !important;\n}\n#ku-root .ku-welcome-title {\n  color: #FFD700 !important;\n  font-size: 32px !important;\n  font-weight: 700 !important;\n  text-align: center !important;\n  margin: 0 0 16px !important;\n  text-shadow: 2px 2px 6px rgba(0,0,0,0.8) !important;\n}\n#ku-root .ku-welcome-desc {\n  color: #fff !important;\n  font-size: 17px !important;\n  font-weight: 600 !important;\n  text-align: center !important;\n  line-height: 1.55 !important;\n  margin: 0 0 20px !important;\n}\n#ku-root .ku-task-box {\n  display: flex !important;\n  align-items: flex-start !important;\n  gap: 14px !important;\n  background: rgba(0,0,0,0.3) !important;\n  border-radius: 10px !important;\n  padding: 14px 18px !important;\n  margin-bottom: 24px !important;\n}\n#ku-root .ku-task-icon { width: 52px !important; height: 52px !important; flex-shrink: 0 !important; }\n#ku-root .ku-task-text { color: #fff !important; font-size: 15px !important; line-height: 1.5 !important; }\n#ku-root .ku-task-text strong { color: #FFD700 !important; }\n/* .ku-welcome-footer removed \u2014 buttons now inside popup via .ku-welcome-btns */\n\n/* Decorations */\n#ku-root .ku-deco {\n  position: absolute !important;\n  pointer-events: none !important;\n  z-index: 5 !important;\n}\n\n/* === SOLAR SCREEN === */\n#ku-root .ku-solar {\n  position: absolute !important;\n  top: ").concat(TOPBAR_H, "px !important;\n  left: 0 !important; right: 0 !important; bottom: 0 !important;\n  display: flex !important;\n}\n#ku-root .ku-left-panel {\n  width: 180px !important;\n  flex-shrink: 0 !important;\n  display: flex !important;\n  flex-direction: column !important;\n  align-items: center !important;\n  justify-content: center !important;\n  gap: 10px !important;\n  padding: 14px 10px !important;\n  background-color: transparent !important;\n  background-size: cover !important;\n  background-repeat: no-repeat !important;\n}\n#ku-root .ku-portrait-wrap {\n  width: 155px !important; height: 155px !important;\n  border: 3px solid #555 !important;\n  border-radius: 6px !important;\n  cursor: inherit !important;\n  background-color: #1a1a2e !important;\n  overflow: hidden !important;\n  position: relative !important;\n  display: block !important;\n  outline: none !important;\n  padding: 0 !important;\n  transition: border-color 0.2s, box-shadow 0.2s !important;\n}\n#ku-root .ku-portrait {\n  width: 100% !important; height: 100% !important;\n  object-fit: cover !important;\n  display: block !important;\n  pointer-events: none !important;\n}\n#ku-root .ku-portrait-wrap:hover,\n#ku-root .ku-portrait-wrap.active {\n  border-color: #FFD700 !important;\n  box-shadow: 0 0 16px 4px #FFD700 !important;\n}\n#ku-root .ku-portrait-wrap:focus { outline: 3px solid #FFD700 !important; outline-offset: 2px !important; }\n\n#ku-root .ku-portrait-tooltip {\n  position: absolute !important;\n  left: 168px !important;\n  top: 50% !important;\n  transform: translateY(-50%) !important;\n  background: #000 !important;\n  border: 1px solid #FFD700 !important;\n  color: #fff !important;\n  padding: 6px 12px !important;\n  border-radius: 4px !important;\n  white-space: nowrap !important;\n  font-size: 13px !important;\n  font-style: italic !important;\n  z-index: 200 !important;\n  pointer-events: none !important;\n}\n#ku-root .ku-portrait-tooltip strong { color: #FFD700 !important; }\n\n#ku-root .ku-canvas-area {\n  flex: 1 !important;\n  position: relative !important;\n  overflow: hidden !important;\n}\n#ku-root .ku-canvas-title {\n  position: absolute !important;\n  top: 10px !important;\n  left: 50% !important;\n  transform: translateX(-50%) !important;\n  z-index: 50 !important;\n  color: #fff !important;\n  font-size: 22px !important;\n  font-weight: 700 !important;\n  text-shadow: 1px 1px 3px rgba(0,0,0,0.9) !important;\n  background: rgba(0,0,0,0.55) !important;\n  padding: 6px 18px !important;\n  border-radius: 6px !important;\n  white-space: nowrap !important;\n}\n#ku-root .ku-game-canvas {\n  display: block !important;\n  width: 100% !important;\n  height: 100% !important;\n}\n#ku-root .ku-zoom-bar {\n  position: absolute !important;\n  bottom: 50px !important;\n  right: 14px !important;\n  display: flex !important;\n  gap: 6px !important;\n  z-index: 50 !important;\n}\n#ku-root .ku-zoom-btn {\n  width: 36px !important; height: 36px !important;\n  background: rgba(0,0,0,0.6) !important;\n  border: 1px solid rgba(255,255,255,0.3) !important;\n  border-radius: 6px !important;\n  color: #fff !important;\n  font-size: 18px !important;\n  display: flex !important;\n  align-items: center !important;\n  justify-content: center !important;\n  cursor: inherit !important;\n  transition: background 0.15s !important;\n}\n#ku-root .ku-zoom-btn:hover { background: rgba(255,215,0,0.2) !important; border-color: #FFD700 !important; }\n#ku-root .ku-zoom-btn:focus { outline: 3px solid #FFD700 !important; }\n\n#ku-root .ku-astro-deco {\n  position: absolute !important;\n  bottom: 10px !important; right: 14px !important;\n  width: 80px !important;\n  z-index: 30 !important;\n  pointer-events: none !important;\n}\n#ku-root .ku-satellite-deco {\n  position: absolute !important;\n  top: 50px !important; left: 60px !important;\n  width: 55px !important;\n  z-index: 30 !important;\n  pointer-events: none !important;\n}\n\n/* === MODEL SCREEN === */\n#ku-root .ku-model {\n  position: absolute !important;\n  top: ").concat(TOPBAR_H, "px !important;\n  left: 0 !important; right: 0 !important; bottom: 0 !important;\n  display: flex !important;\n  flex-direction: column !important;\n}\n#ku-root .ku-model-title {\n  color: #fff !important;\n  font-size: 22px !important;\n  font-weight: 700 !important;\n  text-align: center !important;\n  padding: 12px 24px !important;\n  background: rgba(0,0,0,0.55) !important;\n  text-shadow: 1px 1px 3px rgba(0,0,0,0.9) !important;\n  flex-shrink: 0 !important;\n}\n#ku-root .ku-model-canvas-wrap {\n  flex: 1 !important;\n  position: relative !important;\n  overflow: hidden !important;\n}\n#ku-root .ku-model-footer {\n  display: flex !important;\n  justify-content: center !important;\n  padding: 10px !important;\n  background: rgba(0,0,0,0.4) !important;\n  flex-shrink: 0 !important;\n}\n\n/* === BUTTONS === */\n#ku-root .ku-btn {\n  display: inline-flex !important;\n  align-items: center !important;\n  justify-content: center !important;\n  border: none !important;\n  background-color: transparent !important;\n  background-size: 100% 100% !important;\n  background-repeat: no-repeat !important;\n  padding: 0 20px !important;\n  cursor: inherit !important;\n  font-weight: 700 !important;\n  color: #FFD700 !important;\n  font-size: 17px !important;\n  text-shadow: 1px 1px 2px rgba(0,0,0,0.6) !important;\n  transition: filter 0.15s, transform 0.15s !important;\n  outline-offset: 3px !important;\n  white-space: nowrap !important;\n  line-height: 1 !important;\n}\n#ku-root .ku-btn:hover { filter: brightness(1.15) !important; transform: scale(1.04) !important; }\n#ku-root .ku-btn:active { transform: scale(0.97) !important; }\n#ku-root .ku-btn:focus { outline: 3px solid #FFD700 !important; }\n#ku-root .ku-btn-280 { width: 280px !important; height: 58px !important; }\n#ku-root .ku-btn-420 { width: 420px !important; height: 58px !important; }\n#ku-root .ku-btn-620 { width: 620px !important; height: 58px !important; }\n\n/* === POPUPS === */\n#ku-root .ku-popup {\n  position: relative !important;\n  display: flex !important;\n  flex-direction: column !important;\n  max-height: calc(1080px - ").concat(TOPBAR_H, "px - 40px) !important;\n  overflow: hidden !important;\n  background-color: transparent !important;\n  background-size: 100% 100% !important;\n  background-repeat: no-repeat !important;\n}\n#ku-root .ku-popup-inner {\n  display: flex !important;\n  flex-direction: column !important;\n  height: 100% !important;\n  padding: 26px 34px 22px !important;\n  overflow: hidden !important;\n}\n#ku-root .ku-popup-title {\n  color: #FFD700 !important;\n  font-size: 22px !important;\n  font-weight: 700 !important;\n  margin: 0 0 12px !important;\n  text-align: center !important;\n  text-shadow: 2px 2px 4px rgba(0,0,0,0.8) !important;\n}\n#ku-root .ku-popup-sep {\n  width: 100% !important; height: 3px !important;\n  background: linear-gradient(90deg, transparent, #FFD700, transparent) !important;\n  margin: 0 0 16px !important;\n}\n#ku-root .ku-popup-body {\n  flex: 1 !important;\n  overflow-y: auto !important;\n  color: #fff !important;\n  font-size: 15px !important;\n  line-height: 1.6 !important;\n  scrollbar-width: thin !important;\n}\n#ku-root .ku-popup-footer {\n  display: flex !important;\n  gap: 16px !important;\n  justify-content: center !important;\n  padding-top: 16px !important;\n  flex-shrink: 0 !important;\n}\n\n/* === BIOGRAPHY POPUP === */\n#ku-root .ku-bio-wrap {\n  width: 860px !important;\n}\n#ku-root .ku-bio-body {\n  display: flex !important;\n  gap: 20px !important;\n  align-items: flex-start !important;\n}\n#ku-root .ku-bio-pic {\n  width: 196px !important; height: 236px !important;\n  object-fit: cover !important;\n  border: 2px solid #FFD700 !important;\n  border-radius: 4px !important;\n  flex-shrink: 0 !important;\n}\n#ku-root .ku-bio-text { flex: 1 !important; }\n#ku-root .ku-bio-text p { margin: 0 0 12px !important; }\n\n/* === SETTINGS POPUP === */\n#ku-root .ku-settings-card {\n  width: 680px !important;\n  background: linear-gradient(160deg, #0e2a52, #0a1e3d, #071530) !important;\n  border: 2px solid #2a5090 !important;\n  border-radius: 12px !important;\n  overflow: hidden !important;\n}\n#ku-root .ku-settings-title {\n  color: #FFD700 !important;\n  font-size: 20px !important;\n  font-weight: 700 !important;\n  letter-spacing: 2px !important;\n  text-align: center !important;\n  padding: 20px !important;\n  text-transform: uppercase !important;\n  text-shadow: 2px 2px 4px rgba(0,0,0,0.8) !important;\n  border-bottom: 1px solid rgba(255,255,255,0.1) !important;\n}\n#ku-root .ku-settings-grid {\n  display: grid !important;\n  grid-template-columns: 1fr 1fr !important;\n  gap: 0 !important;\n  padding: 0 !important;\n}\n#ku-root .ku-settings-row {\n  display: flex !important;\n  align-items: center !important;\n  justify-content: space-between !important;\n  padding: 12px 20px !important;\n  border-bottom: 1px solid rgba(255,255,255,0.07) !important;\n  gap: 12px !important;\n}\n#ku-root .ku-settings-row.full {\n  grid-column: 1 / -1 !important;\n}\n#ku-root .ku-settings-label {\n  color: #aac4e0 !important;\n  font-size: 13px !important;\n  font-weight: 600 !important;\n  white-space: nowrap !important;\n}\n#ku-root .ku-toggle {\n  padding: 5px 12px !important;\n  border: 1px solid transparent !important;\n  border-radius: 4px !important;\n  font-size: 12px !important;\n  font-weight: 700 !important;\n  cursor: inherit !important;\n  white-space: nowrap !important;\n  min-width: 100px !important;\n  text-align: center !important;\n}\n#ku-root .ku-toggle.on { background: #FFD700 !important; color: #1a1200 !important; border-color: #FFD700 !important; }\n#ku-root .ku-toggle.off { background: #1e4a8a !important; color: #FFD700 !important; border-color: #3a6aaa !important; }\n#ku-root .ku-toggle:focus { outline: 3px solid #FFD700 !important; }\n#ku-root .ku-text-size-btns { display: flex !important; gap: 4px !important; }\n#ku-root .ku-text-size-btn {\n  width: 30px !important; height: 30px !important;\n  border: 1px solid #3a6aaa !important;\n  background: #1e4a8a !important;\n  color: #FFD700 !important;\n  border-radius: 4px !important;\n  cursor: inherit !important;\n  font-weight: 700 !important;\n  display: flex !important; align-items: center !important; justify-content: center !important;\n}\n#ku-root .ku-text-size-btn.active { background: #FFD700 !important; color: #1a1200 !important; }\n#ku-root .ku-text-size-btn:focus { outline: 3px solid #FFD700 !important; }\n#ku-root .ku-select {\n  background: #1e4a8a !important;\n  color: #FFD700 !important;\n  border: 1px solid #3a6aaa !important;\n  border-radius: 4px !important;\n  padding: 4px 8px !important;\n  font-size: 12px !important;\n  cursor: inherit !important;\n}\n#ku-root .ku-select:focus { outline: 3px solid #FFD700 !important; }\n#ku-root .ku-settings-footer {\n  display: flex !important;\n  justify-content: center !important;\n  padding: 16px !important;\n  border-top: 1px solid rgba(255,255,255,0.1) !important;\n}\n#ku-root .ku-btn-outline {\n  border: 2px solid #4a90d9 !important;\n  background: transparent !important;\n  color: #4a90d9 !important;\n  padding: 10px 30px !important;\n  border-radius: 6px !important;\n  font-size: 15px !important;\n  font-weight: 700 !important;\n  cursor: inherit !important;\n  transition: background 0.15s !important;\n}\n#ku-root .ku-btn-outline:hover { background: rgba(74,144,217,0.2) !important; }\n#ku-root .ku-btn-outline:focus { outline: 3px solid #FFD700 !important; }\n\n/* === ONBOARDING === */\n#ku-root .ku-onboarding-card {\n  width: 490px !important;\n  background: linear-gradient(160deg, #0e2a52, #071530) !important;\n  border: 2px solid #3a70c0 !important;\n  border-radius: 12px !important;\n  padding: 28px 32px !important;\n  color: #fff !important;\n}\n#ku-root .ku-onboarding-icon {\n  font-size: 36px !important;\n  text-align: center !important;\n  margin-bottom: 12px !important;\n}\n#ku-root .ku-onboarding-title {\n  color: #FFD700 !important;\n  font-size: 18px !important;\n  font-weight: 700 !important;\n  text-align: center !important;\n  margin-bottom: 12px !important;\n}\n#ku-root .ku-onboarding-text {\n  font-size: 14px !important;\n  line-height: 1.6 !important;\n  color: #dde !important;\n  margin-bottom: 20px !important;\n}\n#ku-root .ku-onboarding-dots {\n  display: flex !important;\n  justify-content: center !important;\n  gap: 8px !important;\n  margin-bottom: 16px !important;\n}\n#ku-root .ku-dot {\n  width: 10px !important; height: 10px !important;\n  border-radius: 50% !important;\n  background: #3a6aaa !important;\n  border: 1px solid #4a90d9 !important;\n  transition: background 0.2s !important;\n}\n#ku-root .ku-dot.active { background: #FFD700 !important; border-color: #FFD700 !important; }\n#ku-root .ku-onboarding-footer {\n  display: flex !important;\n  justify-content: space-between !important;\n  gap: 12px !important;\n}\n#ku-root .ku-btn-ob {\n  border: 2px solid #3a70c0 !important;\n  background: transparent !important;\n  color: #aac4e0 !important;\n  padding: 8px 20px !important;\n  border-radius: 6px !important;\n  font-size: 14px !important;\n  font-weight: 700 !important;\n  cursor: inherit !important;\n}\n#ku-root .ku-btn-ob.primary { background: #2a5090 !important; color: #fff !important; border-color: #4a90d9 !important; }\n#ku-root .ku-btn-ob:hover { filter: brightness(1.2) !important; }\n#ku-root .ku-btn-ob:focus { outline: 3px solid #FFD700 !important; }\n\n/* === INSTRUCTIONS === */\n#ku-root .ku-instr-wrap { width: 720px !important; }\n#ku-root .ku-instr-section { margin-bottom: 14px !important; }\n#ku-root .ku-instr-section h3 { color: #FFD700 !important; font-size: 15px !important; margin: 0 0 6px !important; }\n#ku-root .ku-instr-section ul { margin: 0 !important; padding-left: 18px !important; }\n#ku-root .ku-instr-section li { margin-bottom: 4px !important; }\n\n/* === PLANET TOOLTIP (quick, PPM) === */\n#ku-root .ku-planet-tooltip {\n  position: absolute !important;\n  background: rgba(0,5,30,0.92) !important;\n  border: 1px solid #4a90d9 !important;\n  border-radius: 8px !important;\n  padding: 10px 16px !important;\n  color: #fff !important;\n  font-size: 14px !important;\n  z-index: 400 !important;\n  pointer-events: none !important;\n  max-width: 220px !important;\n  box-shadow: 0 4px 16px rgba(0,0,0,0.5) !important;\n}\n#ku-root .ku-planet-tooltip-title {\n  color: #FFD700 !important;\n  font-size: 16px !important;\n  font-weight: 700 !important;\n  margin-bottom: 4px !important;\n}\n\n/* === WCAG TEXT SIZE (only popup body) === */\n#ku-root.ku-size-2 .ku-popup-body { font-size: 18px !important; }\n#ku-root.ku-size-3 .ku-popup-body { font-size: 21px !important; }\n#ku-root.ku-size-2 .ku-bio-text { font-size: 18px !important; }\n#ku-root.ku-size-3 .ku-bio-text { font-size: 21px !important; }\n#ku-root.ku-size-2 .ku-onboarding-text { font-size: 17px !important; }\n#ku-root.ku-size-3 .ku-onboarding-text { font-size: 19px !important; }\n\n/* === FOCUS styles (Chrome + Firefox) === */\n#ku-root :focus { outline: 3px solid #FFD700 !important; outline-offset: 2px !important; }\n#ku-root :focus-visible { outline: 3px solid #FFD700 !important; outline-offset: 2px !important; }\n#ku-root canvas:focus { outline: 3px solid #FFD700 !important; outline-offset: 4px !important; }\n\n/* === REDUCE MOTION === */\n#ku-root.ku-noanim * { animation: none !important; transition: none !important; }\n\n/* === HIGH CONTRAST (ku-hc) === */\n#ku-root.ku-hc .ku-settings-card {\n  background: #000000 !important;\n  border: 2px solid #FFD700 !important;\n}\n#ku-root.ku-hc .ku-settings-title {\n  color: #FFD700 !important;\n  border-bottom-color: rgba(255,215,0,0.4) !important;\n}\n#ku-root.ku-hc .ku-settings-label { color: #FFD700 !important; }\n#ku-root.ku-hc .ku-settings-row { border-bottom-color: rgba(255,215,0,0.2) !important; }\n#ku-root.ku-hc .ku-settings-footer { border-top-color: rgba(255,215,0,0.3) !important; }\n#ku-root.ku-hc .ku-toggle.on  { background: #FFD700 !important; color: #000 !important; border-color: #FFD700 !important; }\n#ku-root.ku-hc .ku-toggle.off { background: #000 !important; color: #FFD700 !important; border-color: #FFD700 !important; }\n#ku-root.ku-hc .ku-select { background: #000 !important; color: #FFD700 !important; border-color: #FFD700 !important; }\n#ku-root.ku-hc .ku-text-size-btn { background: #000 !important; color: #FFD700 !important; border-color: #FFD700 !important; }\n#ku-root.ku-hc .ku-text-size-btn.active { background: #FFD700 !important; color: #000 !important; }\n/* Przyciski \u2014 tekst czarny na \u017C\u00F3\u0142tym tle w trybie HC */\n#ku-root.ku-hc .ku-btn { color: #000 !important; text-shadow: none !important; }\n#ku-root.ku-hc .ku-btn span { color: #000 !important; text-shadow: none !important; }\n#ku-root.ku-hc .ku-btn-outline { background: #FFD700 !important; color: #000 !important; border-color: #FFD700 !important; }\n#ku-root.ku-hc .ku-portrait { border-color: #FFD700 !important; }\n#ku-root.ku-hc .ku-canvas-title { background: #000 !important; color: #FFD700 !important; }\n#ku-root.ku-hc .ku-zoom-btn { border-color: #FFD700 !important; background: #000 !important; color: #FFD700 !important; }\n#ku-root.ku-hc .ku-popup-body { color: #fff !important; }\n#ku-root.ku-hc .ku-popup-title { color: #FFD700 !important; }\n\n/* === CUSTOM SELECT (replaces native <select> so custom cursor works) === */\n#ku-root .ku-custom-select { position: relative !important; display: inline-block !important; }\n#ku-root .ku-custom-select-btn {\n  min-width: 110px !important;\n  text-align: left !important;\n  padding: 4px 22px 4px 8px !important;\n  position: relative !important;\n}\n#ku-root .ku-custom-select-btn::after {\n  content: '\u25BE' !important;\n  position: absolute !important;\n  right: 6px !important;\n  top: 50% !important;\n  transform: translateY(-50%) !important;\n  pointer-events: none !important;\n  color: #FFD700 !important;\n}\n#ku-root .ku-custom-select-dropdown {\n  position: absolute !important;\n  top: calc(100% + 2px) !important;\n  left: 0 !important;\n  z-index: 3000 !important;\n  background: #0a1e3d !important;\n  border: 1px solid #3a6aaa !important;\n  border-radius: 4px !important;\n  min-width: 100% !important;\n  box-shadow: 0 4px 16px rgba(0,0,0,0.7) !important;\n}\n#ku-root .ku-custom-select-item {\n  display: block !important;\n  width: 100% !important;\n  background: transparent !important;\n  border: none !important;\n  border-radius: 0 !important;\n  color: #FFD700 !important;\n  padding: 6px 12px !important;\n  text-align: left !important;\n  font-size: 12px !important;\n  font-weight: 600 !important;\n  cursor: inherit !important;\n  white-space: nowrap !important;\n}\n#ku-root .ku-custom-select-item:hover { background: rgba(74,144,217,0.25) !important; }\n#ku-root .ku-custom-select-item.selected { background: #1e4a8a !important; }\n#ku-root .ku-custom-select-item:focus { outline: 2px solid #FFD700 !important; outline-offset: -2px !important; }\n\n/* === PLANET STATS GRID === */\n#ku-root .ku-planet-stats {\n  display: grid !important;\n  grid-template-columns: 1fr 1fr !important;\n  gap: 6px 16px !important;\n  margin-top: 12px !important;\n}\n#ku-root .ku-stat-item {\n  font-size: 13px !important;\n  color: #ddd !important;\n  line-height: 1.4 !important;\n}\n#ku-root .ku-stat-item strong {\n  color: #FFD700 !important;\n  display: block !important;\n  font-size: 11px !important;\n}\n\n/* === SCROLLBAR === */\n#ku-root .ku-popup-body::-webkit-scrollbar { width: 8px !important; }\n#ku-root .ku-popup-body::-webkit-scrollbar-track { background: rgba(255,255,255,0.05) !important; }\n#ku-root .ku-popup-body::-webkit-scrollbar-thumb { background: #3a6aaa !important; border-radius: 4px !important; }\n\n/* === SOLAR BOTTOM BAR === */\n#ku-root .ku-solar-bottom-bar {\n  position: absolute !important;\n  bottom: 0 !important;\n  left: 0 !important;\n  right: 0 !important;\n  height: 72px !important;\n  display: flex !important;\n  align-items: center !important;\n  justify-content: flex-end !important;\n  padding: 0 24px !important;\n  background: rgba(0,5,30,0.7) !important;\n  z-index: 40 !important;\n}\n  ");
    document.head.appendChild(style);
}
// ============================================================
// MAIN APP CLASS
// ============================================================
var App = /** @class */ (function () {
    function App(container) {
        this.engine = null;
        this.modelEngine = null;
        this.currentPopup = null;
        this.popupTrigger = null;
        this.tooltipEl = null;
        this.hoveredPortraitIdx = -1;
        this.container = container;
        this.state = JSON.parse(JSON.stringify(DEFAULT_STATE));
    }
    App.prototype.mount = function () {
        var _this = this;
        // Style container exactly like VIII_4 — gives it a proper 16:9 sizing context
        this.container.style.setProperty('position', 'relative', 'important');
        this.container.style.setProperty('width', '100%', 'important');
        this.container.style.setProperty('aspect-ratio', '16 / 9', 'important');
        this.container.style.setProperty('min-height', '300px', 'important');
        this.container.style.setProperty('max-width', 'none', 'important');
        this.container.style.setProperty('max-height', 'none', 'important');
        this.container.style.setProperty('display', 'block', 'important');
        this.container.style.setProperty('overflow', 'hidden', 'important');
        this.container.innerHTML = '';
        injectCSS();
        // Root element — absolutely positioned, 1920×1080, scaled to fill container
        this.root = document.createElement('div');
        this.root.id = 'ku-root';
        this.container.appendChild(this.root);
        // Apply scale immediately and on every resize
        this._applyScale();
        if (typeof ResizeObserver !== 'undefined') {
            new ResizeObserver(function () { return _this._applyScale(); }).observe(this.container);
        }
        this._preloadImages();
        this.renderTopbar(this.root);
        this.showWelcome(this.root);
    };
    App.prototype._preloadImages = function () {
        var _this = this;
        var imgs = [
            'images/bg_all.png', 'images/top_bar.svg',
            'images/slonce.png', 'images/ziemia.png', 'images/merkury.png',
            'images/wenus.png', 'images/mars.png', 'images/jowisz.png',
            'images/saturn.png', 'images/uran.png', 'images/neptun.png',
            'images/ksiezyc.png',
            'images/pp_01.png', 'images/pp_02.png', 'images/pp_02_over.png',
            'images/pp_03.png', 'images/kopernik.png',
            'images/rys_01.png', 'images/rys_02.png', 'images/rys_03.png',
            'images/rys_04.png', 'images/rys_05.png', 'images/asteroids.png',
            'images/icon_clipboard.png',
        ];
        imgs.forEach(function (src) { var i = new Image(); i.src = _this.p(src); });
    };
    App.prototype._applyScale = function () {
        if (!this.root || !this.container)
            return;
        var cw = this.container.offsetWidth;
        if (!cw)
            return;
        var scale = cw / 1920;
        // Force container height to always maintain 16:9 — ZPE may not respect aspect-ratio
        var h = Math.round(cw * (1080 / 1920));
        this.container.style.setProperty('height', "".concat(h, "px"), 'important');
        this.root.style.setProperty('transform', "scale(".concat(scale, ")"), 'important');
        this.root.style.setProperty('transform-origin', '0 0', 'important');
    };
    App.prototype.unmount = function () {
        var _a, _b, _c, _d, _e;
        (_a = this.engine) === null || _a === void 0 ? void 0 : _a.destroy();
        (_b = this.modelEngine) === null || _b === void 0 ? void 0 : _b.destroy();
        (_c = this.root) === null || _c === void 0 ? void 0 : _c.remove();
        (_d = document.getElementById('ku-styles')) === null || _d === void 0 ? void 0 : _d.remove();
        (_e = document.getElementById('ku-color-filter')) === null || _e === void 0 ? void 0 : _e.remove();
    };
    App.prototype.removeListeners = function () {
        // Engines handle their own cleanup
    };
    App.prototype.saveState = function (setState) {
        setState(this.state);
    };
    App.prototype.restoreState = function (data) {
        if (data)
            Object.assign(this.state, data);
    };
    App.prototype.freeze = function () { var _a, _b; (_a = this.engine) === null || _a === void 0 ? void 0 : _a.setPaused(true); (_b = this.modelEngine) === null || _b === void 0 ? void 0 : _b.setPaused(true); };
    App.prototype.resume = function () { var _a, _b; (_a = this.engine) === null || _a === void 0 ? void 0 : _a.setPaused(false); (_b = this.modelEngine) === null || _b === void 0 ? void 0 : _b.setPaused(false); };
    App.prototype.p = function (name) {
        return path(name);
    };
    // ============================================================
    // TOPBAR
    // ============================================================
    App.prototype.renderTopbar = function (game) {
        var _this = this;
        var tb = document.createElement('div');
        tb.className = 'ku-topbar';
        tb.setAttribute('aria-label', 'Pasek nawigacji');
        tb.style.setProperty('background-image', "url(".concat(this.p('images/top_bar.svg'), ")"), 'important');
        // Title
        var title = document.createElement('div');
        title.className = 'ku-topbar-title';
        title.textContent = 'Kosmiczne Układy';
        tb.appendChild(title);
        // Buttons
        var btns = document.createElement('div');
        btns.className = 'ku-topbar-btns';
        var soundBtn = this.createTopbarBtn(this.state.wcag.soundEnabled ? 'images/ico_sound_on.svg' : 'images/ico_sound_off.svg', 'Dźwięk', 'ku-sound-btn');
        soundBtn.addEventListener('click', function () {
            _this.state.wcag.soundEnabled = !_this.state.wcag.soundEnabled;
            var img = soundBtn.querySelector('img');
            img.src = _this.p(_this.state.wcag.soundEnabled ? 'images/ico_sound_on.svg' : 'images/ico_sound_off.svg');
            playClick(_this.state.wcag.soundEnabled);
        });
        var helpBtn = this.createTopbarBtn('images/ico_help_ico.svg', 'Instrukcja', 'ku-help-btn');
        helpBtn.addEventListener('click', function () {
            playClick(_this.state.wcag.soundEnabled);
            _this.openInstructions(game, helpBtn);
        });
        var settingBtn = this.createTopbarBtn('images/ico_setting.svg', 'Ustawienia', 'ku-setting-btn');
        settingBtn.addEventListener('click', function () {
            playClick(_this.state.wcag.soundEnabled);
            _this.openSettings(game, settingBtn);
        });
        btns.append(soundBtn, helpBtn, settingBtn);
        tb.appendChild(btns);
        game.appendChild(tb);
    };
    App.prototype.createTopbarBtn = function (iconSrc, label, id) {
        var btn = document.createElement('button');
        btn.className = 'ku-topbar-btn';
        btn.setAttribute('aria-label', label);
        btn.id = id;
        btn.style.setProperty('background-image', "url(".concat(this.p('images/btn_circle_bg.svg'), ")"), 'important');
        var icon = document.createElement('img');
        icon.src = this.p(iconSrc);
        icon.alt = '';
        icon.setAttribute('aria-hidden', 'true');
        btn.appendChild(icon);
        return btn;
    };
    // ============================================================
    // WELCOME SCREEN
    // ============================================================
    App.prototype.showWelcome = function (game) {
        var _this = this;
        this.clearScreen(game);
        this.state.currentScreen = 'welcome';
        var screen = document.createElement('div');
        screen.className = 'ku-welcome';
        screen.id = 'ku-welcome';
        // Background
        var bg = document.createElement('img');
        bg.className = 'ku-welcome-bg';
        bg.src = this.p('images/bg_all.png');
        bg.alt = '';
        bg.setAttribute('aria-hidden', 'true');
        screen.appendChild(bg);
        // Decorations
        var decos = [
            { file: 'images/rys_01.png', style: 'left:20px;bottom:80px;width:180px;', alt: '' },
            { file: 'images/rys_02.png', style: 'left:60px;top:90px;width:120px;', alt: '' },
            { file: 'images/rys_03.png', style: 'right:80px;top:90px;width:130px;', alt: '' },
            { file: 'images/asteroids.png', style: 'right:20px;bottom:120px;width:160px;', alt: '' },
        ];
        decos.forEach(function (d) {
            var img = document.createElement('img');
            img.className = 'ku-deco';
            img.src = _this.p(d.file);
            img.alt = d.alt;
            img.setAttribute('style', d.style);
            screen.appendChild(img);
        });
        // Popup
        var popup = document.createElement('div');
        popup.className = 'ku-welcome-popup';
        popup.style.setProperty('background-image', "url(".concat(this.p('images/popup_simple_920x650.png'), ")"), 'important');
        var content = document.createElement('div');
        content.className = 'ku-welcome-content';
        var titleEl = document.createElement('h1');
        titleEl.className = 'ku-welcome-title';
        titleEl.textContent = 'Witaj w grze';
        var desc = document.createElement('p');
        desc.className = 'ku-welcome-desc';
        desc.textContent = 'Od wieków ludzkość wpatruje się w gwiazdy, próbując zrozumieć ich porządek… W tej grze staniesz się badaczem idei, które kształtowały nasz obraz Wszechświata. Każda teoria, każdy model to krok w stronę prawdy.';
        var taskBox = document.createElement('div');
        taskBox.className = 'ku-task-box';
        var taskIcon = document.createElement('img');
        taskIcon.className = 'ku-task-icon';
        taskIcon.src = this.p('images/icon_clipboard.png');
        taskIcon.alt = '';
        var taskText = document.createElement('p');
        taskText.className = 'ku-task-text';
        taskText.innerHTML = '<strong>Twoje zadanie:</strong> poznaj trzy wizje kosmosu: od układu geocentrycznego po heliocentryczny. Zobacz jak zmieniała się ta wizja w zależności od epoki.';
        taskBox.append(taskIcon, taskText);
        var btns = document.createElement('div');
        btns.className = 'ku-welcome-btns';
        var instrBtn = this.createBtn('Instrukcja', 280, function () {
            playClick(_this.state.wcag.soundEnabled);
            _this.openInstructions(game, instrBtn);
        });
        var startBtn = this.createBtn('Rozpocznij grę', 280, function () {
            playClick(_this.state.wcag.soundEnabled);
            _this.showSolar(game);
        });
        btns.append(instrBtn, startBtn);
        content.append(titleEl, desc, taskBox, btns);
        popup.appendChild(content);
        screen.appendChild(popup);
        game.appendChild(screen);
        // Focus start button
        setTimeout(function () { return startBtn.focus(); }, 100);
    };
    // ============================================================
    // SOLAR SCREEN
    // ============================================================
    App.prototype.showSolar = function (game, skipOnboarding) {
        var _this = this;
        var _a;
        if (skipOnboarding === void 0) { skipOnboarding = false; }
        this.clearScreen(game);
        this.state.currentScreen = 'solar';
        var screen = document.createElement('div');
        screen.className = 'ku-solar';
        screen.id = 'ku-solar';
        // Left panel
        var leftPanel = this.buildLeftPanel(game, screen);
        // Canvas area
        var canvasArea = document.createElement('div');
        canvasArea.className = 'ku-canvas-area';
        // Default to Współczesny (idx 2) if no astronomer selected yet
        if (this.state.activeAstronomerIndex < 0) {
            this.state.activeAstronomerIndex = 2;
        }
        var activeIdx = this.state.activeAstronomerIndex;
        var canvasTitle = document.createElement('div');
        canvasTitle.className = 'ku-canvas-title';
        canvasTitle.id = 'ku-solar-title';
        canvasTitle.textContent = ASTRONOMERS[activeIdx].screenTitle;
        var canvas = document.createElement('canvas');
        canvas.className = 'ku-game-canvas';
        canvas.id = 'ku-solar-canvas';
        canvas.width = 1635;
        canvas.height = 978;
        // Zoom bar
        var zoomBar = document.createElement('div');
        zoomBar.className = 'ku-zoom-bar';
        var zoomIn = document.createElement('button');
        zoomIn.className = 'ku-zoom-btn';
        zoomIn.setAttribute('aria-label', 'Przybliż');
        zoomIn.innerHTML = '+';
        var zoomOut = document.createElement('button');
        zoomOut.className = 'ku-zoom-btn';
        zoomOut.setAttribute('aria-label', 'Oddal');
        zoomOut.innerHTML = '–';
        var zoomReset = document.createElement('button');
        zoomReset.className = 'ku-zoom-btn';
        zoomReset.setAttribute('aria-label', 'Resetuj widok');
        zoomReset.style.cssText = 'font-size: 12px !important;';
        zoomReset.innerHTML = '⌖';
        zoomBar.append(zoomIn, zoomOut, zoomReset);
        // Satellite deco
        var satDeco = document.createElement('img');
        satDeco.className = 'ku-satellite-deco';
        satDeco.src = this.p('images/rys_03.png');
        satDeco.alt = '';
        satDeco.setAttribute('aria-hidden', 'true');
        // Astronaut deco
        var astroDeco = document.createElement('img');
        astroDeco.className = 'ku-astro-deco';
        astroDeco.src = this.p('images/rys_04.png');
        astroDeco.alt = '';
        astroDeco.setAttribute('aria-hidden', 'true');
        canvasArea.append(canvasTitle, canvas, zoomBar, satDeco, astroDeco);
        screen.append(leftPanel, canvasArea);
        game.appendChild(screen);
        // Init engine
        var planets = ASTRONOMERS[activeIdx].planets;
        (_a = this.engine) === null || _a === void 0 ? void 0 : _a.destroy();
        this.engine = new CanvasEngine({
            canvas: canvas,
            planets: planets,
            showOrbits: this.state.wcag.showOrbits,
            reduceMotion: this.state.wcag.reduceMotion,
            pathFn: function (name) { return _this.p(name); },
            onHover: function (planet) {
                if (planet)
                    playHover(_this.state.wcag.soundEnabled);
            },
            onLeftClick: function (planet) {
                playClick(_this.state.wcag.soundEnabled);
                _this.openPlanetPopup(game, planet);
            },
            onRightClick: function (planet) {
                _this.showPlanetTooltip(canvasArea, planet, canvas);
            },
        });
        this.engine.loadBackground(this.p('images/bg_all.png'));
        this.engine.start();
        // Zoom controls
        zoomIn.addEventListener('click', function () { var _a; return (_a = _this.engine) === null || _a === void 0 ? void 0 : _a.zoomBy(1); });
        zoomOut.addEventListener('click', function () { var _a; return (_a = _this.engine) === null || _a === void 0 ? void 0 : _a.zoomBy(-1); });
        zoomReset.addEventListener('click', function () { var _a; return (_a = _this.engine) === null || _a === void 0 ? void 0 : _a.resetView(); });
        // Nawigacja klawiaturą po planetach (WCAG IX.3_6_2)
        canvas.setAttribute('tabindex', '0');
        canvas.setAttribute('role', 'application');
        canvas.setAttribute('aria-label', 'Interaktywna mapa układu słonecznego. TAB: fokus. Strzałki: zmień planetę. Enter: szczegóły (LPM). Spacja: szybki opis (PPM).');
        canvas.addEventListener('keydown', function (e) {
            var eng = _this.engine;
            if (!eng)
                return;
            var ids = eng.getPlanetIds();
            if (ids.length === 0)
                return;
            var currentId = eng.getHoveredId();
            var currentIdx = currentId ? ids.indexOf(currentId) : -1;
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                var nextIdx = (currentIdx + 1) % ids.length;
                eng.setKeyboardFocus(ids[nextIdx]);
            }
            else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                var prevIdx = (currentIdx - 1 + ids.length) % ids.length;
                eng.setKeyboardFocus(ids[prevIdx]);
            }
            else if (e.key === 'Enter') {
                e.preventDefault();
                var id = eng.getHoveredId();
                if (id) {
                    var planet = eng.getPlanetById(id);
                    if (planet) {
                        playClick(_this.state.wcag.soundEnabled);
                        _this.popupTrigger = canvas;
                        _this.openPlanetPopup(game, planet);
                    }
                }
            }
            else if (e.key === ' ') {
                e.preventDefault();
                var id = eng.getHoveredId();
                if (id) {
                    var planet = eng.getPlanetById(id);
                    if (planet) {
                        _this.showPlanetTooltip(canvasArea, planet, canvas);
                    }
                }
            }
        });
        canvas.addEventListener('blur', function () {
            var _a;
            (_a = _this.engine) === null || _a === void 0 ? void 0 : _a.setKeyboardFocus(null);
        });
        // Onboarding
        if (!skipOnboarding) {
            setTimeout(function () { return _this.showOnboarding(game); }, 400);
        }
    };
    App.prototype.buildLeftPanel = function (game, screen) {
        var _this = this;
        var panel = document.createElement('div');
        panel.className = 'ku-left-panel';
        panel.style.setProperty('background-image', "url(".concat(this.p('images/apla_dark.png'), ")"), 'important');
        ASTRONOMERS.forEach(function (astro, idx) {
            var wrap = document.createElement('div');
            wrap.className = 'ku-portrait-wrap';
            wrap.setAttribute('tabindex', '0');
            wrap.setAttribute('role', 'button');
            wrap.setAttribute('aria-label', "".concat(astro.name, " \u2013 kliknij by wybra\u0107 model"));
            if (_this.state.activeAstronomerIndex === idx) {
                wrap.classList.add('active');
            }
            var portrait = document.createElement('img');
            portrait.className = 'ku-portrait';
            portrait.src = _this.p("images/".concat(astro.portrait));
            portrait.alt = astro.name;
            // Hover effects
            wrap.addEventListener('mouseenter', function () {
                if (idx !== _this.state.activeAstronomerIndex) {
                    portrait.src = _this.p("images/".concat(astro.portraitHover));
                }
                _this.showPortraitTooltip(wrap, astro.name);
                playHover(_this.state.wcag.soundEnabled);
            });
            wrap.addEventListener('mouseleave', function () {
                if (idx !== _this.state.activeAstronomerIndex) {
                    portrait.src = _this.p("images/".concat(astro.portrait));
                }
                _this.hidePortraitTooltip(wrap);
            });
            // Click: open biography
            wrap.addEventListener('click', function () {
                playClick(_this.state.wcag.soundEnabled);
                _this.openBiography(game, astro, idx, wrap);
            });
            wrap.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    _this.openBiography(game, astro, idx, wrap);
                }
            });
            wrap.appendChild(portrait);
            panel.appendChild(wrap);
        });
        return panel;
    };
    App.prototype.showPortraitTooltip = function (wrap, name) {
        var tip = document.createElement('div');
        tip.className = 'ku-portrait-tooltip';
        tip.innerHTML = "<em>Biografia:</em> <strong>".concat(name, "</strong>");
        wrap.appendChild(tip);
    };
    App.prototype.hidePortraitTooltip = function (wrap) {
        var _a;
        (_a = wrap.querySelector('.ku-portrait-tooltip')) === null || _a === void 0 ? void 0 : _a.remove();
    };
    App.prototype.updateSolarTitle = function (text) {
        var el = document.getElementById('ku-solar-title');
        if (el)
            el.textContent = text;
    };
    App.prototype.switchModel = function (idx) {
        var _this = this;
        var _a;
        this.state.activeAstronomerIndex = idx;
        var astro = ASTRONOMERS[idx];
        // Update portrait borders
        document.querySelectorAll('.ku-portrait-wrap').forEach(function (el, i) {
            el.classList.toggle('active', i === idx);
            var img = el.querySelector('.ku-portrait');
            if (img)
                img.src = _this.p("images/".concat(ASTRONOMERS[i].portrait));
        });
        // Update portrait image for active
        var activeWrap = document.querySelectorAll('.ku-portrait-wrap')[idx];
        if (activeWrap) {
            activeWrap.querySelector('.ku-portrait').src = this.p("images/".concat(astro.portraitHover));
        }
        this.updateSolarTitle(astro.screenTitle);
        (_a = this.engine) === null || _a === void 0 ? void 0 : _a.setPlanets(astro.planets);
        if (!this.state.visitedAstronomers.includes(astro.id)) {
            this.state.visitedAstronomers.push(astro.id);
        }
    };
    App.prototype.showPlanetTooltip = function (container, planet, canvas) {
        var _this = this;
        var _a;
        (_a = this.tooltipEl) === null || _a === void 0 ? void 0 : _a.remove();
        var tip = document.createElement('div');
        tip.className = 'ku-planet-tooltip';
        var title = document.createElement('div');
        title.className = 'ku-planet-tooltip-title';
        title.textContent = planet.name;
        var desc = document.createElement('div');
        desc.textContent = planet.desc || this.getDefaultDesc(planet);
        tip.append(title, desc);
        var rect = canvas.getBoundingClientRect();
        var containerRect = container.getBoundingClientRect();
        tip.style.cssText = "position: absolute !important; top: 50% !important; left: 50% !important; transform: translate(-50%, -50%) !important;";
        container.appendChild(tip);
        this.tooltipEl = tip;
        setTimeout(function () {
            if (_this.tooltipEl === tip) {
                tip.remove();
                _this.tooltipEl = null;
            }
        }, 3000);
    };
    App.prototype.getDefaultDesc = function (planet) {
        var descs = {
            ziemia: 'Trzecia planeta od Słońca – nasza planeta',
            ksiezyc: 'Naturalny satelita Ziemi',
            slonce: 'Gwiazda centralna układu',
            merkury: 'Najmniejsza i najbliższa Słońcu planeta',
            wenus: 'Najjaśniejszy punkt na niebie po Słońcu',
            mars: 'Czerwona planeta',
            jowisz: 'Największa planeta Układu Słonecznego',
            saturn: 'Planeta z pierścieniami',
            uran: 'Planeta lodowych olbrzymów',
            neptun: 'Najdalsza planeta od Słońca',
        };
        var base = planet.id.split('_')[0];
        return descs[base] || planet.name;
    };
    // ============================================================
    // MODEL SCREEN
    // ============================================================
    App.prototype.showModel = function (game, astronomerIdx) {
        var _this = this;
        var _a;
        this.clearScreen(game);
        this.state.currentScreen = 'model';
        var astro = ASTRONOMERS[astronomerIdx];
        var screen = document.createElement('div');
        screen.className = 'ku-model';
        screen.id = 'ku-model';
        // Background
        var bg = document.createElement('img');
        bg.style.cssText = 'position: absolute !important; inset: 0 !important; width: 100% !important; height: 100% !important; object-fit: cover !important;';
        bg.src = this.p('images/bg_all.png');
        bg.alt = '';
        screen.appendChild(bg);
        // Left panel (same as solar screen)
        var leftPanel = this.buildLeftPanel(game, screen);
        var mainArea = document.createElement('div');
        mainArea.style.cssText = 'display: flex !important; flex-direction: column !important; flex: 1 !important; position: relative !important; z-index: 10 !important;';
        var title = document.createElement('div');
        title.className = 'ku-model-title';
        title.textContent = astro.screenTitle;
        var canvasWrap = document.createElement('div');
        canvasWrap.className = 'ku-model-canvas-wrap';
        var canvas = document.createElement('canvas');
        canvas.className = 'ku-game-canvas';
        canvas.width = 1920;
        canvas.height = 810;
        canvasWrap.appendChild(canvas);
        // Astronaut deco
        var deco = document.createElement('img');
        deco.className = 'ku-astro-deco';
        deco.src = this.p('images/rys_05.png');
        deco.alt = '';
        canvasWrap.appendChild(deco);
        var footer = document.createElement('div');
        footer.className = 'ku-model-footer';
        footer.style.cssText = 'position: relative !important; z-index: 10 !important;';
        var backBtn = this.createBtn('Powrót', 620, function () {
            var _a;
            playClick(_this.state.wcag.soundEnabled);
            (_a = _this.modelEngine) === null || _a === void 0 ? void 0 : _a.destroy();
            _this.modelEngine = null;
            _this.showSolar(game, true);
        });
        footer.appendChild(backBtn);
        mainArea.append(title, canvasWrap, footer);
        screen.append(leftPanel, mainArea);
        game.appendChild(screen);
        // Engine
        (_a = this.modelEngine) === null || _a === void 0 ? void 0 : _a.destroy();
        this.modelEngine = new CanvasEngine({
            canvas: canvas,
            planets: astro.planets,
            showOrbits: this.state.wcag.showOrbits,
            reduceMotion: this.state.wcag.reduceMotion,
            pathFn: function (name) { return _this.p(name); },
            onHover: undefined,
            onLeftClick: undefined,
            onRightClick: undefined,
        });
        this.modelEngine.loadBackground(this.p('images/bg_all.png'));
        this.modelEngine.start();
        setTimeout(function () { return backBtn.focus(); }, 100);
    };
    // ============================================================
    // POPUPS
    // ============================================================
    App.prototype.openOverlay = function (game, content, full) {
        var _this = this;
        if (full === void 0) { full = false; }
        var overlay = document.createElement('div');
        overlay.className = full ? 'ku-overlay ku-overlay-full' : 'ku-overlay';
        overlay.id = 'ku-popup-overlay';
        overlay.setAttribute('tabindex', '-1');
        overlay.addEventListener('click', function (e) {
            if (e.target === overlay)
                _this.closePopup();
        });
        // Focus trap: Tab/Shift+Tab cycles only within the overlay
        overlay.addEventListener('keydown', function (e) {
            if (e.key !== 'Tab')
                return;
            var focusable = Array.from(overlay.querySelectorAll('button:not([disabled]), [tabindex="0"]'));
            if (focusable.length === 0)
                return;
            var first = focusable[0];
            var last = focusable[focusable.length - 1];
            if (e.shiftKey) {
                if (document.activeElement === first || document.activeElement === overlay) {
                    e.preventDefault();
                    last.focus();
                }
            }
            else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        });
        overlay.appendChild(content);
        game.appendChild(overlay);
        this.currentPopup = overlay;
        return overlay;
    };
    App.prototype.closePopup = function () {
        var _a, _b;
        (_a = this.currentPopup) === null || _a === void 0 ? void 0 : _a.remove();
        this.currentPopup = null;
        (_b = this.popupTrigger) === null || _b === void 0 ? void 0 : _b.focus();
        this.popupTrigger = null;
    };
    App.prototype.bindPopupKeys = function (overlay) {
        var _this = this;
        var handler = function (e) {
            if (e.key === 'Escape' || e.key === 'Backspace') {
                e.preventDefault();
                overlay.removeEventListener('keydown', handler);
                _this.closePopup();
            }
        };
        overlay.addEventListener('keydown', handler);
        // Also global for Escape
        var globalHandler = function (e) {
            if (e.key === 'Escape') {
                document.removeEventListener('keydown', globalHandler);
                if (_this.currentPopup === overlay)
                    _this.closePopup();
            }
        };
        document.addEventListener('keydown', globalHandler);
    };
    // BIOGRAPHY
    App.prototype.openBiography = function (game, astro, idx, trigger) {
        var _this = this;
        this.popupTrigger = trigger;
        var popup = document.createElement('div');
        popup.className = 'ku-popup ku-bio-wrap';
        popup.setAttribute('role', 'dialog');
        popup.setAttribute('aria-label', "Biografia: ".concat(astro.name));
        popup.setAttribute('aria-modal', 'true');
        popup.style.setProperty('background-image', "url(".concat(this.p('images/popup_simple_920x650.png'), ")"), 'important');
        var inner = document.createElement('div');
        inner.className = 'ku-popup-inner';
        var title = document.createElement('h2');
        title.className = 'ku-popup-title';
        title.textContent = astro.name;
        var sep = document.createElement('div');
        sep.className = 'ku-popup-sep';
        var body = document.createElement('div');
        body.className = 'ku-popup-body';
        var bioWrap = document.createElement('div');
        bioWrap.className = 'ku-bio-body';
        var pic = document.createElement('img');
        pic.className = 'ku-bio-pic';
        pic.src = this.p("images/".concat(astro.bioPic));
        pic.alt = astro.name;
        var text = document.createElement('div');
        text.className = 'ku-bio-text';
        text.innerHTML = astro.bio;
        bioWrap.append(pic, text);
        body.appendChild(bioWrap);
        var footer = document.createElement('div');
        footer.className = 'ku-popup-footer';
        var modelBtn = this.createBtn(astro.modelTitle, 420, function () {
            playClick(_this.state.wcag.soundEnabled);
            _this.closePopup();
            if (_this.state.currentScreen === 'model') {
                _this.showModel(game, idx);
            }
            else {
                _this.switchModel(idx);
            }
        });
        var backBtn = this.createBtn('Powrót', 280, function () {
            playClick(_this.state.wcag.soundEnabled);
            _this.closePopup();
        });
        footer.append(modelBtn, backBtn);
        inner.append(title, sep, body, footer);
        popup.appendChild(inner);
        var overlay = this.openOverlay(game, popup);
        this.bindPopupKeys(overlay);
        setTimeout(function () { return modelBtn.focus(); }, 50);
    };
    // INSTRUCTIONS
    App.prototype.openInstructions = function (game, trigger) {
        var _this = this;
        this.popupTrigger = trigger;
        var popup = document.createElement('div');
        popup.className = 'ku-popup ku-instr-wrap';
        popup.setAttribute('role', 'dialog');
        popup.setAttribute('aria-label', 'Instrukcja');
        popup.setAttribute('aria-modal', 'true');
        popup.style.setProperty('background-image', "url(".concat(this.p('images/popup_simple_920x650.png'), ")"), 'important');
        var inner = document.createElement('div');
        inner.className = 'ku-popup-inner';
        var title = document.createElement('h2');
        title.className = 'ku-popup-title';
        title.textContent = 'Instrukcja';
        var sep = document.createElement('div');
        sep.className = 'ku-popup-sep';
        var body = document.createElement('div');
        body.className = 'ku-popup-body';
        body.innerHTML = "\n      <div class=\"ku-instr-section\">\n        <h3>\uD83D\uDD2D Portrety astronom\u00F3w (lewa kolumna)</h3>\n        <ul>\n          <li>Kliknij na portret, aby zobaczy\u0107 biografi\u0119 i model uk\u0142adu.</li>\n          <li>Najed\u017A myszk\u0105 \u2013 zobaczysz podpowied\u017A z nazwiskiem.</li>\n        </ul>\n      </div>\n      <div class=\"ku-instr-section\">\n        <h3>\uD83E\uDE90 Interaktywny uk\u0142ad s\u0142oneczny</h3>\n        <ul>\n          <li><strong>LPM na planecie</strong> \u2013 szczeg\u00F3\u0142owe informacje (popup)</li>\n          <li><strong>PPM na planecie</strong> \u2013 szybki opis (tooltip)</li>\n          <li><strong>Hover</strong> \u2013 zatrzymuje planet\u0119, pod\u015Bwietla z\u0142ot\u0105 obw\u00F3dk\u0105</li>\n          <li><strong>K\u00F3\u0142ko myszy / +/\u2013</strong> \u2013 przybli\u017Canie i oddalanie</li>\n          <li><strong>Przeci\u0105ganie</strong> \u2013 przesuwanie widoku</li>\n        </ul>\n      </div>\n      <div class=\"ku-instr-section\">\n        <h3>\u2328\uFE0F Sterowanie klawiatur\u0105 (WCAG)</h3>\n        <ul>\n          <li><strong>TAB</strong> \u2013 przej\u015Bcie do kolejnego elementu</li>\n          <li><strong>Enter</strong> \u2013 klikni\u0119cie lewym przyciskiem / zatwierdzenie</li>\n          <li><strong>Spacja</strong> \u2013 klikni\u0119cie prawym przyciskiem / info dodatkowe</li>\n          <li><strong>Backspace</strong> \u2013 powr\u00F3t do poprzedniego elementu</li>\n          <li><strong>Escape</strong> \u2013 zamkni\u0119cie okna</li>\n        </ul>\n      </div>\n    ";
        var footer = document.createElement('div');
        footer.className = 'ku-popup-footer';
        var closeBtn = this.createBtn('Zamknij', 280, function () {
            playClick(_this.state.wcag.soundEnabled);
            _this.closePopup();
        });
        footer.appendChild(closeBtn);
        inner.append(title, sep, body, footer);
        popup.appendChild(inner);
        var overlay = this.openOverlay(game, popup);
        this.bindPopupKeys(overlay);
        setTimeout(function () { return closeBtn.focus(); }, 50);
    };
    // SETTINGS
    App.prototype.openSettings = function (game, trigger) {
        var _this = this;
        this.popupTrigger = trigger;
        var card = document.createElement('div');
        card.className = 'ku-settings-card';
        card.setAttribute('role', 'dialog');
        card.setAttribute('aria-label', 'Ustawienia');
        card.setAttribute('aria-modal', 'true');
        var titleEl = document.createElement('div');
        titleEl.className = 'ku-settings-title';
        titleEl.textContent = 'USTAWIENIA';
        var grid = document.createElement('div');
        grid.className = 'ku-settings-grid';
        var w = this.state.wcag;
        // Text size
        var row1 = this.buildSettingsRow('T  Wielkość tekstu');
        var sizeBtns = document.createElement('div');
        sizeBtns.className = 'ku-text-size-btns';
        [1, 2, 3].forEach(function (sz) {
            var btn = document.createElement('button');
            btn.className = "ku-text-size-btn".concat(w.textSize === sz ? ' active' : '');
            btn.textContent = 'A';
            btn.style.cssText = "font-size: ".concat(12 + (sz - 1) * 3, "px !important;");
            btn.setAttribute('aria-label', "Rozmiar tekstu ".concat(sz));
            btn.addEventListener('click', function () {
                _this.state.wcag.textSize = sz;
                sizeBtns.querySelectorAll('.ku-text-size-btn').forEach(function (b, i) {
                    b.classList.toggle('active', i + 1 === sz);
                });
                applyWcag(_this.root, _this.state.wcag);
            });
            sizeBtns.appendChild(btn);
        });
        row1.appendChild(sizeBtns);
        // High contrast
        var row2 = this.buildSettingsRow('⊙  Wysoki kontrast');
        var hcToggle = this.buildToggle(w.highContrast, function (v) {
            _this.state.wcag.highContrast = v;
            applyWcag(_this.root, _this.state.wcag);
        });
        row2.appendChild(hcToggle);
        // Reduce motion
        var row3 = this.buildSettingsRow('∿  Redukcja ruchu');
        var rmToggle = this.buildToggle(w.reduceMotion, function (v) {
            var _a, _b;
            _this.state.wcag.reduceMotion = v;
            (_a = _this.engine) === null || _a === void 0 ? void 0 : _a.setReduceMotion(v);
            (_b = _this.modelEngine) === null || _b === void 0 ? void 0 : _b.setReduceMotion(v);
            applyWcag(_this.root, _this.state.wcag);
        });
        row3.appendChild(rmToggle);
        // Show orbits
        var row4 = this.buildSettingsRow('∿  Widoczność orbit');
        var orbitToggle = this.buildToggle(w.showOrbits, function (v) {
            var _a, _b;
            _this.state.wcag.showOrbits = v;
            (_a = _this.engine) === null || _a === void 0 ? void 0 : _a.setShowOrbits(v);
            (_b = _this.modelEngine) === null || _b === void 0 ? void 0 : _b.setShowOrbits(v);
        });
        row4.appendChild(orbitToggle);
        // Learn mode
        var row5 = this.buildSettingsRow('⊡  Tryb nauki (ślady)');
        var learnToggle = this.buildToggle(w.learnMode, function (v) {
            _this.state.wcag.learnMode = v;
            applyWcag(_this.root, _this.state.wcag);
        });
        row5.appendChild(learnToggle);
        // Color filter
        var row6 = this.buildSettingsRow('🎨  Filtr kolorów');
        var colorSel = this.buildCustomSelect([
            { val: 'none', label: 'Brak' },
            { val: 'gray', label: 'Skala szarości' },
            { val: 'deut', label: 'Daltonizm (Deuteranopia)' },
            { val: 'prot', label: 'Daltonizm (Protanopia)' },
            { val: 'trit', label: 'Daltonizm (Tritanopia)' },
        ], w.colorFilter, function (val) { _this.state.wcag.colorFilter = val; applyWcag(_this.root, _this.state.wcag); });
        row6.appendChild(colorSel);
        // Cursor size
        var row7 = this.buildSettingsRow('▷  Kursor – rozmiar', true);
        var cursorSzSel = this.buildCustomSelect([
            { val: 'n', label: 'Normalny' },
            { val: 'd', label: 'Duży' },
            { val: 'b', label: 'Bardzo duży' },
        ], w.cursorSize, function (val) { _this.state.wcag.cursorSize = val; applyWcag(_this.root, _this.state.wcag); });
        var cursorClrSel = this.buildCustomSelect([
            { val: 'def', label: 'Domyślny' },
            { val: 'w', label: 'Biały' },
            { val: 'y', label: 'Żółty' },
            { val: 'b2', label: 'Błękitny' },
        ], w.cursorColor, function (val) { _this.state.wcag.cursorColor = val; applyWcag(_this.root, _this.state.wcag); });
        var cursorSelWrap = document.createElement('div');
        cursorSelWrap.style.cssText = 'display: flex !important; gap: 6px !important;';
        cursorSelWrap.append(cursorSzSel, cursorClrSel);
        row7.appendChild(cursorSelWrap);
        grid.append(row1, row2, row3, row4, row5, row6, row7);
        var footer = document.createElement('div');
        footer.className = 'ku-settings-footer';
        var closeBtn = this.createBtn('Zamknij', 280, function () {
            playClick(_this.state.wcag.soundEnabled);
            _this.closePopup();
        });
        footer.appendChild(closeBtn);
        card.append(titleEl, grid, footer);
        var overlay = this.openOverlay(game, card);
        this.bindPopupKeys(overlay);
        setTimeout(function () { return closeBtn.focus(); }, 50);
    };
    App.prototype.buildSettingsRow = function (label, full) {
        if (full === void 0) { full = false; }
        var row = document.createElement('div');
        row.className = "ku-settings-row".concat(full ? ' full' : '');
        var lbl = document.createElement('span');
        lbl.className = 'ku-settings-label';
        lbl.textContent = label;
        row.appendChild(lbl);
        return row;
    };
    App.prototype.buildToggle = function (initial, onChange) {
        var btn = document.createElement('button');
        btn.className = "ku-toggle ".concat(initial ? 'on' : 'off');
        btn.textContent = initial ? 'WŁĄCZONY' : 'WYŁĄCZONY';
        btn.setAttribute('role', 'switch');
        btn.setAttribute('aria-checked', String(initial));
        var state = initial;
        btn.addEventListener('click', function () {
            state = !state;
            btn.className = "ku-toggle ".concat(state ? 'on' : 'off');
            btn.textContent = state ? 'WŁĄCZONY' : 'WYŁĄCZONY';
            btn.setAttribute('aria-checked', String(state));
            onChange(state);
        });
        return btn;
    };
    // PLANET POPUP (LPM)
    App.prototype.openPlanetPopup = function (game, planet) {
        var _this = this;
        var popup = document.createElement('div');
        popup.className = 'ku-popup';
        popup.style.setProperty('width', '560px', 'important');
        popup.setAttribute('role', 'dialog');
        popup.setAttribute('aria-label', planet.name);
        popup.setAttribute('aria-modal', 'true');
        popup.style.setProperty('background-image', "url(".concat(this.p('images/popup_simple_920x650.png'), ")"), 'important');
        var inner = document.createElement('div');
        inner.className = 'ku-popup-inner';
        var title = document.createElement('h2');
        title.className = 'ku-popup-title';
        title.textContent = planet.name;
        var sep = document.createElement('div');
        sep.className = 'ku-popup-sep';
        var body = document.createElement('div');
        body.className = 'ku-popup-body';
        var descP = document.createElement('p');
        descP.textContent = planet.desc || this.getDefaultDesc(planet);
        body.appendChild(descP);
        if (planet.stats && planet.stats.length > 0) {
            var statsGrid_1 = document.createElement('div');
            statsGrid_1.className = 'ku-planet-stats';
            planet.stats.forEach(function (s) {
                var item = document.createElement('div');
                item.className = 'ku-stat-item';
                var strong = document.createElement('strong');
                strong.textContent = s.l;
                var val = document.createTextNode(' ' + s.v);
                item.append(strong, val);
                statsGrid_1.appendChild(item);
            });
            body.appendChild(statsGrid_1);
        }
        var footer = document.createElement('div');
        footer.className = 'ku-popup-footer';
        var closeBtn = this.createBtn('Zamknij', 280, function () {
            playClick(_this.state.wcag.soundEnabled);
            _this.closePopup();
        });
        footer.appendChild(closeBtn);
        inner.append(title, sep, body, footer);
        popup.appendChild(inner);
        var overlay = this.openOverlay(game, popup);
        this.bindPopupKeys(overlay);
        setTimeout(function () { return closeBtn.focus(); }, 50);
    };
    // ONBOARDING
    App.prototype.showOnboarding = function (game) {
        var _this = this;
        var step = 0;
        var steps = [
            {
                icon: '🔭',
                title: 'Nawigacja',
                text: '<strong>Komputer:</strong> Przesuwaj widok trzymając lewy przycisk myszy. Przybliżaj/oddalaj kółkiem myszy.<br><br><strong>Dotyk:</strong> Przesuwaj palcem. Uszczypnij, aby zmienić powiększenie.',
            },
            {
                icon: '▶',
                title: 'Interakcje',
                text: 'Kliknij <strong>Lewym przyciskiem myszy (LPM)</strong>, aby zobaczyć szczegóły planety.<br><strong>Prawy przycisk myszy (PPM)</strong> otwiera szybki opis.<br><strong>Najazd kursorem:</strong> Zatrzymuje planetę na orbicie i wyświetla jej nazwę.',
            },
            {
                icon: '♿',
                title: 'Dostępność',
                text: 'Kliknij ikonę ustawień (trybik) w górnym rogu, aby dostosować kontrast, wielkość tekstu, kursor i filtry kolorów.',
            },
        ];
        var card = document.createElement('div');
        card.className = 'ku-onboarding-card';
        card.setAttribute('role', 'dialog');
        card.setAttribute('aria-label', 'Wprowadzenie');
        card.setAttribute('aria-modal', 'true');
        var render = function () {
            var s = steps[step];
            card.innerHTML = "\n        <div class=\"ku-onboarding-icon\">".concat(s.icon, "</div>\n        <div class=\"ku-onboarding-title\">").concat(s.title, "</div>\n        <div class=\"ku-onboarding-text\">").concat(s.text, "</div>\n        <div class=\"ku-onboarding-dots\">\n          ").concat(steps.map(function (_, i) { return "<div class=\"ku-dot".concat(i === step ? ' active' : '', "\"></div>"); }).join(''), "\n        </div>\n        <div class=\"ku-onboarding-footer\"></div>\n      ");
            var footer = card.querySelector('.ku-onboarding-footer');
            var skipBtn = document.createElement('button');
            skipBtn.className = 'ku-btn-ob';
            skipBtn.textContent = 'Pomiń';
            skipBtn.addEventListener('click', function () { playClick(_this.state.wcag.soundEnabled); _this.closePopup(); });
            var nextBtn = document.createElement('button');
            nextBtn.className = 'ku-btn-ob primary';
            nextBtn.textContent = step < steps.length - 1 ? 'Dalej' : 'Rozumiem';
            nextBtn.addEventListener('click', function () {
                playClick(_this.state.wcag.soundEnabled);
                if (step < steps.length - 1) {
                    step++;
                    render();
                }
                else {
                    _this.closePopup();
                }
            });
            footer.append(skipBtn, nextBtn);
            setTimeout(function () { return nextBtn.focus(); }, 30);
        };
        render();
        var overlay = this.openOverlay(game, card, true);
        this.bindPopupKeys(overlay);
    };
    // ============================================================
    // UTILITIES
    // ============================================================
    App.prototype.clearScreen = function (game) {
        var _a, _b;
        (_a = this.engine) === null || _a === void 0 ? void 0 : _a.destroy();
        this.engine = null;
        (_b = this.modelEngine) === null || _b === void 0 ? void 0 : _b.destroy();
        this.modelEngine = null;
        ['ku-welcome', 'ku-solar', 'ku-model', 'ku-popup-overlay'].forEach(function (id) {
            var _a;
            (_a = document.getElementById(id)) === null || _a === void 0 ? void 0 : _a.remove();
        });
    };
    App.prototype.buildCustomSelect = function (options, initialVal, onChange) {
        var _a, _b, _c, _d;
        var wrap = document.createElement('div');
        wrap.className = 'ku-custom-select';
        var btn = document.createElement('button');
        btn.className = 'ku-select ku-custom-select-btn';
        btn.setAttribute('aria-haspopup', 'listbox');
        btn.textContent = (_d = (_b = (_a = options.find(function (o) { return o.val === initialVal; })) === null || _a === void 0 ? void 0 : _a.label) !== null && _b !== void 0 ? _b : (_c = options[0]) === null || _c === void 0 ? void 0 : _c.label) !== null && _d !== void 0 ? _d : '';
        var dropdown = document.createElement('div');
        dropdown.className = 'ku-custom-select-dropdown';
        dropdown.setAttribute('role', 'listbox');
        dropdown.style.display = 'none';
        var close = function () { dropdown.style.display = 'none'; };
        var open = function () { dropdown.style.display = 'block'; };
        options.forEach(function (opt) {
            var item = document.createElement('button');
            item.className = 'ku-custom-select-item';
            item.setAttribute('role', 'option');
            if (opt.val === initialVal)
                item.classList.add('selected');
            item.textContent = opt.label;
            item.addEventListener('click', function (e) {
                e.stopPropagation();
                btn.textContent = opt.label;
                dropdown.querySelectorAll('.ku-custom-select-item').forEach(function (i) { return i.classList.remove('selected'); });
                item.classList.add('selected');
                close();
                btn.focus();
                onChange(opt.val);
            });
            dropdown.appendChild(item);
        });
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            dropdown.style.display === 'none' ? open() : close();
        });
        btn.addEventListener('keydown', function (e) {
            var _a;
            if (e.key === 'Escape') {
                close();
            }
            if (e.key === 'ArrowDown' || (e.key === 'Enter' && dropdown.style.display === 'none')) {
                e.preventDefault();
                open();
                (_a = dropdown.firstElementChild) === null || _a === void 0 ? void 0 : _a.focus();
            }
        });
        wrap.addEventListener('focusout', function (e) {
            if (!wrap.contains(e.relatedTarget))
                close();
        });
        wrap.append(btn, dropdown);
        return wrap;
    };
    App.prototype.createBtn = function (label, width, onClick) {
        var btn = document.createElement('button');
        btn.className = "ku-btn ku-btn-".concat(width);
        btn.setAttribute('aria-label', label);
        // Use PNG where available, SVG for 420 (no PNG exists)
        var ext = width === 420 ? 'svg' : 'png';
        btn.style.setProperty('background-image', "url(".concat(this.p("images/btn_".concat(width, "x80.").concat(ext)), ")"), 'important');
        btn.textContent = label;
        btn.addEventListener('click', onClick);
        return btn;
    };
    return App;
}());


;// ./src/main.ts
// ============================================================
// MAIN.TS — ZPE Entry Point (ZPE-Port 2.0)
// Kosmiczne Układy v1.0 | Vanta AI Studio
// ============================================================
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};


console.log('[KU] Kosmiczne Układy v1.0.2 loaded (ZPE-Port 2.0)');
var app = null;
var _savedState = {};
function init(container) {
    return __awaiter(this, void 0, Promise, function () {
        return __generator(this, function (_a) {
            console.log('[KU] init() called, container:', container);
            try {
                app = new App(container);
                app.mount();
                console.log('[KU] mount() done');
            }
            catch (err) {
                console.error('[KU] init() error:', err);
                throw err;
            }
            return [2 /*return*/];
        });
    });
}
function run(stateData, isFrozen) {
    return __awaiter(this, void 0, Promise, function () {
        return __generator(this, function (_a) {
            if (stateData && app) {
                app.restoreState(stateData);
            }
            if (isFrozen && app) {
                app.freeze();
            }
            else if (app) {
                app.resume();
            }
            return [2 /*return*/];
        });
    });
}
function unload() {
    return __awaiter(this, void 0, Promise, function () {
        return __generator(this, function (_a) {
            if (app) {
                app.saveState(function (data) { _savedState = data; });
                app.removeListeners();
            }
            return [2 /*return*/];
        });
    });
}
function destroy() {
    return __awaiter(this, void 0, Promise, function () {
        return __generator(this, function (_a) {
            if (app) {
                app.unmount();
                app = null;
            }
            return [2 /*return*/];
        });
    });
}
/* harmony default export */ var main = (create(init, run, unload, destroy));

/******/ 	return __webpack_exports__;
/******/ })()
;
});;