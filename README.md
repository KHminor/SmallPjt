# mini_PJT(Single)

## 1일차

### 오늘의 작업

* 프로젝트 기본 셋팅

  1. 깃 허브 Repository 생성

  2. 장고 기본 셋팅

     ```python
     # TERMINAL
     
     python -m venv venv  # 가상 환경 생성
     source venv/Scripts/activate # 가상 환경 구동
     pip install django==3.2.13 # pip 설치
     pip freeze > requirements.txt # pip 저장
     django-admin startproject MyProject . # 프로젝트 생성
     python manage.py startapp pages # 앱 생성
     ```

  3. MyProject에서의 셋팅

     ```python
     # settings.py
     
     INSTALLED_APPS = [
         # 금방 생성한 앱 추가
         'pages',
         
         'django.contrib.admin',
         'django.contrib.auth',
         'django.contrib.contenttypes',
         'django.contrib.sessions',
         'django.contrib.messages',
         'django.contrib.staticfiles',
     ]
     
     TEMPLATES = [
         {
             'BACKEND': 'django.template.backends.django.DjangoTemplates',
             # 루트 디렉토리 경로 설정
             # 이 경로를 기준으로 프로젝트 내 필요한 파일들을 찾음
             'DIRS': [BASE_DIR / 'templates'],
             
             'APP_DIRS': True,
             'OPTIONS': {
                 'context_processors': [
                     'django.template.context_processors.debug',
                     'django.template.context_processors.request',
                     'django.contrib.auth.context_processors.auth',
                     'django.contrib.messages.context_processors.messages',
                 ],
             },
         },
     ]
     ```

     ```python
     # urls.py
     
     from django.contrib import admin
     
     # include를 활용하여 다른 앱으로 연동이 되도록 하기
     from django.urls import path, include
     
     urlpatterns = [
         path('admin/', admin.site.urls),
         path('pages/', include('pages.urls')),
     ]
     ```

  4. templates 생성

     ```python
     # 공통으로 당겨와서 사용할 html 생성
     # base.html 생성
     
     <!DOCTYPE html>
     <html lang="en">
     <head>
       <meta charset="UTF-8">
       <meta http-equiv="X-UA-Compatible" content="IE=edge">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Document</title>
     </head>
     <body>
     	# 아래 block인 content를 활용하여 내부 요소 넣기
       {% block content %}
       {% endblock content %}
     </body>
     </html>
     ```

  5. pages에서의 셋팅

     ```python
     # urls.py
     
     from django.urls import path
     from . import views
     
     # 해당 앱에 대한 이름 작성
     app_name = 'pages'
     
     # url 작성
     urlpatterns = [
         path('', views.index, name='index'),           	# pages의 기본 url
         path('create/', views.create, name='create')	# article 생성 url
     ]
     
     ```

     ```python
     # article 의 데이터를 넣을 model 작성하기
     # models.py
     from django.db import models
     
     class Article(models.Model):
         title = models.CharField(max_length=30)
         content = models.TextField()
         created_date = models.DateField(auto_now_add=True) # date 필드 말고 추후 변경 예정일듯?
         
     ```

     ```python
     # 그리고 게시글을 생성하는 view를 작성할 때마다 계속해서 model에 대한 입력 요소를 작성하지 않으며
     # 유효성 검사를 할 수 있도록 modelForm 사용하기 위해 form.py 생성 후 작성
     # forms.py
     
     from django import forms
     # modelForm을 사용하는 것이기에 model 또한 import 해오기
     from .models import Article
     
     class ArticleForm(forms.ModelForm):
         title = forms.CharField(max_length=30)
         content = forms.CharField()
         created_date = forms.DateField()
     
         class Meta:
             model = Article
             fields = '__all__'
     ```

     ```python
     # ulr을 작성했기에 view를 작성하기 위해 이동
     # views.py
     
     from django.shortcuts import render,redirect
     from .forms import ArticleForm
     
     # Create your views here.
     
     # 현재 index는 간단히 페이지가 보이도록만 하였음
     def index(request):
         return render(request, 'pages/index.html')
     
     # create는 요청하는 method가 POST의 경우 요청하는 POST 값을 데이터로 
     # 작성해뒀던 ModelForm에 넣은 후 
     # 해당 form에 대한 유효성 검사를 한 후 
     # 우선은 바로 save 하는 형식으로 했음
     # 여기서 실수했던 부분이 modelForm 으로 작성하지 않고 form으로 작성하다보니
     # 데이터가 save()되지 않았었다는 점.
     # 그리고 이후 post 요청을 완료했기에 redirect로 페이지만 이동하였음
     
     # 우선은 POST 요청이 아닌 경우엔 해당 form 데이터를 넘겨주었음.
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
     
     ```

     ```python
     # index.html
     
     {% extends 'base.html' %}
     
     {% block content %}
       <h1>여기는 인덱스 페이지</h1>
     
     {% endblock content %}
     
     
     # create.html
     
     {% extends 'base.html' %}
     
     {% block content %}
       <h1>여기는 생성 페이지</h1>
     
         # submit 을 통해 form 데이터를 전송할 것이므로
         # method는 POST
         # POST 요청이기에 CSRF token 을 함께 넣어서 전송하며
         # form 태그의 요소들을 모두 p태그로 감싸서 출력
       <form method='POST'>
         {% csrf_token %}
         {{form.as_p}}
         <input type="submit">
       </form>
     {% endblock content %}
     
     ```


---

## 2일차

### 오늘의 작업

* pages 앱 

  1. models.py 수정

     ```python
     # models.py
     from django.db import models
     
     # 기존의 model에서 해당 게시글을 
     # 임의로 넣으려는 날짜인 write_date 와 update 된 날짜인 updated_date 를 추가 
     class Article(models.Model):
         title = models.CharField(max_length=30)
         content = models.TextField()
         write_date = models.DateField()
         updated_date = models.DateField(auto_now=True)
         created_date = models.DateField(auto_now_add=True) # date 필드 말고 추후 변경 예정일듯?
     ```

  2. form.py 수정

     ```python
     # forms.py
     # content를 작은 크기가 아닌 입력하기 좋은 크기로 받기 위해 widget을 사용
     # widget=forms.Textarea() 추가
     # 또한 기존의 form에서 내가 직접 입력이 필요한 요소만 보이도록 하기
     
     
     from django import forms
     from .models import Article
     
     class ArticleForm(forms.ModelForm):
         title = forms.CharField(max_length=30)
         content = forms.CharField(
             widget=forms.Textarea()
         )
         write_date = forms.DateField(
             widget=forms.DateField()
         )
     
         class Meta:
             model = Article
             fields = '__all__'
     ```


  3. urls.py 수정

     ```python
     # 기존의 데이터에서 detail, update, delete 추가
     # 또한 해당 url들은 어떤 article인지 알아야 하기에 article_pk 값을 받도록 하기
     from django.urls import path
     from . import views
     
     app_name = 'pages'
     
     urlpatterns = [
         path('', views.index, name='index'),
         path('create/', views.create, name='create'),
         path('<int:article_pk>/detail/', views.detail, name='detail'),
         path('<int:article_pk>/update/', views.update, name='update'),
         path("<int:article_pk>/delete/", views.delete, name="delete"),
     ]
     ```

  4. views.py

     ```python
     # 기존의 데이터에서 detail, update, delete 추가
     
     # detail의 경우 어떤 article의 데이터인지 알기 위해 
     # Article 모델에서 obejct.get을 사용하여 해당 article을 가져와서 보이도록 하기
     def detail(request, article_pk):
         article = Article.objects.get(pk=article_pk)
         context = {
             'article': article
         }
         return render(request, 'pages/detail.html', context)
     # update의 경우 마찬가지로 어떤 article의 데이터인지 알기 위해 가져온 뒤
     # POST 요청이 아닌 경우엔 
     # ModelForm에 해당 article 정보를 instance=article 이렇게 데이터를 넣은 뒤 
     # 요청한 사용자에게 데이터를 넣은 form을 보여주고
     # POST 요청의 경우엔
     # ModelForm에 수정한 데이터인 request.POST 데이터를 넣어줌과 동시에 
     # 어떤 article에 대한 데이터인지 뒤에 instance=article 이렇게 데이터를 넣어주기
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
     
     # delete의 경우 어떤 article인지 가져온 뒤
     # article.delete() 메서드를 이용해서 삭제해주기
     def delete(request,article_pk):
         article = Article.objects.get(pk=article_pk)
         article.delete()
         return redirect('pages:index')
     ```

  5. templates/ html 수정

     ```html
     <!-- index.html -->
     {% extends 'base.html' %}
     
     {% block content %}
       <h1>여기는 인덱스 페이지</h1>
       <a href="{% url 'pages:create' %}"> 생성하기</a>
       <hr>
     
       {% for article in articles  %}
         <a href="{% url 'pages:detail' article.pk %}">
           <p>{{article.title}}</p>
         </a>
         <hr>
       {% endfor %}
     {% endblock content %}
     
     <!-- create.html는 수정 안했음 -->
     
     <!-- detail.html -->
     <!-- 얘는 좀 손게 있어서 따로 상속 받지 않고 사용 -->
     <!DOCTYPE html>
     <html lang="en">
     <head>
       <meta charset="UTF-8">
       <meta http-equiv="X-UA-Compatible" content="IE=edge">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <style>
         body {
           width: 60%;
           padding: 0 20%;
           margin: 0;
         }
         
     
         #article > pre {
           padding: 2rem 0;
           display: flex;
           justify-content: center;
           align-items: center;
           background-color: black;
           color: white;
         }
     
         #title {
           margin-left: 10px;
           font-size: 2rem;
           font-weight: 900;
         }
     
         #date {
           font-size: 0.7rem;
         }
     
         section + article {
           margin-top: 5rem;
           background-color: bisque;
         }
     
         a {
           text-decoration: none;
           color: cadetblue;
           font-weight: 400;
         }
     
         a:hover {
           color: darkolivegreen;
         }
       </style>
       <title>Document</title>
     </head>
     <body >
       <section>
         <h1>✔</h1>
       </section>
       <article>
         <div id="article">
           <div id="title">{{article.title}}</div>
           <span id="date">{{article.write_date}}</span>
           <pre>{{article.content}}</pre>
           <a href="{% url 'pages:update' article.pk %}">게시글 수정 / </a>
           <a href="{% url 'pages:delete' article.pk %}">게시글 삭제</a>
         </div>
       </article>
     
       
     
       <a href="{% url 'pages:index' %}">메인페이지</a>
     </body>
     </html>
     
     <!-- update.html -->
     {% extends 'base.html' %}
     
     {% block content %}
       <h1>수정 페이지</h1>
       <form method="POST">
         {% csrf_token %}
         {{form.as_p}}
         <input type="submit" value="수정">
       </form>
     {% endblock content %}
     ```

     
