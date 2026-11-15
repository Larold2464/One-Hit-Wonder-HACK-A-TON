from datetime import timedelta
from django.utils import timezone
from django.db.models import Count, Avg, Q

from .models import  ConfusionSnapshot

def get_live_pulse(session):
    now = timezone.now()
    cutoff = now - timedelta(minutes=2)

    active = session.participants.filter(
        last_seen__gte=cutoff
    )

    stats = active.aggregate(
        total_participants=Count("id"),
        level_0_count=Count("id", filter=Q(confusion_level=0)),
        level_1_count=Count("id", filter=Q(confusion_level=1)),
        level_2_count=Count("id", filter=Q(confusion_level=2)),
        level_3_count=Count("id", filter=Q(confusion_level=3)),
        level_4_count=Count("id", filter=Q(confusion_level=4)),
    )

    return stats

def save_snapshot(session):
    stats = get_live_pulse(session)

    return ConfusionSnapshot.objects.create(
        session=session,
        **stats
    )