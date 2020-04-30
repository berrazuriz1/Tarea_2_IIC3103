module.exports = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define('Ingredient', {
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
  }, {});

  Ingredient.associate = function associate(models) {
    // associations can be defined here. This method receives a models parameter.
    Ingredient.belongsToMany(models.Hamburguer, { through: models.HamburguerIngredient, as: 'hamburguers'});
  };

  return Ingredient;
};
