from django.contrib import admin

# Register your models here.
from .models import Project, TodoItem

admin.site.register(Project)
admin.site.register(TodoItem)