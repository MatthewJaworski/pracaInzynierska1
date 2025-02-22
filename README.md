# Praca Inzynierska

# Wymagania

- Zainstalowana aplikacja Docker Desktop (https://www.docker.com/products/docker-desktop/)
- Zainstalowana aplikacja Postman (https://www.postman.com/downloads/)
- Zainstalowany Node.js v20.11.1 lub nowszy

# PROCES INSTALACJI (folder "zrzuty ekranu" zawiera kluczowe etapy)

- Otworzenie folderu, w którym umieszczono repozytorium
- uruchomić aplikację Docker Desktop
- Wpisać w terminalu: "docker-compose up --build"
- aplikacja będzie gotowa do użytkowania po około 10-20 sekundach (screen 2)
- Odwiedzenie strony: http://localhost:9001/login
- Wprowadzenie hasła oraz loginu Hasło: minioadmin1 login: minioadmin1
- Przejście do: http://localhost:9001/access-keys
- Kliknięcie "Create access key"
- Kliknięcie "Create"
- Zapisanie klucza "Access Key" oraz "Secret Key" pod ręką
- Podmienienie wartości w pliku Backend\apps\document\.env w wartościach
  AWS_ACCESS_KEY_ID = Access Key oraz AWS_SECRET_ACCESS_KEY = Secret Key
- Zrestartować działającą aplikację w terminalu używając skrótu klawiszowego ctrl + c
- uruchomienie aplikacji ponownie przez użycie komendy "docker-compose up --build"
- Przejście do http://localhost:9001/buckets
- kliknięcie "Create Bucket"
- wprowadzenie nazwy w polu "Bucket Name": "pdfdocuments"
- powtórzyć czynność wpisując w pole "Bucket Name": "attachments"
- otworzyć aplikację Postman
- wykonanie zapytania POST http przez aplikację Postman pod adress: localhost:3000/api/user/register
- wybrać zakładkę body
- wybrać opcję "raw"
- wprowadzić te dane: "{
  "email": "test@test.com",
  "role": "admin",
  "phoneNumber": "1234567890",
  "bankAccount": "PL12345678901234567890123456",
  "accountNumber": "1234567890123456",
  "firstName": "John",
  "lastName": "Doe",
  "permanentStreet": "Main Street",
  "permanentCity": "Warsaw",
  "permanentPostalCode": "00-001",
  "permanentNumber": "123"
  }"
- powinniśmy otrzymać odpowiedź 202 (screen 1)
- przejść pod stronę: https://ethereal.email/login
- wprowadzić dane login:johanna18@ethereal.email haslo:bxxzRS7bmZPbGJpySw
- przejść pod stronę: https://ethereal.email/messages
- powinniśmy zobaczyć pole <test@test.com>, kliknijmy "Active your account"
- przejść pod adress w treści wiadomości
- wprowadzić wybrane przez siebie hasło
- powinniśmy móc zalogować się do aplikacji przy pomocy emaila: test@test.com oraz wybranego przez nas hasła.

# PRZYKŁADOWE TESTOWANIE

## Dodanie nowego szablonu - zmiany formy studiów (pola muszą zostać utworzone pierwsze, inaczej skrypt dodawania dokumentu zostanie wykonany niepoprawnie - pola globalne nie zostaną wykryte!)

- w momencie zalogowania, przejść do zakładki "Pola"
- utworzenie dwóch pól academicYear oraz qualityOfEducation (screen 4)
- przejście na stronę szablony
- kliknięcie przycisku Utwórz szablon
- wprowadzenie dowolnych danych (zalecane wybranie widoczny dla studentów = tak), poza plikiem szablonu
- w folderze głównym repozytorium znajdziemy plik "podanie_o_zmiane_formy_studiów.pdf"
- przeciągamy lub wybieramy wyżej wspomniany plik jako plik szablonu (screen 3)
- powinniśmy zobaczyć utworzony plik

## Dodanie kont użytkowników

- przejście w zakładkę "Dashboard"
- przeciągniecię pliku "uzytkownicy.csv" z folderu repozytorium (screen 5)
- konta trzeba aktywować
- przechodzimy pod zakładkę https://ethereal.email/messages
- powinniśmy zobaczyć 4 nowe wiadomości (screen 6)
- aktywacja konta studenta <student@example.com> oraz dziekana <dean@example.com> (identyczny sposób jak w procesie instalacji aplikacji z kontem test@test.com)

## Utworzenie dokumentu na koncie studenta

- zalogowanie się do konta studenta student@example.com
- przejście do zakładki dokumenty
- powinniśmy widzieć szablon utworzony w kroku "Dodanie nowego szablonu - zmiany formy studiów"
- klikamy w nazwę dokumentu
- rozwinie się opis wraz z przyciskiem "Zatwierdź wniosek"
- klikamy przycisk "Zatwierdź wniosek"
- wypełniamy dane zgodnie z naszą wolą (screen 7)
- dokument zostanie wypełniony
- dokument zobaczymy w zakładce dashboard

## Zatwierdzenie wniosku przy użytku konta Pana/Pani dziekan

- zalogowanie się na konto: <dean@example.com>
- na stronie Dashboard zobaczymy utworzony dokument
- przypisujemy dokument klikając przycisk "Przypisz" (inaczej nie będziemy mogli dokonać dezycji)
- klikamy "Otwórz"
- poniżej widocznego dokumentu widzimy formularz decyzji
- wypełniamy jak tylko chcemy (screen 8)
- decyzja została wykonana plik będzie widoczny w zakładce "Archiwum"

## Przegląd bazy danych

- odwiedź http://localhost:8080
- wybieramy system: PostgreSQL

### Dla bazy użytkowników

- serwer: postgresusers
- username: user
- password: 1234567
- database: userdb

### Dla bazy dokumentów

- serwer: postgresdocuments
- username: user
- password: 1234567
- database: documentsdb

### Dla bazy komentarzy

- serwer: postgrescomments
- username: user
- password: 1234567
- database: commentsdb

### Dla bazy powiadomień

- serwer: postgresnotifications
- username: user
- password: 1234567
- database: notificationsdb

## RabbitMQ

- instancje możemy zobaczyć pod adresem: http://localhost:15672
- login: guest hasło: guest
