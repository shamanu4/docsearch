# Main idea is to build SPA and then reuse files
# Later we can add here serverside rendering in 2 or 3 stage
FROM python:3.7

WORKDIR /srv/app
COPY . /srv/app/
RUN pip install -U pip pybind11 && pip install -r requirements.txt && mkdir -p /root/nltk_data/{corpora,tokenizers}/
RUN python -c "import nltk; nltk.download('stopwords'); nltk.download('punkt'); print('NLTK DOWNLOAD OK.')"
EXPOSE 8080
ENTRYPOINT ["python", "server.py"]
