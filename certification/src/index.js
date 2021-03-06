import kafkajs, { logLevel } from "kafkajs";

const kafka = new kafkajs.Kafka({
  brokers: ["localhost:9092"],
  clientId: "certificate",
  logLevel: logLevel.NOTHING,
});

const topic = "issue-certificate";

const consumer = kafka.consumer({ groupId: "certificate-group" });

async function run() {
  await consumer.connect();
  await consumer.subscribe({ topic });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`;
      console.log(`- ${prefix} ${message.key}#${message.value}`);
    },
  });
}

run().catch(console.error);
