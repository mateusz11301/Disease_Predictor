FROM python:3.12.8-slim

WORKDIR /app/Backend

COPY Backend/ ./
COPY Models_Files/ ../Models_Files

RUN apt-get update && apt-get install -y p7zip-full
RUN pip install --upgrade pip && pip install -r requirements.txt

EXPOSE 8000

CMD ["gunicorn", "Disease_Predictor_API.wsgi:application", "--bind", "0.0.0.0:8000"]