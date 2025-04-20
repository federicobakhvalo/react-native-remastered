from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.views import status
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .serializers import *


# Create your views here.



class RegisterView(APIView):
    def post(self,request)->Response:
        try:
            serializer=RegisterSerializer(data=request.data)
            if serializer.is_valid():
                user=serializer.save()
                tokens=CustomTokenObtainPairSerializer().new_tokens(user)

                return Response(tokens,status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors,status=status.HTTP_403_FORBIDDEN)
        except Exception as E:
            return Response({'error':str(E)},status=status.HTTP_400_BAD_REQUEST)
        finally:
            return Response(500,status=status.HTTP_500_INTERNAL_SERVER_ERROR)
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.data.get('refresh')

        try:
            refresh = RefreshToken(refresh_token)
            user = CustomUser.objects.get(id=refresh['user_id'])

        except (KeyError, CustomUser.DoesNotExist):
            return Response({"detail": "Неверный refresh токен"}, status=status.HTTP_400_BAD_REQUEST)

        # Используем old_refresh_token, чтобы создать новый и кастомизировать access
        tokens = CustomTokenObtainPairSerializer().new_tokens(user)

        return Response(tokens, status=status.HTTP_200_OK)

