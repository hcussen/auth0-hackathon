from pymongo import MongoClient
import stripe
stripe.api_key = "sk_test_51HDkRmEZFQAi6Kd7pAkZZtS33tq2Q1NG1dyqfO8gW1haptjw3fbadqTFfHO413T1wLUd7dHsXTw2TXQh7BWjq1EP00IDLvE3uZ"

client = MongoClient(
    "mongodb+srv://ethanmasters:Ranger34@cluster0.v15ar.mongodb.net/Cluster0?retryWrites=true&w=majority")
db = client.business
mycol = db.products


invoice = stripe.Invoice.retrieve("in_1HE4FGEZFQAi6Kd7orsQSvgx")


name = invoice["customer_name"]
print("Donator's name:", name)

email = invoice["customer_email"]
print("Doantor's eamil:", email)


purchase = invoice["lines"]["data"]


for i in purchase:
    currency = i["currency"]
    amount = i["amount"] / 100
    prod_name = i["description"]
    print(prod_name, "-", amount, currency)

    myquery = {prod_name: mycol.find_one()[prod_name]}
    newvalues = {"$set": {prod_name: mycol.find_one()[prod_name] + amount}}

    mycol.update_one(myquery, newvalues)


print()


x = mycol.find_one()
print("Total money spent on Dog Food:", x["Dog Food"], currency)
x = mycol.find_one()
print("Total money spent on Cat Food:", x["Cat Food"], currency)
x = mycol.find_one()
print("Total Kennel Expansion Donations:",
      x["Kennel Expansion Donation"], currency)


'''
checkout = stripe.checkout.Session.retrieve("cs_test_43NoIinzHAhbzPdh7trbnij3YoixQuQUoAd7XM4Ly9qT8M87QVOPNGvc")
customer = stripe.Customer.retrieve(checkout["customer"])
pi = stripe.PaymentIntent.retrieve(checkout["payment_intent"])

name = customer["name"]
print(name)

email = customer["email"]
print(email)

product = pi["description"]
print(product)

amount_paid = checkout["amount_total"] / 100
print(amount_paid)
'''
