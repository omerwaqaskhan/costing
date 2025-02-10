import os
import environ

# Import everything from local.py
from .local import *  # This brings in all settings from local.py

# Initialize environment
env = environ.Env()

# Specify the .env file path for production environment
env_file = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), 'secs-env', 'production.env')
env.read_env(env_file)

# Overwrite settings for production
DEBUG = env.bool("DEBUG", default=False)  # Ensure DEBUG is False in production

# Update DATABASE_URL or any other settings specific to production
DATABASE_URL = env("DATABASE_URL")

print(f"Environment: {env_type}")
print(f"Database URL: {DATABASE_URL}")
print(f"Debug Mode: {DEBUG}")

# Example of production-specific installed apps or middleware
INSTALLED_APPS += [
    # Add production-specific apps here
]

MIDDLEWARE += [
    # Add production-specific middleware here
]

# Example of sensitive settings for production
ALLOWED_HOSTS = env.list("ALLOWED_HOSTS", default=["https://www.ampham.com", "https://ampham.com"])
