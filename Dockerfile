FROM python:3.8-alpine
LABEL maintainer="Lionel Jung <lionel.jung@etu.unistra.fr>"

WORKDIR /app
ADD requirements.txt ./
RUN pip install -r requirements.txt

ADD . .

EXPOSE 8080

ENV PORT=8080
ENV HOST=0.0.0.0
ENV DEBUG=True

CMD ["python", "run.py"]