module.exports = function(sequelize, DataTypes) {
    return sequelize.define('users', {
      EmailId: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true
      },
      Password: {
        type: DataTypes.STRING(50),
        allowNull: false
      }
    }, {
      tableName: 'users'
    });
  };