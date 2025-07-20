import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { applicationId } = useParams(); // Rename from parcelId to id for clarity

  const [error, setError] = useState();

const {
  isPending,
  data: application = {},
  isError,
  error: queryError,
} = useQuery({
  queryKey: ["application", applicationId],
  queryFn: async () => {
    const res = await axiosSecure.get(`/applications/${applicationId}`);
    return res.data; // this must return an OBJECT
  },
  enabled: !!applicationId, // only run if id exists
});

  if (isPending) {
    return <span className="loading loading-ring loading-xl"></span>;
  }

  console.log("Application:", application);
  const amount = parseFloat(application.premiumAmount || 0); // Ensure it's a number
  const amountInCents = Math.round(amount * 100);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (stripeError) {
      setError(stripeError.message);
      return;
    } else {
      setError("");
    }

    // Step 2: Create Payment Intent from Backend
    const res = await axiosSecure.post("/create-payment-intent", {
      amount: amountInCents,
      applicationId,
    });

    const clientSecret = res.data.clientSecret;

    // Step 3: Confirm the payment
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: user.displayName,
          email: user.email,
        },
      },
    });

    if (result.error) {
      setError(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        const transactionId = result.paymentIntent.id;

        // Step 4: Save payment record
        const paymentData = {
          applicationId,
          email: user.email,
          amount,
          policyTitle: application.policyTitle,
          transactionId,
          paymentMethod: result.paymentIntent.payment_method_types?.[0],
        };

        const paymentRes = await axiosSecure.post("/payments", paymentData);

        if (paymentRes.data.insertedId) {
          Swal.fire({
            title: "Payment Successful!",
            html: `<strong>Transaction ID:</strong> <code>${transactionId}</code>`,
            icon: "success",
            confirmButtonText: "Go to My Policies",
          }).then(() => {
            navigate("/dashboard/my-policies");
          });
        }
      }
    }
  };

  
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto"
      >
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-2">
          Pay for:  {application.policyData?.title}
        </h2>
        <p className="text-center text-gray-600 mb-4">
          Premium Amount: <strong>৳{amount}</strong>
        </p>

        <CardElement className="p-2 border rounded" />

        <button
          type="submit"
          disabled={!stripe}
          className="btn btn-primary w-full"
        >
          Pay ৳{amount}
        </button>

        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
