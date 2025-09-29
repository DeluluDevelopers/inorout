// app/ticket/page.tsx
"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

type CreateOrderResp = {
  order: {
    id: string;
    amount: number;
    currency: string;
    receipt?: string;
  };
  key_id: string;
};

type TicketTier = "REGULAR" | "COUPLES" | "VIP" | "VVIP";

// Secure price mapping - prices in rupees
const TICKET_PRICES: Record<TicketTier, number> = {
  REGULAR: 1500,
  COUPLES: 2499,
  VIP: 5999,
  VVIP: 9999,
};

const TICKET_NAMES: Record<TicketTier, string> = {
  REGULAR: "Regular Ticket",
  COUPLES: "Couples Ticket",
  VIP: "VIP Ticket",
  VVIP: "VVIP Ticket",
};

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);
    if ((window as unknown as { Razorpay?: unknown }).Razorpay)
      return resolve(true);

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

function TicketPageContent() {
  const searchParams = useSearchParams();
  const tierParam = searchParams.get("tier") as TicketTier | null;

  const [selectedTier, setSelectedTier] = useState<TicketTier>(
    tierParam || "REGULAR"
  );
  const [amount, setAmount] = useState<number>(TICKET_PRICES[selectedTier]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Update amount when tier changes
  useEffect(() => {
    setAmount(TICKET_PRICES[selectedTier]);
  }, [selectedTier]);

  async function handleBook(e?: React.FormEvent) {
    e?.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const ok = await loadRazorpayScript();
      if (!ok) throw new Error("Razorpay SDK failed to load");

      // 1) create order on server - send tier instead of amount
      const createRes = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ticketTier: selectedTier, // Send tier, not amount
          metadata: {
            customerName: name,
            customerEmail: email,
            customerPhone: phone,
          },
        }),
      });

      if (!createRes.ok) {
        const err = await createRes.json();
        throw new Error(err?.error || "Order creation failed");
      }

      const { order, key_id } = (await createRes.json()) as CreateOrderResp;

      // 2) open Razorpay checkout
      const options = {
        key: key_id,
        amount: order.amount,
        currency: order.currency,
        name: process.env.NEXT_PUBLIC_APP_NAME ?? "Event Ticket Booking",
        description: `${TICKET_NAMES[selectedTier]} - Event Access`,
        order_id: order.id,
        prefill: {
          name,
          email,
          contact: phone,
        },

        handler: async function (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) {
          try {
            // 3) verify payment on server
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...response,
                metadata: {
                  customerName: name,
                  customerEmail: email,
                  customerPhone: phone,
                  ticketTier: selectedTier,
                },
              }),
            });

            const verifyJson = await verifyRes.json();
            if (!verifyRes.ok || !verifyJson.success) {
              setMessage(verifyJson?.message || "Verification failed");
            } else {
              setMessage(
                "✅ Payment successful — booking confirmed! Your QR code will be sent to your email."
              );
              // Optionally redirect to /ticket/confirmed or display ticket details
            }
          } catch (err: unknown) {
            const errorMessage =
              err instanceof Error ? err.message : "Verification error";
            setMessage(errorMessage);
          }
        },
        modal: {
          ondismiss: function () {
            setMessage("Payment popup closed");
          },
        },
      };

      const razorpayInstance = new (
        window as unknown as {
          Razorpay: new (options: unknown) => { open: () => void };
        }
      ).Razorpay(options);
      razorpayInstance.open();
    } catch (err: unknown) {
      console.error(err);
      const errorMessage =
        err instanceof Error ? err.message : "Something went wrong";
      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='min-h-screen bg-gray-50 py-12 px-4'>
      <div className='max-w-md mx-auto'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-gray-900 mb-2'>
            🎫 Book Your Ticket
          </h1>
          <p className='text-gray-600'>
            Secure your spot at this amazing event
          </p>
        </div>

        {/* Main Card */}
        <div className='bg-white rounded-2xl shadow-xl border border-gray-200 p-8'>
          <form onSubmit={handleBook} className='space-y-6'>
            {/* Ticket Tier Selection */}
            <div className='space-y-2'>
              <label className='block text-sm font-semibold text-gray-700'>
                Ticket Type
              </label>
              <select
                value={selectedTier}
                onChange={(e) => setSelectedTier(e.target.value as TicketTier)}
                className='w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 hover:border-gray-400'
              >
                <option value='REGULAR'>
                  Regular - ₹{TICKET_PRICES.REGULAR.toLocaleString()}
                </option>
                <option value='COUPLES'>
                  Couples - ₹{TICKET_PRICES.COUPLES.toLocaleString()}
                </option>
                <option value='VIP'>
                  VIP - ₹{TICKET_PRICES.VIP.toLocaleString()}
                </option>
                <option value='VVIP'>
                  VVIP - ₹{TICKET_PRICES.VVIP.toLocaleString()}
                </option>
              </select>
            </div>

            {/* Name Field */}
            <div className='space-y-2'>
              <label className='block text-sm font-semibold text-gray-700'>
                Full Name
              </label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 hover:border-gray-400'
                placeholder='Enter your full name'
              />
            </div>

            {/* Email Field */}
            <div className='space-y-2'>
              <label className='block text-sm font-semibold text-gray-700'>
                Email Address
              </label>
              <input
                required
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 hover:border-gray-400'
                placeholder='your.email@example.com'
              />
            </div>

            {/* Phone Field */}
            <div className='space-y-2'>
              <label className='block text-sm font-semibold text-gray-700'>
                Phone Number
              </label>
              <input
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className='w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 hover:border-gray-400'
                placeholder='+91 98765 43210'
              />
            </div>

            {/* Amount Display (Read-only) */}
            <div className='space-y-2'>
              <label className='block text-sm font-semibold text-gray-700'>
                Total Amount (INR)
              </label>
              <div className='relative'>
                <span className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-semibold'>
                  ₹
                </span>
                <input
                  readOnly
                  type='text'
                  value={amount.toLocaleString()}
                  className='w-full pl-8 pr-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-900 cursor-not-allowed'
                />
              </div>
              <p className='text-xs text-gray-500'>
                Price is automatically set based on selected ticket type
              </p>
            </div>

            {/* Payment Button */}
            <button
              disabled={loading}
              type='submit'
              className={`w-full py-4 rounded-lg font-semibold text-lg transition-all duration-200 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed text-gray-200"
                  : "bg-gray-900 hover:bg-gray-800 transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
              } text-white shadow-md`}
            >
              {loading ? (
                <div className='flex items-center justify-center space-x-2'>
                  <div className='w-5 h-5 border-2 border-gray-300 border-t-white rounded-full animate-spin'></div>
                  <span>Processing...</span>
                </div>
              ) : (
                `� Pay ₹${amount.toLocaleString()}`
              )}
            </button>
          </form>

          {/* Message Display */}
          {message && (
            <div
              className={`mt-6 p-4 rounded-lg border ${
                message.includes("✅") || message.includes("successful")
                  ? "bg-green-50 border-green-200 text-green-800"
                  : message.includes("closed")
                  ? "bg-yellow-50 border-yellow-200 text-yellow-800"
                  : "bg-red-50 border-red-200 text-red-800"
              }`}
            >
              <p className='text-center font-medium'>{message}</p>
            </div>
          )}
        </div>

        {/* Security Notice */}
        <div className='mt-6 text-center'>
          <p className='text-sm text-gray-500'>
            🔒 Secure payment powered by Razorpay
          </p>
        </div>
      </div>
    </div>
  );
}

function TicketPageLoadingFallback() {
  return (
    <div className='min-h-screen bg-gray-50 py-12 px-4'>
      <div className='max-w-md mx-auto'>
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-gray-900 mb-2'>
            🎫 Book Your Ticket
          </h1>
          <p className='text-gray-600'>Loading...</p>
        </div>
      </div>
    </div>
  );
}

export default function TicketPage() {
  return (
    <Suspense fallback={<TicketPageLoadingFallback />}>
      <TicketPageContent />
    </Suspense>
  );
}
