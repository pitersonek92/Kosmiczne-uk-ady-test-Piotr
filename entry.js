define(() => { return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// ./src/data.ts
// ============================================================
// DATA.TS — Dane planet, astronomów, stanu aplikacji
// Kosmiczne Układy v1.0 | Vanta AI Studio
// ============================================================
const ASTRONOMERS = [
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
        portraitHover: 'pp_02.png',
        bioPic: 'kopernik.png',
        bio: `<p><strong>Mikołaj Kopernik</strong> był wybitnym polskim astronomem, matematykiem, lekarzem i duchownym, żył w latach 1473–1543. Urodzony w Toruniu, dorastał we Fromborku, gdzie spędził większość swojego życia prowadząc badania.</p>
<p>Kopernik zasłynął przede wszystkim jako <strong>twórca heliocentrycznej teorii budowy świata</strong>, według której Ziemia i inne planety krążą wokół Słońca. Była to rewolucyjna koncepcja, która zmieniła sposób myślenia o Wszechświecie i zapoczątkowała nowoczesną astronomię.</p>`,
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
        bio: `<p><strong>Współczesny model układu słonecznego</strong> oparty jest na obserwacjach teleskopowych i misjach kosmicznych XX i XXI w.</p>
<p>Układ Słoneczny liczy <strong>8 planet</strong> krążących wokół Słońca: Merkury, Wenus, Ziemia, Mars, Jowisz, Saturn, Uran i Neptun. Jest jednym z miliardów układów planetarnych w Drodze Mlecznej.</p>`,
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
const DEFAULT_WCAG = {
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
const DEFAULT_STATE = {
    currentScreen: 'welcome',
    activeAstronomerIndex: -1,
    visitedAstronomers: [],
    wcag: { ...DEFAULT_WCAG }
};

;// ./src/engine.ts
// ============================================================
// ENGINE.TS — Silnik animacji Canvas
// Kosmiczne Układy v1.0 | Vanta AI Studio
// ============================================================
// Perspective: y scale for orbit ellipses
const PERSP = 0.38;
const ZOOM_MIN = 0.3;
const ZOOM_MAX = 3.5;
class CanvasEngine {
    canvas;
    ctx;
    planets = [];
    states = {};
    zoom = 1;
    panX = 0;
    panY = 0;
    hoveredId = null;
    raf = 0;
    paused = false;
    showOrbits;
    reduceMotion;
    bgImage = null;
    bgLoaded = false;
    planetImages = {};
    pathFn;
    // Mouse drag state
    dragStart = null;
    panStart = null;
    dragged = false;
    onHover;
    onLeftClick;
    onRightClick;
    constructor(opts) {
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
    setPlanets(planets) {
        this.planets = planets;
        // Initialize angles with spread
        planets.forEach((p, i) => {
            if (!this.states[p.id]) {
                this.states[p.id] = { angle: (i / planets.length) * Math.PI * 2 };
            }
        });
        this.fitZoom();
        this.loadPlanetImages();
    }
    loadBackground(src) {
        const img = new Image();
        img.onload = () => { this.bgImage = img; this.bgLoaded = true; };
        img.onerror = () => { this.bgLoaded = true; };
        img.src = src;
    }
    loadPlanetImages() {
        if (!this.pathFn)
            return;
        // Mapping planet base IDs to actual asset filenames
        const imgMap = {
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
        this.planets.forEach(p => {
            const baseId = p.id.split('_')[0];
            const imgFile = imgMap[baseId];
            if (imgFile && !this.planetImages[baseId]) {
                const img = new Image();
                img.onload = () => { this.planetImages[baseId] = img; };
                img.src = this.pathFn(imgFile);
            }
        });
    }
    fitZoom() {
        if (this.planets.length === 0)
            return;
        const maxOrbit = Math.max(...this.planets.map(p => p.orbit));
        if (maxOrbit === 0) {
            this.zoom = 1;
            return;
        }
        const halfW = this.canvas.width * 0.44;
        this.zoom = Math.min(halfW / maxOrbit, 1.4);
        this.panX = 0;
        this.panY = 0;
    }
    setShowOrbits(v) { this.showOrbits = v; }
    setReduceMotion(v) { this.reduceMotion = v; if (v)
        this.paused = true;
    else
        this.paused = false; }
    setPaused(v) { this.paused = v; }
    /** Ustawia aktywną planetę z klawiatury (highlight jak hover) */
    setKeyboardFocus(planetId) {
        this.hoveredId = planetId;
        this.canvas.style.cursor = planetId ? 'pointer' : 'default';
    }
    /** Zwraca id aktualnie podświetlonej planety */
    getHoveredId() { return this.hoveredId; }
    /** Zwraca listę id planet w bieżącej kolejności */
    getPlanetIds() { return this.planets.map(p => p.id); }
    /** Zwraca obiekt planety po id */
    getPlanetById(id) {
        return this.planets.find(p => p.id === id) || null;
    }
    zoomBy(delta) {
        const cx = this.canvas.width / 2;
        const cy = this.canvas.height / 2;
        const factor = delta > 0 ? 1.15 : 0.88;
        const newZoom = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, this.zoom * factor));
        this.panX = cx - (cx - this.panX) * (newZoom / this.zoom);
        this.panY = cy - (cy - this.panY) * (newZoom / this.zoom);
        this.zoom = newZoom;
    }
    resetView() { this.fitZoom(); }
    start() {
        this.raf = requestAnimationFrame(this.tick);
    }
    stop() {
        cancelAnimationFrame(this.raf);
    }
    tick = () => {
        if (!this.paused && !this.reduceMotion) {
            this.planets.forEach(p => {
                if (p.orbit === 0)
                    return;
                if (this.hoveredId === p.id)
                    return;
                this.states[p.id].angle += p.speed * 0.007;
            });
        }
        this.draw();
        this.raf = requestAnimationFrame(this.tick);
    };
    cx() { return this.canvas.width / 2 + this.panX; }
    cy() { return this.canvas.height / 2 + this.panY; }
    planetPos(p) {
        const angle = this.states[p.id]?.angle ?? 0;
        return {
            x: this.cx() + Math.cos(angle) * p.orbit * this.zoom,
            y: this.cy() + Math.sin(angle) * p.orbit * this.zoom * PERSP,
        };
    }
    draw() {
        const { canvas, ctx } = this;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Background
        if (this.bgImage && this.bgLoaded) {
            ctx.drawImage(this.bgImage, 0, 0, canvas.width, canvas.height);
        }
        else {
            // Fallback: dark space gradient
            const grad = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
            grad.addColorStop(0, '#0a0820');
            grad.addColorStop(1, '#000510');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            this.drawStars();
        }
        const cx = this.cx();
        const cy = this.cy();
        // Orbits
        if (this.showOrbits) {
            this.planets.forEach(p => {
                if (p.orbit === 0)
                    return;
                ctx.beginPath();
                ctx.ellipse(cx, cy, p.orbit * this.zoom, p.orbit * this.zoom * PERSP, 0, 0, Math.PI * 2);
                ctx.strokeStyle = 'rgba(255,255,255,0.35)';
                ctx.lineWidth = 1.5;
                ctx.stroke();
            });
        }
        // Sort planets by y for correct z-order (further back first)
        const sorted = [...this.planets].sort((a, b) => {
            const ay = this.planetPos(a).y;
            const by = this.planetPos(b).y;
            return ay - by;
        });
        // Draw label lines first (behind planets)
        sorted.forEach(p => {
            const pos = this.planetPos(p);
            this.drawLabelLine(p, pos.x, pos.y);
        });
        // Draw planets
        sorted.forEach(p => {
            const pos = this.planetPos(p);
            this.drawPlanet(p, pos.x, pos.y);
        });
        // Draw label texts on top
        sorted.forEach(p => {
            const pos = this.planetPos(p);
            this.drawLabelText(p, pos.x, pos.y);
        });
    }
    drawStars() {
        const ctx = this.ctx;
        // Simple static star field
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        const stars = [
            [45, 23], [123, 67], [234, 12], [456, 78], [567, 34], [678, 89], [789, 45], [890, 23],
            [901, 67], [112, 234], [223, 189], [334, 145], [445, 201], [556, 167], [667, 223],
            [778, 178], [889, 234], [100, 300], [200, 350], [300, 280], [400, 320], [500, 290],
            [600, 340], [700, 310], [800, 270], [900, 330], [150, 400], [250, 450], [350, 380],
            [450, 420], [550, 390], [650, 440], [750, 410], [850, 370], [950, 430],
        ];
        stars.forEach(([x, y]) => {
            ctx.fillRect(x % this.canvas.width, y % this.canvas.height, 1, 1);
        });
    }
    getLabelDir(p, px, py) {
        const cy = this.cy();
        // Go up if planet is in upper half, down if lower half
        return { dx: 0, dy: py < cy ? -1 : 1 };
    }
    getLabelLength(r) {
        return (40 + r) * Math.max(0.75, this.zoom);
    }
    drawLabelLine(p, px, py) {
        const ctx = this.ctx;
        const { dy } = this.getLabelDir(p, px, py);
        const r = p.r * this.zoom;
        const len = this.getLabelLength(p.r);
        const isHovered = this.hoveredId === p.id;
        const color = isHovered ? '#FFD700' : '#FFD700';
        const startY = py + dy * r;
        const endY = py + dy * (r + len);
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
    }
    drawLabelText(p, px, py) {
        const ctx = this.ctx;
        const { dy } = this.getLabelDir(p, px, py);
        const r = p.r * this.zoom;
        const len = this.getLabelLength(p.r);
        const endY = py + dy * (r + len);
        const isHovered = this.hoveredId === p.id;
        const fontSize = Math.max(11, 13 * Math.min(1, this.zoom));
        ctx.font = `bold ${fontSize}px 'Segoe UI', Arial, sans-serif`;
        const tw = ctx.measureText(p.name).width;
        const textY = endY + dy * (fontSize + 4);
        const bgX = px - tw / 2 - 5;
        const bgY = textY - fontSize - 2;
        const bgW = tw + 10;
        const bgH = fontSize + 6;
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
    }
    drawPlanet(p, px, py) {
        const ctx = this.ctx;
        const r = p.r * this.zoom;
        const isHovered = this.hoveredId === p.id;
        const t = Date.now();
        const baseId = p.id.split('_')[0];
        const img = this.planetImages[baseId];
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
    }
    drawPlanetFromImage(img, p, px, py, r) {
        const ctx = this.ctx;
        ctx.save();
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(img, px - r, py - r, r * 2, r * 2);
        ctx.restore();
        // Saturn rings drawn after
    }
    drawSun(px, py, r, t) {
        const ctx = this.ctx;
        // Outer glow
        const glow = ctx.createRadialGradient(px, py, r * 0.5, px, py, r * 4.5);
        glow.addColorStop(0, 'rgba(255,120,0,0.6)');
        glow.addColorStop(0.4, 'rgba(255,60,0,0.3)');
        glow.addColorStop(1, 'rgba(160,10,0,0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(px, py, r * 4.5, 0, Math.PI * 2);
        ctx.fill();
        // Animated flame spikes
        const spikes = 14;
        for (let i = 0; i < spikes; i++) {
            const angle = (i / spikes) * Math.PI * 2;
            const wave = Math.sin(t / 350 + i * 1.3) * 0.15 + 0.85;
            const spokeR = r * (1.35 + wave * 0.25);
            const x2 = px + Math.cos(angle) * spokeR;
            const y2 = py + Math.sin(angle) * spokeR;
            const fg = ctx.createRadialGradient(px, py, r * 0.8, px + Math.cos(angle) * r * 0.4, py + Math.sin(angle) * r * 0.4, spokeR);
            fg.addColorStop(0, 'rgba(255,200,0,0.7)');
            fg.addColorStop(1, 'rgba(255,80,0,0)');
            ctx.fillStyle = fg;
            ctx.beginPath();
            ctx.arc(x2, y2, r * 0.35, 0, Math.PI * 2);
            ctx.fill();
        }
        // Sun body
        const body = ctx.createRadialGradient(px - r * 0.3, py - r * 0.3, r * 0.1, px, py, r);
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
        ctx.font = `bold ${Math.max(10, r * 0.55)}px 'Segoe UI', Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Słońce', px, py);
        ctx.textAlign = 'left';
        ctx.textBaseline = 'alphabetic';
    }
    drawRegularPlanet(p, px, py, r, _t) {
        const ctx = this.ctx;
        const pal = p.palette;
        ctx.save();
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.clip();
        if (pal) {
            // Base gradient
            const base = ctx.createRadialGradient(px - r * 0.35, py - r * 0.35, r * 0.05, px, py, r);
            base.addColorStop(0, pal.h);
            base.addColorStop(0.5, pal.c);
            base.addColorStop(1, pal.d);
            ctx.fillStyle = base;
            ctx.fillRect(px - r, py - r, r * 2, r * 2);
            // Surface bands (Jupiter, Saturn)
            if (pal.bands) {
                const bandColors = ['rgba(255,255,255,0.06)', 'rgba(0,0,0,0.08)', 'rgba(255,255,255,0.04)'];
                for (let i = 0; i < 5; i++) {
                    const by = py - r + (i / 5) * r * 2;
                    ctx.fillStyle = bandColors[i % bandColors.length];
                    ctx.fillRect(px - r, by, r * 2, r * 2 / 5);
                }
            }
            // Shadow (right side)
            const shadow = ctx.createRadialGradient(px + r * 0.5, py, r * 0.1, px + r * 0.5, py, r * 1.8);
            shadow.addColorStop(0, 'rgba(0,0,0,0.6)');
            shadow.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = shadow;
            ctx.fillRect(px - r, py - r, r * 2, r * 2);
            // Specular (upper-left)
            const spec = ctx.createRadialGradient(px - r * 0.4, py - r * 0.4, 0, px - r * 0.4, py - r * 0.4, r * 0.8);
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
        if (pal?.atm) {
            const atm = ctx.createRadialGradient(px, py, r * 0.85, px, py, r * 1.4);
            atm.addColorStop(0, pal.atm);
            atm.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = atm;
            ctx.beginPath();
            ctx.arc(px, py, r * 1.4, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    drawRings(px, py, r) {
        const ctx = this.ctx;
        const tilt = -Math.PI / 7;
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
    }
    hitTest(clientX, clientY) {
        const rect = this.canvas.getBoundingClientRect();
        const mx = clientX - rect.left;
        const my = clientY - rect.top;
        let closest = null;
        let minDist = Infinity;
        this.planets.forEach(p => {
            const pos = this.planetPos(p);
            const r = p.r * this.zoom + 12;
            const dx = mx - pos.x;
            const dy = my - pos.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < r && dist < minDist) {
                minDist = dist;
                closest = p;
            }
        });
        return closest;
    }
    bindEvents() {
        const c = this.canvas;
        c.addEventListener('mousedown', e => {
            this.dragStart = { x: e.clientX, y: e.clientY };
            this.panStart = { x: this.panX, y: this.panY };
            this.dragged = false;
        });
        c.addEventListener('mousemove', e => {
            if (this.dragStart) {
                const dx = e.clientX - this.dragStart.x;
                const dy = e.clientY - this.dragStart.y;
                if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
                    this.dragged = true;
                    this.panX = this.panStart.x + dx;
                    this.panY = this.panStart.y + dy;
                }
            }
            else {
                const hit = this.hitTest(e.clientX, e.clientY);
                const newId = hit ? hit.id : null;
                if (newId !== this.hoveredId) {
                    this.hoveredId = newId;
                    this.canvas.style.cursor = hit ? 'pointer' : 'default';
                    this.onHover?.(hit);
                }
            }
        });
        c.addEventListener('mouseup', e => {
            if (!this.dragged) {
                const hit = this.hitTest(e.clientX, e.clientY);
                if (hit) {
                    if (e.button === 0)
                        this.onLeftClick?.(hit);
                    if (e.button === 2)
                        this.onRightClick?.(hit);
                }
            }
            this.dragStart = null;
            this.panStart = null;
        });
        c.addEventListener('mouseleave', () => {
            this.dragStart = null;
            this.panStart = null;
            if (this.hoveredId) {
                this.hoveredId = null;
                this.onHover?.(null);
            }
        });
        c.addEventListener('contextmenu', e => {
            e.preventDefault();
            if (!this.dragged) {
                const hit = this.hitTest(e.clientX, e.clientY);
                if (hit)
                    this.onRightClick?.(hit);
            }
        });
        c.addEventListener('wheel', e => {
            e.preventDefault();
            const rect = c.getBoundingClientRect();
            const mx = e.clientX - rect.left;
            const my = e.clientY - rect.top;
            const factor = e.deltaY > 0 ? 0.88 : 1.15;
            const newZoom = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, this.zoom * factor));
            this.panX = mx - (mx - this.panX) * (newZoom / this.zoom);
            this.panY = my - (my - this.panY) * (newZoom / this.zoom);
            this.zoom = newZoom;
        }, { passive: false });
    }
    destroy() {
        this.stop();
        // Events will be cleaned up when canvas is removed
    }
}
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
const ROOT_ID = 'ku-root';
// Cursor SVG templates
const CURSORS = {
    n: {
        def: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M5 3l14 9-7 1-4 7z' fill='%23ffffff' stroke='%23000' stroke-width='1'/%3E%3C/svg%3E") 5 3, auto`,
        w: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M5 3l14 9-7 1-4 7z' fill='%23ffffff' stroke='%23333' stroke-width='1'/%3E%3C/svg%3E") 5 3, auto`,
        y: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M5 3l14 9-7 1-4 7z' fill='%23FFD700' stroke='%23333' stroke-width='1'/%3E%3C/svg%3E") 5 3, auto`,
        b2: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M5 3l14 9-7 1-4 7z' fill='%2300ccff' stroke='%23000' stroke-width='1'/%3E%3C/svg%3E") 5 3, auto`,
    },
    d: {
        def: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 36 36'%3E%3Cpath d='M7 4l21 14-11 1-6 10z' fill='%23ffffff' stroke='%23000' stroke-width='1.5'/%3E%3C/svg%3E") 7 4, auto`,
        w: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 36 36'%3E%3Cpath d='M7 4l21 14-11 1-6 10z' fill='%23ffffff' stroke='%23333' stroke-width='1.5'/%3E%3C/svg%3E") 7 4, auto`,
        y: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 36 36'%3E%3Cpath d='M7 4l21 14-11 1-6 10z' fill='%23FFD700' stroke='%23333' stroke-width='1.5'/%3E%3C/svg%3E") 7 4, auto`,
        b2: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 36 36'%3E%3Cpath d='M7 4l21 14-11 1-6 10z' fill='%2300ccff' stroke='%23000' stroke-width='1.5'/%3E%3C/svg%3E") 7 4, auto`,
    },
    b: {
        def: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cpath d='M9 5l28 18-14 2-8 14z' fill='%23ffffff' stroke='%23000' stroke-width='2'/%3E%3C/svg%3E") 9 5, auto`,
        w: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cpath d='M9 5l28 18-14 2-8 14z' fill='%23ffffff' stroke='%23333' stroke-width='2'/%3E%3C/svg%3E") 9 5, auto`,
        y: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cpath d='M9 5l28 18-14 2-8 14z' fill='%23FFD700' stroke='%23333' stroke-width='2'/%3E%3C/svg%3E") 9 5, auto`,
        b2: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cpath d='M9 5l28 18-14 2-8 14z' fill='%2300ccff' stroke='%23000' stroke-width='2'/%3E%3C/svg%3E") 9 5, auto`,
    }
};
function applyWcag(root, state) {
    root.className = root.className
        .split(' ')
        .filter(c => !c.startsWith('ku-') && !c.startsWith('kuf-'))
        .join(' ');
    if (state.highContrast)
        root.classList.add('ku-hc');
    if (state.reduceMotion)
        root.classList.add('ku-noanim');
    if (!state.showOrbits)
        root.classList.add('ku-no-orbits');
    if (state.learnMode)
        root.classList.add('ku-learn');
    root.classList.add(`ku-size-${state.textSize}`);
    if (state.colorFilter !== 'none')
        root.classList.add(`kuf-${state.colorFilter}`);
    if (state.cursorSize !== 'n' || state.cursorColor !== 'def') {
        root.classList.add(`ku-nc`);
    }
    // Apply custom cursor to root and all children
    const cursorVal = CURSORS[state.cursorSize]?.[state.cursorColor] || 'auto';
    root.style.setProperty('--ku-cursor', cursorVal);
    root.style.cursor = cursorVal;
    // Apply color filter
    const svgFilter = document.getElementById('ku-color-filter');
    if (svgFilter) {
        const feMatrix = svgFilter.querySelector('feColorMatrix');
        if (feMatrix) {
            const matrices = {
                none: '1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0',
                gray: '0.299 0.587 0.114 0 0  0.299 0.587 0.114 0 0  0.299 0.587 0.114 0 0  0 0 0 1 0',
                deut: '0.367 0.861 -0.228 0 0  0.280 0.673 0.047 0 0  -0.012 0.043 0.969 0 0  0 0 0 1 0',
                prot: '0.197 0.803 0 0 0  0.196 0.804 0 0 0  0 0.045 0.955 0 0  0 0 0 1 0',
                trit: '0.95 0.05 0 0 0  0 0.433 0.567 0 0  0 0.475 0.525 0 0  0 0 0 1 0',
            };
            feMatrix.setAttribute('values', matrices[state.colorFilter] || matrices.none);
        }
        const filterEl = root.closest('#ku-app-wrapper') || document.body;
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
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('id', 'ku-color-filter');
    svg.setAttribute('style', 'position:absolute;width:0;height:0;overflow:hidden');
    svg.innerHTML = `
    <defs>
      <filter id="ku-color-filter-def" x="0%" y="0%" width="100%" height="100%" color-interpolation-filters="sRGB">
        <feColorMatrix id="ku-fcm" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"/>
      </filter>
    </defs>`;
    return svg;
}
// Sound system (Web Audio API synthesis)
let audioCtx = null;
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
    const ctx = getAudioCtx();
    if (!ctx)
        return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
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
    const ctx = getAudioCtx();
    if (!ctx)
        return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
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



const TOPBAR_H = 68;
// ============================================================
// CSS injection
// ============================================================
function injectCSS() {
    if (document.getElementById('ku-styles'))
        return;
    const style = document.createElement('style');
    style.id = 'ku-styles';
    style.textContent = `
/* === KU ROOT ISOLATION === */
#ku-root, #ku-root *, #ku-root *::before, #ku-root *::after {
  box-sizing: border-box !important;
  font-family: 'Segoe UI', Arial, sans-serif !important;
}
#ku-root {
  display: block !important;
  width: 1280px !important;
  height: 720px !important;
  margin: 0 !important;
  padding: 0 !important;
  overflow: hidden !important;
  overscroll-behavior: none !important;
  contain: layout style !important;
  cursor: var(--ku-cursor, auto) !important;
}
#ku-root *, #ku-root input, #ku-root button, #ku-root textarea {
  cursor: inherit !important;
}
/* select musi mieć jawny kursor — inherit nie działa we wszystkich przeglądarkach */
#ku-root select { cursor: var(--ku-cursor, auto) !important; }

/* === LAYOUT === */
#ku-root .ku-game {
  position: relative !important;
  width: 1280px !important;
  height: 720px !important;
  overflow: hidden !important;
  background: #000510 !important;
  overscroll-behavior: none !important;
  touch-action: pan-x pan-y !important;
}

/* === TOPBAR === */
#ku-root .ku-topbar {
  position: absolute !important;
  top: 0 !important; left: 0 !important; right: 0 !important;
  height: ${TOPBAR_H}px !important;
  z-index: 800 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  background: transparent !important;
  overflow: hidden !important;
}
#ku-root .ku-topbar-bg {
  position: absolute !important;
  inset: 0 !important;
  width: 100% !important; height: 100% !important;
}
#ku-root .ku-topbar-title {
  position: relative !important;
  z-index: 1 !important;
  color: #FFD700 !important;
  font-size: 22px !important;
  font-weight: 700 !important;
  letter-spacing: 3px !important;
  text-transform: uppercase !important;
  text-shadow: 2px 2px 4px #8B6000, 0 0 12px rgba(255,215,0,0.5) !important;
}
#ku-root .ku-topbar-btns {
  position: absolute !important;
  right: 18px !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  display: flex !important;
  gap: 10px !important;
  z-index: 1 !important;
}
#ku-root .ku-topbar-btn {
  position: relative !important;
  width: 52px !important; height: 52px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  border: none !important;
  background: transparent !important;
  padding: 0 !important;
  cursor: inherit !important;
  transition: transform 0.15s, filter 0.15s !important;
  border-radius: 50% !important;
  outline-offset: 3px !important;
}
#ku-root .ku-topbar-btn:hover { transform: scale(1.12) !important; filter: brightness(1.25) !important; }
#ku-root .ku-topbar-btn:focus { outline: 3px solid #FFD700 !important; }
#ku-root .ku-topbar-btn img, #ku-root .ku-topbar-btn svg { position: relative !important; z-index: 1 !important; width: 30px !important; height: 30px !important; }
#ku-root .ku-topbar-btn .ku-btn-bg {
  position: absolute !important; inset: 0 !important;
  width: 100% !important; height: 100% !important;
  border-radius: 50% !important;
}

/* === OVERLAY === */
#ku-root .ku-overlay {
  position: absolute !important;
  top: ${TOPBAR_H}px !important;
  left: 0 !important; right: 0 !important; bottom: 0 !important;
  background: rgba(0,2,20,0.85) !important;
  z-index: 600 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}
/* pełny overlay (onboarding) — topbar (z-index 800) i tak go przykrywa */
#ku-root .ku-overlay.ku-overlay-full {
  top: 0 !important;
  z-index: 750 !important;
}

/* === WELCOME SCREEN === */
#ku-root .ku-welcome {
  position: absolute !important;
  inset: 0 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}
#ku-root .ku-welcome-bg {
  position: absolute !important;
  inset: 0 !important;
  width: 100% !important; height: 100% !important;
  object-fit: cover !important;
}
#ku-root .ku-welcome-popup {
  position: relative !important;
  z-index: 10 !important;
  width: 700px !important;
  min-height: 440px !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  padding: 40px 50px 30px !important;
  margin-top: 34px !important;
}
#ku-root .ku-welcome-popup-bg {
  position: absolute !important;
  inset: 0 !important;
  width: 100% !important; height: 100% !important;
}
#ku-root .ku-welcome-content { position: relative !important; z-index: 1 !important; width: 100% !important; }
#ku-root .ku-welcome-title {
  color: #FFD700 !important;
  font-size: 32px !important;
  font-weight: 700 !important;
  text-align: center !important;
  margin: 0 0 16px !important;
  text-shadow: 2px 2px 6px rgba(0,0,0,0.8) !important;
}
#ku-root .ku-welcome-desc {
  color: #fff !important;
  font-size: 17px !important;
  font-weight: 600 !important;
  text-align: center !important;
  line-height: 1.55 !important;
  margin: 0 0 20px !important;
}
#ku-root .ku-task-box {
  display: flex !important;
  align-items: flex-start !important;
  gap: 14px !important;
  background: rgba(0,0,0,0.3) !important;
  border-radius: 10px !important;
  padding: 14px 18px !important;
  margin-bottom: 24px !important;
}
#ku-root .ku-task-icon { width: 52px !important; height: 52px !important; flex-shrink: 0 !important; }
#ku-root .ku-task-text { color: #fff !important; font-size: 15px !important; line-height: 1.5 !important; }
#ku-root .ku-task-text strong { color: #FFD700 !important; }
#ku-root .ku-welcome-footer {
  display: flex !important;
  gap: 20px !important;
  justify-content: center !important;
  width: 100% !important;
}

/* Decorations */
#ku-root .ku-deco {
  position: absolute !important;
  pointer-events: none !important;
  z-index: 5 !important;
}

/* === SOLAR SCREEN === */
#ku-root .ku-solar {
  position: absolute !important;
  top: ${TOPBAR_H}px !important;
  left: 0 !important; right: 0 !important; bottom: 0 !important;
  display: flex !important;
}
#ku-root .ku-left-panel {
  width: 190px !important;
  flex-shrink: 0 !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 16px !important;
  padding: 16px 12px !important;
  position: relative !important;
  overflow: hidden !important;
}
#ku-root .ku-left-panel-bg {
  position: absolute !important; inset: 0 !important;
  width: 100% !important; height: 100% !important; object-fit: cover !important;
}
#ku-root .ku-portrait-wrap {
  position: relative !important;
  z-index: 1 !important;
  cursor: inherit !important;
}
#ku-root .ku-portrait {
  width: 160px !important; height: 160px !important;
  border: 3px solid #444 !important;
  border-radius: 6px !important;
  object-fit: cover !important;
  display: block !important;
  transition: border-color 0.2s, box-shadow 0.2s !important;
}
#ku-root .ku-portrait-wrap:hover .ku-portrait,
#ku-root .ku-portrait-wrap.active .ku-portrait {
  border-color: #FFD700 !important;
  box-shadow: 0 0 20px 5px #FFD700 !important;
}
#ku-root .ku-portrait-wrap:focus { outline: 3px solid #FFD700 !important; outline-offset: 3px !important; }

#ku-root .ku-portrait-tooltip {
  position: absolute !important;
  left: 168px !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  background: #000 !important;
  border: 1px solid #FFD700 !important;
  color: #fff !important;
  padding: 6px 12px !important;
  border-radius: 4px !important;
  white-space: nowrap !important;
  font-size: 13px !important;
  font-style: italic !important;
  z-index: 200 !important;
  pointer-events: none !important;
}
#ku-root .ku-portrait-tooltip strong { color: #FFD700 !important; }

#ku-root .ku-canvas-area {
  flex: 1 !important;
  position: relative !important;
  overflow: hidden !important;
}
#ku-root .ku-canvas-title {
  position: absolute !important;
  top: 10px !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
  z-index: 50 !important;
  color: #fff !important;
  font-size: 22px !important;
  font-weight: 700 !important;
  text-shadow: 1px 1px 3px rgba(0,0,0,0.9) !important;
  background: rgba(0,0,0,0.55) !important;
  padding: 6px 18px !important;
  border-radius: 6px !important;
  white-space: nowrap !important;
}
#ku-root .ku-game-canvas {
  display: block !important;
  width: 100% !important;
  height: 100% !important;
}
#ku-root .ku-zoom-bar {
  position: absolute !important;
  bottom: 50px !important;
  right: 14px !important;
  display: flex !important;
  gap: 6px !important;
  z-index: 50 !important;
}
#ku-root .ku-zoom-btn {
  width: 36px !important; height: 36px !important;
  background: rgba(0,0,0,0.6) !important;
  border: 1px solid rgba(255,255,255,0.3) !important;
  border-radius: 6px !important;
  color: #fff !important;
  font-size: 18px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  cursor: inherit !important;
  transition: background 0.15s !important;
}
#ku-root .ku-zoom-btn:hover { background: rgba(255,215,0,0.2) !important; border-color: #FFD700 !important; }
#ku-root .ku-zoom-btn:focus { outline: 3px solid #FFD700 !important; }

#ku-root .ku-astro-deco {
  position: absolute !important;
  bottom: 10px !important; right: 14px !important;
  width: 80px !important;
  z-index: 30 !important;
  pointer-events: none !important;
}
#ku-root .ku-satellite-deco {
  position: absolute !important;
  top: 50px !important; left: 60px !important;
  width: 55px !important;
  z-index: 30 !important;
  pointer-events: none !important;
}

/* === MODEL SCREEN === */
#ku-root .ku-model {
  position: absolute !important;
  top: ${TOPBAR_H}px !important;
  left: 0 !important; right: 0 !important; bottom: 0 !important;
  display: flex !important;
  flex-direction: column !important;
}
#ku-root .ku-model-title {
  color: #fff !important;
  font-size: 22px !important;
  font-weight: 700 !important;
  text-align: center !important;
  padding: 12px 24px !important;
  background: rgba(0,0,0,0.55) !important;
  text-shadow: 1px 1px 3px rgba(0,0,0,0.9) !important;
  flex-shrink: 0 !important;
}
#ku-root .ku-model-canvas-wrap {
  flex: 1 !important;
  position: relative !important;
  overflow: hidden !important;
}
#ku-root .ku-model-footer {
  display: flex !important;
  justify-content: center !important;
  padding: 10px !important;
  background: rgba(0,0,0,0.4) !important;
  flex-shrink: 0 !important;
}

/* === BUTTONS === */
#ku-root .ku-btn {
  position: relative !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  border: none !important;
  background: transparent !important;
  padding: 0 !important;
  cursor: inherit !important;
  font-weight: 700 !important;
  color: #FFD700 !important;
  font-size: 18px !important;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.8) !important;
  transition: filter 0.15s, transform 0.15s !important;
  outline-offset: 3px !important;
}
#ku-root .ku-btn:hover { filter: brightness(1.2) !important; transform: scale(1.03) !important; }
#ku-root .ku-btn:focus { outline: 3px solid #FFD700 !important; }
#ku-root .ku-btn img { position: absolute !important; inset: 0 !important; width: 100% !important; height: 100% !important; }
#ku-root .ku-btn span { position: relative !important; z-index: 1 !important; }
#ku-root .ku-btn-280 { width: 280px !important; height: 80px !important; }
#ku-root .ku-btn-420 { width: 420px !important; height: 80px !important; }
#ku-root .ku-btn-620 { width: 620px !important; height: 80px !important; }

/* === POPUPS === */
#ku-root .ku-popup {
  position: relative !important;
  display: flex !important;
  flex-direction: column !important;
  max-height: calc(720px - ${TOPBAR_H}px - 40px) !important;
  overflow: hidden !important;
}
#ku-root .ku-popup-bg {
  position: absolute !important; inset: 0 !important;
  width: 100% !important; height: 100% !important;
  object-fit: fill !important;
  border-radius: 8px !important;
}
#ku-root .ku-popup-inner {
  position: relative !important;
  z-index: 1 !important;
  display: flex !important;
  flex-direction: column !important;
  height: 100% !important;
  padding: 28px 36px !important;
}
#ku-root .ku-popup-title {
  color: #FFD700 !important;
  font-size: 22px !important;
  font-weight: 700 !important;
  margin: 0 0 12px !important;
  text-align: center !important;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.8) !important;
}
#ku-root .ku-popup-sep {
  width: 100% !important; height: 3px !important;
  background: linear-gradient(90deg, transparent, #FFD700, transparent) !important;
  margin: 0 0 16px !important;
}
#ku-root .ku-popup-body {
  flex: 1 !important;
  overflow-y: auto !important;
  color: #fff !important;
  font-size: 15px !important;
  line-height: 1.6 !important;
  scrollbar-width: thin !important;
}
#ku-root .ku-popup-footer {
  display: flex !important;
  gap: 16px !important;
  justify-content: center !important;
  padding-top: 16px !important;
  flex-shrink: 0 !important;
}

/* === BIOGRAPHY POPUP === */
#ku-root .ku-bio-wrap {
  width: 860px !important;
}
#ku-root .ku-bio-body {
  display: flex !important;
  gap: 20px !important;
  align-items: flex-start !important;
}
#ku-root .ku-bio-pic {
  width: 196px !important; height: 236px !important;
  object-fit: cover !important;
  border: 2px solid #FFD700 !important;
  border-radius: 4px !important;
  flex-shrink: 0 !important;
}
#ku-root .ku-bio-text { flex: 1 !important; }
#ku-root .ku-bio-text p { margin: 0 0 12px !important; }

/* === SETTINGS POPUP === */
#ku-root .ku-settings-card {
  width: 680px !important;
  background: linear-gradient(160deg, #0e2a52, #0a1e3d, #071530) !important;
  border: 2px solid #2a5090 !important;
  border-radius: 12px !important;
  overflow: hidden !important;
}
#ku-root .ku-settings-title {
  color: #FFD700 !important;
  font-size: 20px !important;
  font-weight: 700 !important;
  letter-spacing: 2px !important;
  text-align: center !important;
  padding: 20px !important;
  text-transform: uppercase !important;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.8) !important;
  border-bottom: 1px solid rgba(255,255,255,0.1) !important;
}
#ku-root .ku-settings-grid {
  display: grid !important;
  grid-template-columns: 1fr 1fr !important;
  gap: 0 !important;
  padding: 0 !important;
}
#ku-root .ku-settings-row {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  padding: 12px 20px !important;
  border-bottom: 1px solid rgba(255,255,255,0.07) !important;
  gap: 12px !important;
}
#ku-root .ku-settings-row.full {
  grid-column: 1 / -1 !important;
}
#ku-root .ku-settings-label {
  color: #aac4e0 !important;
  font-size: 13px !important;
  font-weight: 600 !important;
  white-space: nowrap !important;
}
#ku-root .ku-toggle {
  padding: 5px 12px !important;
  border: 1px solid transparent !important;
  border-radius: 4px !important;
  font-size: 12px !important;
  font-weight: 700 !important;
  cursor: inherit !important;
  white-space: nowrap !important;
  min-width: 100px !important;
  text-align: center !important;
}
#ku-root .ku-toggle.on { background: #FFD700 !important; color: #1a1200 !important; border-color: #FFD700 !important; }
#ku-root .ku-toggle.off { background: #1e4a8a !important; color: #FFD700 !important; border-color: #3a6aaa !important; }
#ku-root .ku-toggle:focus { outline: 3px solid #FFD700 !important; }
#ku-root .ku-text-size-btns { display: flex !important; gap: 4px !important; }
#ku-root .ku-text-size-btn {
  width: 30px !important; height: 30px !important;
  border: 1px solid #3a6aaa !important;
  background: #1e4a8a !important;
  color: #FFD700 !important;
  border-radius: 4px !important;
  cursor: inherit !important;
  font-weight: 700 !important;
  display: flex !important; align-items: center !important; justify-content: center !important;
}
#ku-root .ku-text-size-btn.active { background: #FFD700 !important; color: #1a1200 !important; }
#ku-root .ku-text-size-btn:focus { outline: 3px solid #FFD700 !important; }
#ku-root .ku-select {
  background: #1e4a8a !important;
  color: #FFD700 !important;
  border: 1px solid #3a6aaa !important;
  border-radius: 4px !important;
  padding: 4px 8px !important;
  font-size: 12px !important;
  cursor: inherit !important;
}
#ku-root .ku-select:focus { outline: 3px solid #FFD700 !important; }
#ku-root .ku-settings-footer {
  display: flex !important;
  justify-content: center !important;
  padding: 16px !important;
  border-top: 1px solid rgba(255,255,255,0.1) !important;
}
#ku-root .ku-btn-outline {
  border: 2px solid #4a90d9 !important;
  background: transparent !important;
  color: #4a90d9 !important;
  padding: 10px 30px !important;
  border-radius: 6px !important;
  font-size: 15px !important;
  font-weight: 700 !important;
  cursor: inherit !important;
  transition: background 0.15s !important;
}
#ku-root .ku-btn-outline:hover { background: rgba(74,144,217,0.2) !important; }
#ku-root .ku-btn-outline:focus { outline: 3px solid #FFD700 !important; }

/* === ONBOARDING === */
#ku-root .ku-onboarding-card {
  width: 490px !important;
  background: linear-gradient(160deg, #0e2a52, #071530) !important;
  border: 2px solid #3a70c0 !important;
  border-radius: 12px !important;
  padding: 28px 32px !important;
  color: #fff !important;
}
#ku-root .ku-onboarding-icon {
  font-size: 36px !important;
  text-align: center !important;
  margin-bottom: 12px !important;
}
#ku-root .ku-onboarding-title {
  color: #FFD700 !important;
  font-size: 18px !important;
  font-weight: 700 !important;
  text-align: center !important;
  margin-bottom: 12px !important;
}
#ku-root .ku-onboarding-text {
  font-size: 14px !important;
  line-height: 1.6 !important;
  color: #dde !important;
  margin-bottom: 20px !important;
}
#ku-root .ku-onboarding-dots {
  display: flex !important;
  justify-content: center !important;
  gap: 8px !important;
  margin-bottom: 16px !important;
}
#ku-root .ku-dot {
  width: 10px !important; height: 10px !important;
  border-radius: 50% !important;
  background: #3a6aaa !important;
  border: 1px solid #4a90d9 !important;
  transition: background 0.2s !important;
}
#ku-root .ku-dot.active { background: #FFD700 !important; border-color: #FFD700 !important; }
#ku-root .ku-onboarding-footer {
  display: flex !important;
  justify-content: space-between !important;
  gap: 12px !important;
}
#ku-root .ku-btn-ob {
  border: 2px solid #3a70c0 !important;
  background: transparent !important;
  color: #aac4e0 !important;
  padding: 8px 20px !important;
  border-radius: 6px !important;
  font-size: 14px !important;
  font-weight: 700 !important;
  cursor: inherit !important;
}
#ku-root .ku-btn-ob.primary { background: #2a5090 !important; color: #fff !important; border-color: #4a90d9 !important; }
#ku-root .ku-btn-ob:hover { filter: brightness(1.2) !important; }
#ku-root .ku-btn-ob:focus { outline: 3px solid #FFD700 !important; }

/* === INSTRUCTIONS === */
#ku-root .ku-instr-wrap { width: 720px !important; }
#ku-root .ku-instr-section { margin-bottom: 14px !important; }
#ku-root .ku-instr-section h3 { color: #FFD700 !important; font-size: 15px !important; margin: 0 0 6px !important; }
#ku-root .ku-instr-section ul { margin: 0 !important; padding-left: 18px !important; }
#ku-root .ku-instr-section li { margin-bottom: 4px !important; }

/* === PLANET TOOLTIP (quick, PPM) === */
#ku-root .ku-planet-tooltip {
  position: absolute !important;
  background: rgba(0,5,30,0.92) !important;
  border: 1px solid #4a90d9 !important;
  border-radius: 8px !important;
  padding: 10px 16px !important;
  color: #fff !important;
  font-size: 14px !important;
  z-index: 400 !important;
  pointer-events: none !important;
  max-width: 220px !important;
  box-shadow: 0 4px 16px rgba(0,0,0,0.5) !important;
}
#ku-root .ku-planet-tooltip-title {
  color: #FFD700 !important;
  font-size: 16px !important;
  font-weight: 700 !important;
  margin-bottom: 4px !important;
}

/* === WCAG TEXT SIZE (only popup body) === */
#ku-root.ku-size-2 .ku-popup-body { font-size: 18px !important; }
#ku-root.ku-size-3 .ku-popup-body { font-size: 21px !important; }
#ku-root.ku-size-2 .ku-bio-text { font-size: 18px !important; }
#ku-root.ku-size-3 .ku-bio-text { font-size: 21px !important; }
#ku-root.ku-size-2 .ku-onboarding-text { font-size: 17px !important; }
#ku-root.ku-size-3 .ku-onboarding-text { font-size: 19px !important; }

/* === FOCUS styles === */
#ku-root :focus-visible { outline: 3px solid #FFD700 !important; outline-offset: 2px !important; }

/* === REDUCE MOTION === */
#ku-root.ku-noanim * { animation: none !important; transition: none !important; }

/* === HIGH CONTRAST (ku-hc) === */
#ku-root.ku-hc .ku-settings-card {
  background: #000000 !important;
  border: 2px solid #FFD700 !important;
}
#ku-root.ku-hc .ku-settings-title {
  color: #FFD700 !important;
  border-bottom-color: rgba(255,215,0,0.4) !important;
}
#ku-root.ku-hc .ku-settings-label { color: #FFD700 !important; }
#ku-root.ku-hc .ku-settings-row { border-bottom-color: rgba(255,215,0,0.2) !important; }
#ku-root.ku-hc .ku-settings-footer { border-top-color: rgba(255,215,0,0.3) !important; }
#ku-root.ku-hc .ku-toggle.on  { background: #FFD700 !important; color: #000 !important; border-color: #FFD700 !important; }
#ku-root.ku-hc .ku-toggle.off { background: #000 !important; color: #FFD700 !important; border-color: #FFD700 !important; }
#ku-root.ku-hc .ku-select { background: #000 !important; color: #FFD700 !important; border-color: #FFD700 !important; }
#ku-root.ku-hc .ku-text-size-btn { background: #000 !important; color: #FFD700 !important; border-color: #FFD700 !important; }
#ku-root.ku-hc .ku-text-size-btn.active { background: #FFD700 !important; color: #000 !important; }
/* Przyciski — tekst czarny na żółtym tle w trybie HC */
#ku-root.ku-hc .ku-btn span { color: #000 !important; text-shadow: none !important; }
#ku-root.ku-hc .ku-btn-outline { background: #FFD700 !important; color: #000 !important; border-color: #FFD700 !important; }
#ku-root.ku-hc .ku-portrait { border-color: #FFD700 !important; }
#ku-root.ku-hc .ku-canvas-title { background: #000 !important; color: #FFD700 !important; }
#ku-root.ku-hc .ku-zoom-btn { border-color: #FFD700 !important; background: #000 !important; color: #FFD700 !important; }
#ku-root.ku-hc .ku-popup-body { color: #fff !important; }
#ku-root.ku-hc .ku-popup-title { color: #FFD700 !important; }

/* === SCROLLBAR === */
#ku-root .ku-popup-body::-webkit-scrollbar { width: 8px !important; }
#ku-root .ku-popup-body::-webkit-scrollbar-track { background: rgba(255,255,255,0.05) !important; }
#ku-root .ku-popup-body::-webkit-scrollbar-thumb { background: #3a6aaa !important; border-radius: 4px !important; }
  `;
    document.head.appendChild(style);
}
// ============================================================
// MAIN APP CLASS
// ============================================================
class App {
    container;
    params;
    state;
    root;
    engine = null;
    modelEngine = null;
    currentPopup = null;
    popupTrigger = null;
    tooltipEl = null;
    hoveredPortraitIdx = -1;
    constructor(container, params) {
        this.container = container;
        this.params = params;
        this.state = JSON.parse(JSON.stringify(DEFAULT_STATE));
    }
    mount() {
        injectCSS();
        // SVG color filter
        const filterSVG = createColorFilterSVG();
        document.body.appendChild(filterSVG);
        // Root element
        this.root = document.createElement('div');
        this.root.id = 'ku-root';
        this.root.className = 'ku-size-1';
        const game = document.createElement('div');
        game.className = 'ku-game';
        this.root.appendChild(game);
        this.container.appendChild(this.root);
        this.renderTopbar(game);
        this.showWelcome(game);
    }
    unmount() {
        this.engine?.destroy();
        this.modelEngine?.destroy();
        this.root?.remove();
        document.getElementById('ku-styles')?.remove();
        document.getElementById('ku-color-filter')?.remove();
    }
    removeListeners() {
        // Engines handle their own cleanup
    }
    saveState(setState) {
        setState(this.state);
    }
    restoreState(data) {
        if (data)
            Object.assign(this.state, data);
    }
    freeze() { this.engine?.setPaused(true); this.modelEngine?.setPaused(true); }
    resume() { this.engine?.setPaused(false); this.modelEngine?.setPaused(false); }
    p(name) {
        return this.params.path(name);
    }
    // ============================================================
    // TOPBAR
    // ============================================================
    renderTopbar(game) {
        const tb = document.createElement('div');
        tb.className = 'ku-topbar';
        tb.setAttribute('aria-label', 'Pasek nawigacji');
        // Background
        const bg = document.createElement('img');
        bg.className = 'ku-topbar-bg';
        bg.src = this.p('images/top_bar.svg');
        bg.alt = '';
        bg.setAttribute('aria-hidden', 'true');
        tb.appendChild(bg);
        // Title
        const title = document.createElement('div');
        title.className = 'ku-topbar-title';
        title.textContent = 'Kosmiczne Układy';
        tb.appendChild(title);
        // Buttons
        const btns = document.createElement('div');
        btns.className = 'ku-topbar-btns';
        const soundBtn = this.createTopbarBtn(this.state.wcag.soundEnabled ? 'images/ico_sound_on.svg' : 'images/ico_sound_off.svg', 'Dźwięk', 'ku-sound-btn');
        soundBtn.addEventListener('click', () => {
            this.state.wcag.soundEnabled = !this.state.wcag.soundEnabled;
            const img = soundBtn.querySelector('img');
            img.src = this.p(this.state.wcag.soundEnabled ? 'images/ico_sound_on.svg' : 'images/ico_sound_off.svg');
            playClick(this.state.wcag.soundEnabled);
        });
        const helpBtn = this.createTopbarBtn('images/ico_help_ico.svg', 'Instrukcja', 'ku-help-btn');
        helpBtn.addEventListener('click', () => {
            playClick(this.state.wcag.soundEnabled);
            this.openInstructions(game, helpBtn);
        });
        const settingBtn = this.createTopbarBtn('images/ico_setting.svg', 'Ustawienia', 'ku-setting-btn');
        settingBtn.addEventListener('click', () => {
            playClick(this.state.wcag.soundEnabled);
            this.openSettings(game, settingBtn);
        });
        btns.append(soundBtn, helpBtn, settingBtn);
        tb.appendChild(btns);
        game.appendChild(tb);
    }
    createTopbarBtn(iconSrc, label, id) {
        const btn = document.createElement('button');
        btn.className = 'ku-topbar-btn';
        btn.setAttribute('aria-label', label);
        btn.id = id;
        const bgImg = document.createElement('img');
        bgImg.className = 'ku-btn-bg';
        bgImg.src = this.p('images/btn_circle_bg.svg');
        bgImg.alt = '';
        bgImg.setAttribute('aria-hidden', 'true');
        const icon = document.createElement('img');
        icon.src = this.p(iconSrc);
        icon.alt = '';
        btn.append(bgImg, icon);
        return btn;
    }
    // ============================================================
    // WELCOME SCREEN
    // ============================================================
    showWelcome(game) {
        this.clearScreen(game);
        this.state.currentScreen = 'welcome';
        const screen = document.createElement('div');
        screen.className = 'ku-welcome';
        screen.id = 'ku-welcome';
        // Background
        const bg = document.createElement('img');
        bg.className = 'ku-welcome-bg';
        bg.src = this.p('images/bg_all.png');
        bg.alt = '';
        bg.setAttribute('aria-hidden', 'true');
        screen.appendChild(bg);
        // Decorations
        const decos = [
            { file: 'images/rys_01.png', style: 'left:20px;bottom:80px;width:180px;', alt: '' },
            { file: 'images/rys_02.png', style: 'left:60px;top:90px;width:120px;', alt: '' },
            { file: 'images/rys_03.png', style: 'right:80px;top:90px;width:130px;', alt: '' },
            { file: 'images/rys_05.png', style: 'right:30px;bottom:60px;width:100px;', alt: '' },
        ];
        decos.forEach(d => {
            const img = document.createElement('img');
            img.className = 'ku-deco';
            img.src = this.p(d.file);
            img.alt = d.alt;
            img.setAttribute('style', d.style);
            screen.appendChild(img);
        });
        // Popup
        const popup = document.createElement('div');
        popup.className = 'ku-welcome-popup';
        const popupBg = document.createElement('img');
        popupBg.className = 'ku-welcome-popup-bg';
        popupBg.src = this.p('images/popup_simple_920x650.svg');
        popupBg.alt = '';
        popupBg.setAttribute('aria-hidden', 'true');
        popup.appendChild(popupBg);
        const content = document.createElement('div');
        content.className = 'ku-welcome-content';
        const titleEl = document.createElement('h1');
        titleEl.className = 'ku-welcome-title';
        titleEl.textContent = 'Witaj w grze';
        const desc = document.createElement('p');
        desc.className = 'ku-welcome-desc';
        desc.textContent = 'Od wieków ludzkość wpatruje się w gwiazdy, próbując zrozumieć ich porządek… W tej grze staniesz się badaczem idei, które kształtowały nasz obraz Wszechświata. Każda teoria, każdy model to krok w stronę prawdy.';
        const taskBox = document.createElement('div');
        taskBox.className = 'ku-task-box';
        const taskIcon = document.createElement('img');
        taskIcon.className = 'ku-task-icon';
        taskIcon.src = this.p('images/icon_clipboard.svg.png');
        taskIcon.alt = '';
        const taskText = document.createElement('p');
        taskText.className = 'ku-task-text';
        taskText.innerHTML = '<strong>Twoje zadanie:</strong> poznaj trzy wizje kosmosu: od układu geocentrycznego po heliocentryczny. Zobacz jak zmieniała się ta wizja w zależności od epoki.';
        taskBox.append(taskIcon, taskText);
        const footer = document.createElement('div');
        footer.className = 'ku-welcome-footer';
        const instrBtn = this.createBtn('Instrukcja', 280, () => {
            playClick(this.state.wcag.soundEnabled);
            this.openInstructions(game, instrBtn);
        });
        const startBtn = this.createBtn('Rozpocznij grę', 280, () => {
            playClick(this.state.wcag.soundEnabled);
            this.showSolar(game);
        });
        footer.append(instrBtn, startBtn);
        content.append(titleEl, desc, taskBox, footer);
        popup.appendChild(content);
        screen.appendChild(popup);
        game.appendChild(screen);
        // Focus start button
        setTimeout(() => startBtn.focus(), 100);
    }
    // ============================================================
    // SOLAR SCREEN
    // ============================================================
    showSolar(game, skipOnboarding = false) {
        this.clearScreen(game);
        this.state.currentScreen = 'solar';
        const screen = document.createElement('div');
        screen.className = 'ku-solar';
        screen.id = 'ku-solar';
        // Left panel
        const leftPanel = this.buildLeftPanel(game, screen);
        // Canvas area
        const canvasArea = document.createElement('div');
        canvasArea.className = 'ku-canvas-area';
        const canvasTitle = document.createElement('div');
        canvasTitle.className = 'ku-canvas-title';
        canvasTitle.id = 'ku-solar-title';
        const activeIdx = this.state.activeAstronomerIndex;
        canvasTitle.textContent = activeIdx >= 0
            ? ASTRONOMERS[activeIdx].screenTitle
            : 'Wybierz model układu słonecznego';
        const canvas = document.createElement('canvas');
        canvas.className = 'ku-game-canvas';
        canvas.id = 'ku-solar-canvas';
        canvas.width = 1090;
        canvas.height = 652;
        // Zoom bar
        const zoomBar = document.createElement('div');
        zoomBar.className = 'ku-zoom-bar';
        const zoomIn = document.createElement('button');
        zoomIn.className = 'ku-zoom-btn';
        zoomIn.setAttribute('aria-label', 'Przybliż');
        zoomIn.innerHTML = '+';
        const zoomOut = document.createElement('button');
        zoomOut.className = 'ku-zoom-btn';
        zoomOut.setAttribute('aria-label', 'Oddal');
        zoomOut.innerHTML = '–';
        const zoomReset = document.createElement('button');
        zoomReset.className = 'ku-zoom-btn';
        zoomReset.setAttribute('aria-label', 'Resetuj widok');
        zoomReset.style.cssText = 'font-size: 12px !important;';
        zoomReset.innerHTML = '⌖';
        zoomBar.append(zoomIn, zoomOut, zoomReset);
        // Satellite deco
        const satDeco = document.createElement('img');
        satDeco.className = 'ku-satellite-deco';
        satDeco.src = this.p('images/rys_03.png');
        satDeco.alt = '';
        satDeco.setAttribute('aria-hidden', 'true');
        // Astronaut deco
        const astroDeco = document.createElement('img');
        astroDeco.className = 'ku-astro-deco';
        astroDeco.src = this.p('images/rys_04.png');
        astroDeco.alt = '';
        astroDeco.setAttribute('aria-hidden', 'true');
        canvasArea.append(canvasTitle, canvas, zoomBar, satDeco, astroDeco);
        screen.append(leftPanel, canvasArea);
        game.appendChild(screen);
        // Init engine
        const planets = activeIdx >= 0 ? ASTRONOMERS[activeIdx].planets : ASTRONOMERS[2].planets;
        this.engine?.destroy();
        this.engine = new CanvasEngine({
            canvas,
            planets,
            showOrbits: this.state.wcag.showOrbits,
            reduceMotion: this.state.wcag.reduceMotion,
            pathFn: this.params.path.bind(this.params),
            onHover: (planet) => {
                if (planet)
                    playHover(this.state.wcag.soundEnabled);
            },
            onLeftClick: (planet) => {
                playClick(this.state.wcag.soundEnabled);
                this.openPlanetPopup(game, planet);
            },
            onRightClick: (planet) => {
                this.showPlanetTooltip(canvasArea, planet, canvas);
            },
        });
        this.engine.loadBackground(this.p('images/bg_all.png'));
        this.engine.start();
        // Zoom controls
        zoomIn.addEventListener('click', () => this.engine?.zoomBy(1));
        zoomOut.addEventListener('click', () => this.engine?.zoomBy(-1));
        zoomReset.addEventListener('click', () => this.engine?.resetView());
        // Nawigacja klawiaturą po planetach (WCAG IX.3_6_2)
        canvas.setAttribute('tabindex', '0');
        canvas.setAttribute('role', 'application');
        canvas.setAttribute('aria-label', 'Interaktywna mapa układu słonecznego. TAB: fokus. Strzałki: zmień planetę. Enter: szczegóły (LPM). Spacja: szybki opis (PPM).');
        canvas.addEventListener('keydown', (e) => {
            const eng = this.engine;
            if (!eng)
                return;
            const ids = eng.getPlanetIds();
            if (ids.length === 0)
                return;
            const currentId = eng.getHoveredId();
            const currentIdx = currentId ? ids.indexOf(currentId) : -1;
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                const nextIdx = (currentIdx + 1) % ids.length;
                eng.setKeyboardFocus(ids[nextIdx]);
            }
            else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                const prevIdx = (currentIdx - 1 + ids.length) % ids.length;
                eng.setKeyboardFocus(ids[prevIdx]);
            }
            else if (e.key === 'Enter') {
                e.preventDefault();
                const id = eng.getHoveredId();
                if (id) {
                    const planet = eng.getPlanetById(id);
                    if (planet) {
                        playClick(this.state.wcag.soundEnabled);
                        this.popupTrigger = canvas;
                        this.openPlanetPopup(game, planet);
                    }
                }
            }
            else if (e.key === ' ') {
                e.preventDefault();
                const id = eng.getHoveredId();
                if (id) {
                    const planet = eng.getPlanetById(id);
                    if (planet) {
                        this.showPlanetTooltip(canvasArea, planet, canvas);
                    }
                }
            }
        });
        canvas.addEventListener('blur', () => {
            this.engine?.setKeyboardFocus(null);
        });
        // Onboarding
        if (!skipOnboarding) {
            setTimeout(() => this.showOnboarding(game), 400);
        }
    }
    buildLeftPanel(game, screen) {
        const panel = document.createElement('div');
        panel.className = 'ku-left-panel';
        const panelBg = document.createElement('img');
        panelBg.className = 'ku-left-panel-bg';
        panelBg.src = this.p('images/apla_dark.png');
        panelBg.alt = '';
        panelBg.setAttribute('aria-hidden', 'true');
        panel.appendChild(panelBg);
        ASTRONOMERS.forEach((astro, idx) => {
            const wrap = document.createElement('div');
            wrap.className = 'ku-portrait-wrap';
            wrap.setAttribute('tabindex', '0');
            wrap.setAttribute('role', 'button');
            wrap.setAttribute('aria-label', `${astro.name} – kliknij by wybrać model`);
            if (this.state.activeAstronomerIndex === idx) {
                wrap.classList.add('active');
            }
            const portrait = document.createElement('img');
            portrait.className = 'ku-portrait';
            portrait.src = this.p(`images/${astro.portrait}`);
            portrait.alt = astro.name;
            // Hover effects
            wrap.addEventListener('mouseenter', () => {
                if (idx !== this.state.activeAstronomerIndex) {
                    portrait.src = this.p(`images/${astro.portraitHover}`);
                }
                this.showPortraitTooltip(wrap, astro.name);
                playHover(this.state.wcag.soundEnabled);
            });
            wrap.addEventListener('mouseleave', () => {
                if (idx !== this.state.activeAstronomerIndex) {
                    portrait.src = this.p(`images/${astro.portrait}`);
                }
                this.hidePortraitTooltip(wrap);
            });
            // Click: open biography
            wrap.addEventListener('click', () => {
                playClick(this.state.wcag.soundEnabled);
                this.openBiography(game, astro, idx, wrap);
            });
            wrap.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.openBiography(game, astro, idx, wrap);
                }
            });
            wrap.appendChild(portrait);
            panel.appendChild(wrap);
        });
        return panel;
    }
    showPortraitTooltip(wrap, name) {
        const tip = document.createElement('div');
        tip.className = 'ku-portrait-tooltip';
        tip.innerHTML = `<em>Biografia:</em> <strong>${name}</strong>`;
        wrap.appendChild(tip);
    }
    hidePortraitTooltip(wrap) {
        wrap.querySelector('.ku-portrait-tooltip')?.remove();
    }
    updateSolarTitle(text) {
        const el = document.getElementById('ku-solar-title');
        if (el)
            el.textContent = text;
    }
    switchModel(idx) {
        this.state.activeAstronomerIndex = idx;
        const astro = ASTRONOMERS[idx];
        // Update portrait borders
        document.querySelectorAll('.ku-portrait-wrap').forEach((el, i) => {
            el.classList.toggle('active', i === idx);
            const img = el.querySelector('.ku-portrait');
            if (img)
                img.src = this.p(`images/${ASTRONOMERS[i].portrait}`);
        });
        // Update portrait image for active
        const activeWrap = document.querySelectorAll('.ku-portrait-wrap')[idx];
        if (activeWrap) {
            activeWrap.querySelector('.ku-portrait').src = this.p(`images/${astro.portraitHover}`);
        }
        this.updateSolarTitle(astro.screenTitle);
        this.engine?.setPlanets(astro.planets);
        if (!this.state.visitedAstronomers.includes(astro.id)) {
            this.state.visitedAstronomers.push(astro.id);
        }
    }
    showPlanetTooltip(container, planet, canvas) {
        this.tooltipEl?.remove();
        const tip = document.createElement('div');
        tip.className = 'ku-planet-tooltip';
        const title = document.createElement('div');
        title.className = 'ku-planet-tooltip-title';
        title.textContent = planet.name;
        const desc = document.createElement('div');
        desc.textContent = planet.desc || this.getDefaultDesc(planet);
        tip.append(title, desc);
        const rect = canvas.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        tip.style.cssText = `position: absolute !important; top: 50% !important; left: 50% !important; transform: translate(-50%, -50%) !important;`;
        container.appendChild(tip);
        this.tooltipEl = tip;
        setTimeout(() => {
            if (this.tooltipEl === tip) {
                tip.remove();
                this.tooltipEl = null;
            }
        }, 3000);
    }
    getDefaultDesc(planet) {
        const descs = {
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
        const base = planet.id.split('_')[0];
        return descs[base] || planet.name;
    }
    // ============================================================
    // MODEL SCREEN
    // ============================================================
    showModel(game, astronomerIdx) {
        this.clearScreen(game);
        this.state.currentScreen = 'model';
        const astro = ASTRONOMERS[astronomerIdx];
        const screen = document.createElement('div');
        screen.className = 'ku-model';
        screen.id = 'ku-model';
        // Background
        const bg = document.createElement('img');
        bg.style.cssText = 'position: absolute !important; inset: 0 !important; width: 100% !important; height: 100% !important; object-fit: cover !important;';
        bg.src = this.p('images/bg_all.png');
        bg.alt = '';
        screen.appendChild(bg);
        const title = document.createElement('div');
        title.className = 'ku-model-title';
        title.style.cssText = 'position: relative !important; z-index: 10 !important;';
        title.textContent = astro.screenTitle;
        const canvasWrap = document.createElement('div');
        canvasWrap.className = 'ku-model-canvas-wrap';
        const canvas = document.createElement('canvas');
        canvas.className = 'ku-game-canvas';
        canvas.width = 1280;
        canvas.height = 540;
        canvasWrap.appendChild(canvas);
        // Astronaut deco
        const deco = document.createElement('img');
        deco.className = 'ku-astro-deco';
        deco.src = this.p('images/rys_05.png');
        deco.alt = '';
        canvasWrap.appendChild(deco);
        const footer = document.createElement('div');
        footer.className = 'ku-model-footer';
        footer.style.cssText = 'position: relative !important; z-index: 10 !important;';
        const backBtn = this.createBtn('Powrót', 280, () => {
            playClick(this.state.wcag.soundEnabled);
            this.modelEngine?.destroy();
            this.modelEngine = null;
            this.showSolar(game, true);
        });
        footer.appendChild(backBtn);
        screen.append(title, canvasWrap, footer);
        game.appendChild(screen);
        // Engine
        this.modelEngine?.destroy();
        this.modelEngine = new CanvasEngine({
            canvas,
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
        setTimeout(() => backBtn.focus(), 100);
    }
    // ============================================================
    // POPUPS
    // ============================================================
    openOverlay(game, content, full = false) {
        const overlay = document.createElement('div');
        overlay.className = full ? 'ku-overlay ku-overlay-full' : 'ku-overlay';
        overlay.id = 'ku-popup-overlay';
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay)
                this.closePopup();
        });
        overlay.appendChild(content);
        game.appendChild(overlay);
        this.currentPopup = overlay;
        return overlay;
    }
    closePopup() {
        this.currentPopup?.remove();
        this.currentPopup = null;
        this.popupTrigger?.focus();
        this.popupTrigger = null;
    }
    bindPopupKeys(overlay) {
        const handler = (e) => {
            if (e.key === 'Escape' || e.key === 'Backspace') {
                e.preventDefault();
                overlay.removeEventListener('keydown', handler);
                this.closePopup();
            }
        };
        overlay.addEventListener('keydown', handler);
        // Also global for Escape
        const globalHandler = (e) => {
            if (e.key === 'Escape') {
                document.removeEventListener('keydown', globalHandler);
                if (this.currentPopup === overlay)
                    this.closePopup();
            }
        };
        document.addEventListener('keydown', globalHandler);
    }
    // BIOGRAPHY
    openBiography(game, astro, idx, trigger) {
        this.popupTrigger = trigger;
        const popup = document.createElement('div');
        popup.className = 'ku-popup ku-bio-wrap';
        popup.setAttribute('role', 'dialog');
        popup.setAttribute('aria-label', `Biografia: ${astro.name}`);
        popup.setAttribute('aria-modal', 'true');
        const bg = document.createElement('img');
        bg.className = 'ku-popup-bg';
        bg.src = this.p('images/popup_simple_920x650.svg');
        bg.alt = '';
        popup.appendChild(bg);
        const inner = document.createElement('div');
        inner.className = 'ku-popup-inner';
        const title = document.createElement('h2');
        title.className = 'ku-popup-title';
        title.textContent = astro.name;
        const sep = document.createElement('div');
        sep.className = 'ku-popup-sep';
        const body = document.createElement('div');
        body.className = 'ku-popup-body';
        const bioWrap = document.createElement('div');
        bioWrap.className = 'ku-bio-body';
        const pic = document.createElement('img');
        pic.className = 'ku-bio-pic';
        pic.src = this.p(`images/${astro.bioPic}`);
        pic.alt = astro.name;
        const text = document.createElement('div');
        text.className = 'ku-bio-text';
        text.innerHTML = astro.bio;
        bioWrap.append(pic, text);
        body.appendChild(bioWrap);
        const footer = document.createElement('div');
        footer.className = 'ku-popup-footer';
        const modelBtn = this.createBtn(astro.modelTitle, 420, () => {
            playClick(this.state.wcag.soundEnabled);
            this.closePopup();
            this.switchModel(idx);
        });
        const backBtn = this.createBtn('Powrót', 280, () => {
            playClick(this.state.wcag.soundEnabled);
            this.closePopup();
        });
        footer.append(modelBtn, backBtn);
        inner.append(title, sep, body, footer);
        popup.appendChild(inner);
        const overlay = this.openOverlay(game, popup);
        this.bindPopupKeys(overlay);
        setTimeout(() => modelBtn.focus(), 50);
    }
    // INSTRUCTIONS
    openInstructions(game, trigger) {
        this.popupTrigger = trigger;
        const popup = document.createElement('div');
        popup.className = 'ku-popup ku-instr-wrap';
        popup.setAttribute('role', 'dialog');
        popup.setAttribute('aria-label', 'Instrukcja');
        popup.setAttribute('aria-modal', 'true');
        const bg = document.createElement('img');
        bg.className = 'ku-popup-bg';
        bg.src = this.p('images/popup_simple_920x650.svg');
        bg.alt = '';
        popup.appendChild(bg);
        const inner = document.createElement('div');
        inner.className = 'ku-popup-inner';
        const title = document.createElement('h2');
        title.className = 'ku-popup-title';
        title.textContent = 'Instrukcja';
        const sep = document.createElement('div');
        sep.className = 'ku-popup-sep';
        const body = document.createElement('div');
        body.className = 'ku-popup-body';
        body.innerHTML = `
      <div class="ku-instr-section">
        <h3>🔭 Portrety astronomów (lewa kolumna)</h3>
        <ul>
          <li>Kliknij na portret, aby zobaczyć biografię i model układu.</li>
          <li>Najedź myszką – zobaczysz podpowiedź z nazwiskiem.</li>
        </ul>
      </div>
      <div class="ku-instr-section">
        <h3>🪐 Interaktywny układ słoneczny</h3>
        <ul>
          <li><strong>LPM na planecie</strong> – szczegółowe informacje (popup)</li>
          <li><strong>PPM na planecie</strong> – szybki opis (tooltip)</li>
          <li><strong>Hover</strong> – zatrzymuje planetę, podświetla złotą obwódką</li>
          <li><strong>Kółko myszy / +/–</strong> – przybliżanie i oddalanie</li>
          <li><strong>Przeciąganie</strong> – przesuwanie widoku</li>
        </ul>
      </div>
      <div class="ku-instr-section">
        <h3>⌨️ Sterowanie klawiaturą (WCAG)</h3>
        <ul>
          <li><strong>TAB</strong> – przejście do kolejnego elementu</li>
          <li><strong>Enter</strong> – kliknięcie lewym przyciskiem / zatwierdzenie</li>
          <li><strong>Spacja</strong> – kliknięcie prawym przyciskiem / info dodatkowe</li>
          <li><strong>Backspace</strong> – powrót do poprzedniego elementu</li>
          <li><strong>Escape</strong> – zamknięcie okna</li>
        </ul>
      </div>
    `;
        const footer = document.createElement('div');
        footer.className = 'ku-popup-footer';
        const closeBtn = this.createBtn('Zamknij', 280, () => {
            playClick(this.state.wcag.soundEnabled);
            this.closePopup();
        });
        footer.appendChild(closeBtn);
        inner.append(title, sep, body, footer);
        popup.appendChild(inner);
        const overlay = this.openOverlay(game, popup);
        this.bindPopupKeys(overlay);
        setTimeout(() => closeBtn.focus(), 50);
    }
    // SETTINGS
    openSettings(game, trigger) {
        this.popupTrigger = trigger;
        const card = document.createElement('div');
        card.className = 'ku-settings-card';
        card.setAttribute('role', 'dialog');
        card.setAttribute('aria-label', 'Ustawienia');
        card.setAttribute('aria-modal', 'true');
        const titleEl = document.createElement('div');
        titleEl.className = 'ku-settings-title';
        titleEl.textContent = 'USTAWIENIA';
        const grid = document.createElement('div');
        grid.className = 'ku-settings-grid';
        const w = this.state.wcag;
        // Text size
        const row1 = this.buildSettingsRow('Wielkość tekstu');
        const sizeBtns = document.createElement('div');
        sizeBtns.className = 'ku-text-size-btns';
        [1, 2, 3].forEach(sz => {
            const btn = document.createElement('button');
            btn.className = `ku-text-size-btn${w.textSize === sz ? ' active' : ''}`;
            btn.textContent = 'A';
            btn.style.cssText = `font-size: ${12 + (sz - 1) * 3}px !important;`;
            btn.setAttribute('aria-label', `Rozmiar tekstu ${sz}`);
            btn.addEventListener('click', () => {
                this.state.wcag.textSize = sz;
                sizeBtns.querySelectorAll('.ku-text-size-btn').forEach((b, i) => {
                    b.classList.toggle('active', i + 1 === sz);
                });
                applyWcag(this.root, this.state.wcag);
            });
            sizeBtns.appendChild(btn);
        });
        row1.appendChild(sizeBtns);
        // High contrast
        const row2 = this.buildSettingsRow('Wysoki kontrast');
        const hcToggle = this.buildToggle(w.highContrast, (v) => {
            this.state.wcag.highContrast = v;
            applyWcag(this.root, this.state.wcag);
        });
        row2.appendChild(hcToggle);
        // Reduce motion
        const row3 = this.buildSettingsRow('Redukcja ruchu');
        const rmToggle = this.buildToggle(w.reduceMotion, (v) => {
            this.state.wcag.reduceMotion = v;
            this.engine?.setReduceMotion(v);
            this.modelEngine?.setReduceMotion(v);
            applyWcag(this.root, this.state.wcag);
        });
        row3.appendChild(rmToggle);
        // Show orbits
        const row4 = this.buildSettingsRow('Widoczność orbit');
        const orbitToggle = this.buildToggle(w.showOrbits, (v) => {
            this.state.wcag.showOrbits = v;
            this.engine?.setShowOrbits(v);
            this.modelEngine?.setShowOrbits(v);
        });
        row4.appendChild(orbitToggle);
        // Learn mode
        const row5 = this.buildSettingsRow('Tryb nauki');
        const learnToggle = this.buildToggle(w.learnMode, (v) => {
            this.state.wcag.learnMode = v;
            applyWcag(this.root, this.state.wcag);
        });
        row5.appendChild(learnToggle);
        // Color filter
        const row6 = this.buildSettingsRow('Filtr kolorów');
        const colorSel = document.createElement('select');
        colorSel.className = 'ku-select';
        [
            { val: 'none', label: 'Brak' },
            { val: 'gray', label: 'Skala szarości' },
            { val: 'deut', label: 'Deuteranopia' },
            { val: 'prot', label: 'Protanopia' },
            { val: 'trit', label: 'Tritanopia' },
        ].forEach(opt => {
            const o = document.createElement('option');
            o.value = opt.val;
            o.textContent = opt.label;
            o.selected = w.colorFilter === opt.val;
            colorSel.appendChild(o);
        });
        colorSel.addEventListener('change', () => {
            this.state.wcag.colorFilter = colorSel.value;
            applyWcag(this.root, this.state.wcag);
        });
        row6.appendChild(colorSel);
        // Cursor size
        const row7 = this.buildSettingsRow('Kursor – rozmiar', true);
        const cursorSzSel = document.createElement('select');
        cursorSzSel.className = 'ku-select';
        [
            { val: 'n', label: 'Normalny' },
            { val: 'd', label: 'Duży' },
            { val: 'b', label: 'Bardzo duży' },
        ].forEach(opt => {
            const o = document.createElement('option');
            o.value = opt.val;
            o.textContent = opt.label;
            o.selected = w.cursorSize === opt.val;
            cursorSzSel.appendChild(o);
        });
        cursorSzSel.addEventListener('change', () => {
            this.state.wcag.cursorSize = cursorSzSel.value;
            applyWcag(this.root, this.state.wcag);
        });
        const cursorClrSel = document.createElement('select');
        cursorClrSel.className = 'ku-select';
        [
            { val: 'def', label: 'Domyślny' },
            { val: 'w', label: 'Biały' },
            { val: 'y', label: 'Żółty' },
            { val: 'b2', label: 'Błękitny' },
        ].forEach(opt => {
            const o = document.createElement('option');
            o.value = opt.val;
            o.textContent = opt.label;
            o.selected = w.cursorColor === opt.val;
            cursorClrSel.appendChild(o);
        });
        cursorClrSel.addEventListener('change', () => {
            this.state.wcag.cursorColor = cursorClrSel.value;
            applyWcag(this.root, this.state.wcag);
        });
        const cursorSelWrap = document.createElement('div');
        cursorSelWrap.style.cssText = 'display: flex !important; gap: 6px !important;';
        cursorSelWrap.append(cursorSzSel, cursorClrSel);
        row7.appendChild(cursorSelWrap);
        grid.append(row1, row2, row3, row4, row5, row6, row7);
        const footer = document.createElement('div');
        footer.className = 'ku-settings-footer';
        const closeBtn = document.createElement('button');
        closeBtn.className = 'ku-btn-outline';
        closeBtn.textContent = 'Zamknij';
        closeBtn.addEventListener('click', () => {
            playClick(this.state.wcag.soundEnabled);
            this.closePopup();
        });
        footer.appendChild(closeBtn);
        card.append(titleEl, grid, footer);
        const overlay = this.openOverlay(game, card);
        this.bindPopupKeys(overlay);
        setTimeout(() => closeBtn.focus(), 50);
    }
    buildSettingsRow(label, full = false) {
        const row = document.createElement('div');
        row.className = `ku-settings-row${full ? ' full' : ''}`;
        const lbl = document.createElement('span');
        lbl.className = 'ku-settings-label';
        lbl.textContent = label;
        row.appendChild(lbl);
        return row;
    }
    buildToggle(initial, onChange) {
        const btn = document.createElement('button');
        btn.className = `ku-toggle ${initial ? 'on' : 'off'}`;
        btn.textContent = initial ? 'WŁĄCZONY' : 'WYŁĄCZONY';
        btn.setAttribute('role', 'switch');
        btn.setAttribute('aria-checked', String(initial));
        let state = initial;
        btn.addEventListener('click', () => {
            state = !state;
            btn.className = `ku-toggle ${state ? 'on' : 'off'}`;
            btn.textContent = state ? 'WŁĄCZONY' : 'WYŁĄCZONY';
            btn.setAttribute('aria-checked', String(state));
            onChange(state);
        });
        return btn;
    }
    // PLANET POPUP (LPM)
    openPlanetPopup(game, planet) {
        const popup = document.createElement('div');
        popup.className = 'ku-popup';
        popup.style.cssText = 'width: 560px !important;';
        popup.setAttribute('role', 'dialog');
        popup.setAttribute('aria-label', planet.name);
        popup.setAttribute('aria-modal', 'true');
        const bg = document.createElement('img');
        bg.className = 'ku-popup-bg';
        bg.src = this.p('images/popup_simple_920x650.svg');
        bg.alt = '';
        popup.appendChild(bg);
        const inner = document.createElement('div');
        inner.className = 'ku-popup-inner';
        const title = document.createElement('h2');
        title.className = 'ku-popup-title';
        title.textContent = planet.name;
        const sep = document.createElement('div');
        sep.className = 'ku-popup-sep';
        const body = document.createElement('div');
        body.className = 'ku-popup-body';
        body.innerHTML = `<p>${this.getDefaultDesc(planet)}</p>`;
        const footer = document.createElement('div');
        footer.className = 'ku-popup-footer';
        const closeBtn = this.createBtn('Zamknij', 280, () => {
            playClick(this.state.wcag.soundEnabled);
            this.closePopup();
        });
        footer.appendChild(closeBtn);
        inner.append(title, sep, body, footer);
        popup.appendChild(inner);
        const overlay = this.openOverlay(game, popup);
        this.bindPopupKeys(overlay);
        setTimeout(() => closeBtn.focus(), 50);
    }
    // ONBOARDING
    showOnboarding(game) {
        let step = 0;
        const steps = [
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
        const card = document.createElement('div');
        card.className = 'ku-onboarding-card';
        card.setAttribute('role', 'dialog');
        card.setAttribute('aria-label', 'Wprowadzenie');
        card.setAttribute('aria-modal', 'true');
        const render = () => {
            const s = steps[step];
            card.innerHTML = `
        <div class="ku-onboarding-icon">${s.icon}</div>
        <div class="ku-onboarding-title">${s.title}</div>
        <div class="ku-onboarding-text">${s.text}</div>
        <div class="ku-onboarding-dots">
          ${steps.map((_, i) => `<div class="ku-dot${i === step ? ' active' : ''}"></div>`).join('')}
        </div>
        <div class="ku-onboarding-footer"></div>
      `;
            const footer = card.querySelector('.ku-onboarding-footer');
            const skipBtn = document.createElement('button');
            skipBtn.className = 'ku-btn-ob';
            skipBtn.textContent = 'Pomiń';
            skipBtn.addEventListener('click', () => { playClick(this.state.wcag.soundEnabled); this.closePopup(); });
            const nextBtn = document.createElement('button');
            nextBtn.className = 'ku-btn-ob primary';
            nextBtn.textContent = step < steps.length - 1 ? 'Dalej' : 'Rozumiem';
            nextBtn.addEventListener('click', () => {
                playClick(this.state.wcag.soundEnabled);
                if (step < steps.length - 1) {
                    step++;
                    render();
                }
                else {
                    this.closePopup();
                }
            });
            footer.append(skipBtn, nextBtn);
            setTimeout(() => nextBtn.focus(), 30);
        };
        render();
        const overlay = this.openOverlay(game, card, true);
        this.bindPopupKeys(overlay);
    }
    // ============================================================
    // UTILITIES
    // ============================================================
    clearScreen(game) {
        this.engine?.destroy();
        this.engine = null;
        this.modelEngine?.destroy();
        this.modelEngine = null;
        ['ku-welcome', 'ku-solar', 'ku-model', 'ku-popup-overlay'].forEach(id => {
            document.getElementById(id)?.remove();
        });
    }
    createBtn(label, width, onClick) {
        const btn = document.createElement('button');
        btn.className = `ku-btn ku-btn-${width}`;
        btn.setAttribute('aria-label', label);
        const bg = document.createElement('img');
        bg.src = this.p(`images/btn_${width}x80.svg`);
        bg.alt = '';
        bg.setAttribute('aria-hidden', 'true');
        const span = document.createElement('span');
        span.textContent = label;
        btn.append(bg, span);
        btn.addEventListener('click', onClick);
        return btn;
    }
}

;// ./src/main.ts
// ============================================================
// MAIN.TS — ZPE Entry Point
// Kosmiczne Układy v1.0 | Vanta AI Studio
// ============================================================

let app = null;
ZPE.create({
    init(container, params) {
        app = new App(container, params);
        app.mount();
    },
    run(stateData, isFrozen) {
        if (stateData && app) {
            app.restoreState(stateData);
        }
        if (isFrozen && app) {
            app.freeze();
        }
        else if (app) {
            app.resume();
        }
    },
    unload() {
        if (app) {
            app.saveState((data) => ZPE.setState(data));
            app.removeListeners();
        }
    },
    destroy(container) {
        if (app) {
            app.unmount();
            app = null;
        }
        container.innerHTML = '';
    }
});

/******/ 	return __webpack_exports__;
/******/ })()
;
});;