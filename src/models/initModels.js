import Product from "./product.model.js";
import RoleUser from "./role-user.model.js";
import Role from "./role.model.js";
import User from "./user.model.js";

const initModels = () => {
  Role.hasMany(RoleUser, { foreignKey: { name: "role_id" } });
  RoleUser.belongsTo(Role);
};

export default initModels;
