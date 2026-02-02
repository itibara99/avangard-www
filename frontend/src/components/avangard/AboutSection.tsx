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
    { key: 'clients', value: 100, suffix: '+', label: 'постоянных заказчиков', icon: Users },
    { key: 'projects', value: 900, suffix: '+', label: 'выполненных заказов', icon: Award },
    { key: 'products', value: 10000, suffix: '+', label: 'видов продукции', icon: TrendingUp }
  ];

  const advantages = [
    {
      icon: Shield,
      title: 'Гарантия качества',
      description: 'Все профили изготавливаются из высококачественного алюминиевого сплава 6063 с соблюдением ГОСТ стандартов',
      color: 'from-cyan-500 to-blue-600'
    },
    {
      icon: Zap,
      title: 'Быстрое производство',
      description: 'Собственное производство позволяет выполнять заказы в кратчайшие сроки без потери качества',
      color: 'from-orange-500 to-yellow-500'
    },
    {
      icon: Star,
      title: 'Индивидуальный подход',
      description: 'Разрабатываем решения под конкретные задачи клиента, включая нестандартные размеры и конфигурации',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: CheckCircle,
      title: 'Комплексная логистика',
      description: 'Доставка по РФ и РБ - от Минска до Иркутска',
      color: 'from-emerald-500 to-green-600'
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
    <section id="о-нас" className="py-12 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
            О компании Авангард
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Мы — производитель и надёжный поставщик алюминиевого профиля в России. 
            Наша задача — создавать качественные решения для современных интерьеров.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.key}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 text-center hover:scale-105 hover:shadow-2xl hover:border-cyan-400/50 transition-all duration-300 group"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent mb-1">
                  {counters[stat.key as keyof typeof counters]}{stat.suffix}
                </div>
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Company Description */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-cyan-400/30 transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-3">Наша история</h3>
              <p className="text-gray-300 leading-relaxed mb-3 text-base">
                ООО "Авангард" - дочерняя компания "Балтийского меридина", известного на северо-западе поставщика сырья для алюминиевой индустрии, было создано с целью запуска собственного производства. За годы работы мы зарекомендовали себя как надежный партнер для крупных производств и частных заказчиков.
              </p>
              <p className="text-gray-300 leading-relaxed text-base">
                Наше производство оснащено современным оборудованием, что позволяет выпускать продукцию 
                высокого качества, соответствующую всем российским и международным стандартам.
              </p>
            </div>

            <div className="bg-gradient-to-r from-sky-600/10 to-blue-700/10 rounded-xl p-4 border border-sky-600/30">
              <h4 className="text-xl font-semibold text-sky-500 mb-2">Наши принципы</h4>
              <ul className="space-y-1 text-gray-300 text-base">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-sky-500 flex-shrink-0" />
                  <span>Качество превыше всего</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-sky-500 flex-shrink-0" />
                  <span>Индивидуальный подход к каждому клиенту</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-sky-500 flex-shrink-0" />
                  <span>Постоянное развитие и инновации</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Side - Interactive Advantages */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white text-center mb-6">Наши преимущества</h3>
            
            {/* Advantage Cards */}
            <div className="space-y-3">
              {advantages.map((advantage, index) => {
                const Icon = advantage.icon;
                const isActive = index === activeAdvantage;
                
                return (
                  <div
                    key={index}
                    className={`relative overflow-hidden rounded-lg border transition-all duration-500 cursor-pointer ${
                      isActive 
                        ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-sky-600 scale-105' 
                        : 'bg-gradient-to-br from-gray-800/30 to-gray-900/30 border-gray-700 hover:border-gray-600'
                    }`}
                    onClick={() => setActiveAdvantage(index)}
                  >
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${advantage.color} opacity-0 transition-opacity duration-500 ${
                      isActive ? 'opacity-10' : ''
                    }`}></div>
                    
                    <div className="relative p-4">
                      <div className="flex items-start space-x-4">
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isActive 
                            ? 'bg-gradient-to-r from-sky-600 to-blue-700 text-white scale-110' 
                            : 'bg-gray-700 text-sky-500'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        
                        <div className="flex-1">
                          <h4 className={`text-lg font-semibold mb-1 transition-colors duration-300 ${
                            isActive ? 'text-sky-500' : 'text-white'
                          }`}>
                            {advantage.title}
                          </h4>
                          
                          <div className={`overflow-hidden transition-all duration-500 ${
                            isActive ? 'max-h-16 opacity-100' : 'max-h-0 opacity-0'
                          }`}>
                            <p className="text-gray-300 text-sm leading-relaxed">
                              {advantage.description}
                            </p>
                          </div>
                        </div>
                        
                        <ArrowRight className={`w-4 h-4 transition-all duration-300 ${
                          isActive 
                            ? 'text-sky-500 translate-x-1' 
                            : 'text-gray-500'
                        }`} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Progress Indicators */}
            <div className="flex justify-center space-x-2 mt-4">
              {advantages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveAdvantage(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeAdvantage 
                      ? 'bg-gradient-to-r from-sky-600 to-blue-700 scale-125' 
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