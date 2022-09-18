FROM python:3.8-slim

RUN apt-get update && apt-get install

RUN apt-get install -y \
  dos2unix \
  libpq-dev \
  libmariadb-dev-compat \
  libmariadb-dev \
  gcc \
  && apt-get clean

RUN python -m pip install --upgrade pip\
&& apt-get install -y postgresql postgresql-contrib libpq-dev python3-dev
RUN pip3 install --upgrade pip
COPY ./todolist/ ./

RUN pip3 install -r requirements.txt
RUN pip3 install gunicorn

#COPY wait-for-postgres.sh .
#RUN chmod +x wait-for-postgres.sh
