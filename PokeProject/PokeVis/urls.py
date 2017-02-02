from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'ken', views.KenView.as_view(), name='ken'),
    url(r'jordan', views.JordanView.as_view(), name='jordan'),
    url(r'liam', views.LiamView.as_view(), name='liam'),
    url(r'graham', views.GrahamView.as_view(), name='graham'),
]

