// ============================================================
// WCAG.TS — Zarządzanie dostępnością
// Kosmiczne Układy v1.0 | Vanta AI Studio
// ============================================================

import { WcagState } from './data';

const ROOT_ID = 'ku-root';

// Cursor SVG templates
const CURSORS: Record<string, Record<string, string>> = {
  n: {
    def: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M5 3l14 9-7 1-4 7z' fill='%23ffffff' stroke='%23000' stroke-width='1'/%3E%3C/svg%3E") 5 3, auto`,
    w:   `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M5 3l14 9-7 1-4 7z' fill='%23ffffff' stroke='%23333' stroke-width='1'/%3E%3C/svg%3E") 5 3, auto`,
    y:   `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M5 3l14 9-7 1-4 7z' fill='%23FFD700' stroke='%23333' stroke-width='1'/%3E%3C/svg%3E") 5 3, auto`,
    b2:  `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M5 3l14 9-7 1-4 7z' fill='%2300ccff' stroke='%23000' stroke-width='1'/%3E%3C/svg%3E") 5 3, auto`,
  },
  d: {
    def: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 36 36'%3E%3Cpath d='M7 4l21 14-11 1-6 10z' fill='%23ffffff' stroke='%23000' stroke-width='1.5'/%3E%3C/svg%3E") 7 4, auto`,
    w:   `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 36 36'%3E%3Cpath d='M7 4l21 14-11 1-6 10z' fill='%23ffffff' stroke='%23333' stroke-width='1.5'/%3E%3C/svg%3E") 7 4, auto`,
    y:   `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 36 36'%3E%3Cpath d='M7 4l21 14-11 1-6 10z' fill='%23FFD700' stroke='%23333' stroke-width='1.5'/%3E%3C/svg%3E") 7 4, auto`,
    b2:  `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 36 36'%3E%3Cpath d='M7 4l21 14-11 1-6 10z' fill='%2300ccff' stroke='%23000' stroke-width='1.5'/%3E%3C/svg%3E") 7 4, auto`,
  },
  b: {
    def: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cpath d='M9 5l28 18-14 2-8 14z' fill='%23ffffff' stroke='%23000' stroke-width='2'/%3E%3C/svg%3E") 9 5, auto`,
    w:   `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cpath d='M9 5l28 18-14 2-8 14z' fill='%23ffffff' stroke='%23333' stroke-width='2'/%3E%3C/svg%3E") 9 5, auto`,
    y:   `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cpath d='M9 5l28 18-14 2-8 14z' fill='%23FFD700' stroke='%23333' stroke-width='2'/%3E%3C/svg%3E") 9 5, auto`,
    b2:  `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cpath d='M9 5l28 18-14 2-8 14z' fill='%2300ccff' stroke='%23000' stroke-width='2'/%3E%3C/svg%3E") 9 5, auto`,
  }
};

export function applyWcag(root: HTMLElement, state: WcagState): void {
  root.className = root.className
    .split(' ')
    .filter(c => !c.startsWith('ku-') && !c.startsWith('kuf-'))
    .join(' ');

  if (state.highContrast) root.classList.add('ku-hc');
  if (state.reduceMotion) root.classList.add('ku-noanim');
  if (!state.showOrbits) root.classList.add('ku-no-orbits');
  if (state.learnMode) root.classList.add('ku-learn');
  root.classList.add(`ku-size-${state.textSize}`);
  if (state.colorFilter !== 'none') root.classList.add(`kuf-${state.colorFilter}`);
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
      const matrices: Record<string, string> = {
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
      (filterEl as HTMLElement).style.filter = 'url(#ku-color-filter-def)';
    } else {
      if (state.highContrast) {
        (filterEl as HTMLElement).style.filter = 'contrast(1.6) brightness(1.1)';
      } else {
        (filterEl as HTMLElement).style.filter = '';
      }
    }
  } else if (state.highContrast) {
    root.style.filter = 'contrast(1.6) brightness(1.1)';
  } else if (state.colorFilter === 'none') {
    root.style.filter = '';
  }
}

export function createColorFilterSVG(): SVGSVGElement {
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
let audioCtx: AudioContext | null = null;

function getAudioCtx(): AudioContext | null {
  if (!audioCtx) {
    try { audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)(); } catch(e) {}
  }
  return audioCtx;
}

export function playClick(enabled: boolean): void {
  if (!enabled) return;
  const ctx = getAudioCtx();
  if (!ctx) return;
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

export function playHover(enabled: boolean): void {
  if (!enabled) return;
  const ctx = getAudioCtx();
  if (!ctx) return;
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
