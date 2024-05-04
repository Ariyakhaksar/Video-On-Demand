from django.contrib.auth.models import BaseUserManager

class UserManager(BaseUserManager):

    def create_user(self , phone , name , lastname , password , email = None):
        if not phone:
            raise ValueError('Errore Phone...')
        if not name:
            raise ValueError('Errore Name...')
        if not lastname:
            raise ValueError('Errore Lastname...')
        
        user = self.model(
            phone = phone,
            name = name,
            lastname = lastname
        )
        if email is not None:
            user.email = self.normalize_email(email)

        user.set_password(password)

        user.save(using = self._db)
        return user
    
    def create_superuser(self , phone , name , lastname , password):
        user = self.create_user(phone , name , lastname , password)
        user.is_admin = True
        user.is_superuser = True

        user.save(using = self._db)
        return user
