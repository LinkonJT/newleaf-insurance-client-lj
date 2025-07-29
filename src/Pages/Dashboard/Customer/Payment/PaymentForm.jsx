import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import { Button } from "flowbite-react";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { applicationId } = useParams();
  console.log("Application ID from URL:", applicationId);

  const [error, setError] = useState("");

  // Fetch application info
  const { isPending, data: applicationInfo = {} } = useQuery({
    queryKey: ["application", applicationId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications/id/${applicationId}`);
      console.log("Fetched app data/ API Response:", res.data);
      return res.data;
    },
    enabled: !!applicationId,
  });

  if (isPending) {
    return <span className="loading loading-ring loading-xl"></span>;
  }

  const amount = parseFloat(applicationInfo?.premiumAmount || 0);
  const amountInCents = Math.round(amount * 100);

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
// Inside handleSubmit → paymentData
const paymentData = {
  applicationId,
  email: user.email,
  amount: amount,
  policyTitle: applicationInfo.policyTitle || "Untitled Policy",  // ← updated
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

  if (loading) return <AppSpinner />;
if (!applicationInfo) return <p>No application data found</p>;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md"
      >
  <h2 className="text-xl font-semibold text-center text-gray-800 mb-2">
  Pay for: {applicationInfo.policyTitle || "Untitled Policy"}
</h2>

        <label className="block">
          <span className="text-gray-700">Premium Amount (৳)</span>
          <input
            type="number"
            value={amount}
            readOnly
            className="input input-bordered w-full mt-1 bg-gray-100"
          />
        </label>

        <CardElement className="p-2 border rounded" />

        <Button
          type="submit"
          disabled={!stripe || amount <= 0}
          className="btn w-full"
        >
          Pay ৳{amount}
        </Button>

        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
