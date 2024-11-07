const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);  // Load the secret key from environment variables
const router = express.Router();

router.post('/create-stripe-session', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: { name: 'Course' },
                        unit_amount: 1000,  // The price in cents (i.e., $10)
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/success`,  // Replace with your frontend URL
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,    // Replace with your frontend URL
        });

        res.json({ id: session.id });  // Send back session ID to client
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Unable to create session' });
    }
});

module.exports = router;
