from django.shortcuts import render
from rest_framework import viewsets

from .models import Project, TodoItem
from .serializers import TodoItemSerializer, ProjectSerializer
# Create your views here.



class TodoItemViewset(viewsets.ModelViewSet):
    queryset = TodoItem.objects.all()
    serializer_class = TodoItemSerializer

class ProjectViewset(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer