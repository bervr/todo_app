from django_filters import rest_framework as filters
from .models import Project, TodoItem


class ProjectFilter(filters.FilterSet):
    project_name = filters.CharFilter(lookup_expr='contains')
    class Meta:
        model = Project
        fields = ['project_name']


class TodoFilter(filters.FilterSet):
    project_name = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = TodoItem
        fields = ['item_project']



