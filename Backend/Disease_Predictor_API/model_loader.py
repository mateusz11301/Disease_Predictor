import os
import pickle
from pathlib import Path
import py7zr

BASE_DIR = Path(__file__).resolve().parent.parent.parent

def extract_model(archive_path: Path, outpur_path: Path):
    try:
        with py7zr.SevenZipFile(archive_path, 'r') as archive:
            archive.extractall(outpur_path.parent)
    except Exception as e:
        raise RuntimeError(f"Błąd przy wypakowaniu modelu: {e}")


_model = None

def get_model() -> object:
    global _model
    if _model is None:
        model_path = os.getenv('MODEL_FILE')

        full_path = BASE_DIR / model_path
        archive_path = full_path.with_suffix('.7z')

        if model_path is None:
            raise ValueError("Błędna zmienna środowiskowa")

        if not full_path.exists():
            if archive_path.exists():
                extract_model(archive_path, full_path)
            else:
                raise FileNotFoundError("Brak pliku 7z z modelem")

        try:
            with open(full_path, 'rb') as f:
                _model = pickle.load(f)
        except FileNotFoundError:
            raise FileNotFoundError(f"Nie znaleziono pliku modelu: {full_path}")

    return _model