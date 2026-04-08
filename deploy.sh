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
echo "Użytkownik: gry"
echo "Serwer: ssd04.sferahost.net.pl"
echo "Ścieżka główna: /home/gry/web/gry.tylda.pl/public_html"
echo "Podkatalog gry: kosmos"

# Upload .htaccess and .htpasswd to the root public_html to protect the domain
echo "Wgrywanie zabezpieczeń hasłem do katalogu głównego..."
rsync -avz .htaccess .htpasswd gry@ssd04.sferahost.net.pl:/home/gry/web/gry.tylda.pl/public_html/

# Use rsync to sync the dist folder content to the public_html/kosmos folder
# -a: archive mode (preserves permissions, etc.)
# -v: verbose
# -z: compress during transfer
echo "Wgrywanie gry do podkatalogu /kosmos..."
rsync -avz dist/ gry@ssd04.sferahost.net.pl:/home/gry/web/gry.tylda.pl/public_html/kosmos/

if [ $? -eq 0 ]; then
    echo "Wdrożenie zakończone sukcesem!"
    echo "Gra dostępna pod adresem: http://gry.tylda.pl/kosmos/"
    echo "Strona główna zabezpieczona hasłem."
else
    echo "Wystąpił błąd podczas wgrywania plików."
fi
