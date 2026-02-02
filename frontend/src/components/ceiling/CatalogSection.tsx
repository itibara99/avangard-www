import React from 'react';
import { Home, Frame, Layers, ArrowRight } from 'lucide-react';
import { bp40, cornices, furnitures } from '@/assets/images.ts';

interface CatalogSectionProps {
  onCategoryClick: (categoryId: string) => void;
}

const CatalogSection: React.FC<CatalogSectionProps> = ({ onCategoryClick }) => {
  const categories = [
    {
      id: 'standard',
      title: 'Стандартные профили',
      subtitle: 'Для натяжных потолков',
      description: 'Классические алюминиевые профили для создания натяжных потолков',
      image: bp40,
      icon: Home,
      featured: true,
      buttonText: 'Смотреть каталог'
    },
    {
      id: 'cornices',
      title: 'Карнизы',
      subtitle: 'Для штор и портьер',
      description: 'Алюминиевые карнизы различных конфигураций',
      image: cornices,
      icon: Frame,
      featured: false,
      buttonText: 'Смотреть каталог'
    },
   /* {
      id: 'light',
      title: 'Световые линии',
      subtitle: 'LED подсветка',
      description: 'Профили со встроенной светодиодной подсветкой',
      image: light_lines,
      icon: Lightbulb,
      featured: false,
      buttonText: 'Смотреть каталог'
    }, */
    {
      id: 'contour',
      title: 'Комплектующие',
      subtitle: 'Крепеж и аксессуары',
      description: 'Соединители, заглушки, крепежные элементы',
      image: furnitures,
      icon: Layers,
      featured: false,
      buttonText: 'Смотреть каталог'
    }
  ];

  return (
    <section id="catalog" className="py-20 bg-[#1A1A1A]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Каталог продукции
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Предлагаем широкий ассортимент алюминиевых профилей для различных задач и интерьерных решений
          </p>
        </div>

        {/* Asymmetric Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {/* Left Column - 3 smaller cards */}
          <div className="grid grid-rows-2 gap-4 h-[600px]">
            {categories.slice(1).map((category) => {
              const Icon = category.icon;
              
              return (
                <div
                  key={category.id}
                  className="group relative bg-[#3A3A3A] rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-pointer h-full"
                  onClick={() => onCategoryClick(category.id)}
                >
                  {/* Background Image */}
                  <div className="relative h-full overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/40"></div>
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 p-4 flex flex-col justify-between">
                    <div>
                      <div className="text-xs text-gray-300 mb-1 uppercase tracking-wider">
                        {category.subtitle}
                      </div>
                      <h3 className="text-lg font-bold text-white leading-tight">
                        {category.title}
                      </h3>
                    </div>
                    
                    <div>
                      <button className="bg-white/20 hover:bg-yellow-400 hover:text-black text-white px-4 py-2 rounded text-sm font-medium transition-all duration-200 border border-white/30 hover:border-yellow-400">
                        {category.buttonText}
                      </button>
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              );
            })}
          </div>

          {/* Right Column - 1 large featured card */}
          <div className="relative h-[600px]">
            {(() => {
              const category = categories[0]; // Featured category
              const Icon = category.icon;
              
              return (
                <div
                  className="group relative bg-[#3A3A3A] rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl h-full cursor-pointer"
                  onClick={() => onCategoryClick(category.id)}
                >
                  {/* Background Image */}
                  <div className="relative h-full overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/40"></div>
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-between">
                    <div>
                      <div className="text-sm text-gray-300 mb-2 uppercase tracking-wider">
                        {category.subtitle}
                      </div>
                      <h3 className="text-3xl font-bold text-white leading-tight mb-4">
                        {category.title}
                      </h3>
                      <p className="text-gray-300 text-base leading-relaxed max-w-md">
                        {category.description}
                      </p>
                    </div>
                    
                    <div>
                      <button className="bg-white/20 hover:bg-yellow-400 hover:text-black text-white px-6 py-3 rounded text-base font-medium transition-all duration-200 border border-white/30 hover:border-yellow-400 flex items-center space-x-2 group/btn">
                        <span>{category.buttonText}</span>
                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CatalogSection;