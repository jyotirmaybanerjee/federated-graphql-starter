# federated graph with CI/CD for individual graphs

## Purpose:
 - Build a federated GraphQL architecture using Apollo Federation.
 - Enable independent CI/CD pipelines for each subgraph (e.g., users, products, orders).
 - Automatically update the supergraph schema upon subgraph deployments.

🧩 Architecture Overview
🧱 Components
| Component                           | Description                                                                           |
| ----------------------------------- | ------------------------------------------------------------------------------------- |
| **Subgraphs**                       | Individual services with their own GraphQL schemas (e.g., `users`, `products`).       |
| **Gateway**                         | Apollo Router or Apollo Gateway that composes all subgraphs into a single supergraph. |
| **Apollo Studio / Schema Registry** | For schema management and composition.                                                |
| **CI/CD Pipelines**                 | For each subgraph and optionally for the gateway.                                     |


```bash
mkdir federated-graphql-starter
cd federated-graphql-starter
pnpm init

mkdir gateway users products scripts
```

Add a pnpm-workspace.yaml:

```yaml
packages:
  - "gateway"
  - "subgraphs/*"

```

```bash
# Terminal 1
curl -sSL https://router.apollo.dev/download/nix/latest | sh
sudo mv ./router /usr/local/bin/
router --version
npm install -g @apollo/rover
```

```bash
# Terminal 2
cd users
npm init -y
npm install @apollo/server graphql @apollo/subgraph express cors body-parser graphql-tag
npm install --save-dev typescript ts-node nodemon @types/node @types/express
npx tsc --init
npm install
npm run dev
```

```bash
# Terminal 3
cd products
npm init -y
npm install @apollo/server graphql @apollo/subgraph express cors body-parser graphql-tag
npm install --save-dev typescript ts-node nodemon @types/node @types/express
npx tsc --init
npm install
npm run dev 
```

```bash
# Terminal 1
rover subgraph introspect http://localhost:4001/graphql > users/schema.graphql
rover subgraph introspect http://localhost:4002/graphql > products/schema.graphql

cd gateway
rover supergraph compose --config supergraph.yaml > supergraph.graphql
# Or
rover supergraph compose --config supergraph.yaml --elv2-license=accept > supergraph.graphql
cd ..
```


## 🔄 CI/CD Pipeline for Subgraphs

### Each subgraph has its own CI/CD pipeline, which:

 - Runs tests & linting.
 - Builds and deploys the service.
 - Publishes its schema to Apollo Studio.

 ## 📡 Apollo Studio + Schema Registry

#### Use Apollo Studio
 - for managing subgraph schemas and composing the supergraph.

You use `rover subgraph publish` in CI to publish updates. Apollo Studio then handles:

 - Schema validation
 - Supergraph composition
 - Updating the router via Apollo Uplink (if enabled)

```bash
rover subgraph publish
```

## CI/CD for Router (Supergraph Update)

You may want a job that regularly fetches the latest supergraph (if not using Apollo Uplink):

```bash
rover supergraph fetch my-graph@current > supergraph.graphql
```

Use this schema in the router's config to hot-reload.

## 🧪 Local Development Setup

You can use Apollo Workbench
 or rover dev for local composition/testing.

```bash
rover dev --supergraph-config ./supergraph.yaml
```

