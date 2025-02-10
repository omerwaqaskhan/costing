import os
import sys
import time
import psycopg2
from django.conf import settings

# Set the correct Django settings module for your structure
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "api.settings.local")

# Initialize Django
import django
django.setup()  # Now settings will load from API/settings/local.py

def wait_for_postgres():
    max_retries = 5
    retry_delay = 5  # seconds

    for i in range(max_retries):
        try:
            conn = psycopg2.connect(
                dbname=settings.DATABASES["default"]["NAME"],
                user=settings.DATABASES["default"]["USER"],
                password=settings.DATABASES["default"]["PASSWORD"],
                host=settings.DATABASES["default"]["HOST"],
                port=settings.DATABASES["default"]["PORT"],
            )
            conn.close()
            print("PostgreSQL is available!")
            return
        except psycopg2.OperationalError as e:
            print(f"PostgreSQL not ready, retrying... (Attempt {i+1}/{max_retries})")
            time.sleep(retry_delay)
    print("Failed to connect to PostgreSQL after multiple attempts.")
    sys.exit(1)

if __name__ == "__main__":
    wait_for_postgres()