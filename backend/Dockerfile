
FROM python:3.12-slim

WORKDIR /backend

COPY . /backend

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

EXPOSE 8000

CMD ["uvicorn", "api:app"]