from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .models import Session, Participant, Question
from .helpers import record_and_get_pulse
from .permissions import IsSpeaker

class CreateSessionView(APIView):
    permission_classes = [IsSpeaker]
    def post(self, request):
        title = request.data.get("title", "").strip()

        # Validate classroom title
        if not title:
            return Response(
                {"error": "Classroom title is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Create session for the logged-in teacher
        session = Session.objects.create(
            teacher=request.user,
            title=title
        )

        return Response(
            {
                "message": "Session created successfully",
                "session_id": session.id,
                "title": session.title,
                "code": session.code,
                "started_at": session.started_at,
                "is_active": session.is_active
            },
            status=status.HTTP_201_CREATED
        )

class JoinSessionView(APIView):
    def post(self, request):
        code = request.data.get("code")

        if not code:
            return Response(
                {"error": "Room code is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            session = Session.objects.get(code=code.upper())
        except Session.DoesNotExist:
            return Response(
                {"error": "Invalid room code"},
                status=status.HTTP_404_NOT_FOUND
            )

        if not session.is_active:
            return Response(
                {"error": "This session has ended"},
                status=status.HTTP_400_BAD_REQUEST
            )

        participant = Participant.objects.create(
            session=session
        )

        return Response(
            {
                "message": "Successfully joined session",
                "participant_token": str(participant.token),
                "session_id": session.id,
                "session_title": session.title,
                "confusion_level": participant.confusion_level
            },
            status=status.HTTP_201_CREATED
        )

class CreateQuestionView(APIView):
    def post(self, request):
        session_id = request.data.get("session_id")
        participant_token = request.data.get("participant_token")
        text = request.data.get("text", "").strip()

        # Validate required fields
        if not session_id or not participant_token or not text:
            return Response(
                {"error": "Session ID, participant token, and question text are required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Validate question length
        if len(text) > 300:
            return Response(
                {"error": "Question cannot exceed 300 characters"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Find the session
        try:
            session = Session.objects.get(
                id=session_id,
                ended_at__isnull=True
            )
        except Session.DoesNotExist:
            return Response(
                {"error": "Active session not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        # Find the participant
        try:
            participant = Participant.objects.get(
                token=participant_token,
                session=session
            )
        except Participant.DoesNotExist:
            return Response(
                {"error": "Participant not found in this session"},
                status=status.HTTP_404_NOT_FOUND
            )

        # Create question
        question = Question.objects.create(
            session=session,
            participant=participant,
            text=text
        )

        return Response(
            {
                "message": "Question submitted successfully",
                "question": {
                    "id": question.id,
                    "text": question.text,
                    "created_at": question.created_at
                }
            },
            status=status.HTTP_201_CREATED
        )


class SessionPulseView(APIView):
    def get(self, request, session_id):
        try:
            session = Session.objects.get(id=session_id)
        except Session.DoesNotExist:
            return Response(
                {"error": "Session not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        pulse_data = record_and_get_pulse(session)

        return Response(pulse_data)


class ParticipantHeartbeatView(APIView):
    def post(self, request, token):
        try:
            participant = Participant.objects.get(token=token)
        except Participant.DoesNotExist:
            return Response(
                {"error": "Participant not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        participant.save(update_fields=["last_seen"])

        return Response(
            {
                "message": "Heartbeat received",
                "participant": {
                    "id": participant.id,
                    "token": str(participant.token),
                    "session_id": participant.session.id,
                    "session_title": participant.session.title,
                    "confusion_level": participant.confusion_level,
                    "joined_at": participant.joined_at,
                    "last_seen": participant.last_seen
                }
            },
            status=status.HTTP_200_OK
        )

class SessionTimelineView(APIView):
    permission_classes = [IsSpeaker]

    def get(self, request, session_id):
        try:
            session = Session.objects.get(
                id=session_id,
                teacher=request.user
            )
        except Session.DoesNotExist:
            return Response(
                {"error": "Session not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        snapshots = session.snapshots.all()

        timeline = list(
            snapshots.values(
                "timestamp",
                "total_participants",
                "level_0_count",
                "level_1_count",
                "level_2_count",
                "level_3_count",
                "level_4_count",
            )
        )

        return Response({
            "session_id": session.id,
            "session_title": session.title,
            "timeline": timeline
        })