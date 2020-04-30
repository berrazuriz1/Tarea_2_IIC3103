module.exports = (sequelize, DataTypes) => {
  const Hamburguer = sequelize.define('Hamburguer', {
    nombre: {
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
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "El campo precio no fue incorporado a la request",
        },
        notEmpty: {
          args: true,
          msg: "El precio de la hamburguesa no puede estar vacio",
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
    imagen: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "El campo imagen no fue incorporado a la request",
        },
        notEmpty: {
          args: true,
          msg: "La imagen de la hamburguesa no puede estar vacio",
        },
      },
    },
  }, {});

  Hamburguer.associate = function associate(models) {
    // associations can be defined here. This method receives a models parameter.
    Hamburguer.belongsToMany(models.Ingredient, { through: models.HamburguerIngredient, as: 'ingredients' });
  };

  return Hamburguer;
};
