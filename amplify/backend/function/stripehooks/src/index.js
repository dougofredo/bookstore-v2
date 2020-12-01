const express = require('express');
const app = express();
const stripe = require('stripe')('sk_test_51HED8xCBGEmUdJgL4k4SW3OFsz3GafcGRpaxROASeHYe1MfKg8t6N2jI15PVZBsdXKAJR8TVwMToFYu9Y40L5waj00o7EkWufB');
// Find your endpoint's secret in your Dashboard's webhook settings
const endpointSecret = 'whsec_fWYwJWgFNpxHXF0fkdZHzKWG9WRkIp8K';
// Use body-parser to retrieve the raw body as a buffer
// const bodyParser = require('body-parser');

// Match the raw body to content type application/json
// app.post('/hooks', bodyParser.raw({type: 'application/json'}), (request, response) => {
// });

exports.handler = async (event) => {
  // const sig = request.headers['stripe-signature'];
  const sig = event.headers['stripe-signature'];

  if (event.body !== null && event.body !== undefined) {
    let body = JSON.parse(event.body)
    if (body.time)
        time = body.time;
}

  let stripeEven;
  try {
    stripeEven = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }
  // Handle the checkout.session.completed event
  if (stripeEven.type === 'checkout.session.completed') {
    const session = stripeEven.data.object;
    console.log("sesion",session);
    // Fulfill the purchase...
    // handleCheckoutSession(session);
  }
    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify(session),
    };
    return response;
};
