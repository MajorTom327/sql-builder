import { expect } from "chai";
import { QueryJoin, QueryJoinType } from "../src/QueryJoin"

describe('QueryJoin', function() {
  describe('Inner Join', function() {
    it('Should buid a basic inner join per default', function() {
      let queryJoin = new QueryJoin('table').on('a=b');
      expect(queryJoin.build()).to.equal('INNER JOIN table ON a=b');
    })

    it('Should buid a basic inner join', function() {
      let queryJoin = new QueryJoin('table').on('a=b').inner();
      expect(queryJoin.build()).to.equal('INNER JOIN table ON a=b');
    })

    it('Should buid a inner join when set type as inner', function() {
      let queryJoin = new QueryJoin('table').on('a=b').setType(QueryJoinType.INNER);
      expect(queryJoin.build()).to.equal('INNER JOIN table ON a=b');
    })
  })

  describe('Left join', function() {
    it('Should buid a basic left join', function() {
      let queryJoin = new QueryJoin('table').on('a=b').left();
      expect(queryJoin.build()).to.equal('LEFT JOIN table ON a=b');
    })

    it('Should buid a left join when set type as left', function() {
      let queryJoin = new QueryJoin('table').on('a=b').setType(QueryJoinType.LEFT);
      expect(queryJoin.build()).to.equal('LEFT JOIN table ON a=b');
    })
  })

  describe('Right join', function() {
    it('Should buid a basic right join', function() {
      let queryJoin = new QueryJoin('table').on('a=b').right();
      expect(queryJoin.build()).to.equal('RIGHT JOIN table ON a=b');
    })

    it('Should buid a right join when set type as right', function() {
      let queryJoin = new QueryJoin('table').on('a=b').setType(QueryJoinType.RIGHT);
      expect(queryJoin.build()).to.equal('RIGHT JOIN table ON a=b');
    })
  })

  describe('Full join', function() {
    it('Should buid a basic full join', function() {
      let queryJoin = new QueryJoin('table').on('a=b').full();
      expect(queryJoin.build()).to.equal('FULL JOIN table ON a=b');
    })

    it('Should buid a full join when set type as full', function() {
      let queryJoin = new QueryJoin('table').on('a=b').setType(QueryJoinType.FULL);
      expect(queryJoin.build()).to.equal('FULL JOIN table ON a=b');
    })
  })

  describe('Alias', function() {
    it('Should buid a join with an alias', function() {
      let queryJoin = new QueryJoin('table').on('a=b').as('t');
      expect(queryJoin.build()).to.equal('INNER JOIN table AS t ON a=b');
    })
  })
})