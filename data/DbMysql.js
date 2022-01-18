const mysql = require('mysql');


class DbMysql {
    constructor(config)
    {
      super();
      this.withTransactions = true;
      this.client =  mysql.createConnection(config);
      this.client.connect();
    }
}



module.exports = DbMysql;