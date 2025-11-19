import { Kafka } from "kafkajs";

// Initialize Kafka client
const kafka = new Kafka({
  clientId: 'topic-admin-host',
  brokers: [
    'localhost:9092',
    'localhost:9093',
    'localhost:9094'
  ],
  requestTimeout: 30000,
});

const TOPICS_TO_CREATE = [{
  topic: "payment-successful",
  numPartitions: 3,
  replicationFactor: 3,
  configEntries: [
    { name: 'retention.ms', value: '604800000' } // 7 days retention
  ]
}, {
  topic: "order-successful",
  numPartitions: 3,
  replicationFactor: 3,
  configEntries: [
    { name: 'retention.ms', value: '604800000' } // 7 days retention
  ]
}, {
  topic: "email-successful",
  numPartitions: 3,
  replicationFactor: 3,
  configEntries: [
    { name: 'retention.ms', value: '604800000' } // 7 days retention
  ]
}];

const run = async () => {
  const admin = kafka.admin();

  try {
    await admin.connect();
    console.log('Admin client connected successfully.');

    // Check if topics already exist before creating
    const existingTopics = await admin.listTopics();

    const topicsToCreate = TOPICS_TO_CREATE.filter(
      (topic) => !existingTopics.includes(topic.topic)
    );

    if (topicsToCreate.length === 0) {
      console.log('All required topics already exist. Exiting.');
      return;
    }

    console.log(`Attempting to create ${topicsToCreate.length} topic(s)...`);

    const result = await admin.createTopics({
      // Wait for all replicas to be in sync (ISR)
      waitForLeaders: true,
      topics: topicsToCreate,
      timeout: 15000
    });

    if (result) {
      topicsToCreate.forEach(t => console.log(`\u2714 Topic "${t.topic}" created successfully.`));
    } else {
      console.error('Topic creation failed.');
    }

  } catch (error) {
    console.error(`Error connecting or creating topics: ${error.message}`);
    // If connection fails, it often means the Kafka server is unavailable or advertised listeners are incorrect.
    console.error('Please ensure your Kafka cluster is running and your broker configuration (EXTERNAL listeners) is correct.');
  } finally {
    await admin.disconnect();
    console.log('Admin client disconnected.');
  }
};

run().catch(console.error);
