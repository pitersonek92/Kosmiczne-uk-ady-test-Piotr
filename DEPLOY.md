# Procedura wdrożenia gry na ZPE

## Jak to działa

```
Twój kod (src/) → npm run deploy → entry.js → git push → GitHub repo → ZPE czyta pliki
```

ZPE czyta pliki bezpośrednio z GitHub repo. Nie trzeba żadnych loginów do ZPE ani specjalnych sekretów.

---

## Metoda A — Automatyczna (GitHub Actions) ✅ ZALECANA

Wystarczy **jeden push do `main`** — reszta dzieje się sama:

```bash
git add .
git commit -m "opis zmian"
git push origin main
```

GitHub Actions automatycznie:
1. Instaluje zależności (`npm install`)
2. Buduje grę (`npm run deploy`) → generuje `entry.js` + kopiuje `images/`
3. Commituje `entry.js` i pushuje z powrotem do repo
4. ZPE widzi nową wersję

**Podgląd gry:** `https://edytor.zpe.gov.pl/!/prev/D39FF5MFK/pl/main`

---

## Metoda B — Ręczna (lokalnie)

Gdy chcesz sprawdzić build przed pushem lub CI jest niedostępne.

### Wymagania
- Node.js 18+ (`node -v`)
- Git

### Kroki

**1. Zainstaluj zależności (tylko raz po klonowaniu)**
```bash
npm install
```

**2. Zbuduj grę**
```bash
npm run deploy
```
Generuje `entry.js` w głównym katalogu i kopiuje `images/` z folderu `static/`.

**3. Sprawdź czy build jest OK**
- Plik `entry.js` powinien mieć rozmiar ~100–150 KB
- Folder `images/` powinien zawierać wszystkie grafiki

**4. Wypchnij na GitHub**
```bash
git add entry.js images/ engine.json scenario.json
git commit -m "build: nowa wersja"
git push origin main
```

**5. Odśwież podgląd ZPE**

Otwórz w przeglądarce (dodaj `?v=1` żeby wymusić reload cache):
```
https://edytor.zpe.gov.pl/!/prev/D39FF5MFK/pl/main?v=1
```

---

## Struktura plików które trafiają na ZPE

```
entry.js          ← zbudowany bundle gry (AMD)
engine.json       ← konfiguracja ZPE (entry point, stateful, itp.)
scenario.json     ← dane scenariusza
images/           ← wszystkie grafiki gry
  bg_all.png
  pp_01.png
  rys_01.png
  ... (ok. 50 plików)
```

> ⚠️ Nigdy nie zmieniaj `engine.json` — definiuje jak ZPE ładuje grę.

---

## Jak dodać nowy obrazek

1. Wrzuć plik `.png` / `.svg` do folderu `static/images/`
2. W kodzie użyj `zpePath('images/nazwa.png')` (funkcja z `@/zpe-port`)
3. Zbuduj i wypchnij (Metoda A lub B)

---

## Troubleshooting

| Objaw | Przyczyna | Rozwiązanie |
|-------|-----------|-------------|
| Stara wersja na ZPE | Cache przeglądarki | Dodaj `?v=X` do URL podglądu |
| Biały ekran | Błąd w `entry.js` | Sprawdź konsolę przeglądarki (F12) |
| Brak obrazków | Plik nie w `static/images/` lub zły `zpePath()` | Sprawdź czy plik jest w `images/` w repo |
| Build się nie kompiluje | Błąd TypeScript | Uruchom `npm run deploy` lokalnie i przeczytaj błąd |
| CI (Actions) nie uruchamia się | Push do złej gałęzi | Upewnij się że pushyujesz do `main` |

---

## Technologia

- **Format:** AMD module (`libraryTarget: "amd"`)
- **Target:** ES5 (kompatybilność ze starszymi przeglądarkami szkolnymi)
- **Build tool:** Webpack 5 + ts-loader
- **ZPE API:** `ZPE.create(init, run, unload, destroy)` + `path()` do ścieżek zasobów
- **CI/CD:** GitHub Actions (`.github/workflows/transmit.yml`)
