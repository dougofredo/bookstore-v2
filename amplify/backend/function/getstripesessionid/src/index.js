const stripe = require('stripe')('sk_test_51HED8xCBGEmUdJgL4k4SW3OFsz3GafcGRpaxROASeHYe1MfKg8t6N2jI15PVZBsdXKAJR8TVwMToFYu9Y40L5waj00o7EkWufB');
var fs = require('fs');

exports.handler = async (event) => {
    console.log('Received event:', JSON.stringify(event));
    console.log("my query params",event['queryStringParameters']);
    var myquery = event['queryStringParameters'];
    // var b = myquery.b;
    //var amount= parseInt(b);

    var unit_amount0 = parseInt(myquery.unit_amount0);
    var quantity0 = parseInt(myquery.quantity0);
    var name0 = myquery.name0;

    console.log("unit_amount0 ",unit_amount0);
    console.log("quantity0 ",quantity0);
    console.log("name0 ",name0);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: name0,
          },
          unit_amount: unit_amount0,
        },
        quantity: quantity0,
      }],
      mode: 'payment',
      success_url: 'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'https://example.com/cancel',
    });


    const response = {
        statusCode: 200,
        body: JSON.stringify({session_id: session.id}),
        //body: JSON.stringify(event)
        //body: JSON.stringify('Hello from Fred!),
        headers: {
    "X-Requested-With": '*',
    "Access-Control-Allow-Headers": 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,x-requested-with',
    "Access-Control-Allow-Origin": '*',
    "Access-Control-Allow-Methods": 'POST,GET,OPTIONS'
},

    };
    return response;
};
//
//
// const stripe = require('stripe')('sk_test_51HED8xCBGEmUdJgL4k4SW3OFsz3GafcGRpaxROASeHYe1MfKg8t6N2jI15PVZBsdXKAJR8TVwMToFYu9Y40L5waj00o7EkWufB');
// var fs = require('fs');
//
//
//
// exports.handler = async (event) => {
//     // TODO implement
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: [{
//         price_data: {
//           currency: 'usd',
//           product_data: {
//             name: 'T-shirt',
//           },
//           unit_amount: 2000,
//         },
//         quantity: 1,
//       }],
//       mode: 'payment',
//       success_url: 'https://example.com/success?session_id={CHECKOUT_SESSION_ID}',
//       cancel_url: 'https://example.com/cancel',
//     });
//
//
//     const response = {
//         statusCode: 200,
//         body: {session_id: session.id};
//         // body: JSON.stringify('Hello from Fred!),
//     };
//     return response;
// };
