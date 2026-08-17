# Первоначальная настройка

Всё, что нужно для запуска сайта, лежит в папке `gumshoe-basic-rules` — она и будет корнем репозитория. Исходные заметки Obsidian остаются на уровень выше и в репозиторий не попадают.

Адреса уже прописаны под `github.com/lockedroom/gumshoe-basic-rules` — править конфиги не нужно. Осталось четыре шага.

## 1. Установить Git и Python

- **Git** — https://git-scm.com/download/win
- **Python 3** — из Microsoft Store или https://python.org (при установке отметьте «Add Python to PATH»)

Проверка в PowerShell:

```powershell
git --version
python --version
```

## 2. Создать репозиторий на GitHub

Зайдите на https://github.com/new и создайте **публичный** репозиторий с именем `gumshoe-basic-rules` под аккаунтом `lockedroom`.

README, .gitignore и лицензию при создании **не добавляйте** — они уже есть в папке.

## 3. Первый push

Все адреса в `site/_config.yml` и `README.md` уже настроены на `lockedroom/gumshoe-basic-rules`. Менять ничего не нужно.

В PowerShell:

```powershell
cd "C:\Users\iamva\My Drive\Note Vault\01-PROJECTS\СЫЩИК. Основы правил\gumshoe-basic-rules"

python build.py

git init -b main
git add -A
git commit -m "Первая версия сайта"
git remote add origin https://github.com/lockedroom/gumshoe-basic-rules.git
git push -u origin main
```

> **Важно про Google Drive**
>
> Папка лежит внутри синхронизируемого диска. Если Git начнёт ругаться на заблокированные файлы, приостановите синхронизацию Google Drive на время `git push`. Каталог `.git` синхронизировать не нужно — при желании исключите `gumshoe-basic-rules` из синхронизации в настройках клиента Google Drive.
>
> **Про Obsidian:** файлы `README.md` и `SETUP.md` внутри репозитория попадут в поиск хранилища. Если это мешает, добавьте `gumshoe-basic-rules` в *Настройки → Файлы и ссылки → Исключённые файлы*.

## 4. Включить GitHub Pages

Откройте https://github.com/lockedroom/gumshoe-basic-rules/settings/pages и в разделе **Build and deployment → Source** выберите **GitHub Actions**.

Больше ничего настраивать не нужно — workflow `.github/workflows/pages.yml` соберёт сайт сам. Ход сборки виден на вкладке **Actions**. Первый запуск занимает 2–3 минуты.

Сайт появится по адресу **https://lockedroom.github.io/gumshoe-basic-rules/**

---

## Дальнейшая работа

Правьте заметки в Obsidian как обычно. Когда хотите обновить сайт:

```powershell
cd "C:\Users\iamva\My Drive\Note Vault\01-PROJECTS\СЫЩИК. Основы правил\gumshoe-basic-rules"
python build.py
git add -A
git commit -m "Что изменилось"
git push
```

### Как опубликовать новую главу

Достаточно поставить в front matter заметки `status: завершено` и указать `paragraph` — порядковый номер главы. Затем перезапустить `build.py`.

Если глава должна попасть внутрь раздела «Правила» или «Приложения», добавьте её в словари `SECTION_OF` и `NAV_TITLES` в `build.py`.

### Локальный предпросмотр (необязательно)

Требуется Ruby (https://rubyinstaller.org — версия Ruby+Devkit 3.3.x).

```powershell
cd "C:\Users\iamva\My Drive\Note Vault\01-PROJECTS\СЫЩИК. Основы правил\gumshoe-basic-rules\site"
gem install bundler
bundle install
bundle exec jekyll serve --livereload
```

Откроется на http://localhost:4000/gumshoe-basic-rules/

Предпросмотр удобен, но не обязателен: можно просто пушить и смотреть результат на GitHub.

---

## Что делать, если

**Сайт собрался, но стили не подгрузились (голый текст).** Не совпадает `baseurl` в `site/_config.yml` с именем репозитория.

**Actions падает на шаге `bundle install`.** Удалите `site/Gemfile.lock`, если он случайно попал в репозиторий, и запушьте заново.

**Страница не появилась в меню.** Проверьте, что у заметки `status: завершено`, и что `build.py` отработал без ошибок — он печатает список пропущенных файлов.

**Ссылка в тексте стала обычным текстом с пометкой «готовится».** Заметка, на которую она ведёт, ещё не опубликована. Это ожидаемое поведение.
