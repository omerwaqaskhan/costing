#!/bin/bash

# Stop and remove containers, networks, and volumes defined in docker-compose-dev.yml
echo "Stopping and removing containers, networks, and volumes..."
docker-compose -f docker-compose-dev.yml down --volumes --rmi all

# Remove all Docker containers, images, volumes, and networks (optional but thorough)
echo "Removing all Docker containers, images, volumes, and networks..."
docker rm -f $(docker ps -aq) 2>/dev/null || true
docker rmi -f $(docker images -aq) 2>/dev/null || true
docker volume rm $(docker volume ls -q) 2>/dev/null || true
docker network rm $(docker network ls -q) 2>/dev/null || true

# Prune Docker system (optional but recommended for a clean slate)
echo "Pruning Docker system..."
docker system prune -a --volumes -f

# Rebuild and start fresh
echo "Rebuilding and starting fresh..."
docker-compose -f docker-compose-dev.yml up --build