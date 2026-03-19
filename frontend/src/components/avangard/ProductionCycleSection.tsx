import React from 'react';
import { Recycle, Factory, Flame, Palette, Package, ArrowRight, CircleCheck as CheckCircle } from 'lucide-react';

const ProductionCycleSection = () => {
  const productionStages = [
    {
      number: '01',
      title: 'Скупка алюминиевых отходов',
      description: 'Мы закупаем алюминиевые отходы у промышленных предприятий по конкурентным ценам. Принимаем лом различных категорий: профиль, листы, стружку, радиаторы и другие виды алюминиевого сырья.',
      icon: Recycle,
      color: 'from-emerald-600 to-teal-700',
      highlights: ['Высокие цены', 'Любые объемы', 'Быстрая оценка']
    },
    {
      number: '02',
      title: 'Переработка в сырье',
      description: 'Отходы проходят тщательную сортировку, очистку и переплавку. Современное оборудование позволяет получать высококачественное вторичное сырье, не уступающее первичному алюминию по характеристикам.',
      icon: Factory,
      color: 'from-blue-600 to-cyan-700',
      highlights: ['Экологичность', 'Высокая степень очистки', 'Контроль качества']
    },
    {
      number: '03',
      title: 'Экструзия и термообработка',
      description: 'На экструзионном оборудовании формируем профили нужной геометрии. После экструзии проводим термообработку для достижения требуемых механических свойств, затем профиль режется в размер согласно заказу.',
      icon: Flame,
      color: 'from-orange-600 to-red-700',
      highlights: ['Точная геометрия', 'Сплав АД31', 'ГОСТ качество']
    },
    {
      number: '04',
      title: 'Защитно-декоративное покрытие',
      description: 'Наносим различные типы покрытий в зависимости от требований заказчика и области применения профиля.',
      icon: Palette,
      color: 'from-purple-600 to-pink-700',
      highlights: [],
      subStages: [
        { name: 'Порошковая покраска', desc: 'Прочное цветное покрытие, 200+ цветов RAL, защита от коррозии и УФ-излучения' },
        { name: 'Анодирование', desc: 'Электрохимическая обработка для создания защитного оксидного слоя, повышение твердости' },
        { name: 'Сублимация', desc: 'Термоперенос изображений с фотореалистичным качеством, имитация дерева и других текстур' },
        { name: 'Ламинация', desc: 'Нанесение защитной декоративной пленки для дополнительной защиты от царапин' }
      ]
    },
    {
      number: '05',
      title: 'Упаковка и отправка',
      description: 'Готовая продукция проходит финальный контроль качества, упаковывается с соблюдением всех норм безопасности и отправляется заказчику. Обеспечиваем надежную логистику по всей России.',
      icon: Package,
      color: 'from-sky-600 to-blue-700',
      highlights: ['Защитная упаковка', 'Быстрая доставка', 'Контроль качества']
    }
  ];

  return (
    <section id="производственный-цикл" className="relative py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/5 to-cyan-700/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-600/5 to-pink-700/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-sky-600/10 to-blue-700/10 backdrop-blur-sm border border-sky-600/20 rounded-full px-6 py-2 text-sm font-medium text-sky-400 mb-6">
            <Factory className="h-4 w-4" />
            <span>От лома до готового продукта</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Производственный цикл
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Замкнутый цикл производства: от приёмки вторсырья до выпуска готового профиля с защитным покрытием
          </p>
        </div>

        <div className="relative">
          {productionStages.map((stage, index) => {
            const StageIcon = stage.icon;
            const isEven = index % 2 === 0;

            return (
              <div key={index} className="relative mb-16 last:mb-0">
                {index < productionStages.length - 1 && (
                  <div className="absolute left-1/2 top-full transform -translate-x-1/2 w-1 h-16 bg-gradient-to-b from-sky-600/50 to-transparent hidden lg:block"></div>
                )}

                <div className={`flex flex-col lg:flex-row gap-8 items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  <div className={`flex-1 ${isEven ? 'lg:text-right' : 'lg:text-left'}`}>
                    <div className={`bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 hover:scale-105 transition-all duration-500 group ${isEven ? 'lg:mr-8' : 'lg:ml-8'}`}>
                      <div className={`flex ${isEven ? 'lg:justify-end' : 'lg:justify-start'} justify-start mb-4`}>
                        <span className={`text-6xl font-bold bg-gradient-to-r ${stage.color} bg-clip-text text-transparent opacity-50`}>
                          {stage.number}
                        </span>
                      </div>

                      <h3 className={`text-2xl md:text-3xl font-bold text-white mb-4 group-hover:bg-gradient-to-r group-hover:${stage.color} group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300`}>
                        {stage.title}
                      </h3>

                      <p className="text-gray-300 leading-relaxed mb-6">
                        {stage.description}
                      </p>

                      {stage.highlights && stage.highlights.length > 0 && (
                        <div className={`flex flex-wrap gap-3 ${isEven ? 'lg:justify-end' : 'lg:justify-start'} justify-start`}>
                          {stage.highlights.map((highlight, hIndex) => (
                            <div key={hIndex} className="flex items-center space-x-2 bg-gradient-to-r from-gray-700/50 to-gray-800/50 px-4 py-2 rounded-full">
                              <CheckCircle className={`h-4 w-4 bg-gradient-to-r ${stage.color} bg-clip-text text-transparent`} />
                              <span className="text-sm text-gray-300">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {stage.subStages && (
                        <div className="mt-6 space-y-4">
                          {stage.subStages.map((subStage, sIndex) => (
                            <div key={sIndex} className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/30">
                              <div className="flex items-start space-x-3">
                                <ArrowRight className={`h-5 w-5 mt-0.5 flex-shrink-0 bg-gradient-to-r ${stage.color} bg-clip-text text-transparent`} />
                                <div>
                                  <h4 className="text-white font-semibold mb-1">{subStage.name}</h4>
                                  <p className="text-gray-400 text-sm">{subStage.desc}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="relative flex-shrink-0">
                    <div className="relative">
                      <div className={`absolute inset-0 bg-gradient-to-r ${stage.color} opacity-20 rounded-3xl blur-2xl`}></div>
                      <div className={`relative bg-gradient-to-br ${stage.color} p-8 rounded-3xl shadow-2xl`}>
                        <StageIcon className="h-16 w-16 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 lg:block hidden"></div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-sky-600/10 to-blue-700/10 backdrop-blur-sm border border-sky-600/20 rounded-3xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Полный контроль качества на каждом этапе
            </h3>
            <p className="text-gray-300 mb-6">
              Наш замкнутый производственный цикл обеспечивает высокое качество продукции, экологичность производства и конкурентные цены для наших клиентов.
            </p>
            <button
              onClick={() => document.getElementById('обратная-связь')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative overflow-hidden bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span>Обсудить ваш заказ</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductionCycleSection;
