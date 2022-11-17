const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        userId: {
          type: Sequelize.STRING(64),
          unique: true,
          allowNull: false,
        },

        userPw: {
          type: Sequelize.STRING(64),
          allowNull: false,
        },
        userName: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        userYyyy: {
          type: Sequelize.STRING(10),
          allowNull: false,
        },
        userMm: {
          type: Sequelize.STRING(10),
          allowNull: false,
        },
        userDd: {
          type: Sequelize.STRING(10),
          allowNull: false,
        },
        userGender: {
          type: Sequelize.STRING(32),
          allowNull: false,
        },
        userEmail: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        userPhonenum: {
          type: Sequelize.STRING(32),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        paranoid: false,
        modelName: "User",
        tableName: "user",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {}
};
