from django.shortcuts import render
from .forms import ArticleForm

# Create your views here.

def index(request):
    return render(request, 'pages/index.html')

def create(request):
    form = ArticleForm()
    context = {
        'form': form
    }
    return render(request, 'pages/create.html', context)