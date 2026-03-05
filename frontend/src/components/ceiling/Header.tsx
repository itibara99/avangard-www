import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import {logo} from '@/assets/images.ts'

interface HeaderProps {
  onNavigate?: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    if (onNavigate) {
      onNavigate(sectionId);
      return;
    }
    
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1A1A1A]/95 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src={logo} alt="Авангард Потолки" className="w-8 h-7" />
            <span className="text-white font-bold text-2xl">Авангард Потолки</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-10">
            <button 
              onClick={() => scrollToSection('hero')}
              className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-lg font-medium"
            >
              Главная
            </button>
            <button 
              onClick={() => scrollToSection('catalog')}
              className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-lg font-medium"
            >
              Каталог
            </button>
            <button 
              onClick={() => scrollToSection('contacts')}
              className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-lg font-medium"
            >
              Контакты
            </button>
            <button className="group relative overflow-hidden bg-gradient-to-r from-sky-600 to-blue-700
              hover:from-sky-500 hover:to-blue-600 text-white px-4 py-2 rounded-2xl font-semibold text-lg
              transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-700/20"
                    onClick={() => window.location.href = "/"}
            >
                <span className="relative z-10 flex items-center space-x-2">
                  <span>ООО "Авангард"</span>
                </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white hover:text-yellow-400 transition-colors p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-gray-800">
            <nav className="flex flex-col space-y-2">
              <button 
                onClick={() => scrollToSection('hero')}
                className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 py-3 text-left text-lg font-medium"
              >
                Главная
              </button>
              <button 
                onClick={() => scrollToSection('catalog')}
                className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 py-3 text-left text-lg font-medium"
              >
                Каталог
              </button>
              <button 
                onClick={() => scrollToSection('contacts')}
                className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 py-3 text-left text-lg font-medium"
              >
                Контакты
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;