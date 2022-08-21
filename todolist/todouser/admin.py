from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

# Register your models here.
from .models import TodoUser

class UserAdmin(BaseUserAdmin):

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'first_name', 'last_name', 'email', 'password1', 'password2', 'is_staff')}
         ),
        ('Permissions', {'fields': ('is_staff', 'groups', 'user_permissions')})
    )



admin.site.register(TodoUser, UserAdmin)
#