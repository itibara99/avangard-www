import React from 'react';
import { TrendingUp, Phone, Mail, MapPin } from 'lucide-react'

const Footer: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1A1A1A] border-t border-gray-800">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="text-yellow-400 w-6 h-6" />
              <span className="text-white font-bold text-xl">Авангард</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Производство и продажа качественных алюминиевых профилей для натяжных потолков. 
              Современные решения для вашего интерьера.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-4">Навигация</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection('hero')}
                  className="text-gray-400 hover:text-yellow-400 transition-colors duration-200 text-sm"
                >
                  Главная
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('model-viewer')}
                  className="text-gray-400 hover:text-yellow-400 transition-colors duration-200 text-sm"
                >
                  Новинка
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('catalog')}
                  className="text-gray-400 hover:text-yellow-400 transition-colors duration-200 text-sm"
                >
                  Каталог
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contacts')}
                  className="text-gray-400 hover:text-yellow-400 transition-colors duration-200 text-sm"
                >
                  Контакты
                </button>
              </li>
              <li>
                <button
                    onClick={() => window.location.href = '/'}
                    className="text-gray-400 hover:text-yellow-400 transition-colors duration-200 text-sm"
                >
                  Основной сайт
                </button>
              </li>

            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white font-semibold mb-4">Продукция</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Стандартные профили</li>
              <li>Карнизы</li>
              <li>Световые линии</li>
              <li>Контурные профили</li>
            </ul>
          </div>

          {/* Politics */}
          <div>
            <h3 className="text-white font-semibold mb-4">Соглашения</h3>
            <div className="space-y-3">
              <button
                  onClick={() => window.open("/soglasie-na-obrabotky.pdf", "_blank")}
                  className="text-gray-400 hover:text-yellow-400 transition-colors duration-200 text-sm"
              >
                Обработка персональных данных
              </button>
              <button
                  onClick={() => window.open("/politika.pdf", "_blank")}
                  className="text-gray-400 hover:text-yellow-400 transition-colors duration-200 text-sm"
              >
                Политика конфиденциальности
              </button>
              <button
                  onClick={() => window.open("/cookie.pdf", "_blank")}
                  className="text-gray-400 hover:text-yellow-400 transition-colors duration-200 text-sm"
              >
                Политика файлов cookies
              </button>
            </div>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="text-white font-semibold mb-4">Контакты</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="text-yellow-400 w-4 h-4 flex-shrink-0" />
                <span className="text-gray-400">+7 (981) 746-73-30</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="text-yellow-400 w-4 h-4 flex-shrink-0" />
                <span className="text-gray-400">avan-team@mail.ru</span>
              </div>
              <div className="flex items-start space-x-3 text-sm">
                <MapPin className="text-yellow-400 w-4 h-4 flex-shrink-0 mt-1" />
                <span className="text-gray-400">
                  г. Санкт-Петербург,<br />
                  пер. Челиева, 17, офис 208
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 Авангард. Все права защищены.
            </div>

            <div className="text-gray-400 text-sm">
              Производство алюминиевых профилей для натяжных потолков
            </div>
          </div>
        </div>
      </div>


    </footer>
  );
};

export default Footer;