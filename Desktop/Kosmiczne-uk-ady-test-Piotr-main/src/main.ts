// ============================================================
// MAIN.TS — ZPE Entry Point
// Kosmiczne Układy v1.0 | Vanta AI Studio
// ============================================================

import { create, path as zpePath, setState as zpeSetState } from './zpe-port';
import { App, ZPEParams } from './app';
import { AppState } from './data';

let app: App | null = null;

// params object using the real ZPE path() function — available after init() is called
const params: ZPEParams = {
  path: zpePath
};

function init(container: HTMLElement): Promise<void> {
  return new Promise((resolve) => {
    try {
      app = new App(container, params);
      app.mount();
      resolve();
    } catch (e) {
      console.error('[ZPE Kosmiczne] init error:', e);
      resolve();
    }
  });
}

function run(stateData: Partial<AppState> | null, isFrozen: boolean): void {
  if (stateData && app) {
    app.restoreState(stateData);
  }
  if (isFrozen && app) {
    app.freeze();
  } else if (app) {
    app.resume();
  }
}

function unload(): void {
  if (app) {
    app.saveState((data: any) => { zpeSetState(data); });
    app.removeListeners();
  }
}

function destroy(): void {
  if (app) {
    app.unmount();
    app = null;
  }
}

export default create(init, run, unload, destroy);
