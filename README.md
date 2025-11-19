# Kafka 

Exploring event-driven Saga pattern (Choreography) architecture using 3-broker Kafka cluster running in KRaft mode.

# Micro Services

Spin the Kafka server, backennd micro services, backend.

### Kafka Cluster

Start Kafka cluster and Kafka UI

```sh
cd kafka
docker compose up

# 3 Kafka broker containers + 1 kafka-ui

# broker-1 at 9092
# broker-2 at 9093
# broker-3 at 9094
# kafka-ui at 8080
```

See: [docker-compose.yml](./kafka/docker-compose.yml)

3 types of listeners:

| Listener       | Purpose                              | Example Port                           |
| -------------- | ------------------------------------ | -------------------------------------- |
| **INTERNAL**   | Container-to-container communication | 9092                                   |
| **EXTERNAL**   | Host machine → Kafka                 | 29092 (mapped to different host ports) |
| **CONTROLLER** | KRaft controller traffic             | 9093                                   |


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