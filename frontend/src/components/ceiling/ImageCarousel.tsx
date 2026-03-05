import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';

interface ImageCarouselProps {
  images: string[];
  productName: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, productName }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const validImages = images.filter(img => img && img.trim() !== '');

  if (validImages.length === 0) {
    return null;
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? validImages.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === validImages.length - 1 ? 0 : prev + 1));
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const lightboxPrevious = () => {
    setLightboxIndex((prev) => (prev === 0 ? validImages.length - 1 : prev - 1));
  };

  const lightboxNext = () => {
    setLightboxIndex((prev) => (prev === validImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div className="bg-[#3A3A3A] rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Галерея изображений</h3>

        <div className="relative">
          <div className="bg-[#2A2A2A] rounded-lg overflow-hidden h-[512px] group">
            <img
              src={validImages[currentIndex]}
              alt={`${productName} - изображение ${currentIndex + 1}`}
              className="w-full h-full object-cover object-center cursor-pointer transition-transform duration-300 group-hover:scale-105"
              onClick={() => openLightbox(currentIndex)}
            />

            <button
              onClick={() => openLightbox(currentIndex)}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
              title="Развернуть изображение"
            >
              <ZoomIn size={20} />
            </button>

            {validImages.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
                  title="Предыдущее изображение"
                >
                  <ChevronLeft size={24} />
                </button>

                <button
                  onClick={goToNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
                  title="Следующее изображение"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>

          {validImages.length > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              {validImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    index === currentIndex
                      ? 'border-yellow-400 scale-110'
                      : 'border-gray-600 hover:border-gray-400'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Миниатюра ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {isLightboxOpen && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all duration-200 z-10"
            title="Закрыть"
          >
            <X size={24} />
          </button>

          <div
            className="relative max-w-7xl max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={validImages[lightboxIndex]}
              alt={`${productName} - изображение ${lightboxIndex + 1}`}
              className="max-w-full max-h-[90vh] object-contain"
            />

            {validImages.length > 1 && (
              <>
                <button
                  onClick={lightboxPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-800/80 hover:bg-gray-700/90 text-gray-900 p-3 rounded-full transition-all duration-200"
                  title="Предыдущее изображение"
                >
                  <ChevronLeft size={32} />
                </button>

                <button
                  onClick={lightboxNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-800/80 hover:bg-gray-700/90 text-gray-900 p-3 rounded-full transition-all duration-200"
                  title="Следующее изображение"
                >
                  <ChevronRight size={32} />
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 px-4 py-2 rounded-full">
                  <span className="text-white text-sm">
                    {lightboxIndex + 1} / {validImages.length}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageCarousel;
