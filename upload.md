# Instrukcja wdrażania gier na serwer gry.tylda.pl

Niniejsza instrukcja opisuje proces publikacji gier (aplikacji webowych) na serwerze `gry.tylda.pl`.

## 1. Konfiguracja Projektu (Vite/React)

Przed zbudowaniem aplikacji należy upewnić się, że ścieżka bazowa (`base`) jest poprawnie ustawiona w pliku konfiguracyjnym.

### `vite.config.ts`
Ustaw parametr `base` na nazwę katalogu, w którym gra będzie dostępna (np. `/nazwa-gry/`).

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Ważne: Ścieżka musi odpowiadać katalogowi na serwerze
  base: '/nazwa-gry/', 
})
```

## 2. Dane Serwera

*   **Adres serwera:** `gry.tylda.pl` (IP: `178.162.241.141`)
*   **Użytkownik SSH:** `root` (wymagany klucz SSH z hasłem)
*   **Katalog główny WWW (DocumentRoot):** `/var/www/html/`
*   **Użytkownik serwera WWW:** `www-data`

## 3. Proces Wdrażania

Proces składa się z trzech głównych kroków:
1.  **Budowanie aplikacji** (lokalnie).
2.  **Wgranie plików** na serwer do odpowiedniego katalogu.
3.  **Naprawa uprawnień** (aby serwer WWW mógł odczytać pliki).

### Skrypt automatyzujący (Zalecane)

Możesz użyć poniższego skryptu bash jako szablonu. Zapisz go np. jako `deploy.sh` i nadaj prawa wykonywania (`chmod +x deploy.sh`).

```bash
#!/bin/bash

# --- KONFIGURACJA ---
GAME_NAME="nazwa-gry"  # Nazwa katalogu w URL (np. kosmosv2)
SERVER="178.162.241.141"
USER="root"
TARGET_PATH="/var/www/html/$GAME_NAME/"

echo "--- ROZPOCZYNANIE WDROŻENIA: $GAME_NAME ---"

# 1. Budowanie projektu
echo "1. Budowanie projektu..."
npm run build

if [ $? -ne 0 ]; then
    echo "Błąd kompilacji. Przerwano."
    exit 1
fi

# 2. Przygotowanie katalogu zdalnego
echo "2. Czyszczenie katalogu zdalnego..."
# Tworzy katalog jeśli nie istnieje
ssh $USER@$SERVER "mkdir -p $TARGET_PATH"
# Usuwa starą zawartość (opcjonalne, ale zalecane dla czystości)
ssh $USER@$SERVER "rm -rf ${TARGET_PATH}* ${TARGET_PATH}.*" 2>/dev/null

# 3. Wgrywanie plików
echo "3. Wgrywanie plików..."
# Kopiuje zawartość folderu dist/ do folderu docelowego
rsync -avz --delete dist/ $USER@$SERVER:$TARGET_PATH

# 4. Uprawnienia
echo "4. Ustawianie uprawnień..."
# Zmienia właściciela na www-data i ustawia prawa odczytu
ssh $USER@$SERVER "chown -R www-data:www-data $TARGET_PATH && chmod -R 755 $TARGET_PATH"

echo "--- ZAKOŃCZONO ---"
echo "Gra dostępna pod adresem: https://gry.tylda.pl/$GAME_NAME/"
```

## 4. Rozwiązywanie problemów

*   **Błąd 404 Not Found:**
    *   Sprawdź, czy pliki są w dobrym katalogu: `/var/www/html/NAZWA_GRY/`.
    *   Sprawdź, czy `base` w `vite.config.ts` pasuje do nazwy katalogu.
*   **Błąd 403 Forbidden:**
    *   Problem z uprawnieniami. Uruchom komendę `chown -R www-data:www-data ...` oraz `chmod -R 755 ...` na katalogu gry.
*   **Biała strona po załadowaniu:**
    *   Otwórz konsolę deweloperską (F12). Jeśli widzisz błędy 404 dla plików `.js` lub `.css`, prawdopodobnie `base` w `vite.config.ts` jest źle ustawione.

## 5. Ręczne komendy (Cheat Sheet)

```bash
# Logowanie na serwer
ssh root@178.162.241.141

# Sprawdzenie katalogu gier
ls -la /var/www/html/

# Ręczna zmiana uprawnień (jeśli coś nie działa)
chown -R www-data:www-data /var/www/html/nazwa-gry
chmod -R 755 /var/www/html/nazwa-gry
```
