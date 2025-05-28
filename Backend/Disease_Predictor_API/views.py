from django.shortcuts import render

import os
import pickle
import pandas as pd

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class PredictDiseaseView(APIView):
    def post(self, request):
        try:
            # Wczytaj dane wejściowe (lista 0/1 jako symptomy)
            input_data = request.data.get("symptoms")
            if not input_data:
                return Response({"error": "Brak danych wejściowych."}, status=status.HTTP_400_BAD_REQUEST)

            features = pd.DataFrame([input_data])

            with open("../Models_Files/DecisionTree_model.pkl", "rb") as f:
                model = pickle.load(f)

            prediction = model.predict(features)
            return Response({"disease": prediction[0]})

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)