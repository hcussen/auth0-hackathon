import time
import stripe
from flask import Flask

app = Flask(__name__)

stripe.api_key = "sk_test_51HDkRmEZFQAi6Kd7pAkZZtS33tq2Q1NG1dyqfO8gW1haptjw3fbadqTFfHO413T1wLUd7dHsXTw2TXQh7BWjq1EP00IDLvE3uZ"


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


@app.route('/time')
def get_current_time():
    return {'time': time.time()}
