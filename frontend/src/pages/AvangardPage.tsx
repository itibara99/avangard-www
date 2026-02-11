import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Menu, 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  ChevronRight,
  Building2,
  Recycle,
  Users,
  Award,
  Wrench,
  Palette,
  Sparkles,
  Layers,
  Shield,
  ArrowRight,
  Star,
  Zap,
  Target,
  TrendingUp,
  CheckCircle,
} from 'lucide-react';
import AboutSection from '../components/avangard/AboutSection.tsx';
import CookieConsent from '../components/CookieConsent';
import potolkiBg from '../assets/ceiling.jpg';
import potolkiProfile from '../assets/ceiling.jpg';
import obshestroy from '../assets/obshestroy.jpg';
import konvektory from '../assets/konvektory.jpg';
import konstrukt from '../assets/konstrukt.jpg';
import gryaz from '../assets/gryaz.jpg';
import lameli from '../assets/lameli.jpg';
import chert from '../assets/chert.jpg';
import logo1 from '../assets/logo1.png';
import dekor from '../assets/dekor.jpg';
import reklamny from '../assets/reklamny.jpg';
import oknadveri from '../assets/okna-dveri.jpg';
import vent from '../assets/vent.jpg';
import sun from '../assets/sun.jpg';
import dorogi from '../assets/dorogi.jpg';
import santeh from '../assets/santeh.jpg';
import fasad from '../assets/fasad.jpg';
import ventfasad from '../assets/ventfasad.jpg';
import lodki from '../assets/lodki.jpg';
import pool from '../assets/pool.jpg';
import pergol from '../assets/pergol.jpg';
import porogi from '../assets/porogi.jpg';
import lestnici from '../assets/lestnici.jpg';
import dush from '../assets/dush.jpg';
import lift from '../assets/lift.jpg';
import auto from '../assets/auto.jpg';
import borti from '../assets/borti.jpg';
import shkafi from '../assets/shkafi.jpg';
import teplici from '../assets/teplici.jpg';
import electro from '../assets/electro.jpg';
import radiator from '../assets/radiator.jpg';
import moskit from '../assets/moskit.jpg';
import zhaluzi from '../assets/zhaluzi.jpg';

import {YMaps, Map, Placemark} from '@pbe/react-yandex-maps';

// Импорты изображений для каталога (замените на фактические пути к вашим изображениям)
const catalogImages = {
  chert: chert, // Замените на фактический путь
  potolki: potolkiProfile, // Используем существующее изображение как пример
  obschestroitelny: obshestroy,
  konvektory: konvektory,
  dekorativny: dekor, // Замените на фактический путь
  konstrukcionny: konstrukt,
  reklamny: reklamny, // Замените на фактический путь
  gryazezaschitny: gryaz, // Замените на фактический путь
  lameli: lameli, // Замените на фактический путь
  ventFasady: ventfasad, // Замените на фактический путь
  oknadveri: oknadveri,
  vent: vent,
  sun: sun,
  stanki: konstrukt,
  dorogi: dorogi,
  santeh: santeh,
  fasad: fasad,
  fasadstoyki: fasad,
  ventfasad: ventfasad,
  lodki: lodki,
  pool: pool,
  pergol: pergol,
  lestnici: lestnici,
  dush: dush,
  lift: lift,
  porogi: porogi,
  auto: auto,
  borti: borti,
 // torgovo: torgovo,
  shkafi: shkafi,
  zhaluzi: zhaluzi,
  teplici: teplici,
  electro: electro,
  radiator: radiator,
  moskit: moskit,
};

function AvangardPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(false)
  const [scrollY, setScrollY] = useState(0);
  // const [activeSection, setActiveSection] = useState('главная');
  const [activeCatalogItem, setActiveCatalogItem] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [selectedScrapType, setSelectedScrapType] = useState('profile-clean');
  const [scrapWeight, setScrapWeight] = useState<number>(0);

  // Цены на алюминиевый лом (руб/кг)
  const scrapPrices = {
    'profile-clean': 185, // чистый профиль
    'sheet': 175, // ал. лист
    'chips': 120, // ал. стружка
    'radiators': 160, // ал. радиаторы
    'cans': 140, // ал. банки
    'food': 190, // пищевой
    'mix': 130, // смесь
    'amg': 140, // производственные отходы
    'disks': 145, // диски
    'electrotech': 195, // Электротех
    'plates': 148, // номера
    'typograph_sheets': 175, // типографические листы
    'chips_d16': 90 // стружка д16/16т
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post("/new_contact", formData)
    alert('Спасибо за обращение! Мы свяжемся с вами в ближайшее время.');
    setFormData({ name: '', phone: '', email: '', message: '' });
  };

  const handleScrapTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedScrapType(e.target.value);
  };

  const handleScrapWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const weight = parseFloat(e.target.value) || 0;
    setScrapWeight(weight);
  };

  const getEstimatedPrice = (): number => {
    if (!selectedScrapType || scrapWeight <= 0) return 0;
    const pricePerKg = scrapPrices[selectedScrapType as keyof typeof scrapPrices] || 0;
    return Math.round(pricePerKg * scrapWeight);
  };

  const formatPrice = (price: number): string => {
    return price.toLocaleString('ru-RU');
  };

  const catalogItems = [
    { 
      title: 'По Вашим чертежам', 
      description: 'Освоение матрицы по чертежам заказчика',
      color: 'from-blue-600 to-cyan-500',
      image: catalogImages.chert,
      features: ['Эксклюзивность матрицы', 'Возмещение стоимости матрицы'],
      pdfPath: '/pdfs/chert.pdf'
    },
    { 
      title: 'Для натяжных потолков', 
      description: 'Специализированные профили для идеального натяжения потолочных конструкций',
      color: 'from-blue-600 to-cyan-500',
      image: catalogImages.potolki,
      features: ['Сплав 6063', 'Точная геометрия', 'Различные размеры', 'Быстрая установка'],
      pdfPath: '/pdfs/potolki.pdf'
    },
    { 
      title: 'Общестроительный', 
      description: 'Универсальные профили для строительных и архитектурных решений. Трубы, уголки, швеллеры, тавры, двутавры.',
      color: 'from-purple-600 to-pink-500',
      image: catalogImages.obschestroitelny,
      features: ['Высокая прочность', 'Коррозионная стойкость', 'Легкий вес', 'Долговечность'],
      pdfPath: '/pdfs/obshestroy.pdf'
    },
    { 
      title: 'Для конвекторных решеток', 
      description: 'Специальные профили для алюминиевых декоративно-защитных решеток внутрипольных конвекторов',
      color: 'from-orange-600 to-red-500',
      image: catalogImages.konvektory,
      features: ['Анодированное покрытие', 'Теплостойкость', 'Эстетичный вид', 'Простой монтаж'],
      pdfPath: '/pdfs/konvektory.pdf'
    },
    { 
      title: 'Конструкционный', 
      description: 'Надежные компоненты для сборки модульных конструкций',
      color: 'from-indigo-600 to-blue-500',
      image: catalogImages.konstrukcionny,
      features: ['Высокие нагрузки', 'Точность изготовления', 'Модульность', 'Надежность'],
      pdfPath: '/pdfs/konstrukt.pdf'
    },
    { 
      title: 'Декоративно-отделочный', 
      description: 'Эстетические решения для современного интерьера и экстерьера',
      color: 'from-green-600 to-emerald-500',
      image: catalogImages.dekorativny,
      features: ['Различные покрытия', 'Цветовая гамма', 'Текстуры', 'Индивидуальный дизайн'],
      pdfPath: '/pdfs/dekor.pdf'
    },
    { 
      title: 'Рекламный', 
      description: 'Профили для рекламных конструкций и наружной рекламы',
      color: 'from-yellow-600 to-orange-500',
      image: catalogImages.reklamny,
      features: ['Легкость конструкции', 'Погодостойкость', 'Простая сборка', 'Универсальность'],
      pdfPath: '/pdfs/reklami.pdf'
    },
    { 
      title: 'Ламели', 
      description: 'Декоративные и функциональные ламели для современной архитектуры',
      color: 'from-teal-600 to-cyan-500',
      image: catalogImages.lameli,
      features: ['Вентиляция', 'Солнцезащита', 'Эстетика', 'Функциональность'],
      pdfPath: '/pdfs/lameli.pdf'
    },
    { 
      title: 'Грязезащитный', 
      description: 'Защитные системы для входных групп и общественных зданий',
      color: 'from-gray-600 to-slate-500',
      image: catalogImages.gryazezaschitny,
      features: ['Износостойкость', 'Легкая очистка', 'Антискольжение', 'Долговечность'],
      pdfPath: '/pdfs/gryaz.pdf'
    },
    { 
      title: 'Для окон и дверей', 
      description: 'Компоненты для современных оконных и дверных систем.',
      color: 'from-gray-600 to-slate-500',
      image: catalogImages.oknadveri,
      features: ['Терморазрыв', 'Высокая герметичность', 'Прочность', 'Совместимость со стеклопакетами'],
      pdfPath: '/pdfs/okna-dveri.pdf'
    },
    { 
      title: 'Вентиляционный', 
      description: 'Профили для монтажа и обрамления вентиляционных систем, решеток и воздуховодов.',
      color: 'from-gray-600 to-slate-500',
      image: catalogImages.vent,
      features: ['Легкий вес', 'Коррозионная стойкость', 'Простота монтажа', 'Эстетичный вид'],
      pdfPath: '/pdfs/vent.pdf'
     },
     { 
      title: 'Для солнечных панелей', 
      description: 'Прочные и легкие каркасы для надежной фиксации фотогальванических панелей.',
      color: 'from-gray-600 to-slate-500',
      image: catalogImages.sun,
      features: ['Атмосферостойкость', 'Высокая несущая способность', 'Легкий монтаж', 'Долговечность'],
      pdfPath: '/pdfs/solar.pdf'
    },
    { 
      title: 'Для конвейеров и станков',
      description: 'Конструкционные компоненты для сборки рам станков, конвейерных линий и производственного оборудования.',
      color: 'from-gray-600 to-slate-500',
      image: catalogImages.stanki,
      features: ['Жесткость', 'Стабильность геометрии', 'Износостойкость', 'Высокие нагрузки'],
      pdfPath: '/pdfs/stanki.pdf'
    },
    { 
      title: 'Для дорожных ограждений', 
      description: 'Элементы для сборки защитных ограждений, перил и барьерных систем.',
      color: 'from-gray-600 to-slate-500',
      image: catalogImages.dorogi,
      features: ['Ударопрочность', 'Антикоррозийное покрытие', 'Простота сборки', 'Стойкость к вибрациям'],
      pdfPath: '/pdfs/dorogi.pdf'
    },
    { 
      title: 'Сантехнические перегородки', 
      description: 'Профильные системы для быстрого монтажа сантехнических кабин и душевых зон.',
      color: 'from-gray-600 to-slate-500',
      image: catalogImages.santeh,
      features: ['Влагостойкость', 'Гигиеничность', 'Прочность', 'Современный дизайн'],
      pdfPath: '/pdfs/santeh.pdf'
    },
    { 
      title: 'Для фасадов', 
      description: 'Элементы для создания декоративных фасадных систем и архитектурных решений.',
      color: 'from-gray-600 to-slate-500',
      image: catalogImages.fasad,
      features: ['Погодоустойчивость', 'Эстетика', 'Легкость', 'Разнообразие покрытий'],
      pdfPath: '/pdfs/fasad.pdf'
    },
    { 
      title: 'Фасадные стойки', 
      description: 'Вертикальные несущие профили для остекления и структурных фасадных систем.',
      color: 'from-gray-600 to-slate-500',
      image: catalogImages.fasadstoyki,
      features: ['Высокая прочность', 'Точность', 'Визуальная легкость', 'Долговечность'],
      pdfPath: '/pdfs/fasad-stoyki.pdf'
    },
    { 
      title: 'Для вентилируемых фасадов', 
      description: 'Несущие подсистемы для монтажа навесных вентилируемых фасадов.',
      color: 'from-gray-600 to-slate-500',
      image: catalogImages.ventfasad,
      features: ['Несущая способность', 'Коррозионная стойкость', 'Система вентиляции', 'Точность размеров'],
      pdfPath: '/pdfs/vent-fasad.pdf'
    },
    { 
      title: 'Для лодок', 
      description: 'Специализированные профили для судостроения и отделки морского транспорта.',
      color: 'from-gray-600 to-slate-500',
      image: catalogImages.lodki,
      features: ['Стойкость к морской воде', 'Прочность', 'Легкий вес', 'Антикоррозийная защита'],
      pdfPath: '/pdfs/lodki.pdf'
    },
    { 
      title: 'Для бассейнов', 
      description: 'Элементы для обрамления чаш бассейнов, монтажа противотоков и отделки.',
      color: 'from-gray-600 to-slate-500',
      image: catalogImages.pool,
      features: ['Водостойкость', 'Стойкость к химикатам', 'Безопасность', 'Декоративность'],
      pdfPath: '/pdfs/pool.pdf'
    },
    { 
      title: 'Перголы', 
      description: 'Алюминиевые балки и элементы для строительства пергол, навесов и маркиз.',
      color: 'from-gray-600 to-slate-500',
      image: catalogImages.pergol,
      features: ['Атмосферостойкость', 'Прочность', 'Элегантный дизайн', 'Минимальное обслуживание'],
      pdfPath: '/pdfs/pergol.pdf'
    },
    { 
      title: 'Для лестниц', 
      description: 'Компоненты для создания каркасов, перил и ограждений лестничных конструкций.',
      color: 'from-gray-600 to-slate-500',
      image: catalogImages.lestnici,
      features: ['Высокая нагрузка', 'Безопасность', 'Четкая геометрия', 'Различные покрытия'],
      pdfPath: '/pdfs/lestnici.pdf'
    },
    { 
      title: 'Для душевых кабин', 
      description: 'Профили для сборки душевых ограждений, поддонов и систем раздвижных дверей.',
      color: 'from-gray-600 to-slate-500',
      image: catalogImages.dush,
      features: ['Влагостойкость', 'Гигиеничность', 'Простота ухода', 'Современный вид'],
      pdfPath: '/pdfs/dush.pdf'
    },
    { 
      title: 'Для лифтов', 
      description: 'Конструкционные и декоративные элементы для отделки лифтовых кабин и шахт.',
      color: 'from-gray-600 to-slate-500',
      image: catalogImages.lift,
      features: ['Износостойкость', 'Надежность', 'Эстетика', 'Соответствие стандартам'],
      pdfPath: '/pdfs/lift.pdf'
    },
    { 
      title: 'Для порогов', 
      description: 'Функциональные и декоративные пороги для стыков между помещениями.',
      color: 'from-gray-600 to-slate-500',
      image: catalogImages.porogi,
      features: ['Износостойкость', 'Маскировка стыков', 'Антискольжение', 'Легкий монтаж'],
      pdfPath: '/pdfs/porogi.pdf'
    },
    { 
      title: 'Автомобильный', 
      description: 'Профили для кузовных элементов и внешних багажников.',
      color: 'from-gray-600 to-slate-500',
      image: catalogImages.auto,
      features: ['Легкий вес', 'Вибрационная стойкость', 'Декоративное покрытие', 'Прочность'],
      pdfPath: '/pdfs/auto.pdf'
    },
    { 
      title: 'Для грузовых бортов', 
      description: 'Усиленные элементы для изготовления и ремонта кузовов грузовых автомобилей.',
      color: 'from-gray-600 to-slate-500',
      image: catalogImages.borti,
      features: ['Высокая прочность', 'Ударопрочность', 'Стойкость к коррозии', 'Ремонтопригодность'],
      pdfPath: '/pdfs/borti.pdf'
    },
    { 
      title: 'Торгово-выставочный', 
      description: 'Профильные системы для быстрой сборки стендов, витрин и торгового оборудования.',
      color: 'from-gray-600 to-slate-500',
      image: catalogImages.shkafi,
      features: ['Легкость сборки', 'Модульность', 'Эстетика', 'Многоразовое использование'],
      pdfPath: '/pdfs/torgovo.pdf'
    },
    { 
      title: 'Для шкафов купе',
      description: 'Каркасы и направляющие для сборки встроенных и корпусных шкафов-купе.',
      color: 'from-gray-600 to-slate-500',
      image: catalogImages.shkafi,
      features: ['Жесткость', 'Точность', 'Гладкость хода', 'Разнообразие цветов'],
      pdfPath: '/pdfs/shkafi.pdf'
    },
    { 
      title: 'Жалюзи-карнизы', 
      description: 'Профили-карнизы для скрытого монтажа рулонных штор, жалюзи и кардин.',
      color: 'from-gray-600 to-slate-500',
      image: catalogImages.zhaluzi,
      features: [ 'Аккуратный вид', 'Легкость', 'Простота установки'],
      pdfPath: '/pdfs/zhaluzi.pdf'
    },
    { 
      title: 'Для теплиц', 
      description: 'Легкие и прочные каркасы для сборки парников и тепличных конструкций.',
      color: 'from-gray-600 to-slate-500',
      image: catalogImages.teplici,
      features: ['Стойкость к влаге', 'Не подвержен гниению', 'Легкий монтаж', 'Долговечность'],
      pdfPath: '/pdfs/teplici.pdf'
    },
    { 
      title: 'Электротехнический', 
      description: 'Шинопроводы, короба и монтажные профили для электротехнических шкафов.',
      color: 'from-gray-600 to-slate-500',
      image: catalogImages.electro,
      features: ['Не поддерживает горение', 'Электробезопасность', 'Жесткость', 'Точность'],
      pdfPath: '/pdfs/electro.pdf'
    },
    { 
      title: 'Для радиаторов охлаждения', 
      description: 'Профили для изготовления теплообменников и радиаторов охлаждения.',
      color: 'from-gray-600 to-slate-500',
      image: catalogImages.radiator,
      features: ['Высокая теплопроводность', 'Точные каналы', 'Коррозионная стойкость', 'Надежность'],
      pdfPath: '/pdfs/radiator.pdf'
    },
    { 
      title: 'Для москитных сеток', 
      description: 'Рамочные профили для изготовления оконных и дверных противомоскитных сеток.',
      color: 'from-gray-600 to-slate-500',
      image: catalogImages.moskit,
      features: ['Легкий вес', 'Прочность', 'Коррозионная стойкость', 'Простота сборки'],
      pdfPath: '/pdfs/moskit.pdf'
    }
  ];

  const activeCatalogItemData = catalogItems[activeCatalogItem];

  const services = [
    { 
      title: 'Переработка', 
      description: 'Превращаем алюминиевый лом в высококачественное сырье с использованием передовых технологий', 
      icon: Recycle,
      features: ['Экологичный процесс', 'Высокая степень очистки', 'Контроль качества']
    },
    { 
      title: 'Порошковая покраска', 
      description: 'Создаем прочное защитно-декоративное покрытие любых цветов и текстур', 
      icon: Palette,
      features: ['200+ цветов RAL', 'Устойчивость к УФ', 'Антикоррозийная защита']
    },
    { 
      title: 'Анодирование', 
      description: 'Электрохимическая обработка для создания защитного оксидного слоя', 
      icon: Sparkles,
      features: ['Увеличение твердости', 'Коррозионная стойкость', 'Декоративный эффект']
    },
    { 
      title: 'Сублимация', 
      description: 'Термоперенос высококачественных изображений и текстур на металлическую поверхность', 
      icon: Layers,
      features: ['Фотореалистичность', 'Стойкость к истиранию', 'Любые дизайны']
    },
    { 
      title: 'Ламинация', 
      description: 'Нанесение защитной декоративной пленки для дополнительной защиты и эстетики', 
      icon: Shield,
      features: ['Защита от царапин', 'Имитация текстур', 'Легкий уход']
    }
  ];

  const stats = [
    { number: '15+', label: 'лет опыта', icon: Award },
    { number: '100+', label: 'довольных клиентов', icon: Users },
    { number: '3000+', label: 'тонн переработано', icon: Recycle },
    { number: '10000+', label: 'видов профиля', icon: Building2 }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <CookieConsent />
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-blue-900"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-700 rounded-full mix-blend-multiply filter blur-xl opacity-10"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-indigo-700 rounded-full mix-blend-multiply filter blur-xl opacity-10"></div>
          <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-emerald-700 rounded-full mix-blend-multiply filter blur-xl opacity-10"></div>
        </div>
      </div>

      {/* Header */}
      <header className={`fixed w-full z-50 transition-all duration-500 ${
        scrollY > 50 
          ? 'bg-black/90 backdrop-blur-xl border-b border-gray-800/50 shadow-2xl' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3 group">
              <div className="relative">
                <img 
                  src={logo1} 
                  alt="ООО Авангард" 
                  className="h-10 w-10 object-contain group-hover:scale-110 transition-all duration-300" 
                />
                <div className="absolute inset-0 bg-cyan-400 rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-gray-100 to-sky-300 bg-clip-text text-transparent">
                  ООО "Авангард"
                </span>
                <div className="text-xs text-gray-400 font-medium">САНКТ-ПЕТЕРБУРГ</div>
              </div>
            </div>
            
            <nav className="hidden lg:flex space-x-8">
              {['Главная', 'Каталог', 'Скупка лома', 'О нас', 'Услуги', 'Контакты'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="relative text-gray-300 hover:text-white transition-all duration-300 group py-2"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-sky-500 to-blue-600 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </nav>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden relative z-10 p-2 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-700/50 transition-all duration-300"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-gray-800/50">
            <nav className="px-4 py-6 space-y-4">
              {['Главная', 'Каталог', 'Скупка лома', 'О нас', 'Услуги', 'Контакты'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="block text-gray-300 hover:text-white py-3 px-4 rounded-lg hover:bg-gray-800/50 transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="главная" className="relative min-h-screen flex items-center justify-center pt-20 pb-32">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-sky-600/10 to-blue-700/10 backdrop-blur-sm border border-sky-600/20 rounded-full px-6 py-2 text-sm font-medium text-sky-400">
                <Star className="h-4 w-4" />
                <span>Высокое качество с 2008 года</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 bg-clip-text text-transparent">
                  Профиль - это
                </span>
                <br />
                <span className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700 bg-clip-text text-transparent">
                 наш профиль
                </span>
                <br />
                <span className="text-white/90 text-4xl md:text-5xl lg:text-6xl">
                  
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                  
                <span className="text-sky-400 font-semibold"> Качественно. Надежно. </span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button className="group relative overflow-hidden bg-gradient-to-r from-sky-600 to-blue-700
              hover:from-sky-500 hover:to-blue-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg
              transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-700/20"
                      onClick={() => document
                          .getElementById("каталог")?.scrollIntoView({behavior: "smooth"})}
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Посмотреть каталог</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              {/*<button className="group relative overflow-hidden border-2 border-gray-600 hover:border-sky-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:bg-sky-500/10 backdrop-blur-sm">*/}
              {/*  <span className="flex items-center space-x-2">*/}
              {/*    <Play className="h-5 w-5" />*/}
              {/*    <span>Смотреть видео</span>*/}
              {/*  </span>*/}
              {/*</button>*/}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="relative inline-flex items-center justify-center w-16 h-16 mb-4 mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-sky-600 to-blue-700 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                    <stat.icon className="h-8 w-8 text-gray-100 relative z-10" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-gray-400 text-sm uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-sky-500 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Popular Section */}
      <section id="популярное" className="relative py-12 bg-black">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-600/10 to-orange-700/10 backdrop-blur-sm border border-amber-600/20 rounded-full px-6 py-2 text-sm font-medium text-amber-400 mb-6">
              <Star className="h-4 w-4" />
              <span>Хит продаж</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">
                Популярное
              </span>
            </h2>
          </div>
          
          <div className="relative overflow-hidden rounded-3xl bg-black backdrop-blur-sm border border-cyan-500/30 min-h-[500px] flex items-end">
            {/* Background Image Overlay */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
              style={{
                backgroundImage: `url(${potolkiBg})`
              }}
            ></div>

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>

            {/* Content */}
            <div className="relative z-10 w-full px-8 md:px-16 py-12 pb-16">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 bg-clip-text text-transparent">
                    Профиль для
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700 bg-clip-text text-transparent">
                    натяжных потолков
                  </span>
                </h2>
                
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Самый востребованный продукт нашего производства. Высококачественный алюминиевый профиль 
                  для натяжных потолков.
                </p>
                
                <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-sky-500" />
                    <span className="text-gray-300">Сплав АД31</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-sky-500" />
                    <span className="text-gray-300">ГОСТ качество</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-sky-500" />
                    <span className="text-gray-300">Крупные объёмы заказов</span>
                  </div>
                </div>
                
                <a href={"/ceiling"}>
                  <button className="group relative overflow-hidden bg-gradient-to-r from-sky-600 to-blue-700
                hover:from-sky-500 hover:to-blue-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg
                transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-700/20"
                  >
                  <span className="relative z-10 flex items-center space-x-2">
                    <span>Перейти к продукту</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </a>

              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute top-8 right-8 w-32 h-32 border border-sky-600/30 rounded-full opacity-20"></div>
            <div className="absolute bottom-8 right-16 w-20 h-20 border border-blue-700/30 rounded-full opacity-30"></div>
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section id="каталог" className="relative py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-600/10 to-purple-700/10 backdrop-blur-sm border border-indigo-600/20 rounded-full px-6 py-2 text-sm font-medium text-indigo-400 mb-6">
              <Building2 className="h-4 w-4" />
              <span>Полный спектр решений</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Каталог продукции
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Алюминиевые профили для любых задач — от строительства до производства станков ЧПУ.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50
          rounded-3xl flex flex-col lg:flex-row gap-0 overflow-x-hidden">
            {/* Левая навигация */}
            <div className="lg:w-1/3 space-y-0 h-[586px] overflow-y-auto pr-2 scrollbar-thin">
              {catalogItems.map((item, index) => (
                  <button
                      key={index}
                      onClick={() => setActiveCatalogItem(index)}
                      className={`w-full text-left p-6 transition-all duration-300 group ${
                          index < catalogItems.length - 1 ? 'border-b border-gray-700/50' : ''
                      } ${
                          index === activeCatalogItem
                              ? 'bg-gradient-to-r from-sky-600/20 to-blue-700/20 text-white shadow-lg shadow-blue-700/20'
                              : 'bg-transparent hover:bg-gray-700/50 text-gray-300 hover:text-white'
                      } ${
                          index === 0 ? 'rounded-tl-3xl' : ''
                      } ${
                          index === catalogItems.length - 1 ? 'rounded-bl-3xl' : ''
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3
                            className={`font-bold text-lg mb-2 transition-colors duration-300 ${
                                index === activeCatalogItem ? 'text-sky-400' : 'group-hover:text-sky-500'
                            }`}
                        >
                          {item.title}
                        </h3>
                      </div>
                      <ChevronRight
                          className={`h-5 w-5 transition-all duration-300 ${
                              index === activeCatalogItem
                                  ? 'text-sky-500 translate-x-1'
                                  : 'text-gray-500 group-hover:text-sky-500 group-hover:translate-x-1'
                          }`}
                      />
                    </div>
                  </button>
              ))}
            </div>

            {/* Правая детальная панель */}
            <div className="lg:w-2/3 relative h-[586px] overflow-y-auto pr-2 scrollbar-thin">
              <div className="p-8 h-full relative overflow-hidden">
                {/* Фоновое изображение */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-20 transition-all duration-500"
                  style={{ backgroundImage: `url(${activeCatalogItemData.image})` }}
                />
                
                {/* Градиентный оверлей */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-transparent to-black/40" />
                
                {/* Декоративные элементы */}
                <div className={`absolute top-8 right-8 w-32 h-32 bg-gradient-to-r ${activeCatalogItemData.color} opacity-10 rounded-full blur-2xl`} />
                <div className={`absolute bottom-8 left-8 w-24 h-24 bg-gradient-to-r ${activeCatalogItemData.color} opacity-15 rounded-full blur-xl`} />
                
                {/* Контент */}
                <div className="relative z-10 h-full flex flex-col justify-center">
                  {/* Категория */}
                  <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-sky-600 to-blue-700 rounded-full text-sm font-semibold text-white mb-6 w-fit">
                    <Building2 className="w-4 h-4 mr-2" />
                    Алюминиевый профиль
                  </div>
                  
                  {/* Заголовок */}
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                    {activeCatalogItemData.title}
                  </h3>
                  
                  {/* Описание */}
                  <p className="text-base text-gray-300 mb-6 leading-relaxed max-w-2xl">
                    {activeCatalogItemData.description}
                  </p>
                  
                  {/* Особенности */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                    {activeCatalogItemData.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="p-1.5 bg-gradient-to-r from-sky-600/20 to-blue-700/20 rounded-lg">
                          <CheckCircle className="w-4 h-4 text-sky-500" />
                        </div>
                        <span className="text-gray-300 font-medium text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Кнопки действий */}
                  <div className="flex flex-col sm:flex-row gap-4">

                    {
                      activeCatalogItemData.title != "По Вашим чертежам" &&
                        <button className="group relative overflow-hidden bg-gradient-to-r from-sky-600 to-blue-700
                        text-white px-6 py-3 rounded-xl font-semibold text-base transition-all duration-300 transform
                        hover:scale-105 hover:shadow-2xl"
                                onClick={() => window.open(activeCatalogItemData.pdfPath, "_blank")}
                        >
                          <div
                              rel="noopener noreferrer"
                              className="relative z-10 flex items-center space-x-2 text-white no-underline"
                          >
                            <span>Подробнее о продукте</span>
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>
                    }

                    <button className="group relative overflow-hidden border-2 border-gray-600 hover:border-sky-500
                    text-white px-6 py-3 rounded-xl font-semibold text-base transition-all duration-300
                    hover:bg-sky-500/10 backdrop-blur-sm"
                            onClick={() => document
                                .getElementById('обратная-связь')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      <span className="flex items-center space-x-2">
                        <Phone className="h-4 w-4" />
                        <span>
                          Получить консультацию
                        </span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scrap Collection Section */}
      <section id="скупка-лома" className="relative py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-600/10 to-teal-700/10 backdrop-blur-sm border border-emerald-600/20 rounded-full px-6 py-2 text-sm font-medium text-emerald-400 mb-6">
                  <Recycle className="h-4 w-4" />
                  <span>Экологичная переработка</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                    Скупка
                  </span>
                  <br />
                  <span className="text-white">алюминиевого лома</span>
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Превращаем отходы в ценное сырье. Высокие цены, быстрая оценка, 
                  экологичная переработка — ваш вклад в устойчивое будущее.
                </p>
              </div>
              
              <div className="space-y-6">
                {[
                  { icon: TrendingUp, title: 'Высокие цены', desc: 'Лучшие условия на рынке СПб' },
                  { icon: Zap, title: 'Быстрая оценка', desc: 'Расчет стоимости за 5 минут' },
                  { icon: Target, title: 'Любые объемы', desc: 'От 100 кг до промышленных партий' },
                  { icon: CheckCircle, title: 'Честные весы', desc: 'Сертифицированное оборудование' }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 group">
                    <div className="flex-shrink-0 p-3 bg-gradient-to-br from-emerald-600/20 to-teal-700/20 rounded-2xl group-hover:from-emerald-600/30 group-hover:to-teal-700/30 transition-all duration-300">
                      <item.icon className="h-6 w-6 text-emerald-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                      <p className="text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl">
                <h3 className="text-2xl font-bold mb-8 text-center">
                  <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                    Калькулятор стоимости
                  </span>
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-3 text-gray-300">Тип алюминиевого лома</label>
                    <select 
                      value={selectedScrapType}
                      onChange={handleScrapTypeChange}
                      className="w-full bg-gray-700/50 border border-gray-600/50 rounded-xl px-4 py-4 focus:ring-2
                      focus:ring-emerald-600 focus:border-transparent transition-all duration-300 text-white"
                    >
                      <option value="profile-clean">Алюминиевый профиль (чистый) - {scrapPrices['profile-clean']} ₽/кг</option>
                      <option value="sheet">Алюминиевый лист - {scrapPrices.sheet} ₽/кг</option>
                      <option value="typograph_sheets">
                        Типографические листы - {scrapPrices.typograph_sheets} ₽/кг
                      </option>
                      <option value="chips">Алюминиевая стружка - {scrapPrices.chips} ₽/кг</option>
                      <option value="chips_d16">Стружка д16/16т - {scrapPrices.chips_d16} ₽/кг</option>
                      <option value="radiators">Радиаторы алюминиевые - {scrapPrices.radiators} ₽/кг</option>
                      <option value="cans">Банки алюминиевые - {scrapPrices.cans} ₽/кг</option>
                      <option value="food">Пищевой алюминий - {scrapPrices.food} ₽/кг</option>
                      <option value="mix">Смесь - {scrapPrices.mix} ₽/кг</option>
                      <option value="amg">Производственные отходы - {scrapPrices.amg} ₽/кг</option>
                      <option value="disks">Диски - {scrapPrices.disks} ₽/кг</option>
                      <option value="electrotech">Электротехнический алюминий - {scrapPrices.electrotech} ₽/кг</option>
                      <option value="plates">Номера - {scrapPrices.plates} ₽/кг</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-3 text-gray-300">Вес (кг)</label>
                    <input
                      type="number"
                      value={scrapWeight || ''}
                      onChange={handleScrapWeightChange}
                      min="0"
                      step="0.1"
                      className="w-full bg-gray-700/50 border border-gray-600/50 rounded-xl px-4 py-4 focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all duration-300 text-white"
                      placeholder="Введите вес лома"
                    />
                  </div>
                  
                  <div className="bg-gradient-to-r from-emerald-600/10 to-teal-700/10 border border-emerald-600/20 rounded-xl p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Примерная стоимость:</span>
                      <span className="text-2xl font-bold text-emerald-500">{formatPrice(getEstimatedPrice())} ₽</span>
                    </div>
                    {scrapWeight > 0 && (
                      <div className="mt-2 text-sm text-gray-400">
                        {scrapWeight} кг × {scrapPrices[selectedScrapType as keyof typeof scrapPrices]} ₽/кг
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-gradient-to-r from-sky-600/10 to-blue-700/10 border border-sky-600/20 rounded-xl p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-300 mb-2">Хотите узнать точную стоимость?</p>
                      <button className="bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600
                      text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                              onClick={() => document
                                  .getElementById('обратная-связь')?.scrollIntoView({ behavior: 'smooth' })}>
                        Связаться с нами
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500 text-center">
                    * Цены указаны ориентировочно и могут изменяться в зависимости от качества лома и рыночных условий
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <AboutSection />

      {/* News Section */}
      {/*<NewsSection />*/}

      {/* Services Section */}
      <section id="услуги" className="py-8 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-sky-600/5 to-blue-700/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-indigo-600/5 to-purple-700/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-sky-600/10 to-blue-700/10 backdrop-blur-sm border border-sky-600/20 rounded-full px-6 py-2 text-sm font-medium text-sky-500 mb-6">
              <Wrench className="h-4 w-4" />
              <span>Наши услуги</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Услуги по обработке металла
              </span>
            </h2>
            
            <p className="text-base text-gray-400 max-w-3xl mx-auto">
              От консультации до поставки - обеспечиваем комплексное решение ваших задач
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 hover:scale-105 hover:shadow-2xl hover:border-sky-600/30 transition-all duration-500"
                >
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r from-sky-600 to-blue-700 rounded-2xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-5 w-5 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-sky-300 transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-300 leading-relaxed mb-3 text-sm">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-1 mb-3">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2 text-xs text-gray-400">
                        <CheckCircle className="h-3 w-3 text-sky-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-sky-600/5 to-blue-700/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                </div>
              );
            })}
          </div>

          {/* CTA Section */}
          
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="обратная-связь" className="relative py-20 bg-gradient-to-b from-black to-gray-900" hidden={false}>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-sky-600/10 to-blue-700/10 backdrop-blur-sm border border-sky-600/20 rounded-full px-6 py-2 text-sm font-medium text-sky-400 mb-6">
              <Mail className="h-4 w-4" />
              <span>Свяжитесь с нами</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
                Обратная связь
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              Готовы обсудить ваш проект и предложить оптимальные решения
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">Имя *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-700/50 border border-gray-600/50 rounded-xl px-4 py-4 focus:ring-2 focus:ring-sky-600 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400"
                  placeholder="Ваше имя"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300">Телефон *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-700/50 border border-gray-600/50 rounded-xl px-4 py-4 focus:ring-2 focus:ring-sky-600 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400"
                  placeholder="+7 (999) 123-45-67"
                />
              </div>
            </div>
            <div className="mt-6 space-y-2">
              <label htmlFor="message" className="block text-sm font-medium text-gray-300">Сообщение *</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                required
                className="w-full bg-gray-700/50 border border-gray-600/50 rounded-xl px-4 py-4 focus:ring-2 focus:ring-sky-600 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400 resize-none"
                placeholder="Расскажите о ваших потребностях, объемах, сроках..."
              />
            </div>
            <div style={{alignItems: "end"}}>
              <input type={"checkbox"} id={'conf'} style={{padding: 0}}
                     onChange={e => setIsPrivacyChecked(e.target.checked)}
              />
              <label htmlFor={"conf"} className="text-gray-300 text-sm font-medium mb-2 ml-2">
                Я согласен с <a
                  href={"/politika.pdf"}
                  target={"_blank"}
                  style={{color: "#0ea5e9", textDecoration: "underline"}}>
                политикой конфиденциальности
              </a>
              </label>
            </div>
            <button
              type="submit"
              disabled={!isPrivacyChecked}
              className="mt-8 w-full group relative overflow-hidden bg-gradient-to-r from-sky-600 to-blue-700
              hover:from-sky-500 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:none
              text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300"
            >
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <span>Отправить сообщение</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
          </form>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="контакты" className="relative py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-600/10 to-teal-700/10 backdrop-blur-sm border border-emerald-600/20 rounded-full px-6 py-2 text-sm font-medium text-emerald-400 mb-6">
              <MapPin className="h-4 w-4" />
              <span>Наши контакты</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Контакты
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              ООО "Авангард" в самом сердце промышленного Санкт-Петербурга
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              {[
                {
                  icon: MapPin,
                  title: 'Адрес производства',
                  content: '193232, г. Санкт-петербург, переулок Челиева, 17',
                  color: 'from-sky-600 to-blue-700'
                },
                {
                  icon: Phone,
                  title: 'Телефоны',
                  content: '+7 (981) 746-73-30 — отдел продаж\n+7 (999) 215-47-92 — приемка лома\n+7 (999) 535-15-89 — отдел продаж',
                  color: 'from-emerald-600 to-teal-700'
                },
                {
                  icon: Mail,
                  title: 'Email',
                  content: 'avan-team@mail.ru — все вопросы',
                  color: 'from-indigo-600 to-purple-700'
                }
              ].map((contact, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 transition-all duration-500 hover:scale-105"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${contact.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  <div className="relative z-10 flex items-start space-x-6">
                    <div className={`p-4 bg-gradient-to-br ${contact.color} bg-opacity-20 rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
                      <contact.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-3">{contact.title}</h3>
                      <p className="text-gray-300 leading-relaxed whitespace-pre-line">{contact.content}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-br from-amber-600/20 to-orange-700/20 rounded-xl">
                    <Award className="h-6 w-6 text-amber-500" />
                  </div>
                  <span>Режим работы</span>
                </h3>
                <div className="space-y-4">
                  {[
                    { days: 'Понедельник - Пятница', hours: '09:00 - 18:00', note: 'Основное время' },
                    { days: 'Суббота', hours: 'Выходной', note: 'Аварийные заявки' },
                    { days: 'Воскресенье', hours: 'Выходной', note: 'Аварийные заявки' }
                  ].map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-700/30 last:border-b-0">
                      <div>
                        <div className="text-white font-medium">{schedule.days}</div>
                        <div className="text-gray-400 text-sm">{schedule.note}</div>
                      </div>
                      <div className="text-sky-500 font-semibold">{schedule.hours}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border
              border-gray-700/50 rounded-3xl h-full min-h-[600px] flex flex-col items-center justify-center overflow-hidden">
                <YMaps>
                  <Map
                      defaultState={{center: [59.888848, 30.482479], zoom: 17}}
                      className={"h-full w-full"}
                  >
                    <Placemark
                        key={`office`}
                        geometry={[59.888848, 30.482479]}
                        options={{
                          preset: 'islands#darkBlueIcon',

                        }}
                        properties={{
                          iconCaption: 'пер. Челиева, 17',
                        }}
                    />
                  </Map>
                </YMaps>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-black border-t border-gray-800/50">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative">
                  <Building2 className="h-10 w-10 text-sky-400" />
                  <div className="absolute inset-0 bg-sky-400 rounded-full blur-lg opacity-20"></div>
                </div>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-gray-100 to-sky-300 bg-clip-text text-transparent">
                    ООО "Авангард"
                  </span>
                  <div className="text-xs text-gray-400 font-medium">САНКТ-ПЕТЕРБУРГ</div>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
                Производитель и надежный поставщик алюминиевого профиля в России.
              </p>
              <div className="flex space-x-4">
                {['VK', 'TG', 'WA'].map((social) => (
                  <div key={social} className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center hover:from-sky-600 hover:to-blue-700 transition-all duration-300 cursor-pointer">
                    <span className="text-white text-sm font-bold">{social}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-white mb-6">Продукция</h3>
              <ul className="space-y-3">
                {['Профиль для натяжных потолков', 'Общестроительный', 'Декоративно-отделочный', 'Конструкционный', 'Рекламный профиль'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-sky-500 transition-colors duration-300 text-sm">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-white mb-6">Контакты</h3>
              <div className="space-y-3 text-sm">
                <div className="text-gray-400">
                  <div className="text-sky-500 font-medium">Телефон:</div>
                  +7 (981) 746-73-30
                </div>
                <div className="text-gray-400">
                  <div className="text-sky-500 font-medium">Email:</div>
                  avan-team@mail.ru
                </div>
                <div className="text-gray-400">
                  <div className="text-sky-500 font-medium">Адрес:</div>
                  СПб, переулок Челиева 17
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800/50 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-sm">
                &copy; 2025 ООО "Авангард". Все права защищены.
              </p>
              <div className="flex space-x-6 text-sm">
                <a onClick={() => window.open("/politika.pdf", "_blank")}
                   className="text-gray-400 hover:text-sky-500 transition-colors duration-300">
                  Политика конфиденциальности
                </a>

                <a onClick={() => window.open("/soglasie-na-obrabotky.pdf", "_blank")}
                   className="text-gray-400 hover:text-sky-500 transition-colors duration-300">
                  Согласие на обработку персональных данных
                </a>

                <a onClick={() => window.open("/cookie.pdf", "_blank")}
                   className="text-gray-400 hover:text-sky-500 transition-colors duration-300">
                  Политика файлов cookies
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AvangardPage;