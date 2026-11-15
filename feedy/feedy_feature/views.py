from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .models import Session, Participant, Question
from .helpers import save_snapshot, get_live_pulse
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

class SessionQuestionsView(APIView):

    def get(self, request, session_id):
            # Find the session owned by the logged-in teacher
            try:
                session = Session.objects.get(
                    id=session_id,
                )
            except Session.DoesNotExist:
                return Response(
                    {"error": "Session not found"},
                    status=status.HTTP_404_NOT_FOUND
                )
    
            # Get all questions from this session
            questions = session.questions.all().order_by("created_at")
    
            # Prepare question data
            question_data = [
                {
                    "id": question.id,
                    "text": question.text,
                    "status": question.status,
                    "created_at": question.created_at,
                    "participant_id": question.participant_id,
                }
                for question in questions
            ]
    
            return Response({
                "session_id": session.id,
                "session_title": session.title,
                "total_questions": len(question_data),
                "questions": question_data
            })
    
    def post(self, request, session_id):
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

class UpdateQuestionStatusView(APIView):
    permission_classes = [IsSpeaker]

    def patch(self, request, question_id):
        status_value = request.data.get("status")

        if status_value not in Question.Status.values:
            return Response(
                {"error": "Invalid status. Use PENDING or ANSWERED."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            question = Question.objects.get(
                id=question_id,
                session__teacher=request.user
            )
        except Question.DoesNotExist:
            return Response(
                {"error": "Question not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        question.status = status_value
        question.save(update_fields=["status"])

        return Response({
            "message": "Question status updated successfully",
            "question": {
                "id": question.id,
                "text": question.text,
                "status": question.status,

            }
        })
        
class SessionPulseView(APIView):
    def get(self, request, session_id):
        try:
            session = Session.objects.get(id=session_id)
        except Session.DoesNotExist:
            return Response(
                {"error": "Session not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        pulse_data = get_live_pulse(session)

        return Response(pulse_data)

class SaveSnapshotView(APIView):
    permission_classes = [IsSpeaker]

    def post(self, request, session_id):
        try:
            session = Session.objects.get(
                id=session_id,
                teacher=request.user,
                ended_at__isnull=True
            )
        except Session.DoesNotExist:
            return Response(
                {"error": "Active session not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        snapshot = save_snapshot(session)

        return Response(
            {
                "message": "Snapshot saved successfully",
                "snapshot": {
                    "id": snapshot.id,
                    "timestamp": snapshot.timestamp,
                    "total_participants": snapshot.total_participants,
                    "avg_confusion": snapshot.avg_confusion,
                    "level_0_count": snapshot.level_0_count,
                    "level_1_count": snapshot.level_1_count,
                    "level_2_count": snapshot.level_2_count,
                    "level_3_count": snapshot.level_3_count,
                    "level_4_count": snapshot.level_4_count,
                }
            },
            status=status.HTTP_201_CREATED
        )

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
                "avg_confusion",
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


class UpdateConfusionLevelView(APIView):
    def post(self, request):
        participant_token = request.data.get("participant_token")
        confusion_level = request.data.get("confusion_level")

        # Validate required fields
        if not participant_token or confusion_level is None:
            return Response(
                {"error": "Participant token and confusion level are required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Validate confusion level
        valid_levels = [0, 1, 2, 3, 4]

        try:
            confusion_level = int(confusion_level)
        except (ValueError, TypeError):
            return Response(
                {"error": "Confusion level must be an integer"},
                status=status.HTTP_400_BAD_REQUEST
            )

        if confusion_level not in valid_levels:
            return Response(
                {"error": "Confusion level must be between 0 and 4"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Find participant
        try:
            participant = Participant.objects.select_related(
                "session"
            ).get(token=participant_token)
        except (Participant.DoesNotExist, ValueError):
            return Response(
                {"error": "Participant not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        # Check if session is still active
        if not participant.session.is_active:
            return Response(
                {"error": "This session has ended"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Update confusion level
        participant.confusion_level = confusion_level
        participant.save(update_fields=["confusion_level", "last_seen"])

        return Response(
            {
                "message": "Confusion level updated successfully",
                "participant": {
                    "id": participant.id,
                    "session_id": participant.session.id,
                    "confusion_level": participant.confusion_level,
                    "confusion_label": participant.get_confusion_level_display(),
                    "last_seen": participant.last_seen
                }
            },
            status=status.HTTP_200_OK
        )

