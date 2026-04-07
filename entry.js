/*! ZPE Entry Point - AMD wrapper exporting engineFactory for RequireJS */
define(['./loader.js'], function (loader) {
    'use strict';

    function engineFactory() {
        try {
            if (loader) {
                var f = null;
                if (typeof loader === 'function') {
                    f = loader;
                } else if (loader && typeof loader.default === 'function') {
                    f = loader.default;
                }
                if (f) {
                    return f();
                }
            }
            if (typeof window !== 'undefined' && typeof window.createGameEngine === 'function') {
                return window.createGameEngine();
            }
        } catch (err) {
            console.error('[entry.js] engineFactory error:', err);
        }
        return {
            _state: {},
            init: function () { return Promise.resolve(); },
            run: function () { return Promise.resolve(); },
            unload: function () { return Promise.resolve(); },
            destroy: function () { return Promise.resolve(); },
            setState: function (state) { this._state = state || {}; },
            getState: function () { return this._state; }
        };
    }

    return { default: engineFactory, engineFactory: engineFactory };
});
