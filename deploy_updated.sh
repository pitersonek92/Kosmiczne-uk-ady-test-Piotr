#!/bin/bash

# Build the project
echo "Budowanie projektu..."
npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
    echo "Błąd podczas budowania projektu. Przerwano."
    exit 1
fi

# Deploy to remote server
echo "Wgrywanie plików na serwer..."
echo "Użytkownik: root"
echo "Serwer: 178.162.241.141"
# Using the path from the previous configuration. 
# PLEASE VERIFY THIS PATH IS CORRECT ON THE NEW SERVER.
TARGET_PATH="/home/gry/web/gry.tylda.pl/public_html/kosmos/"
echo "Docelowa ścieżka: $TARGET_PATH"

# Use rsync to sync the dist folder content to the target folder
echo "Wgrywanie gry do podkatalogu..."
rsync -avz dist/ root@178.162.241.141:$TARGET_PATH

if [ $? -eq 0 ]; then
    echo "Wdrożenie zakończone sukcesem!"
    echo "Gra dostępna pod adresem: https://gry.tylda.pl/kosmos/"
else
    echo "Wystąpił błąd podczas wgrywania plików. Sprawdź czy ścieżka docelowa istnieje i czy masz dostęp SSH."
fi
