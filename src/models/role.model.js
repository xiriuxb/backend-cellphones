import { DataTypes } from "sequelize";
import sequelizePg from "../db/db.service.js";

const Role = sequelizePg.define(
  "Role",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    created_by: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    updated_by: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    hooks: {
      afterSync: () => {
        Role.bulkCreate(
          [
            { id: "9b5f5c4d-96b5-4fc2-b162-815db2914626", name: "admin", description: "Normal admin" },
            { id: "d4494a42-dfd9-45e1-a1fd-b1eee629521c", name: "user", description: "Normal user" },
          ],
          { ignoreDuplicates: true }
        );
      },
    },
  }
);

export default Role;
