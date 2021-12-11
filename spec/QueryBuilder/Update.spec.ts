import { expect } from 'chai';
import { QueryBuilder } from '../../src/QueryBuilder';
import { QueryWhere } from '../../src/QueryWhere';

describe('QueryBuilder - Update', function() {
  it('Should do a basic update', function() {
    let query = new QueryBuilder('table')
    .asUpdate()
    .addValue('name', '"test"')

    expect(query.build()).to.equal('UPDATE table SET name = "test"');
  })

  describe('With where', function() {
    it('Should do a update with a basic where clause', function() {
      let query = new QueryBuilder('table')
      .asUpdate()
      .addValue('name', '"test"')
      .where(new QueryWhere('id = 1'))
  
      expect(query.build()).to.equal('UPDATE table SET name = "test" WHERE (id = 1)');
    })
    it('Should do a update with a complexe where clause', function() {
      let query = new QueryBuilder('table')
      .asUpdate()
      .addValue('name', '"test"')
      .where(
        new QueryWhere('id = 1')
        .multiple()
        .asAnd()
        .add(new QueryWhere('name = "test"'))
      )
  
      expect(query.build()).to.equal('UPDATE table SET name = "test" WHERE ((id = 1) AND (name = "test"))');
    })

  })
})