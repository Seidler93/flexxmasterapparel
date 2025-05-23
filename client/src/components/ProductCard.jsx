import { useState } from "react";

export default function ProductCard({ product, onAdd }) {
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const sizes = ["S", "M", "L", "XL", "XXL"];

  const handleAddToCart = () => {
    onAdd({
      ...product,
      size: selectedSize,
      quantity,
    });

    setQuantity(1); // Reset quantity
    setSelectedSize("");
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
      <img
        src={product.image}
        alt={product.name}
        className="h-40 object-contain mb-4"
      />
      <h2 className="font-semibold text-lg">{product.name}</h2>
      <p className="text-gray-700 mb-4">${product.price}</p>

      {/* Size Selector */}
      {product?.sizes && (
        <div className="flex gap-2 mb-4">
          {sizes.map((size) => (
            <button
              key={size}
              className={`text-white w-10 h-10 rounded-full border flex items-center justify-center text-sm font-medium transition
          ${selectedSize === size
                  ? "bg-blue-600 text-black border-blue-600"
                  : "bg-black text-gray-700 border-gray-300 hover:border-blue-500"}`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
      )}


      {/* Quantity Selector */}
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="text-black w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-lg font-semibold"
        >
          −
        </button>
        <span className="text-lg font-medium">{quantity}</span>
        <button
          onClick={() => setQuantity((q) => q + 1)}
          className="text-black w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-lg font-semibold"
        >
          +
        </button>
      </div>

      <button
        onClick={handleAddToCart}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </div>
  );
}
