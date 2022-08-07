from django.contrib import admin

# Register your models here.
from .models import TodoUser

admin.site.register(TodoUser)
