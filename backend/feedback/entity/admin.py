from django.contrib import admin
from . import models

admin.site.register(models.institute)
admin.site.register(models.course)
admin.site.register(models.teacher)
admin.site.register(models.subject)
