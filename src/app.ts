import { getData, path, setState } from "@/zpe-port";
import * as styles from "./styles/style.css";

// ============================================================
// Interfaces
// ============================================================

interface Astronomer {
    id: string;
    imie: string;
    portret: string;
    portretBio?: string;
    biogram: string;
    modelTytul: string;
    modelTyp: string;
    przyciskModelu: string;
}

interface Scenario {
    config: { version: string; title: string };
    instrukcja: { tytul: string; tresc: string };
    astronomowie: Astronomer[];
    modele: Record<string, { centrum: string; obraz?: string; planety: Array<{ nazwa: string; orbit: number }> }>;
}

interface AppState {
    currentScreen: "welcome" | "game" | "model";
    activeAstronomerIndex: number;
    activeModelTyp: string;
    visitedAstronomers: string[];
    soundEnabled: boolean;
}

// ============================================================
// Module-level state
// ============================================================

let _container: HTMLElement;
let _wrapper: HTMLElement | null = null;
let _scenario: Scenario;
let _appState: AppState;
let _isFrozen = false;
let _destroyed = false;
let _soundEnabled = true;

// DOM references
let _screens: { welcome: HTMLElement | null; game: HTMLElement | null; model: HTMLElement | null } = {
    welcome: null,
    game: null,
    model: null
};
let _overlay: HTMLElement | null = null;
let _popupContent: HTMLElement | null = null;
let _astronomerCards: HTMLElement[] = [];
let _modelAstronomerCards: HTMLElement[] = [];
let _soundImg: HTMLImageElement | null = null;

// ============================================================
// ZPE-Port Lifecycle
// ============================================================

export function init(container: HTMLElement): Promise<void> {
    return new Promise((resolve) => {
        _container = container;
        _wrapper = document.createElement("div");
        _wrapper.className = styles.gameWrapper;
        _container.appendChild(_wrapper);

        fetch(path("scenario.json"))
            .then((r) => r.json())
            .then((scenario: Scenario) => {
                _scenario = scenario;
                resolve();
            })
            .catch(() => {
                resolve();
            });
    });
}

export function run(stateData: Record<string, any> | null, isFrozen: boolean): Promise<void> {
    _isFrozen = isFrozen;
    _appState = parseState(stateData);

    const data = getData() as { showInstrukcja?: boolean; soundEnabled?: boolean };
    _soundEnabled = _appState.soundEnabled ?? (data.soundEnabled !== false);

    buildUI();
    showScreen(_appState.currentScreen);

    return Promise.resolve();
}

export function unload(): Promise<void> {
    if (_wrapper) {
        while (_wrapper.firstChild) {
            _wrapper.removeChild(_wrapper.firstChild);
        }
    }
    _screens = { welcome: null, game: null, model: null };
    _overlay = null;
    _popupContent = null;
    _astronomerCards = [];
    _modelAstronomerCards = [];
    _soundImg = null;
    return Promise.resolve();
}

export function destroy(): Promise<void> {
    _destroyed = true;
    if (_wrapper && _wrapper.parentNode) {
        _wrapper.parentNode.removeChild(_wrapper);
    }
    _wrapper = null;
    return Promise.resolve();
}

// ============================================================
// State management
// ============================================================

function parseState(stateData: Record<string, any> | null): AppState {
    const defaults: AppState = {
        currentScreen: "welcome",
        activeAstronomerIndex: 1,
        activeModelTyp: "wspolczesny",
        visitedAstronomers: [],
        soundEnabled: true
    };
    if (!stateData || typeof stateData !== "object") return defaults;
    return {
        currentScreen: (stateData.currentScreen as AppState["currentScreen"]) || defaults.currentScreen,
        activeAstronomerIndex: typeof stateData.activeAstronomerIndex === "number" ? stateData.activeAstronomerIndex : defaults.activeAstronomerIndex,
        activeModelTyp: stateData.activeModelTyp || defaults.activeModelTyp,
        visitedAstronomers: Array.isArray(stateData.visitedAstronomers) ? stateData.visitedAstronomers : defaults.visitedAstronomers,
        soundEnabled: typeof stateData.soundEnabled === "boolean" ? stateData.soundEnabled : defaults.soundEnabled
    };
}

function saveState(): void {
    if (_isFrozen || _destroyed) return;
    setState({
        currentScreen: _appState.currentScreen,
        activeAstronomerIndex: _appState.activeAstronomerIndex,
        activeModelTyp: _appState.activeModelTyp,
        visitedAstronomers: _appState.visitedAstronomers,
        soundEnabled: _appState.soundEnabled
    });
}

// ============================================================
// UI Building
// ============================================================

function buildUI(): void {
    if (!_wrapper) return;

    // Top bar
    const topBar = el("div", styles.topBar);
    const topTitle = el("div", styles.topBarTitle);
    topTitle.textContent = _scenario?.config?.title || "Kosmiczne układy";
    topBar.appendChild(topTitle);

    const topIcons = el("div", styles.topBarIcons);

    // Sound button
    const soundBtn = el("button", styles.iconBtn);
    soundBtn.setAttribute("tabindex", "0");
    soundBtn.setAttribute("aria-label", "Dzwiek");
    _soundImg = el("img") as HTMLImageElement;
    _soundImg.src = path(_soundEnabled ? "images/ico_sound_on.svg" : "images/ico_sound_off.svg");
    _soundImg.alt = "Dzwiek";
    soundBtn.appendChild(_soundImg);
    soundBtn.addEventListener("click", () => {
        _soundEnabled = !_soundEnabled;
        _appState.soundEnabled = _soundEnabled;
        if (_soundImg) _soundImg.src = path(_soundEnabled ? "images/ico_sound_on.svg" : "images/ico_sound_off.svg");
        saveState();
    });

    // Help button
    const helpBtn = el("button", styles.iconBtn);
    helpBtn.setAttribute("tabindex", "0");
    helpBtn.setAttribute("aria-label", "Instrukcja");
    const helpImg = el("img") as HTMLImageElement;
    helpImg.src = path("images/ico_help_ico.svg");
    helpImg.alt = "Pomoc";
    helpBtn.appendChild(helpImg);
    helpBtn.addEventListener("click", () => showInstrukcjaPopup());

    // Settings button
    const settingsBtn = el("button", styles.iconBtn);
    settingsBtn.setAttribute("tabindex", "0");
    settingsBtn.setAttribute("aria-label", "Ustawienia");
    const settingsImg = el("img") as HTMLImageElement;
    settingsImg.src = path("images/ico_setting.svg");
    settingsImg.alt = "Ustawienia";
    settingsBtn.appendChild(settingsImg);
    settingsBtn.addEventListener("click", () => showSettingsPopup());

    topIcons.appendChild(soundBtn);
    topIcons.appendChild(helpBtn);
    topIcons.appendChild(settingsBtn);
    topBar.appendChild(topIcons);
    _wrapper.appendChild(topBar);

    // Screens container
    const screensContainer = el("div");
    screensContainer.style.cssText = "position:relative;width:100%;";

    // Build all screens
    _screens.welcome = buildWelcomeScreen();
    _screens.game = buildGameScreen();
    _screens.model = buildModelScreen();

    screensContainer.appendChild(_screens.welcome);
    screensContainer.appendChild(_screens.game);
    screensContainer.appendChild(_screens.model);

    // Overlay for popups
    _overlay = el("div", styles.overlay);
    _popupContent = el("div", styles.popup);
    _overlay.appendChild(_popupContent);
    _overlay.addEventListener("click", (e) => {
        if (e.target === _overlay) hidePopup();
    });
    screensContainer.appendChild(_overlay);

    _wrapper.appendChild(screensContainer);

    // Set background
    _wrapper.style.backgroundImage = "url(" + path("images/bg_all.png") + ")";
}

// ============================================================
// Welcome Screen
// ============================================================

function buildWelcomeScreen(): HTMLElement {
    const screen = el("div", styles.screen + " " + styles.welcomeScreen);

    // Decorations left (Earth + Rocket)
    const decoLeft = el("div", styles.welcomeDecoLeft);
    const earthImg = el("img") as HTMLImageElement;
    earthImg.src = path("images/rys_02.png");
    earthImg.alt = "";
    decoLeft.appendChild(earthImg);
    const rocketImg = el("img") as HTMLImageElement;
    rocketImg.src = path("images/rys_01.png");
    rocketImg.alt = "";
    decoLeft.appendChild(rocketImg);
    screen.appendChild(decoLeft);

    // Decoration right (satellite)
    const decoRight = el("div", styles.welcomeDecoRight);
    const satImg = el("img") as HTMLImageElement;
    satImg.src = path("images/rys_03.png");
    satImg.alt = "";
    decoRight.appendChild(satImg);
    screen.appendChild(decoRight);

    // Astronaut bottom left
    const astronaut = el("div", styles.welcomeAstronaut);
    const astronautImg = el("img") as HTMLImageElement;
    astronautImg.src = path("images/rys_05.png");
    astronautImg.alt = "";
    astronaut.appendChild(astronautImg);
    screen.appendChild(astronaut);

    // Main popup
    const popup = el("div", styles.welcomePopup);

    const title = el("div", styles.welcomeTitle);
    title.textContent = "Witaj w grze";
    popup.appendChild(title);

    const text = el("div", styles.welcomeText);
    text.textContent = "Od wiekow ludzkosc wpatruje sie w gwiazdy, probujac zrozumiec ich porzadek... W tej grze staniesz sie badaczem idei, ktore ksztaltowaly nasz obraz Wszechswiata. Kazda teoria, kazdy model to krok w strone prawdy.";
    popup.appendChild(text);

    const task = el("div", styles.welcomeTask);
    const taskIcon = el("img", styles.welcomeTaskIcon) as HTMLImageElement;
    taskIcon.src = path("images/icon_clipboard.svg.png");
    taskIcon.alt = "";
    task.appendChild(taskIcon);

    const taskText = el("div", styles.welcomeTaskText);
    const taskLabel = el("span", styles.welcomeTaskLabel);
    taskLabel.textContent = "Twoje zadanie: ";
    taskText.appendChild(taskLabel);
    taskText.appendChild(document.createTextNode("poznaj trzy wizje kosmosu: od ukladu geocentrycznego po heliocentryczny. Zobacz jak zmieniala sie ta wizja w zaleznosci od epoki."));
    task.appendChild(taskText);
    popup.appendChild(task);

    const buttons = el("div", styles.welcomeButtons);

    const btnInstr = el("button", styles.btn);
    btnInstr.textContent = "Instrukcja";
    btnInstr.setAttribute("tabindex", "0");
    btnInstr.addEventListener("click", () => showInstrukcjaPopup());

    const btnStart = el("button", styles.btn);
    btnStart.textContent = "Rozpocznij gre";
    btnStart.setAttribute("tabindex", "0");
    btnStart.addEventListener("click", () => {
        _appState.currentScreen = "game";
        showScreen("game");
        saveState();
    });

    buttons.appendChild(btnInstr);
    buttons.appendChild(btnStart);
    popup.appendChild(buttons);
    screen.appendChild(popup);

    return screen;
}

// ============================================================
// Game Screen (main solar system view)
// ============================================================

function buildGameScreen(): HTMLElement {
    const screen = el("div", styles.screen + " " + styles.gameScreen);

    // Left panel: astronomer portraits
    const panel = el("div", styles.astronomersPanel);
    _astronomerCards = [];

    if (_scenario && _scenario.astronomowie) {
        _scenario.astronomowie.forEach((astronomer, idx) => {
            const card = buildAstronomerCard(astronomer, idx, false);
            _astronomerCards.push(card);
            panel.appendChild(card);
        });
    }
    screen.appendChild(panel);

    // Right panel: solar system
    const solarPanel = el("div", styles.solarSystemPanel);

    const title = el("div", styles.solarSystemTitle);
    title.textContent = "Wspolczesny model ukladu slonecznego";
    solarPanel.appendChild(title);

    const container = el("div", styles.solarSystemContainer);
    const img = el("img", styles.solarSystemImage) as HTMLImageElement;
    img.src = path("images/planet_01.png");
    img.alt = "Wspolczesny model ukladu slonecznego";
    container.appendChild(img);

    // Astronaut decoration
    const deco = el("div", styles.astronomerDecoration);
    const decoImg = el("img") as HTMLImageElement;
    decoImg.src = path("images/rys_05.png");
    decoImg.alt = "";
    deco.appendChild(decoImg);
    container.appendChild(deco);

    setupZoomPan(container, img);
    solarPanel.appendChild(container);
    screen.appendChild(solarPanel);

    return screen;
}

function buildAstronomerCard(astronomer: Astronomer, idx: number, isModelPanel: boolean): HTMLElement {
    const card = el("div", styles.astronomerCard);
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", "Biografia: " + astronomer.imie);

    const img = el("img") as HTMLImageElement;
    img.src = path(astronomer.portret);
    img.alt = astronomer.imie;
    card.appendChild(img);

    // Tooltip
    const tooltip = el("div", styles.astronomerTooltip);
    const tooltipLabel = el("span", styles.astronomerTooltipLabel);
    tooltipLabel.textContent = "Biografia: ";
    const tooltipName = el("span", styles.astronomerTooltipName);
    tooltipName.textContent = astronomer.imie;
    tooltip.appendChild(tooltipLabel);
    tooltip.appendChild(tooltipName);
    card.appendChild(tooltip);

    const handleClick = () => {
        _appState.activeAstronomerIndex = idx;
        if (!_appState.visitedAstronomers.includes(astronomer.id)) {
            _appState.visitedAstronomers.push(astronomer.id);
        }
        updateAstronomerActiveState(idx, isModelPanel);
        showBioPopup(astronomer);
        saveState();
    };

    card.addEventListener("click", handleClick);
    card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
        }
    });

    return card;
}

function updateAstronomerActiveState(activeIdx: number, isModelPanel: boolean): void {
    const cards = isModelPanel ? _modelAstronomerCards : _astronomerCards;
    cards.forEach((card, i) => {
        if (i === activeIdx) {
            card.classList.add(styles.astronomerCardActive);
        } else {
            card.classList.remove(styles.astronomerCardActive);
        }
    });
}

// ============================================================
// Model Screen
// ============================================================

function buildModelScreen(): HTMLElement {
    const screen = el("div", styles.screen + " " + styles.modelScreen);

    const title = el("div", styles.modelTitle);
    title.textContent = "Model ukladu slonecznego";
    screen.appendChild(title);

    const content = el("div", styles.modelContent);

    // Left panel: astronomer portraits
    const panel = el("div", styles.modelAstronomersPanel);
    _modelAstronomerCards = [];

    if (_scenario && _scenario.astronomowie) {
        _scenario.astronomowie.forEach((astronomer, idx) => {
            const card = buildAstronomerCard(astronomer, idx, true);
            _modelAstronomerCards.push(card);
            panel.appendChild(card);
        });
    }
    content.appendChild(panel);

    // Image area
    const imageArea = el("div", styles.modelImageArea);
    const img = el("img", styles.modelImage) as HTMLImageElement;
    img.src = path("images/planet_01.png");
    img.alt = "Model ukladu slonecznego";
    imageArea.appendChild(img);
    setupZoomPan(imageArea, img);
    content.appendChild(imageArea);

    screen.appendChild(content);

    // Back button
    const btnArea = el("div", styles.modelButtons);
    const btnBack = el("button", styles.btn);
    btnBack.textContent = "Powrot";
    btnBack.setAttribute("tabindex", "0");
    btnBack.addEventListener("click", () => {
        _appState.currentScreen = "game";
        showScreen("game");
        saveState();
    });
    btnArea.appendChild(btnBack);
    screen.appendChild(btnArea);

    return screen;
}

function showModelScreen(astronomer: Astronomer): void {
    if (!_screens.model) return;

    const title = _screens.model.querySelector("." + styles.modelTitle) as HTMLElement;
    if (title) title.textContent = astronomer.modelTytul;

    const modelData = _scenario && _scenario.modele ? _scenario.modele[astronomer.modelTyp] : null;
    const imageArea = _screens.model.querySelector("." + styles.modelImageArea) as HTMLElement;

    if (imageArea) {
        const existingImg = imageArea.querySelector("." + styles.modelImage) as HTMLImageElement;
        const existingSvg = imageArea.querySelector("." + styles.geocentricSvg);

        if (astronomer.modelTyp === "geocentryczny") {
            if (existingImg) existingImg.style.display = "none";
            if (existingSvg) existingSvg.remove();
            const svg = buildGeocentricSVG(modelData);
            imageArea.appendChild(svg);
        } else {
            if (existingSvg) existingSvg.remove();
            if (existingImg) {
                existingImg.style.display = "block";
                existingImg.src = path(modelData && modelData.obraz ? modelData.obraz : "images/planet_01.png");
                existingImg.alt = astronomer.modelTytul;
            }
        }
    }

    const activeIdx = _scenario.astronomowie.findIndex((a) => a.id === astronomer.id);
    updateAstronomerActiveState(activeIdx, true);

    _appState.currentScreen = "model";
    _appState.activeModelTyp = astronomer.modelTyp;
    _appState.activeAstronomerIndex = activeIdx;
    showScreen("model");
    saveState();
}

function buildGeocentricSVG(modelData: any): SVGElement {
    const ns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(ns, "svg") as SVGElement;
    svg.setAttribute("viewBox", "0 0 500 500");
    svg.setAttribute("class", styles.geocentricSvg);
    svg.setAttribute("aria-label", "Geocentryczny model ukladu slonecznego");

    const cx = 250, cy = 250;
    const planets = modelData && modelData.planety ? modelData.planety : [];
    const maxOrbit = planets.length;

    const bg = document.createElementNS(ns, "circle");
    bg.setAttribute("cx", String(cx));
    bg.setAttribute("cy", String(cy));
    bg.setAttribute("r", "240");
    bg.setAttribute("fill", "rgba(10,20,50,0.8)");
    bg.setAttribute("stroke", "rgba(100,150,255,0.3)");
    bg.setAttribute("stroke-width", "1");
    svg.appendChild(bg);

    planets.forEach((planet: { nazwa: string; orbit: number }) => {
        const r = (planet.orbit / maxOrbit) * 220 + 10;
        const angle = (planet.orbit * 47) % 360;
        const rad = (angle * Math.PI) / 180;
        const px = cx + r * Math.cos(rad);
        const py = cy + r * Math.sin(rad);

        const orbit = document.createElementNS(ns, "circle");
        orbit.setAttribute("cx", String(cx));
        orbit.setAttribute("cy", String(cy));
        orbit.setAttribute("r", String(r));
        orbit.setAttribute("fill", "none");
        orbit.setAttribute("stroke", "rgba(200,200,255,0.25)");
        orbit.setAttribute("stroke-width", "1");
        svg.appendChild(orbit);

        const dot = document.createElementNS(ns, "circle");
        dot.setAttribute("cx", String(px));
        dot.setAttribute("cy", String(py));
        const isLarge = planet.nazwa === "Ziemia" || planet.nazwa === "Slonce";
        dot.setAttribute("r", isLarge ? "14" : "9");
        dot.setAttribute("fill", getPlanetColor(planet.nazwa));
        svg.appendChild(dot);

        const line = document.createElementNS(ns, "line");
        const lx = px + (px > cx ? 18 : -18);
        const ly = py + (py > cy ? 18 : -18);
        line.setAttribute("x1", String(px));
        line.setAttribute("y1", String(py));
        line.setAttribute("x2", String(lx));
        line.setAttribute("y2", String(ly));
        line.setAttribute("stroke", "#f5c518");
        line.setAttribute("stroke-width", "1");
        svg.appendChild(line);

        const text = document.createElementNS(ns, "text");
        text.setAttribute("x", String(lx + (px > cx ? 4 : -4)));
        text.setAttribute("y", String(ly + (py > cy ? 14 : -4)));
        text.setAttribute("fill", "#ffffff");
        text.setAttribute("font-size", "11");
        text.setAttribute("font-family", "Arial, sans-serif");
        text.setAttribute("text-anchor", px > cx ? "start" : "end");
        text.textContent = planet.nazwa;
        svg.appendChild(text);
    });

    const center = document.createElementNS(ns, "circle");
    center.setAttribute("cx", String(cx));
    center.setAttribute("cy", String(cy));
    center.setAttribute("r", "22");
    center.setAttribute("fill", "#1a6aaa");
    svg.appendChild(center);

    const centerLabel = document.createElementNS(ns, "text");
    centerLabel.setAttribute("x", String(cx));
    centerLabel.setAttribute("y", String(cy + 5));
    centerLabel.setAttribute("fill", "#ffffff");
    centerLabel.setAttribute("font-size", "11");
    centerLabel.setAttribute("font-weight", "bold");
    centerLabel.setAttribute("font-family", "Arial, sans-serif");
    centerLabel.setAttribute("text-anchor", "middle");
    centerLabel.textContent = "Ziemia";
    svg.appendChild(centerLabel);

    return svg;
}

function getPlanetColor(name: string): string {
    const colors: Record<string, string> = {
        "Ksiezyc": "#cccccc",
        "Merkury": "#aaaaaa",
        "Wenus": "#e8c080",
        "Slonce": "#f5c518",
        "Mars": "#cc4422",
        "Jowisz": "#c8a060",
        "Saturn": "#d4b060",
        "Uran": "#80c8e0",
        "Neptun": "#4060cc",
        "Ziemia": "#2288cc"
    };
    return colors[name] || "#888888";
}

// ============================================================
// Popups
// ============================================================

function showBioPopup(astronomer: Astronomer): void {
    if (!_popupContent || !_overlay) return;

    _popupContent.innerHTML = "";

    const bioDiv = el("div", styles.bioPopup);

    const portCol = el("div", styles.bioPortraitCol);
    const portImg = el("img", styles.bioPortraitMain) as HTMLImageElement;
    portImg.src = path(astronomer.portretBio || astronomer.portret);
    portImg.alt = astronomer.imie;
    portCol.appendChild(portImg);
    bioDiv.appendChild(portCol);

    const content = el("div", styles.bioContent);

    const title = el("div", styles.bioTitle);
    title.textContent = astronomer.imie;
    content.appendChild(title);

    const sep = el("div", styles.bioSeparator);
    content.appendChild(sep);

    const text = el("div", styles.bioText);
    text.textContent = astronomer.biogram;
    content.appendChild(text);

    bioDiv.appendChild(content);
    _popupContent.appendChild(bioDiv);

    const buttons = el("div", styles.popupButtons);

    const btnModel = el("button", styles.btn);
    btnModel.textContent = astronomer.przyciskModelu;
    btnModel.setAttribute("tabindex", "0");
    btnModel.addEventListener("click", () => {
        hidePopup();
        showModelScreen(astronomer);
    });

    const btnBack = el("button", styles.btn);
    btnBack.textContent = "Powrot";
    btnBack.setAttribute("tabindex", "0");
    btnBack.addEventListener("click", () => hidePopup());

    buttons.appendChild(btnModel);
    buttons.appendChild(btnBack);
    _popupContent.appendChild(buttons);

    showPopup();
}

function showInstrukcjaPopup(): void {
    if (!_popupContent || !_overlay) return;
    _popupContent.innerHTML = "";

    const title = el("div", styles.instrTitle);
    title.textContent = (_scenario && _scenario.instrukcja) ? _scenario.instrukcja.tytul : "Instrukcja";
    _popupContent.appendChild(title);

    const sep = el("div", styles.bioSeparator);
    _popupContent.appendChild(sep);

    const text = el("div", styles.instrText);
    text.textContent = (_scenario && _scenario.instrukcja) ? _scenario.instrukcja.tresc : "";
    _popupContent.appendChild(text);

    const buttons = el("div", styles.popupButtons);
    const btnClose = el("button", styles.btn);
    btnClose.textContent = "Zamknij";
    btnClose.setAttribute("tabindex", "0");
    btnClose.addEventListener("click", () => hidePopup());
    buttons.appendChild(btnClose);
    _popupContent.appendChild(buttons);

    showPopup();
}

function showSettingsPopup(): void {
    if (!_popupContent || !_overlay) return;
    _popupContent.innerHTML = "";

    const title = el("div", styles.settingsTitle);
    title.textContent = "Ustawienia";
    _popupContent.appendChild(title);

    const sep = el("div", styles.bioSeparator);
    _popupContent.appendChild(sep);

    const row = el("div", styles.settingsRow);
    const label = el("div", styles.settingsLabel);
    label.textContent = "Dzwiek";
    row.appendChild(label);

    const toggleBtn = el("button", styles.btn);
    toggleBtn.textContent = _soundEnabled ? "Wlaczony" : "Wylaczony";
    toggleBtn.setAttribute("tabindex", "0");
    toggleBtn.addEventListener("click", () => {
        _soundEnabled = !_soundEnabled;
        _appState.soundEnabled = _soundEnabled;
        toggleBtn.textContent = _soundEnabled ? "Wlaczony" : "Wylaczony";
        if (_soundImg) _soundImg.src = path(_soundEnabled ? "images/ico_sound_on.svg" : "images/ico_sound_off.svg");
        saveState();
    });
    row.appendChild(toggleBtn);
    _popupContent.appendChild(row);

    const buttons = el("div", styles.popupButtons);
    const btnClose = el("button", styles.btn);
    btnClose.textContent = "Zamknij";
    btnClose.setAttribute("tabindex", "0");
    btnClose.addEventListener("click", () => hidePopup());
    buttons.appendChild(btnClose);
    _popupContent.appendChild(buttons);

    showPopup();
}

function showPopup(): void {
    if (_overlay) {
        _overlay.classList.add(styles.overlayVisible);
        const firstBtn = _popupContent && _popupContent.querySelector("button") as HTMLElement;
        if (firstBtn) firstBtn.focus();
    }
}

function hidePopup(): void {
    if (_overlay) {
        _overlay.classList.remove(styles.overlayVisible);
    }
}

// ============================================================
// Screen navigation
// ============================================================

function showScreen(name: "welcome" | "game" | "model"): void {
    (Object.keys(_screens) as Array<keyof typeof _screens>).forEach((key) => {
        const screen = _screens[key];
        if (!screen) return;
        if (key === name) {
            screen.classList.add(styles.screenActive);
        } else {
            screen.classList.remove(styles.screenActive);
        }
    });

    if (name === "game") {
        updateAstronomerActiveState(_appState.activeAstronomerIndex, false);
    } else if (name === "model") {
        updateAstronomerActiveState(_appState.activeAstronomerIndex, true);
    }
}

// ============================================================
// Zoom / Pan
// ============================================================

function setupZoomPan(container: HTMLElement, target: HTMLElement): void {
    let scale = 1;
    let panX = 0;
    let panY = 0;
    let isPanning = false;
    let lastX = 0;
    let lastY = 0;
    let lastPinchDist = 0;

    const MIN_SCALE = 0.5;
    const MAX_SCALE = 4;

    function applyTransform(): void {
        target.style.transform = "translate(" + panX + "px, " + panY + "px) scale(" + scale + ")";
    }

    container.addEventListener("wheel", (e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale * delta));
        applyTransform();
    }, { passive: false });

    container.addEventListener("mousedown", (e) => {
        isPanning = true;
        lastX = e.clientX;
        lastY = e.clientY;
    });

    container.addEventListener("mousemove", (e) => {
        if (!isPanning) return;
        panX += e.clientX - lastX;
        panY += e.clientY - lastY;
        lastX = e.clientX;
        lastY = e.clientY;
        applyTransform();
    });

    container.addEventListener("mouseup", () => { isPanning = false; });
    container.addEventListener("mouseleave", () => { isPanning = false; });

    container.addEventListener("touchstart", (e) => {
        if (e.touches.length === 1) {
            isPanning = true;
            lastX = e.touches[0].clientX;
            lastY = e.touches[0].clientY;
        } else if (e.touches.length === 2) {
            isPanning = false;
            lastPinchDist = getPinchDist(e.touches);
        }
    }, { passive: true });

    container.addEventListener("touchmove", (e) => {
        e.preventDefault();
        if (e.touches.length === 1 && isPanning) {
            panX += e.touches[0].clientX - lastX;
            panY += e.touches[0].clientY - lastY;
            lastX = e.touches[0].clientX;
            lastY = e.touches[0].clientY;
            applyTransform();
        } else if (e.touches.length === 2) {
            const dist = getPinchDist(e.touches);
            if (lastPinchDist > 0) {
                const ratio = dist / lastPinchDist;
                scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale * ratio));
                applyTransform();
            }
            lastPinchDist = dist;
        }
    }, { passive: false });

    container.addEventListener("touchend", () => {
        isPanning = false;
        lastPinchDist = 0;
    });
}

function getPinchDist(touches: TouchList): number {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
}

// ============================================================
// Helpers
// ============================================================

function el(tag: string, className?: string): HTMLElement {
    const element = document.createElement(tag);
    if (className) element.className = className;
    return element;
}
