import { DataTypes } from "sequelize";
import sequelizePg from "../db/db.service.js";

const User = sequelizePg
  .define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
    },
    { timestamps: true }
  )

export default User;
