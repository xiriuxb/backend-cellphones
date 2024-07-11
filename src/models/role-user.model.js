import { DataTypes } from "sequelize";
import sequelizePg from "../db/db.service.js";

const RoleUser = sequelizePg.define(
  "RoleUser",
  {
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    updated_by: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

export default RoleUser;
