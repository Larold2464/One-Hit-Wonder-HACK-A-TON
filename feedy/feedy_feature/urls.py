from django.urls import path

from .views import (
    CreateSessionView,
    JoinSessionView,
    SessionQuestionsView,
    UpdateQuestionStatusView,
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

    # Student + Teacher: Ask a question and Get questions for a session
    path(
        "sessions/<int:session_id>/questions/",
        SessionQuestionsView.as_view(),
        name="session-questions"
    ),

    # Teacher: Update question status
    path(
        "questions/<int:question_id>/status/",
        UpdateQuestionStatusView.as_view(),
        name="update-question-status"
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