from django.db import models
from django.utils.translation import gettext_lazy as _

# Create your models here.
from todolist.todouser.models import TodoUser
from django.contrib.auth.models import Group


class Project(models.Model):
    project_name = models.CharField(_("project name"), max_length=64, unique=True)
    repo_link = models.URLField(_("repo link"), blank=True)
    project_owner = models.ForeignKey(_("project owner"), TodoUser, on_delete=models.DO_NOTHING())
    project_group = models.ForeignKey(_("project group"), Group, on_delete=models.SET_NULL())

class TodoItem(models.Model):
    active = 'ACV'
    closed = 'CSD'
    todo_status_choises = (
        (active, 'активно'),
        (closed, 'закрыто'),
    )
    item_project = models.ForeignKey(_("project"), Project, on_delete=models.CASCADE,)
    note = models.CharField(max_length=500, blank=True)
    created = models.DateTimeField(auto_now_add=True, blank=True)
    updated = models.DateTimeField(auto_now=True, blank=True)
    todo_status = models.CharField(verbose_name='статус',
                                    max_length=3,
                                    choices=todo_status_choises,
                                    default=active)
    item_owner = models.ForeignKey(_("owner"), TodoUser, on_delete=models.SET_NULL())
