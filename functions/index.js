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

const createSubscription = async (plan, user) => {
  return await stripe.subscriptions.create({
    customer: user.uid,
    items: [
      {
        plan: plan.id,
      },
    ]
  }, function(err, subscription) {
      // asynchronously called
    }
  );
}

const createPayment = async (req, res) => {
  return cors(req, res, async () => {
    const stripe_token = 
      req.body && req.body.stripe_token
      ? req.body.stripe_token
      : 'Error!';

    const { user, cart } = req.body;

    const user_record = await db.collection('users').doc(user.id).get();
    
    // Dirty check to see if user exists
    if(!user_record) return res.send("No User!!1").end();
    
    const user_data =  user_record.data();

    try {
      const plan = await createPlan(cart, user_data);
      const subscription = await createSubscription(plan, cart, user_data);

      res.json(subscription);

      } catch (err) {
        res.send(err).end();
      }
    });
}

module.exports = {
  authOnCreate: functions.auth.user().onCreate(createProfile),
  createPayment: functions.https.onRequest(createPayment),
};