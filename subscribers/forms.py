from django import forms
from .models import Subscriber

class SubscriberForm(forms.ModelForm):
    email = forms.EmailField(widget= forms.EmailInput(attrs={'placeholder':'Courriel', 'class':"form-control round-input"}),required=True)

    class Meta:
        model = Subscriber
        fields = ['email']