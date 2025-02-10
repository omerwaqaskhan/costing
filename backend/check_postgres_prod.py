import time
import psycopg2
import os
from django.conf import settings

def wait_for_postgres():
    max_retries = 30  # Maximum number of retries
    retry_delay = 2   # Delay between retries in seconds

    for attempt in range(max_retries):
        try:
            conn = psycopg2.connect(
                dbname=os.getenv('DB_NAME', settings.DATABASES['default']['NAME']),
                user=os.getenv('DB_USER', settings.DATABASES['default']['USER']),
                password=os.getenv('DB_PASSWORD', settings.DATABASES['default']['PASSWORD']),
                host=os.getenv('DB_HOST', settings.DATABASES['default']['HOST']),
                port=os.getenv('DB_PORT', settings.DATABASES['default']['PORT'])
            )
            conn.close()
            print("PostgreSQL is available!")
            return
        except psycopg2.OperationalError as e:
            print(f"PostgreSQL is not available yet (attempt {attempt + 1}/{max_retries}), waiting...")
            time.sleep(retry_delay)

    print("Failed to connect to PostgreSQL after multiple attempts. Exiting.")
    exit(1)

if __name__ == "__main__":
    wait_for_postgres()