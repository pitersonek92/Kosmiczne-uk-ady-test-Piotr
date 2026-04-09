$ErrorActionPreference = "Stop"

Write-Host "=== Kosmiczne Uklady — Deploy na ZPE ===" -ForegroundColor Cyan

# 1. Budowanie projektu (webpack -> loader.js)
Write-Host "`n1. Budowanie projektu (Production)..." -ForegroundColor Yellow
npm run deploy

if ($LASTEXITCODE -ne 0) {
    Write-Host "BLAD: Budowanie nie powiodlo sie. Przerwano." -ForegroundColor Red
    exit 1
}

Write-Host "   Budowanie zakonczone sukcesem." -ForegroundColor Green

# 2. Commitowanie i pushowanie na GitHub
Write-Host "`n2. Wysylanie zmian na GitHub..." -ForegroundColor Yellow

git add .
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$status = git status --porcelain

if ($status -ne "") {
    git commit -m "deploy: $timestamp"
    Write-Host "   Commit utworzony." -ForegroundColor Green
} else {
    Write-Host "   Brak nowych zmian do commitowania." -ForegroundColor Gray
}

git push origin main

if ($LASTEXITCODE -ne 0) {
    Write-Host "BLAD: Push na GitHub nie powiodl sie." -ForegroundColor Red
    exit 1
}

Write-Host "   Push na GitHub zakonczone sukcesem." -ForegroundColor Green
Write-Host "   GitHub Actions uruchomi transmit.yml i wdrozy gre na ZPE." -ForegroundColor Gray

# 3. Informacja koncowa
Write-Host "`n=== GOTOWE ===" -ForegroundColor Cyan
Write-Host "GitHub Actions synchronizuje zmiany z ZPE." -ForegroundColor White
Write-Host "Sprawdz status wdrozenia: https://github.com/pitersonek92/Kosmiczne-uk-ady-test-Piotr/actions" -ForegroundColor White
Write-Host "`nPAMIETAJ: Musisz miec skonfigurowane sekrety w GitHub:" -ForegroundColor Yellow
Write-Host "  - ZPE_USER_NAME (login do ZPE Git)" -ForegroundColor Gray
Write-Host "  - ZPE_PASS     (haslo/token do ZPE Git)" -ForegroundColor Gray
Write-Host "  - ZPE_URL      (adres repo ZPE, np. git.zpe.gov.pl/.../projekt.git)" -ForegroundColor Gray
