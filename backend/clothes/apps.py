"""
app module for stylestagram app
"""
from django.apps import AppConfig


class ClothesConfig(AppConfig):
    """clothes config"""
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'clothes'
