## Setup Local Dev

- [Server](./server/README.md)
- [Client](./client/README.md)

### Быстрый запуск локально (сервер + клиент)
1. Скопируйте пример переменных окружения и при необходимости обновите значения:
   - Сервер: `cp server/example/.env server/.env`
   - Клиент: `cp client/example/.env client/.env`
   - По умолчанию клиент подключается к `http://localhost:3000`. Если вы изменили порт сервера, укажите URL в `VUE_APP_SERVER` в `client/.env`.
2. Установите зависимости:
   - Сервер: `cd server && npm install`
   - Клиент: в другом терминале `cd client && npm install`
3. Запустите приложения в двух терминалах:
   - Сервер: `npm start` (порт `3000`)
   - Клиент: `npm run serve` (порт `8081` по умолчанию)
4. Откройте клиент в браузере по адресу `http://localhost:8081`. Сообщение `Network: unavailable` в логе клиента означает, что dev‑сервер не расшаривает адрес в локальную сеть Windows и не влияет на подключение к вашему бэкенду.
