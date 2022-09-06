import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from .models import TodoUser
from .views import TodoUserViewSet


class TestUserViewSet(TestCase):
    def setUp(self) -> None:
        self.url = '/api/todousers/'
        self.admin_login ='admin'
        self.admin_pass ='aD_min123456'
        self.admin = TodoUser.objects.create_superuser(self.admin_login, 'admin@admin.com',
                                              self.admin_pass)
        self.format_json ='json'

    def test_factory_get_user_list_guest(self):
        factory = APIRequestFactory()
        request = factory.get(self.url)
        view = TodoUserViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_factory_get_user_list_admin(self):
        factory = APIRequestFactory()
        request = factory.get(self.url)
        force_authenticate(request, self.admin)
        view = TodoUserViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_factory_create_user_guest(self):
        factory = APIRequestFactory()
        request = factory.post(self.url, {"username": "newtest",
                                          "firstName": "new",
                                          "lastName": "test",
                                          "email": "nt@mail.local"}, format=self.format_json)
        view = TodoUserViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_factory_create_user_admin(self):
        factory = APIRequestFactory()
        request = factory.post(self.url, {"username": "newtest",
            "firstName": "new",
            "lastName": "test",
            "email":"nt@mail.local"}, format=self.format_json)
        force_authenticate(request, self.admin)
        view = TodoUserViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


    def tearDown(self) -> None:
        pass

