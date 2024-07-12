import { DataTypes } from "sequelize";
import sequelizePg from "../db/db.service.js";
import { bulkCreateBrands } from "../brand/brand.service.js";
import brandExamples from "../brand/brand.examples.js";

const Brand = sequelizePg.define(
  "Brand",
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
    description: {
      type: DataTypes.STRING(128),
      allowNull: true,
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
          const brandsCount = await Brand.count();
          if(!brandsCount){
            await bulkCreateBrands(brandExamples);
          }
        } catch (error) {
          console.log("Error creating brands\n", error);
        }
      },
    },
  }
);

export default Brand;
