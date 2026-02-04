import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import {ceilingSlide} from "@/assets/images.ts";

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "ДЛЯ НАТЯЖНЫХ ПОТОЛКОВ",
      subtitle: "Алюминиевые профили",
      description: "Высококачественные карнизы, багеты, стеновые, комплектующие и т.д.",
      image: ceilingSlide,
      video: "",
    },
    {
      title: "Весь ассортимент алюминиевых профилей и по чертежам заказчика",
      subtitle: "от ООО Авангард",
      description: "",
      // image: тут ссылка на изображение,
      href: "/",
      video: "https://xbawwaakkvciyofymepf.supabase.co/storage/v1/object/public/slider-video/Extrude.mp4"
    },
    // {
    //   title: "Оптовое производство",
    //   subtitle: "Оптовые цены",
    //   description: "Чем больше покупаете, тем больше экономите",
    //   video: "https://xbawwaakkvciyofymepf.supabase.co/storage/v1/object/public/slider-video/Hailuo_Video_CINEMATIC%20SHOT%20SEQUENCE__%201%20E_396470788518010889.mp4"
    // },
    // {
    //   title: "Широкий ассортимент",
    //   subtitle: "Для любых задач",
    //   description: "Стандартные, световые, контурные и карнизные профили",
    //   video: "https://xbawwaakkvciyofymepf.supabase.co/storage/v1/object/public/slider-video/Hailuo_Video_Wide%20shot%20modern%20loft%20(exposed_396833602164224002.mp4"
    // }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 37200);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const scrollToCatalog = () => {
    const element = document.getElementById('catalog');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen bg-gradient-to-br from-[#1A1A1A] via-[#3A3A3A] to-[#1A1A1A] flex items-center overflow-hidden">
      {/* Background Video for current slide */}
      {slides[currentSlide].video && (
        <div className="absolute inset-0 z-0">
          {slides[currentSlide].image ?
              <img src={slides[currentSlide].image} alt={slides[currentSlide].subtitle}/> :
              <video
                  key={currentSlide}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover opacity-30"
              >
                <source src={slides[currentSlide].video} type="video/mp4" />
              </video>
          }
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      )}

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-transparent"></div>
      </div>

      <div className="absolute inset-0 flex items-center z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            {/* Slide Content */}
            <div className="transition-all duration-500 ease-in-out">
              <div className="text-yellow-400 text-sm font-medium mb-2 uppercase tracking-wider">
                {slides[currentSlide].subtitle}
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                {slides[currentSlide].title}
              </h1>
              <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl leading-relaxed">
                {slides[currentSlide].description}
              </p>
              
              <button
                onClick={slides[currentSlide].href ? () => window.location.href = slides[currentSlide].href :
                    scrollToCatalog}
                className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg flex items-center space-x-2 group"
              >
                <span>Перейти</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-yellow-400 transition-colors duration-200 z-20"
      >
        <ChevronLeft size={32} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-yellow-400 transition-colors duration-200 z-20"
      >
        <ChevronRight size={32} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide 
                ? 'bg-yellow-400 scale-125' 
                : 'bg-white/30 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-800">
        <div 
          className="h-full bg-yellow-400 transition-all duration-300"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>
    </section>
  );
};

export default HeroSection;