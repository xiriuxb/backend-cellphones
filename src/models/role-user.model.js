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
      allowNull: true,
    },
  },
  {
    timestamps: true,
    hooks: {
      afterSync: () => {
        RoleUser.create(
          {
            role_id: "9b5f5c4d-96b5-4fc2-b162-815db2914626",
            user_id: "ef2a6fd5-7b5b-4519-87d3-5f961e2597b8",
          },
          { ignoreDuplicates: true }
        )
          .then()
          .catch(() => {
            console.log("Error asigning role to default user");
          });
      },
    },
  }
);

export default RoleUser;
