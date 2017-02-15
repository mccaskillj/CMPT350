import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "PokeProject.settings")

django.setup()

from PokeVis.models import Pokemon

pokelist = Pokemon.objects.all()

largest = 0
smallest = 99999
for poke in pokelist:
    if poke.height_m > largest:
        largest = poke.height_m
    elif poke.height_m < smallest:
        smallest = poke.height_m

print("--------")
print(largest)
print(smallest)
print("--------")

largest = 0
smallest = 99999
for poke in pokelist:
    if poke.weight_kg > largest:
        largest = poke.weight_kg
    elif poke.height_m < smallest:
        smallest = poke.weight_kg

print("--------")
print(largest)
print(smallest)
print("--------")

largest = 0
smallest = 99999
for poke in pokelist:
    if poke.hp > largest:
        largest = poke.hp
    elif poke.hp < smallest:
        smallest = poke.hp

print("--------")
print(largest)
print(smallest)
print("--------")
