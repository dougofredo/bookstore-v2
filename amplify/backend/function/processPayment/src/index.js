const { CognitoIdentityServiceProvider } = require("aws-sdk");
const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider();
const USER_POOL_ID = "eu-west-2_Dr0c2m4X9";
const stripe = require("stripe")("sk_test_51HED8xCBGEmUdJgL4k4SW3OFsz3GafcGRpaxROASeHYe1MfKg8t6N2jI15PVZBsdXKAJR8TVwMToFYu9Y40L5waj00o7EkWufB");

const AWS = require("aws-sdk");
AWS.config.update({ region: "eu-west-2" });

// exports.handler = function(event, context) {
//   AWS.config.update({ region: "eu-west-1" });
//   console.log('Handling confirmation email to', event);
//
//   if (!event.email.match(/^[^@]+@[^@]+$/)) {
//     console.log('Not sending: invalid email address', event);
//     context.done(null, "Failed");
//     return;
//   }
//
//   const name = event.name.substr(0, 40).replace(/[^\w\s]/g, '');
// };


const getUserEmail = async (event) => {
  const params = {
    UserPoolId: USER_POOL_ID,
    Username: event.identity.claims.username
  };
  const user = await cognitoIdentityServiceProvider.adminGetUser(params).promise();
  const { Value: email } = user.UserAttributes.find((attr) => {
    if (attr.Name === "email") {
      return attr.Value;
    }
  });
  return email;
};

/*
 * Get the total price of the order
 * Charge the customer
 */
exports.handler = async (event) => {
  try {
    const { id, cart, total, address, token } = event.arguments.input;
    const { username } = event.identity.claims;
    const email = await getUserEmail(event);
    const htmlBody = `
      <!DOCTYPE html>
      <html>
        <head>
        </head>
        <body>
          <p>Hi ${email},</p>
          <p>id ${id},</p>
          <p>cart ${cart},</p>
          <p>total ${total},</p>
          <p>...</p>
        </body>
      </html>
    `;

    const textBody = `
      Hi ${email},
      ...
    `;

    // Create sendEmail params
    const params = {
      Destination: {
        // ToAddresses: [event.email]
        ToAddresses: [ 'fred@gratochic.com' ]
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: htmlBody
          },
          Text: {
            Charset: "UTF-8",
            Data: textBody
          }
        },
        Subject: {
          Charset: "UTF-8",
          Data: "Thanks for registering with ACME!"
        }
      },
      Source: "Jack from ACME <fred@gratochic.com>"
    };
    // Create the promise and SES service object

 const sendPromise = new AWS.SES({ apiVersion: "2010-12-01" }).sendEmail(params).promise();
 sendPromise.then(
   function(data) {
     console.log(data.MessageId);
   }).catch(
     function(err) {
     console.error(err, err.stack);
   });


   // const session = await stripe.checkout.sessions.create({
   // await stripe.checkout.sessions.create({
   //   payment_method_types: ['card'],
   //   line_items: [{
   //     price_data: {
   //       currency: 'usd',
   //       product_data: {
   //         name: 'T-shirt',
   //       },
   //       unit_amount: 10,
   //     },
   //     quantity: 1,
   //   }],
   //   mode: 'payment',
   //   success_url: "https://www.gratochic.com",
   //   // success_url: 'https://example.com/success?session_id={CHECKOUT_SESSION_ID}',
   //   cancel_url: 'https://example.com/cancel',
   // });


    await stripe.charges.create({
      amount: total * 100,
      currency: "usd",
      source: token,
      description: `Order ${new Date()} by ${email}`
    }).then((charge) => {
      console.log("bravo");
        // New charge created. record charge object
    }).catch((err) => {
        // charge failed. Alert user that charge failed somehow
             switch (err.type) {
              case 'StripeCardError':
                // A declined card error
                err.message; // => e.g. "Your card's expiration year is invalid."
                break;
              case 'StripeInvalidRequestError':
                // Invalid parameters were supplied to Stripe's API
                break;
              case 'StripeAPIError':
                // An error occurred internally with Stripe's API
                break;
              case 'StripeConnectionError':
                // Some kind of error occurred during the HTTPS communication
                break;
              case 'StripeAuthenticationError':
                // You probably used an incorrect API key
                break;
              case 'StripeRateLimitError':
                // Too many requests hit the API too quickly
                break;
            }
    });

    return { id, cart, total, address, username, email };
  } catch (err) {
    throw new Error(err);
  }
};
