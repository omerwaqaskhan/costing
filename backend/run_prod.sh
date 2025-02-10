#!/bin/bash

# Exit on any error
set -e

# Wait for PostgreSQL to be available
python check_postgres_prod.py

# Collect static files (if applicable)
python manage.py collectstatic --noinput

# Apply Django migrations
python manage.py makemigrations --noinput
python manage.py migrate --noinput

# Start Uvicorn (Django ASGI server)
uvicorn your_project_name.asgi:application --host 0.0.0.0 --port 8000 --workers 4