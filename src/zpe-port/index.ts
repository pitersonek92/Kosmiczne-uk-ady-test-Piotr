// ============================================================
// ZPE-Port — local implementation
// Compatible with ZPE-Port 2.0 API (zpe-projekty/zpe-port)
// ============================================================

/**
 * Resolves a resource path using the ZPE platform API.
 * ZPE exposes its CDN resolver via window._exerciseApi.enginePath().
 * Falls back to a base-URL detection or the raw path for local dev.
 */
export function path(relativePath: string): string {
  var cleanPath = relativePath.startsWith('/') ? relativePath.substring(1) : relativePath;

  // 1. Try the global ZPE exercise API (injected by ZPE platform at runtime)
  var globalApi = (typeof window !== 'undefined') ? (window as any)._exerciseApi : undefined;
  if (globalApi) {
    if (typeof globalApi.enginePath === 'function') {
      try { return globalApi.enginePath(cleanPath); } catch (_) {}
    }
    if (typeof globalApi.path === 'function') {
      try { return globalApi.path(cleanPath); } catch (_) {}
    }
  }

  // 2. Try __ZPE_BASE_URL__ (detected from script src)
  if (typeof window !== 'undefined' && (window as any).__ZPE_BASE_URL__) {
    var base: string = (window as any).__ZPE_BASE_URL__;
    if (!base.endsWith('/')) base += '/';
    return base + cleanPath;
  }

  // 3. Detect base URL from loader.js / entry.js script tag
  if (typeof document !== 'undefined') {
    var scripts = document.getElementsByTagName('script');
    for (var i = 0; i < scripts.length; i++) {
      var src = scripts[i].src;
      if (src && (src.indexOf('loader.js') !== -1 || src.indexOf('entry.js') !== -1)) {
        var lastSlash = src.lastIndexOf('/');
        var detected = lastSlash !== -1 ? src.substring(0, lastSlash + 1) : './';
        (window as any).__ZPE_BASE_URL__ = detected;
        return detected + cleanPath;
      }
    }
  }

  // 4. Fallback: return path as-is (works in local dev with devServer)
  return cleanPath;
}

/**
 * Creates a ZPE-compatible engine factory.
 * Call this as: export default ZPE.create(init, run, unload, destroy)
 *
 * The returned factory function is what the AMD loader gets.
 * ZPE calls engineFactory() → receives { init, run, unload, destroy }.
 */
export function create(
  init:    (container: HTMLElement) => Promise<void>,
  run:     (stateData: any, isFrozen: boolean) => Promise<void>,
  unload:  () => Promise<void>,
  destroy: (container?: HTMLElement) => Promise<void>
): () => { init: typeof init; run: typeof run; unload: typeof unload; destroy: typeof destroy } {
  return function engineFactory() {
    return { init: init, run: run, unload: unload, destroy: destroy };
  };
}
