import { useState } from 'react';
import ConfirmModal from './components/ConfirmModal';
import ProductCard from './components/ProductCard';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import { products } from './data/products';

export default function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [location, setLocation] = useState('');

  const addToCart = (product) => {
    setCart([...cart, product]);
    setIsCartOpen(true); // Optionally open cart on add
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const handleConfirmOrder = () => {
    if (!location) return alert('Please select a gym location');

    const orderNumber = Date.now();
    const order = {
      orderNumber,
      items: cart,
      location,
      name: 'John Doe',
      email: 'john@example.com',
    };

    setIsModalOpen(true);

    // TODO: Send order to Google Sheets & email here


    // setCart([]);
    // setIsModalOpen(false);
    // setIsCartOpen(false);
    // setLocation('');
  };

  return (
    <div className="flex justify-center min-h-screen bg-gray-100">
      <Navbar
        cartCount={cart.length}
        onCartClick={() => setIsCartOpen(true)}
      />

      <main className="flex-1 pt-20 max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-8 pt-small-20">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAdd={addToCart}
            />
          ))}
        </div>
      </main>

      <CartDrawer
        isOpen={isCartOpen}
        cart={cart}
        onClose={() => setIsCartOpen(false)}
        onRemove={removeFromCart}
        onConfirm={handleConfirmOrder}
        location={location}
        setLocation={setLocation}
      />

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        cart={cart}
        onConfirm={handleConfirmOrder}
        location={location}
        setLocation={setLocation}
      />
    </div>
  );
}
