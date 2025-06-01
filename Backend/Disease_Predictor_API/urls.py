from django.urls import path
from .views import PredictDiseaseView, GetFeaturesView

urlpatterns = [
    path('predict/', PredictDiseaseView.as_view(), name="pedict_disease"),
    path('features/', GetFeaturesView.as_view(), name="get_features"),
]