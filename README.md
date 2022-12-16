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

