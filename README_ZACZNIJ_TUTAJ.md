# MINEVORA NETWORK — strona WWW 4.0

## Co zmieniłem

To aktualizacja wcześniejszej strony MINEVORA 3.3. Zachowane są podstrony `ranking.html`, `together.html` i `poradnik.html` oraz używane przez nie skrypty i style. Nowy ekran główny oraz nowe zakładki `tryby.html` i `mapy.html` wykorzystują własne pliki `network.css` i `network.js`.

- Nowa fioletowa strona startowa w stylistyce MINEVORA Launcher.
- Karty 9 trybów: BedWars, SkyWars, TNT Run, Parkour, Build Battle, Spleef, Duels, Crystal PvP 1v1, Crystal PvP FFA.
- Galeria map przełączająca render koncepcyjny / rzeczywisty rzut schematu .schem.
- Lokalny podgląd każdej areny i obrazu lobby.
- Pobieranie paczki launchera 12.2 i dziesięciu schematów WorldEdit.
- Zachowanie poprzednich podstron rankingu, Together, poradnika i Discorda.
- Responsywny wygląd na telefonie i komputerze, mobilne menu i filtr minigier.

## Uruchomienie lokalne

Otwórz `index.html` w przeglądarce. Elementy strony głównej, filtrowanie i galerie nie wymagają backendu. Starsza podstrona rankingu, która korzysta z danych JSON, może wymagać lokalnego serwera HTTP.

Dla pełnego testu możesz użyć Pythona w folderze projektu:

```
python -m http.server 8000
```

Następnie wejdź na `http://localhost:8000`.

## Publikacja na GitHub Pages

1. Wypakuj archiwum ZIP.
2. Otwórz repozytorium witryny na GitHub.
3. Wgraj **zawartość** folderu `MINEVORA_STRONA_4_0_NETWORK` (tak, aby `index.html` leżał w katalogu głównym repozytorium).
4. W repozytorium otwórz **Settings → Pages**.
5. W sekcji **Build and deployment** wybierz **Deploy from a branch** oraz gałąź publikacyjną, np. `main`, folder `/(root)`.
6. Zapisz. Poczekaj na publikację i odśwież otrzymany adres.

Nie trzeba przesyłać samego ZIP-a — GitHub Pages potrzebuje rozpakowanych plików.

## Domena i status serwera

**Nie podano jeszcze działającego IP ani zatwierdzonej domeny Minecraft.** Z tego powodu strona mówi „Wkrótce ogłosimy IP”. Po uruchomieniu hostingu zaktualizuj tekst w sekcji `id="status"` w `index.html`, ewentualnie dodając przycisk kopiowania adresu. Nie wstawiaj fikcyjnych liczb graczy ani statusu „online”.

## Uwaga o mapach

Obrazy w `assets/modes/` są **wizualizacjami stylistycznymi** i nie stanowią fotorealistycznych zrzutów z serwera. Obrazy w `assets/plans/` są rzutami pochodzącymi z wygenerowanych schematów. Schematy i wskazówki konfiguracji znajdują się w `MINEVORA_MAPY_2_0.zip`.

## Uwaga o launcherze

`MINEVORA_LAUNCHER_12_2.zip` to paczka testowa programu w Pythonie, **nie gotowy plik EXE**. Pełna integracja z serwerem Minecraft wymaga uruchomienia backendu i dalszych testów.

## Sprawdzone elementy

- Otwieranie i renderowanie nowego ekranu w rozdzielczościach 1440×960 i 390×844.
- Poprawny układ bez poziomego przewijania na obu rozmiarach.
- Menu mobilne rozwija się i zwija.
- Filtrowanie trybów gry: 9 ogółem, 6 minigier, 3 PvP.
- Galeria: przełączenie 9 obrazów na rzuty .schem i podgląd w oknie modalnym.
- Kontrola obecności zasobów i lokalnych linków.

Działanie zewnętrznych usług (hosting, GitHub, Discord, autoryzacja Microsoft, multiplayer) nie było przedmiotem testów strony.
