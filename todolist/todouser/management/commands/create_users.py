
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from todouser.models import TodoUser


class Command(BaseCommand):
    def handle(self, *args, **options):
        TodoUser.objects.create_superuser('django', 'django@1.local', '12345', first_name='great', last_name='admin')
        TodoUser.objects.create_user('test1', 't1@1.local', '1qwerty23', first_name='test1', last_name='first')
        TodoUser.objects.create_user('test2', 't2@1.local', '4ytrewq56',  first_name='test2', last_name='second')