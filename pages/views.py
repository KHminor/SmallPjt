from django.shortcuts import render,redirect
from .forms import ArticleForm

# Create your views here.

def index(request):
    return render(request, 'pages/index.html')

def create(request):
    if request.method == 'POST':
        form = ArticleForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('pages:index')
    else:
        form = ArticleForm()
    context = {
        'form': form
    }
    return render(request, 'pages/create.html', context)