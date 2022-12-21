from django import forms
from .models import Article

class ArticleForm(forms.ModelForm):
    title = forms.CharField(max_length=30)
    content = forms.CharField(widget=forms.Textarea())
    write_date = forms.DateField()

    title.widget.attrs.update({'style': 'width:51.7rem; background-color :#C0DEFF; border:none; border-radius:2px', 'placeholder': '[BOJ]000_제목'})
    content.widget.attrs.update({'style': 'width: 50rem; height: 30rem; background-color :#C0DEFF; border:none; border-radius:4px','placeholder': '내용'})
    write_date.widget.attrs.update({'placeholder': '2022-12-19'})
    class Meta:
        model = Article
        fields = '__all__'
        