import os
import pickle
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent.parent

_model = None

def get_model() -> object:
    global _model
    if _model is None:
        model_path = os.getenv('MODEL_FILE')
        full_path = BASE_DIR / model_path

        if model_path is None:
            raise ValueError("Błędna zmienna środowiskowa")

        try:
            with open(full_path, 'rb') as f:
                _model = pickle.load(f)
        except FileNotFoundError:
            raise FileNotFoundError(f"Nie znaleziono pliku modelu: {full_path}")

    return _model