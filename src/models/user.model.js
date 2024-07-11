import { DataTypes } from "sequelize";
import sequelizePg from "../db/db.service.js";
import { createUser } from "../user/user.service.js";

const User = sequelizePg.define(
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
  {
    timestamps: true,
    hooks: {
      afterSync: () => {
        createUser({
          id: "ef2a6fd5-7b5b-4519-87d3-5f961e2597b8",
          email: "admin@bussiness.com",
          password: "12345678",
        })
          .then()
          .catch(() => {
            console.log("Error creating default user or already created");
          });
      },
    },
  }
);

export default User;
