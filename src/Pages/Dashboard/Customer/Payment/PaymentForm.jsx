import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
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

  const [error, setError] = useState();

  const { isPending, data: application = {} } = useQuery({
    queryKey: ["application", applicationId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications/${applicationId}`);
      return res.data;
    },
  });

  if (isPending) return <span className="loading loading-ring loading-lg"></span>;

  const amount = application.premium;
  const amountInCents = amount * 100;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (stripeError) return setError(stripeError.message);
    setError("");

    // Step 2: Create payment intent
    const res = await axiosSecure.post("/create-payment-intent", {
      amountInCents,
      applicationId,
    });

    const clientSecret = res.data.clientSecret;

    // Step 3: Confirm payment
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: user.displayName,
          email: user.email,
        },
      },
    });

    if (result.error) return setError(result.error.message);

    if (result.paymentIntent.status === "succeeded") {
      const transactionId = result.paymentIntent.id;

      const paymentData = {
        applicationId,
        email: user.email,
        amount,
        transactionId,
        paymentMethod: result.paymentIntent.payment_method_types,
      };

      const paymentRes = await axiosSecure.post("/payments", paymentData);
      if (paymentRes.data.insertedId) {
        Swal.fire({
          title: "Payment Successful",
          html: `<strong>Transaction ID:</strong> <code>${transactionId}</code>`,
          icon: "success",
          confirmButtonText: "Go to My Policies",
        }).then(() => navigate("/dashboard/my-policies"));
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-semibold">Pay for: {application.policyTitle}</h2>
      <CardElement className="p-2 border rounded" />
      <button type="submit" disabled={!stripe} className="btn btn-primary w-full">
        Pay ${amount}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
};

export default PaymentForm;
