from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from .filters import ProjectFilter, TodoFilter
from rest_framework.pagination import LimitOffsetPagination
from .models import Project, TodoItem
from .serializers import TodoItemSerializer, ProjectSerializer
# Create your views here.


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10

class TodoItemLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class TodoItemViewset(viewsets.ModelViewSet):
    queryset = TodoItem.objects.filter(todo_status='ACV')
    serializer_class = TodoItemSerializer
    pagination_class = TodoItemLimitOffsetPagination
    filterset_fields = ['item_project']

    def destroy(self, request, pk=None):
        queryset = TodoItem.objects.all()
        item = get_object_or_404(queryset, pk=pk)
        item.todo_status = 'CSD'
        item.save()
        serializer = TodoItemSerializer(item)
        return Response(serializer.data)

class ProjectViewset(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    pagination_class = ProjectLimitOffsetPagination
    # filterset_fields = ['project_name']
    filterset_class = ProjectFilter

    def return_test_data(self):
        return ('Ok! Well done!')
