# Generated by Django 3.2.7 on 2021-10-30 20:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_history_likedsongs'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='LikedSongs',
            new_name='LikedSong',
        ),
    ]