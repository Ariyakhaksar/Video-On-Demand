from django.core.exceptions import ValidationError

def valid_phone(value):
    if not value.startswith('09'):
        raise ValidationError('Number phone invalid...')
    
    if len(value) != 11:
        raise ValidationError('The phone number must be 11 digits...')
    return value
