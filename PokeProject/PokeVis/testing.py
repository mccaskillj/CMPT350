import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "PokeProject.settings")

django.setup()

from PokeVis.models import Pokemon

pokelist = Pokemon.objects.filter(
    type_1="Fire",
    generation="1"
)

print(pokelist)
