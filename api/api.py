import time
import stripe
from flask import Flask

app = Flask(__name__)


@app.route('/prod')
def get_prod():
    return {'prod': stripe.Product.retrieve("prod_Hnc31zqvvzlZbo")}


@app.route('/time')
def get_current_time():
    return {'time': time.time()}
