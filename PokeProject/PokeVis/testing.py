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

pokelist = Pokemon.objects.all()

array = []

count = 0
for i in pokelist:
    if i.color in array:
        count = 0
    else:
        array.append(i.color)

print(array)

