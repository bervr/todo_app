from rest_framework import serializers
from .models import TodoItem, Project

class TodoItemSerializer(serializers.ModelSerializer):
    item_owner = serializers.ReadOnlyField(source='item_owner.username')
    item_project = serializers.ReadOnlyField(source='item_project.project_name')
    class Meta:
        model = TodoItem
        fields = ['id', 'note', 'item_project', 'todo_status', 'item_owner', 'created', 'updated']

class ProjectSerializer(serializers.ModelSerializer):

    project_owner = serializers.ReadOnlyField(source='project_owner.username')
    # project_group = serializers.ReadOnlyField(source='project_team_user.username')
    class Meta:
        model = Project
        fields = '__all__'
