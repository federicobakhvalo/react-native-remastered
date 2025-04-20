from django.contrib.auth.base_user import BaseUserManager


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password, username=None, **extra_fields):
        """
        Создает и сохраняет пользователя с email, password и username.
        """
        if not password:
            raise ValueError('Пароль обязателен')

        # Email обязателен, кроме случая создания суперпользователя
        if not email and not extra_fields.get("is_superuser", False):
            raise ValueError("Email обязателен")

        email = self.normalize_email(email)

        if not username:
            username = email.split('@')[0]

        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email=None, password=None, username=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if not username:
            raise ValueError("Имя пользователя обязательно для суперпользователя")

        return self.create_user(email=email, password=password, username=username, **extra_fields)

    # def get_by_nickname(self, nickname):
    #     return self.get(nickname=nickname)
