import React, { useState, useEffect } from 'react';
import { Award, Users, Clock, TrendingUp, CheckCircle, ArrowRight, Zap, Shield, Star } from 'lucide-react';

const AboutSection: React.FC = () => {
  const [activeAdvantage, setActiveAdvantage] = useState(0);
  const [counters, setCounters] = useState({
    experience: 0,
    clients: 0,
    projects: 0,
    products: 0
  });

  const stats = [
    { key: 'experience', value: 15, suffix: '+', label: 'лет опыта', icon: Clock },
    { key: 'clients', value: 500, suffix: '+', label: 'довольных клиентов', icon: Users },
    { key: 'projects', value: 1200, suffix: '+', label: 'выполненных проектов', icon: Award },
    { key: 'products', value: 50, suffix: '+', label: 'видов продукции', icon: TrendingUp }
  ];

  const advantages = [
    {
      icon: Shield,
      title: 'Гарантия качества',
      description: 'Все профили изготавливаются из высококачественного алюминиевого сплава 6063 с соблюдением ГОСТ стандартов',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Zap,
      title: 'Быстрое производство',
      description: 'Собственное производство позволяет выполнять заказы в кратчайшие сроки без потери качества',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: Star,
      title: 'Индивидуальный подход',
      description: 'Разрабатываем решения под конкретные задачи клиента, включая нестандартные размеры и конфигурации',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: CheckCircle,
      title: 'Полный сервис',
      description: 'От консультации до доставки - обеспечиваем полное сопровождение проекта на всех этапах',
      color: 'from-green-500 to-green-600'
    }
  ];

  // Animated counters
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    stats.forEach(stat => {
      let current = 0;
      const increment = stat.value / steps;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= stat.value) {
          current = stat.value;
          clearInterval(timer);
        }
        
        setCounters(prev => ({
          ...prev,
          [stat.key]: Math.floor(current)
        }));
      }, stepDuration);
    });
  }, []);

  // Auto-rotate advantages
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveAdvantage(prev => (prev + 1) % advantages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-[#1A1A1A] via-[#2A2A2A] to-[#1A1A1A] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 border border-yellow-400 rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-yellow-400 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 border border-yellow-400 rounded-full"></div>
        <div className="absolute bottom-40 right-1/3 w-20 h-20 border border-yellow-400 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            О компании Авангард
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
            Мы — ведущий производитель алюминиевых профилей для натяжных потолков в Санкт-Петербурге. 
            Наша миссия — создавать качественные решения для современных интерьеров.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.key}
                className="bg-[#3A3A3A] rounded-lg p-6 text-center hover:bg-gray-700 transition-all duration-300 hover:scale-105 border border-gray-700 hover:border-yellow-400/50 group"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-400 rounded-full mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-black" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-yellow-400 mb-2">
                  {counters[stat.key as keyof typeof counters]}{stat.suffix}
                </div>
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Company Description */}
          <div className="space-y-6">
            <div className="bg-[#3A3A3A] rounded-lg p-8 border border-gray-700 hover:border-yellow-400/30 transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-4">Наша история</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Компания "Авангард" была основана в 2009 году с целью предоставления качественных 
                алюминиевых профилей для индустрии натяжных потолков. За годы работы мы зарекомендовали 
                себя как надежный партнер для строительных компаний и частных заказчиков.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Наше производство оснащено современным оборудованием, что позволяет выпускать продукцию 
                высочайшего качества, соответствующую всем российским и международным стандартам.
              </p>
            </div>

            <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 rounded-lg p-6 border border-yellow-400/30">
              <h4 className="text-xl font-semibold text-yellow-400 mb-3">Наши принципы</h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                  <span>Качество превыше всего</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                  <span>Индивидуальный подход к каждому клиенту</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                  <span>Постоянное развитие и инновации</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Side - Interactive Advantages */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white text-center mb-8">Наши преимущества</h3>
            
            {/* Advantage Cards */}
            <div className="space-y-4">
              {advantages.map((advantage, index) => {
                const Icon = advantage.icon;
                const isActive = index === activeAdvantage;
                
                return (
                  <div
                    key={index}
                    className={`relative overflow-hidden rounded-lg border transition-all duration-500 cursor-pointer ${
                      isActive 
                        ? 'bg-[#3A3A3A] border-yellow-400 scale-105' 
                        : 'bg-[#2A2A2A] border-gray-700 hover:border-gray-600'
                    }`}
                    onClick={() => setActiveAdvantage(index)}
                  >
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${advantage.color} opacity-0 transition-opacity duration-500 ${
                      isActive ? 'opacity-10' : ''
                    }`}></div>
                    
                    <div className="relative p-6">
                      <div className="flex items-start space-x-4">
                        <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isActive 
                            ? 'bg-yellow-400 text-black scale-110' 
                            : 'bg-gray-700 text-yellow-400'
                        }`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        
                        <div className="flex-1">
                          <h4 className={`font-semibold mb-2 transition-colors duration-300 ${
                            isActive ? 'text-yellow-400' : 'text-white'
                          }`}>
                            {advantage.title}
                          </h4>
                          
                          <div className={`overflow-hidden transition-all duration-500 ${
                            isActive ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
                          }`}>
                            <p className="text-gray-300 text-sm leading-relaxed">
                              {advantage.description}
                            </p>
                          </div>
                        </div>
                        
                        <ArrowRight className={`w-5 h-5 transition-all duration-300 ${
                          isActive 
                            ? 'text-yellow-400 translate-x-1' 
                            : 'text-gray-500'
                        }`} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Progress Indicators */}
            <div className="flex justify-center space-x-2 mt-6">
              {advantages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveAdvantage(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeAdvantage 
                      ? 'bg-yellow-400 scale-125' 
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;