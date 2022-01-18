const Utils = require("../data/Utils");

class Product {
  static table = "products";
  static fields = 
  {
    id: {columnName: "id"},
    title: { columnName: "title" },
    price: { columnName: "price" },
    productCode: { columnName: "productCode" },
    expiryDate: { columnName: "expiry_date" },
  };

  static casts = 
  {
    id:"text",
    title: "text",
    price: "integer",
    product_code: "text",
    expiry_date: "timestamp",
  };

  constructor(data) 
  {
    Utils.toDbObj(Product.fields, this, data);
  }

  /**
   *
   * @param {Db} db
   * @param {object[]} rows
   */
  static insertRows(db, rows) 
  {
    return db.insertRows(rows, null, "product_code");
  }

  /**
   *
   * @param {Db} db
   * @param {object[]} rows
   */
  static async upsertRows(db, rows) 
  {
    let res = false;
   
      /* Columns to be updated in case of record already exist*/
      const columns = [
        "pricing_type",
        "min_adult",
        "max_adult",
        "min_senior",
        "min_youth",
        "max_youth",
        "max_senior",
        "min_child",
        "max_child",
        "min_infant",
        "max_infant",
        "min_traveler",
        "max_travelers",
      ];

      const dbRes = await db.upsertRows(rows, {where: { product_code: "=" }, columns});

      if (dbRes.rowCount > 0) 
      {
        res = true;
      }

  }
}

module.exports = Product;
