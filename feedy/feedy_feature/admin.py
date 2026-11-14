from django.contrib import admin
from .models import Session, Participant, Question, ConfusionSnapshot   
# Register your models here.
admin.site.register(Session)
admin.site.register(Participant)
admin.site.register(Question)
admin.site.register(ConfusionSnapshot)