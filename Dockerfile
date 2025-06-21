FROM python:3.12.8-slim

# Set working directory
WORKDIR /app

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH=/app/Backend

# Install system dependencies
RUN apt-get update && apt-get install -y p7zip-full build-essential

# Install Node.js for building frontend
RUN apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

# Install Python dependencies
COPY Backend/requirements.txt ./Backend/requirements.txt
RUN pip install --upgrade pip && pip install -r Backend/requirements.txt

# Copy backend and models
COPY Backend/ ./Backend
COPY Models_Files/ ./Models_Files

# Build frontend
COPY Frontend/disease_predictor_gui ./Frontend/disease_predictor_gui
WORKDIR /app/Frontend/disease_predictor_gui
RUN npm install && npm run build

# Copy built frontend into Django static files
WORKDIR /app
RUN mkdir -p Backend/static
RUN cp -r Frontend/disease_predictor_gui/dist/* Backend/static/

# Return to backend directory
WORKDIR /app/Backend

# Expose port
EXPOSE 8000

# Run Django app using Gunicorn
CMD ["gunicorn", "Backend.core.wsgi:application", "--bind", "0.0.0.0:8000"]