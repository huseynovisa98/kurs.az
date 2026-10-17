import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Clock, 
  Award, 
  Calendar, 
  Phone, 
  MessageCircle, 
  Share2, 
  CheckCircle, 
  Check, 
  Sparkles, 
  BookOpen, 
  Send,
  Building,
  UserCheck
} from 'lucide-react';
import { Course } from '../types';
import { getSafeImageUrl } from '../utils/imageUtils';

interface CourseDetailModalProps {
  course: Course | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (course: Course) => void;
  isCompared: boolean;
  onToggleCompare: (course: Course) => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  course,
  onClose,
  isFavorite,
  onToggleFavorite,
  isCompared,
  onToggleCompare,
}) => {
  if (!course) return null;

  const [copied, setCopied] = useState(false);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [inquirySuccess, setInquirySuccess] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryPhone.trim()) return;
    setInquirySuccess(true);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Salam! KURS.AZ saytında gördüyüm "${course.title}" kursu ilə maraqlanıram. Qeydiyyat və dərslərin vaxtı barədə ətraflı məlumat verə bilərsiniz?`
    );
    window.open(`https://wa.me/${course.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div 
        className="relative bg-white w-full max-w-4xl rounded-2xl sm:rounded-3xl shadow-2xl border border-[#E6EAF0] overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E6EAF0] bg-slate-50/70">
          <div className="flex items-center gap-2 text-xs text-[#667085]">
            <span className="font-semibold text-[#315EFB]">{course.category}</span>
            <span>·</span>
            <span>{course.subcategory}</span>
            {course.isVip && (
              <>
                <span>·</span>
                <span className="text-[#315EFB] font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> VIP ELAN
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition-colors"
              title="Linki kopyala"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition-colors"
              title="Bağla"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 flex-1">
          
          {/* Main Title & Provider */}
          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#182230] leading-snug">
              {course.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-[#475467]">
              <div className="flex items-center gap-1.5 font-semibold text-[#182230]">
                <Building className="w-4 h-4 text-[#315EFB]" />
                <span>{course.providerName}</span>
              </div>
              {course.metro && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>Metro: {course.metro}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <span>Ünvan: {course.address}</span>
              </div>
            </div>
          </div>

          {/* Quick Specifications Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-[#F7F8FC] p-3.5 rounded-xl border border-[#E6EAF0]">
              <span className="text-[11px] uppercase font-semibold text-[#667085] block">Aylıq Ödəniş</span>
              <span className="text-xl font-bold text-[#182230] tabular-nums mt-0.5 block">
                {course.price} <span className="text-sm font-semibold text-[#315EFB]">₼</span>
              </span>
            </div>

            <div className="bg-[#F7F8FC] p-3.5 rounded-xl border border-[#E6EAF0]">
              <span className="text-[11px] uppercase font-semibold text-[#667085] block">Tədris Müddəti</span>
              <span className="text-sm font-bold text-[#182230] mt-1 block">
                {course.duration}
              </span>
            </div>

            <div className="bg-[#F7F8FC] p-3.5 rounded-xl border border-[#E6EAF0]">
              <span className="text-[11px] uppercase font-semibold text-[#667085] block">Dərs Qrafiki</span>
              <span className="text-sm font-bold text-[#182230] mt-1 block">
                {course.schedule}
              </span>
            </div>

            <div className="bg-[#F7F8FC] p-3.5 rounded-xl border border-[#E6EAF0]">
              <span className="text-[11px] uppercase font-semibold text-[#667085] block">Sertifikat</span>
              <span className="text-sm font-bold text-[#12A875] mt-1 flex items-center gap-1">
                <Check className="w-4 h-4 stroke-[2.5]" />
                {course.certificateProvided ? 'Rəsmi Diplom' : 'Yoxdur'}
              </span>
            </div>
          </div>

          {/* 2-Column Details: Left Content, Right Inquiry Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Content Area */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Course Image Preview */}
              <div className="rounded-2xl overflow-hidden border border-[#E6EAF0] aspect-[16/9] bg-slate-100">
                {!imageError ? (
                  <img
                    src={getSafeImageUrl(course.image, course.category)}
                    alt={course.title}
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-slate-600 p-6 text-center">
                    <BookOpen className="w-10 h-10 text-[#315EFB] mb-2" />
                    <span className="font-bold text-sm text-[#182230]">{course.category}</span>
                    <span className="text-xs text-[#667085] mt-1">{course.providerName}</span>
                  </div>
                )}
              </div>

              {/* Full Description */}
              <div className="space-y-2">
                <h3 className="text-base font-bold text-[#182230] flex items-center gap-2">
                  <BookOpen className="w-4.5 h-4.5 text-[#315EFB]" />
                  <span>Kurs Haqqında Ətraflı</span>
                </h3>
                <p className="text-sm text-[#475467] leading-relaxed">
                  {course.fullDescription}
                </p>
              </div>

              {/* Course Outline / Syllabus */}
              {course.outline && course.outline.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-[#182230]">
                    Tədris Proqramı (Kurrikulum)
                  </h3>
                  <div className="space-y-2 bg-[#F7F8FC] p-4 rounded-xl border border-[#E6EAF0]">
                    {course.outline.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-[#334155]">
                        <span className="w-5 h-5 rounded-full bg-[#F1F4FF] text-[#315EFB] font-bold flex items-center justify-center shrink-0 text-[10px]">
                          {idx + 1}
                        </span>
                        <span className="pt-0.5 leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Instructor Information */}
              {course.instructorName && (
                <div className="p-4 rounded-xl border border-[#E6EAF0] bg-white flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#F1F4FF] text-[#315EFB] flex items-center justify-center font-bold text-sm shrink-0">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-semibold text-[#667085]">Təlimçi / Müəllim</h4>
                    <div className="font-bold text-sm text-[#182230]">{course.instructorName}</div>
                    <div className="text-xs text-[#667085]">{course.instructorRole}</div>
                  </div>
                </div>
              )}

            </div>

            {/* Right Action & Inquiry Column */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Direct Academy Contact Card */}
              <div className="p-5 bg-white rounded-2xl border border-[#E6EAF0] shadow-sm space-y-4">
                <h3 className="font-bold text-sm text-[#182230]">
                  Birbaşa Tədris Mərkəzi ilə Əlaqə
                </h3>

                <div className="space-y-2.5">
                  {/* WhatsApp Direct Chat */}
                  <button
                    onClick={handleWhatsApp}
                    className="w-full py-3 px-4 rounded-xl bg-[#12A875] hover:bg-[#0e8a5f] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp ilə dərhal yaz</span>
                  </button>

                  {/* Direct Phone Call */}
                  <a
                    href={`tel:${course.phone.replace(/\s+/g, '')}`}
                    className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#315EFB]" />
                    <span>Zəng et: {course.phone}</span>
                  </a>
                </div>

                <div className="pt-3 border-t border-[#E6EAF0] text-[11px] text-[#667085] flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#12A875] shrink-0" />
                  <span>İlk sınaq dərsi {course.freeTrial ? 'tam ödənişsizdir' : 'mərkəzlə razılaşdırılır'}</span>
                </div>
              </div>

              {/* Inquiry Submission Form */}
              <div className="p-5 bg-[#F7F8FC] rounded-2xl border border-[#E6EAF0] space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#182230]">
                  Dərsə Qeydiyyat Sorğusu
                </h4>
                <p className="text-xs text-[#667085]">
                  Məlumatlarınızı qeyd edin, kurs koordinatoru sizinlə əlaqə saxlasın.
                </p>

                {inquirySuccess ? (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 space-y-1 text-center">
                    <CheckCircle className="w-6 h-6 text-emerald-600 mx-auto" />
                    <div className="text-xs font-bold">Sorğunuz uğurla göndərildi!</div>
                    <div className="text-[11px] text-emerald-700">
                      Tədris mərkəzinin rəhbərliyi qısa zamanda sizinlə əlaqə saxlayacaq.
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSendInquiry} className="space-y-2.5">
                    <input
                      type="text"
                      required
                      placeholder="Ad və Soyadınız"
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#E6EAF0] bg-white outline-none focus:border-[#315EFB]"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Əlaqə nömrəniz (+994 ...)"
                      value={inquiryPhone}
                      onChange={(e) => setInquiryPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#E6EAF0] bg-white outline-none focus:border-[#315EFB]"
                    />
                    <textarea
                      rows={2}
                      placeholder="Əlavə sualınız və ya qeydiniz..."
                      value={inquiryMessage}
                      onChange={(e) => setInquiryMessage(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#E6EAF0] bg-white outline-none focus:border-[#315EFB] resize-none"
                    />
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-[#315EFB] hover:bg-[#254edb] text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Sorğunu göndər</span>
                    </button>
                  </form>
                )}
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
