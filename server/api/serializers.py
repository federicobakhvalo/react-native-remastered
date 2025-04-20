from typing import Dict, Optional

from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken

from .models import CustomUser
import re



class RegisterSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    username = serializers.CharField(required=False)  # Необязательное поле для мобильных приложений


    def validate_email(self, value):
        # Регулярное выражение для проверки email (если нужно дополнительно проверять)
        email_regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
        if not re.match(email_regex, value):
            raise serializers.ValidationError({'field': 'email', 'message': "Email не корректный."})

        if CustomUser.objects.filter(email=value).exists():
            raise serializers.ValidationError({"field": "email", 'message': "Email уже зарегистрирован."})

        return value



    def validate_username(self, value):

        if CustomUser.objects.filter(username__iexact=value).exists():
            raise serializers.ValidationError({"field":"username",'message':"Имя пользователя уже существует."})
        return value

    def validate_password(self, value):
        if len(value) < 6:
            raise serializers.ValidationError({'field':"password",'message':"Пароль должен быть более 6 символов."})
        if not any(char.isdigit() for char in value) and not any(char.isalpha() for char in value):
            raise serializers.ValidationError({'field':"password",'message':"Пароль должен содержать хотя бы одну цифру и букву"})
        return value

    def create(self, validated_data):
        return CustomUser.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            username=validated_data.get('username',None)
        )


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):


    def new_tokens(self, user: CustomUser) -> Dict:



        refresh_token = RefreshToken.for_user(user)
        access_token = refresh_token.access_token

        # Добавляем кастомные поля
        access_token['user_id'] = user.id
        access_token['username'] = user.username
        access_token['email'] = user.email
        access_token['avatar_url'] = user.avatar_url


        return {
            'access': str(access_token),
            'refresh': str(refresh_token),
        }


    def _validate_email(self,email:str)->bool:
        email_regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
        if not re.match(email_regex,email):
            return False
        return True



    def validate(self, attrs):
        login = attrs.get("username")
        password = attrs.get("password")


        # Найдем пользователя, который соответствует введенному логину (email или username)
        try:
            if '@' in login and self._validate_email(login):
                user = CustomUser.objects.get(email__iexact=login)
                login=user.username
            else:
                user = CustomUser.objects.get(username__iexact=login)
        except CustomUser.DoesNotExist:
            raise serializers.ValidationError("Неверное имя пользователя или пароль")

        # Проверим пароль
        if not user.check_password(password):
            raise serializers.ValidationError("Неверное имя пользователя или пароль")
        return self.new_tokens(user=user)