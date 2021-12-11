import QueryWhereVerbs from './QueryWhereVerbs'
import { join, compose, map, prepend, isEmpty } from 'ramda'

export class QueryWhere {
  private isMulti: boolean = false;

  private condition: string = '';
  private verb: QueryWhereVerbs = QueryWhereVerbs.AND;
  private rhs: QueryWhere[] = [];

  constructor (condition: string = '') {
    this.condition = condition
  }

  public asAnd (): QueryWhere {
    this.verb = QueryWhereVerbs.AND
    return this
  }

  public asOr (): QueryWhere {
    this.verb = QueryWhereVerbs.OR
    return this
  }

  public add (queryWhere: QueryWhere): QueryWhere {
    this.rhs.push(queryWhere)
    return this
  }

  public multiple (): QueryWhere {
    this.isMulti = true
    return this
  }

  public simple (): QueryWhere {
    this.isMulti = false
    return this
  }

  public build (): string {
    let condition: string = ''

    if (isEmpty(this.condition)) return ''

    if (this.isMulti) {
      condition += compose(
        join(` ${this.verb} `),
        map(item => item.build()),
        prepend(new QueryWhere(this.condition))
      )(this.rhs)
    } else {
      condition += this.condition
    }
    return `(${condition})`
  }
}
