import { DataTypes } from "sequelize";
import sequelizePg from "../db/db.service.js";

const Product = sequelizePg.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
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
      allowNull: true,
    },
    product_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    brand_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  }
);
export default Product;

const newProduct = {
  name: "iPhone 5",
  description: "Old iPhone",
  type_id: 1,
  specifications: [
    {
      specification_id: 1,
      value: "1Gb",
    },
    {
      specification_id: 2,
      value: "2Gb",
    },
  ],
};
