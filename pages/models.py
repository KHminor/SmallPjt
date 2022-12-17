from django.db import models

# Create your models here.

class Article(models.Model):
    title = models.CharField(max_length=30)
    content = models.TextField()
    write_date = models.DateField()
    updated_date = models.DateField(auto_now=True)
    created_date = models.DateField(auto_now_add=True)