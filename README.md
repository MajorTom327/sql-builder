# Fluent SQL Builder
![Npm version](https://badgen.net/npm/v/@majortom327/sql-builder)
![Minzip size](https://badgen.net/bundlephobia/minzip/@majortom327/sql-builder)
![1 dependency](https://badgen.net/bundlephobia/dependency-count/@majortom327/sql-builder)
![Types included](https://badgen.net/npm/types/@majortom327/sql-builder)
![Travis Build](https://app.travis-ci.com/MajorTom327/sql-builder.svg)
[![Coverage Status](https://coveralls.io/repos/github/MajorTom327/sql-builder/badge.svg?branch=master)](https://coveralls.io/github/MajorTom327/sql-builder?branch=master)

---

## Description
**@majortom327/sql-builder** is a simple wrapper to build SQL queries as fluent object

## Howto


Basic usage:
```ts
import { QueryBuilder } from '@majortom327/sql-builder'

const query = new QueryBuilder('table');

const buildedQuery: string = query.build(); // SELECT * FROM table
```

And advanced:
```ts
import { QueryBuilder } from '@majortom327/sql-builder'

const query = new QueryBuilder("table")
  .where(new QueryWhere("field = 'value'")
    .multiple()
    .asAnd()
    .add(new QueryWhere("field2 = '{{someVariableValue}}'"))
  );

const buildedQuery = query.build({ someVariableValue: '1337'});

buildedQuery = "SELECT * FROM table WHERE ((field = 'value') AND (field2 = 1337))"
```

