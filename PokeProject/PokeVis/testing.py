import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "PokeProject.settings")

django.setup()

from PokeVis.models import Pokemon
import json


pokemonDictionary = {"name": "Pokemon"}

print(pokemonDictionary)

tempGendict = []


#tempGendict["children"].append({"name": name "size": 3938})


type = set()

size = 1000

for i in range(1,7):
    pokelist = Pokemon.objects.filter(generation=str(i))
    for j in pokelist:
        type.add(j.type_1)
    tempTypeArray = []
    for ty in type:
        refinedlist = Pokemon.objects.filter(generation=str(i), type_1=ty)
        temp = []
        for k in refinedlist:
            temp.append({"name": k.name, "size": size})
        tempTypeArray.append({"name": ty, "children": temp})

    tempGendict.append({"name": "Generation " + str(i), "children": tempTypeArray})

    type.clear()

pokemonDictionary["children"] = tempGendict

print(json.dumps(pokemonDictionary, sort_keys=True, indent=4))


# pokelist = Pokemon.objects.filter(
#     type_1="Fire",
#     generation="1"
# )
#
# print(pokelist)
#
# pokelist = Pokemon.objects.all()
#
# array = []
#
# count = 0
# for i in pokelist:
#     if i.color in array:
#         count = 0
#     else:
#         array.append(i.color)
#
# print(array)

