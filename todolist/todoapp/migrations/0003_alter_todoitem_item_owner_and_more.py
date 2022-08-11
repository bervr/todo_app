# Generated by Django 4.0.6 on 2022-08-11 14:49

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('todoapp', '0002_remove_project_project_group_project_project_group_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todoitem',
            name='item_owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='item_owner', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='todoitem',
            name='item_project',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='item_project', to='todoapp.project'),
        ),
    ]
