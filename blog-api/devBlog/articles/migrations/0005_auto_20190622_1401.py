# Generated by Django 2.2.2 on 2019-06-22 14:01

from django.db import migrations
import django_extensions.db.fields


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0004_auto_20190622_1332'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tag',
            name='slug',
            field=django_extensions.db.fields.AutoSlugField(blank=True, editable=False, populate_from=['tag'], unique=True),
        ),
    ]
