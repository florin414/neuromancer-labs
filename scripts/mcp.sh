#!/bin/bash
killall gpg-agent
docker rm -f 723b15c16c68

GREEN='\033[0;32m'
NC='\033[0m' 

echo -e "${GREEN}Start Postgresql Bridge...${NC}"

docker compose \
  -f modules/02-mcp-neural-bridge/docker-compose.yml \
  --env-file .env \
  up -d

echo -e "${GREEN}The database is up and running!${NC}"