import React from 'react';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import ModelViewer from './ModelViewer';

import {
  bp40,
  bp40_ch,
  cornices,
  pk12,
  stenvoy,
  sten_1,
  sten_2,
  sten_3,
  pk14_ch,
  razdelitel,
  razdelitel_ch,
  universal,
  universal_ch,
  potoloch,
  potoloch_ch,
  z,
  z_ch,
  b2,
  b2_ch,
  b2_zagl,
  pk15,
  pk15_ch,
  pk12_ch,
  am1,
  light_lines,
  furnitures,
} from '@/assets/images.ts'

interface Product {
  id: string;
  name: string;
  images: string[];
  model3d: string;
  price: string;
  description: string;
  inStock: boolean;
  specifications: { [key: string]: string };
  fullDescription: string;
  priceBanner?: string;
}

interface ProductPageProps {
  productId: string;
  onBack: () => void;
  onOrderClick: () => void;
}

const ProductPage: React.FC<ProductPageProps> = ({ productId, onBack, onOrderClick }) => {
  const getProductData = (id: string): Product => {
    const baseProduct = {
      id,
      images: [
        bp40,
        cornices,
        pk12
      ],
      model3d: undefined, // No default model available
      inStock: true,
      specifications: {},
      fullDescription: ''
    };

    const products: { [key: string]: Partial<Product> } = {
      'std-1': {
        name: 'Брус 40х40',
        images: [
          bp40,
          bp40_ch,

        ],
        model3d: "/3d/bp40.glb",
        price: '189 ₽/м',
        description: 'Классический профиль для натяжных потолков с теневым зазором',
        fullDescription: 'Профиль BP-40 - это классическое решение для создания натяжных потолков с эффектом теневого зазора. Изготовлен из высококачественного алюминиевого сплава, обеспечивает надежное крепление полотна и создает элегантный переход между стеной и потолком.',
        priceBanner: 'На средний и крупный опт цена договорная',
        specifications: {
          'Материал': 'Алюминиевый сплав АД31',
          'Высота профиля': '40 мм',
          'Ширина': '40 мм',
          'Толщина стенки': '1.2 мм',
          'Длина': '2.0 м / 2.5 м / 3.2 м',
          'Цвет': 'Алюминий без покрытия',
          'Вес': '0.38 кг/м',
          'Рабочая температура': '-40°C до +80°C'
        }
      },
      'std-2': {
        name: 'Профиль Стенвой',
        images: [
          stenvoy,
          sten_1,
        ],
        model3d: '/3d/sten.glb',
        price: 'от 37,5 ₽/м',
        description: 'Усиленный профиль для больших площадей потолков',
        fullDescription: 'Стенвой профиль предназначен для создания надежных креплений в больших помещениях.',
        priceBanner: 'На средний и крупный опт цена договорная',
        specifications: {
          'Материал': 'Алюминиевый сплав АД31',
          'Высота профиля': '29,5, 31,5мм',
          'Длина': '2.0 м / 2.5 м',
          'Цвет': 'Белый матовый',
          'Вес': '100, 120 гр/м',
          'Рабочая температура': '-40°C до +80°C'
        }
      },
      'cor-1': {
        name: 'Карниз ПК-14 стандартный',
        images: [
          cornices,
          pk14_ch,

        ],
        model3d: '/3d/pk14.glb',
        price: 'от 560 ₽/м',
        description: 'Стандартный карниз для штор и портьер',
        fullDescription: 'Карниз ПК-14 обеспечивает надежное крепление штор различного веса.',
        priceBanner: 'На средний и крупный опт цена договорная',
        specifications: {
          'Материал': 'Алюминиевый сплав АД31',
          'Высота профиля': '45 мм',
          'Ширина': '108 мм',
          'Толщина стенки': '1.2 мм',
          'Длина': '2.0 м / 2.5 м / 3.2 м',
          'Цвет': 'Белый матовый / Чёрный муар',
          'Вес': '1.3 кг/м',
          'Рабочая температура': '-40°C до +80°C'
        }
      },
      'std-3': {
        name: 'Разделитель',
        images: [
          razdelitel,
          razdelitel_ch
        ],
        model3d: '/3d/razdel.glb',
        price: '149 ₽/м',
        description: 'Компактный профиль для небольших помещений',
        fullDescription: 'Разделитель предназначен для создания переходов между различными уровнями потолка.',
        priceBanner: 'На средний и крупный опт цена договорная',
        specifications: {
          'Материал': 'Алюминиевый сплав АД31',
          'Высота профиля': '30 мм',
          'Ширина': '20 мм',
          'Толщина стенки': '1.2 мм',
          'Длина': '2.5 м / 3.2 м',
          'Цвет': '',
          'Вес': '0.34 кг/м',
          'Рабочая температура': '-40°C до +80°C'
        }
      },
      'std-4': {
        name: 'Профиль Универсальный',
        images: [
          universal,
          universal_ch
        ],
        model3d: '/3d/univers.glb',
        price: '84 ₽/м',
        description: 'Профиль для крепления к стене или потолку',
        fullDescription: 'Универсальный профиль подходит для различных типов натяжных потолков.',
        priceBanner: 'На средний и крупный опт цена договорная',
        specifications: {
          'Материал': 'Алюминиевый сплав АД31',
          'Длина': '2.0 м / 2.5 м',
          'Цвет': 'Алюминий без покрытия',
          'Вес': '156 гр/м',
          'Рабочая температура': '-40°C до +80°C'
        }
      },
      'std-5': {
        name: 'Профиль Потолочный',
        images: [
          potoloch,
          potoloch_ch
        ],
        model3d: '/3d/potoloch.glb',
        price: '69 ₽/м',
        description: 'Универсальный профиль для любых задач',
        fullDescription: 'Потолочный профиль обеспечивает надежное крепление к потолочным конструкциям.',
        priceBanner: 'На средний и крупный опт цена договорная',
        specifications: {
          'Материал': 'Алюминиевый сплав АД31',
          'Высота профиля': '42 мм',
          'Ширина': '26 мм',
          'Толщина стенки': '1.3 мм',
          'Длина': '2 м / 2.5 м',
          'Цвет': 'Алюминий без покрытия',
          'Вес': '221 гр/м',
          'Рабочая температура': '-40°C до +80°C'
        }
      },
      'std-6': {
        name: 'Отбойник Z',
        images: [
          z,
          z_ch
        ],
        model3d: '/3d/potoloch.glb',
        price: '59 ₽/м',
        description: 'Экономичный вариант для бюджетных проектов',
        fullDescription: 'Отбойник Z используется для создания защитных элементов в конструкции потолка.',
        priceBanner: 'На средний и крупный опт цена договорная',
        specifications: {
          'Материал': 'Алюминиевый сплав АД31',
          'Толщина стенки': '0.8 мм',
          'Длина': '2 м / 2.5 м',
          'Цвет': 'Белый матовый',
          'Вес': '136 гр/м',
          'Рабочая температура': '-40°C до +80°C'
        }
      },
      'b2': {
        name: 'Карниз B-2 PRO',
        images: [
          b2,
          b2_ch,

        ],
        model3d: '/3d/b2.glb',
        price: '949 ₽/м',
        description: 'Новый карниз для крепления штор в скрытых нишах с улучшеным дизайном и усиленной прочностью',
        fullDescription: 'Карниз B2 обеспечивает надежное крепление штор различного веса и элегантный внешний вид.',
        priceBanner: 'На средний и крупный опт цена договорная',
        specifications: {
          'Материал': 'Алюминиевый сплав АД31',
          'Высота профиля': '63.5 мм',
          'Ширина': '108.5 мм',
          'Толщина стенки': '1.2 мм',
          'Длина': '2.2 м / 3.2 м',
          'Цвет': 'Белый матовый / Чёрный муар',
          'Вес': '1.7 кг/м',
          'Рабочая температура': '-40°C до +80°C'
        }
      },
      'cor-2': {
        name: 'Карниз ПК-14 облегченный',
        images: [
          cornices,
          pk14_ch
        ],
        model3d: '/3d/pk14.glb',
        price: 'от 520 ₽/м',
        description: 'Двухрядный карниз для тюля и штор',
        fullDescription: 'Облегченная версия карниза ПК-14 для легких тканей.',
        priceBanner: 'На средний и крупный опт цена договорная',
        specifications: {
          'Материал': 'Алюминиевый сплав АД31',
          'Высота профиля': '43.5 мм',
          'Ширина': '103 мм',
          'Толщина стенки': '1 мм',
          'Длина': '2.0 м / 2.5 м / 3.2 м',
          'Цвет': 'Белый матовый / Чёрный муар',
          'Вес': '1.18 кг/м',
          'Рабочая температура': '-40°C до +80°C'
        }
      },
      'cor-3': {
        name: 'Карниз ПК-15',
        images: [
          pk15,
          pk15_ch,
        ],
        model3d: '/3d/pk15.glb',
        price: '459 ₽/м',
        description: 'Классическое решение проверенное временем',
        fullDescription: 'Карниз ПК-15 идеально подходит для небольших помещений.',
        priceBanner: 'На средний и крупный опт цена договорная',
        specifications: {
          'Материал': 'Алюминиевый сплав АД31',
          'Высота профиля': '52 мм',
          'Ширина': '75 мм',
          'Толщина стенки': '1.2 мм',
          'Длина': '2.0 м / 2.5 м / 3.2 м',
          'Цвет': 'Белый матовый / Чёрный муар',
          'Вес': '0.822 кг/м',
          'Рабочая температура': '-40°C до +80°C'
        }
      },
      'cor-4': {
        name: 'Карниз ПК-12',
        images: [
          pk12,
          pk12_ch,

        ],
        model3d: '/3d/pk12.glb',
        price: '519 ₽/м',
        description: 'Премиум карниз с улучшенным дизайном',
        fullDescription: 'Карниз ПК-12 представляет собой премиум решение для современных интерьеров.',
        priceBanner: 'На средний и крупный опт цена договорная',
        specifications: {
          'Материал': 'Алюминиевый сплав АД31',
          'Высота профиля': '52 мм',
          'Ширина': '90 мм',
          'Толщина стенки': '1.1 мм',
          'Длина': '2.5 м / 3.0 м',
          'Цвет': 'Белый матовый / Чёрный муар',
          'Вес': '0.7 кг/м',
          'Рабочая температура': '-40°C до +80°C'
        }
      },
      'cor-5': {
        name: 'Карниз B-1 однорядный',
        images: [
          am1,

        ],
        model3d: '/3d/b1.glb',
        price: 'от 380 ₽/м',
        description: 'Однорядный карниз с пазом для светодиодной ленты',
        fullDescription: 'Карниз B-1 представляет собой премиум решение для современных интерьеров.',
        priceBanner: 'На средний и крупный опт цена договорная',
        specifications: {
          'Материал': 'Алюминиевый сплав АД31',
          'Высота профиля': '42,6 мм',
          'Ширина': '58,6 мм',
          'Толщина стенки': '1.1 мм',
          'Длина': '2 м / 2.5 м / 3.2м',
          'Цвет': 'Белый матовый / Чёрный муар',
          'Вес': '0.7 кг/м',
          'Рабочая температура': '-40°C до +80°C'
        }
      },
      'light-1': {
        name: 'Световая линия СЛ-40 LED',
        images: [
          light_lines,

        ],
        price: '350 ₽/м',
        description: 'LED световая линия с равномерным освещением',
        fullDescription: 'Световая линия СЛ-40 обеспечивает равномерное LED освещение по всей длине профиля.',
        priceBanner: 'На средний и крупный опт цена договорная',
        specifications: {
          'Материал': 'Алюминиевый сплав АД31',
          'Высота профиля': '40 мм',
          'Ширина': '30 мм',
          'Мощность LED': '12 Вт/м',
          'Цветовая температура': '3000K-6000K',
          'Длина': '2.0 м',
          'Цвет': 'Белый матовый',
          'Класс защиты': 'IP20'
        }
      },
      'cont-1': {
        name: 'П-вставка для карнизов',
        images: [
          furnitures,
          ''
        ],
        price: '40 ₽/м',
        description: 'П-вставка для карнизов',
        fullDescription: 'Закрывает технический зазор профиля и предает эстетический вид.',
        specifications: {
          'Материал': 'ПВХ',
          'Совместимость': 'Все карнизы',
          'Цвет': 'Белый и чёрный матовый',
          'Вес': '25 г',
          'Упаковка': '50 шт'
        }
      },
      'cont-2': {
        name: 'Заглушки торцевые B2-PRO',
        images: [
          b2_zagl,
        ],
        price: '300 ₽/комплект',
        description: 'TL-вставка для карнизов',
        fullDescription: 'Закрывает технический зазор профиля и предает эстетический вид.',
        specifications: {
          'Материал': 'Алюминиевый сплав АД31',
          'Угол соединения': '90°',
          'Совместимость': 'Металл',
          'Цвет': 'Белый матовый',
          'Вес': '25 г',
          'Упаковка': '4 шт'
        }
      },
      'cont-3': {
        name: 'Заглушки торцевые B-1',
        images: [
          
        ],
        price: '300 ₽/комплект',
        description: 'Металл',
        fullDescription: 'Закрывает технический зазор профиля и предает эстетический вид.',
        specifications: {
          'Материал': 'ПВХ',
          'Угол соединения': '90°',
          'Совместимость': 'Профили 40мм',
          'Цвет': 'Белый матовый, чёрный муар',
          'Вес': '25 г',
          'Упаковка': '4 шт'
        }
      },
      'cont-4': {
        name: 'Бандажная лента',
        images: [
          
        ],
        price: '45 ₽/шт',
        description: 'Бандажная лента для стыковки профилей',
        fullDescription: 'Соединяет профили по длине.',
        specifications: {
          'Материал': 'Алюминиевый сплав АД31',
          'Совместимость': 'Все карнизы',
          'Цвет': 'Алюминий без покрытия',
          'Вес': '25 г',
          'Упаковка': '50 шт'
        }
      }
    };

    return { ...baseProduct, ...products[id] } as Product;
  };

  const product = getProductData(productId);

  return (
    <div className="min-h-screen bg-[#1A1A1A] pt-16">
      <div className="container mx-auto px-6 md:px-8 lg:px-12 py-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-400 hover:text-yellow-400 transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span>Назад к каталогу</span>
        </button>

        {/* Product Title */}
        <h1 className="text-3xl font-bold text-white mb-8">{product.name}</h1>

        {/* Top Section: Image + 3D Model */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="bg-[#3A3A3A] rounded-lg overflow-hidden">
            <div className="h-96 grid place-items-center">
              <img
                src={product.images[0]}
                alt={product.name}
                className="h-full w-auto object-contain"
              />
            </div>
          </div>

          {/* 3D Model Viewer */}
          <div>
            {product.model3d ? (
              <ModelViewer 
                modelPath={product.model3d}
                title={product.name}
                description="3D модель товара - используйте мышь для вращения"
              />
            ) : (
              <div className="bg-[#3A3A3A] rounded-lg h-96 md:h-[500px] flex items-center justify-center border border-gray-700">
                <div className="text-center">
                  <p className="text-gray-400 mb-2">3D модель недоступна</p>
                  <p className="text-gray-500 text-sm">Для этого товара пока нет 3D модели</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section: Price, Description, Specifications */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Price and Purchase */}
          <div className="bg-[#3A3A3A] rounded-lg p-6">
            <div className="text-3xl font-bold text-yellow-400 mb-4">
              {product.price}
            </div>

            {/* Price Banner */}
            {product.priceBanner && (
              <div className="mb-4 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-l-4 border-yellow-400 rounded-lg px-4 py-3">
                <span className="text-yellow-300 font-bold text-sm uppercase tracking-wide">
                  {product.priceBanner}
                </span>
              </div>
            )}

            {/* Stock Status */}
            <div className="mb-6">
              {product.inStock ? (
                <span className="text-green-400 font-medium">✓ В наличии</span>
              ) : (
                <span className="text-red-400 font-medium">✗ Нет в наличии</span>
              )}
            </div>

            {/* Purchase Button */}
            <button
              disabled={!product.inStock}
              onClick={onOrderClick}
              className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-semibold py-3 px-6 rounded-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-lg flex items-center justify-center space-x-2 group"
            >
              <ShoppingCart size={20} />
              <span>Заказать товар</span>
            </button>
          </div>

          {/* Description */}
          <div className="bg-[#3A3A3A] rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Описание</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              {product.description}
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              {product.fullDescription}
            </p>
          </div>

          {/* Specifications */}
          <div className="bg-[#3A3A3A] rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Характеристики</h3>
            <div className="space-y-3">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0">
                  <span className="text-gray-400 text-sm">{key}:</span>
                  <span className="text-white font-medium text-sm">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;