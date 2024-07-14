import { DataTypes } from "sequelize";
import sequelizePg from "../db/db.service.js";
import { bulkCreateSpecifictionTypes } from "../specification-type/specification-type.service.js";
import specificationTypesExample from "../specification-type/specification-type.examples.js";

const SpecificationType = sequelizePg.define(
  "SpecificationType",
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
      type: DataTypes.STRING(64),
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
      afterSync: async () => {
        try {
          const typesCount = await SpecificationType.count();
          if (!typesCount) {
            await bulkCreateSpecifictionTypes(specificationTypesExample);
          }
        } catch (error) {
          console.log("Error creating specification_types\n", error);
        }
      },
    },
  }
);

export default SpecificationType;
