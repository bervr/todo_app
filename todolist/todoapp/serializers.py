from rest_framework import serializers
from .models import TodoItem, Project


class TodoItemSerializer(serializers.ModelSerializer):
    item_project_name = serializers.ReadOnlyField(source='item_project.project_name')
    item_owner_name = serializers.ReadOnlyField(source='item_owner.username')
    # item_owner = TodoUserSerializer()
    class Meta:
        model = TodoItem
        fields = ['id', 'note', 'item_project', 'item_project_name',  'todo_status', 'item_owner', 'item_owner_name', 'created', 'updated']
        # fields = '__all__'



class ProjectSerializer(serializers.ModelSerializer):

    project_owner_name = serializers.ReadOnlyField(source='project_owner.username')


    class Meta:
        model = Project
        fields = ['project_name', 'project_owner_name', 'repo_link', 'project_owner', 'project_group']
        fields = '__all__'