from django.test import TestCase
from rest_framework import status
from rest_framework.test import force_authenticate, APIClient, APISimpleTestCase, APITestCase, CoreAPIClient, RequestsClient
from mixer.backend.django import mixer
from .views import TodoItemViewset, ProjectViewset
from .models import TodoItem, Project
import sys
import os
sys.path.append(os.path.abspath('..'))
from todouser.models import TodoUser
import requests


class TestItemViewSet(TestCase):
    def setUp(self) -> None:
        self.url = '/api/projects/'
        self.url_items = '/api/todoitems/'
        self.admin_login = 'admin'
        self.admin_pass = 'aD_min123456'
        self.admin = TodoUser.objects.create_superuser(self.admin_login, 'admin@admin.com',
                                                       self.admin_pass)
        self.format_json = 'json'
        self.project_id = 1
        self.new_project_name = 'new test project name'


    def test_apiclient_get_project_detail(self):
        project = mixer.blend(Project, id=self.project_id)
        client = APIClient()
        response = client.get(f'{self.url}{self.project_id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_apiclient_get_project_edit_guest(self):
        project = mixer.blend(Project, id=self.project_id)
        client = APIClient()
        response = client.put(f'{self.url}{self.project_id}/', {'project_name': 'self.new_project_name'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_apiclient_get_project_edit_admin(self):
        project = mixer.blend(Project, id=self.project_id)
        client = APIClient()
        client.login(username=self.admin_login, password=self.admin_pass)
        response = client.put(f'{self.url}{self.project_id}/', {'project_name': self.new_project_name})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        project.refresh_from_db()
        self.assertEqual(response.data['project_name'], self.new_project_name)


class TestFunc(APISimpleTestCase):
    def test_func(self):
        query = ProjectViewset().return_test_data()
        self.assertEqual(query, 'Ok! Well done!')


class TestItemsViewSet(APITestCase):
    def setUp(self) -> None:
        self.url = '/api/todoitems/'
        self.url_todousers = '/api/todousers/'
        self.admin_login = 'admin'
        self.admin_pass = 'aD_min123456'
        self.admin = TodoUser.objects.create_superuser(self.admin_login, 'admin@admin.com', self.admin_pass)
        self.format_json = 'json'
        self.project_id = 1
        self.new_project_name = 'new test project name'
        self.server = '127.0.0.1:8000'
        self.url_live = f'http://{self.server}'
        self.api_token_auth = "/api-token-auth/"
        self.real_user = 'django'
        self.real_pass = '12345'
        self.headers = {'User-Agent': 'example'}
        # self.headers = {}

    def test_apitestcase_get_items_list_guest(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_apitestcase_post_items_guest(self):
        project = mixer.blend(Project, id=self.project_id)
        response = self.client.post(self.url, {"itemProject": self.project_id, "note":"text", "itemOwner":self.admin})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_apitestcase_post_items_admin(self):
        project = mixer.blend(Project, id=self.project_id)
        self.client.login(username=self.admin_login, password=self.admin_pass)
        response = self.client.post(self.url, {"itemProject": project.id, "note": "text", "itemOwner": self.admin.id})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        new_item = TodoItem.objects.filter(item_project=project.id).filter(id=response.data['id']).get()
        self.assertEqual(new_item.note, "text")

    def test_live_items_guest(self):
        client = RequestsClient()
        response = client.get(f"{self.url_live}{self.url}")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_live_todousers_guest(self):
        client = RequestsClient()
        response = client.get(f"{self.url_live}{self.url_todousers}")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_live_todousers_real_user(self):
        # client = RequestsClient()
        client = CoreAPIClient()
        token = requests.post(f"{self.url_live}{self.api_token_auth}",
                              {"username": self.real_user, "password": self.real_pass}).json()['token']
        token = '009d35944e5bfc35a07eb82b45cc15cbed876e8c'
        self.headers['Authorization'] = f'Token {token}'
        self.headers['Content-Type'] = 'application/json'
        # client.auth = HTTP_AUTHORIZATION('Token ', token) #{'Authorization': f'Token {token}'}
        response = client.get(f'{self.url_live}{self.url_todousers}',
                              # headers=self.headers,
                              HTTP_AUTHORIZATION={'Authorization': f'Token {token}'}) # todo autorization
        self.assertEqual(response.status_code, status.HTTP_200_OK)





