<h1 align="center">
 <a href="https://planfree.dev">planfree.dev</a>
  <br>
</h1>

<h4 align="center">A completely free implementation of planning poker</h4>

Try it out with your team, it's currently live at [planfree.dev](https://www.planfree.dev/#/). If you find any issues, or wish to contribute, take a look at the [issues list](https://github.com/LukeGarrigan/planfree.dev/issues). If you have any ideas don't hesitate to create a new issue!
<p align="center">
  <a href="https://img.shields.io/github/license/lukegarrigan/p5js-chess">
    <img src="https://img.shields.io/github/license/lukegarrigan/p5js-chess" />
  </a>
   <a href="https://app.netlify.com/sites/blissful-bardeen-521053/deploys">
      <img src="https://img.shields.io/netlify/03077de6-f8e4-49e6-a8fc-2e460f60d98b">
  </a>
  <a href="https://GitHub.com/LukeGarrigan/planfree.dev/issues/">
      <img src="https://img.shields.io/github/issues/LukeGarrigan/planfree.dev.svg">
  </a>
  <a href="https://dl.circleci.com/status-badge/redirect/gh/LukeGarrigan/planfree.dev/tree/main">
      <img src="https://dl.circleci.com/status-badge/img/gh/LukeGarrigan/planfree.dev/tree/main.svg?style=svg">
  </a>
</p>

![image](https://user-images.githubusercontent.com/12545967/124085610-2351dc80-da48-11eb-960d-af548db474e9.png)

## Setup Local Dev

- [Server](./server/README.md)
- [Client](./client/README.md)

### Быстрый запуск локально (сервер + клиент)
1. Скопируйте пример переменных окружения и при необходимости обновите значения:
   - Сервер: `cp server/example/.env server/.env`
   - Клиент: `cp client/example/.env client/.env`
   - По умолчанию клиент берёт адрес из `VUE_APP_SERVER` (если не задан, берёт текущий origin страницы). Лучше явно указать URL бэкенда в `VUE_APP_SERVER`, чтобы избежать обращений к `localhost` после сборки.
2. Установите зависимости:
   - Сервер: `cd server && npm install`
   - Клиент: в другом терминале `cd client && npm install`
3. Запустите приложения в двух терминалах:
   - Сервер: `npm start` (порт `3000`)
   - Клиент: `npm run serve` (порт `8081` по умолчанию)
4. Откройте клиент в браузере по адресу `http://localhost:8081`. Сообщение `Network: unavailable` в логе клиента означает, что dev‑сервер не расшаривает адрес в локальную сеть Windows и не влияет на подключение к вашему бэкенду.

### Развёртывание на сервере (Ubuntu, пример для `http://147.45.183.5:8080`)

1. Установите зависимости системы и Node.js 18+:
   ```bash
   sudo apt update
   sudo apt install -y curl git
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs
   ```

2. Склонируйте репозиторий и подготовьте переменные окружения:
   ```bash
   git clone <ваш-форк-или-репозиторий>
   cd planning-poker
   cp server/example/.env server/.env
   cp client/example/.env client/.env
   ```
   Обязательно укажите в `server/.env` переменную `ORIGIN=http://147.45.183.5:8080` (или ваш домен/порт через запятую), чтобы CORS совпадал с фронтендом.
   В `client/.env` пропишите `VUE_APP_SERVER` на публичный URL бэкенда (например, `http://147.45.183.5:3000` или адрес reverse‑proxy). Это гарантирует, что собранный клиент не попытается подключиться к `localhost`.

3. Соберите клиент и поднимите сервер:
   ```bash
   cd client && npm install && npm run build
   cd ../server && npm install
   npm start   # или pm2/systemd в продакшене
   ```

4. Раздайте статический клиент любым веб-сервером (например, Nginx):
   - скопируйте содержимое `client/dist` в директорию, которую обслуживает Nginx для порта `8080`;
   - убедитесь, что Nginx проксирует только фронтенд, а запросы socket.io идут напрямую на `http://147.45.183.5:3000` (или через отдельный location `/socket.io` с proxy_pass на backend);
   - при необходимости откройте порты `8080` и `3000` в брандмауэре.

5. После изменения `.env` перезапускайте backend, чтобы обновились разрешённые `ORIGIN` заголовки. Клиент достаточно собрать заново, если меняли `VUE_APP_SERVER`.
