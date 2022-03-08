## Начало работы с docker-compose

Необходимо установить Docker

Для работы в Visual Studio Code можно установить плагин для работы с Docker


* Скачиваем проект
* npm i
* npm run build
* docker-compose build
* docker-compose up

Выполняем команду и ищем наш контейнер:

* docker ps

Производим подключение к контейнеру taskcore_main_task через CONTAINER ID:

* docker exec -it !CONTAINER ID! /bin/bash   

После подключения к конейнеру, необходимо запустить миграции:

* npm run typeorm migration:run

