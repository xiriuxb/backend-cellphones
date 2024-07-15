import 'dotenv/config'
import express from "express";
import cors from "cors";
import { initPgDb } from './db/db.service.js';
import apiRouter from './routes.js';
import cookieParser from 'cookie-parser';
import initModels from './models/initModels.js';
import { serve, setup } from 'swagger-ui-express';
import { swaggerSpecs } from './zwagger/config.swagger.js';
import serverConfig from './config/server.config.js';

initModels();
await initPgDb();

const app = express();
const port = 3000;

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  origin: serverConfig.frontUrl,
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
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
