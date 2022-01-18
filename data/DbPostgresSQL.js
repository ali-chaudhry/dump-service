const pg = require('pg');
const Db = require('./Db');

class DbPostgresql extends Db
{
  constructor(config)
  {
    super();
    this.withTransactions = true;
    this.client = new pg.Client(config);
    this.client.connect();
  }

  /**
   * @param {string} sql 
   * @param {any[]} params 
   * @param {string|undefined} rowMode - "array"
   * @return {Promise<{command: string; rowCount:number; rows: any[]}>}
   */
  query(sql, params, rowMode)
  {
    this.lastQuery = {sql, params};
    return this.client.query(sql, params, rowMode);
  }


  beginTransaction()
  {
    if (this.withTransactions) return this.client.query("begin");
  }

  commitTransaction()
  {
    if (this.withTransactions) return this.client.query("commit");
  }

  rollbackTransaction()
  {
    if (this.withTransactions) return this.client.query("rollback");
  }
}

module.exports = DbPostgresql;
