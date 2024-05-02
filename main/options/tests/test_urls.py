from django.test import SimpleTestCase
from django.urls import reverse , resolve

from options import views


class TestUrls(SimpleTestCase):

    # tests save movie ans seryal
    def test_faqs_url(self):
        url = reverse('faqs')
        self.assertEqual(resolve(url).func.view_class,views.FAQsAPIView)

    def test_list_save_movies_url(self):
        url = reverse('save_movie_list')
        self.assertEqual(resolve(url).func.view_class ,views.ListSaveMoviesAPIView)

    def test_save_movie_url(self):
        url = reverse('seve_movie',args=[1])
        self.assertEqual(resolve(url).func.view_class , views.SaveMovieAPIView)

    def test_list_save_seryals_url(self):
        url = reverse('save_seryal_list')
        self.assertEqual(resolve(url).func.view_class ,views.ListSaveSeryalAPIView)

    def test_save_seryal_url(self):
        url = reverse('seve_seryal',args=[3])
        self.assertEqual(resolve(url).func.view_class ,views.SaveSeryalAPIView)

    # tests like/dislike movie and seryal
    def test_like_movies_url(self):
        url = reverse('like_movie',args=[1])
        self.assertEqual(resolve(url).func.view_class , views.LikeMovieAPIView)

    def test_dislike_movies_url(self):
        url = reverse('dislike_movie',args=[3])
        self.assertEqual(resolve(url).func.view_class , views.DisLikeMovieAPIView)

    def test_like_seryals_url(self):
        url = reverse('like_seryal',args=[3])
        self.assertEqual(resolve(url).func.view_class , views.LikeSeryalAPIView)

    def test_dislike_seryals_url(self):
        url = reverse('dislike_seryal',args=[3])
        self.assertEqual(resolve(url).func.view_class , views.DisLikeSeryalAPIView)

    # test CRUD comments movie
    def test_list_comments_movie_url(self):
        url = reverse('comments_movie' , args=[1])
        self.assertEqual(resolve(url).func.view_class , views.ListCommentMoviesAPIView)

    def test_create_comment_movie_url(self):
        url = reverse('create_comment_movie',args=[1])
        self.assertEqual(resolve(url).func.view_class , views.CreateCommentMovieAPIView)

    def test_update_comment_url(self):
        url = reverse('update_comment_movie',args=[1])
        self.assertEqual(resolve(url).func.view_class , views.UpdateCommentMovieAPIView)

    def test_delete_comment_url(self):
        url = reverse('delete_comment_movie',args=[1])
        self.assertEqual(resolve(url).func.view_class , views.DeleteCommentMovieAPIView)

    # test CRUD comments seryal
    def test_list_comments_seryal_url(self):
        url = reverse('comments_seryal' , args=[1])
        self.assertEqual(resolve(url).func.view_class , views.ListCommentSeryalsAPIView)

    def test_create_comment_seryal_url(self):
        url = reverse('create_comment_seryal',args=[1])
        self.assertEqual(resolve(url).func.view_class , views.CreateCommentSeryalAPIView)

    def test_update_seryal_comment_url(self):
        url = reverse('update_comment_seryal',args=[1])
        self.assertEqual(resolve(url).func.view_class , views.UpdateCommentSeryalAPIView)

    def test_delete_comment_seryal_url(self):
        url = reverse('delete_comment_seryal',args=[1])
        self.assertEqual(resolve(url).func.view_class , views.DeleteCommentSeryalAPIView)

    def test_delete_comment_seryal_url(self):
        url = reverse('contactus')
        self.assertEqual(resolve(url).func.view_class , views.ContactUsAPIView)
         