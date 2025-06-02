import os
import json
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent.parent

_labels = None

def get_PlLabels():
    global _labels
    if _labels is None:
        features_path = os.getenv("LABELS_PL_FILE")
        if not features_path:
            raise ValueError("Brak zmiennej środowiskowej LABELS_PL_FILE")

        full_path = BASE_DIR / features_path

        if not full_path.exists():
            raise FileNotFoundError(f"Nie znaleziono pliku: {full_path}")

        with open(full_path, "r", encoding="utf-8") as f:
            _labels = json.load(f)

    return _labels