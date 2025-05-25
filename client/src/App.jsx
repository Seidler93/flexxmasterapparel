import { useState, useEffect } from 'react';
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

  useEffect(() => {
    console.log(cart);
    

  }, [cart]);

  const handleQuantityChange = (index, newQuantity) => {
    console.log(index, newQuantity);
    
    setCart(prev =>
      prev.map((item, i) =>
        i === index ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const addToCart = (newItem) => {
    setCart((prevCart) => {
      const index = prevCart.findIndex(
        (item) =>
          item.id === newItem.id &&
          item.size === newItem.size
      );

      if (index !== -1) {
        // Item already exists — update its quantity
        const updatedCart = [...prevCart];
        updatedCart[index] = {
          ...updatedCart[index],
          quantity: updatedCart[index].quantity + newItem.quantity,
        };
        return updatedCart;
      } else {
        // New item — add to cart
        return [...prevCart, newItem];
      }
    });
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const handleConfirmOrder = () => {
    setCart([]);
    setIsCartOpen(false);
    setLocation('');
  };



  return (
    <div className="flex justify-center min-h-screen bg-gray-100">
      <Navbar
        cartCount={cart.reduce((total, item) => total + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
      />

      <main className="flex-1 py-20 max-w-5xl mx-auto px-4">
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
        onConfirm={() => setIsModalOpen(true)}
        location={location}
        setLocation={setLocation}
        onQuantityChange={handleQuantityChange}
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
