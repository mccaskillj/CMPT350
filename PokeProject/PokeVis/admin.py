from django.contrib import admin
from .models import Pokemon
from .models import Type

# Register your models here.

admin.site.register(Pokemon)
admin.site.register(Type)
