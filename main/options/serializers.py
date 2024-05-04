from rest_framework import serializers

from .models import (
    FAQ,
    SaveMovie,
    SaveSeryal,
    CommentMovie,
    CommentSeryal
)


class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = ('__all__')

class SaveMovieSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only = True)
    movie = serializers.StringRelatedField(read_only = True)

    class Meta:
        model = SaveMovie
        fields = ('user','movie')

class SaveSeryalSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only = True)
    seryal = serializers.StringRelatedField(read_only = True)
    
    class Meta:
        model = SaveSeryal
        fields = ('user','seryal')

class CommentMovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentMovie
        fields = ('message',)

class CommentSeryalSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentSeryal
        fields = ('message',)

class ContactUsSerializer(serializers.Serializer):
    SUBJECT = (
        ('a','suported'),
        ('b','Technical Problems'),
    )

    subject = serializers.ChoiceField(choices=SUBJECT)
    message = serializers.CharField()






