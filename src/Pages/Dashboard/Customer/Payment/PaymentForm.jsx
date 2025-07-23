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
  const { applicationId } = useParams();

  const [error, setError] = useState("");
  const [amount, setAmount] = useState(""); // User inputs amount

  // Fetch application info (still used for title and ID)
  const { isPending, data: applicationInfo = {} } = useQuery({
    queryKey: ["applications", applicationId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications/${applicationId}`);
      console.log("Fetched app data:", res.data);
      return res.data;
    },
    enabled: !!applicationId,
  });

  if (isPending) {
    return <span className="loading loading-ring loading-xl"></span>;
  }

  const amountInCents = Math.round(parseFloat(amount || 0) * 100);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    // Step 1: Create Stripe Payment Method
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

    // Step 2: Create Payment Intent from backend
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
          amount: parseFloat(amount),
          policyTitle: applicationInfo.policyTitle || "Untitled Policy",
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
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-2">
          Pay for: {applicationInfo.policyTitle || "Test Policy"}
        </h2>

        <label className="block">
          <span className="text-gray-700">Enter Premium Amount (৳)</span>
          <input
            type="number"
            min="1"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="input input-bordered w-full mt-1"
            required
          />
        </label>

        <CardElement className="p-2 border rounded" />

        <button
          type="submit"
          disabled={!stripe || !amount}
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
