import Brand from "./brand.model.js";
import ProductType from "./product-type.model.js";
import Product from "./product.model.js";
import RoleUser from "./role-user.model.js";
import Role from "./role.model.js";
import User from "./user.model.js";
import SpecifictionType from "./specification-types.model.js";
import ProductSpecification from "./product-specification.model.js";

const initModels = () => {
  Role.hasMany(RoleUser, { foreignKey: { name: "role_id" } });
  RoleUser.belongsTo(Role, { foreignKey: { name: "role_id" } });
  ProductType.hasMany(Product, { foreignKey: { name: "product_type_id" } });
  Product.belongsTo(ProductType, { foreignKey: { name: "product_type_id" } });
  Brand.hasMany(Product, { foreignKey: { name: "brand_id" } });
  Product.belongsTo(Brand, { foreignKey: { name: "brand_id" } });
  SpecifictionType.hasMany(ProductSpecification, { foreignKey: { name: "specification_type_id" } });
  ProductSpecification.belongsTo(SpecifictionType, { foreignKey: { name: "specification_type_id" } });
  Product.hasMany(ProductSpecification, { foreignKey: { name: "product_id" } });
  // ProductSpecification.belongsTo(Product, { foreignKey: { name: "product_id" } });
};

export default initModels;
