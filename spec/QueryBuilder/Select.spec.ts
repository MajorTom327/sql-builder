import { expect } from 'chai';
import { QueryBuilder } from '../../src/QueryBuilder';
import { QueryJoinType } from '../../src/QueryJoin';
import { QueryWhere } from '../../src/QueryWhere';

describe('QueryBuilder - Select', function() {
  it('Should do a basic select as default', function() {
    let query = new QueryBuilder("table");
    expect(query.build()).to.equal("SELECT * FROM table");
  })

  it('Should change the table', function() {
    let query = new QueryBuilder("table").setTable("users");
    expect(query.build()).to.equal("SELECT * FROM users");
  })


  it('Should do a basic select', function() {
    let query = new QueryBuilder("table").asSelect();
    expect(query.build()).to.equal("SELECT * FROM table");
  })
  
  describe("With fields", function() {
    it('Should do a select with a field', function() {
      let query = new QueryBuilder("table").addField("field");
      expect(query.build()).to.equal("SELECT field FROM table");
    })

    it('Should should not add two time a field', function() {
      let query = new QueryBuilder("table").addField("field").addField("field");
      expect(query.build()).to.equal("SELECT field FROM table");
    })

    it('Should do a select with many fields from select definition', function() {
      let query = new QueryBuilder("table")
      .select(["field", "field2"])
      expect(query.build()).to.equal("SELECT field, field2 FROM table");
    })
    it('Should do a select with many fields from addFields', function() {
      let query = new QueryBuilder("table")
      .addFields(["field", "field2"])
      expect(query.build()).to.equal("SELECT field, field2 FROM table");
    })

    it('Should do a select with many fields', function() {
      let query = new QueryBuilder("table")
      .addField("field")
      .addField("field2");
      expect(query.build()).to.equal("SELECT field, field2 FROM table");
    })
  })

  describe("With joins", function() {
    it('Should do a select with a join', function() {
      let query = new QueryBuilder("table")
      .join("table2", "table2.id = table.id");
      expect(query.build()).to.equal("SELECT * FROM table INNER JOIN table2 ON table2.id = table.id");
    })

    it('Should specify the type of join', function() {
      let query = new QueryBuilder("table")
      .join("table2", "table2.id = table.id", QueryJoinType.FULL);
      expect(query.build()).to.equal("SELECT * FROM table FULL JOIN table2 ON table2.id = table.id");
    })

    it('Should do a select with many joins', function() {
      let query = new QueryBuilder("table")
      .join("table2", "table2.id = table.id")
      .join("table3", "table3.id = table.id");
      expect(query.build()).to.equal("SELECT * FROM table INNER JOIN table2 ON table2.id = table.id INNER JOIN table3 ON table3.id = table.id");
    })
  })

  describe("With where", function() {
    it('Should add a where clause', function() {
      let query = new QueryBuilder("table")
      .where(new QueryWhere("field = 'value'"));
      expect(query.build()).to.equal("SELECT * FROM table WHERE (field = 'value')");
    })

    it('Should add a complexe where clause', function() {
      let query = new QueryBuilder("table")
        .where(new QueryWhere("field = 'value'")
          .multiple()
          .asAnd()
          .add(new QueryWhere("field2 = 'value2'"))
        );
      expect(query.build()).to.equal("SELECT * FROM table WHERE ((field = 'value') AND (field2 = 'value2'))");
    })

    it('Should add a complexe where clause with variables', function() {
      let query = new QueryBuilder("table")
        .where(new QueryWhere("field = 'value'")
          .multiple()
          .asAnd()
          .add(new QueryWhere("field2 = '{{varCond}}'"))
        );
      expect(query.build({ varCond: 'value2'})).to.equal("SELECT * FROM table WHERE ((field = 'value') AND (field2 = 'value2'))");
    })
  })
})