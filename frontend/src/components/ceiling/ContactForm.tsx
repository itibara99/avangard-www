import React, { useState } from 'react';
import { Send, User, Phone, MessageSquare } from 'lucide-react';
import axios from 'axios';
import { useYandexMetrica } from '../../hooks/useYandexMetrica';

const ContactForm: React.FC = () => {
  const { trackGoal } = useYandexMetrica();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    comment: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(false)
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    try {
      // Prepare data for insertion
      const contactData = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        comment: formData.comment.trim() || null
      };

      await axios.post(
          "/new_contact_roof",
          contactData);

      setIsSubmitting(false);
      setIsSubmitted(true);

      trackGoal('contact_form_ceiling', {
        page: 'ceiling',
        name: formData.name,
      });

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', phone: '', comment: '' });
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.name.trim() && formData.phone.trim();

  return (
    <section id="contact-form" className="py-20 bg-[#3A3A3A]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="bg-[#1A1A1A] rounded-lg p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Связаться с нами
              </h2>
              <p className="text-gray-300">
                Оставьте заявку, и наши специалисты свяжутся с вами в ближайшее время
              </p>
            </div>

            {error && (
              <div className="mb-6">
                <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
                  <h3 className="text-red-400 font-semibold text-sm mb-2">Ошибка отправки</h3>
                  <p className="text-gray-300 text-sm">{error}</p>
                  {error.includes('environment variables') && (
                    <p className="text-gray-400 text-xs mt-2">
                      Убедитесь, что файл .env содержит VITE_SUPABASE_URL и VITE_SUPABASE_ANON_KEY
                    </p>
                  )}
                </div>
              </div>
            )}

            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-6">
                  <div className="text-green-400 text-4xl mb-4">✓</div>
                  <h3 className="text-green-400 font-semibold text-lg mb-2">Заявка отправлена!</h3>
                  <p className="text-gray-300 text-sm">Мы свяжемся с вами в ближайшее время</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">
                    Ваше имя*
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Иван Иванов"
                      required
                      className="w-full pl-12 pr-4 py-3 bg-[#3A3A3A] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Phone Field */}
                <div>
                  <label htmlFor="phone" className="block text-gray-300 text-sm font-medium mb-2">
                    Телефон*
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+7 (___) ___-__-__"
                      required
                      className="w-full pl-12 pr-4 py-3 bg-[#3A3A3A] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Comment Field */}
                <div>
                  <label htmlFor="comment" className="block text-gray-300 text-sm font-medium mb-2">
                    Комментарий
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                    <textarea
                      id="comment"
                      name="comment"
                      value={formData.comment}
                      onChange={handleChange}
                      placeholder="Опишите ваш запрос..."
                      rows={4}
                      className="w-full pl-12 pr-4 py-3 bg-[#3A3A3A] border border-gray-700 rounded-lg text-white
                      placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400
                      focus:border-transparent transition-all duration-200 resize-none"
                    />
                  </div>
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

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!isFormValid || isSubmitting || !isPrivacyChecked}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-semibold py-3 px-6 rounded-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-lg flex items-center justify-center space-x-2 group"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                      <span>Отправляем...</span>
                    </>
                  ) : (
                    <>
                      <span>Отправить заявку</span>
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;