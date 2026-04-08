#!/bin/bash

# Konfiguracja
SERVER="178.162.241.141"
USER="root"
# Zmieniona ścieżka na kosmosv2 (DocumentRoot to /var/www/html)
TARGET_PATH="/var/www/html/kosmosv2/"

echo "--- ROZPOCZYNANIE WDROŻENIA (v2) ---"

# 1. Build the project
echo "1. Budowanie projektu (base=/kosmosv2/)..."
npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
    echo "Błąd podczas budowania projektu. Przerwano."
    exit 1
fi

# 2. Clean remote directory
echo "2. Przygotowanie katalogu zdalnego ($TARGET_PATH)..."
echo "UWAGA: Zostaniesz poproszony o hasło do SSH."

# Create directory if not exists
ssh $USER@$SERVER "mkdir -p $TARGET_PATH"

# Clean existing contents (optional, but good for fresh start)
ssh $USER@$SERVER "rm -rf ${TARGET_PATH}* ${TARGET_PATH}.*" 2>/dev/null

# 3. Deploy to remote server
echo "3. Wgrywanie plików na serwer..."
echo "   Serwer: $SERVER"
echo "   Ścieżka: $TARGET_PATH"

# Use rsync to sync the dist folder content to the target folder
rsync -avz --delete dist/ $USER@$SERVER:$TARGET_PATH

# 4. Fix permissions
echo "4. Naprawianie uprawnień..."
# Używamy www-data, ponieważ to standardowy użytkownik serwera WWW na Ubuntu
ssh $USER@$SERVER "chown -R www-data:www-data $TARGET_PATH && chmod -R 755 $TARGET_PATH"

if [ $? -eq 0 ]; then
    echo "--- WDROŻENIE ZAKOŃCZONE SUKCESEM ---"
    echo "Gra dostępna pod adresem: https://gry.tylda.pl/kosmosv2/"
else
    echo "!!! WYSTĄPIŁ BŁĄD PODCZAS WGRYWANIA PLIKÓW !!!"
    echo "Sprawdź połączenie SSH i uprawnienia."
fi
