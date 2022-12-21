from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

# AbstractUser를 상속받는 커스텀 User 클래스 작성
# 기존의 User클래스도 AbstractUser를 상속받기 때문에 
# 커스텀 User 클래스도 완전히 같은 모습을 가지게 됨

class User(AbstractUser):
    pass

