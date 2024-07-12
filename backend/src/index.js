import 'dotenv/config'
import express from "express";
import { initPgDb } from './db/db.service.js';
import apiRouter from './routes.js';
import cookieParser from 'cookie-parser';
import initModels from './models/initModels.js';
import { serve, setup } from 'swagger-ui-express';
import { swaggerSpecs } from './zwagger/config.swagger.js';

await initPgDb();
initModels();

const app = express();
const port = 3000;

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  "/api-docs",
  serve,
  setup(swaggerSpecs)
);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});