FROM mcr.microsoft.com/devcontainers/javascript-node:18

# Install global tools
RUN npm install -g pnpm \
    && npm install -g eslint prettier \
    && npm install -g typescript ts-node \
    && npm install -g expo-cli \
    && npm install -g @githubnext/github-copilot-cli

# Install security tools
RUN apt-get update && apt-get install -y \
    nano \
    curl \
    git \
    openssh-client \
    && rm -rf /var/lib/apt/lists/*
