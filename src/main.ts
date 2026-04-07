// ============================================================
// MAIN.TS — ZPE Entry Point
// Kosmiczne Układy v1.0 | Vanta AI Studio
// ============================================================

import { App, ZPEParams } from './app';
import { AppState } from './data'; // used in _run signature

console.log('[KU] Kosmiczne Układy v1.0.1 loaded');

let app: App | null = null;
let _savedState: any = {};

function _init(container: HTMLElement, params: ZPEParams): Promise<void> {
  console.log('[KU] init() called, container:', container, 'params keys:', Object.keys(params || {}));
  return new Promise<void>((resolve, reject) => {
    try {
      app = new App(container, params);
      app.mount();
      console.log('[KU] mount() done');
      resolve();
    } catch (err) {
      console.error('[KU] init() error:', err);
      reject(err);
    }
  });
}

function _run(stateData: Partial<AppState> | null, isFrozen: boolean): Promise<void> {
  if (stateData && app) {
    app.restoreState(stateData);
  }
  if (isFrozen && app) {
    app.freeze();
  } else if (app) {
    app.resume();
  }
  return Promise.resolve();
}

function _unload(): Promise<void> {
  if (app) {
    app.saveState((data: any) => { _savedState = data; });
    app.removeListeners();
  }
  return Promise.resolve();
}

function _destroy(container: HTMLElement): Promise<void> {
  if (app) {
    app.unmount();
    app = null;
  }
  container.innerHTML = '';
  return Promise.resolve();
}

function _setState(state: any): void {
  _savedState = state || {};
  if (app) app.restoreState(_savedState);
}

function _getState(): any {
  if (app) {
    app.saveState((data: any) => { _savedState = data; });
  }
  return _savedState;
}

// For the real ZPE platform: AMD module must export both default and named engineFactory
// matching the { default: engineFactory, engineFactory } structure the ZPE platform expects
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

export { engineFactory };
export default engineFactory;
