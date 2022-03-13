import express from "express";
import kafkajs, { logLevel } from "kafkajs";

import routes from "./routes.js";

const app = express();

const port = 3000;

/**
 * Faz conexão com o Kafka
 */
const kafka = new kafkajs.Kafka({
  clientId: "api",
  brokers: ["localhost:9092"],
  logLevel: logLevel.WARN,
  retry: {
      initialRetryTime: 300,
      retries: 10
  }
});

const producer = kafka.producer();

/**
 * Disponibiliza o producer para todas as rotas
 */
app.use((req, res, next) => {
  req.producer = producer;

  return next();
});

/**
 * Cadastra as rotas da aplicação
 */
app.use(routes);

async function run() {
  await producer.connect();

  app.listen(port, () => console.log(`Server running on port: ${port}`));
}

run().catch(console.error);
