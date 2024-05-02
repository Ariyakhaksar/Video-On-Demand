from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from .models import Movies , Seryal , Category
from .serializers import (
    MovieSerializer,
    SeryalSerializer,
    CategorySerializer
)

import random
# Create your views here.



class CategorysAPIView(APIView):
    """
        List all catgorys
    """
    
    serializer_class = CategorySerializer

    def get(self , request):
        queryset = Category.objects.all()
        srz_data = self.serializer_class(instance=queryset , many = True)
        return Response(data=srz_data.data , status=status.HTTP_200_OK)
    
    
class CategoryRetrieveAPIView(APIView):
    """
        In this view, a category is captured. 

        Note: It is necessary to capture the category slug.
    """

    serializer_class = CategorySerializer

    def get(self , request , slug_category):
        queryset = Category.objects.get(slug = slug_category)
        srz_data = self.serializer_class(instance=queryset)
        return Response(data=srz_data.data , status=status.HTTP_200_OK)


class MoviesAPIView(APIView):
    """
        List all movies
    """

    serializer_class = MovieSerializer

    def get(self , request):
        queryset = Movies.objects.all()
        srz_data = self.serializer_class(instance=queryset , many = True)
        return Response(data=srz_data.data , status=status.HTTP_200_OK)
    

class MovieRetrieveAPIView(APIView):
    """
        In this view, a movie is captured. 

        Note: It is necessary to capture the movie slug.
    """

    serializer_class = MovieSerializer

    def get(self , request , slug_movie):
        queryset = Movies.objects.get(slug = slug_movie)
        srz_data = self.serializer_class(instance=queryset)
        return Response(data=srz_data.data , status=status.HTTP_200_OK)
    

class SeryalsAPIView(APIView):
    """
        List all seryals
    """

    serializer_class = SeryalSerializer

    def get(self , request):
        queryset = Seryal.objects.all()
        srz_data = self.serializer_class(instance=queryset , many = True)
        return Response(data=srz_data.data , status=status.HTTP_200_OK)
    
    
class SeryalRetrieveAPIView(APIView):
    """
        In this view, a seryal is captured. 

        Note: It is necessary to capture the seryal slug.
    """

    serializer_class = SeryalSerializer

    def get(self , request , slug_seryal):
        queryset = Seryal.objects.get(slug = slug_seryal)
        srz_data = self.serializer_class(instance=queryset)
        return Response(data=srz_data.data , status=status.HTTP_200_OK)
    

class RecommendedMovieAPIView(APIView):
    """
        In this view, 4 random movies are displayed to the user (4 suggested movies),
        preferably shown on the movie details pages. 🎬
    """

    serializer_class = MovieSerializer

    def get(self, request):
        object_list= Movies.objects.all()

        if object_list:
            movies = random.sample(list(object_list),k=4)
            
            srz_data = self.serializer_class(instance=movies , many = True)
            return Response(data=srz_data.data, status=status.HTTP_200_OK)
        return Response('There is no movie',status=status.HTTP_424_FAILED_DEPENDENCY)


class RecommendedSeryalAPIView(APIView):
    """
        In this view, 4 random seryals are displayed to the user (4 suggested seryals),
        preferably shown on the movie details pages. 🎬
    """

    serializer_class = SeryalSerializer

    def get(self, request):
        object_list= Seryal.objects.all()
        if object_list:

            seryals = random.sample(list(object_list),k=4)
            
            srz_data = self.serializer_class(instance=seryals , many = True)
            return Response(data=srz_data.data, status=status.HTTP_200_OK)
        return Response('There is no seryal',status=status.HTTP_424_FAILED_DEPENDENCY)


    



