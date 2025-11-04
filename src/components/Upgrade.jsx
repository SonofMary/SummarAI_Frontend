import React from "react";
import PaystackPop from "@paystack/inline-js";
import axios from "axios";
import { UseAuth } from "../AuthContext";

function Upgrade() {
  const { login } = UseAuth();

  const publicKey = "pk_test_2ae161c899840f81d8c793985b15082ae51d37c7"; // your Paystack public key
  const amount = 1000 * 100; // ₦1000 in kobo

  const handlePayment = () => {
    const email = document.getElementById("email").value;

    if (!email) {
      alert("Please enter your email before upgrading.");
      return;
    }

    // Create a new Paystack popup instance
    const paystack = new PaystackPop();

    paystack.newTransaction({
      key: publicKey,
      email: email,
      amount: amount,

      onSuccess: async (transaction) => {
        console.log("Payment successful:", transaction);

        try {
          // send reference to backend for verification & account creation
          const response = await axios.post(
            "https://summarai-backend.onrender.com/summarai/register-paid",
            {
              email,
              reference: transaction.reference,
            }
          );
          console.log(response.data)
          const { user, token } = response.data;
          login(user, token); // auto-login user
        } catch (error) {
          console.error("Error creating paid user:", error);
          alert(
            "Payment succeeded but account creation failed. Please contact support."
          );
        }
      },

      onCancel: () => {
        alert("Payment window closed.");
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="p-8 bg-white rounded-lg shadow-md max-w-md w-full text-center">
        <h2 className="text-2xl font-semibold mb-2 text-cyan-600">
          Upgrade to SummarAI Premium
        </h2>
        <p className="text-gray-600 mb-6">
          Unlock your personalized dashboard, save summaries, and track your
          progress.
        </p>
        <p className="text-lg font-bold mb-6">₦1,000 / month</p>

        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          className="border rounded-md p-2 w-full mb-4"
        />

        <button
          onClick={handlePayment}
          className="bg-cyan-600 text-white px-6 py-2 rounded-md hover:bg-cyan-700 transition"
        >
          Upgrade Now
        </button>
      </div>
    </div>
  );
}

export default Upgrade;
