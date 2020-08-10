from pymongo import MongoClient
from flask import Flask, request, Response
import stripe
stripe.api_key = "sk_test_51HDkRmEZFQAi6Kd7pAkZZtS33tq2Q1NG1dyqfO8gW1haptjw3fbadqTFfHO413T1wLUd7dHsXTw2TXQh7BWjq1EP00IDLvE3uZ"


client = MongoClient("mongodb+srv://ethanmasters:Ranger34@cluster0.v15ar.mongodb.net/Cluster0?retryWrites=true&w=majority",
                     connectTimeoutMS=30000, socketTimeoutMS=None, socketKeepAlive=True, connect=False, maxPoolsize=1)
db = client.business
mycol = db.products
mycol2 = db.contacts

cat_goal = 20
dog_goal = 2500

app = Flask(__name__, static_folder='./build', static_url_path='/')


@app.route('/')
def index():
    return app.send_static_file('index.html')


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


@app.route('/webhook', methods=['POST'])
def respond():
    event = request.get_json()
    invoice = event["data"]["object"]["invoice"]

    invoice = stripe.Invoice.retrieve(invoice)

    email = invoice["customer_email"]

    user = "user{}".format(mycol2.count())
    mycol2.insert_one({user: email})

    purchase = invoice["lines"]["data"]

    for i in purchase:
        amount = i["amount"] / 100
        prod_name = i["description"]

        myquery = {prod_name: mycol.find_one()[prod_name]}
        newvalues = {"$set": {prod_name: mycol.find_one()[prod_name] + amount}}

        mycol.update_one(myquery, newvalues)

        if prod_name == "Cat Room Remodeling Donation":
            key = "Cat Room Goal Percent"
            goalq = {key: mycol.find_one()[key]}
            newnewv = {
                "$set": {key: (mycol.find_one()[prod_name] / cat_goal)*100}}

            mycol.update_one(goalq, newnewv)

        if prod_name == "Kennel Expansion Donation":
            key = "Kennel Expansion Goal Percent"
            goalq = {key: mycol.find_one()[key]}
            newnewv = {
                "$set": {key: (mycol.find_one()[prod_name] / dog_goal)*100}}

            mycol.update_one(goalq, newnewv)

    return Response(status=200)


@app.route('/progresscat')
def catprogress():
    cat_percent = mycol.find_one()["Cat Room Goal Percent"]
    return str(cat_percent)


@app.route('/progressdog')
def dogprogress():
    dog_percent = mycol.find_one()["Kennel Expansion Goal Percent"]
    return str(dog_percent)


if __name__ == "__main__":
    app.run()
