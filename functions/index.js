const functions = require('firebase-functions');
const admin = require('firebase-admin');
const stripe = require("stripe")(functions.config().stripe.testkey);
const cors = require('cors')({origin: true});

admin.initializeApp();

const db = admin.firestore();

/**
 * Creates a document with ID -> uid in the `Users` collection.
 *
 * @param {Object} userRecord Contains the auth, uid and displayName info.
 * @param {Object} context Details about the event.
 */
const createProfile = async (userRecord) => {

  const {email, displayName, photoURL, uid } = userRecord;

  const stripe_customer = await stripe.customers.create({
    description: `Cafesa customer for ${displayName} with email ${email}`,
    email: email,
    name: displayName
  });

  return db
    .collection('users')
    .doc(uid)
    .set({ email, uid, stripe_customer: stripe_customer.id, displayName, disabled: false, photoURL, businessAccount: false })
    .catch(console.error);
};

// Create plan for user
const createPlan = async (cart, user) => {
  return await stripe.plans.create({
    amount: cart.price * 100,
    interval: "month",
    product: {
      name: `${user.uid}`
    },
    currency: "usd",
  });
}

// Create subscription for user 
const createSubscription = async (plan, user) => {
  return await stripe.subscriptions.create({
    customer: user.stripe_customer,
    items: [
      {
        plan: plan.id,
      },
    ]
  });
}

// Initialize a card for the user
const createCard = async (user, token) => {
  stripe.customers.createSource(
    user.stripe_customer,
    {
      source: token.id,
    }
  );
}

// Begin the creation of the checkout process
const createPayment = async (req, res) => {
  return cors(req, res, async () => {
    const stripe_token = 
      req.body && req.body.stripe_token
      ? req.body.stripe_token
      : 'Error!';
    
    // Get user, cart from request
    const { user, cart } = req.body;

    // Fetch user from DB
    const user_record = await db.collection('users').doc(user.id).get();
    
    // Dirty check to see if user exists
    if(!user_record.exists) return res.send("No User!!1").end();
    
    //Get user from firebase if it exists
    const user_data =  user_record.data();

    try {
      //Create plan with price and user
      const plan = await createPlan(cart, user_data);
      
      // Save card to user NOTE:ADD Check for existing cards
      const card = await createCard(user_data, stripe_token);
    
      //Create subscription with plan and user
      const subscription = await createSubscription(plan, user_data);
      // console.log(subscription)
      if(subscription.id) {
        // Modify Firebase user record
        const dbmod = await db.collection('users').doc(user_data.uid).set({
          subscription: {
            subscription_id: subscription.id,
            shop_id: cart.items.shop_id,
            cost: cart.items.price 
          }
        }).catch(console.error);

        console.log(dbmod)

        return res.json({response: "success"});
      }

      else return res.json({response: "error"});

      } catch (err) {
        return res.send(err).end();
      }
    });
}

module.exports = {
  authOnCreate: functions.auth.user().onCreate(createProfile),
  createPayment: functions.https.onRequest(createPayment),
};