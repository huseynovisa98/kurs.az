import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle2, Clock } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setIsSubmitted(true);
  };

  return (
    <section id="elaqe" className="py-14 bg-[#F7F8FC] border-t border-[#E6EAF0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact details */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="text-xs font-bold text-[#315EFB] uppercase tracking-wider mb-1">
                Bizimlə Əlaqə
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#182230] tracking-tight">
                KURS.AZ Komandası ilə Əlaqə Saxlayın
              </h2>
              <p className="text-sm text-[#667085] mt-2 leading-relaxed">
                Platformada elan yerləşdirmək, VIP xidmətlər və ya texniki dəstək üçün bizə müraciət edin.
              </p>
            </div>

            <div className="space-y-3.5">
              <a 
                href="tel:+994125550000"
                className="flex items-center gap-3.5 p-3.5 bg-white rounded-xl border border-[#E6EAF0] hover:border-slate-300 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#F1F4FF] text-[#315EFB] flex items-center justify-center shrink-0 group-hover:bg-[#315EFB] group-hover:text-white transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-[#667085]">Qaynar Xətt</div>
                  <div className="text-sm font-bold text-[#182230]">(012) 555-00-00 / (050) 200-11-22</div>
                </div>
              </a>

              <a 
                href="https://wa.me/994502001122" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-3.5 bg-white rounded-xl border border-[#E6EAF0] hover:border-slate-300 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-[#667085]">WhatsApp Dəstək</div>
                  <div className="text-sm font-bold text-[#182230]">+994 50 200 11 22</div>
                </div>
              </a>

              <a 
                href="mailto:info@kurs.az"
                className="flex items-center gap-3.5 p-3.5 bg-white rounded-xl border border-[#E6EAF0] hover:border-slate-300 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#F1F4FF] text-[#315EFB] flex items-center justify-center shrink-0 group-hover:bg-[#315EFB] group-hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-[#667085]">Elektron Poçt</div>
                  <div className="text-sm font-bold text-[#182230]">info@kurs.az / reklam@kurs.az</div>
                </div>
              </a>

              <div className="flex items-center gap-3.5 p-3.5 bg-white rounded-xl border border-[#E6EAF0]">
                <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-[#667085]">Baş Ofis</div>
                  <div className="text-xs font-medium text-[#182230]">Bakı ş., Nizami küç. 142, AF Business House, 5-ci mərtəbə</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact & Ad Inquiry Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#E6EAF0] shadow-sm">
            <h3 className="text-lg font-bold text-[#182230] mb-2">
              Təklif və ya Əməkdaşlıq Müraciəti
            </h3>
            <p className="text-xs text-[#667085] mb-6">
              Tədris mərkəzinizin elanlarını portalda xüsusi şərtlərlə yerləşdirmək və ya sual vermək üçün formanı doldurun.
            </p>

            {isSubmitted ? (
              <div className="py-10 text-center space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-[#182230]">Müraciətiniz qəbul olundu!</h4>
                <p className="text-xs text-[#667085] max-w-sm mx-auto">
                  Əməkdaşlarımız ən qısa zamanda sizinlə əlaqə saxlayacaqlar. Təşəkkür edirik!
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-3 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-xs font-semibold rounded-lg text-[#182230]"
                >
                  Yeni mesaj göndər
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#182230]">Ad və Soyadınız *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Məs: Əli Əliyev"
                      className="w-full px-3 py-2.5 text-xs rounded-xl border border-[#E6EAF0] outline-none focus:border-[#315EFB]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#182230]">Əlaqə Nömrəsi *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+994 50 000 00 00"
                      className="w-full px-3 py-2.5 text-xs rounded-xl border border-[#E6EAF0] outline-none focus:border-[#315EFB]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#182230]">E-poçt ünvanı</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@mail.az"
                    className="w-full px-3 py-2.5 text-xs rounded-xl border border-[#E6EAF0] outline-none focus:border-[#315EFB]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#182230]">Müraciətinizin mətni *</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Kurs elanlarının yerləşdirilməsi, VIP paketlər və ya digər sualınız..."
                    className="w-full px-3 py-2.5 text-xs rounded-xl border border-[#E6EAF0] outline-none focus:border-[#315EFB] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#315EFB] hover:bg-[#254edb] active:scale-[0.99] text-white font-semibold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Mesajı Göndər</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
