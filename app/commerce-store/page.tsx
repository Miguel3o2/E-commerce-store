"use client"


import React, { useState } from 'react';
import Image from 'next/image';
import { ShoppingCart, X, Plus, Minus, Heart } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299.99,
    rating: 4.8,
    image: "/images/headset.jpeg",
    category: "Electronics",
    description: "High-fidelity audio with noise cancellation"
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 199.99,
    rating: 4.6,
    image: "/images/watch.jpeg",
    category: "Wearables",
    description: "Track your health with precision"
  },
  {
    id: 3,
    name: "Ergonomic Office Chair",
    price: 499.99,
    rating: 4.9,
    image: "/images/chair.jpeg",
    category: "Furniture",
    description: "Ultimate comfort for long work hours"
  },
  {
    id: 4,
    name: "Gaming Headset",
    price: 299.99,
    rating: 4.8,
    image: "/images/headset2.jpeg",
    category: "Electronics",
    description: "High-fidelity audio with noise cancellation"
  },
  {
    id: 5,
    name: "Refined Smartwatch",
    price: 199.99,
    rating: 4.6,
    image: "/images/watch2.jpeg",
    category: "Wearables",
    description: "Track your health with precision"
  },
  {
    id: 6,
    name: "Automatic Coffee Maker",
    price: 499.99,
    rating: 4.9,
    image: "/images/coffee.jpeg",
    category: "Electronics",
    description: "Ultimate comfort for long work hours"
  }
];

const EcommerceStore = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

interface Product {
    id: number;
    name: string;
    price: number;
    rating: number;
    image: string;
    category: string;
    description: string;
}

interface CartItem extends Product {
    quantity: number;
}

const addToCart = (product: Product) => {
    const existingItem = cart.find((item: CartItem) => item.id === product.id);
    if (existingItem) {
        setCart(cart.map((item: CartItem) =>
            item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
        ));
    } else {
        setCart([...cart, { ...product, quantity: 1 }]);
    }
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2000);
};

const updateQuantity = (productId: number, change: number): void => {
    setCart(cart.map((item: CartItem) => {
        if (item.id === productId) {
            const newQuantity = item.quantity + change;
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
        }
        return item;
    }).filter(Boolean) as CartItem[]);
};

  const CartItem = ({ item }: { item: CartItem }) => (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
      <Image src={item.image} alt={item.name} width={80} height={80} className="w-20 h-20 object-cover rounded-md" />
      <div className="flex-grow">
        <h3 className="font-medium">{item.name}</h3>
        <p className="text-gray-500">${item.price}</p>
        <div className="flex items-center gap-2 mt-2">
          <button 
            onClick={() => updateQuantity(item.id, -1)}
            className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
          >
            <Minus size={16} />
          </button>
          <span>{item.quantity}</span>
          <button 
            onClick={() => updateQuantity(item.id, 1)}
            className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  const ProductCard = ({ product }: { product: Product }) => (
    <div className="group relative bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
      <div className="absolute top-4 right-4 z-10">
        <button className="p-2 rounded-full bg-white/80 hover:bg-white shadow-sm">
          <Heart size={20} className="text-gray-600 hover:text-red-500 transition-colors" />
        </button>
      </div>
      <div className="relative mb-6 aspect-square rounded-lg overflow-hidden bg-gray-100">
        <Image 
          src={product.image} 
          alt={product.name}
          layout="fill"
          objectFit="cover"
          className="group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-purple-600 font-medium">{product.category}</p>
            <h3 className="font-semibold text-lg">{product.name}</h3>
          </div>
          <div className="bg-yellow-100 px-2 py-1 rounded">
            ⭐ {product.rating}
          </div>
        </div>
        <p className="text-gray-600 text-sm">{product.description}</p>
        <div className="flex justify-between items-center pt-4">
          <p className="text-xl font-bold">${product.price}</p>
          <button
            onClick={() => addToCart(product)}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-purple-600">Ecommerce Store</h1>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-600 hover:text-purple-600"
            >
              <ShoppingCart size={24} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cart.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Shopping Cart</h2>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={24} />
                </button>
              </div>
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Your cart is empty</p>
              ) : (
                <div className="space-y-4">
                  {cart.map(item => (
                    <CartItem key={item.id} item={item} />
                  ))}
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total:</span>
                      <span>${cart.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2)}</span>
                    </div>
                    <button className="w-full mt-4 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors">
                      Checkout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Alert */}
      {showAlert && (
        <div className="fixed bottom-4 right-4 z-50">
          <Alert className="bg-green-50 border-green-200">
            <AlertDescription className="text-green-800">
              Item added to cart successfully!
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
};

export default EcommerceStore;
