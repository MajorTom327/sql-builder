import { always, append, assoc, compose, isNil, keys, prop, when, isEmpty, join, toPairs, map, nth } from 'ramda'
import IQueryBuilder from './IQueryBuilder'
import QueryVerbs from './QueryVerbs'
import {QueryJoin, QueryJoinType} from './QueryJoin'
import {QueryWhere} from './QueryWhere'
import QueryConflictActions from './QueryConflictActions'

export class QueryBuilder implements IQueryBuilder {
  private table: string;
  private verb: QueryVerbs = QueryVerbs.SELECT;
  private fields: string[] = [];
  private values: Record<string, any> = {};
  private joins: QueryJoin[] = []
  private whereCondition: QueryWhere = null;
  private conflict: QueryConflictActions = QueryConflictActions.disabled

  constructor (table: string) {
    this.table = table
  }

  // * Setters
  public setTable (table: string) {
    this.table = table

    return this
  }

  // * Verbs

  public asSelect () {
    this.verb = QueryVerbs.SELECT

    return this
  }

  public asInsert () {
    this.verb = QueryVerbs.INSERT

    return this
  }

  public asUpdate () {
    this.verb = QueryVerbs.UPDATE

    return this
  }

  public asDelete () {
    this.verb = QueryVerbs.DELETE

    return this
  }

  // * Select

  public select (columns: string[]) {
    this.verb = QueryVerbs.SELECT
    this.fields = columns

    return this
  }

  public addField (column: string) {
    if (!this.fields.includes(column)) {
      this.fields = append(column, this.fields)
    }

    return this
  }

  public addFields (columns: string[]) {
    columns.forEach(column => this.addField(column))

    return this
  }

  // * Values
  public addValue (column: string, value: any) {
    this.values = compose(
      assoc(column, value),
      when(isNil, always(null))
    )(this.values)

    return this
  }

  public addValues (values: Record<string, any>) {
    const valuesKeys = keys(values)

    valuesKeys.forEach(key => this.addValue(key, prop(key, values)))

    return this
  }

  // * Join

  public join (table: string, on: string, type: QueryJoinType = QueryJoinType.INNER) {
    this.joins = append(new QueryJoin(table).on(on).setType(type), this.joins)
    return this
  }

  // * Conflict

  onConflict (action: QueryConflictActions) {
    this.conflict = action

    return this
  }

  // * Where
  public where (where: QueryWhere) {
    this.whereCondition = where
    return this
  }

  // * Build
  public build (variables?: Record<string, any>): string {
    let query = ''

    if (this.verb === QueryVerbs.SELECT) {
      query = this.buildSelect()
    } else if (this.verb === QueryVerbs.INSERT) {
      query = this.buildInsert()
    } else if (this.verb === QueryVerbs.UPDATE) {
      query = this.buildUpdate()
    } else if (this.verb === QueryVerbs.DELETE) {
      query = this.buildDelete()
    }

    query += this.buildWhere()

    if (isNil(variables) || isEmpty(variables)) {
      return query
    }
    toPairs(variables).forEach(pair => {
      // Todo: Ensure var is not a reserved word
      query = query.replace(`{{${pair[0]}}}`, pair[1])
    })

    return query
  }

  private buildSelect (): string {
    let cmd: string = ''
    let fields: string[] = []

    if (isEmpty(this.fields)) {
      fields = ['*']
    } else {
      fields = this.fields
    }

    cmd += `SELECT ${fields.join(', ')} FROM ${this.table}`

    if (!isEmpty(this.joins)) {
      cmd += ' ' + this.joins.map(join => join.build()).join(' ')
    }

    return cmd
  }

  private buildInsert (): string {
    let cmd: string = `INSERT INTO ${this.table}`
    const valuesPairs = toPairs(this.values)

    const toList = (n: number) => compose(
      join(', '),
      map(nth(n))
    )(valuesPairs)

    cmd += ` (${toList(0)})`
    cmd += ` VALUES (${toList(1)})`

    if (this.conflict === QueryConflictActions.nothing) {
      cmd += ' ON CONFLICT DO NOTHING'
    } else if (this.conflict === QueryConflictActions.update) {
      cmd += ' ON CONFLICT DO UPDATE'
    }

    cmd += ' RETURNING *'

    return cmd
  }

  private buildUpdate (): string {
    let cmd: string = `UPDATE ${this.table} SET`

    const valuesPairs = toPairs(this.values)
    cmd += valuesPairs.map(pair => ` ${pair[0]} = ${pair[1]}`).join(', ')
    return cmd
  }

  private buildDelete (): string {
    const cmd: string = `DELETE FROM ${this.table}`

    return cmd
  }

  private buildWhere (): string {
    if (this.verb === QueryVerbs.INSERT || isNil(this.whereCondition)) {
      return ''
    }

    return ` WHERE ${this.whereCondition.build()}`
  }
}

export default QueryBuilder
