import { ShoppingCart } from 'lucide-react'

export default function Navbar({ cartCount, onCartClick }) {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white border-b shadow-md z-10 px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-black pt-small-font">Flahive's Apparel</h1>
      <button
        onClick={onCartClick}
        aria-label="Open Cart"
        className="relative bg-black"
      >
        <ShoppingCart size={24} className='text-white'/>
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </button>
    </nav>
  )
}
