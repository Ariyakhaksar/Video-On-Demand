from django.test import TestCase , RequestFactory , Client
from django.contrib.auth.models import AnonymousUser
from django.urls import reverse

from rest_framework.test import force_authenticate

from accounts.models import User

from content.models import Movies , Seryal

from options import views
from options.models import *



class TestFAQsAPIView(TestCase):

    def setUp(self) -> None:
        self.client = Client()

    def test_FAQs_APIView_GET(self):
        response = self.client.get(reverse('faqs'))
        self.assertEqual(response.status_code , 200)

# Test Save movies and seryals
class TestListSaveMoviesAPIView(TestCase):

    def setUp(self) -> None:
        self.factory = RequestFactory()
        self.user = User.objects.create_user(
        phone='09654321234',
        name='Ali',
        lastname='Ghalenoei',
        email='test@gmail.com',
        password='test@5'
        )

    def test_list_save_movies_APIView_authenticated_GET(self):
        request = self.factory.get(reverse('save_movie_list'))
        # get request.user...
        force_authenticate(request, user=self.user) 
        response = views.ListSaveMoviesAPIView.as_view()(request)
        self.assertEqual(response.status_code, 200)


class TestSaveMovieAPIView(TestCase):

    def setUp(self) -> None:
        self.factory = RequestFactory()
        self.user = User.objects.create_user(
        phone='09654321234',
        name='Ali',
        lastname='Ghalenoei',
        email='test@gmail.com',
        password='test@5'
        )

        # instance: test_save_movie_APIView_GET 
        Movies.objects.create(
            title = 'Test',
            content = 'Test',
            restriction = 19,
            construction = 2020,
            slug = 'movie-slug',
            id = 3
        )

        # test_unsave_movie_APIView_GET (unsave movies)
        self.movie = Movies.objects.create(
            title = 'Test2',
            content = 'Test2',
            restriction = 19,
            construction = 2020,
            slug = 'movie2-slug',
            id = 4
        )

        SaveMovie.objects.create(
            user= self.user,
            movie = self.movie
        )

    def test_save_movie_APIView_GET(self):
        request = self.factory.get(reverse('seve_movie',args=[3] ))
        force_authenticate(request , self.user)
        response = views.SaveMovieAPIView.as_view()(request,movie_id =3)
        self.assertEqual(response.status_code ,201)

    def test_unsave_movie_APIView_GET(self):
        request = self.factory.get(reverse('seve_movie',args=[4]))
        force_authenticate(request ,self.user)
        response = views.SaveMovieAPIView.as_view()(request , movie_id = 4)
        self.assertEqual(response.status_code , 200)


class TestListSaveSeryalAPIView(TestCase):

    def setUp(self) -> None:
        self.factory = RequestFactory()
        self.user = User.objects.create_user(
        phone='09654321234',
        name='Ali',
        lastname='Ghalenoei',
        email='test@gmail.com',
        password='test@5'
        )

    def test_list_save_seryal_APIView_GET(self):
        request = self.factory.get(reverse('save_seryal_list'))
        force_authenticate(request,self.user)
        response = views.ListSaveSeryalAPIView.as_view()(request)
        self.assertEqual(response.status_code , 200)


class TestSaveSeryalAPIView(TestCase):

    def setUp(self) -> None:
        self.factory = RequestFactory()

        self.user = User.objects.create_user(
        phone='09654321234',
        name='Ali',
        lastname='Ghalenoei',
        email='test@gmail.com',
        password='test@5'
        )

        # instance: test_save_seryal_APIView_GET 
        Seryal.objects.create(
            title = 'Test',
            content = 'Test',
            restriction = 19,
            construction = 2020,
            slug = 'movie-slug',
            id = 1
        )

        # test_unsave_seryal_APIView_GET (unsave movies)
        self.seryal = Seryal.objects.create(
            title = 'Test',
            content = 'Test',
            restriction = 19,
            construction = 2020,
            slug = 'seryal-slug',
            id = 2
        )

        SaveSeryal.objects.create(
            user = self.user,
            seryal = self.seryal
        )

    def test_save_seryal_APIView_GET(self):
        request = self.factory.get(reverse('seve_seryal',args=[1]))
        force_authenticate(request,self.user)
        response = views.SaveSeryalAPIView.as_view()(request , seryal_id = 1)
        self.assertEqual(response.status_code , 201)

    def test_unsave_seryal_APIView_GET(self):
        request = self.factory.get(reverse('seve_seryal',args=[2]))
        force_authenticate(request,self.user)
        response = views.SaveSeryalAPIView.as_view()(request,seryal_id = 2)
        self.assertEqual(response.status_code, 200)

# Test Vote movies and seryals
class TestLikeMovieAPIView(TestCase):

    def setUp(self) -> None:
        self.factory = RequestFactory()

        self.user = User.objects.create_user(
            phone='09654321234',
            name='Ali',
            lastname='Ghalenoei',
            email='test@gmail.com',
            password='test@5'
        )
        
        # instance: test_try_like_movie_APIView_GET
        self.movie = Movies.objects.create(
            title = 'Test',
            content = 'Test',
            restriction = 19,
            construction = 2020,
            slug = 'movie-slug',
            id = 3
        )

        self.vote_movie = VoteMovie.objects.create(
            user = self.user,
            movie = self.movie,
            liked = True
        )

        # instance: test_except_like_movie_APIView_GET
        Movies.objects.create(
            title = 'Test',
            content = 'Test',
            restriction = 19,
            construction = 2020,
            slug = 'movie-slug',
            id = 1
        )

    def test_try_like_movie_APIView_GET(self):
        request = self.factory.get(reverse('like_movie',args=[3]))
        force_authenticate(request , self.user)
        response = views.LikeMovieAPIView.as_view()(request , movie_id = 3)
        self.assertEqual(response.status_code , 200)

    def test_except_like_movie_APIView_GET(self):
        request = self.factory.get(reverse('like_movie',args=[1]))
        force_authenticate(request , self.user)
        response = views.LikeMovieAPIView.as_view()(request , movie_id = 1)
        self.assertEqual(response.status_code , 200)


class TestDisLikeMovieAPIView(TestCase):

    def setUp(self) -> None:
        self.factory = RequestFactory()
        
        self.user = User.objects.create_user(
            phone='09654321234',
            name='Ali',
            lastname='Ghalenoei',
            email='test@gmail.com',
            password='test@5'
        )

        # instance: test_try_dislike_movie_APIView_GET
        self.movie = Movies.objects.create(
            title = 'Test',
            content = 'Test',
            restriction = 19,
            construction = 2020,
            slug = 'movie-slug',
            id = 3
        )


        self.vote_movie = VoteMovie.objects.create(
            user = self.user,
            movie = self.movie,
            liked = True
        )

        # instance: test_except_dislike_movie_APIView_GET
        Movies.objects.create(
            title = 'Test',
            content = 'Test',
            restriction = 19,
            construction = 2020,
            slug = 'movie-slug',
            id = 1
        )

    def test_try_dislike_movie_APIView_GET(self):
        request = self.factory.get(reverse('dislike_movie',args=[3]))
        force_authenticate(request,self.user)
        response = views.DisLikeMovieAPIView.as_view()(request , movie_id = 3)
        self.assertEqual(response.status_code,200)

    def test_except_dislike_movie_APIView_GET(self):
        request = self.factory.get(reverse('dislike_movie',args=[1]))
        force_authenticate(request,self.user)
        response = views.DisLikeMovieAPIView.as_view()(request , movie_id = 1)
        self.assertEqual(response.status_code,200)


class TestLikeSeryalAPIView(TestCase):

    def setUp(self) -> None:
        self.factory = RequestFactory()
        
        self.user = User.objects.create_user(
            phone='09654321234',
            name='Ali',
            lastname='Ghalenoei',
            email='test@gmail.com',
            password='test@5'
        )

        # instance: test_try_like_seryal_APIView_GET
        self.seryal = Seryal.objects.create(
            title = 'Test',
            content = 'Test',
            restriction = 19,
            construction = 2020,
            slug = 'seryal-slug',
            id = 3
        )

        self.vote_seryal = VoteSeryal.objects.create(
            user = self.user,
            seryal = self.seryal,
            liked = True
        )

        # instance: test_except_like_seryal_APIView_GET
        Seryal.objects.create(
            title = 'Test',
            content = 'Test',
            restriction = 19,
            construction = 2020,
            slug = 'seryal-slug',
            id = 1
        )

    def test_try_like_seryal_APIView_GET(self):
        request = self.factory.get(reverse('like_seryal',args=[3]))
        force_authenticate(request,self.user)
        response = views.LikeSeryalAPIView.as_view()(request , seryal_id = 3)
        self.assertEqual(response.status_code,200)

    def test_except_like_seryal_APIView_GET(self):
        request = self.factory.get(reverse('like_seryal',args=[1]))
        force_authenticate(request,self.user)
        response = views.LikeSeryalAPIView.as_view()(request , seryal_id = 1)
        self.assertEqual(response.status_code,200)


class TestDisLikeSeryalAPIView(TestCase):

    def setUp(self) -> None:
        self.factory = RequestFactory()
        
        self.user = User.objects.create_user(
            phone='09654321234',
            name='Ali',
            lastname='Ghalenoei',
            email='test@gmail.com',
            password='test@5'
        )

        # instance: test_try_dislike_seryal_APIView_GET
        self.seryal = Seryal.objects.create(
            title = 'Test',
            content = 'Test',
            restriction = 19,
            construction = 2020,
            slug = 'seryal-slug',
            id = 3
        )

        self.vote_seryal = VoteSeryal.objects.create(
            user = self.user,
            seryal = self.seryal,
            liked = True
        )

        # instance: test_except_dislike_seryal_APIView_GET
        Seryal.objects.create(
            title = 'Test',
            content = 'Test',
            restriction = 19,
            construction = 2020,
            slug = 'seryal-slug',
            id = 1
        )

    def test_try_dislike_seryal_APIView_GET(self):
        request = self.factory.get(reverse('dislike_seryal',args=[3]))
        force_authenticate(request,self.user)
        response = views.LikeSeryalAPIView.as_view()(request , seryal_id = 3)
        self.assertEqual(response.status_code,200)

    def test_except_dislike_seryal_APIView_GET(self):
        request = self.factory.get(reverse('dislike_seryal',args=[1]))
        force_authenticate(request,self.user)
        response = views.LikeSeryalAPIView.as_view()(request , seryal_id = 1)
        self.assertEqual(response.status_code,200)


# tests CRUD comment movie
class TestListCommentMoviesAPIView(TestCase):

    def setUp(self) -> None:
        self.factory = RequestFactory()

        self.user = User.objects.create_user(
            phone='09654321234',
            name='Ali',
            lastname='Ghalenoei',
            email='test@gmail.com',
            password='test@5'
        )

        self.movie = Movies.objects.create(
            title = 'Test',
            content = 'Test',
            restriction = 19,
            construction = 2020,
            slug = 'movie-slug',
            id = 3
        )

        CommentMovie.objects.create(
            user = self.user,
            movie = self.movie,
            message = 'Test Mesage...'
        )

    def test_comments_movie_GET(self):
        request = self.factory.get(reverse('comments_movie' , args=[3]))
        force_authenticate(request,self.user)
        response = views.ListCommentMoviesAPIView.as_view()(request , movie_id = 3)
        self.assertEqual(response.status_code , 200)


class TestCreateCommentMovieAPIView(TestCase):

    def setUp(self) -> None:
        self.factory = RequestFactory()

        self.user = User.objects.create_user(
            phone='09654321234',
            name='Ali',
            lastname='Ghalenoei',
            email='test@gmail.com',
            password='test@5'
        )

        self.movie = Movies.objects.create(
            title = 'Test',
            content = 'Test',
            restriction = 19,
            construction = 2020,
            slug = 'movie-slug',
            id = 3
        )

    def test_create_comment_movie_valid_POST(self):
        request = self.factory.post(reverse('create_comment_movie',args=[3]) , data={
            'message':'TEST Message...'
        }, content_type='application/json')
        force_authenticate(request , self.user)
        response = views.CreateCommentMovieAPIView.as_view()(request , movie_id = 3)
        self.assertEqual(response.status_code , 201)

    def test_create_comment_movie_invalid_POST(self):
        request = self.factory.post(reverse('create_comment_movie',args=[3]) , data={})
        force_authenticate(request , self.user)
        response = views.CreateCommentMovieAPIView.as_view()(request , movie_id = 3)
        self.assertEqual(response.status_code , 400)

    
class TestUpdateCommentMovieAPIView(TestCase):

    def setUp(self) -> None:
        self.factory = RequestFactory()

        self.user = User.objects.create_user(
            phone='09654321234',
            name='Ali',
            lastname='Ghalenoei',
            email='test@gmail.com',
            password='test@5'
        )
         # instance test_update_invalid_user_comment_PUT
        self.user2 = User.objects.create_user(
            phone='09655325235',
            name='Amir',
            lastname='Rezaei',
            email='test2@gmail.com',
            password='test2@5'
        )

        self.movie = Movies.objects.create(
            title = 'Test',
            content = 'Test',
            restriction = 19,
            construction = 2020,
            slug = 'movie-slug',
            id = 3
        )

        self.comment = CommentMovie.objects.create(
            user = self.user,
            movie = self.movie,
            message = 'Test Message....',
            id = 3
        )

    def test_invalid_data_update_comment_movie_PUT(self):
        request = self.factory.put(reverse('update_comment_movie' , args=[3]) , data={} , content_type='application/json')
        force_authenticate(request,self.user)
        response = views.UpdateCommentMovieAPIView.as_view()(request, comment_id = 3)
        self.assertEqual(response.status_code , 400)

    def test_update_valid_user_comment_movie_PUT(self):
        request = self.factory.put(reverse('update_comment_movie' , args=[3]) , data={
            'message' : 'Test Update Comment'
        }, content_type='application/json')
        force_authenticate(request,self.user)
        response = views.UpdateCommentMovieAPIView.as_view()(request, comment_id = 3)
        self.assertEqual(response.status_code , 200)

    def test_update_invalid_user_comment_movie_PUT(self):
        request = self.factory.put(reverse('update_comment_movie' , args=[3]) , data={
            'message' : 'Test Update Comment'
        }, content_type='application/json')
        force_authenticate(request,self.user2)
        response = views.UpdateCommentMovieAPIView.as_view()(request, comment_id = 3)
        self.assertEqual(response.status_code , 403)

    
class TestDeleteCommentMovieAPIView(TestCase):

    def setUp(self) -> None:
        self.factory = RequestFactory()

        self.user = User.objects.create_user(
            phone='09654321234',
            name='Ali',
            lastname='Ghalenoei',
            email='test@gmail.com',
            password='test@5'
        )

        self.user2 = User.objects.create_user(
            phone='09655325235',
            name='Amir',
            lastname='Rezaei',
            email='test2@gmail.com',
            password='test2@5'
        )

        self.movie = Movies.objects.create(
            title = 'Test',
            content = 'Test',
            restriction = 19,
            construction = 2020,
            slug = 'movie-slug',
            id = 3
        )

        self.comment = CommentMovie.objects.create(
            user = self.user,
            movie = self.movie,
            message = 'Test Message....',
            id = 3
        )

    def test_valid_user_delete_comment_movie_DELETE(self):
        request = self.factory.delete(reverse('delete_comment_movie' ,args=[3]))
        force_authenticate(request , self.user)
        response = views.DeleteCommentMovieAPIView.as_view()(request , comment_id = 3)
        self.assertEqual(response.status_code , 200)

    def test_invalid_user_delete_comment_movie_DELETE(self):
        request = self.factory.delete(reverse('delete_comment_movie' ,args=[3]))
        force_authenticate(request , self.user2)
        response = views.DeleteCommentMovieAPIView.as_view()(request , comment_id = 3)
        self.assertEqual(response.status_code , 403)


# tests CRUD comment seryal
class TestListCommentSeryalsAPIView(TestCase):

    def setUp(self) -> None:
        self.factory = RequestFactory()

        self.user = User.objects.create_user(
            phone='09654321234',
            name='Ali',
            lastname='Ghalenoei',
            email='test@gmail.com',
            password='test@5'
        )

        self.seryal = Seryal.objects.create(
            title = 'Test',
            content = 'Test',
            restriction = 19,
            construction = 2020,
            slug = 'movie-slug',
            id = 3
        )

        CommentSeryal.objects.create(
            user = self.user,
            seryal = self.seryal,
            message = 'Test Mesage...'
        )

    def test_comments_seryal_GET(self):
        request = self.factory.get(reverse('comments_seryal' , args=[3]))
        force_authenticate(request,self.user)
        response = views.ListCommentSeryalsAPIView.as_view()(request , seryal_id = 3)
        self.assertEqual(response.status_code , 200)


class TestCreateCommentSeryalAPIView(TestCase):

    def setUp(self) -> None:
        self.factory = RequestFactory()

        self.user = User.objects.create_user(
            phone='09654321234',
            name='Ali',
            lastname='Ghalenoei',
            email='test@gmail.com',
            password='test@5'
        )

        self.seryal = Seryal.objects.create(
            title = 'Test',
            content = 'Test',
            restriction = 19,
            construction = 2020,
            slug = 'seryal-slug',
            id = 3
        )

    def test_create_comment_seryal_valid_POST(self):
        request = self.factory.post(reverse('create_comment_seryal',args=[3]) , data={
            'message':'TEST Message...'
        }, content_type='application/json')
        force_authenticate(request , self.user)
        response = views.CreateCommentSeryalAPIView.as_view()(request , seryal_id = 3)
        self.assertEqual(response.status_code , 201)

    def test_create_comment_seryal_invalid_POST(self):
        request = self.factory.post(reverse('create_comment_seryal',args=[3]) , data={})
        force_authenticate(request , self.user)
        response = views.CreateCommentSeryalAPIView.as_view()(request , seryal_id = 3)
        self.assertEqual(response.status_code , 400)


class TestUpdateCommentSeryalAPIView(TestCase):

    def setUp(self) -> None:
        self.factory = RequestFactory()

        self.user = User.objects.create_user(
            phone='09654321234',
            name='Ali',
            lastname='Ghalenoei',
            email='test@gmail.com',
            password='test@5'
        )
         # instance test_update_invalid_user_comment_seryal_PUT
        self.user2 = User.objects.create_user(
            phone='09655325235',
            name='Amir',
            lastname='Rezaei',
            email='test2@gmail.com',
            password='test2@5'
        )

        self.seryal = Seryal.objects.create(
            title = 'Test',
            content = 'Test',
            restriction = 19,
            construction = 2020,
            slug = 'movie-slug',
            id = 3
        )

        self.comment = CommentSeryal.objects.create(
            user = self.user,
            seryal = self.seryal,
            message = 'Test Message....',
            id = 3
        )

    def test_invalid_data_update_comment_seryal_PUT(self):
        request = self.factory.put(reverse('update_comment_seryal' , args=[3]) , data={} , content_type='application/json')
        force_authenticate(request,self.user)
        response = views.UpdateCommentSeryalAPIView.as_view()(request, comment_id = 3)
        self.assertEqual(response.status_code , 400)

    def test_update_valid_user_comment_seryal_PUT(self):
        request = self.factory.put(reverse('update_comment_seryal' , args=[3]) , data={
            'message' : 'Test Update Comment'
        }, content_type='application/json')
        force_authenticate(request,self.user)
        response = views.UpdateCommentSeryalAPIView.as_view()(request, comment_id = 3)
        self.assertEqual(response.status_code , 200)

    def test_update_invalid_user_comment_seryal_PUT(self):
        request = self.factory.put(reverse('update_comment_seryal' , args=[3]) , data={
            'message' : 'Test Update Comment'
        }, content_type='application/json')
        force_authenticate(request,self.user2)
        response = views.UpdateCommentSeryalAPIView.as_view()(request, comment_id = 3)
        self.assertEqual(response.status_code , 403)


class TestDeleteCommentSeryalAPIView(TestCase):

    def setUp(self) -> None:
        self.factory = RequestFactory()

        self.user = User.objects.create_user(
            phone='09654321234',
            name='Ali',
            lastname='Ghalenoei',
            email='test@gmail.com',
            password='test@5'
        )

        self.user2 = User.objects.create_user(
            phone='09655325235',
            name='Amir',
            lastname='Rezaei',
            email='test2@gmail.com',
            password='test2@5'
        )

        self.seryal = Seryal.objects.create(
            title = 'Test',
            content = 'Test',
            restriction = 19,
            construction = 2020,
            slug = 'movie-slug',
            id = 3
        )

        self.comment = CommentSeryal.objects.create(
            user = self.user,
            seryal = self.seryal,
            message = 'Test Message....',
            id = 3
        )

    def test_valid_user_delete_comment_seryal_DELETE(self):
        request = self.factory.delete(reverse('delete_comment_seryal' ,args=[3]))
        force_authenticate(request , self.user)
        response = views.DeleteCommentSeryalAPIView.as_view()(request , comment_id = 3)
        self.assertEqual(response.status_code , 200)

    def test_invalid_user_delete_comment_seryal_DELETE(self):
        request = self.factory.delete(reverse('delete_comment_seryal' ,args=[3]))
        force_authenticate(request , self.user2)
        response = views.DeleteCommentSeryalAPIView.as_view()(request , comment_id = 3)
        self.assertEqual(response.status_code , 403)


class TestContactUsAPIView(TestCase):
    def setUp(self) -> None:
        self.factory = RequestFactory()

        self.user = User.objects.create_user(
            phone='09654321234',
            name='Ali',
            lastname='Ghalenoei',
            email='test@gmail.com',
            password='test@5'
        )

    def test_invalid_data_contact_us_POST(self):
        request = self.factory.post(reverse('contactus'),data={})
        force_authenticate(request,self.user)
        response = views.ContactUsAPIView.as_view()(request)
        self.assertEqual(response.status_code , 400)

    def test_valid_data_contact_us_POST(self):
        request = self.factory.post(reverse('contactus'),data={
            'subject':'a',
            'message':'Test Contact...'
        })
        force_authenticate(request,self.user)
        response = views.ContactUsAPIView.as_view()(request)
        self.assertEqual(response.status_code , 200)

    