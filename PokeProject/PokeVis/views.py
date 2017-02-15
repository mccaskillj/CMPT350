from django.shortcuts import render
from PokeVis.models import Pokemon
from django.core import serializers
import json

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

