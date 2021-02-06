from django.shortcuts import render
from django.shortcuts import redirect

# Create your views here.
def top(request):
    return render(request, 'drcontrol/top.html') 

def dronecontrol(request):
    return render(request, 'drcontrol/dronecontrol.html')

def calendar(request):
    return render(request, 'drcontrol/calendar.html')