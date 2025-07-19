import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import PaymentForm from './PaymentForm';

const Payment = () => {

    // Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(import.meta.env.VITE_payment_key);

    return (
      <Elements stripe={stripePromise}>
        <PaymentForm></PaymentForm>
      </Elements>
    );
};

export default Payment;