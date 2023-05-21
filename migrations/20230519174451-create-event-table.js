"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("event", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nama: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      kota: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT({ length: "long" }),
      },
      genre: {
        allowNull: false,
        type: Sequelize.ENUM(
          "olahraga",
          "kuliner",
          "budaya",
          "pameran",
          "konser",
          "other"
        ),
      },
      tanggal: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      waktu: {
        allowNull: false,
        type: Sequelize.TIME,
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("event");
  },
};
