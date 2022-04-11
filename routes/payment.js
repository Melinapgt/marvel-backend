const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);

router.post("/pay", async (req, res) => {
  try {
    // Réception du token créer via l'API Stripe depuis le Frontend
    // const stripeToken = req.fields.stripeToken;
    const { stripeToken, amount, description } = req.fields;
    // Créer la transaction
    const response = await stripe.charges.create({
      amount: Math.round(amount * 100),
      currency: "eur",
      description,
      source: stripeToken,
    });

    console.log(response.status);
    res.status(200).json(response);
  } catch (error) {
    console.log("error payment page", error.message);
  }
});

module.exports = router;
