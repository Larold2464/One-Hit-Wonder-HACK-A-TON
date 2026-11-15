import uuid
import random
import string
from django.conf import settings
from django.db import models
from django.utils import timezone


# generate a unique room code for each session
def generate_room_code():
    while True:
        code = "".join(random.choices(string.ascii_uppercase + string.digits, k=6))
        if not Session.objects.filter(code=code).exists():
            return code

class Session(models.Model):
    teacher = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="sessions",
    )
    title = models.CharField(max_length=200)
    code = models.CharField(max_length=8, unique=True, default=generate_room_code)
    started_at = models.DateTimeField(auto_now_add=True)
    ended_at = models.DateTimeField(null=True, blank=True)

    @property
    def is_active(self):
        return self.ended_at is None

    def __str__(self):
        return f"{self.title} ({self.code})"


class Participant(models.Model):
    class ConfusionLevel(models.IntegerChoices):
        CLEAR = 0, "I'm Good"
        SLIGHTLY_CONFUSED = 1, "A Little Confused"
        MODERATELY_CONFUSED = 2, "Somewhat Lost"
        VERY_CONFUSED = 3, "Very Confused"
        COMPLETELY_LOST = 4, "Completely Lost"

    session = models.ForeignKey(
        Session,
        on_delete=models.CASCADE,
        related_name="participants",
    )
    token = models.UUIDField(default=uuid.uuid4, unique=True)
    confusion_level = models.IntegerField(
        choices=ConfusionLevel.choices,
        default=ConfusionLevel.CLEAR,
    )
    last_seen = models.DateTimeField(auto_now=True) 
    joined_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Participant {self.token} ({self.session.code})"


class Question(models.Model):
    class Status(models.TextChoices):
        PENDING = "PENDING", "Not Answered"
        ANSWERED = "ANSWERED", "Answered"

    session = models.ForeignKey(
        Session,
        on_delete=models.CASCADE,
        related_name="questions",
    )
    participant = models.ForeignKey(
        Participant,
        on_delete=models.CASCADE,
        related_name="questions",
    )  
    status = models.CharField(
        max_length=10,
        choices=Status.choices,
        default=Status.PENDING,
    )
    text = models.TextField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)


    class Meta:
        ordering = ["created_at"] # sort questions by creation time

    def __str__(self):
        return f"[{self.session.code}] {self.text[:40]}"

class ConfusionSnapshot(models.Model):
    session = models.ForeignKey(
        Session,
        on_delete=models.CASCADE,
        related_name="snapshots",
    )
    timestamp = models.DateTimeField(default=timezone.now)
    total_participants = models.PositiveIntegerField(default=0)
    avg_confusion = models.FloatField(default=0.0)
    # 5 explicit fields for confusion levels 0 through 4
    level_0_count = models.PositiveIntegerField(default=0)  # I'm Good
    level_1_count = models.PositiveIntegerField(default=0)  # A Little Confused
    level_2_count = models.PositiveIntegerField(default=0)  # Somewhat Lost
    level_3_count = models.PositiveIntegerField(default=0)  # Very Confused
    level_4_count = models.PositiveIntegerField(default=0)  # Completely Lost

    class Meta:
        ordering = ["timestamp"]
        unique_together = ("session", "timestamp")

    def __str__(self):
        return ( f"{self.session.code} @ " f"{self.timestamp.strftime('%H:%M')} " f"(avg confusion: {self.avg_confusion:.2f})")


