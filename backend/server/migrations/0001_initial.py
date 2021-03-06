# Generated by Django 2.2.5 on 2020-10-25 12:12

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Categories',
            fields=[
                ('categoryID', models.IntegerField(auto_created=True, primary_key=True, serialize=False)),
                ('categoryName', models.CharField(max_length=100)),
                ('isPublic', models.BooleanField()),
                ('userId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Papers',
            fields=[
                ('paperId', models.IntegerField(auto_created=True, primary_key=True, serialize=False)),
                ('url', models.URLField(max_length=100)),
                ('title', models.CharField(max_length=100)),
                ('author', models.CharField(max_length=50)),
                ('description', models.CharField(max_length=250)),
                ('categoryID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='server.Categories')),
            ],
        ),
        migrations.CreateModel(
            name='Comments',
            fields=[
                ('commentId', models.IntegerField(auto_created=True, primary_key=True, serialize=False)),
                ('content', models.CharField(max_length=500)),
                ('date', models.DateField(auto_now=True)),
                ('categoryID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='server.Categories')),
                ('userName', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
