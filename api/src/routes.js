import express from "express";
import kafkajs from "kafkajs";

const routes = express.Router();

routes.post("/certifications", async (req, res) => {
  const message = {
    user: {
      id: 1,
      name: "Takai Ohashi",
    },
    course: "Kafka com Node.js - with GZIP",
    grade: 5,
  };

  // Chamar micro serviço;
  await req.producer.send({
    topic: "issue-certificate",
    compression: kafkajs.CompressionTypes.GZIP,
    messages: [
      {
        value: JSON.stringify(message),
      },
    ],
  });

  return res.json({ ok: true });
});

export default routes;
