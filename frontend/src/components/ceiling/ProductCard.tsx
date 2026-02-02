import React from 'react';
import { ShoppingCart, Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  images: string[];
  price: string;
  description: string;
  rating: number;
  inStock: boolean;
  onProductClick: (productId: string) => void;
  onOrderClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  images,
  price,
  description,
  rating,
  inStock,
  onProductClick,
  onOrderClick
}) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setCurrentImageIndex(index);
  };

  return (
    <div 
      className="bg-[#3A3A3A] rounded-lg overflow-hidden hover:scale-105 transition-all duration-300 hover:shadow-xl group border border-gray-700 hover:border-yellow-400/50 cursor-pointer"
      onClick={() => onProductClick(id)}
    >
      {/* Product Image */}
      <div className="relative h-48 overflow-hidden group/slider">
        <img
          src={images[currentImageIndex]}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Navigation Arrows - only show if more than 1 image */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-yellow-400 transition-colors duration-200 bg-black/30 rounded-full p-1 opacity-0 group-hover/slider:opacity-100"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-yellow-400 transition-colors duration-200 bg-black/30 rounded-full p-1 opacity-0 group-hover/slider:opacity-100"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Slide Indicators - only show if more than 1 image */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1 opacity-0 group-hover/slider:opacity-100 transition-opacity duration-200">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => goToSlide(e, index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentImageIndex 
                    ? 'bg-yellow-400 scale-125' 
                    : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        )}

        {!inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Нет в наличии
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2 group-hover:text-yellow-400 transition-colors">
          {name}
        </h3>
        
        <p className="text-gray-400 text-sm mb-3 line-clamp-2">
          {description}
        </p>

        {/* Rating */}
        <div className="flex items-center space-x-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}
            />
          ))}
          <span className="text-gray-400 text-sm ml-2">({rating}/5)</span>
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between">
          <div className="text-yellow-400 font-bold text-lg">
            {price}
          </div>
          <button
            disabled={!inStock}
            onClick={(e) => {
              e.stopPropagation();
              onOrderClick();
            }}
            className="bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-black px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 flex items-center space-x-2 group/btn"
          >
            <ShoppingCart size={16} />
            <span className="hidden sm:inline">Заказать</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;