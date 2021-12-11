import { QueryConflictActions } from './QueryConflictActions'
import { QueryJoinType } from './QueryJoin'
import {QueryWhere} from './QueryWhere'

export interface IQueryBuilder {

  // * Setters
  setTable(table: string): IQueryBuilder;

  // * Verbs
  asSelect(): IQueryBuilder;
  asInsert(): IQueryBuilder;
  asUpdate(): IQueryBuilder;
  asDelete(): IQueryBuilder;

  // * Select
  select(fields: string[]): IQueryBuilder;

  addField(field: string): IQueryBuilder;
  addFields(fields: string[]): IQueryBuilder;

  // * Values
  addValue(key: string, value: any): IQueryBuilder;
  addValues(values: Record<string, any>): IQueryBuilder;

  // * Join
  join(table: string, on: string, type: QueryJoinType): IQueryBuilder;

  // * Conflict
  onConflict(handle: QueryConflictActions): IQueryBuilder;

  // * Where

  where(condition: QueryWhere): IQueryBuilder;

  // * Build
  build(variables?: Record<string, any>): string;
  // where(column: string, value: any): IQueryBuilder;
  // where(column: string, operator: string, value: any): IQueryBuilder;
  // where(column: string, operator: string, value: any, boolean: string): IQueryBuilder;

}

export default IQueryBuilder

/*

  // * Where
  where(key: string, value: any): IQueryBuilder;
  where(key: string, operator: string, value: any): IQueryBuilder;
  where(key: string, operator: string, value: any, boolean: string): IQueryBuilder;

  // * Order
  orderBy(key: string, direction: string): IQueryBuilder;

  // * Limit
  limit(limit: number): IQueryBuilder;

  // * Offset
  offset(offset: number): IQueryBuilder;

  // * Group
  groupBy(key: string): IQueryBuilder;

  // * Having
  having(key: string, value: any): IQueryBuilder;
  having(key: string, operator: string, value: any): IQueryBuilder;
  having(key: string, operator: string, value: any, boolean: string): IQueryBuilder;

  // * Execute
  execute(): Promise<any>;
*/
