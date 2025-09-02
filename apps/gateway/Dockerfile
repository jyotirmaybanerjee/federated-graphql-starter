FROM alpine:latest

WORKDIR /app

# Install router
RUN apk add curl bash
RUN curl -sSL https://router.apollo.dev/download/nix/latest | bash
RUN mv router /usr/local/bin/

# Copy config and composed supergraph
COPY router.yaml supergraph.graphql ./

CMD ["router", "--config", "router.yaml"]
