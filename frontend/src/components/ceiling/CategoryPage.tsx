import React, { useState, useEffect } from 'react';
import { ArrowLeft, Grid, List } from 'lucide-react';
import ProductCard from './ProductCard';

import {bp40, bp40_ch, stenvoy, sten_1, sten_2, sten_3, razdelitel,
  razdelitel_ch, universal, universal_ch, potoloch, potoloch_ch,
  z, z_ch, b2, b2_ch, pk14_ch, cornices, pk15, pk15_ch, pk12, pk12_ch,
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
    { id: 'contour', title: 'Комплектующие', count: 3 }
  ];

  const getProductsForCategory = (catId: string): Product[] => {
    const baseProducts = {
      standard: [
        {
          id: 'std-1',
          name: 'Брус 40х40',
          model3d: '/bp40.glb',
          images: [
            bp40,
            
            
          ],
          price: 'от 140 ₽/м',
          description: 'Несущий брус для потолочного крепления натяжных потолков при невозможности монтажа к стенам (керамогранит, зеркала и т.д.), оснащённый гарпунной системой фиксации полотна и креплением под гвоздик',
          inStock: true
        },
        {
          id: 'std-2',
          name: 'Профиль Стенвой',
          model3d: '/sten.glb',
          images: [
            stenvoy,
            
          ],
          price: 'от 40 ₽/м',
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
          price: 'от 120 ₽/м',
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
          price: 'от 77 ₽/м',
          description: 'Премиум профиль с улучшенными характеристиками',
          inStock: false
        },
        {
          id: 'std-5',
          name: 'Профиль Потолочный',
          model3d: '/potoloch.glb',
          images: [
            potoloch,
            
          ],
          price: 'от 55 ₽/м',
          description: 'Универсальный профиль для любых задач',
          inStock: true
        },
        {
          id: 'std-6',
          name: 'Отбойник Z',
          model3d: '/z.glb',
          images: [
            z,
            
          ],
          price: 'от 47 ₽/м',
          description: 'Экономичный вариант для бюджетных проектов',
          inStock: true
        },
      ],
      cornices: [
        /* {
          id: 'std-7',
          name: 'Профиль BP-55 специальный',
          images: [
            'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400',
            bp40,
            'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=400'
          ],
          price: '175 ₽/м',
          description: 'Специальный профиль для сложных конструкций',
          rating: 5,
          inStock: true
        },
        {
          id: 'std-8',
          name: 'Профиль BP-25 мини',
          images: [
            'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400',
            'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=400'
          ],
          price: '80 ₽/м',
          description: 'Минимальный профиль для декоративных элементов',
          rating: 4,
          inStock: true
        } */
        {
          id: 'b2',
          name: 'Карниз B2',
          model3d: '/b2.glb',
          images: [
            b2,
            
           
          ],
          price: 'от 750 ₽/м',
          description: 'Стандартный карниз для штор и портьер',
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
          price: 'от 340 ₽/м',
          description: 'Классический двухрядный карниз',
          inStock: true
        },
        {
          id: 'cor-4',
          name: 'Карниз ПК-12',
          images: [
            pk12,
            
            
          ],
          price: 'от 380 ₽/м',
          description: 'Классический трёхрядный карниз',
          inStock: true
        },
        {
          id: 'cor-5',
          name: 'Карниз B-1 однорядный',
          images: [
            
          ],
          price: 'от 380 ₽/м',
          description: 'Угловой карниз для сложных конфигураций',
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
          name: 'L-вставка для карнизов',
          images: [
          furnitures,
            
          ],
          price: '45 ₽/шт',
          description: 'Угловой соединитель для профилей 90 градусов',
          inStock: true
        },
       /* {
          id: 'cont-2',
          name: 'Заглушки торцевые ПК-14',
          images: [
          
          ],
          price: '25 ₽/шт',
          description: 'Торцевая заглушка для профилей 40мм',
          rating: 5,
          inStock: true
        },
        */
        {
          id: 'cont-3',
          name: 'Заглушки торцевые B-1',
          images: [
            'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400'
          ],
          price: '15 ₽/шт',
          description: 'Настенный крепеж для монтажа профилей',
          inStock: true
        },
        {
          id: 'cont-4',
          name: 'Бандажная лента',
          images: [
            furnitures,
           
          ],
          price: '35 ₽/шт',
          description: 'Прямой соединитель для стыковки профилей',
          inStock: true
        },
      /*  {
          id: 'cont-5',
          name: 'Подвес потолочный ПП-1',
          images: [
            'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400',
            'src/assets/furnitures.jpg'
          ],
          price: '20 ₽/шт',
          description: 'Потолочный подвес для крепления профилей',
          rating: 4,
          inStock: true
        },
        {
          id: 'cont-6',
          name: 'Уплотнитель резиновый УР-5',
          images: [
            'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400'
          ],
          price: '80 ₽/м',
          description: 'Резиновый уплотнитель для герметизации',
          rating: 4,
          inStock: true
        },
        {
          id: 'cont-7',
          name: 'Саморез с пресс-шайбой СПШ-25',
          images: [
            'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400',
            'src/assets/furnitures.jpg'
          ],
          price: '2 ₽/шт',
          description: 'Саморез с пресс-шайбой для крепления',
          rating: 5,
          inStock: true
        },
        {
          id: 'cont-8',
          name: 'Дюбель распорный ДР-6',
          images: [
            'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400'
          ],
          price: '3 ₽/шт',
          description: 'Распорный дюбель для крепления к стене',
          rating: 4,
          inStock: true
        } */
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