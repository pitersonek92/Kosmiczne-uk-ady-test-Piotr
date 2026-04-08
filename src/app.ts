// ============================================================
// APP.TS — Główna logika aplikacji
// Kosmiczne Układy v1.0 | Vanta AI Studio
// ============================================================

import { ASTRONOMERS, AstronomerData, Planet, AppState, DEFAULT_STATE, DEFAULT_WCAG, WcagState } from './data';
import { CanvasEngine } from './engine';
import { applyWcag, createColorFilterSVG, playClick, playHover } from './wcag';

export interface ZPEParams {
  path?: (name: string) => string;
  enginePath?: (name: string) => string;
  [key: string]: any;
}

const TOPBAR_H = 68;

// ============================================================
// CSS injection
// ============================================================
function injectCSS(): void {
  if (document.getElementById('ku-styles')) return;
  const style = document.createElement('style');
  style.id = 'ku-styles';
  style.textContent = `
/* === KU ROOT ISOLATION === */
#ku-root, #ku-root *, #ku-root *::before, #ku-root *::after {
  box-sizing: border-box !important;
  font-family: 'Segoe UI', Arial, sans-serif !important;
}
#ku-root {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 1920px !important;
  height: 1080px !important;
  margin: 0 !important;
  padding: 0 !important;
  overflow: hidden !important;
  transform-origin: 0 0 !important;
  cursor: var(--ku-cursor, auto) !important;
  background: #000510 !important;
  overscroll-behavior: none !important;
  touch-action: pan-x pan-y !important;
}
#ku-root *, #ku-root input, #ku-root button, #ku-root textarea {
  cursor: inherit !important;
}
/* select musi mieć jawny kursor — inherit nie działa we wszystkich przeglądarkach */
#ku-root select { cursor: var(--ku-cursor, auto) !important; }

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
  max-height: calc(1080px - ${TOPBAR_H}px - 40px) !important;
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
export class App {
  private container: HTMLElement;
  private params: ZPEParams;
  private state: AppState;
  private root!: HTMLElement;
  private engine: CanvasEngine | null = null;
  private modelEngine: CanvasEngine | null = null;
  private currentPopup: HTMLElement | null = null;
  private popupTrigger: HTMLElement | null = null;
  private tooltipEl: HTMLElement | null = null;
  private hoveredPortraitIdx = -1;

  constructor(container: HTMLElement, params: ZPEParams) {
    this.container = container;
    this.params = params;
    this.state = JSON.parse(JSON.stringify(DEFAULT_STATE));
  }

  mount(): void {
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
      new ResizeObserver(() => this._applyScale()).observe(this.container);
    }

    this.renderTopbar(this.root);
    this.showWelcome(this.root);
  }

  private _applyScale(): void {
    if (!this.root || !this.container) return;
    const cw = this.container.offsetWidth;
    if (!cw) return;
    const scale = cw / 1920;
    this.root.style.setProperty('transform', `scale(${scale})`, 'important');
    this.root.style.setProperty('transform-origin', '0 0', 'important');
  }

  unmount(): void {
    this.engine?.destroy();
    this.modelEngine?.destroy();
    this.root?.remove();
    document.getElementById('ku-styles')?.remove();
    document.getElementById('ku-color-filter')?.remove();
  }

  removeListeners(): void {
    // Engines handle their own cleanup
  }

  saveState(setState: (data: any) => void): void {
    setState(this.state);
  }

  restoreState(data: Partial<AppState>): void {
    if (data) Object.assign(this.state, data);
  }

  freeze(): void { this.engine?.setPaused(true); this.modelEngine?.setPaused(true); }
  resume(): void { this.engine?.setPaused(false); this.modelEngine?.setPaused(false); }

  private p(name: string): string {
    if (typeof this.params.path === 'function') return this.params.path(name);
    if (typeof this.params.enginePath === 'function') return this.params.enginePath(name);
    return name;
  }

  // ============================================================
  // TOPBAR
  // ============================================================
  private renderTopbar(game: HTMLElement): void {
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

    const soundBtn = this.createTopbarBtn(
      this.state.wcag.soundEnabled ? 'images/ico_sound_on.svg' : 'images/ico_sound_off.svg',
      'Dźwięk', 'ku-sound-btn'
    );
    soundBtn.addEventListener('click', () => {
      this.state.wcag.soundEnabled = !this.state.wcag.soundEnabled;
      const img = soundBtn.querySelector('img') as HTMLImageElement;
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

  private createTopbarBtn(iconSrc: string, label: string, id: string): HTMLButtonElement {
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
  private showWelcome(game: HTMLElement): void {
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
  private showSolar(game: HTMLElement, skipOnboarding = false): void {
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
    canvas.width = 1635;
    canvas.height = 978;

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
      pathFn: (name: string) => this.p(name),
      onHover: (planet) => {
        if (planet) playHover(this.state.wcag.soundEnabled);
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
    canvas.addEventListener('keydown', (e: KeyboardEvent) => {
      const eng = this.engine;
      if (!eng) return;
      const ids = eng.getPlanetIds();
      if (ids.length === 0) return;
      const currentId = eng.getHoveredId();
      const currentIdx = currentId ? ids.indexOf(currentId) : -1;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIdx = (currentIdx + 1) % ids.length;
        eng.setKeyboardFocus(ids[nextIdx]);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIdx = (currentIdx - 1 + ids.length) % ids.length;
        eng.setKeyboardFocus(ids[prevIdx]);
      } else if (e.key === 'Enter') {
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
      } else if (e.key === ' ') {
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

  private buildLeftPanel(game: HTMLElement, screen: HTMLElement): HTMLElement {
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

      wrap.addEventListener('keydown', (e: KeyboardEvent) => {
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

  private showPortraitTooltip(wrap: HTMLElement, name: string): void {
    const tip = document.createElement('div');
    tip.className = 'ku-portrait-tooltip';
    tip.innerHTML = `<em>Biografia:</em> <strong>${name}</strong>`;
    wrap.appendChild(tip);
  }

  private hidePortraitTooltip(wrap: HTMLElement): void {
    wrap.querySelector('.ku-portrait-tooltip')?.remove();
  }

  private updateSolarTitle(text: string): void {
    const el = document.getElementById('ku-solar-title');
    if (el) el.textContent = text;
  }

  private switchModel(idx: number): void {
    this.state.activeAstronomerIndex = idx;
    const astro = ASTRONOMERS[idx];

    // Update portrait borders
    document.querySelectorAll('.ku-portrait-wrap').forEach((el, i) => {
      el.classList.toggle('active', i === idx);
      const img = el.querySelector('.ku-portrait') as HTMLImageElement;
      if (img) img.src = this.p(`images/${ASTRONOMERS[i].portrait}`);
    });

    // Update portrait image for active
    const activeWrap = document.querySelectorAll('.ku-portrait-wrap')[idx];
    if (activeWrap) {
      (activeWrap.querySelector('.ku-portrait') as HTMLImageElement).src = this.p(`images/${astro.portraitHover}`);
    }

    this.updateSolarTitle(astro.screenTitle);
    this.engine?.setPlanets(astro.planets);

    if (!this.state.visitedAstronomers.includes(astro.id)) {
      this.state.visitedAstronomers.push(astro.id);
    }
  }

  private showPlanetTooltip(container: HTMLElement, planet: Planet, canvas: HTMLCanvasElement): void {
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

  private getDefaultDesc(planet: Planet): string {
    const descs: Record<string, string> = {
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
  private showModel(game: HTMLElement, astronomerIdx: number): void {
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
    canvas.width = 1920;
    canvas.height = 810;
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
      pathFn: (name: string) => this.p(name),
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
  private openOverlay(game: HTMLElement, content: HTMLElement, full = false): HTMLElement {
    const overlay = document.createElement('div');
    overlay.className = full ? 'ku-overlay ku-overlay-full' : 'ku-overlay';
    overlay.id = 'ku-popup-overlay';

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) this.closePopup();
    });

    overlay.appendChild(content);
    game.appendChild(overlay);
    this.currentPopup = overlay;
    return overlay;
  }

  private closePopup(): void {
    this.currentPopup?.remove();
    this.currentPopup = null;
    this.popupTrigger?.focus();
    this.popupTrigger = null;
  }

  private bindPopupKeys(overlay: HTMLElement): void {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Backspace') {
        e.preventDefault();
        overlay.removeEventListener('keydown', handler);
        this.closePopup();
      }
    };
    overlay.addEventListener('keydown', handler);
    // Also global for Escape
    const globalHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        document.removeEventListener('keydown', globalHandler);
        if (this.currentPopup === overlay) this.closePopup();
      }
    };
    document.addEventListener('keydown', globalHandler);
  }

  // BIOGRAPHY
  private openBiography(game: HTMLElement, astro: AstronomerData, idx: number, trigger: HTMLElement): void {
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
  private openInstructions(game: HTMLElement, trigger: HTMLElement): void {
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
  private openSettings(game: HTMLElement, trigger: HTMLElement): void {
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
      btn.style.cssText = `font-size: ${12 + (sz-1)*3}px !important;`;
      btn.setAttribute('aria-label', `Rozmiar tekstu ${sz}`);
      btn.addEventListener('click', () => {
        this.state.wcag.textSize = sz as 1|2|3;
        sizeBtns.querySelectorAll('.ku-text-size-btn').forEach((b, i) => {
          b.classList.toggle('active', i+1 === sz);
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
      this.state.wcag.colorFilter = colorSel.value as any;
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
      o.value = opt.val; o.textContent = opt.label;
      o.selected = w.cursorSize === opt.val;
      cursorSzSel.appendChild(o);
    });
    cursorSzSel.addEventListener('change', () => {
      this.state.wcag.cursorSize = cursorSzSel.value as any;
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
      o.value = opt.val; o.textContent = opt.label;
      o.selected = w.cursorColor === opt.val;
      cursorClrSel.appendChild(o);
    });
    cursorClrSel.addEventListener('change', () => {
      this.state.wcag.cursorColor = cursorClrSel.value as any;
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

  private buildSettingsRow(label: string, full = false): HTMLElement {
    const row = document.createElement('div');
    row.className = `ku-settings-row${full ? ' full' : ''}`;
    const lbl = document.createElement('span');
    lbl.className = 'ku-settings-label';
    lbl.textContent = label;
    row.appendChild(lbl);
    return row;
  }

  private buildToggle(initial: boolean, onChange: (v: boolean) => void): HTMLButtonElement {
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
  private openPlanetPopup(game: HTMLElement, planet: Planet): void {
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
  private showOnboarding(game: HTMLElement): void {
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
      const footer = card.querySelector('.ku-onboarding-footer')!;

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
        } else {
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
  private clearScreen(game: HTMLElement): void {
    this.engine?.destroy();
    this.engine = null;
    this.modelEngine?.destroy();
    this.modelEngine = null;

    ['ku-welcome', 'ku-solar', 'ku-model', 'ku-popup-overlay'].forEach(id => {
      document.getElementById(id)?.remove();
    });
  }

  private createBtn(label: string, width: 280 | 420 | 620, onClick: () => void): HTMLButtonElement {
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
