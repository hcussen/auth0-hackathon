# About

Hosted on PythonAnywhere [https://ethanmasters.pythonanywhere.com/](here).

<!-- create a loom -->

Due to COVID-19, charities that relied on in-person events and donations are forced to move online, making their benefits less tangible to people who may donate. We want to encourage thinking of donations in the concrete rather than the abstract, so that people are more likely to think about the concrete benefits of their donation.

We created a small store that allows displaying "products" for "purchase", but which are really donation increments. These products can be something small and concrete, for example an an animal shelter might ask for dog food. They might also be donations towards a larger goal, like a building expansion. These larger goals have a progress bar so the potential donator sees what they are working towards, but the checkout is the same so it feels like buying a piece of the goal.

# How It Works

We created a React-based frontend for Stripe, the payments processing company, so that a nonprofit can create "products" that they need. When a potential donator visits the site, they see a selection of "products" and can purchase one. These purchase buttons redirect to a Stripe-hosted Checkout page, so that Stripe securely processes all payment.

In order to keep track of these payments, we send information from new payments into MongoDB, which keeps a running total of the amount raised towards a specific goal, as well as the email addresses of those who donate.

The React frontend updates in real time based on information from the database.

We have the donor-facing "store" of our frontend, and we also wanted to add a private dashboard for the nonprofit manager. Using Auth0, we authenticate a user, allowing them into the private section of the app. Within this private segment, the user can see progress towards a goal.

# Tech Stack

React frontend calls Flask server backend to render info, and makes redirects to Stripe Checkout. Flask server receives webhook notifications from Stripe, and acts on them to update MongoDB database.
Auth0 used to provide authentification in React app for private routes.
PythonAnywhere used to host the site at [https://ethanmasters.pythonanywhere.com/](here).

# How to Use it

## Potential Donor's Perspective

The potential donor would simply use this like a store.

## Organization's Perspective

To use this, an organization would need to set up a Stripe account and add "products". Then, they would have to connect their stripe account to the frontend by plugging in their stripe and MongoDB API keys. Then, they'd deploy it into Python Anywhere.
Another thing we like about Stripe is that the actual earmarking of these funds remains up to the nonprofit. For example, if people really like to buy dog food, there's nothing to stop our City Animal Shelter from using that money to buy cat food. The differences in product purchases may give nonprofits an insight into what spurs people to donate and capitalize on that for future campaigns.

## Developer's Perspective

### Developing locally

In `/api/api.py`, replace `<<REPLACE WITH STRIPE SECRET KEY>>` and `<< REPLACE WITH MONGODB CONNECTION STRING>>` with the appropriate secret keys (lines 5 and 8).

use `yarn start-api` to start the flask api, and `yarn start` to start the react app

# License

MIT License

Copyright (c) <year> <copyright holders>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice (including the next paragraph) shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
