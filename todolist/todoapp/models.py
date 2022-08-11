from django.db import models
from django.utils.translation import gettext_lazy as _

# Create your models here.
from todouser.models import TodoUser
from django.contrib.auth.models import Group


class Project(models.Model):
    project_name = models.CharField(_("project name"), max_length=64, unique=True)
    repo_link = models.URLField(_("repo link"), blank=True)
    project_owner = models.ForeignKey(TodoUser, related_name="project_owner", on_delete=models.CASCADE)
    project_group = models.ManyToManyField(TodoUser,  related_name="project_team_user")
    def __str__(self):
        return self.project_name


class TodoItem(models.Model):
    active = 'ACV'
    closed = 'CSD'
    todo_status_choises = (
        (active, 'активно'),
        (closed, 'закрыто'),
    )
    item_project = models.ForeignKey(Project, related_name='item_project', on_delete=models.CASCADE,)
    note = models.CharField(max_length=500, blank=True)
    created = models.DateTimeField(auto_now_add=True, blank=True)
    updated = models.DateTimeField(auto_now=True, blank=True)
    todo_status = models.CharField(verbose_name='статус',
                                    max_length=3,
                                    choices=todo_status_choises,
                                    default=active)
    item_owner = models.ForeignKey(TodoUser, related_name='item_owner', on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.item_project} project, item {self.id}'
