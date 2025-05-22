// src/components/ConfirmModal.jsx
export default function ConfirmModal({ isOpen, onClose, cart, onConfirm, location, setLocation }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-50 flex justify-center items-center z-40">
      <div className="bg-white rounded p-6 w-96 max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-black">Confirm Your Order</h2>

        <label className="block mb-2 font-semibold">
          Select Gym Location:
          <select
            className="w-full border rounded px-3 py-2 mt-1 text-black"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">-- Choose Location --</option>
            <option value="Location 1">Location 1</option>
            <option value="Location 2">Location 2</option>
            <option value="Location 3">Location 3</option>
          </select>
        </label>

        <div className="mb-4 max-h-48 overflow-y-auto border p-2 rounded text-black">
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cart.map((item, idx) => (
              <div key={idx} className="flex justify-between mb-2 border-b pb-1">
                <span>{item.name}</span>
                <span>${item.price}</span>
              </div>
            ))
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
            onClick={onConfirm}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
}
