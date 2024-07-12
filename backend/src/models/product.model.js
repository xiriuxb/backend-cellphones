import { DataTypes } from "sequelize";
import sequelizePg from "../db/db.service.js";

const Product = sequelizePg.define(
  "Product",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING(512),
      allowNull: false,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    created_by: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    updated_by: {
      type: DataTypes.UUID,
      allowNull: true,
    }
  },
  {
    timestamps: true,
  }
);
export default Product;
