FROM python:3.12.8-slim

WORKDIR /app

COPY . .

RUN pip install --upgrade pip
RUN pip install -r Backend/requirements.txt

EXPOSE 8000

CMD ["python", "Backend/manage.py", "runserver", "0.0.0.0:8000"]