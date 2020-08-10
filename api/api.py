from pymongo import MongoClient
from flask import Flask, request, Response, send_from_directory
import stripe
import os
stripe.api_key = <<REPLACE WITH STRIPE SECRET KEY>>


client = MongoClient(<< REPLACE WITH MONGODB CONNECTION STRING>>,
                      connectTimeoutMS=30000, socketTimeoutMS=None, socketKeepAlive=True, connect=False, maxPoolsize=1)
db = client.business
mycol = db.products
mycol2 = db.contacts

cat_goal = 20
dog_goal = 2500

app = Flask(__name__, static_folder='./build', static_url_path='/')

# @app.route('/')
# def index():
#     return app.send_static_file('index.html')


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    path_dir = os.path.abspath("../build")  # path react build
    if path != "" and os.path.exists(os.path.join(path_dir, path)):
        return send_from_directory(os.path.join(path_dir), path)
    else:
        return send_from_directory(os.path.join(path_dir), 'index.html')


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


@app.route('/progress/cat')
def catprogress():
    cat_percent = mycol.find_one()["Cat Room Goal Percent"]
    return str(cat_percent)


@app.route('/progress/dog')
def dogprogress():
    dog_percent = mycol.find_one()["Kennel Expansion Goal Percent"]
    return str(dog_percent)


@app.route('/webhook', methods=['POST'])
def respond():
    event = request.get_json()
    info = event["data"]["object"]

    email = info["billing_details"]["email"]

    user = "user{}".format(mycol2.count())
    mycol2.insert_one({user: email})

    amount = info["amount"] / 100

    prod_name = info["description"]

    myquery = {prod_name: mycol.find_one()[prod_name]}
    newvalues = {"$set": {prod_name: mycol.find_one()[prod_name] + amount}}

    mycol.update_one(myquery, newvalues)

    if prod_name == "1x Cat Room Remodeling Donation":
        key = "Cat Room Goal Percent"
        goalq = {key: mycol.find_one()[key]}
        newnewv = {"$set": {key: (mycol.find_one()[prod_name] / cat_goal)*100}}

        mycol.update_one(goalq, newnewv)

    if prod_name == "1x Kennel Expansion Donation":
        key = "Kennel Expansion Goal Percent"
        goalq = {key: mycol.find_one()[key]}
        newnewv = {"$set": {key: (mycol.find_one()[prod_name] / dog_goal)*100}}

        mycol.update_one(goalq, newnewv)

    return Response(status=200)


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')


if __name__ == "__main__":
    app.run()
