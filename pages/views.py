from django.shortcuts import render,redirect
from django.views.decorators.http import require_http_methods,require_safe,require_POST
from .forms import ArticleForm
from .models import Article
from .serializer import ArticleSerializer

# Build RESTful API
from rest_framework.response import Response
from rest_framework.decorators import api_view

# 성공시 201 Created, 실패시 400 Bad request
from rest_framework import status

# Permission
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated 


# Create your views here.

@require_safe
def index(request):
    articles = Article.objects.all()
    context = {
        'articles' : articles
    } 
    return render(request, 'pages/index.html', context)

@require_http_methods(['GET','POST'])
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

@require_safe
def detail(request, article_pk):
    article = Article.objects.get(pk=article_pk)
    context = {
        'article': article
    }
    return render(request, 'pages/detail.html', context)

@require_http_methods(['GET','POST'])
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


@require_POST
def delete(request,article_pk):
    article = Article.objects.get(pk=article_pk)
    article.delete()
    return redirect('pages:index')


@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def article_list(request):
    if request.method == "GET":
        articles = Article.objects.all()
        # many=True 를 작성하는 이유는 여러개의 경우기 때문
        serializer = ArticleSerializer(articles, many=True)
        # render가 아닌 Response를 사용하여 
        # JSON 데이터를 DRF 전용 템플릿으로 응답
        return Response(serializer.data)
    elif request.method == "POST":
        serializer = ArticleSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        


@api_view(['GET','DELETE', 'PUT'])
@permission_classes([IsAuthenticated])
def article_detail(request,article_pk):
    article = Article.objects.get(pk=article_pk)
    if request.method == "GET":
        serializer = ArticleSerializer(article)
        return Response(serializer.data)
    elif request.method == 'DELETE':
        article.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    elif request.method == "PUT":
        serializer = ArticleSerializer(article, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)