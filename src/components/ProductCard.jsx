// src/components/ProductCard.jsx
export default function ProductCard({ product, onAdd }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
      <img
        src={product.image}
        alt={product.name}
        className="h-40 object-contain mb-4"
      />
      <h2 className="font-semibold text-lg">{product.name}</h2>
      <p className="text-gray-700 mb-4">${product.price}</p>
      <button
        onClick={() => onAdd(product)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </div>
  );
}
