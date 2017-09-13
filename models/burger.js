module.exports = (sequelize, DataTypes) => {
  let Burger = sequelize.define('burger', {
    devoured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    burger_name: {
      type: DataTypes.STRING,
      defaultValue: "Anonymous"
    },
    bun: {
      type: DataTypes.STRING,
      defaultValue: "Sesame-Seed"
    },
    patty: {
      type: DataTypes.STRING,
      defaultValue: "Beef"
    },
    pickles: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    ketchup: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    mustard: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    onions: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    cheese: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    tomato: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    bacon: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    lettuce: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    special: {
      type: DataTypes.STRING,
      defaultValue: null
    }
  })
  return Burger;
};
