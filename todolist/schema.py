import graphene
from graphene_django import DjangoObjectType
from todoapp.models import TodoItem, Project
from todouser.models import TodoUser


class TodoUserType(DjangoObjectType):
    class Meta:
        model = TodoUser
        fields = '__all__'


class TodoItemType(DjangoObjectType):
    class Meta:
        model = TodoItem
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class Query(graphene.ObjectType):
    all_users = graphene.List(TodoUserType)
    all_items = graphene.List(TodoItemType)
    all_projects = graphene.List(ProjectType)

    def resolve_all_users(root, info):
        return TodoUser.objects.all()

    def resolve_all_items(root, info):
        return TodoItem.objects.all()

    def resolve_all_projects(root, info):
        return Project.objects.all()


schema = graphene.Schema(query=Query)