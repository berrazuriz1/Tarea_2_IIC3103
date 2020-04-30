const KoaRouter = require('koa-router');

const router = new KoaRouter();

function apiUrl(ctx, ...params) {
  return `${ctx.origin}${ctx.router.url(...params)}`;
}

async function hamburguerResponse(ctx, hamburguer){
  var hamburguerJson = hamburguer.toJSON()
  delete hamburguerJson["updatedAt"];
  delete hamburguerJson["createdAt"];
  var ingredientes = await hamburguer.getIngredients();
  hamburguerJson['ingredientes'] = ingredientes.map((curr) =>
    apiUrl(ctx, 'ingrediente.get', curr.id)
    );
  return hamburguerJson;
}

router.post('hamburguesa.create', '/', async (ctx) => {
  const hamburguer = await ctx.orm.Hamburguer.build(ctx.request.body);
  try{
    await hamburguer.save();
    var hamburguerJson = await hamburguerResponse(ctx, hamburguer);
    ctx.status = 201;
    ctx.body = hamburguerJson;
  }
  catch (validationError){
    ctx.throw(400, validationError.errors[0]);
  }
});

router.get('hamburguesa.list', '/', async (ctx) => {
  var hamburguesas = await ctx.orm.Hamburguer.findAll();
  hamburguesas = await Promise.all(hamburguesas.map(async function(x) {
    var hamburguerJson = hamburguerResponse(ctx, x);
    return hamburguerJson
  }));
  ctx.body = hamburguesas;
});

router.get('hamburguesa.get', '/:id', async (ctx) => {
  ctx.assert(!isNaN(parseInt(ctx.params.id)), 400, "id invalido");
  var hamburguesa = await ctx.orm.Hamburguer.findByPk(ctx.params.id);
  if (hamburguesa){
    ctx.body = await hamburguerResponse(ctx, hamburguesa);
  }
  else{
    ctx.throw(404, 'Hamburguesa inexistente');
  }
});

router.patch('hamburguesa.update', '/:id', async (ctx) => {
  ctx.assert(!isNaN(parseInt(ctx.params.id)), 400, "id invalido");
  var hamburguesa = await ctx.orm.Hamburguer.findByPk(ctx.params.id);
  if (hamburguesa){
    try{
      const { nombre, precio, descripcion, imagen } = ctx.request.body;
      await hamburguesa.update({ nombre, precio, descripcion, imagen })
      var hamburguerJson = await hamburguerResponse(ctx,hamburguesa);
      ctx.body = hamburguerJson;
    }
    catch (validationError){
      ctx.throw(400, validationError.errors[0]);
    }
  }
  else{
    ctx.throw(404, 'Hamburguesa inexistente');
  }
});

router.put('hamburguesa.addIngredient', '/:hamburguerid/ingrediente/:ingredientid', async (ctx) => {
  ctx.assert(!isNaN(parseInt(ctx.params.hamburguerid)), 400, "Hamburguesa id invalido");
  ctx.assert(!isNaN(parseInt(ctx.params.ingredientid)), 400, "Ingrediente id invalido");
  var hamburguesa = await ctx.orm.Hamburguer.findByPk(ctx.params.hamburguerid);
  var ingrediente = await ctx.orm.Ingredient.findByPk(ctx.params.ingredientid);
  if (hamburguesa){
    if (ingrediente){
      await hamburguesa.addIngredient(ingrediente);
      var hamburguerJson = await hamburguerResponse(ctx, hamburguesa);
      ctx.status = 201;
      ctx.body = hamburguerJson;
    }
    else{
      ctx.throw(404, "Ingrediente inexistente");
    }
  }
  else{
    ctx.throw(400, 'Id de hamburguesa inválido');
  }
});

router.del('hamburguesa.deleteIngredient', '/:hamburguerid/ingrediente/:ingredientid', async (ctx) => {
  ctx.assert(!isNaN(parseInt(ctx.params.hamburguerid)), 400, "Hamburguesa id invalido");
  ctx.assert(!isNaN(parseInt(ctx.params.ingredientid)), 400, "Ingrediente id invalido");
  var hamburguesa = await ctx.orm.Hamburguer.findByPk(ctx.params.hamburguerid);
  var ingrediente = await ctx.orm.Ingredient.findByPk(ctx.params.ingredientid);
  if (hamburguesa){
    if (await hamburguesa.hasIngredient(ingrediente)){
      await hamburguesa.removeIngredient(ingrediente);
      ctx.status = 200;
      ctx.body = "Ingrediente retirado";
    }
    else{
      ctx.throw(404, "Ingrediente inexistente");
    }
  }
  else{
    ctx.throw(400, 'Id de hamburguesa inválido');
  }
});

router.del('hamburguesa.delete', '/:id', async (ctx) => {
  ctx.assert(!isNaN(parseInt(ctx.params.id)), 400, "id invalido");
  const hamburguesa = await ctx.orm.Hamburguer.findByPk(ctx.params.id);
  if (hamburguesa){
    await hamburguesa.destroy();
    ctx.throw(200, 'Hamburguesa eliminada');
  }
  else{
    ctx.throw(404, 'Hamburguesa inexistente');
  }
});


module.exports = router;
