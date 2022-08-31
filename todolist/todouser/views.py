import rest_framework
from rest_framework import viewsets, mixins, permissions
from todouser.models import TodoUser
from todouser.serializers import TodoUserSerializer, TodoUserSerializerNew


# class TodoUserViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, viewsets.GenericViewSet):
#     queryset = TodoUser.objects.all()
#     serializer_class = TodoUserSerializer

class TodoUserViewSet(viewsets.ModelViewSet):
    queryset = TodoUser.objects.all().order_by('-id')
    serializer_class = TodoUserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        if self.request.version == '2.0':
            return TodoUserSerializerNew

        return TodoUserSerializer




