const KoaRouter = require('koa-router');

const router = new KoaRouter();

async function ingredientResponse(ingredient){
  var ingredientJson = ingredient.toJSON()
  delete ingredientJson["updatedAt"];
  delete ingredientJson["createdAt"];
  return ingredientJson;
}

router.post('ingrediente.create', '/', async (ctx) => {
  const ingredient = await ctx.orm.Ingredient.build(ctx.request.body);
  try{
    await ingredient.save();
    var ingredientJson = await ingredientResponse(ingredient);
    ctx.status = 201;
    ctx.body = ingredientJson;
  }
  catch (validationError){
    ctx.throw(400, validationError.errors[0]);
  }
});

router.get('ingrediente.list', '/', async (ctx) => {
  var ingredientes = await ctx.orm.Ingredient.findAll();
  ingredientes = await Promise.all(ingredientes.map(async function(x) {
    var ingredientJson = ingredientResponse(x);
    return ingredientJson
  }));
  ctx.body = ingredientes;
});

router.get('ingrediente.get', '/:id', async (ctx) => {
  ctx.assert(!isNaN(parseInt(ctx.params.id)), 400, "id invalido");
  var ingrediente = await ctx.orm.Ingredient.findByPk(ctx.params.id);
  if (ingrediente){
    ctx.body = await ingredientResponse(ingrediente);
  }
  else{
    ctx.throw(404, 'Hamburguesa inexistente');
  }
});

router.patch('ingrediente.update', '/:id', async (ctx) => {
  ctx.assert(!isNaN(parseInt(ctx.params.id)), 400, "id invalido");
  var ingrediente = await ctx.orm.Ingredient.findByPk(ctx.params.id);
  if (ingrediente){
    try{
      const { nombre, descripcion } = ctx.request.body;
      await ingrediente.update({ nombre, descripcion})
      var ingredientJson = await ingredientResponse(ingrediente);
      ctx.body = ingredientJson;
    }
    catch (validationError){
      ctx.throw(400, validationError.errors[0]);
    }
  }
  else{
    ctx.throw(404, 'Ingrediente inexistente');
  }
});

router.del('ingrediente.delete', '/:id', async (ctx) => {
  ctx.assert(!isNaN(parseInt(ctx.params.id)), 400, "id invalido");
  const ingrediente = await ctx.orm.Ingredient.findByPk(ctx.params.id);
  if (ingrediente){
    if(await ingrediente.countHamburguers() > 0){
      ctx.throw(409, 'Ingrediente no se puede borrar, se encuentra presente en una hamburguesa');
    }
    else{
      //await ingrediente.destroy();
      ctx.throw(200, 'Ingrediente eliminado');
    }
  }
  else{
    ctx.throw(404, 'Ingrediente inexistente');
  }
});


module.exports = router;
