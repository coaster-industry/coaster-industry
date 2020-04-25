from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
@app.route("/home")
def home():
    """
    Home page.
    """
    return render_template('home.html')


@app.route("/explore")
def map():
    """
    The coaster industry map.
    """
    return render_template('map.html')


def handle_error_404(e):
    return render_template('error.html', msg="Oups, it seems you looked for a wrong page :(")


# Register HTTP error handlers
app.register_error_handler(404, handle_error_404)


# For testing
if __name__ == "__main__":
    app.run(
        host = "127.0.0.1",
        port = 8080,
        debug = True
    )