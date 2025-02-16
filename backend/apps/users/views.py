from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.response import Response
from .serializers import CustomTokenObtainPairSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            tokens = serializer.validated_data
            response_data = {
                "is_error": False,
                "error": {},
                "content": {
                    "refresh": tokens.get("refresh"),
                    "access": tokens.get("access"),
                },
                "role": tokens.get(
                    "role"
                ),  # Replace this with logic to determine the user's role
            }
        except Exception as e:
            response_data = {
                "is_error": True,
                "error": {"detail": str(e)},
                "content": {},
            }
        return Response(response_data)


class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            tokens = serializer.validated_data
            response_data = {
                "is_error": False,
                "error": {},
                "content": {
                    "refresh": tokens.get("refresh"),
                    "access": tokens.get("access"),
                },
                "role": tokens.get(
                    "role"
                ),  # Replace this with logic to determine the user's role
            }
        except Exception as e:
            response_data = {
                "is_error": True,
                "error": {"detail": str(e)},
                "content": {},
            }
        return Response(response_data)

class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)  # Serialize the user object
        return Response({
            "is_error": False,
            "error": {},
            "content": serializer.data,
        })