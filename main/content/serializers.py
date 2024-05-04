from rest_framework import serializers

from .models import Movies , Seryal ,PartSeryal , Category


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('__all__')


class MovieSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField(read_only = True , many=True)
    class Meta:
        model = Movies
        fields = ('__all__')


class SeryalSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField(many=True)
    parts = serializers.SerializerMethodField()

    class Meta:
        model = Seryal
        fields = ('__all__')

    def get_parts(self , obj):
        reslut = obj.parts_seryal.all()
        return PartSeryalSerializer(instance=reslut , many = True).data


class PartSeryalSerializer(serializers.ModelSerializer):
    class Meta:
        model = PartSeryal
        fields = ('part', 'video')
