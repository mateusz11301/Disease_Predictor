import pandas as pd

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


from .model_loader import get_model
from .feature_loader import get_features

class PredictDiseaseView(APIView):
    def post(self, request) -> Response:
        try:
            input_data = request.data.get("symptoms")
            if not input_data:
                return Response({"error": "Brak danych"}, status=status.HTTP_400_BAD_REQUEST)

            features = pd.DataFrame([input_data])

            model = get_model()

            prediction = model.predict(features)
            return Response({"disease": prediction[0]})

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class GetFeaturesView(APIView):
    def get(self, request) -> Response:
        try:
            features = get_features()

            return Response(features)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)