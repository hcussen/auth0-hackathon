import time
import stripe
from flask import Flask

app = Flask(__name__)

stripe.api_key = "sk_test_51HDkRmEZFQAi6Kd7pAkZZtS33tq2Q1NG1dyqfO8gW1haptjw3fbadqTFfHO413T1wLUd7dHsXTw2TXQh7BWjq1EP00IDLvE3uZ"


@app.route('/prod')
def get_prod():
    return {'prod': stripe.Product.retrieve("prod_Hnc31zqvvzlZbo")}


@app.route('/prodprice')
def get_Price():
    return {'price': stripe.Price.list(product="prod_Hnc31zqvvzlZbo")}
    # return {'price': "what's up"}


@app.route('/time')
def get_current_time():
    return {'time': time.time()}
