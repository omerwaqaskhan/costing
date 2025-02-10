#!/usr/bin/secs-env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
import socket


def main():
    """Run administrative tasks."""

    # env_type = os.getenv("ENV_TYPE", "local")
    # settings_module = f"api.settings.{env_type}"
    # os.environ.setdefault("DJANGO_SETTINGS_MODULE", settings_module)

    hostname = socket.gethostname()

    if "ampham" in hostname:  # Assuming production server has "ampham" in its hostname
        os.environ.setdefault("DJANGO_SETTINGS_MODULE", "api.settings.production")
    else:
        os.environ.setdefault("DJANGO_SETTINGS_MODULE", "api.settings.local")

    # os.environ.setdefault("DJANGO_SETTINGS_MODULE", "api.settings.local")
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == "__main__":
    main()
