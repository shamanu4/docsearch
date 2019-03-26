import logging
import os
import sys

from nltk.corpus import stopwords

DB_HOST = os.getenv('DB_HOST', 'localhost')
DB_PORT = os.getenv('DB_PORT', '5432')
DB_NAME = os.getenv('DB_NAME', 'docsearchdb')
DB_USER = os.getenv('DB_USER', 'docsearch')
DB_PASSWORD = os.getenv('DB_PASSWORD', '')

MAX_ITEMS_PER_PAGE = 100
DEFAULT_ITEMS_PER_PAGE = 20
SEARCH_RESULT_COUNT = 10
BASE_DIR = os.path.dirname(os.path.realpath(__file__))
WORD2VEC_MODEL_WORDS_LIMIT = 500000

INDEX_SAVE_PATH = os.path.join(BASE_DIR, "data/index.bin")
MODEL_DATA_PATH = os.path.join(BASE_DIR, "data/GoogleNews-vectors-negative300.bin.gz")
INDEX_MAX_SIZE = 10000
IGNORED_WORDS = set(stopwords.words('english'))

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s %(threadName)10s %(name)18s: %(message)s',
    stream=sys.stdout,
    datefmt='%Y-%m-%d %H:%M:%S'
)
