const ProductsController = require("../../controllers/ProductsController");

function getAllProducts(ctx){

    ctx.data = ProductsController.index(ctx.postgresDb, ctx.request.body);
}

function getProductById(ctx){

    tx.data = ProductsController.get(ctx.postgresDb, ctx.request.params.id);
}

module.exports = function (router)
{
  router.get("/products", getAllProducts);

  router.get("/products/:id", getProductById);

  return router;
};