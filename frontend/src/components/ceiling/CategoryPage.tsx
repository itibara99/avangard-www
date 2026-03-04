import React, { useState, useEffect } from 'react';
import { ArrowLeft, Grid, List } from 'lucide-react';
import ProductCard from './ProductCard';

import {bp40, bp40_ch, stenvoy, sten_1, sten_2, sten_3, razdelitel,
  razdelitel_ch, universal, universal_ch, potoloch, potoloch_ch,
  z, z_ch, b2, b2_ch, b2_zagl, pk14_ch, cornices, pk15, pk15_ch, pk12, pk12_ch,
  am1, furnitures} from '@/assets/images.ts'

interface Product {
  id: string;
  name: string;
  images: string[];
  model3d?: string;
  price: string;
  description: string;
  inStock: boolean;
}

interface CategoryPageProps {
  categoryId: string;
  categoryTitle: string;
  onBack: () => void;
  onCategoryChange: (categoryId: string) => void;
  onProductClick: (productId: string) => void;
  onOrderClick: () => void;
}

const CategoryPage: React.FC<CategoryPageProps> = ({
  categoryId,
  categoryTitle,
  onBack,
  onCategoryChange,
  onProductClick,
  onOrderClick
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    { id: 'standard', title: 'Стандартные профили', count: 6 },
    { id: 'cornices', title: 'Карнизы', count: 4 },
   // { id: 'light', title: 'Световые линии', count: 8 },
    { id: 'contour', title: 'Комплектующие', count: 4 }
  ];

  const getProductsForCategory = (catId: string): Product[] => {
    const baseProducts = {
      standard: [
        {
          id: 'bp',
          name: 'Брус 40х40',
          model3d: '/bp40.glb',
          images: [
            bp40,
            
            
          ],
          price: '189 ₽/м',
          description: 'Несущий брус для потолочного крепления натяжных потолков при невозможности монтажа к стенам (керамогранит, зеркала и т.д.), оснащённый гарпунной системой фиксации полотна и креплением под гвоздик',
          inStock: true
        },
        {
          id: 'sten',
          name: 'Профиль Стенвой',
          model3d: '/sten.glb',
          images: [
            stenvoy,
            
          ],
          price: 'от 37,5 ₽/м',
          description: 'Алюминиевый багет крепится к стенам по периметру помещения для надежной фиксации и натяжения полотна, обеспечивая четкий край и эстетичный вид потолка',
          inStock: true
        },
        {
          id: 'std-3',
          name: 'Разделитель',
          model3d: '/razdel.glb',
          images: [
            razdelitel,
            
          ],
          price: '149 ₽/м',
          description: 'Профиль для соединения двух полотен натяжного потолка в больших помещениях или многоуровневых конструкциях, оснащённый гарпунной системой крепления и пазом для декоративной маскировочной вставки',
          inStock: true
        },
        {
          id: 'std-4',
          name: 'Профиль Универсальный',
          model3d: '/univers.glb',
          images: [
            universal,
            
          ],
          price: '84 ₽/м',
          description: 'Классический профиль для крепления на стены и потолок',
          inStock: false
        },
        {
          id: 'std-5',
          name: 'Профиль Потолочный',
          model3d: '/potoloch.glb',
          images: [
            potoloch,
            
          ],
          price: '69 ₽/м',
          description: 'Классический профиль для крепления на потолок',
          inStock: true
        },
        {
          id: 'std-6',
          name: 'Отбойник Z',
          model3d: '/z.glb',
          images: [
            z,
            
          ],
          price: '59 ₽/м',
          description: 'Профиль для перепадов уровня полотна',
          inStock: true
        },
      ],
      cornices: [
        {
          id: 'b2',
          name: 'Карниз B2',
          model3d: '/b2.glb',
          images: [
            b2,
            
          ],
          price: '949 ₽/м',
          description: 'Новый карниз для крепления штор в скрытых нишах с улучшеным дизайном и усиленной прочностью',
          inStock: true
        },
        {
          id: 'cor-5',
          name: 'Карниз B-1 однорядный',
          images: [
            am1,
          ],
          price: '549 ₽/м',
          description: 'Новый однорядный карниз с пазом для световой линии',
          inStock: true
        },
       /* {
          id: 'cor-1',
          name: 'Карниз ПК-14 стандартный',
          model3d: '/b2.glb',
          images: [
              cornices,
            
            
          ],
          price: 'от 560 ₽/м',
          description: 'Стандартный карниз для штор и портьер',
          rating: 5,
          inStock: true
        },
        {
          id: 'cor-2',
          name: 'Карниз ПК-14 облегченныйй',
          images: [
            cornices,
            
            
          ],
          price: 'от 520 ₽/м',
          description: 'Двухрядный карниз для тюля и штор',
          rating: 5,
          inStock: true
        }, */
        {
          id: 'cor-3',
          name: 'Карниз ПК-15',
          images: [
            pk15,
            
          ],
          price: '459 ₽/м',
          description: 'Классический двухрядный карниз',
          inStock: true
        },
        {
          id: 'cor-4',
          name: 'Карниз ПК-12',
          images: [
            pk12,
            
            
          ],
          price: '519 ₽/м',
          description: 'Классический трёхрядный карниз',
          inStock: true
        },
        
      ],
     /* light: [
        {
          id: 'light-1',
          name: 'Световая линия СЛ-40 LED',
          images: [
            'src/assets/light-lines.jpg',
            'https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=400',
            'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400'
          ],
          price: '350 ₽/м',
          description: 'LED световая линия с равномерным освещением',
          rating: 5,
          inStock: true
        },
        {
          id: 'light-2',
          name: 'Световая линия СЛ-50 RGB',
          images: [
            'https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=400',
            'src/assets/light-lines.jpg'
          ],
          price: '450 ₽/м',
          description: 'RGB световая линия с изменением цвета',
          rating: 5,
          inStock: true
        },
        {
          id: 'light-3',
          name: 'Световая линия СЛ-30 компактная',
          images: [
            'https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=400'
          ],
          price: '280 ₽/м',
          description: 'Компактная световая линия для акцентов',
          rating: 4,
          inStock: true
        },
        {
          id: 'light-4',
          name: 'Световая линия СЛ-60 премиум',
          images: [
            'https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=400',
            'src/assets/light-lines.jpg',
            'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400'
          ],
          price: '550 ₽/м',
          description: 'Премиум световая линия с диммированием',
          rating: 5,
          inStock: false
        },
        {
          id: 'light-5',
          name: 'Световая линия СЛ-45 угловая',
          images: [
            'https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=400',
            'src/assets/light-lines.jpg'
          ],
          price: '380 ₽/м',
          description: 'Угловая световая линия для сложных форм',
          rating: 4,
          inStock: true
        },
        {
          id: 'light-6',
          name: 'Световая линия СЛ-35 эконом',
          images: [
            'https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=400'
          ],
          price: '250 ₽/м',
          description: 'Экономичная световая линия базового уровня',
          rating: 4,
          inStock: true
        },
        {
          id: 'light-7',
          name: 'Световая линия СЛ-55 двойная',
          images: [
            'https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=400',
            'src/assets/light-lines.jpg'
          ],
          price: '420 ₽/м',
          description: 'Двойная световая линия для яркого освещения',
          rating: 5,
          inStock: true
        },
        {
          id: 'light-8',
          name: 'Световая линия СЛ-25 мини',
          images: [
            'https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=400'
          ],
          price: '200 ₽/м',
          description: 'Мини световая линия для декоративной подсветки',
          rating: 4,
          inStock: true
        }
      ], */
      contour: [
        {
          id: 'cont-1',
          name: 'П-вставка для карнизов',
          images: [
          furnitures,
            
          ],
          price: '40 ₽/м',
          description: 'ПВХ-вставка для пазов крепления полотна',
          inStock: false,
        },
        {
          id: 'cont-2',
          name: 'Заглушки торцевые B2-PRO',
          images: [
            b2_zagl,
          ],
          price: '300 ₽/шт',
          description: 'Декоративные торцевые заглушки для карнизов B2-PRO',
          rating: 5,
          inStock: true
        },
        
        {
          id: 'cont-3',
          name: 'Заглушки торцевые B-1 PRO',
          images: [
            
          ],
          price: '300 ₽/шт',
          description: 'Декоративные торцевые заглушки для однорядных карнизов',
          inStock: true
        },
        {
          id: 'cont-4',
          name: 'Бандажная лента',
          images: [
            ,
           
          ],
          price: '40 ₽/м',
          description: 'Прямой соединитель для стыковки профилей',
          inStock: true
        },
      ]
    };

    return baseProducts[catId as keyof typeof baseProducts] || [];
  };

  const products = getProductsForCategory(categoryId);

  return (
    <div className="min-h-screen bg-[#1A1A1A] pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Menu */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-[#3A3A3A] rounded-lg p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-semibold text-lg">Категории</h3>
                <button
                  onClick={onBack}
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  <ArrowLeft size={20} />
                </button>
              </div>
              
              <nav className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => onCategoryChange(category.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center justify-between group ${
                      categoryId === category.id
                        ? 'bg-yellow-400 text-black font-medium'
                        : 'text-gray-300 hover:bg-[#1A1A1A] hover:text-yellow-400'
                    }`}
                  >
                    <span>{category.title}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      categoryId === category.id
                        ? 'bg-black/20 text-black'
                        : 'bg-gray-600 text-gray-300 group-hover:bg-yellow-400/20 group-hover:text-yellow-400'
                    }`}>
                      {category.count}
                    </span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{categoryTitle}</h1>
                <p className="text-gray-400">Найдено {products.length} товаров</p>
              </div>
              
              <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                <div className="flex items-center space-x-2 bg-[#3A3A3A] rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-yellow-400 text-black'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Grid size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded transition-colors ${
                      viewMode === 'list'
                        ? 'bg-yellow-400 text-black'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  onProductClick={onProductClick}
                  onOrderClick={onOrderClick}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;