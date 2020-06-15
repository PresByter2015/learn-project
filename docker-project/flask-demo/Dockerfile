FROM python

RUN apt-get update

RUN pip install flask

WORKDIR /app

COPY ./hello /app/hello

ENTRYPOINT FLASK_APP=/app/hello/app.py flask run  -h 0.0.0.0  -p 80

EXPOSE 80