from django.contrib import admin
# 추가
from django.contrib.auth.admin import UserAdmin
from .models import User

# Register your models here.

admin.site.register(User, UserAdmin)