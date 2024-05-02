from django.core.mail import send_mail

from django.conf import settings

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status


from .models import (
    FAQ,
    SaveMovie,
    SaveSeryal,
    VoteMovie,
    VoteSeryal,
    CommentMovie,
    CommentSeryal
)

from .serializers import (
    FAQSerializer,
    SaveMovieSerializer,
    SaveSeryalSerializer,
    CommentMovieSerializer,
    CommentSeryalSerializer,
    ContactUsSerializer
)

from content.models import Movies , Seryal

# Create your views here.


class FAQsAPIView(APIView):
    """
        List all FAQ
    """
    
    seializer_class = FAQSerializer

    def get(self , request):
        queryset = FAQ.objects.all()
        srz_data = self.seializer_class(instance=queryset , many = True)
        return Response(data=srz_data.data , status= status.HTTP_200_OK)
    

# Save Movies and seryals
class ListSaveMoviesAPIView(APIView):
    """
        List all Saves movie User
    """

    permission_classes = [IsAuthenticated]
    serializer_class = SaveMovieSerializer

    def get(self , request):
        user = request.user

        queryset = SaveMovie.objects.filter(user = user)
        srz_data = self.serializer_class(instance=queryset , many=True)
        return Response(data=srz_data.data , status=status.HTTP_200_OK)
    

class SaveMovieAPIView(APIView):
    """
        In this view:
        If the user has previously saved a movie, it will be deleted from the database (Un save).

        Otherwise, if the user intends to save a movie, the movie will be saved.

        Required fields:

        user : (the currently logged-in user)

        movie : (the ID of the movie to be saved or deleted from the database)
    """

    permission_classes = [IsAuthenticated]
    serializer_class = SaveMovieSerializer

    def get(self , request , movie_id):
        user = request.user
        movie = Movies.objects.get(id = movie_id)

        check = SaveMovie.objects.filter(user = user , movie = movie)
        if check.exists():
            check.delete()
            return Response('Movie unSave...' , status=status.HTTP_200_OK)
        
        else:
            SaveMovie.objects.create(user = user , movie = movie)
            return Response('Movie Save...' , status=status.HTTP_201_CREATED)
        

class ListSaveSeryalAPIView(APIView):
    """
        List all Saves Seryal User
    """

    permission_classes = [IsAuthenticated]
    serializer_class = SaveSeryalSerializer

    def get(self , request):
        user = request.user
        
        queryset = SaveSeryal.objects.filter(user = user)
        srz_data = self.serializer_class(instance=queryset , many=True)
        return Response(data=srz_data.data , status=status.HTTP_200_OK)
    

class SaveSeryalAPIView(APIView):
    """
        In this view:
        If the user has previously saved a seryal, it will be deleted from the database (Un save).

        Otherwise, if the user intends to save a seryal, the seryal will be saved.

        Required fields:

        user : (the currently logged-in user)

        seryal : (the ID of the seryal to be saved or deleted from the database)
    """

    permission_classes = [IsAuthenticated]
    serializer_class = SaveSeryalSerializer

    def get(self , request , seryal_id):
        user = request.user
        seryal = Seryal.objects.get(id = seryal_id)

        check = SaveSeryal.objects.filter(user = user , seryal = seryal)
        if check.exists():
            check.delete()
            return Response('Seryal unSave...' , status=status.HTTP_200_OK)
        
        else:
            SaveSeryal.objects.create(user = user , seryal = seryal)
            return Response('Seryal Save...' , status=status.HTTP_201_CREATED)
        

# Vote Movies and seryals
class LikeMovieAPIView(APIView):
    """
        In this view:
        The user can like their desired movie.

        Note: If the user has already liked the desired movie, this view behaves differently.
        In fact, it removes the liked movie from the database (user retrieves their like).

        Required fields:
        user: The currently logged-in user
        movie: The ID movie to be liked
    """

    permission_classes = [IsAuthenticated]

    def get(self , request , movie_id):
        user = request.user
        movie = Movies.objects.get(id = movie_id)

        try:
            check = VoteMovie.objects.get(user = user , movie = movie)
            check.delete()
            return Response(f'User {user.name} Pass Gereft {movie}' , status=status.HTTP_200_OK)

        except:
            VoteMovie.objects.create(user = user , movie = movie , liked= True)
            return Response(f'User {user.name} Liked Movie {movie}' , status=status.HTTP_200_OK)        


class DisLikeMovieAPIView(APIView):
    """
        In this view:
        The user can dislike their desired movie.

        Note: If the user has previously disliked the desired movie, this view behaves differently.
        It actually removes the movie that the user has disliked from the database (the user retrieves their dislike).

        Mandatory fields:
        user: The user who is currently logged in
        movie: The ID movie to be disliked
    """

    permission_classes = [IsAuthenticated]

    def get(self , request , movie_id):
        user = request.user
        movie = Movies.objects.get(id = movie_id)
  
        try:
            check = VoteMovie.objects.get(user = user , movie = movie)
            check.delete()
            return Response(f'user{user.name} Pass Gereft...{movie}' , status=status.HTTP_200_OK)
        
        except:
            VoteMovie.objects.create(user = user , movie =movie , liked=False)
            return Response(f'user {user.name} Disliked {movie}' , status=status.HTTP_200_OK)
        

class LikeSeryalAPIView(APIView):
    """
        In this view:
        The user can like their desired seryal.

        Note: If the user has already liked the desired seryal, this view behaves differently.
        In fact, it removes the liked seryal from the database (user retrieves their like).

        Required fields:
        user: The currently logged-in user
        seryal: The ID seryal to be liked
    """

    permission_classes = [IsAuthenticated]

    def get(self , request , seryal_id):
        user = request.user
        seryal = Seryal.objects.get(id = seryal_id)

        try:
            check = VoteSeryal.objects.get(user = user , seryal = seryal)
            check.delete()
            return Response(f'User {user.name} Pass Gereft {seryal}' , status=status.HTTP_200_OK)

        except:
            VoteSeryal.objects.create(user = user , seryal = seryal , liked= True)
            return Response(f'User {user.name} Liked seryal {seryal}' , status=status.HTTP_200_OK) 
        

class DisLikeSeryalAPIView(APIView):
    """
        In this view:
        The user can dislike their desired seryal.

        Note: If the user has previously disliked the desired seryal, this view behaves differently.
        It actually removes the seryal that the user has disliked from the database (the user retrieves their dislike).

        Mandatory fields:
        user: The user who is currently logged in
        seryal: The ID seryal to be disliked
    """

    permission_classes = [IsAuthenticated]

    def get(self , request , seryal_id):
        user = request.user
        seryal = Seryal.objects.get(id = seryal_id)
  
        try:
            check = VoteSeryal.objects.get(user = user , seryal = seryal)
            check.delete()
            return Response(f'user{user.name} Pass Gereft...{seryal}' , status=status.HTTP_200_OK)
        
        except:
            VoteSeryal.objects.create(user = user , seryal =seryal , liked=False)
            return Response(f'user {user.name} Disliked {seryal}' , status=status.HTTP_200_OK)
        

# CRUD comment movies
class ListCommentMoviesAPIView(APIView):
    """
        In this view:
        Returns a list of all movies saved by the user.

        Permission: User must be logged in. 
    """

    permission_classes = [IsAuthenticated]
    serializer_class = CommentMovieSerializer

    def get(self , request , movie_id):
        movie = Movies.objects.get(id = movie_id)
        comments = CommentMovie.objects.filter(movie = movie)
        srz_data = self.serializer_class(instance = comments , many = True)
        return Response(data=srz_data.data , status=status.HTTP_200_OK)
    
    
class CreateCommentMovieAPIView(APIView):
    """
        In this view:
        The user can post a comment for the desired movie.

        Permission: The user must be logged in.

        Required fields:
        user: The user who is currently logged in.
        movie: The ID of the movie for which the comment is going to be posted.
    """

    permission_classes = [IsAuthenticated]
    serializer_class = CommentMovieSerializer

    def post(self , request , movie_id):
        user = request.user
        movie = Movies.objects.get(id = movie_id)
        
        srz_data = self.serializer_class(data=request.data)
        if srz_data.is_valid():
            vd = srz_data.validated_data
            CommentMovie.objects.create(
                user = user,
                movie = movie,
                message = vd['message']
            )
            return Response(data=srz_data.data , status=status.HTTP_201_CREATED)
        return Response(srz_data.errors,status=status.HTTP_400_BAD_REQUEST)
    

class UpdateCommentMovieAPIView(APIView):
    """
        In this view:
        The user can edit a comment they have submitted.

        Permission: The user must be logged in.

        Required fields:
        user: The user is currently logged in.
        comment_id: The ID of the comment to be edited.
    """

    permission_classes = [IsAuthenticated]
    serializer_class = CommentMovieSerializer

    # def dispatch(self, request, *args, **kwargs):
    #     comment = CommentMovie.objects.get(id = kwargs['comment_id'])
    #     if not comment.user.id == request.user.id:
    #         return Response('User invalid......') 
    #     return super().dispatch(request, *args, **kwargs)

    def put(self , request , comment_id):
        comment = CommentMovie.objects.get(id = comment_id)

        srz_data = self.serializer_class(data=request.data , instance=comment)
        if srz_data.is_valid():
            if comment.user.id == request.user.id:
                srz_data.save()
                print(request.user.name)
                return Response(data=srz_data.data, status=status.HTTP_200_OK)
            else:
                return Response('User invalid......',status=status.HTTP_403_FORBIDDEN)
        return Response(srz_data.errors , status=status.HTTP_400_BAD_REQUEST)
    

class DeleteCommentMovieAPIView(APIView):
    """
        In this view:
        The user can delete their comment.

        Permission: The user must be logged in. 
    """

    permission_classes = [IsAuthenticated]

    def delete(self , request , comment_id):
        comment = CommentMovie.objects.get(id = comment_id)
        if comment.user.id == request.user.id:
            comment.delete()
            return Response('Comment Deleted successfuly' , status=status.HTTP_200_OK)
        else:
            return Response('User invalid', status=status.HTTP_403_FORBIDDEN)
        

# CRUD comment seryals
class ListCommentSeryalsAPIView(APIView):
    """
        In this view:
        Returns a list of all seryals saved by the user.

        Permission: User must be logged in. 
    """

    permission_classes = [IsAuthenticated]
    serializer_class = CommentSeryalSerializer

    def get(self , request , seryal_id):
        seryal = Seryal.objects.get(id = seryal_id)

        comments = CommentSeryal.objects.filter(seryal = seryal)
        srz_data = self.serializer_class(instance = comments , many = True)
        return Response(data=srz_data.data , status=status.HTTP_200_OK)
    

class CreateCommentSeryalAPIView(APIView):
    """
        In this view:
        The user can post a comment for the desired seryal.

        Permission: The user must be logged in.

        Required fields:
        user: The user who is currently logged in.
        seryal: The ID of the seryal for which the comment is going to be posted.
    """

    permission_classes = [IsAuthenticated]
    serializer_class = CommentSeryalSerializer

    def post(self , request , seryal_id):
        user = request.user
        seryal = Seryal.objects.get(id = seryal_id)
        
        srz_data = self.serializer_class(data=request.data)
        if srz_data.is_valid():
            vd = srz_data.validated_data
            CommentSeryal.objects.create(
                user = user,
                seryal = seryal,
                message = vd['message']
            )
            return Response(data=srz_data.data , status=status.HTTP_201_CREATED)
        return Response(srz_data.errors,status=status.HTTP_400_BAD_REQUEST)
    

class UpdateCommentSeryalAPIView(APIView):
    """
        In this view:
        The user can edit a comment they have submitted.

        Permission: The user must be logged in.

        Required fields:
        user: The user is currently logged in.
        comment_id: The ID of the comment to be edited.
    """

    permission_classes = [IsAuthenticated]
    serializer_class = CommentSeryalSerializer

    def put(self , request , comment_id):
        comment = CommentSeryal.objects.get(id = comment_id)

        srz_data = self.serializer_class(data=request.data , instance=comment)
        if srz_data.is_valid():
            if comment.user.id == request.user.id:
                srz_data.save()
                print(request.user.name)
                return Response(data=srz_data.data, status=status.HTTP_200_OK)
            else:
                return Response('User invalid......',status=status.HTTP_403_FORBIDDEN)
        return Response(srz_data.errors , status=status.HTTP_400_BAD_REQUEST)
    

class DeleteCommentSeryalAPIView(APIView):
    """
        In this view:
        The user can delete their comment.

        Permission: The user must be logged in. 
    """

    permission_classes = [IsAuthenticated]

    def delete(self , request , comment_id):
        comment = CommentSeryal.objects.get(id = comment_id)
        if comment.user.id == request.user.id:
            comment.delete()
            return Response('Comment Deleted successfuly' , status=status.HTTP_200_OK)
        else:
            return Response('User invalid', status=status.HTTP_403_FORBIDDEN)
        

class ContactUsAPIView(APIView):
    """
        In this view:
        The user submits their request to us.

        Permission: The user must be logged in.

        Required fields:
        subject
        Subject field keys:
        a ====> suported
        b ====> Technical Problems

        message: User's message
    """

    permission_classes = [IsAuthenticated]
    serializer_class = ContactUsSerializer

    def post(self , request):
        srz_data = self.serializer_class(data=request.data)

        if srz_data.is_valid():
            vd= srz_data.validated_data
            msg = """
                    User{0} /n
                    from phone : {1}
                    
                    Subject : {2}
                    Message send : {3}
                  """.format(
                      request.user.name,
                      request.user.phone,
                      vd['subject'],
                      vd['message']
                  )
            send_mail(vd['subject'],msg ,f'{settings.EMAIL_HOST_USER}' , [f'{settings.EMAIL_HOST_USER}'] , fail_silently=False)
            return Response('Send Message succesfuly' , status=status.HTTP_200_OK)
        return Response(srz_data.errors,status=status.HTTP_400_BAD_REQUEST)








        
        
    

