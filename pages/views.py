from django.shortcuts import render,redirect
from .forms import ArticleForm
from .models import Article

# Create your views here.

def index(request):
    articles = Article.objects.all()
    context = {
        'articles' : articles
    } 
    return render(request, 'pages/index.html', context)

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


def detail(request, article_pk):
    article = Article.objects.get(pk=article_pk)
    context = {
        'article': article
    }
    return render(request, 'pages/detail.html', context)


def update(request, article_pk):
    article = Article.objects.get(pk=article_pk)
    if request.method == 'POST':
        form = ArticleForm(request.POST,instance=article)
        if form.is_valid():
            form.save()
            return redirect('pages:detail', article_pk)
    else:
        form = ArticleForm(instance=article)
    context = {
        'form': form
    }
    return render(request, 'pages/update.html', context)



def delete(request,article_pk):
    article = Article.objects.get(pk=article_pk)
    article.delete()
    return redirect('pages:index')
