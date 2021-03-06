# For what

Personal README.
Для удобства и отслеживания истории принятия решений.

## Tests

#### Запуск

#### Раньше

В файле `Makefile`:

```sh
make test:
    NODE_OPTIONS=--experimental-vm-modules npx jest
```

#### Теперь

1. В файле `Makefile`:

```sh
make test:
    npm test
```

2. В файле `package.json`:

```sh
"scripts": {
    "test": "npx jest"
},
```

3. В корне проекта создаётся файл настроек npm - `.npmrc`:
   `node-options=--no-warnings --experimental-vm-modules`

Всё это позволяет запускать **Jest** тесты без предупреждений и с поддержкой модулей в Node.js.

---

#### `--coverage`

Если при попытке запуска проверки покрытия файлов тестами Node.js будет ругаться на не установленные плагины для `babel`, а сам `babel` в проекте даже не используется, то следует запускать `npx jest --coverage --coverageProvider=v8` -, т.е. добавлять запуск окружения `v8`, а не `babel` по умолчанию.
**FunFact**: выводы запуска с `babel` и с `v8` иногда могут отличаться. `v8` эксперементальная технология, `babel` стандартная.

#### `babel`:

```sh
-----------------|---------|----------|---------|---------|-------------------
File             | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-----------------|---------|----------|---------|---------|-------------------
All files        |      96 |    91.66 |     100 |   95.65 |
 convertFiles.js |     100 |      100 |     100 |     100 |
 genDiff.js      |   92.85 |    91.66 |     100 |   92.85 | 22 <- diff
-----------------|---------|----------|---------|---------|-------------------
```

#### `v8`:

```sh
-----------------|---------|----------|---------|---------|-------------------
File             | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-----------------|---------|----------|---------|---------|-------------------
All files        |   93.75 |    91.66 |     100 |   93.75 |
 convertFiles.js |     100 |      100 |     100 |     100 |
 genDiff.js      |   89.65 |    88.88 |     100 |   89.65 | 21-23 <- diff
-----------------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.649 s, estimated 1 s
```

---

## Makefile

#### Запуск `<make>`-команд и применение флагов к ним.

Изначально мы запускаем команду `npm test`, и если указать команду так `npm test --coverage --coverageProvider=v8` (без первых `--`), то указанные опции будут применены к самой команде (в данном случае к npm).
Нам же нужно передать данные опции внутрь скрипта test, для этого собственно и используем дополнительные два дефиса `npm test -- --coverage --coverageProvider=v8`.

## parsers и чтение расширения файла

Решил сделать реализацию `parsers.js` через `switch -> case` вместо `if`-ов для наглядности и лучшего визуального представления (ну и для разнообразия используемых возможностей языка.
Конвертация файла в JSON для сравнения делается внутри ф-и `parser`, а не через передачу второго аргумента с расширением файла, т.к. всюду пришлось бы тянуть функцию для определения этого самого расширения. Мне видится лучшим это сделать именно так, однако возможно лучше действительно разграничивать функции.

#### step#5

Сейчас покрытие тестов 95%, нужно подумать как сделать тест на выброс ошибки при передачи неверного расширения файла.

#### step #6

1. Формирование строки в stylish написан курица-лапой, нужно зарефакторить в конце проекта.

#### step #7

1. Формирование в plains зарефачить

---

1. Запуск тестов: в эталонном проекте в `package.json` через :

```sh
  "scripts": {
    "test": "npx jest --bail" // т.е. доп. флаг --bail, у меня без.
  },
```

2. Makefile и .PHONY.
   В эталонном Makefile присутствует эта команда. Для чего?

3. Файл parsers
   Подобный импорт: `import { parse as YAMLParse } from 'yaml';` - ok? Или лучше избегать и по стандартному: `import parse from 'yaml';`?

# TODO

## Refactor

1. [x] Базовый рефактор тестов
       1.1 [ ] Добавить test coverage до 100%
2. [ ] stylish форматтера -- ф-я genString -- поправить нормально отступы
3. [ ] plain форматтеа -- изменить case, когда добавляется unchanged объект и придумать как удалить его из result
4. [ ] Передача аргумента в `bin/gendiff.js`:
       Сейчас так:

```sh
.action((filepath1, filepath2, options) => {
    const result = genDiff(filepath1, filepath2, options.format);
    console.log(result);
  });
```

Было так:

```sh
.action((filepath1, filepath2, op) => {
    const result = genDiff(filepath1, filepath2, program.opts().format);
    console.log(result);
  });
```

5. [x] Добавить прогон всех тестов за один заход.
       Т.е. чтобы не устанавливать зависимости на каждый тест, следует сделать их в один заход.
