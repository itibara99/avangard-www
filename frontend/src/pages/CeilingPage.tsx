import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/ceiling/Header';
import HeroSection from '../components/ceiling/HeroSection';
import CookieConsent from '../components/CookieConsent';
import CatalogSection from '../components/ceiling/CatalogSection';
import CategoryPage from '../components/ceiling/CategoryPage';
import ProductPage from '../components/ceiling/ProductPage';
import ContactForm from '../components/ceiling/ContactForm';
import ContactSection from '../components/ceiling/ContactSection';
import Footer from '../components/ceiling/Footer';
import ModelViewer from '../components/ceiling/ModelViewer';
import {b2} from "../assets/images.ts";
import { getCategoryId, getProductId } from '../utils/slugs';

function App() {
  const { category: categorySlug, product: productSlug } = useParams<{ category?: string; product?: string }>();
  const navigate = useNavigate();

  const categoryId = categorySlug ? getCategoryId(categorySlug) : null;
  const productId = productSlug ? getProductId(productSlug) : null;

  const categoryTitles = {
    standard: 'Стандартные профили',
    cornices: 'Карнизы',
    contour: 'Комплектующие'
  };

  useEffect(() => {
    if (categoryId && !productId) {
      document.title = `${categoryTitles[categoryId as keyof typeof categoryTitles]} | Авангард Потолки`;
    } else if (!categoryId && !productId) {
      document.title = 'Авангард Потолки - Производство алюминиевых профилей';
    }
  }, [categoryId, productId]);

  const handleNavigateToHome = (section: string) => {
    navigate('/ceiling');

    setTimeout(() => {
      const element = document.getElementById(section);
      element?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleOrderClick = () => {
    handleNavigateToHome('contact-form');
  };

  if (productId && categoryId) {
    return (
      <div className="min-h-screen bg-[#1A1A1A]">
        <CookieConsent />
        <Header onNavigate={handleNavigateToHome} />
        <ProductPage
          productId={productId}
          categoryId={categoryId}
          onOrderClick={handleOrderClick}
        />
        <Footer />
      </div>
    );
  }

  if (categoryId) {
    return (
      <div className="min-h-screen bg-[#1A1A1A]">
        <CookieConsent />
        <Header onNavigate={handleNavigateToHome} />
        <CategoryPage
          categoryId={categoryId}
          categoryTitle={categoryTitles[categoryId as keyof typeof categoryTitles]}
          onOrderClick={handleOrderClick}
        />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1A1A1A]">
      <CookieConsent />
      <Header onNavigate={handleNavigateToHome} />
      <HeroSection />
      <section id="model-viewer" className="py-20 bg-[#1A1A1A]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              НОВИНКА - Карниз B-2 PRO
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Изучите наш профиль в деталях. Используйте мышь для вращения и масштабирования модели
            </p>
          </div>

          {/* 3D Viewer Container */}
          <div className="max-w-6xl mx-auto">
            {/* Top Section: Image + 3D Model */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              {/* Left Side - Product Image (1/3 width) */}
              <div className="lg:col-span-1">
                <div className="bg-[#3A3A3A] rounded-lg overflow-hidden border border-gray-700">
                  <div className="relative h-96 md:h-[500px]">
                    <img
                      src= {b2}
                      alt="Алюминиевый профиль BP-40"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-black/60 backdrop-blur-sm rounded-lg p-3">
                        <h3 className="text-white font-semibold text-lg mb-1">
                          Карниз B-2 PRO
                        </h3>
                        <p className="text-gray-300 text-sm mb-3">
                          Универсальный карниз для скрытой ниши под шторы
                        </p>
                        <button
                          onClick={() => navigate('/ceiling/catalog/karnizy/karniz-b2-pro')}
                          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                        >
                          Перейти
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - 3D Model (2/3 width) */}
              <div className="lg:col-span-2">
                <ModelViewer 
                  modelPath='/3d/b2.glb'
                  title="Карниз B2"
                  description="Используйте левую кнопку мыши для вращения • Колесико мыши для масштабирования • Автовращение возобновляется через 4 секунды"
                />
              </div>
            </div>

            {/* Bottom Section: Full Width Description */}
            <div className="bg-[#3A3A3A] rounded-lg p-6 border border-gray-700">
              <h4 className="text-xl font-semibold text-white mb-4">
                Технические характеристики
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-gray-600">
                    <span className="text-gray-400">Материал:</span>
                    <span className="text-white font-medium">Алюминиевый сплав 6060</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-600">
                    <span className="text-gray-400">Высота профиля:</span>
                    <span className="text-white font-medium">63.5 мм</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-400">Ширина:</span>
                    <span className="text-white font-medium">108.5 мм</span>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-gray-600">
                    <span className="text-gray-400">Толщина стенки:</span>
                    <span className="text-white font-medium">1.1 мм</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-600">
                    <span className="text-gray-400">Длина:</span>
                    <span className="text-white font-medium">2.0 м / 2.5 м / 3.2 м</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-400">Цвет:</span>
                    <span className="text-white font-medium">Белый матовый, чёрный муар</span>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-gray-600">
                    <span className="text-gray-400">Вес:</span>
                    <span className="text-white font-medium">1.8 кг/м</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-600">
                    <span className="text-gray-400">Рабочая температура:</span>
                    <span className="text-white font-medium">-40°C до +80°C</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-400">Стандарт:</span>
                    <span className="text-white font-medium">ГОСТ 22233-2025</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-yellow-400/10 border border-yellow-400/30 rounded-lg">
                <p className="text-yellow-400 text-sm font-medium mb-2">
                  ✓ Соответствует ГОСТ стандартам
                </p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Профиль изготовлен из высококачественного алюминиевого сплава.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CatalogSection />
      <ContactForm />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;