import React, { useEffect, useRef, useState } from 'react';
import { Recycle, Factory, Flame, Palette, Package, ArrowDown, CircleCheck as CheckCircle } from 'lucide-react';

const ProductionCycleSection: React.FC = () => {
  const [visibleStages, setVisibleStages] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  const stages = [
    {
      id: 1,
      title: 'Скупка алюминиевых отходов',
      description: 'Мы закупаем алюминиевые отходы у крупных производственных предприятий, обеспечивая экологически ответственный подход к использованию вторичного сырья.',
      icon: Recycle,
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 2,
      title: 'Переработка в сырьё',
      description: 'На современном оборудовании отходы проходят процесс очистки, сортировки и переплавки, превращаясь в качественное алюминиевое сырьё для дальнейшего производства.',
      icon: Factory,
      color: 'from-blue-500 to-cyan-600'
    },
    {
      id: 3,
      title: 'Экструзия и обработка',
      description: 'Алюминиевое сырьё проходит через процесс экструзии, где формируются профили нужной геометрии. Затем следует термообработка для придания необходимых прочностных характеристик и точная резка в размер.',
      icon: Flame,
      color: 'from-orange-500 to-red-600'
    },
    {
      id: 4,
      title: 'Защитно-декоративное покрытие',
      description: 'Профили получают финишную отделку: порошковую покраску для прочного цветного покрытия, анодирование для защиты от коррозии, сублимацию для имитации различных текстур или ламинацию для дополнительной эстетики.',
      icon: Palette,
      color: 'from-purple-500 to-pink-600',
      subItems: ['Порошковая покраска', 'Анодирование', 'Сублимация', 'Ламинация']
    },
    {
      id: 5,
      title: 'Упаковка и отгрузка',
      description: 'Готовая продукция проходит контроль качества, упаковывается с соблюдением всех стандартов безопасности и отправляется клиентам по всей России.',
      icon: Package,
      color: 'from-yellow-500 to-amber-600'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stageId = parseInt(entry.target.getAttribute('data-stage-id') || '0');
            setVisibleStages((prev) => {
              if (!prev.includes(stageId)) {
                return [...prev, stageId].sort();
              }
              return prev;
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    const stages = sectionRef.current?.querySelectorAll('.stage-card');
    stages?.forEach((stage) => observer.observe(stage));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-[#1A1A1A] to-[#0A0A0A]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Цикл производства
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Полный производственный цикл от переработки вторичного сырья до готовой продукции
          </p>
        </div>

        <div className="max-w-5xl mx-auto relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-400 via-orange-500 to-yellow-400 opacity-20 hidden md:block"></div>

          {stages.map((stage, index) => {
            const Icon = stage.icon;
            const isVisible = visibleStages.includes(stage.id);
            const isEven = index % 2 === 0;

            return (
              <div key={stage.id} className="relative mb-12 lg:mb-20">
                {/* Stage Card */}
                <div
                  data-stage-id={stage.id}
                  className={`stage-card flex flex-col lg:flex-row items-center gap-8 transition-all duration-700 transform ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-10'
                  } ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Content Card */}
                  <div className={`flex-1 ${isEven ? 'lg:text-right' : 'lg:text-left'}`}>
                    <div className="bg-[#3A3A3A] rounded-xl p-6 lg:p-8 shadow-2xl hover:shadow-yellow-400/20 transition-all duration-300 hover:scale-[1.02] border border-gray-700 hover:border-yellow-400/50">
                      <div className={`flex items-center gap-3 mb-4 ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
                        <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br ${stage.color} flex items-center justify-center shadow-lg`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl lg:text-2xl font-bold text-white">
                          {stage.title}
                        </h3>
                      </div>

                      <p className="text-gray-300 leading-relaxed mb-4">
                        {stage.description}
                      </p>

                      {stage.subItems && (
                        <div className={`flex flex-wrap gap-2 mt-4 ${isEven ? 'lg:justify-end' : 'lg:justify-start'}`}>
                          {stage.subItems.map((item, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 border border-yellow-500/30"
                            >
                              <CheckCircle className="w-3 h-3 mr-1" />
                              {item}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Stage Number Circle (Center) */}
                  <div className="relative flex-shrink-0 z-10">
                    <div className={`w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br ${stage.color} flex items-center justify-center shadow-2xl border-4 border-[#1A1A1A] transition-all duration-500 ${
                      isVisible ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
                    }`}>
                      <span className="text-2xl lg:text-3xl font-bold text-white">
                        {stage.id}
                      </span>
                    </div>
                  </div>

                  {/* Spacer for alignment */}
                  <div className="flex-1 hidden lg:block"></div>
                </div>

                {/* Arrow Between Stages */}
                {index < stages.length - 1 && (
                  <div className={`flex justify-center my-6 lg:my-8 transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}>
                    <div className="flex flex-col items-center">
                      <ArrowDown className="w-8 h-8 text-yellow-400 animate-bounce" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-block bg-gradient-to-r from-yellow-400/10 to-orange-500/10 rounded-2xl p-8 border border-yellow-400/30">
            <h3 className="text-2xl font-bold text-white mb-3">
              Полный контроль качества на каждом этапе
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Современное оборудование и многолетний опыт позволяют нам гарантировать высочайшее качество продукции
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">15+</div>
                <div className="text-sm text-gray-400">лет на рынке</div>
              </div>
              <div className="w-px bg-gray-700 mx-2"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">1000+</div>
                <div className="text-sm text-gray-400">тонн в месяц</div>
              </div>
              <div className="w-px bg-gray-700 mx-2"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">100%</div>
                <div className="text-sm text-gray-400">контроль качества</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductionCycleSection;
