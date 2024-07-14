import { DataTypes } from "sequelize";
import sequelizePg from "../db/db.service.js";
import { bulkCreateProductTypes } from "../product-type/product-type.service.js";
import productTypesExamples from "../product-type/product-type.examples.js";

const ProductType = sequelizePg.define(
  "ProductType",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(24),
      allowNull: false,
      unique: true,
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
      afterSync: async() => {
        try {
          const typesCount = await ProductType.count();
          if(!typesCount){
            await bulkCreateProductTypes(productTypesExamples);
          }
        } catch (error) {
          console.log("Error creating productTypes\n", error);
        }
      },
    },
  }
);

export default ProductType;