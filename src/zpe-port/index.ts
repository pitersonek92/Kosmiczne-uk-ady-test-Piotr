// ============================================================
// ZPE-Port — local implementation
// Compatible with ZPE-Port 2.0 API (zpe-projekty/zpe-port)
// ============================================================

import { InlineImages } from '../assets/inlineImages';

// Module-level storage — set by init(), used by path(), getData(), setState()
var _exerciseApi: any = null;
var _engineOptions: any = null;
var _state: any = null;
var _isFrozen: boolean = false;
var _isRunning: boolean = false;

/**
 * Resolves a resource path using the ZPE platform API.
 * ZPE exposes its CDN resolver via api.enginePath().
 */
export function path(relativePath: string): string {
  var cleanPath = relativePath.startsWith('/') ? relativePath.substring(1) : relativePath;

  // 0. Use inlined Base64 assets (bypasses ZPE CDN — works even when CDN is missing files)
  if (InlineImages[cleanPath]) {
    return InlineImages[cleanPath];
  }

  // 1. Use stored API from init()
  if (_exerciseApi && typeof _exerciseApi.enginePath === 'function') {
    try { return _exerciseApi.enginePath(cleanPath); } catch (_) {}
  }

  // 2. Try global _exerciseApi (injected by ZPE platform)
  var globalApi = (typeof window !== 'undefined') ? (window as any)._exerciseApi : undefined;
  if (globalApi && typeof globalApi.enginePath === 'function') {
    try { return globalApi.enginePath(cleanPath); } catch (_) {}
  }

  // 3. Try __ZPE_BASE_URL__ (detected from script src)
  if (typeof window !== 'undefined' && (window as any).__ZPE_BASE_URL__) {
    var base: string = (window as any).__ZPE_BASE_URL__;
    if (!base.endsWith('/')) base += '/';
    return base + cleanPath;
  }

  // 4. Detect base URL from entry.js script tag
  if (typeof document !== 'undefined') {
    var scripts = document.getElementsByTagName('script');
    for (var i = 0; i < scripts.length; i++) {
      var src = scripts[i].src;
      if (src && (src.indexOf('entry.js') !== -1 || src.indexOf('loader.js') !== -1 || src.indexOf('entry_v') !== -1)) {
        var lastSlash = src.lastIndexOf('/');
        var detected = lastSlash !== -1 ? src.substring(0, lastSlash + 1) : './';
        (window as any).__ZPE_BASE_URL__ = detected;
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
export function getData(): Record<string, any> {
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
export function create(
  initFn:    (container: HTMLElement) => Promise<void>,
  runFn:     (stateData: any, isFrozen: boolean) => Promise<void> | void,
  unloadFn:  () => Promise<void> | void,
  destroyFn: () => Promise<void> | void
): () => any {
  // Return a factory function — ZPE does: var engine = module.default()
  // so module.default must be a callable factory, not the engine object directly.
  return function engineFactory(): any {
  return {
    init: function(container: HTMLElement, api: any, options: any): Promise<void> {
      _exerciseApi = api;
      _engineOptions = options;
      _state = null;
      _isFrozen = false;
      _isRunning = false;
      return initFn(container).catch(function(e: any) {
        console.error('[ZPEPort] init error:', e);
      });
    },

    setState: function(stateData: any): void {
      _state = (stateData && typeof stateData === 'object') ? stateData : null;
      _isFrozen = false;
      var unloadPromise: Promise<void>;
      if (_isRunning) {
        try {
          var r = unloadFn();
          unloadPromise = (r instanceof Promise) ? r : Promise.resolve();
        } catch(e) { unloadPromise = Promise.resolve(); }
      } else {
        unloadPromise = Promise.resolve();
      }
      unloadPromise.then(function() {
        try {
          var result = runFn(JSON.parse(JSON.stringify(_state)), _isFrozen);
          if (result instanceof Promise) return result;
        } catch(e) { console.error('[ZPEPort] run error:', e); }
        _isRunning = true;
      });
    },

    getState: function(): any {
      return _state;
    },

    setStateFrozen: function(value: boolean): void {
      _isFrozen = value;
    },

    getStateProgress: function(_data: any): Record<string, any> {
      return {};
    },

    destroy: function(_container?: HTMLElement): Promise<void> {
      return Promise.resolve().then(function() {
        try {
          var r = unloadFn();
          if (r instanceof Promise) return r;
        } catch(e) {}
      }).then(function() {
        try {
          var r = destroyFn();
          if (r instanceof Promise) return r;
        } catch(e) {}
        _isRunning = false;
      });
    }
  };
  }; // end engineFactory
}
