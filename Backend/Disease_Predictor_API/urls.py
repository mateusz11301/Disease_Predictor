from django.urls import path
from .views import PredictDiseaseView, GetFeaturesView, GetFeaturesPlView, GetLabelsPlView

urlpatterns = [
    path('predict/', PredictDiseaseView.as_view(), name="pedict_disease"),
    path('features/', GetFeaturesView.as_view(), name="get_features"),
    path('featuresPl/', GetFeaturesPlView.as_view(), name="get_features"),
    path('labelsPl/', GetLabelsPlView.as_view(), name="get_features"),
]