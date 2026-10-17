import React from 'react';
import { X, Trash2, Check, Scale, MessageCircle, ArrowRight } from 'lucide-react';
import { Course } from '../types';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  compareList: Course[];
  onRemoveFromCompare: (courseId: string) => void;
  onClearCompare: () => void;
  onSelectCourse: (course: Course) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  compareList,
  onRemoveFromCompare,
  onClearCompare,
  onSelectCourse,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white w-full max-w-4xl rounded-2xl sm:rounded-3xl shadow-2xl border border-[#E6EAF0] overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E6EAF0] bg-slate-50">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-[#315EFB]" />
            <div>
              <h2 className="font-extrabold text-base text-[#182230]">
                Kursların Müqayisəsi ({compareList.length} / 3)
              </h2>
              <span className="text-xs text-[#667085]">
                Fərqli mərkəzlərin qiymət, müddət və şərtlərini yan-yana təhlil edin
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {compareList.length > 0 && (
              <button
                onClick={onClearCompare}
                className="text-xs text-rose-600 hover:text-rose-700 font-semibold px-2.5 py-1.5 rounded-lg hover:bg-rose-50 transition-colors"
              >
                Hamısını təmizlə
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Comparison Content */}
        <div className="overflow-x-auto p-6 flex-1">
          {compareList.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <Scale className="w-12 h-12 text-slate-300 mx-auto" />
              <div className="text-sm font-bold text-[#182230]">
                Müqayisə üçün kurs seçilməyib
              </div>
              <p className="text-xs text-[#667085] max-w-sm mx-auto">
                Kataloqda bəyəndiyiniz kursların kartındakı tərəzi ikonuna klikləyərək müqayisə siyahısına əlavə edə bilərsiniz.
              </p>
            </div>
          ) : (
            <div className="min-w-[600px]">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E6EAF0]">
                    <th className="p-3 font-bold text-[#667085] w-36 bg-slate-50/50">Göstərici</th>
                    {compareList.map((course) => (
                      <th key={course.id} className="p-3 font-bold text-[#182230]">
                        <div className="flex items-start justify-between gap-2">
                          <span className="line-clamp-2">{course.title}</span>
                          <button
                            onClick={() => onRemoveFromCompare(course.id)}
                            className="p-1 rounded text-slate-400 hover:text-rose-500 transition-colors"
                            title="Müqayisədən sil"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E6EAF0]">
                  {/* Price */}
                  <tr>
                    <td className="p-3 font-semibold text-[#667085] bg-slate-50/50">Qiymət</td>
                    {compareList.map((c) => (
                      <td key={c.id} className="p-3 font-bold text-[#315EFB] text-sm tabular-nums">
                        {c.price} ₼ <span className="text-xs font-normal text-[#667085]">/ {c.priceType}</span>
                      </td>
                    ))}
                  </tr>

                  {/* Provider */}
                  <tr>
                    <td className="p-3 font-semibold text-[#667085] bg-slate-50/50">Tədris Mərkəzi</td>
                    {compareList.map((c) => (
                      <td key={c.id} className="p-3 font-medium text-[#182230]">
                        {c.providerName}
                      </td>
                    ))}
                  </tr>

                  {/* Format */}
                  <tr>
                    <td className="p-3 font-semibold text-[#667085] bg-slate-50/50">Format</td>
                    {compareList.map((c) => (
                      <td key={c.id} className="p-3 text-[#475467] capitalize">
                        {c.format === 'online' ? 'Online' : c.format === 'inperson' ? 'Əyani' : 'Hibrid'}
                      </td>
                    ))}
                  </tr>

                  {/* Duration */}
                  <tr>
                    <td className="p-3 font-semibold text-[#667085] bg-slate-50/50">Müddət</td>
                    {compareList.map((c) => (
                      <td key={c.id} className="p-3 text-[#475467]">
                        {c.duration}
                      </td>
                    ))}
                  </tr>

                  {/* Schedule */}
                  <tr>
                    <td className="p-3 font-semibold text-[#667085] bg-slate-50/50">Qrafik</td>
                    {compareList.map((c) => (
                      <td key={c.id} className="p-3 text-[#475467]">
                        {c.schedule}
                      </td>
                    ))}
                  </tr>

                  {/* Metro */}
                  <tr>
                    <td className="p-3 font-semibold text-[#667085] bg-slate-50/50">Metro / Ünvan</td>
                    {compareList.map((c) => (
                      <td key={c.id} className="p-3 text-[#475467]">
                        {c.metro ? `${c.metro} m.` : c.address}
                      </td>
                    ))}
                  </tr>

                  {/* Certificate */}
                  <tr>
                    <td className="p-3 font-semibold text-[#667085] bg-slate-50/50">Sertifikat</td>
                    {compareList.map((c) => (
                      <td key={c.id} className="p-3">
                        {c.certificateProvided ? (
                          <span className="text-emerald-700 font-semibold flex items-center gap-1">
                            <Check className="w-3.5 h-3.5 stroke-[2.5]" /> Verilir
                          </span>
                        ) : (
                          <span className="text-slate-400">Yoxdur</span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Actions */}
                  <tr>
                    <td className="p-3 font-semibold text-[#667085] bg-slate-50/50">Əməliyyat</td>
                    {compareList.map((c) => (
                      <td key={c.id} className="p-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              onSelectCourse(c);
                              onClose();
                            }}
                            className="px-3 py-1.5 bg-[#315EFB] text-white rounded-lg font-semibold hover:bg-[#254edb] transition-colors"
                          >
                            Baxış
                          </button>
                          <a
                            href={`https://wa.me/${c.whatsapp}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors"
                            title="WhatsApp"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
