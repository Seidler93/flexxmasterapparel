export default function CartDrawer({ isOpen, cart, onClose, onRemove, onConfirm, location, setLocation }) {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-20 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
    >
      {/* Header */}
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="text-lg font-semibold">Your Cart</h2>
        <button onClick={onClose} aria-label="Close Cart">
          ✕
        </button>
      </div>

      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto p-4">
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center mb-4 border-b pb-2"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">${item.price}</p>
              </div>
              <button
                onClick={() => onRemove(idx)}
                className="text-red-600 hover:text-red-800 font-bold text-lg"
                aria-label="Remove item"
              >
                &times;
              </button>
            </div>
          ))
        )}
      </div>

      {/* Sticky footer for location + button */}
      <div className="p-4 border-t bg-white text-black">
        <label className="block mb-2 font-semibold">
          Select Gym Location:
          <select
            className="w-full border rounded px-3 py-2 mt-1"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">-- Choose Location --</option>
            <option value="Location 1">Location 1</option>
            <option value="Location 2">Location 2</option>
            <option value="Location 3">Location 3</option>
          </select>
        </label>

        <button
          onClick={onConfirm}
          className="w-full mt-4 bg-green-600 text-white py-3 rounded hover:bg-green-700 disabled:bg-green-400"
          disabled={!location || cart.length === 0}
          title={!location ? 'Select a location first' : ''}
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
}
