from django.urls import path

from .views import (
    CreateSessionView,
    JoinSessionView,
    CreateQuestionView,
    SessionPulseView,
    SaveSnapshotView,
    SessionTimelineView,
    ParticipantHeartbeatView,
    UpdateConfusionLevelView,
)

urlpatterns = [
    # Teacher: Create a classroom session
    path(
        "sessions/",
        CreateSessionView.as_view(),
        name="create-session"
    ),

    # Student: Join a classroom session
    path(
        "sessions/join/",
        JoinSessionView.as_view(),
        name="join-session"
    ),

    path(
        "questions/",
        CreateQuestionView.as_view(),
        name="create-question"
        ),

    # Teacher: Get live confusion statistics
    path(
        "sessions/<int:session_id>/pulse/",
        SessionPulseView.as_view(),
        name="session-pulse"
    ),

    # Teacher: Save a confusion snapshot
    path(
        "sessions/<int:session_id>/snapshot/",
        SaveSnapshotView.as_view(),
        name="save-snapshot"
    ),

    # Teacher: Get historical confusion snapshots
    path(
        "sessions/<int:session_id>/timeline/",
        SessionTimelineView.as_view(),
        name="session-timeline"
    ),

    # Student: Update heartbeat
    path(
        "participants/<uuid:token>/heartbeat/",
        ParticipantHeartbeatView.as_view(),
        name="participant-heartbeat"
    ),

    # Student: Update confusion level
    path(
        "participants/confusion/",
        UpdateConfusionLevelView.as_view(),
        name="update-confusion-level"
    ),
]