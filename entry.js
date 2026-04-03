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
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ engineFactory; }
});

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
            { id: 'ziemia', name: 'Ziemia', r: 22, orbit: 0, speed: 0, glow: false, clr: '#4488cc', palette: { h: '#88ccff', c: '#2266aa', d: '#0a2244', atm: 'rgba(80,140,255,0.5)' } },
            { id: 'ksiezyc', name: 'Księżyc', r: 10, orbit: 65, speed: 2.0, glow: false, clr: '#c8c8c8', palette: { h: '#e0e0e0', c: '#999', d: '#555' } },
            { id: 'merkury_p', name: 'Merkury', r: 9, orbit: 105, speed: 1.6, glow: false, clr: '#aaaaaa', palette: { h: '#e0e0e0', c: '#999', d: '#555' } },
            { id: 'wenus_p', name: 'Wenus', r: 13, orbit: 150, speed: 1.1, glow: false, clr: '#e8c060', palette: { h: '#ffe8a0', c: '#d4a840', d: '#806020', atm: 'rgba(255,220,120,0.5)' } },
            { id: 'slonce_p', name: 'Słońce', r: 22, orbit: 205, speed: 0.75, glow: true, clr: '#FFA500' },
            { id: 'mars_p', name: 'Mars', r: 12, orbit: 258, speed: 0.55, glow: false, clr: '#cc4422', palette: { h: '#ee8866', c: '#aa3311', d: '#551108', atm: 'rgba(200,80,40,0.5)' } },
            { id: 'jowisz_p', name: 'Jowisz', r: 17, orbit: 315, speed: 0.36, glow: false, clr: '#c8a060', palette: { h: '#f0d090', c: '#a07030', d: '#503010', bands: true } },
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
            { id: 'slonce_k', name: 'Słońce', r: 30, orbit: 0, speed: 0, glow: true, clr: '#FFB700' },
            { id: 'merkury_k', name: 'Merkury', r: 8, orbit: 65, speed: 2.3, glow: false, clr: '#aaaaaa', palette: { h: '#e0e0e0', c: '#999', d: '#555' } },
            { id: 'wenus_k', name: 'Wenus', r: 12, orbit: 110, speed: 1.55, glow: false, clr: '#e8c060', palette: { h: '#ffe8a0', c: '#d4a840', d: '#806020', atm: 'rgba(255,220,120,0.5)' } },
            { id: 'ziemia_k', name: 'Ziemia', r: 13, orbit: 165, speed: 1.0, glow: false, clr: '#4488cc', palette: { h: '#88ccff', c: '#2266aa', d: '#0a2244', atm: 'rgba(80,140,255,0.5)' } },
            { id: 'mars_k', name: 'Mars', r: 11, orbit: 225, speed: 0.65, glow: false, clr: '#cc4422', palette: { h: '#ee8866', c: '#aa3311', d: '#551108', atm: 'rgba(200,80,40,0.5)' } },
            { id: 'jowisz_k', name: 'Jowisz', r: 22, orbit: 300, speed: 0.33, glow: false, clr: '#c8a060', palette: { h: '#f0d090', c: '#a07030', d: '#503010', bands: true } },
            { id: 'saturn_k', name: 'Saturn', r: 20, orbit: 375, speed: 0.20, glow: false, clr: '#d4b870', ring: true, palette: { h: '#f8e0a0', c: '#b09040', d: '#604808', bands: true } },
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
            { id: 'slonce_w', name: 'Słońce', r: 30, orbit: 0, speed: 0, glow: true, clr: '#FFB700' },
            { id: 'merkury_w', name: 'Merkury', r: 7, orbit: 58, speed: 2.5, glow: false, clr: '#aaaaaa', palette: { h: '#e0e0e0', c: '#999', d: '#555' } },
            { id: 'wenus_w', name: 'Wenus', r: 11, orbit: 100, speed: 1.65, glow: false, clr: '#e8c060', palette: { h: '#ffe8a0', c: '#d4a840', d: '#806020', atm: 'rgba(255,220,120,0.5)' } },
            { id: 'ziemia_w', name: 'Ziemia', r: 12, orbit: 148, speed: 1.0, glow: false, clr: '#4488cc', palette: { h: '#88ccff', c: '#2266aa', d: '#0a2244', atm: 'rgba(80,140,255,0.5)' } },
            { id: 'mars_w', name: 'Mars', r: 10, orbit: 200, speed: 0.62, glow: false, clr: '#cc4422', palette: { h: '#ee8866', c: '#aa3311', d: '#551108', atm: 'rgba(200,80,40,0.5)' } },
            { id: 'jowisz_w', name: 'Jowisz', r: 24, orbit: 265, speed: 0.31, glow: false, clr: '#c8a060', palette: { h: '#f0d090', c: '#a07030', d: '#503010', bands: true } },
            { id: 'saturn_w', name: 'Saturn', r: 21, orbit: 335, speed: 0.21, glow: false, clr: '#d4b870', ring: true, palette: { h: '#f8e0a0', c: '#b09040', d: '#604808', bands: true } },
            { id: 'uran_w', name: 'Uran', r: 16, orbit: 400, speed: 0.12, glow: false, clr: '#7de8e8', palette: { h: '#b0ffff', c: '#40c0c0', d: '#105050', atm: 'rgba(100,230,230,0.5)' } },
            { id: 'neptun_w', name: 'Neptun', r: 15, orbit: 460, speed: 0.08, glow: false, clr: '#3a70e8', palette: { h: '#80b0ff', c: '#2050cc', d: '#0a1866', atm: 'rgba(60,100,240,0.5)' } },
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
        // Mapping planet base IDs to actual asset filenames
        var imgMap = {
            'slonce': 'slonce.png',
            'ziemia': 'ziemia.png',
            'merkury': 'merkury.png',
            'wenus': 'wenus.png',
            'mars': 'mars.png',
            'jowisz': 'jowisz.png',
            'saturn': 'saturn.png',
            'uran': 'uran.png',
            'neptun': 'neptun.png',
            'ksiezyc': 'ksiezyc.png',
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
        if (p.glow) {
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
    style.textContent = "\n/* === KU ROOT ISOLATION === */\n#ku-root, #ku-root *, #ku-root *::before, #ku-root *::after {\n  box-sizing: border-box !important;\n  font-family: 'Segoe UI', Arial, sans-serif !important;\n}\n#ku-root {\n  display: block !important;\n  width: 1920px !important;\n  height: 1080px !important;\n  margin: 0 !important;\n  padding: 0 !important;\n  overflow: hidden !important;\n  overscroll-behavior: none !important;\n  contain: layout style !important;\n  cursor: var(--ku-cursor, auto) !important;\n}\n#ku-root *, #ku-root input, #ku-root button, #ku-root textarea {\n  cursor: inherit !important;\n}\n/* select musi mie\u0107 jawny kursor \u2014 inherit nie dzia\u0142a we wszystkich przegl\u0105darkach */\n#ku-root select { cursor: var(--ku-cursor, auto) !important; }\n\n/* === LAYOUT === */\n#ku-root .ku-game {\n  position: relative !important;\n  width: 1920px !important;\n  height: 1080px !important;\n  overflow: hidden !important;\n  background: #000510 !important;\n  overscroll-behavior: none !important;\n  touch-action: pan-x pan-y !important;\n}\n\n/* === TOPBAR === */\n#ku-root .ku-topbar {\n  position: absolute !important;\n  top: 0 !important; left: 0 !important; right: 0 !important;\n  height: ".concat(TOPBAR_H, "px !important;\n  z-index: 800 !important;\n  display: flex !important;\n  align-items: center !important;\n  justify-content: center !important;\n  background: transparent !important;\n  overflow: hidden !important;\n}\n#ku-root .ku-topbar-bg {\n  position: absolute !important;\n  inset: 0 !important;\n  width: 100% !important; height: 100% !important;\n}\n#ku-root .ku-topbar-title {\n  position: relative !important;\n  z-index: 1 !important;\n  color: #FFD700 !important;\n  font-size: 22px !important;\n  font-weight: 700 !important;\n  letter-spacing: 3px !important;\n  text-transform: uppercase !important;\n  text-shadow: 2px 2px 4px #8B6000, 0 0 12px rgba(255,215,0,0.5) !important;\n}\n#ku-root .ku-topbar-btns {\n  position: absolute !important;\n  right: 18px !important;\n  top: 50% !important;\n  transform: translateY(-50%) !important;\n  display: flex !important;\n  gap: 10px !important;\n  z-index: 1 !important;\n}\n#ku-root .ku-topbar-btn {\n  position: relative !important;\n  width: 52px !important; height: 52px !important;\n  display: flex !important;\n  align-items: center !important;\n  justify-content: center !important;\n  border: none !important;\n  background: transparent !important;\n  padding: 0 !important;\n  cursor: inherit !important;\n  transition: transform 0.15s, filter 0.15s !important;\n  border-radius: 50% !important;\n  outline-offset: 3px !important;\n}\n#ku-root .ku-topbar-btn:hover { transform: scale(1.12) !important; filter: brightness(1.25) !important; }\n#ku-root .ku-topbar-btn:focus { outline: 3px solid #FFD700 !important; }\n#ku-root .ku-topbar-btn img, #ku-root .ku-topbar-btn svg { position: relative !important; z-index: 1 !important; width: 30px !important; height: 30px !important; }\n#ku-root .ku-topbar-btn .ku-btn-bg {\n  position: absolute !important; inset: 0 !important;\n  width: 100% !important; height: 100% !important;\n  border-radius: 50% !important;\n}\n\n/* === OVERLAY === */\n#ku-root .ku-overlay {\n  position: absolute !important;\n  top: ").concat(TOPBAR_H, "px !important;\n  left: 0 !important; right: 0 !important; bottom: 0 !important;\n  background: rgba(0,2,20,0.85) !important;\n  z-index: 600 !important;\n  display: flex !important;\n  align-items: center !important;\n  justify-content: center !important;\n}\n/* pe\u0142ny overlay (onboarding) \u2014 topbar (z-index 800) i tak go przykrywa */\n#ku-root .ku-overlay.ku-overlay-full {\n  top: 0 !important;\n  z-index: 750 !important;\n}\n\n/* === WELCOME SCREEN === */\n#ku-root .ku-welcome {\n  position: absolute !important;\n  inset: 0 !important;\n  display: flex !important;\n  align-items: center !important;\n  justify-content: center !important;\n}\n#ku-root .ku-welcome-bg {\n  position: absolute !important;\n  inset: 0 !important;\n  width: 100% !important; height: 100% !important;\n  object-fit: cover !important;\n}\n#ku-root .ku-welcome-popup {\n  position: relative !important;\n  z-index: 10 !important;\n  width: 700px !important;\n  min-height: 440px !important;\n  display: flex !important;\n  flex-direction: column !important;\n  align-items: center !important;\n  padding: 40px 50px 30px !important;\n  margin-top: 34px !important;\n}\n#ku-root .ku-welcome-popup-bg {\n  position: absolute !important;\n  inset: 0 !important;\n  width: 100% !important; height: 100% !important;\n}\n#ku-root .ku-welcome-content { position: relative !important; z-index: 1 !important; width: 100% !important; }\n#ku-root .ku-welcome-title {\n  color: #FFD700 !important;\n  font-size: 32px !important;\n  font-weight: 700 !important;\n  text-align: center !important;\n  margin: 0 0 16px !important;\n  text-shadow: 2px 2px 6px rgba(0,0,0,0.8) !important;\n}\n#ku-root .ku-welcome-desc {\n  color: #fff !important;\n  font-size: 17px !important;\n  font-weight: 600 !important;\n  text-align: center !important;\n  line-height: 1.55 !important;\n  margin: 0 0 20px !important;\n}\n#ku-root .ku-task-box {\n  display: flex !important;\n  align-items: flex-start !important;\n  gap: 14px !important;\n  background: rgba(0,0,0,0.3) !important;\n  border-radius: 10px !important;\n  padding: 14px 18px !important;\n  margin-bottom: 24px !important;\n}\n#ku-root .ku-task-icon { width: 52px !important; height: 52px !important; flex-shrink: 0 !important; }\n#ku-root .ku-task-text { color: #fff !important; font-size: 15px !important; line-height: 1.5 !important; }\n#ku-root .ku-task-text strong { color: #FFD700 !important; }\n#ku-root .ku-welcome-footer {\n  display: flex !important;\n  gap: 20px !important;\n  justify-content: center !important;\n  width: 100% !important;\n}\n\n/* Decorations */\n#ku-root .ku-deco {\n  position: absolute !important;\n  pointer-events: none !important;\n  z-index: 5 !important;\n}\n\n/* === SOLAR SCREEN === */\n#ku-root .ku-solar {\n  position: absolute !important;\n  top: ").concat(TOPBAR_H, "px !important;\n  left: 0 !important; right: 0 !important; bottom: 0 !important;\n  display: flex !important;\n}\n#ku-root .ku-left-panel {\n  width: 190px !important;\n  flex-shrink: 0 !important;\n  display: flex !important;\n  flex-direction: column !important;\n  align-items: center !important;\n  justify-content: center !important;\n  gap: 16px !important;\n  padding: 16px 12px !important;\n  position: relative !important;\n  overflow: hidden !important;\n}\n#ku-root .ku-left-panel-bg {\n  position: absolute !important; inset: 0 !important;\n  width: 100% !important; height: 100% !important; object-fit: cover !important;\n}\n#ku-root .ku-portrait-wrap {\n  position: relative !important;\n  z-index: 1 !important;\n  cursor: inherit !important;\n}\n#ku-root .ku-portrait {\n  width: 160px !important; height: 160px !important;\n  border: 3px solid #444 !important;\n  border-radius: 6px !important;\n  object-fit: cover !important;\n  display: block !important;\n  transition: border-color 0.2s, box-shadow 0.2s !important;\n}\n#ku-root .ku-portrait-wrap:hover .ku-portrait,\n#ku-root .ku-portrait-wrap.active .ku-portrait {\n  border-color: #FFD700 !important;\n  box-shadow: 0 0 20px 5px #FFD700 !important;\n}\n#ku-root .ku-portrait-wrap:focus { outline: 3px solid #FFD700 !important; outline-offset: 3px !important; }\n\n#ku-root .ku-portrait-tooltip {\n  position: absolute !important;\n  left: 168px !important;\n  top: 50% !important;\n  transform: translateY(-50%) !important;\n  background: #000 !important;\n  border: 1px solid #FFD700 !important;\n  color: #fff !important;\n  padding: 6px 12px !important;\n  border-radius: 4px !important;\n  white-space: nowrap !important;\n  font-size: 13px !important;\n  font-style: italic !important;\n  z-index: 200 !important;\n  pointer-events: none !important;\n}\n#ku-root .ku-portrait-tooltip strong { color: #FFD700 !important; }\n\n#ku-root .ku-canvas-area {\n  flex: 1 !important;\n  position: relative !important;\n  overflow: hidden !important;\n}\n#ku-root .ku-canvas-title {\n  position: absolute !important;\n  top: 10px !important;\n  left: 50% !important;\n  transform: translateX(-50%) !important;\n  z-index: 50 !important;\n  color: #fff !important;\n  font-size: 22px !important;\n  font-weight: 700 !important;\n  text-shadow: 1px 1px 3px rgba(0,0,0,0.9) !important;\n  background: rgba(0,0,0,0.55) !important;\n  padding: 6px 18px !important;\n  border-radius: 6px !important;\n  white-space: nowrap !important;\n}\n#ku-root .ku-game-canvas {\n  display: block !important;\n  width: 100% !important;\n  height: 100% !important;\n}\n#ku-root .ku-zoom-bar {\n  position: absolute !important;\n  bottom: 50px !important;\n  right: 14px !important;\n  display: flex !important;\n  gap: 6px !important;\n  z-index: 50 !important;\n}\n#ku-root .ku-zoom-btn {\n  width: 36px !important; height: 36px !important;\n  background: rgba(0,0,0,0.6) !important;\n  border: 1px solid rgba(255,255,255,0.3) !important;\n  border-radius: 6px !important;\n  color: #fff !important;\n  font-size: 18px !important;\n  display: flex !important;\n  align-items: center !important;\n  justify-content: center !important;\n  cursor: inherit !important;\n  transition: background 0.15s !important;\n}\n#ku-root .ku-zoom-btn:hover { background: rgba(255,215,0,0.2) !important; border-color: #FFD700 !important; }\n#ku-root .ku-zoom-btn:focus { outline: 3px solid #FFD700 !important; }\n\n#ku-root .ku-astro-deco {\n  position: absolute !important;\n  bottom: 10px !important; right: 14px !important;\n  width: 80px !important;\n  z-index: 30 !important;\n  pointer-events: none !important;\n}\n#ku-root .ku-satellite-deco {\n  position: absolute !important;\n  top: 50px !important; left: 60px !important;\n  width: 55px !important;\n  z-index: 30 !important;\n  pointer-events: none !important;\n}\n\n/* === MODEL SCREEN === */\n#ku-root .ku-model {\n  position: absolute !important;\n  top: ").concat(TOPBAR_H, "px !important;\n  left: 0 !important; right: 0 !important; bottom: 0 !important;\n  display: flex !important;\n  flex-direction: column !important;\n}\n#ku-root .ku-model-title {\n  color: #fff !important;\n  font-size: 22px !important;\n  font-weight: 700 !important;\n  text-align: center !important;\n  padding: 12px 24px !important;\n  background: rgba(0,0,0,0.55) !important;\n  text-shadow: 1px 1px 3px rgba(0,0,0,0.9) !important;\n  flex-shrink: 0 !important;\n}\n#ku-root .ku-model-canvas-wrap {\n  flex: 1 !important;\n  position: relative !important;\n  overflow: hidden !important;\n}\n#ku-root .ku-model-footer {\n  display: flex !important;\n  justify-content: center !important;\n  padding: 10px !important;\n  background: rgba(0,0,0,0.4) !important;\n  flex-shrink: 0 !important;\n}\n\n/* === BUTTONS === */\n#ku-root .ku-btn {\n  position: relative !important;\n  display: inline-flex !important;\n  align-items: center !important;\n  justify-content: center !important;\n  border: none !important;\n  background: transparent !important;\n  padding: 0 !important;\n  cursor: inherit !important;\n  font-weight: 700 !important;\n  color: #FFD700 !important;\n  font-size: 18px !important;\n  text-shadow: 1px 1px 2px rgba(0,0,0,0.8) !important;\n  transition: filter 0.15s, transform 0.15s !important;\n  outline-offset: 3px !important;\n}\n#ku-root .ku-btn:hover { filter: brightness(1.2) !important; transform: scale(1.03) !important; }\n#ku-root .ku-btn:focus { outline: 3px solid #FFD700 !important; }\n#ku-root .ku-btn img { position: absolute !important; inset: 0 !important; width: 100% !important; height: 100% !important; }\n#ku-root .ku-btn span { position: relative !important; z-index: 1 !important; }\n#ku-root .ku-btn-280 { width: 280px !important; height: 80px !important; }\n#ku-root .ku-btn-420 { width: 420px !important; height: 80px !important; }\n#ku-root .ku-btn-620 { width: 620px !important; height: 80px !important; }\n\n/* === POPUPS === */\n#ku-root .ku-popup {\n  position: relative !important;\n  display: flex !important;\n  flex-direction: column !important;\n  max-height: calc(1080px - ").concat(TOPBAR_H, "px - 40px) !important;\n  overflow: hidden !important;\n}\n#ku-root .ku-popup-bg {\n  position: absolute !important; inset: 0 !important;\n  width: 100% !important; height: 100% !important;\n  object-fit: fill !important;\n  border-radius: 8px !important;\n}\n#ku-root .ku-popup-inner {\n  position: relative !important;\n  z-index: 1 !important;\n  display: flex !important;\n  flex-direction: column !important;\n  height: 100% !important;\n  padding: 28px 36px !important;\n}\n#ku-root .ku-popup-title {\n  color: #FFD700 !important;\n  font-size: 22px !important;\n  font-weight: 700 !important;\n  margin: 0 0 12px !important;\n  text-align: center !important;\n  text-shadow: 2px 2px 4px rgba(0,0,0,0.8) !important;\n}\n#ku-root .ku-popup-sep {\n  width: 100% !important; height: 3px !important;\n  background: linear-gradient(90deg, transparent, #FFD700, transparent) !important;\n  margin: 0 0 16px !important;\n}\n#ku-root .ku-popup-body {\n  flex: 1 !important;\n  overflow-y: auto !important;\n  color: #fff !important;\n  font-size: 15px !important;\n  line-height: 1.6 !important;\n  scrollbar-width: thin !important;\n}\n#ku-root .ku-popup-footer {\n  display: flex !important;\n  gap: 16px !important;\n  justify-content: center !important;\n  padding-top: 16px !important;\n  flex-shrink: 0 !important;\n}\n\n/* === BIOGRAPHY POPUP === */\n#ku-root .ku-bio-wrap {\n  width: 860px !important;\n}\n#ku-root .ku-bio-body {\n  display: flex !important;\n  gap: 20px !important;\n  align-items: flex-start !important;\n}\n#ku-root .ku-bio-pic {\n  width: 196px !important; height: 236px !important;\n  object-fit: cover !important;\n  border: 2px solid #FFD700 !important;\n  border-radius: 4px !important;\n  flex-shrink: 0 !important;\n}\n#ku-root .ku-bio-text { flex: 1 !important; }\n#ku-root .ku-bio-text p { margin: 0 0 12px !important; }\n\n/* === SETTINGS POPUP === */\n#ku-root .ku-settings-card {\n  width: 680px !important;\n  background: linear-gradient(160deg, #0e2a52, #0a1e3d, #071530) !important;\n  border: 2px solid #2a5090 !important;\n  border-radius: 12px !important;\n  overflow: hidden !important;\n}\n#ku-root .ku-settings-title {\n  color: #FFD700 !important;\n  font-size: 20px !important;\n  font-weight: 700 !important;\n  letter-spacing: 2px !important;\n  text-align: center !important;\n  padding: 20px !important;\n  text-transform: uppercase !important;\n  text-shadow: 2px 2px 4px rgba(0,0,0,0.8) !important;\n  border-bottom: 1px solid rgba(255,255,255,0.1) !important;\n}\n#ku-root .ku-settings-grid {\n  display: grid !important;\n  grid-template-columns: 1fr 1fr !important;\n  gap: 0 !important;\n  padding: 0 !important;\n}\n#ku-root .ku-settings-row {\n  display: flex !important;\n  align-items: center !important;\n  justify-content: space-between !important;\n  padding: 12px 20px !important;\n  border-bottom: 1px solid rgba(255,255,255,0.07) !important;\n  gap: 12px !important;\n}\n#ku-root .ku-settings-row.full {\n  grid-column: 1 / -1 !important;\n}\n#ku-root .ku-settings-label {\n  color: #aac4e0 !important;\n  font-size: 13px !important;\n  font-weight: 600 !important;\n  white-space: nowrap !important;\n}\n#ku-root .ku-toggle {\n  padding: 5px 12px !important;\n  border: 1px solid transparent !important;\n  border-radius: 4px !important;\n  font-size: 12px !important;\n  font-weight: 700 !important;\n  cursor: inherit !important;\n  white-space: nowrap !important;\n  min-width: 100px !important;\n  text-align: center !important;\n}\n#ku-root .ku-toggle.on { background: #FFD700 !important; color: #1a1200 !important; border-color: #FFD700 !important; }\n#ku-root .ku-toggle.off { background: #1e4a8a !important; color: #FFD700 !important; border-color: #3a6aaa !important; }\n#ku-root .ku-toggle:focus { outline: 3px solid #FFD700 !important; }\n#ku-root .ku-text-size-btns { display: flex !important; gap: 4px !important; }\n#ku-root .ku-text-size-btn {\n  width: 30px !important; height: 30px !important;\n  border: 1px solid #3a6aaa !important;\n  background: #1e4a8a !important;\n  color: #FFD700 !important;\n  border-radius: 4px !important;\n  cursor: inherit !important;\n  font-weight: 700 !important;\n  display: flex !important; align-items: center !important; justify-content: center !important;\n}\n#ku-root .ku-text-size-btn.active { background: #FFD700 !important; color: #1a1200 !important; }\n#ku-root .ku-text-size-btn:focus { outline: 3px solid #FFD700 !important; }\n#ku-root .ku-select {\n  background: #1e4a8a !important;\n  color: #FFD700 !important;\n  border: 1px solid #3a6aaa !important;\n  border-radius: 4px !important;\n  padding: 4px 8px !important;\n  font-size: 12px !important;\n  cursor: inherit !important;\n}\n#ku-root .ku-select:focus { outline: 3px solid #FFD700 !important; }\n#ku-root .ku-settings-footer {\n  display: flex !important;\n  justify-content: center !important;\n  padding: 16px !important;\n  border-top: 1px solid rgba(255,255,255,0.1) !important;\n}\n#ku-root .ku-btn-outline {\n  border: 2px solid #4a90d9 !important;\n  background: transparent !important;\n  color: #4a90d9 !important;\n  padding: 10px 30px !important;\n  border-radius: 6px !important;\n  font-size: 15px !important;\n  font-weight: 700 !important;\n  cursor: inherit !important;\n  transition: background 0.15s !important;\n}\n#ku-root .ku-btn-outline:hover { background: rgba(74,144,217,0.2) !important; }\n#ku-root .ku-btn-outline:focus { outline: 3px solid #FFD700 !important; }\n\n/* === ONBOARDING === */\n#ku-root .ku-onboarding-card {\n  width: 490px !important;\n  background: linear-gradient(160deg, #0e2a52, #071530) !important;\n  border: 2px solid #3a70c0 !important;\n  border-radius: 12px !important;\n  padding: 28px 32px !important;\n  color: #fff !important;\n}\n#ku-root .ku-onboarding-icon {\n  font-size: 36px !important;\n  text-align: center !important;\n  margin-bottom: 12px !important;\n}\n#ku-root .ku-onboarding-title {\n  color: #FFD700 !important;\n  font-size: 18px !important;\n  font-weight: 700 !important;\n  text-align: center !important;\n  margin-bottom: 12px !important;\n}\n#ku-root .ku-onboarding-text {\n  font-size: 14px !important;\n  line-height: 1.6 !important;\n  color: #dde !important;\n  margin-bottom: 20px !important;\n}\n#ku-root .ku-onboarding-dots {\n  display: flex !important;\n  justify-content: center !important;\n  gap: 8px !important;\n  margin-bottom: 16px !important;\n}\n#ku-root .ku-dot {\n  width: 10px !important; height: 10px !important;\n  border-radius: 50% !important;\n  background: #3a6aaa !important;\n  border: 1px solid #4a90d9 !important;\n  transition: background 0.2s !important;\n}\n#ku-root .ku-dot.active { background: #FFD700 !important; border-color: #FFD700 !important; }\n#ku-root .ku-onboarding-footer {\n  display: flex !important;\n  justify-content: space-between !important;\n  gap: 12px !important;\n}\n#ku-root .ku-btn-ob {\n  border: 2px solid #3a70c0 !important;\n  background: transparent !important;\n  color: #aac4e0 !important;\n  padding: 8px 20px !important;\n  border-radius: 6px !important;\n  font-size: 14px !important;\n  font-weight: 700 !important;\n  cursor: inherit !important;\n}\n#ku-root .ku-btn-ob.primary { background: #2a5090 !important; color: #fff !important; border-color: #4a90d9 !important; }\n#ku-root .ku-btn-ob:hover { filter: brightness(1.2) !important; }\n#ku-root .ku-btn-ob:focus { outline: 3px solid #FFD700 !important; }\n\n/* === INSTRUCTIONS === */\n#ku-root .ku-instr-wrap { width: 720px !important; }\n#ku-root .ku-instr-section { margin-bottom: 14px !important; }\n#ku-root .ku-instr-section h3 { color: #FFD700 !important; font-size: 15px !important; margin: 0 0 6px !important; }\n#ku-root .ku-instr-section ul { margin: 0 !important; padding-left: 18px !important; }\n#ku-root .ku-instr-section li { margin-bottom: 4px !important; }\n\n/* === PLANET TOOLTIP (quick, PPM) === */\n#ku-root .ku-planet-tooltip {\n  position: absolute !important;\n  background: rgba(0,5,30,0.92) !important;\n  border: 1px solid #4a90d9 !important;\n  border-radius: 8px !important;\n  padding: 10px 16px !important;\n  color: #fff !important;\n  font-size: 14px !important;\n  z-index: 400 !important;\n  pointer-events: none !important;\n  max-width: 220px !important;\n  box-shadow: 0 4px 16px rgba(0,0,0,0.5) !important;\n}\n#ku-root .ku-planet-tooltip-title {\n  color: #FFD700 !important;\n  font-size: 16px !important;\n  font-weight: 700 !important;\n  margin-bottom: 4px !important;\n}\n\n/* === WCAG TEXT SIZE (only popup body) === */\n#ku-root.ku-size-2 .ku-popup-body { font-size: 18px !important; }\n#ku-root.ku-size-3 .ku-popup-body { font-size: 21px !important; }\n#ku-root.ku-size-2 .ku-bio-text { font-size: 18px !important; }\n#ku-root.ku-size-3 .ku-bio-text { font-size: 21px !important; }\n#ku-root.ku-size-2 .ku-onboarding-text { font-size: 17px !important; }\n#ku-root.ku-size-3 .ku-onboarding-text { font-size: 19px !important; }\n\n/* === FOCUS styles === */\n#ku-root :focus-visible { outline: 3px solid #FFD700 !important; outline-offset: 2px !important; }\n\n/* === REDUCE MOTION === */\n#ku-root.ku-noanim * { animation: none !important; transition: none !important; }\n\n/* === HIGH CONTRAST (ku-hc) === */\n#ku-root.ku-hc .ku-settings-card {\n  background: #000000 !important;\n  border: 2px solid #FFD700 !important;\n}\n#ku-root.ku-hc .ku-settings-title {\n  color: #FFD700 !important;\n  border-bottom-color: rgba(255,215,0,0.4) !important;\n}\n#ku-root.ku-hc .ku-settings-label { color: #FFD700 !important; }\n#ku-root.ku-hc .ku-settings-row { border-bottom-color: rgba(255,215,0,0.2) !important; }\n#ku-root.ku-hc .ku-settings-footer { border-top-color: rgba(255,215,0,0.3) !important; }\n#ku-root.ku-hc .ku-toggle.on  { background: #FFD700 !important; color: #000 !important; border-color: #FFD700 !important; }\n#ku-root.ku-hc .ku-toggle.off { background: #000 !important; color: #FFD700 !important; border-color: #FFD700 !important; }\n#ku-root.ku-hc .ku-select { background: #000 !important; color: #FFD700 !important; border-color: #FFD700 !important; }\n#ku-root.ku-hc .ku-text-size-btn { background: #000 !important; color: #FFD700 !important; border-color: #FFD700 !important; }\n#ku-root.ku-hc .ku-text-size-btn.active { background: #FFD700 !important; color: #000 !important; }\n/* Przyciski \u2014 tekst czarny na \u017C\u00F3\u0142tym tle w trybie HC */\n#ku-root.ku-hc .ku-btn span { color: #000 !important; text-shadow: none !important; }\n#ku-root.ku-hc .ku-btn-outline { background: #FFD700 !important; color: #000 !important; border-color: #FFD700 !important; }\n#ku-root.ku-hc .ku-portrait { border-color: #FFD700 !important; }\n#ku-root.ku-hc .ku-canvas-title { background: #000 !important; color: #FFD700 !important; }\n#ku-root.ku-hc .ku-zoom-btn { border-color: #FFD700 !important; background: #000 !important; color: #FFD700 !important; }\n#ku-root.ku-hc .ku-popup-body { color: #fff !important; }\n#ku-root.ku-hc .ku-popup-title { color: #FFD700 !important; }\n\n/* === SCROLLBAR === */\n#ku-root .ku-popup-body::-webkit-scrollbar { width: 8px !important; }\n#ku-root .ku-popup-body::-webkit-scrollbar-track { background: rgba(255,255,255,0.05) !important; }\n#ku-root .ku-popup-body::-webkit-scrollbar-thumb { background: #3a6aaa !important; border-radius: 4px !important; }\n  ");
    document.head.appendChild(style);
}
// ============================================================
// MAIN APP CLASS
// ============================================================
var App = /** @class */ (function () {
    function App(container, params) {
        this.engine = null;
        this.modelEngine = null;
        this.currentPopup = null;
        this.popupTrigger = null;
        this.tooltipEl = null;
        this.hoveredPortraitIdx = -1;
        this.container = container;
        this.params = params;
        this.state = JSON.parse(JSON.stringify(DEFAULT_STATE));
    }
    App.prototype.mount = function () {
        injectCSS();
        // SVG color filter
        var filterSVG = createColorFilterSVG();
        document.body.appendChild(filterSVG);
        // Root element
        this.root = document.createElement('div');
        this.root.id = 'ku-root';
        this.root.className = 'ku-size-1';
        var game = document.createElement('div');
        game.className = 'ku-game';
        this.root.appendChild(game);
        this.container.appendChild(this.root);
        this.renderTopbar(game);
        this.showWelcome(game);
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
        if (typeof this.params.path === 'function')
            return this.params.path(name);
        if (typeof this.params.enginePath === 'function')
            return this.params.enginePath(name);
        return name;
    };
    // ============================================================
    // TOPBAR
    // ============================================================
    App.prototype.renderTopbar = function (game) {
        var _this = this;
        var tb = document.createElement('div');
        tb.className = 'ku-topbar';
        tb.setAttribute('aria-label', 'Pasek nawigacji');
        // Background
        var bg = document.createElement('img');
        bg.className = 'ku-topbar-bg';
        bg.src = this.p('images/top_bar.svg');
        bg.alt = '';
        bg.setAttribute('aria-hidden', 'true');
        tb.appendChild(bg);
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
        var bgImg = document.createElement('img');
        bgImg.className = 'ku-btn-bg';
        bgImg.src = this.p('images/btn_circle_bg.svg');
        bgImg.alt = '';
        bgImg.setAttribute('aria-hidden', 'true');
        var icon = document.createElement('img');
        icon.src = this.p(iconSrc);
        icon.alt = '';
        btn.append(bgImg, icon);
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
            { file: 'images/rys_05.png', style: 'right:30px;bottom:60px;width:100px;', alt: '' },
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
        var popupBg = document.createElement('img');
        popupBg.className = 'ku-welcome-popup-bg';
        popupBg.src = this.p('images/popup_simple_920x650.svg');
        popupBg.alt = '';
        popupBg.setAttribute('aria-hidden', 'true');
        popup.appendChild(popupBg);
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
        taskIcon.src = this.p('images/icon_clipboard.svg.png');
        taskIcon.alt = '';
        var taskText = document.createElement('p');
        taskText.className = 'ku-task-text';
        taskText.innerHTML = '<strong>Twoje zadanie:</strong> poznaj trzy wizje kosmosu: od układu geocentrycznego po heliocentryczny. Zobacz jak zmieniała się ta wizja w zależności od epoki.';
        taskBox.append(taskIcon, taskText);
        var footer = document.createElement('div');
        footer.className = 'ku-welcome-footer';
        var instrBtn = this.createBtn('Instrukcja', 280, function () {
            playClick(_this.state.wcag.soundEnabled);
            _this.openInstructions(game, instrBtn);
        });
        var startBtn = this.createBtn('Rozpocznij grę', 280, function () {
            playClick(_this.state.wcag.soundEnabled);
            _this.showSolar(game);
        });
        footer.append(instrBtn, startBtn);
        content.append(titleEl, desc, taskBox, footer);
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
        var canvasTitle = document.createElement('div');
        canvasTitle.className = 'ku-canvas-title';
        canvasTitle.id = 'ku-solar-title';
        var activeIdx = this.state.activeAstronomerIndex;
        canvasTitle.textContent = activeIdx >= 0
            ? ASTRONOMERS[activeIdx].screenTitle
            : 'Wybierz model układu słonecznego';
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
        var planets = activeIdx >= 0 ? ASTRONOMERS[activeIdx].planets : ASTRONOMERS[2].planets;
        (_a = this.engine) === null || _a === void 0 ? void 0 : _a.destroy();
        this.engine = new CanvasEngine({
            canvas: canvas,
            planets: planets,
            showOrbits: this.state.wcag.showOrbits,
            reduceMotion: this.state.wcag.reduceMotion,
            pathFn: this.params.path.bind(this.params),
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
        var panelBg = document.createElement('img');
        panelBg.className = 'ku-left-panel-bg';
        panelBg.src = this.p('images/apla_dark.png');
        panelBg.alt = '';
        panelBg.setAttribute('aria-hidden', 'true');
        panel.appendChild(panelBg);
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
        var title = document.createElement('div');
        title.className = 'ku-model-title';
        title.style.cssText = 'position: relative !important; z-index: 10 !important;';
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
        var backBtn = this.createBtn('Powrót', 280, function () {
            var _a;
            playClick(_this.state.wcag.soundEnabled);
            (_a = _this.modelEngine) === null || _a === void 0 ? void 0 : _a.destroy();
            _this.modelEngine = null;
            _this.showSolar(game, true);
        });
        footer.appendChild(backBtn);
        screen.append(title, canvasWrap, footer);
        game.appendChild(screen);
        // Engine
        (_a = this.modelEngine) === null || _a === void 0 ? void 0 : _a.destroy();
        this.modelEngine = new CanvasEngine({
            canvas: canvas,
            planets: astro.planets,
            showOrbits: this.state.wcag.showOrbits,
            reduceMotion: this.state.wcag.reduceMotion,
            pathFn: this.params.path.bind(this.params),
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
        overlay.addEventListener('click', function (e) {
            if (e.target === overlay)
                _this.closePopup();
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
        var bg = document.createElement('img');
        bg.className = 'ku-popup-bg';
        bg.src = this.p('images/popup_simple_920x650.svg');
        bg.alt = '';
        popup.appendChild(bg);
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
            _this.switchModel(idx);
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
        var bg = document.createElement('img');
        bg.className = 'ku-popup-bg';
        bg.src = this.p('images/popup_simple_920x650.svg');
        bg.alt = '';
        popup.appendChild(bg);
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
        var row1 = this.buildSettingsRow('Wielkość tekstu');
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
        var row2 = this.buildSettingsRow('Wysoki kontrast');
        var hcToggle = this.buildToggle(w.highContrast, function (v) {
            _this.state.wcag.highContrast = v;
            applyWcag(_this.root, _this.state.wcag);
        });
        row2.appendChild(hcToggle);
        // Reduce motion
        var row3 = this.buildSettingsRow('Redukcja ruchu');
        var rmToggle = this.buildToggle(w.reduceMotion, function (v) {
            var _a, _b;
            _this.state.wcag.reduceMotion = v;
            (_a = _this.engine) === null || _a === void 0 ? void 0 : _a.setReduceMotion(v);
            (_b = _this.modelEngine) === null || _b === void 0 ? void 0 : _b.setReduceMotion(v);
            applyWcag(_this.root, _this.state.wcag);
        });
        row3.appendChild(rmToggle);
        // Show orbits
        var row4 = this.buildSettingsRow('Widoczność orbit');
        var orbitToggle = this.buildToggle(w.showOrbits, function (v) {
            var _a, _b;
            _this.state.wcag.showOrbits = v;
            (_a = _this.engine) === null || _a === void 0 ? void 0 : _a.setShowOrbits(v);
            (_b = _this.modelEngine) === null || _b === void 0 ? void 0 : _b.setShowOrbits(v);
        });
        row4.appendChild(orbitToggle);
        // Learn mode
        var row5 = this.buildSettingsRow('Tryb nauki');
        var learnToggle = this.buildToggle(w.learnMode, function (v) {
            _this.state.wcag.learnMode = v;
            applyWcag(_this.root, _this.state.wcag);
        });
        row5.appendChild(learnToggle);
        // Color filter
        var row6 = this.buildSettingsRow('Filtr kolorów');
        var colorSel = document.createElement('select');
        colorSel.className = 'ku-select';
        [
            { val: 'none', label: 'Brak' },
            { val: 'gray', label: 'Skala szarości' },
            { val: 'deut', label: 'Deuteranopia' },
            { val: 'prot', label: 'Protanopia' },
            { val: 'trit', label: 'Tritanopia' },
        ].forEach(function (opt) {
            var o = document.createElement('option');
            o.value = opt.val;
            o.textContent = opt.label;
            o.selected = w.colorFilter === opt.val;
            colorSel.appendChild(o);
        });
        colorSel.addEventListener('change', function () {
            _this.state.wcag.colorFilter = colorSel.value;
            applyWcag(_this.root, _this.state.wcag);
        });
        row6.appendChild(colorSel);
        // Cursor size
        var row7 = this.buildSettingsRow('Kursor – rozmiar', true);
        var cursorSzSel = document.createElement('select');
        cursorSzSel.className = 'ku-select';
        [
            { val: 'n', label: 'Normalny' },
            { val: 'd', label: 'Duży' },
            { val: 'b', label: 'Bardzo duży' },
        ].forEach(function (opt) {
            var o = document.createElement('option');
            o.value = opt.val;
            o.textContent = opt.label;
            o.selected = w.cursorSize === opt.val;
            cursorSzSel.appendChild(o);
        });
        cursorSzSel.addEventListener('change', function () {
            _this.state.wcag.cursorSize = cursorSzSel.value;
            applyWcag(_this.root, _this.state.wcag);
        });
        var cursorClrSel = document.createElement('select');
        cursorClrSel.className = 'ku-select';
        [
            { val: 'def', label: 'Domyślny' },
            { val: 'w', label: 'Biały' },
            { val: 'y', label: 'Żółty' },
            { val: 'b2', label: 'Błękitny' },
        ].forEach(function (opt) {
            var o = document.createElement('option');
            o.value = opt.val;
            o.textContent = opt.label;
            o.selected = w.cursorColor === opt.val;
            cursorClrSel.appendChild(o);
        });
        cursorClrSel.addEventListener('change', function () {
            _this.state.wcag.cursorColor = cursorClrSel.value;
            applyWcag(_this.root, _this.state.wcag);
        });
        var cursorSelWrap = document.createElement('div');
        cursorSelWrap.style.cssText = 'display: flex !important; gap: 6px !important;';
        cursorSelWrap.append(cursorSzSel, cursorClrSel);
        row7.appendChild(cursorSelWrap);
        grid.append(row1, row2, row3, row4, row5, row6, row7);
        var footer = document.createElement('div');
        footer.className = 'ku-settings-footer';
        var closeBtn = document.createElement('button');
        closeBtn.className = 'ku-btn-outline';
        closeBtn.textContent = 'Zamknij';
        closeBtn.addEventListener('click', function () {
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
        popup.style.cssText = 'width: 560px !important;';
        popup.setAttribute('role', 'dialog');
        popup.setAttribute('aria-label', planet.name);
        popup.setAttribute('aria-modal', 'true');
        var bg = document.createElement('img');
        bg.className = 'ku-popup-bg';
        bg.src = this.p('images/popup_simple_920x650.svg');
        bg.alt = '';
        popup.appendChild(bg);
        var inner = document.createElement('div');
        inner.className = 'ku-popup-inner';
        var title = document.createElement('h2');
        title.className = 'ku-popup-title';
        title.textContent = planet.name;
        var sep = document.createElement('div');
        sep.className = 'ku-popup-sep';
        var body = document.createElement('div');
        body.className = 'ku-popup-body';
        body.innerHTML = "<p>".concat(this.getDefaultDesc(planet), "</p>");
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
    App.prototype.createBtn = function (label, width, onClick) {
        var btn = document.createElement('button');
        btn.className = "ku-btn ku-btn-".concat(width);
        btn.setAttribute('aria-label', label);
        var bg = document.createElement('img');
        bg.src = this.p("images/btn_".concat(width, "x80.svg"));
        bg.alt = '';
        bg.setAttribute('aria-hidden', 'true');
        var span = document.createElement('span');
        span.textContent = label;
        btn.append(bg, span);
        btn.addEventListener('click', onClick);
        return btn;
    };
    return App;
}());


;// ./src/main.ts
// ============================================================
// MAIN.TS — ZPE Entry Point
// Kosmiczne Układy v1.0 | Vanta AI Studio
// ============================================================

var app = null;
var _savedState = {};
function _init(container, params) {
    return new Promise(function (resolve, reject) {
        try {
            app = new App(container, params);
            app.mount();
            resolve();
        }
        catch (err) {
            reject(err);
        }
    });
}
function _run(stateData, isFrozen) {
    if (stateData && app) {
        app.restoreState(stateData);
    }
    if (isFrozen && app) {
        app.freeze();
    }
    else if (app) {
        app.resume();
    }
    return Promise.resolve();
}
function _unload() {
    if (app) {
        app.saveState(function (data) {
            _savedState = data;
            if (typeof ZPE !== 'undefined')
                ZPE.setState(data);
        });
        app.removeListeners();
    }
    return Promise.resolve();
}
function _destroy(container) {
    if (app) {
        app.unmount();
        app = null;
    }
    container.innerHTML = '';
    return Promise.resolve();
}
function _setState(state) {
    _savedState = state || {};
    if (app)
        app.restoreState(_savedState);
}
function _getState() {
    if (app) {
        app.saveState(function (data) { _savedState = data; });
    }
    return _savedState;
}
// For the emulator: ZPE is injected as a global, call immediately via side-effect
if (typeof ZPE !== 'undefined') {
    ZPE.create({
        init: _init,
        run: _run,
        unload: _unload,
        destroy: _destroy
    });
}
// For the real ZPE platform: AMD module must export engineFactory
// RequireJS captures the return value of define() and the platform calls engineFactory()
function engineFactory() {
    return {
        init: _init,
        run: _run,
        unload: _unload,
        destroy: _destroy,
        setState: _setState,
        getState: _getState
    };
}

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});;