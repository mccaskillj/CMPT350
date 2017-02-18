from django.shortcuts import render
from PokeVis.models import Pokemon
from django.core import serializers

# Create your views here.
from django.views import generic

'''
class KenView(generic.TemplateView):
    template_name = 'ken.html'
    '''
def KenView(request):
    pokemons = Pokemon.objects.all()
    data = serializers.serialize("json", pokemons)
    return render(request, 'ken.html', {'file': data})


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
    return render(request, 'search.html', {'types': types, 'colors': colors})


def OverviewView(request):
    return render(request, 'overview.html', {})


def PcomparisionView(request):
    return render(request, 'pcomparision.html', {})


def TcomparisionView(request):
    return render(request, 'tcomparision.html', {})


def BattleView(request):
    return render(request, 'battle.html', {})
