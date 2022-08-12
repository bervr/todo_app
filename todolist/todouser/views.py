from django.shortcuts import render
from rest_framework import viewsets, mixins
from rest_framework.generics import RetrieveUpdateAPIView
from todouser.models import TodoUser
from todouser.serializers import TodoUserSerializer


# class RetrieveUpdateViewSet(mixins.ListModelMixin,mixins.RetrieveModelMixin, mixins.UpdateModelMixin,
# viewsets.GenericViewSet): pass


# class TodoUserViewSet(RetrieveUpdateViewSet):
class TodoUserViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, viewsets.GenericViewSet):
    queryset = TodoUser.objects.all()
    serializer_class = TodoUserSerializer

# class TodoUserView(RetrieveUpdateAPIView):
#     queryset = TodoUser.objects.all()
#     serializer_class = TodoUserSerializer



