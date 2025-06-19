# Disease Predictor Web App

A full-stack web application for disease classification based on symptoms. Built with **Django** for the backend (REST API), **React** for the frontend (user interface), and **FAISS**/**scikit-learn** for machine learning-based disease classification. The app allows users to input symptoms and receive the most probable diagnosis using pre-trained ML model.

---

## 📚 Project Info

**Author**: Mateusz Sochacki  
**Type**: School project on Artificial Intelligence  
**License**: Beerware (see below)

---

## 🚀 Getting Started

### Prerequisites

* Docker + Docker Compose

### 1. Clone the Repository

```bash
git clone https://github.com/mateusz11301/Disease_Predictor
cd Disease_Predictor
```

### 2. Build and Run with Docker

```bash
docker-compose up --build
```

* Frontend: [http://localhost:3000](http://localhost:3000)
* Backend API: [http://localhost:8000](http://localhost:8000)

---

## ⚙️ Tech Stack

### Frontend

* React (Vite)
* JavaScript
* Axios
* TailwindCSS

### Backend

* Django
* Django REST Framework
* Python 3.12

### ML & Data

* FAISS (KNN Index)
* scikit-learn (Decision Tree, Logistic Regression, KMeans)
* SMOTE for data balancing
* Pandas, NumPy, Seaborn, Matplotlib

---

## 📊 Machine Learning

### Dataset

* https://www.kaggle.com/datasets/dhivyeshrk/diseases-and-symptoms-dataset
* 377 symptoms
* 773 disease labels

### Preprocessing

* SMOTE (oversampling for rare diseases)
* Constant feature removal
* Feature similarity reduction via KS-test

### Models

* **KNN**: FAISS index for scalable similarity search
* **Decision Tree**: `DecisionTreeClassifier`
* **Logistic Regression**: `LogisticRegression`
* **KMeans**: Unsupervised clustering


---

## 🖥️ Frontend UI

* Input symptoms through an intuitive form
* View translated names (EN/PL)
* View diagnosis

---

## 📊 Model Evaluation Summary

Sample results from `results.json`:

```json
{
    "DecisionTree": {
        "accuracy": 0.92,
        "precision": 0.92,
        "recall": 0.92,
        "time": 77.29
    },
    "LogisticRegression": {
        "accuracy": 0.92,
        "precision": 0.92,
        "recall": 0.92,
        "time": 413.74
    },
    "KMeans": {
        "accuracy": 0.64,
        "precision": 0.65,
        "recall": 0.64,
        "time": 248.31
    },
    "KNN": {
        "accuracy": 0.90,
        "precision": 0.90,
        "recall": 0.90,
        "time": 174.88
    }
}
```

---

## 🧪 Development

```bash
# Windows
# Django backend dev
python -m venv .venv
.venv\Scripts\activate
cd Backend
pip install -r requirements.txt
python manage.py runserver

# React frontend dev
cd Frontend/disease_predictor_gui
npm install
npm run dev
```

---

## 📝 License

This project is open source under a modified Beerware License (no commercial use).  
You can use it, modify it, and share it freely. If we ever meet and you think this was useful,  
you can buy me a beer 🍺

Just don’t remove my name as the original author.  
**Project by Mateusz Sochacki (2025).**

> 🔍 This project was created for educational purposes only.  
> It is **not intended for commercial use or resale.**