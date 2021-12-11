import { expect } from 'chai';
import { QueryBuilder } from '../../src/QueryBuilder';
import { QueryWhere } from '../../src/QueryWhere';

describe('QueryBuilder - Delete', function() {
  it('Should do a basic delete', function() {
    let query = new QueryBuilder('table')
    .asDelete()
    expect(query.build()).to.equal('DELETE FROM table');
  })

  it('Should do a delete query with where clause', function() {
    let query = new QueryBuilder('table')
    .asDelete()
    .where(new QueryWhere('id = 1'))
    expect(query.build()).to.equal('DELETE FROM table WHERE (id = 1)');
  })

  it('Should do a delete query with complex where clause', function() {
    let query = new QueryBuilder('table')
    .asDelete()
    .where(
      new QueryWhere('id = 1')
      .multiple()
      .asAnd()
      .add(new QueryWhere('name = "John"'))
    )
    expect(query.build()).to.equal('DELETE FROM table WHERE ((id = 1) AND (name = "John"))');
  })
})