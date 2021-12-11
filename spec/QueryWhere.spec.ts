import { expect } from 'chai';
import { QueryWhere } from '../src/QueryWhere/QueryWhere';

describe('QueryWhere', function() {
  it('Should return a basic where', function () {
    const where = new QueryWhere('name = John');

    expect(where.build()).to.equal('(name = John)');
  })

  it('Should return a basic where', function () {
    const where = new QueryWhere();

    expect(where.build()).to.equal('');
  })
  

  describe("AND where", function() {
    it('Should return a multiple AND condition', function() {
      const where = new QueryWhere('name = John')
      .multiple()
      .asAnd()
      .add(new QueryWhere('age = 20'));
      
      expect(where.build()).to.equal('((name = John) AND (age = 20))');
    })

    it('Should return a simple condition', function() {
      const where = new QueryWhere('name = John')
      .multiple()
      .asAnd()
      .add(new QueryWhere('age = 20'))
      .simple();
      
      expect(where.build()).to.equal('(name = John)');
    })

    it('Should return a lot of where with AND condition', function() {
      const where = new QueryWhere('name = John')
      .multiple()
      .asAnd()
      .add(new QueryWhere('age = 20'))
      .add(new QueryWhere('age = 21'));
      
      expect(where.build()).to.equal('((name = John) AND (age = 20) AND (age = 21))');
    })
    
  })
  describe("OR where", function() {
    it('Should return a multiple OR condition', function() {
      const where = new QueryWhere('name = John')
      .multiple()
      .asOr()
      .add(new QueryWhere('age = 20'));
      
      expect(where.build()).to.equal('((name = John) OR (age = 20))');
    })
    
    it('Should return a lot of where with OR condition', function() {
      const where = new QueryWhere('name = John')
      .multiple()
      .asOr()
      .add(new QueryWhere('age = 20'))
      .add(new QueryWhere('age = 21'));
      
      expect(where.build()).to.equal('((name = John) OR (age = 20) OR (age = 21))');
    })

    it('Should return a simple condition', function() {
      const where = new QueryWhere('name = John')
      .multiple()
      .asOr()
      .add(new QueryWhere('age = 20'))
      .simple();
      
      expect(where.build()).to.equal('(name = John)');
    })
  })
})