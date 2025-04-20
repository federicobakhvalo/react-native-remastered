from django.contrib.auth.models import AbstractUser
from django.db import models

from .managers import CustomUserManager


# Create your models here.
class CustomUser(AbstractUser):
    email = models.EmailField(null=True,blank=True,unique=True)
    avatar_url = models.URLField(null=True, blank=True,max_length=1500)
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='customuser_set',
        blank=True,
        help_text='The groups this user belongs to.',
        related_query_name='customuser'
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='customuser_set',
        blank=True,
        help_text='Specific permissions for this user.',
        related_query_name='customuser'
    )

    objects = CustomUserManager()

