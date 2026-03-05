import React from 'react';
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';
import {YMaps, Map, Placemark} from '@pbe/react-yandex-maps';

const ContactSection: React.FC = () => {
  const contacts = [
    {
      icon: MapPin,
      title: 'Адрес офиса',
      primary: 'г. Санкт-Петербург, пер. Челиева, 17, офис 208',
      secondary: 'Пн-Пт: 9:00-18:00',
      color: 'text-yellow-400'
    },
    {
      icon: Phone,
      title: 'Телефон',
      primary: '+7 (981) 746-73-30',
      secondary: 'Пн-Пт: 9:00-20:00',
      color: 'text-yellow-400'
    },
    {
      icon: Mail,
      title: 'Email',
      primary: 'avan-team@mail.ru',
      secondary: 'Отдел продаж',
      color: 'text-yellow-400'
    }
  ];

  return (
    <section id="contacts" className="py-20 bg-[#1A1A1A]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Контакты
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Свяжитесь с нами удобным для вас способом или посетите наш офис
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {contacts.map((contact, index) => {
            const Icon = contact.icon;
            return (
              <div
                key={index}
                className="bg-[#3A3A3A] rounded-lg p-6 text-center hover:bg-gray-750 transition-all duration-300 hover:scale-105 border border-gray-700 hover:border-yellow-400/50 group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1A1A1A] rounded-full mb-4 group-hover:bg-yellow-400 transition-colors duration-300">
                  <Icon className={`w-8 h-8 ${contact.color} group-hover:text-black transition-colors duration-300`} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                  {contact.title}
                </h3>
                <p className="text-gray-300 font-medium mb-1">
                  {contact.primary}
                </p>
                <p className="text-gray-400 text-sm flex items-center justify-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{contact.secondary}</span>
                </p>
              </div>
            );
          })}
        </div>

        {/* Map Section */}
        <div className="bg-[#3A3A3A] rounded-lg overflow-hidden shadow-2xl">
          <YMaps>
            <Map
                defaultState={{center: [59.888848, 30.482479], zoom: 17}}
                className="h-[400px] overflow-hidden"
            >
              <Placemark
                  key={`office`}
                  geometry={[59.888848, 30.482479]}
                  options={{
                    preset: 'islands#darkBlueIcon',

                  }}
                  properties={{
                    iconCaption: 'пер. Челиева, 17, офис 208',
                  }}
              />
            </Map>
          </YMaps>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;