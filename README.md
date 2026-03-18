# Przykładowy projekt

Pamiętaj że zawsze możesz zajrzeć do [wiki projektu](https://github.com/zpe-projekty/zpe-port/wiki) aby uzyskać więcej przydatnych informacji.

## NPM

Uruchomienie aplikacji w emulatorze. Stan aplikacji zostanie załadowany z pliku “data/savedata.json”.

```bash
npm run dev
```

Jeżeli chcesz uruchomić aplikację z innym stanem, umieść plik w katalogu `data/` i podaj jego nazwę jako argument z `savedata`.

```bash
npm run dev -- --env savedata=savedata-state-1.json
```

Jeżeli chcesz uruchomić aplikację z innymi plikiem "engine", umieść plik w katalogu `data/` i podaj jego nazwę jako argument z `engine`.

```bash
npm run dev -- --env engine=engine-data.json
```

Jeżeli chcesz uruchomić aplikację na swoim serwerze lokalnym, możesz to zrobić za pomocą polecenia:

```bash
npm run build
```

Przygotowanie aplikacji do dystrybucji - wgrania na serwer.

```bash
npm run deploy
```
