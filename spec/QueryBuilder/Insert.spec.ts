import { expect } from 'chai';
import { QueryBuilder } from '../../src/QueryBuilder';
import QueryConflictActions from '../../src/QueryConflictActions';
import { QueryWhere } from '../../src/QueryWhere';

describe('QueryBuilder - Insert', function() {
  it('Should do a basic insert', function() {
    let query = new QueryBuilder('table')
      .asInsert()
      .addValues({ 'name': '"John Connor"' })

    expect(query.build()).to.equal('INSERT INTO table (name) VALUES ("John Connor") RETURNING *');
  })
  it('Should do a insert with many values', function() {
    let query = new QueryBuilder('table')
      .asInsert()
      .addValues({ 'name': '"John Connor"', 'age': '30' })

    expect(query.build()).to.equal('INSERT INTO table (name, age) VALUES ("John Connor", 30) RETURNING *');
  })

  it('Should do a insert with many values inserted one by one', function() {
    let query = new QueryBuilder('table')
      .asInsert()
      .addValue('name', '"John Connor"')
      .addValue('age', '30')

    expect(query.build()).to.equal('INSERT INTO table (name, age) VALUES ("John Connor", 30) RETURNING *');
  })

  it("Should not add where on insert", function() {
    let query = new QueryBuilder('table')
      .asInsert()
      .addValues({ 'name': '"John Connor"' })
      .where(new QueryWhere('id = 1'));

    expect(query.build()).to.equal('INSERT INTO table (name) VALUES ("John Connor") RETURNING *');
  })

  describe('With conflict option', function() {
    it("Should set conflict to do nothing", function() {
      let query = new QueryBuilder('table')
        .asInsert()
        .addValues({ 'name': '"John Connor"' })
        .onConflict(QueryConflictActions.nothing)

      expect(query.build()).to.equal('INSERT INTO table (name) VALUES ("John Connor") ON CONFLICT DO NOTHING RETURNING *');
    })

    it("Should set conflict to do update", function() {
      let query = new QueryBuilder('table')
        .asInsert()
        .addValues({ 'name': '"John Connor"' })
        .onConflict(QueryConflictActions.update)

      expect(query.build()).to.equal('INSERT INTO table (name) VALUES ("John Connor") ON CONFLICT DO UPDATE RETURNING *');
    })
  })
})