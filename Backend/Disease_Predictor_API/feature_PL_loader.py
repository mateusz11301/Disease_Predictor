import os
import json
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent.parent

_features = None

def get_PlFeatures():
    global _features
    if _features is None:
        features_path = os.getenv("FEATURES_PL_FILE")
        if not features_path:
            raise ValueError("Brak zmiennej środowiskowej FEATURES_PL_FILE")

        full_path = BASE_DIR / features_path

        if not full_path.exists():
            raise FileNotFoundError(f"Nie znaleziono pliku: {full_path}")

        with open(full_path, "r", encoding="utf-8") as f:
            _features = json.load(f)

    return _features