from app import app
from os import getenv

port = getenv("PORT")
host = getenv("HOST")
debug = getenv("DEBUG")

app.app.run(
    host = host,
    port = port ,
    debug = debug
)