from django import forms

class ArticleForm(forms.Form):
    title = forms.CharField(max_length=30)
    content = forms.CharField()
    created_date = forms.DateField()