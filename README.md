### Hexlet tests and linter status:

[![Actions Status](https://github.com/mishken3/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/mishken3/frontend-project-lvl2/actions)
[![Actions Status](https://github.com/mishken3/frontend-project-lvl2/actions/workflows/eslint.yml/badge.svg)](https://github.com/mishken3/frontend-project-lvl2/actions/workflows/eslint.yml)
[![Actions Status](https://github.com/mishken3/frontend-project-lvl2/actions/workflows/json-tests.yml/badge.svg)](https://github.com/mishken3/frontend-project-lvl2/actions/workflows/json-tests.yml)
[![Test Coverage](https://api.codeclimate.com/v1/badges/e1e91b6d96680333ffd7/maintainability)](https://codeclimate.com/github/mishken3/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/e1e91b6d96680333ffd7/test_coverage)](https://codeclimate.com/github/mishken3/frontend-project-lvl2/test_coverage)

# Description

This is my second JS-project on [Hexlet](https://hexlet.io). I build a difference generator that compares two config files and shows difference in different ways.
More info you can find below ↓.

# Getting Started

## Setup:

```
git clone https://github.com/mishken3/frontend-project-lvl2
make install
npm link
```

## How to use

You can use it as a script in terminal or as a library in your JavaScript project. It supports json and yaml files. You can format outcome difference in three styles: stylish (default), plain and json.

In terminal:

Install dependencies with command `make install` in directory with this project:

```
$ gendiff -h
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format [type]  output format (default: "stylish")
  -h, --help           output usage information
```

In your project:

Install dependencies with command `make install` in directory with my project. Move library to your node_modules directory: `mv frontend-project-lvl2 path/to/your/project/node_modules/gendiff`

```
import genDiff from 'gendiff';

const diff = genDiff(filepath1, filepath2, format);
console.log(diff);
```

## Run tests

```sh
make test
```

## Available formats:

```
json
yaml & yml
```

# Feature demos

## Flat JSON comparison:

[![asciicast](https://asciinema.org/a/omXcH0ixvdBMi9KIqUWVtAxWZ.svg)](https://asciinema.org/a/omXcH0ixvdBMi9KIqUWVtAxWZ)

## Flat YAML&YML comparison:

[![asciicast](https://asciinema.org/a/ZZpHBqbsdPjFg7UrUQ0LYykR9.svg)](https://asciinema.org/a/ZZpHBqbsdPjFg7UrUQ0LYykR9)

## Nested format comparison:

[![asciicast](https://asciinema.org/a/HTTgsE1WG7KxFxHAWkqfquxL9.svg)](https://asciinema.org/a/HTTgsE1WG7KxFxHAWkqfquxL9)

## Plain format comparison:

[![asciicast](https://asciinema.org/a/DtvOOXN6PEtUef0PUh9fY808b.svg)](https://asciinema.org/a/DtvOOXN6PEtUef0PUh9fY808b)

## JSON format comparison:

[![asciicast](https://asciinema.org/a/Xo5fD4MiLwHeSdJbioUMhUocw.svg)](https://asciinema.org/a/Xo5fD4MiLwHeSdJbioUMhUocw)
