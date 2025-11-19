# Kafka cluster 

### Cluster
A 3-node Kafka cluster using KRaft (controller + broker roles on each node) \

Each container:
- Runs Apache Kafka in KRaft mode
Acts as both:
- Controller (managing metadata, leader elections)
- Broker (storing topics + partitions)

See: [docker-compose.yml](./kafka/docker-compose.yml)

## Listeners

| Listener       | Purpose                              | Example Port                           |
| -------------- | ------------------------------------ | -------------------------------------- |
| **INTERNAL**   | Container-to-container communication | 9092                                   |
| **EXTERNAL**   | Host machine → Kafka                 | 29092 (mapped to different host ports) |
| **CONTROLLER** | KRaft controller traffic             | 9093                                   |


### Advertised listeners

inside Docker: `INTERNAL://kafka-broker-x:9092` \
outside Docker: `EXTERNAL://localhost:9092/9093/9094`

This cluster supports connecting:

- From inside Docker → internal DNS (kafka-broker-1)
- From your host → localhost ports