# federated graph with CI/CD for individual graphs

[![codecov](https://codecov.io/gh/jyotirmaybanerjee/federated-graphql-starter/branch/main/graph/badge.svg?token=a9c9ae63-f3c3-4fe8-ac8d-bc383cc5d036)](https://codecov.io/gh/yourusername/yourrepo) [![GitHub Actions Workflow Status][check-workflow-badge]][check-workflow-badge-link] [![GitHub License][github-license-badge]][github-license-badge-link] [![GitHub contributors][github-contributors-badge]][github-contributors-badge-link] [![jyotirmaybanerjee][made-by-jyotirmaybanerjee-badge]][made-by-jyotirmaybanerjee-badge-link]

This is a boilerplate monorepo for building a federated GraphQL architecture with Apollo Federation using TurboRepo. It includes:

- Multiple subgraph services (`users`, `products`)
- Apollo Router as the gateway
- Shared packages for ESLint, TypeScript config, and Vitest config
- CI/CD workflows for testing, linting, type-checking, and schema publishing
- Docker & Docker Compose setup for easy local development and deployment

---

## Table of Contents

- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Development](#development)
- [Testing](#testing)
- [Linting](#linting)
- [Type Checking](#type-checking)
- [Building](#building)
- [Schema Composition](#schema-composition)
- [Running the Gateway](#running-the-gateway)
- [Docker](#docker)
- [CI/CD](#cicd)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Architecture

- **Subgraphs:** Independent GraphQL services with their own schemas (Users, Products).
- **Gateway:** Apollo Router composes subgraph schemas into a supergraph and routes requests.
- **Monorepo:** Managed by [TurboRepo](https://turbo.build/), enabling fast builds and caching.
- **Shared Packages:** ESLint, TypeScript, and Vitest configurations shared across all apps.

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- [pnpm](https://pnpm.io/) package manager
- Docker (optional, for containerized development)
- Apollo CLI tools (`rover`, `router`) installed globally

```bash
# Install pnpm globally if you haven't
npm install -g pnpm
pnpm install
```

## Development

Run all apps concurrently (subgraphs + gateway):

```
pnpm run start:all
```

Run an individual app (e.g., products):
```
pnpm --filter=products dev
```

## Testing

Run tests across all apps/packages:

```
pnpm run test
```

## Linting

Run ESLint on all codebases:

```
pnpm run lint
```

## Type Checking

Run TypeScript type checking:

```
pnpm run typecheck
```

## Building

Build all apps/packages:

```
pnpm run build
```

## Schema Composition

Before running the Apollo Router gateway, you must compose the supergraph schema:

```
rover supergraph compose --config apps/gateway/supergraph.yaml > apps/gateway/supergraph.graphql
```

## Running the Gateway

Start the Apollo Router gateway with the composed schema:

```
cd apps/gateway
router --supergraph supergraph.graphql
```

## Docker
#### Build and start containers

```
docker-compose up --build
```

#### Stop containers

```
docker-compose down
```

## CI/CD

The project includes GitHub Actions workflows to:

 - Run lint, test, and typecheck stages on every push
 - Publish the composed schema to Apollo Studio
 - Build and push Docker images

Make sure to configure the following secrets in your GitHub repository:

 - APOLLO_KEY — Apollo Studio API key
 - DOCKER_USERNAME and DOCKER_PASSWORD — for Docker Hub pushes (optional)


## Folder Structure

```
.
├── apps
│   ├── gateway         # Apollo Router gateway service
│   ├── products        # Products subgraph service
│   └── users           # Users subgraph service
├── packages            # Shared configs and utilities
│   ├── eslint-config
│   ├── typescript-config
│   ├── vitest-config
│   └── shared          # Shared code (e.g. logger)
├── .github             # GitHub Actions workflows
├── docker-compose.yml
├── pnpm-workspace.yaml
├── turbo.json          # TurboRepo configuration
└── README.md
```

## Contributing

Contributions are welcome! Please open issues or pull requests to help improve the project.

## License

MIT License © Jyotirmay Banerjee


------------------------------------------------

If you have any questions or need help, feel free to reach out!



[check-workflow-badge]: https://img.shields.io/github/actions/workflow/status/jyotirmaybanerjee/ai-suite/check.yml?label=check
[github-license-badge]: https://img.shields.io/github/license/jyotirmaybanerjee/ai-suite?link=https%3A%2F%2Fgithub.com%2Fjyotirmaybanerjee%2Fai-suite%2Fblob%2Fmain%2FLICENSE
[github-contributors-badge]: https://img.shields.io/github/contributors/jyotirmaybanerjee/ai-suite?link=https%3A%2F%2Fgithub.com%2Fjyotirmaybanerjee%2Fai-suite%2Fgraphs%2Fcontributors
[made-by-jyotirmaybanerjee-badge]: https://img.shields.io/badge/made_by-jyotirmaybanerjee-blue?color=FF782B&link=https://jyotirmaybanerjee.com/

[check-workflow-badge-link]: https://github.com/jyotirmaybanerjee/federated-graphql-starter/actions/workflows/check.yml
[github-license-badge-link]: https://github.com/jyotirmaybanerjee/federated-graphql-starter/blob/main/LICENSE
[github-contributors-badge-link]: https://github.com/jyotirmaybanerjee/federated-graphql-starter/graphs/contributors
[made-by-jyotirmaybanerjee-badge-link]: https://jyotirmaybanerjee.com/?utm_source=nextenterprise&utm_medium=github