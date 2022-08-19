# Generated by Django 4.1 on 2022-08-19 18:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='feed_back',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('feed_back_type', models.CharField(max_length=10)),
                ('feed_back_text', models.TextField()),
                ('date_time', models.DateTimeField(auto_now_add=True)),
                ('feed_back_score', models.IntegerField(default=0)),
                ('feed_back_to', models.IntegerField()),
                ('feed_back_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='user.student')),
            ],
        ),
    ]
