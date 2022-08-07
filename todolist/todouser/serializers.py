from rest_framework import serializers
from todouser.models import TodoUser

class TodoUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoUser
        fields = ['username', 'first_name', 'last_name', 'email']