#!/bin/bash

# Konfiguracja
SERVER="178.162.241.141"
USER="root"
TARGET_PATH="/home/gry/web/gry.tylda.pl/public_html/kosmos/"

echo "--- ROZPOCZYNANIE WDROŻENIA ---"

# 1. Build the project
echo "1. Budowanie projektu..."
npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
    echo "Błąd podczas budowania projektu. Przerwano."
    exit 1
fi

# 2. Clean remote directory
echo "2. Czyszczenie katalogu zdalnego ($TARGET_PATH)..."
echo "UWAGA: Zostaniesz poproszony o hasło do SSH (jeśli nie masz klucza publicznego)."
# Remove contents but keep the directory itself if possible, or recreate it.
# We use 'rm -rf' on the contents. 
ssh $USER@$SERVER "rm -rf ${TARGET_PATH}* ${TARGET_PATH}.*" 2>/dev/null

# Ensure the directory exists (in case it was fully removed or didn't exist)
ssh $USER@$SERVER "mkdir -p $TARGET_PATH"

# 3. Deploy to remote server
echo "3. Wgrywanie plików na serwer..."
echo "   Serwer: $SERVER"
echo "   Ścieżka: $TARGET_PATH"

# Use rsync to sync the dist folder content to the target folder
# -a: archive mode
# -v: verbose
# -z: compress
# --delete: delete extraneous files from dest dirs (redundant if we cleaned, but good practice)
rsync -avz --delete dist/ $USER@$SERVER:$TARGET_PATH

if [ $? -eq 0 ]; then
    echo "--- WDROŻENIE ZAKOŃCZONE SUKCESEM ---"
    echo "Gra dostępna pod adresem: https://gry.tylda.pl/kosmos/"
    echo "Może być konieczne wyczyszczenie pamięci podręcznej przeglądarki (Ctrl+F5)."
else
    echo "!!! WYSTĄPIŁ BŁĄD PODCZAS WGRYWANIA PLIKÓW !!!"
    echo "Sprawdź połączenie SSH i uprawnienia."
fi
