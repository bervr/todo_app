import rest_framework
from rest_framework import viewsets, mixins
from todouser.models import TodoUser
from todouser.serializers import TodoUserSerializer


# class TodoUserViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, viewsets.GenericViewSet):
#     queryset = TodoUser.objects.all()
#     serializer_class = TodoUserSerializer

class TodoUserViewSet(viewsets.ModelViewSet):
    queryset = TodoUser.objects.all()
    serializer_class = TodoUserSerializer




