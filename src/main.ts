// ============================================================
// MAIN.TS — ZPE Entry Point (ZPE-Port 2.0)
// Kosmiczne Układy v1.0 | Vanta AI Studio
// ============================================================

import * as ZPE from '@/zpe-port';
import { App } from './app';
import { AppState } from './data';

console.log('[KU] Kosmiczne Układy v1.0.2 loaded (ZPE-Port 2.0)');

let app: App | null = null;
let _savedState: any = {};

async function init(container: HTMLElement): Promise<void> {
  console.log('[KU] init() called, container:', container);
  try {
    app = new App(container);
    app.mount();
    console.log('[KU] mount() done');
  } catch (err) {
    console.error('[KU] init() error:', err);
    throw err;
  }
}

async function run(stateData: Partial<AppState> | null, isFrozen: boolean): Promise<void> {
  if (stateData && app) {
    app.restoreState(stateData);
  }
  if (isFrozen && app) {
    app.freeze();
  } else if (app) {
    app.resume();
  }
}

async function unload(): Promise<void> {
  if (app) {
    app.saveState(function(data: any) { _savedState = data; });
    app.removeListeners();
  }
}

async function destroy(): Promise<void> {
  if (app) {
    app.unmount();
    app = null;
  }
}

export default ZPE.create(init, run, unload, destroy);
