# Kafka 

Kafka Sap pattern example

# Micro Services

Spin the Kafka server, backennd micro services, backend.

### Kafka Container

Start Kafka cluster and Kafka UI

```sh
cd kafka
docker compose up

# broker-1 at 9092
# broker-2 at 9092
# broker-2 at 9093
# kafka-ui at 8080
```

See: [docker-compose.yml](./kafka/docker-compose.yml)

Kafka UI at: http://localhost:8080

### micro services

go to `analytic-service`, `order-service`, `email-service`, `payment-service` directories and run each service examples

```sh
npm install
node index.js
```

### frontend 

```
cd client
npm install
npm run dev
```