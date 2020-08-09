from flask import Flask, request, Response

app = Flask(__name__)


@app.route('/', methods=['GET'])
def home():
    return "<h1>Distant Reading Archive</h1><p>This site is a prototype API for distant reading of science fiction novels.</p>"


@app.route('/webhook', methods=['POST'])
def respond():
    print(request.path)
    return Response(status=200)


if __name__ == "__main__":
    app.run()
