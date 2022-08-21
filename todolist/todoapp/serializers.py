from rest_framework import serializers
from .models import TodoItem, Project


class TodoItemSerializer(serializers.ModelSerializer):
    # item_owner = serializers.ReadOnlyField(source='item_owner.username')
    item_project_name = serializers.ReadOnlyField(source='item_project.project_name')
    item_owner_name = serializers.ReadOnlyField(source='item_owner.username')
    class Meta:
        model = TodoItem
        fields = ['id', 'note', 'item_project', 'item_project_name',  'todo_status', 'item_owner', 'item_owner_name', 'created', 'updated']


class ProjectSerializer(serializers.ModelSerializer):

    project_owner = serializers.ReadOnlyField(source='project_owner.username')
    project_group = serializers.SlugRelatedField(many=True, read_only=True, slug_field='username')

    class Meta:
        model = Project
        fields = '__all__'
