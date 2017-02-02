from django.shortcuts import render

# Create your views here.
from django.views import generic


class kenView(generic.TemplateView):
    template_name = 'ken.html'
