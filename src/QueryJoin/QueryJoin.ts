import QueryJoinType from './QueryJoinType'

export class QueryJoin {
  private table: string;
  private condition: string = '';
  private alias: string = ''
  private type: QueryJoinType = QueryJoinType.INNER;

  constructor (table: string) {
    this.table = table
  }

  public as (alias: string): QueryJoin {
    this.alias = alias
    return this
  }

  public on (condition: string): QueryJoin {
    this.condition = condition
    return this
  }

  public setType (type: QueryJoinType): QueryJoin {
    this.type = type
    return this
  }

  public inner (): QueryJoin {
    this.type = QueryJoinType.INNER
    return this
  }

  public left (): QueryJoin {
    this.type = QueryJoinType.LEFT
    return this
  }

  public right (): QueryJoin {
    this.type = QueryJoinType.RIGHT
    return this
  }

  public full (): QueryJoin {
    this.type = QueryJoinType.FULL
    return this
  }

  public build (): string {
    const alias = this.alias ? ` AS ${this.alias}` : ''
    return `${this.type} JOIN ${this.table}${alias} ON ${this.condition}`
  }
}
