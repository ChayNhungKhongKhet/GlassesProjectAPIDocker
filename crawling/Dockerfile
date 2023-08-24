FROM python:3.9.16-slim-buster
COPY ../crawl /crawl_api
RUN pip install fastapi uvicorn
WORKDIR ./crawl_api
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]