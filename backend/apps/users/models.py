from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from .managers import CustomUserManager


class CustomUser(AbstractUser):
    username = None
    email = models.EmailField(_("email address"), unique=True)

    first_name = models.CharField(max_length=50, blank=True)
    last_name = models.CharField(max_length=50, blank=True)
    age = models.PositiveIntegerField(null=True, blank=True)
    gender = models.CharField(
        max_length=10, choices=[("M", "Male"), ("F", "Female")], blank=True
    )
    city = models.CharField(max_length=100, blank=True)
    country = models.CharField(max_length=100, blank=True)
    role = models.CharField(
        max_length=20,
        choices=[("admin", "Admin"), ("manager", "Manager"), ("user", "User")],
        default="user",
    )
    image = models.ImageField(upload_to="profile_images/", null=True, blank=True)

    USERNAME_FIELD = "email"  # Make email the unique identifier for login
    REQUIRED_FIELDS = []  # No additional fields required

    objects = CustomUserManager()

    def __str__(self):
        return self.email
