# PracaInzynierska

# Wymagania

- Zainstalowana aplikacja Docker Desktop
- Zainstalowana aplikacja Postman
- Zainstalowany Node.js v20.11.1 lub nowsza

# PROCES INSTALACJI

- Otworzenie folderu w którym umieszczono repozytorium
- Wpisać w terminalu: "docker-compose up --build"
- Odwiedzenie strony: http://localhost:9001/login
- Wprowadzenie hasła oraz loginu Hasło: minioadmin1 login: minioadmin1
- Przejście do: http://localhost:9001/access-keys
- Kliknięcie "Create access key"
- Kliknięcie "Create"
- Zapisanie klucza "Access Key" oraz "Secret Key" pod ręką
- Podmienienie wartości w pliku Backend\apps\document\.env w wartościach
  AWS_ACCESS_KEY_ID = Access Key oraz AWS_SECRET_ACCESS_KEY = Secret Key
- Przejście do http://localhost:9001/buckets
- kliknięcie "Create Bucket"
- wprowadzenie nazwy w polu "Bucket Name": "pdfdocuments"
- powtórzyć czynność wpisując w pole "Bucket Name": "attachments"
- otworzyć aplikację Postman
- wykonanie zapytania http przez aplikację Postman pod adress: localhost:3000/api/user/register
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
- przejść pod stronę: https://ethereal.email/login
- wprowadzić dane login:johanna18@ethereal.email haslo:bxxzRS7bmZPbGJpySw
- przejść pod stronę: https://ethereal.email/messages
- powinniśmy zobaczyć pole <test@test.com>, kliknijmy "Active your account"
- przejść pod adress w treści wiadomości
- wprowadzić wybrane przez siebie hasło
