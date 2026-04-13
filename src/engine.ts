// ============================================================
// ENGINE.TS — Silnik animacji Canvas
// Kosmiczne Układy v1.0 | Vanta AI Studio
// ============================================================

import { Planet } from './data';

export interface EngineOptions {
  canvas: HTMLCanvasElement;
  planets: Planet[];
  showOrbits: boolean;
  reduceMotion: boolean;
  onHover?: (planet: Planet | null) => void;
  onLeftClick?: (planet: Planet) => void;
  onRightClick?: (planet: Planet) => void;
  pathFn?: (name: string) => string;
}

interface PlanetState {
  angle: number;
}

// Perspective: y scale for orbit ellipses
const PERSP = 0.38;
const ZOOM_MIN = 0.3;
const ZOOM_MAX = 3.5;

export class CanvasEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private planets: Planet[] = [];
  private states: Record<string, PlanetState> = {};
  private zoom = 1;
  private panX = 0;
  private panY = 0;
  private hoveredId: string | null = null;
  private raf = 0;
  private paused = false;
  private showOrbits: boolean;
  private reduceMotion: boolean;
  private bgImage: HTMLImageElement | null = null;
  private bgLoaded = false;
  private planetImages: Record<string, HTMLImageElement> = {};
  private pathFn?: (name: string) => string;

  // Mouse drag state
  private dragStart: { x: number; y: number } | null = null;
  private panStart: { x: number; y: number } | null = null;
  private dragged = false;

  private onHover?: (planet: Planet | null) => void;
  private onLeftClick?: (planet: Planet) => void;
  private onRightClick?: (planet: Planet) => void;

  constructor(opts: EngineOptions) {
    this.canvas = opts.canvas;
    this.ctx = opts.canvas.getContext('2d')!;
    this.showOrbits = opts.showOrbits;
    this.reduceMotion = opts.reduceMotion;
    this.onHover = opts.onHover;
    this.onLeftClick = opts.onLeftClick;
    this.onRightClick = opts.onRightClick;
    this.pathFn = opts.pathFn;
    this.setPlanets(opts.planets);
    this.bindEvents();
  }

  setPlanets(planets: Planet[]): void {
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

  loadBackground(src: string): void {
    const img = new Image();
    img.onload = () => { this.bgImage = img; this.bgLoaded = true; };
    img.onerror = () => { this.bgLoaded = true; };
    img.src = src;
  }

  private loadPlanetImages(): void {
    if (!this.pathFn) return;
    // Mapping planet base IDs to actual asset filenames (with images/ prefix)
    const imgMap: Record<string, string> = {
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
    this.planets.forEach(p => {
      const baseId = p.id.split('_')[0];
      const imgFile = imgMap[baseId];
      if (imgFile && !this.planetImages[baseId]) {
        const img = new Image();
        img.onload = () => { this.planetImages[baseId] = img; };
        img.src = this.pathFn!(imgFile);
      }
    });
  }

  private fitZoom(): void {
    if (this.planets.length === 0) return;
    const maxOrbit = Math.max(...this.planets.map(p => p.orbit));
    if (maxOrbit === 0) { this.zoom = 1; return; }
    const halfW = this.canvas.width * 0.44;
    this.zoom = Math.min(halfW / maxOrbit, 1.4);
    this.panX = 0;
    this.panY = 0;
  }

  setShowOrbits(v: boolean): void { this.showOrbits = v; }
  setReduceMotion(v: boolean): void { this.reduceMotion = v; if (v) this.paused = true; else this.paused = false; }
  setPaused(v: boolean): void { this.paused = v; }

  /** Ustawia aktywną planetę z klawiatury (highlight jak hover) */
  setKeyboardFocus(planetId: string | null): void {
    this.hoveredId = planetId;
    this.canvas.style.cursor = planetId ? 'pointer' : 'default';
  }

  /** Zwraca id aktualnie podświetlonej planety */
  getHoveredId(): string | null { return this.hoveredId; }

  /** Zwraca listę id planet w bieżącej kolejności */
  getPlanetIds(): string[] { return this.planets.map(p => p.id); }

  /** Zwraca obiekt planety po id */
  getPlanetById(id: string): Planet | null {
    return this.planets.find(p => p.id === id) || null;
  }

  zoomBy(delta: number): void {
    const cx = this.canvas.width / 2;
    const cy = this.canvas.height / 2;
    const factor = delta > 0 ? 1.15 : 0.88;
    const newZoom = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, this.zoom * factor));
    this.panX = cx - (cx - this.panX) * (newZoom / this.zoom);
    this.panY = cy - (cy - this.panY) * (newZoom / this.zoom);
    this.zoom = newZoom;
  }

  resetView(): void { this.fitZoom(); }

  start(): void {
    this.raf = requestAnimationFrame(this.tick);
  }

  stop(): void {
    cancelAnimationFrame(this.raf);
  }

  private tick = (): void => {
    if (!this.paused && !this.reduceMotion) {
      this.planets.forEach(p => {
        if (p.orbit === 0) return;
        if (this.hoveredId === p.id) return;
        this.states[p.id].angle += p.speed * 0.007;
      });
    }
    this.draw();
    this.raf = requestAnimationFrame(this.tick);
  };

  private cx(): number { return this.canvas.width / 2 + this.panX; }
  private cy(): number { return this.canvas.height / 2 + this.panY; }

  private planetPos(p: Planet): { x: number; y: number } {
    const angle = this.states[p.id]?.angle ?? 0;
    return {
      x: this.cx() + Math.cos(angle) * p.orbit * this.zoom,
      y: this.cy() + Math.sin(angle) * p.orbit * this.zoom * PERSP,
    };
  }

  private draw(): void {
    const { canvas, ctx } = this;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background
    if (this.bgImage && this.bgLoaded) {
      ctx.drawImage(this.bgImage, 0, 0, canvas.width, canvas.height);
    } else {
      // Fallback: dark space gradient
      const grad = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 0, canvas.width/2, canvas.height/2, canvas.width/2);
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
        if (p.orbit === 0) return;
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

  private drawStars(): void {
    const ctx = this.ctx;
    // Simple static star field
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    const stars = [
      [45,23],[123,67],[234,12],[456,78],[567,34],[678,89],[789,45],[890,23],
      [901,67],[112,234],[223,189],[334,145],[445,201],[556,167],[667,223],
      [778,178],[889,234],[100,300],[200,350],[300,280],[400,320],[500,290],
      [600,340],[700,310],[800,270],[900,330],[150,400],[250,450],[350,380],
      [450,420],[550,390],[650,440],[750,410],[850,370],[950,430],
    ];
    stars.forEach(([x, y]) => {
      ctx.fillRect(x % this.canvas.width, y % this.canvas.height, 1, 1);
    });
  }

  private getLabelDir(p: Planet, px: number, py: number): { dx: number; dy: number } {
    const cy = this.cy();
    // Go up if planet is in upper half, down if lower half
    return { dx: 0, dy: py < cy ? -1 : 1 };
  }

  private getLabelLength(r: number): number {
    return (40 + r) * Math.max(0.75, this.zoom);
  }

  private drawLabelLine(p: Planet, px: number, py: number): void {
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

  private drawLabelText(p: Planet, px: number, py: number): void {
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

  private drawPlanet(p: Planet, px: number, py: number): void {
    const ctx = this.ctx;
    const r = p.r * this.zoom;
    const isHovered = this.hoveredId === p.id;
    const t = Date.now();
    const baseId = p.id.split('_')[0];
    const img = this.planetImages[baseId];

    if (p.glow && img) {
      this.drawSunFromImage(img, px, py, r);
    } else if (p.glow) {
      this.drawSun(px, py, r, t);
    } else if (img) {
      this.drawPlanetFromImage(img, p, px, py, r);
    } else {
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

  private drawPlanetFromImage(img: HTMLImageElement, p: Planet, px: number, py: number, r: number): void {
    const ctx = this.ctx;
    ctx.save();
    ctx.beginPath();
    ctx.arc(px, py, r, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(img, px - r, py - r, r * 2, r * 2);
    ctx.restore();

    // Saturn rings drawn after
  }

  private drawSunFromImage(img: HTMLImageElement, px: number, py: number, r: number): void {
    const ctx = this.ctx;

    // Outer glow
    const glow = ctx.createRadialGradient(px, py, r * 0.5, px, py, r * 3.5);
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
    ctx.font = `bold ${Math.max(10, r * 0.55)}px 'Segoe UI', Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Słońce', px, py);
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
  }

  private drawSun(px: number, py: number, r: number, t: number): void {
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
      const fg = ctx.createRadialGradient(px, py, r * 0.8, px + Math.cos(angle)*r*0.4, py + Math.sin(angle)*r*0.4, spokeR);
      fg.addColorStop(0, 'rgba(255,200,0,0.7)');
      fg.addColorStop(1, 'rgba(255,80,0,0)');
      ctx.fillStyle = fg;
      ctx.beginPath();
      ctx.arc(x2, y2, r * 0.35, 0, Math.PI * 2);
      ctx.fill();
    }

    // Sun body
    const body = ctx.createRadialGradient(px - r*0.3, py - r*0.3, r*0.1, px, py, r);
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

  private drawRegularPlanet(p: Planet, px: number, py: number, r: number, _t: number): void {
    const ctx = this.ctx;
    const pal = p.palette;

    ctx.save();
    ctx.beginPath();
    ctx.arc(px, py, r, 0, Math.PI * 2);
    ctx.clip();

    if (pal) {
      // Base gradient
      const base = ctx.createRadialGradient(px - r*0.35, py - r*0.35, r*0.05, px, py, r);
      base.addColorStop(0, pal.h);
      base.addColorStop(0.5, pal.c);
      base.addColorStop(1, pal.d);
      ctx.fillStyle = base;
      ctx.fillRect(px - r, py - r, r*2, r*2);

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
      const shadow = ctx.createRadialGradient(px + r*0.5, py, r*0.1, px + r*0.5, py, r*1.8);
      shadow.addColorStop(0, 'rgba(0,0,0,0.6)');
      shadow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = shadow;
      ctx.fillRect(px - r, py - r, r*2, r*2);

      // Specular (upper-left)
      const spec = ctx.createRadialGradient(px - r*0.4, py - r*0.4, 0, px - r*0.4, py - r*0.4, r*0.8);
      spec.addColorStop(0, 'rgba(255,255,255,0.35)');
      spec.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = spec;
      ctx.fillRect(px - r, py - r, r*2, r*2);
    } else {
      // Fallback color
      ctx.fillStyle = p.clr;
      ctx.fillRect(px - r, py - r, r*2, r*2);
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

  private drawRings(px: number, py: number, r: number): void {
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

  private hitTest(clientX: number, clientY: number): Planet | null {
    const rect = this.canvas.getBoundingClientRect();
    const mx = clientX - rect.left;
    const my = clientY - rect.top;

    let closest: Planet | null = null;
    let minDist = Infinity;

    this.planets.forEach(p => {
      const pos = this.planetPos(p);
      const r = p.r * this.zoom + 12;
      const dx = mx - pos.x;
      const dy = my - pos.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < r && dist < minDist) {
        minDist = dist;
        closest = p;
      }
    });

    return closest;
  }

  private bindEvents(): void {
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
          this.panX = this.panStart!.x + dx;
          this.panY = this.panStart!.y + dy;
        }
      } else {
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
          if (e.button === 0) this.onLeftClick?.(hit);
          if (e.button === 2) this.onRightClick?.(hit);
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
        if (hit) this.onRightClick?.(hit);
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

  destroy(): void {
    this.stop();
    // Events will be cleaned up when canvas is removed
  }
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number): void {
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
