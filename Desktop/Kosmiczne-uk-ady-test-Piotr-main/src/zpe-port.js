let _container;
let _exerciseApi;
let _engineOptions;
let _data;
let _state = null;
let _isStateRestored = false;
let _isFrozen = false;
let _isRunning = false;
// Główna funkcja starująca aplikację.
// Aplikacja pracuje jako biblioteka AMD wywoływana przez platformę.
// Przykład użycia:
//
// plik src/index.ts:
//
// import * as ZPE from "./zpe";
// import { init, destroy } from "./app";
//
// export default ZPE.create(init, run, destroy, unload);
//
// gdzie:
//   init - funkcja inicjalizująca aplikację. Przyjmuje kontener HTML jako argument i zwraca Promise który
//          rozwiązuje się gdy aplikacja jest gotowa do użycia.
//   destroy - funkcja sprzątająca zasoby przy niszczeniu aplikacji
//
// 1. Razem z funkcją init przekazwyana jest kontener HTML. Tylko w nim aplikacja może tworzyć swoje elementy.
// 2. Funkcja init musi zwracać Promise, który powinien się rozwiązać gdy aplikacja jest gotowa do użycia.
// 3. Funkcja destroy jest wywoływana przy niszczeniu aplikacji i powinna posprzątać zasoby (usunąć elementy z DOM itp.)
function create(initFn, runFn, unloadFn, destroyFn) {
    if (!initFn) {
        throw new Error("Init function is required to create the engine.");
    }
    if (!runFn) {
        throw new Error("Run function is required to create the engine.");
    }
    if (!unloadFn) {
        throw new Error("Unload function is required to create the engine.");
    }
    if (!destroyFn) {
        throw new Error("Destroy function is required to create the engine.");
    }
    return function () {
        return {
            init: (container, api, options) => {
                return new Promise((resolve) => {
                    log("ZPE initializing engine with options:", options);
                    _container = container;
                    _exerciseApi = api;
                    _engineOptions = options;
                    _data = _engineOptions.data || {};
                    log("Hello, Engine!", _data, options);
                    initFn(container).then(() => {
                        resolve();
                    }).catch((e) => {
                        log("Error during init:", e);
                        resolve();
                    });
                });
            },
            destroy: () => {
                return Promise.resolve().then(() => {
                    log("ZPE destroying engine.");
                    try {
                        const result = unloadFn();
                        if (result instanceof Promise) {
                            return result;
                        }
                    }
                    catch (e) {
                        log("Error during unload:", e);
                    }
                    return Promise.resolve();
                }).then(() => {
                    try {
                        const result = destroyFn();
                        if (result instanceof Promise) {
                            return result;
                        }
                    }
                    catch (e) {
                        log("Error during destroy:", e);
                    }
                    return Promise.resolve();
                }).then(() => {
                    log("ZPE engine destroyed.");
                });
            },
            setState(stateData) {
                log("ZPE setting state:", stateData);
                _state = typeof stateData === "object" ? stateData : null;
                _isStateRestored = true;
                _isFrozen = false;
                waitForFrozenOrTimeout(1000).then(() => {
                    if (_isRunning && unloadFn) {
                        try {
                            const result = unloadFn();
                            if (result instanceof Promise) {
                                return result;
                            }
                        }
                        catch (e) {
                            log("Error during unload:", e);
                        }
                    }
                    return Promise.resolve();
                }).then(() => {
                    log("ZPE running engine with state:", _state, "frozen:", _isFrozen);
                    try {
                        runFn(structuredClone(_state), _isFrozen);
                    }
                    catch (e) {
                        log("Error during run:", e);
                    }
                    _isRunning = true;
                });
            },
            getState() {
                log("ZPE getting state:", _state);
                return _state;
            },
            setStateFrozen(value) {
                _isFrozen = value;
                log("Setting state frozen:", _isFrozen);
            },
            getStateProgress(data) {
                log("Getting state progress with data:", data);
                return {};
            }
        };
    };
}
function log(...args) {
    console.log("[ZPEPort]", ...args);
}
// function waitForStateRestore(): Promise<void> {
//     return new Promise((resolve) => {
//         if (_isStateRestored) {
//             resolve();
//         } else {
//             const checkInterval = setInterval(() => {
//                 if (_isStateRestored) {
//                     clearInterval(checkInterval);
//                     resolve();
//                 }
//             }, 100);
//         }
//     });
// }
// function wait(ms: number): Promise<void> {
//     return new Promise((resolve) => setTimeout(resolve, ms));
// }
function waitForFrozenOrTimeout(ms) {
    return new Promise((resolve) => {
        const timeout = setTimeout(() => {
            resolve();
        }, ms);
        const checkInterval = setInterval(() => {
            if (_isFrozen) {
                clearInterval(timeout);
                clearInterval(checkInterval);
                resolve();
            }
        }, 100);
    });
}
// Zwraca pełną ścieżkę do zasobu wewnątrz silnika na podstawie ścieżki względnej
// np. path("img/image.png") zwróci coś w stylu "https://example.com/engine/img/image.png"
function path(relativePath) {
    return _exerciseApi.enginePath(relativePath);
}
// Zwraca dane zmienne (te które moe zmieniać nauczyciel podczas tworzenia ćwiczenia)
// Jeeli nauczyciel nic nie zmienił, zwraca dane domyślne które znajdują się w engine.json
// w sekcji "editor/defaultData"
function getData() {
    return structuredClone(_data);
}
// Zwraca stan ćwiczenia (np. odpowiedzi ucznia) które zostały zapisane wcześniej
// za pomocą setState. Jeżeli nie ma zapisanego stanu, zwraca null
function getState() {
    return _exerciseApi.triggerStateRestore().then(() => {
        log("State restored.");
        return _state;
    });
}
;
// Ustawia stan ćwiczenia (np. odpowiedzi ucznia) które zostaną przywrócone w ćwiczeniu
// Jeżeli stan jest nieprawidłowy lub pusty, ćwiczenie powinno zainicjować się w stanie domyślnym
function setState(stateData) {
    if (_isFrozen) {
        log("State is frozen, returning null.");
        return Promise.resolve();
    }
    _state = stateData;
    return _exerciseApi.triggerStateSave();
}
export { create, path, getData, getState, setState };
//# sourceMappingURL=zpe.js.map