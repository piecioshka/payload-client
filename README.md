# payload-client

## Cel

Projekt powstał na potrzeby rozwiązania problemu przeprowadzania automatycznych
testów na urządzeniach TV i BD, ale będzie mógł być w stanie uruchomiony
na każdej platformie, która posiada silnik webowy (np. WebKit, Gecko) 
oraz jest w stanie uruchomić kod JavaScript.

## Zakres

Projekt skupia się na wykorzystaniu wcześniej zdefiniowanych `test case`-ów
w uruchomionej aplikacji webowej. `Test case`-y będą w stanie emulować
zachowanie użytkownika, bez potrzeby uruchamia zewnętrznych serwerów opartych
o `Node.js`, ani innych podobnych rozwiązań związanych z uruchamianiem testów
integracyjnych.

Modułu z `test case`-ami są tworzone według konwencji modułów `CommonJS`.
Przykład takiego modułu znajduje się w pliku
`demo/app/scripts/payloads/example.payload.js`.

Kodem wynikowym jest plik z rozszerzeniem `*.js`, zawierający mechanizm
JavaScript, który zawiera `test case`-y do uruchomienia na urządzeniach TV.

Do aplikacji webowej, w której chcemy aby uruchomiły się testy integracyjne
podłączamy plik `web-socket-client.js`, który będzie wczytywać wszystkie moduły
zawierające `test case`-y. Każdy z modułów będzie miał dostęp do takiego
samego kontekstu (globalnego), który jest używany w docelowej aplikacji webowej.

## Tworzenie nowego payload-u

Aby stworzyć nowy payload należy stworzyć plik w strukturze projektu.
Przykład takiego modułu jest dostępny w pliku
`demo/app/scripts/payloads/example.payload.js`.

Nazwa payload-u musi być zakończona wyrazem `Payload`, np. `ExamplePayload`.
