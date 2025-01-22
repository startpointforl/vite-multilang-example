# React + TypeScript + Vite

Демо проект для тестирования возможностей сборки и разработки на Vite приложения с поддержкой билда для нескольких языков (двух).

Основные особенности:

- переводы для всех языков лежат в .translations/data.json
- скрипт npm run i18n копирует их в папку сборки /dist и раскладывает по двум файлам i18n.ru.json и i18n.en.json
- в качестве примера в createI18NFunctions используется тривиальный механизм работы с переводами по ключам и кейсетам

## Начало

Для работы потребуется Node.js 18.17.1.
Для начала [устанавливаем nvm](https://github.com/nvm-sh/nvm#install--update-script). Затем:

```bash
# Устанавливаем Node.js
nvm install 18.17.1

# Применяем нужную версию
nvm use

# Устанавливаем зависимости
npm ci

```

Также необходимо добавить в файл /etc/hosts запись `127.0.0.1 vite.example.ru`

Запуск:

```bash
# Режим разработки
npm run start:dev

# Сборка для продакшен-режима
npm run build:prod

# Запускт продакшен-режима
npm run start:prod
```

Сервис доступен по адресу http://vite.example.ru

## Что реализовано

### Сервер

- реализован кастомный сервер на express, который при заходе на страницы сам отдает html (без SSR)
- интеграция с vite реализована по документации https://vite.dev/guide/backend-integration
- функция getStaticLinks занимается формированием тегов со ссылками на собранные файлы статики (js, css, img), только для продакшен версии
- для дев-версии используются специальные ссылки на /@vite/client, /src/main.tsx и т.д. на поднимающийся рядом vite-сервер статики (http://vite.example.ru:5173/)
- для продакшен-версии сервер проксирует статику, собранную с помощью vite
- hot reload для сервера не реализован

### Клиент

- сборка клиента сделана на vite
- для дев-сервера настроен cors

### Работа с языками

В приложении можно посмотреть два подхода для работы с несколькими языками.

#### Исходные данные

- язык определяется на кастомном express-сервере
- можно потестировать передав guery-параметр при запросе страницы, например http://vite.example.ru/?lang=ru и http://vite.example.ru/?lang=en, в реальном приложении подразумевается, что язык должен приходить из профиля пользователя, его кук и т.д.
- у нас имеется два json-файал с разными переводами для разных языков (i18n.ru.json и i18n.en.json)
- в зависимости от языка пользователя, мы должны использовать один или второй

#### Первый подход

Код для него сейчас закомментирован, основные изменения в файлах vite.config.ts, client/src/utils/i18n/index.ts и renderBundle.ts

#### Второй подход

Сейчас используется по умолчанию.

Особенности:

- для дев-режима используется первый подход
- для продакшен-сборки команда vite build выполняется два раза с разными модами (en и ru), при добавлении новых языков можно будет добавить запуск с новым модом
- в зависимости от мода в файле vite.config.ts немного меняется путь до файла манифеста и названия итогового файла сборки
- с помощью плагина @rollup/plugin-replace место определения объекта с переводами заменяется на реальные переводы, которые на этапе сборки считываются из соответствующего json-файла (используется строка `__buildI18nJson` и функция loadLocales, подробно можно посмотреть в vite.config.ts)
- на кастомном сервере берется нужные manifest.json в зависимости от языка пользователя и соответственно ссылки на бандл с правильным языком

Плюсы:

- в один бандл не тянутся все языки, а пользователю доезжает бандл только с нужными ему переводами

Минусы:

- основная логика завязана на подмену подстроки в файле данными из json-а, которые перед этим форматируются в строку
- для продакшена может потеряться типизация переводов
