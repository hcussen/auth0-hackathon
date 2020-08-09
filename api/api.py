# from pymongo import MongoClient
import stripe
from flask import Flask

app = Flask(__name__)

stripe.api_key = "sk_test_51HDkRmEZFQAi6Kd7pAkZZtS33tq2Q1NG1dyqfO8gW1haptjw3fbadqTFfHO413T1wLUd7dHsXTw2TXQh7BWjq1EP00IDLvE3uZ"

# client = MongoClient(
#     "mongodb+srv://ethanmasters:Ranger34@cluster0.v15ar.mongodb.net/Cluster0?retryWrites=true&w=majority")


@app.route('/')
def index():
    return app.send_static_file('../public/index.html')


@app.route('/prod/<id>')
def get_prod(id):
    if id != "undefined":
        return {'prod': stripe.Product.retrieve(id)}
    return {'prod': ''}


@app.route('/product_list')
def all_products():
    return {'list': stripe.Product.list()}


@app.route('/progress/<product_name>')
def progress(product_name):
    '''
    the first number is the progress made, second is the goal
    '''
    return "20"


@app.route('/prodprice/<id>')
def get_Price(id):
    return {'price': stripe.Price.list(product=id)}
