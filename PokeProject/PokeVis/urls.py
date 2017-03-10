from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'ken', views.KenView, name='ken'),
    url(r'jordan', views.JordanView.as_view(), name='jordan'),
    url(r'liam', views.LiamView.as_view(), name='liam'),
    url(r'graham', views.GrahamView.as_view(), name='graham'),
    url(r'search', views.SearchView, name='search'),
    url(r'overview', views.OverviewView, name='overview'),
    url(r'pokeCompare', views.PcomparisionView, name='pokeCompare'),
    url(r'teamCompare', views.TcomparisionView, name='teamCompare'),
    url(r'battle', views.BattleView, name='battle'),
    url(r'^ajax/get_filter_options/$', views.get_filter_options, name='get_filter_options'),
    url(r'^ajax/get_pokemon/$', views.get_pokemon, name='get_pokemon'),
    url(r'^ajax/get_single_pokemon/$', views.get_single_pokemon, name='get_single_pokemon'),
    url(r'^ajax/get_filtered_pokemon/$', views.get_filtered_pokemon, name='get_filtered_pokemon'),
]
