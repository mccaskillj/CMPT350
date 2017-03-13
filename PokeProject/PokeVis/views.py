from django.http import HttpResponse
from django.shortcuts import render
from PokeVis.models import Pokemon
from django.core import serializers
from django.http import JsonResponse
from PokeVis.poke import Poke
import json

# Create your views here.
from django.views import generic

'''
class KenView(generic.TemplateView):
    template_name = 'ken.html'
    '''
def KenView(request):
    pokemons = Pokemon.objects.filter(generation='1')
    data = serializers.serialize("json", pokemons)
    colors = ['Green', 'Red', 'Blue', 'White', 'Brown', 'Yellow', 'Purple', 'Pink', 'Grey', 'Black']
    types = ["Fire", "Water", "Grass", "Bug", "Ghost", "Electric", "Fairy", "Dragon", "Poison",
             "Rock", "Steel", "Normal", "Fighting", "Ground", "Psychic"]
    return render(request, 'ken.html', {'file': data, 'color': colors, 'types': types})


class JordanView(generic.TemplateView):
    template_name = 'jordan.html'


class LiamView(generic.TemplateView):
        template_name = 'liam.html'


class GrahamView(generic.TemplateView):
    template_name = 'graham.html'

'''
class SearchView(generic.TemplateView):
    template_name = 'search.html'
'''


def SearchView(request):
    types = ["Fire", "Water", "Grass", "Bug", "Ghost", "Electric", "Fairy", "Dragon", "Poison",
             "Rock", "Steel", "Normal", "Fighting", "Ground", "Psychic"]
    colors = ['Green', 'Red', 'Blue', 'White', 'Brown', 'Yellow', 'Purple', 'Pink', 'Grey', 'Black']
    pokemons = Pokemon.objects.all()
    data = serializers.serialize("json", pokemons)
    return render(request, 'search.html', {'types': types, 'colors': colors, 'pokemon': data})



def OverviewView(request):
    return render(request, 'overview.html', {})


def PcomparisionView(request):
    temp_array = []
    pokemons = Pokemon.objects.all()

    for item in pokemons:
        poke = Poke(item.number, item.total, item.hp, item.attack, item.defense, item.special_attack,
                    item.special_defense, item.speed, item.weight_kg, item.height_m, item.color, item.name)
        temp_array.append(poke)

    return render(request, 'pcomparision.html', {'pokemon': temp_array})


def TcomparisionView(request):
    return render(request, 'tcomparision.html', {})


def BattleView(request):
    return render(request, 'battle.html', {})


def get_filter_options(request):
    temp_array = []
    type_val = request.GET.get('type', None)

    if type_val == 'All Types':
        pokemons = Pokemon.objects.all()
    else:
        pokemons = Pokemon.objects.filter(type_1=type_val)

    for item in pokemons:
        poke = Poke(item.number, item.total, item.hp, item.attack, item.defense, item.special_attack,
                    item.special_defense, item.speed, item.weight_kg, item.height_m, item.color, item.name)
        temp_array.append(poke)

    json_string = json.dumps([ob.__dict__ for ob in temp_array])

    return HttpResponse(json_string, content_type='application/json')


def get_pokemon(request):
    temp_array = []

    pokemons = Pokemon.objects.all()

    for item in pokemons:
        poke = Poke(item.number, item.total, item.hp, item.attack, item.defense, item.special_attack,
                    item.special_defense, item.speed, item.weight_kg, item.height_m, item.color, item.name)
        temp_array.append(poke)

    json_string = json.dumps([ob.__dict__ for ob in temp_array])

    return HttpResponse(json_string, content_type='application/json')


def get_single_pokemon(request):
    temp_array = []
    name_val = request.GET.get('name', None)
    pokemons = Pokemon.objects.filter(name=name_val)

    for item in pokemons:
        poke = Poke(item.number, item.total, item.hp, item.attack, item.defense, item.special_attack,
                    item.special_defense, item.speed, item.weight_kg, item.height_m, item.color, item.name,
                    item.egg_group_1, item.egg_group_2, item.generation, item.catch_rate, item.is_legendary,
                    item.body_style, item.type_1, item.type_2)
        temp_array.append(poke)

    json_string = json.dumps([ob.__dict__ for ob in temp_array])

    return HttpResponse(json_string, content_type='application/json')


def get_filtered_pokemon(request):
    temp_array = []
    pokemons = []
    gen_val = request.GET.get('gen', None)
    type_val = request.GET.get('type', None)
    color_val = request.GET.get('color', None)

    if gen_val == "All Generations" and type_val == "All Types" and color_val == "All Colors":
        pokemons = Pokemon.objects.all()
    elif gen_val != "All Generations" and type_val == "All Types" and color_val == "All Colors":
        temp = gen_val.split(" ")
        pokemons = Pokemon.objects.filter(generation=temp[1])
    elif gen_val == "All Generations" and type_val != "All Types" and color_val == "All Colors":
        pokemons = Pokemon.objects.filter(type_1=type_val,
                                          type_2=type_val)
    elif gen_val == "All Generations" and type_val == "All Types" and color_val != "All Colors":
        pokemons = Pokemon.objects.filter(color=color_val)

    for item in pokemons:
        poke = Poke(item.number, item.total, item.hp, item.attack, item.defense, item.special_attack,
                    item.special_defense, item.speed, item.weight_kg, item.height_m, item.color, item.name,
                    item.egg_group_1, item.egg_group_2, item.generation, item.catch_rate, item.is_legendary,
                    item.body_style, item.type_1, item.type_2)
        temp_array.append(poke)

    json_string = json.dumps([ob.__dict__ for ob in temp_array])

    return HttpResponse(json_string, content_type='application/json')
