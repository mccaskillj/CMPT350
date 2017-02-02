from django.shortcuts import render

# Create your views here.
from django.views import generic


class KenView(generic.TemplateView):
    template_name = 'ken.html'


class JordanView(generic.TemplateView):
    template_name = 'jordan.html'


class LiamView(generic.TemplateView):
        template_name = 'liam.html'


class GrahamView(generic.TemplateView):
    template_name = 'graham.html'
