from django.shortcuts import render
from rest_framework import viewsets
from todouser.models import TodoUser
from todouser.serializers import TodoUserSerializer


class TodoUserViewset(viewsets.ModelViewSet):
    queryset = TodoUser.objects.all()
    serializer_class = TodoUserSerializer



