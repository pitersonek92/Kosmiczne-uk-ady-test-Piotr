// ============================================================
// MAIN.TS — ZPE Entry Point
// Kosmiczne Układy v1.0 | Vanta AI Studio
// ============================================================

import { App, ZPEParams } from './app';
import { AppState } from './data';

declare const ZPE: {
  create(opts: {
    init(container: HTMLElement, params: ZPEParams): void;
    run(stateData: Partial<AppState> | null, isFrozen: boolean): void;
    unload(): void;
    destroy(container: HTMLElement): void;
  }): void;
  setState(data: any): void;
};

let app: App | null = null;

function _init(container: HTMLElement, params: ZPEParams): void {
  app = new App(container, params);
  app.mount();
}

function _run(stateData: Partial<AppState> | null, isFrozen: boolean): void {
  if (stateData && app) {
    app.restoreState(stateData);
  }
  if (isFrozen && app) {
    app.freeze();
  } else if (app) {
    app.resume();
  }
}

function _unload(): void {
  if (app) {
    app.saveState((data: any) => {
      if (typeof ZPE !== 'undefined') ZPE.setState(data);
    });
    app.removeListeners();
  }
}

function _destroy(container: HTMLElement): void {
  if (app) {
    app.unmount();
    app = null;
  }
  container.innerHTML = '';
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
export default function engineFactory() {
  return {
    init: _init,
    run: _run,
    unload: _unload,
    destroy: _destroy
  };
}
