from django.test import TestCase

from accounts.models import User
from accounts.forms import UserCreationForm


class TestUserCreationForm(TestCase):

    @classmethod
    def setUpTestData(self):
        User.objects.create_user(
            phone = '09999999999',
            name ='Ali',
            lastname = 'Ghalenoei',
            email = 'Test@gmail.com',
            password = 't@5Ter',
        )

    def test_valid_data(self):
        form = UserCreationForm(data={
            'phone':'09555555555',
            'name':'KKKKKK',
            'lastname':'RRRRRR',
            'email':'jfhlkhf@gmail.com',
            'password':'pass@5',
            'password2':'pass@5'
        })
        self.assertTrue(form.is_valid())

    def test_empty_data(self):
        form = UserCreationForm(data={})
        self.assertFalse(form.is_valid())

    def test_phone_exist(self):
        form = UserCreationForm(data={
            'phone':'09999999999',
            'name':'Mahdi',
            'lastname':'Rahmati',
            'email':'mahdi@gmail.com',
            'password':'pass@5',
            'password2':'pass@5'
        })
        
        self.assertEqual(len(form.errors),1)
        self.assertEqual(form.has_error('phone'),1)

    def test_name_exist(self):
        form = UserCreationForm(data={
            'phone' : '09999899299',
            'name' :'Ali',
            'lastname' : 'Mohammadi',
            'email' : '2dwdwwd@gmail.com',
            'password' : 't@5Ter',
            'password2' : 't@5Ter',
        })

        self.assertEqual(len(form.errors),1)

    def test_lastname_exist(self):
        form = UserCreationForm(data={
            'phone' : '09949829299',
            'name' :'Amir',
            'lastname' : 'Ghalenoei',
            'email' : 'Amir@gmail.com',
            'password' : 't@5Ter',
            'password2' : 't@5Ter',
        })

        self.assertEqual(len(form.errors),1)
        self.assertEqual(form.has_error('lastname'),1)

    def test_unmatch_password(self):
        form = UserCreationForm(data={
            'phone':'09111111111',
            'name':'Rab',
            'lastname':'Den',
            'email':'kjdhfiugf@gmail.com',
            'password':'pass123',
            'password2':'pass'
        })
        self.assertEqual(len(form.errors),1)
        self.assertEqual(form.has_error('password2'),1)
    
    def test_email_exist(self):
        form = UserCreationForm(data={
            'phone':'09111111511',
            'name':'Jack',
            'lastname':'meet',
            'email':'Test@gmail.com',
            'password':'pass',
            'password2':'pass'
        })
        self.assertEqual(len(form.errors),1)
        self.assertEqual(form.has_error('email'),1)


