import { Sequelize } from "sequelize";
import { configPgDb } from "../config/db.config.js";

const sequelizePg = new Sequelize(configPgDb.url, {
  logging: false,
  native: false,
  dialect: "postgres",
  dialectOptions: {
    ssl: configPgDb.ssl,
  },
});

export const initPgDb = async () => {
  try {
    await sequelizePg.authenticate();
    return await sequelizePg.sync({ force: false });
  } catch (error) {
    console.log(error);
  }
};
export default sequelizePg;