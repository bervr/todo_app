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
    queryset = TodoItem.objects.all()
    serializer_class = TodoItemSerializer
    pagination_class = TodoItemLimitOffsetPagination
    # filterset_class = TodoFilter
    filterset_fields = ['item_project']

    def destroy(self, request, pk=None):
        queryset = TodoItem.objects.all()
        item = get_object_or_404(queryset, pk=pk)
        item.todo_status = 'CSD'
        item.save()
        serializer = TodoItemSerializer(item)
        return Response(serializer.data)
    # todo вот тут непонятно как сделать чтобы после "удаления" т.е. смены статуса кнопка delete была недоступна
    # пока приходит только переопределить еще и retrieve и если todoitem закрыт то как-то использовать другой view,
    # но не придумал как. на этом мысль обрывается, было бы интерено разобрать такой вариант.




class ProjectViewset(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    pagination_class = ProjectLimitOffsetPagination
    # filterset_fields = ['project_name']
    filterset_class = ProjectFilter
