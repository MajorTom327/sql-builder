# Fluent SQL Builder
![Npm version](https://badgen.net/npm/v/@majortom327/sql-builder)
![Minzip size](https://badgen.net/bundlephobia/minzip/@majortom327/sql-builder)
![1 dependency](https://badgen.net/bundlephobia/dependency-count/@majortom327/sql-builder)
![Types included](https://badgen.net/npm/types/@majortom327/sql-builder)

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

