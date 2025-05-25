import { Trash2 } from '../../public/node_modules/lucide-react/dist/lucide-react';
import { locations } from '../data/locations';
import { useState } from "react";

export default function CartDrawer({
  isOpen,
  cart,
  onClose,
  onRemove,
  onConfirm,
  location,
  setLocation,
  onQuantityChange
}) {
  const [showLocationError, setShowLocationError] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleConfirm = () => {
    if (!location) {
      setShowLocationError(true);
      return;
    }
    setShowLocationError(false);
    onConfirm();
  };

  if (!isOpen) return null; // Don't render anything if not open

  return (
    <div
      className="fixed inset-0 z-40 bg-black/50 flex justify-end "
      onClick={onClose} // close on background click
    >
      <div
        className="h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-50 flex flex-col cartwidth"
        onClick={(e) => e.stopPropagation()} // prevent click from closing when inside drawer
      >
        {/* Header */}
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button className="text-white bg-black px-2 py-1 rounded" onClick={onClose} aria-label="Close Cart">
            ✕
          </button>
        </div>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cart.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center mb-4 border-b pb-2">
                <div className="w-full">
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-medium">
                      {item.name} - {item.size}
                    </p>
                    <p className="text-gray-500">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    {item.quantity === 1 ? (
                      <button
                        onClick={() => onRemove(idx)}
                        className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-yellow-400 hover:bg-yellow-100"
                        aria-label="Remove item"
                      >
                        <Trash2 size={12} className="text-red-500" />
                      </button>
                    ) : (
                      <button
                        onClick={() => onQuantityChange(idx, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-full border text-lg font-bold"
                      >
                        −
                      </button>
                    )}
                    <span className="w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => onQuantityChange(idx, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-full border text-lg font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Total row */}
          <div className="flex justify-between items-center font-bold text-lg border-t pt-2 mt-4">
            <p>Total</p>
            <p>${total.toFixed(2)} + Tax</p>
          </div>
        </div>

        {/* Footer with location & confirm button */}
        <div className="p-4 border-t bg-white text-black sticky bottom-0 z-10">
          <label className="block mb-2 font-semibold">
            Select Gym Location:
            <select
              className={`w-full border rounded px-3 py-2 mt-1 ${showLocationError && !location ? "border-red-500" : ""
                }`}
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                if (showLocationError) setShowLocationError(false);
              }}
            >
              <option value="">-- Choose Location --</option>
              {locations.map((loc, idx) => (
                <option key={idx} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </label>

          <button
            onClick={handleConfirm}
            className="w-full mt-4 bg-green-600 text-white py-3 rounded hover:bg-green-700 disabled:bg-green-400"
            disabled={cart.length === 0}
            title={!location ? "Select a location first" : ""}
          >
            View Order
          </button>
        </div>
      </div>
    </div>
  );
}
