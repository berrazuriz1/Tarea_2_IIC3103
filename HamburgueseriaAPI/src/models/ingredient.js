module.exports = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define('Ingredient', {
    nombre:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "El campo nombre no fue incorporado a la request",
        },
        notEmpty: {
          args: true,
          msg: "El nombre de la hamburguesa no puede estar vacio",
        },
      },
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "El campo descripcion no fue incorporado a la request",
        },
        notEmpty: {
          args: true,
          msg: "La descripcion de la hamburguesa no puede estar vacio",
        },
      },
    },
  }, {});

  Ingredient.associate = function associate(models) {
    // associations can be defined here. This method receives a models parameter.
    Ingredient.belongsToMany(models.Hamburguer, { through: models.HamburguerIngredient, as: 'hamburguers'});
  };

  return Ingredient;
};
