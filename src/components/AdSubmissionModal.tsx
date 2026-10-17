import React, { useState } from 'react';
import { 
  X, 
  CheckCircle, 
  Sparkles, 
  Plus, 
  ArrowRight, 
  ArrowLeft, 
  Upload, 
  Check, 
  HelpCircle,
  Building,
  Phone,
  DollarSign,
  FileText
} from 'lucide-react';
import { Course, Category } from '../types';
import { BAKU_METRO_STATIONS, CITIES, COURSE_IT_IMAGE, COURSE_LANG_IMAGE, COURSE_BUSINESS_IMAGE, HERO_IMAGE } from '../data/mockData';

interface AdSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  onCourseCreated: (newCourse: Course) => void;
}

export const AdSubmissionModal: React.FC<AdSubmissionModalProps> = ({
  isOpen,
  onClose,
  categories,
  onCourseCreated,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdCourse, setCreatedCourse] = useState<Course | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [categorySlug, setCategorySlug] = useState(categories[0]?.slug || '');
  const [subcategory, setSubcategory] = useState('');
  const [format, setFormat] = useState<'inperson' | 'online' | 'hybrid'>('inperson');
  const [city, setCity] = useState('Bakı');
  const [metro, setMetro] = useState('28 May');

  const [price, setPrice] = useState('150');
  const [priceType, setPriceType] = useState<'aylıq' | 'ümumi' | 'dərs başı'>('aylıq');
  const [duration, setDuration] = useState('3 ay (36 saat)');
  const [schedule, setSchedule] = useState('Həftədə 3 dəfə, 1.5 saat');
  const [certificateProvided, setCertificateProvided] = useState(true);
  const [freeTrial, setFreeTrial] = useState(true);

  const [providerName, setProviderName] = useState('');
  const [phone, setPhone] = useState('+994 50 ');
  const [whatsapp, setWhatsapp] = useState('99450');
  const [address, setAddress] = useState('');
  const [instructorName, setInstructorName] = useState('');

  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [outlineItems, setOutlineItems] = useState<string>('Giriş və ilkin anlayışlar\nPraktiki çalışmalar və tapşırıqlar\nReal keyslər üzərində iş\nYekun diplom layihəsi');

  // Ad Package
  const [packageType, setPackageType] = useState<'free' | 'vip' | 'premium'>('free');

  const currentCategory = categories.find((c) => c.slug === categorySlug) || categories[0];

  const handleNext = () => {
    if (step === 1) {
      if (!title.trim()) {
        alert('Zəhmət olmasa kursun adını qeyd edin.');
        return;
      }
    }
    if (step === 2) {
      if (!price) {
        alert('Zəhmət olmasa qiyməti qeyd edin.');
        return;
      }
    }
    if (step === 3) {
      if (!providerName.trim() || !phone.trim()) {
        alert('Zəhmət olmasa mərkəz adını və əlaqə nömrəsini daxil edin.');
        return;
      }
    }
    setStep((prev) => (prev + 1) as any);
  };

  const handleBack = () => {
    setStep((prev) => (prev - 1) as any);
  };

  const handleSubmitAd = (e: React.FormEvent) => {
    e.preventDefault();

    const outlineArray = outlineItems
      .split('\n')
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    const isVip = packageType === 'vip' || packageType === 'premium';

    const newCourseObj: Course = {
      id: `c-user-${Date.now()}`,
      title: title.trim(),
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: currentCategory.name,
      categorySlug: currentCategory.slug,
      subcategory: subcategory.trim() || currentCategory.subcategories[0] || 'Ümumi',
      price: Number(price) || 0,
      priceType,
      isVip,
      isPremium: packageType === 'premium',
      format,
      city,
      metro: format !== 'online' ? metro : undefined,
      providerName: providerName.trim() || 'Fərdi Təlimçi',
      phone: phone.trim(),
      whatsapp: whatsapp.replace(/\+/g, '').replace(/\s+/g, ''),
      address: address.trim() || (format === 'online' ? 'Onlayn Tədris Platforması' : 'Bakı şəhəri'),
      shortDescription: shortDescription.trim() || `${title} üzrə peşəkar tədris kursu. Praktiki dərslər və zəmanətli nəticə.`,
      fullDescription: fullDescription.trim() || `${title} təlimi nəzəri və praktiki modullardan ibarətdir. Kurs müddətində tələbələrə bütün materiallar təqdim olunur.`,
      outline: outlineArray.length > 0 ? outlineArray : ['İlkin nəzəri biliklər', 'Praktiki məşğələlər', 'Yekun qiymətləndirmə'],
      duration,
      schedule,
      certificateProvided,
      level: 'Bütün səviyyələr',
      image: categorySlug.includes('it')
        ? COURSE_IT_IMAGE
        : categorySlug.includes('dil')
        ? COURSE_LANG_IMAGE
        : categorySlug.includes('biznes') || categorySlug.includes('komp')
        ? COURSE_BUSINESS_IMAGE
        : HERO_IMAGE,
      viewsCount: 1,
      createdAt: new Date().toISOString().split('T')[0],
      instructorName: instructorName.trim() || undefined,
      freeTrial,
    };

    onCourseCreated(newCourseObj);
    setCreatedCourse(newCourseObj);
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white w-full max-w-2xl rounded-2xl sm:rounded-3xl shadow-2xl border border-[#E6EAF0] overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E6EAF0] bg-slate-50">
          <div>
            <h2 className="font-extrabold text-base text-[#182230]">
              Yeni Kurs Elanı Yerləşdir
            </h2>
            <span className="text-xs text-[#667085]">
              KURS.AZ platformasında elanınızı minlərlə tələbəyə çatdırın
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Steps indicator */}
        {!isSuccess && (
          <div className="grid grid-cols-4 border-b border-[#E6EAF0] text-center text-xs font-semibold py-2.5 px-4 bg-white">
            <span className={step >= 1 ? 'text-[#315EFB]' : 'text-[#667085]'}>1. Əsas</span>
            <span className={step >= 2 ? 'text-[#315EFB]' : 'text-[#667085]'}>2. Qiymət</span>
            <span className={step >= 3 ? 'text-[#315EFB]' : 'text-[#667085]'}>3. Əlaqə</span>
            <span className={step >= 4 ? 'text-[#315EFB]' : 'text-[#667085]'}>4. Paket</span>
          </div>
        )}

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 flex-1">
          {isSuccess ? (
            /* Success Screen */
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-[#12A875]/10 text-[#12A875] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-[#182230]">
                  Elanınız Uğurla Dərc Edildi!
                </h3>
                <p className="text-xs text-[#667085] max-w-md mx-auto">
                  Elanınız dərhal KURS.AZ kataloquna əlavə edildi və aktiv status aldı. Tələbələr artıq elanınızı görə və sizinlə əlaqə saxlaya bilərlər.
                </p>
              </div>

              {createdCourse && (
                <div className="p-4 bg-[#F7F8FC] rounded-xl border border-[#E6EAF0] max-w-md mx-auto text-left text-xs space-y-1.5">
                  <div className="font-bold text-[#182230]">{createdCourse.title}</div>
                  <div className="text-[#667085]">{createdCourse.category} · {createdCourse.price} ₼ / {createdCourse.priceType}</div>
                  <div className="text-[#315EFB] font-semibold">{createdCourse.providerName}</div>
                </div>
              )}

              <div className="pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#315EFB] hover:bg-[#254edb] text-white text-xs font-semibold rounded-xl shadow-sm transition-colors cursor-pointer"
                >
                  Kataloqa qayıt
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitAd} className="space-y-4">
              
              {/* Step 1: Əsas Məlumatlar */}
              {step === 1 && (
                <div className="space-y-3.5">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#182230]">
                      Kursun tam adı *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Məs: Praktiki Python və Data Science Kursu"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#E6EAF0] focus:border-[#315EFB] outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#182230]">Kateqoriya *</label>
                      <select
                        value={categorySlug}
                        onChange={(e) => setCategorySlug(e.target.value)}
                        className="w-full p-2 text-xs rounded-xl border border-[#E6EAF0] focus:border-[#315EFB] outline-none"
                      >
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.slug}>{cat.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#182230]">İxtisas / Alt sahə</label>
                      <input
                        type="text"
                        placeholder="Məs: Web Development"
                        value={subcategory}
                        onChange={(e) => setSubcategory(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[#E6EAF0] focus:border-[#315EFB] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#182230]">Tədris Forması</label>
                      <select
                        value={format}
                        onChange={(e) => setFormat(e.target.value as any)}
                        className="w-full p-2 text-xs rounded-xl border border-[#E6EAF0] focus:border-[#315EFB] outline-none"
                      >
                        <option value="inperson">Əyani</option>
                        <option value="online">Online</option>
                        <option value="hybrid">Hibrid</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#182230]">Şəhər</label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full p-2 text-xs rounded-xl border border-[#E6EAF0] focus:border-[#315EFB] outline-none"
                      >
                        {CITIES.filter((c) => c !== 'Bütün şəhərlər').map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#182230]">Metro (Əyani üçün)</label>
                      <select
                        disabled={format === 'online'}
                        value={metro}
                        onChange={(e) => setMetro(e.target.value)}
                        className="w-full p-2 text-xs rounded-xl border border-[#E6EAF0] focus:border-[#315EFB] outline-none disabled:bg-slate-100"
                      >
                        {BAKU_METRO_STATIONS.filter((m) => m !== 'Bütün stansiyalar').map((m) => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Qiymət və Qrafik */}
              {step === 2 && (
                <div className="space-y-3.5">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#182230]">Qiymət (AZN ₼) *</label>
                      <input
                        type="number"
                        required
                        min="0"
                        placeholder="Məs: 150"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[#E6EAF0] focus:border-[#315EFB] outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#182230]">Ödəniş dövrü</label>
                      <select
                        value={priceType}
                        onChange={(e) => setPriceType(e.target.value as any)}
                        className="w-full p-2 text-xs rounded-xl border border-[#E6EAF0] focus:border-[#315EFB] outline-none"
                      >
                        <option value="aylıq">Aylıq</option>
                        <option value="ümumi">Bütün kurs üçün</option>
                        <option value="dərs başı">Dərs başı</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#182230]">Kursun müddəti</label>
                      <input
                        type="text"
                        placeholder="Məs: 3 ay və ya 48 saat"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[#E6EAF0] focus:border-[#315EFB] outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#182230]">Həftəlik qrafik</label>
                      <input
                        type="text"
                        placeholder="Məs: Həftədə 3 dəfə, 1.5 saat"
                        value={schedule}
                        onChange={(e) => setSchedule(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[#E6EAF0] focus:border-[#315EFB] outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-6 pt-2">
                    <label className="flex items-center gap-2 text-xs font-semibold text-[#182230] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={certificateProvided}
                        onChange={(e) => setCertificateProvided(e.target.checked)}
                        className="w-4 h-4 rounded text-[#315EFB]"
                      />
                      <span>Sertifikat verilir</span>
                    </label>

                    <label className="flex items-center gap-2 text-xs font-semibold text-[#182230] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={freeTrial}
                        onChange={(e) => setFreeTrial(e.target.checked)}
                        className="w-4 h-4 rounded text-[#315EFB]"
                      />
                      <span>İlk sınaq dərsi pulsuzdur</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Step 3: Tədris Mərkəzi və Əlaqə */}
              {step === 3 && (
                <div className="space-y-3.5">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#182230]">Tədris Mərkəzi / Şirkət *</label>
                      <input
                        type="text"
                        required
                        placeholder="Məs: Matrix Tədris Mərkəzi"
                        value={providerName}
                        onChange={(e) => setProviderName(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[#E6EAF0] focus:border-[#315EFB] outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#182230]">Təlimçi / Müəllim</label>
                      <input
                        type="text"
                        placeholder="Məs: Rəşad Quliyev"
                        value={instructorName}
                        onChange={(e) => setInstructorName(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[#E6EAF0] focus:border-[#315EFB] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#182230]">Əlaqə Telefonu *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+994 50 123 45 67"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[#E6EAF0] focus:border-[#315EFB] outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#182230]">WhatsApp Nömrəsi</label>
                      <input
                        type="text"
                        placeholder="994501234567"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[#E6EAF0] focus:border-[#315EFB] outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#182230]">Ünvan</label>
                    <input
                      type="text"
                      placeholder="Məs: Nizami küç. 142, AF Business House"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#E6EAF0] focus:border-[#315EFB] outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#182230]">Kursun qısa təsviri</label>
                    <textarea
                      rows={2}
                      placeholder="Kurs haqqında 1-2 cümləlik qısa xülasə..."
                      value={shortDescription}
                      onChange={(e) => setShortDescription(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#E6EAF0] focus:border-[#315EFB] outline-none resize-none"
                    />
                  </div>
                </div>
              )}

              {/* Step 4: Paket Seçimi */}
              {step === 4 && (
                <div className="space-y-4">
                  <div className="text-xs font-bold text-[#182230]">
                    Elanınız üçün yerləşdirmə paketini seçin:
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    
                    {/* Free Plan */}
                    <div 
                      onClick={() => setPackageType('free')}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        packageType === 'free' 
                          ? 'border-[#315EFB] bg-blue-50/20 ring-2 ring-[#315EFB]/15' 
                          : 'border-[#E6EAF0] hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-xs text-[#182230]">Sadə Elan</span>
                        <span className="text-xs font-bold text-[#12A875]">0 ₼</span>
                      </div>
                      <p className="text-[11px] text-[#667085] leading-relaxed">
                        Ümumi kataloqda 30 gün pulsuz aktiv qalır.
                      </p>
                    </div>

                    {/* VIP Plan */}
                    <div 
                      onClick={() => setPackageType('vip')}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        packageType === 'vip' 
                          ? 'border-[#315EFB] bg-[#F1F4FF] ring-2 ring-[#315EFB]/20' 
                          : 'border-[#E6EAF0] hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-xs text-[#315EFB] flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5" /> VIP Elan
                        </span>
                        <span className="text-xs font-bold text-[#315EFB]">15 ₼</span>
                      </div>
                      <p className="text-[11px] text-[#667085] leading-relaxed">
                        Əsas səhifədə VIP bölməsində xüsusi vurğu ilə önə çıxarılır.
                      </p>
                    </div>

                    {/* Premium Plan */}
                    <div 
                      onClick={() => setPackageType('premium')}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        packageType === 'premium' 
                          ? 'border-[#7457E8] bg-purple-50/40 ring-2 ring-[#7457E8]/20' 
                          : 'border-[#E6EAF0] hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-xs text-[#7457E8] flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5" /> Premium
                        </span>
                        <span className="text-xs font-bold text-[#7457E8]">29 ₼</span>
                      </div>
                      <p className="text-[11px] text-[#667085] leading-relaxed">
                        Ən yuxarı sıralama, sosial media paylaşımı və WhatsApp birbaşa düyməsi.
                      </p>
                    </div>

                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-[#E6EAF0] text-xs text-[#667085] flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#12A875] shrink-0" />
                    <span>Dərc edildikdən sonra elanınız dərhal axtarış bazasında aktiv olacaq.</span>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="pt-4 border-t border-[#E6EAF0] flex items-center justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-4 py-2 text-xs font-semibold rounded-xl border border-[#E6EAF0] text-[#475467] hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    Geri
                  </button>
                ) : (
                  <div />
                )}

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-5 py-2 text-xs font-semibold rounded-xl bg-[#315EFB] hover:bg-[#254edb] text-white transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Növbəti</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-6 py-2.5 text-xs font-bold rounded-xl bg-[#12A875] hover:bg-[#0e8a5f] text-white transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
                  >
                    <Check className="w-4 h-4 stroke-[2.5]" />
                    <span>Elanı dərhal dərc et</span>
                  </button>
                )}
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
