import { useState, useEffect } from "react";
import { locations } from "../data/locations";

export default function ConfirmModal({ isOpen, onClose, cart, onConfirm, location, setLocation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [athlete, setAthlete] = useState("");
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const close = () => {
    setOrderConfirmed(false)
    onClose()
  }

  const confirmOrder = async () => {
    if (!firstName || !lastName || !email) {
      alert('Please fill out all fields.');
      return;
    }

    const orderData = {
      firstName,
      lastName,
      email,
      location,
      athlete: location === "Niles" ? athlete : undefined,
      items: cart.map(item => ({
        name: item.name,
        quantity: item.quantity,
        size: item.size || 'N/A',
        description: item.description,
        itemInfo: item.itemInfo
      })),
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    };


    try {
      const response = await fetch('https://flexxmasterapparel.onrender.com/submit-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit order');
      }

      const result = await response.json();

      if (result.status === 'success') {
        setOrderConfirmed(true); // ✅ Set success state
        onConfirm(); // Or reset state, close modal, etc.
      } else {
        throw new Error('Submission failed at server.');
      }

    } catch (err) {
      console.error('Error submitting to Sheets:', err);
    }
  };

  // Reset fields when modal closes or opens
  useEffect(() => {
    if (isOpen) {
      // Prevent background scrolling
      document.body.style.overflow = "hidden";
    } else {
      // Modal closed — reset form fields and enable scrolling
      setFirstName("");
      setLastName("");
      setEmail("");
      setAthlete("");
      document.body.style.overflow = "";
    }

    // Cleanup when component unmounts
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);


  // Validation check: required fields must be filled and email looks valid
  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const canConfirm =
    firstName.trim() !== "" &&
    lastName.trim() !== "" &&
    isValidEmail(email) &&
    location !== "";

  const handleConfirm = () => {
    if (!canConfirm) return;
    // pass all data to onConfirm handler, including athlete (optional)
    // onConfirm({ firstName, lastName, email, athlete, location, cart });
    confirmOrder()
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-50 flex justify-center items-center z-40" onClick={close}>
      <div className="bg-white rounded p-6 w-96 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {orderConfirmed ? (
          <div className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Order Complete!</h2>
            <p className="text-gray-600">Confirmation email will be sent soon.</p>
          </div>
        ) : (
          <>
              <h2 className="text-xl font-bold mb-4 text-black">Confirm Your Order</h2>

              <label className="block mb-2 font-semibold text-black">
                Select Gym Location:
                <select
                  className="w-full border rounded px-3 py-2 mt-1 text-black"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  <option value="">-- Choose Location --</option>
                  {locations.map((loc, idx) => (
                    <option key={idx} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block mb-2 font-semibold text-black">
                First Name:
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2 mt-1"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </label>

              <label className="block mb-2 font-semibold text-black">
                Last Name:
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2 mt-1"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </label>

              <label className="block mb-2 font-semibold text-black">
                Email:
                <input
                  type="email"
                  className="w-full border rounded px-3 py-2 mt-1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>

              {location === "Niles" && (
                <label className="block mb-2 font-semibold text-black">
                  Athlete (optional):
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2 mt-1"
                    value={athlete}
                    onChange={(e) => setAthlete(e.target.value)}
                  />
                </label>
              )}

              <div className="mb-4 max-h-48 overflow-y-auto border p-2 rounded text-black">
                {cart.length === 0 ? (
                  <p>Your cart is empty.</p>
                ) : (
                  cart.flatMap((item, idx) =>
                    Array.from({ length: item.quantity }).map((_, i) => (
                      <div key={`${idx}-${i}`} className="flex justify-between mb-2 border-b pb-1">
                        <span>
                          {item.name} - {item.size}
                        </span>
                        <span>${item.price}</span>
                      </div>
                    ))
                  )
                )}
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={!canConfirm}
                  className={`px-4 py-2 rounded ${canConfirm
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-gray-400 text-gray-700 cursor-not-allowed"
                    }`}
                >
                  Confirm Order
                </button>
              </div>
          </>
        )}

       
      </div>
    </div>
  );
}
