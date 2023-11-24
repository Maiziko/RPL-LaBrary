// components/Product.tsx
import React from 'react';

interface ProductProps {
  id: number;
  name: string;
  price: number;
  quantity: number;
  onAddToCart: (id: number) => void;
}

const Product: React.FC<ProductProps> = ({ id, quantity, onAddToCart}) => {
  return (

    <div className="border p-4 mb-4">
      <div className="flex items-center mt-2">
        <button className="bg-blue-500 text-white px-2" onClick={() => onAddToCart(id)}>
          + List Peminjaman
        </button>
        <span className="mx-2">{quantity}</span>
      </div>
    </div>
  );
};

export default Product;
