export const configPgDb = {
  url:
    process.env.DB_PG_URL ||
    "postgresql://postgresa:password@localhost:5432/database",
  ssl: process.env.DB_PG_SSL === "true" ? { require: true } : false,
};
