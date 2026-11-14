from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    ROLE_SPEAKER = "speaker"

    role = models.CharField(
        max_length=20,
        default=ROLE_SPEAKER
    )
