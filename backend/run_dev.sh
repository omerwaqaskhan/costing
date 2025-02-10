#!/bin/bash

# Run the Python script to wait for PostgreSQL to be available
# python check_postgres_dev.py

# Apply Django migrations
python manage.py makemigrations
python manage.py migrate

# Start the Django development server
python manage.py runserver 0.0.0.0:80