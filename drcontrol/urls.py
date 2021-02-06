from django.contrib import admin
from django.urls import path
from . import views

app_name ="drcontrol"

urlpatterns = [
    path('top/', views.top, name='top'),
    path('dronecontrol/', views.dronecontrol, name='dronecontrol'),
    path('calendar/', views.calendar, name='calendar'),
]