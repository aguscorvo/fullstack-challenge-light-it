FROM python:3.11-slim

WORKDIR /app

COPY /app/requirements.txt .

RUN apt-get update && \
    apt-get install -y gcc libmariadb-dev-compat libmariadb-dev pkg-config && \
    rm -rf /var/lib/apt/lists/*

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "app.main:app", "--reload", "--host", "0.0.0.0", "--port", "8000"]
