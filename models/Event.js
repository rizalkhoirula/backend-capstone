module.exports = (sequelize, DataTypes) => {
  const event = sequelize.define(
    "event",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        initialAutoIncrement: 879283,
      },

      nama: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      kota: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT({ length: "long" }),
      },
      genre: {
        allowNull: false,
        type: DataTypes.ENUM(
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
        type: DataTypes.DATEONLY,
      },
      waktu: {
        allowNull: false,
        type: DataTypes.TIME,
      },
      eventimages: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "event",
    }
  );
  return event;
};
