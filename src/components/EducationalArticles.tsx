import React, { useState } from 'react';
import { BookOpen, Calendar, Clock, ArrowRight, X, User } from 'lucide-react';
import { Article } from '../types';

interface EducationalArticlesProps {
  articles: Article[];
}

export const EducationalArticles: React.FC<EducationalArticlesProps> = ({ articles }) => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <section id="bloq" className="py-12 bg-white border-t border-[#E6EAF0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold text-[#315EFB] uppercase tracking-wider mb-1">
              Faydalı Bələdçilər & Məsləhətlər
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#182230] tracking-tight">
              Təhsil və Karyera Bloqu
            </h2>
            <p className="text-sm text-[#667085] mt-1 max-w-2xl">
              İmtahana hazırlıq strategiyaları, proqramlaşdırma dilləri və kurs seçərkən diqqət edilməli məqamlar.
            </p>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article) => (
            <article
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="group flex flex-col bg-white rounded-2xl border border-[#E6EAF0] hover:border-slate-300 transition-all duration-200 overflow-hidden cursor-pointer hover:shadow-sm"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-[#667085]">
                    <span className="font-semibold text-[#315EFB]">{article.category}</span>
                    <span>·</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="font-bold text-sm text-[#182230] group-hover:text-[#315EFB] transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-[#667085] line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#E6EAF0] flex items-center justify-between text-xs text-[#667085]">
                  <span>{article.date}</span>
                  <span className="text-[#315EFB] font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    Oxu <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Article Reading Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div 
            className="relative bg-white w-full max-w-2xl rounded-2xl sm:rounded-3xl shadow-2xl border border-[#E6EAF0] overflow-hidden my-auto max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E6EAF0] bg-slate-50">
              <span className="text-xs font-semibold text-[#315EFB]">{selectedArticle.category}</span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto p-6 sm:p-8 space-y-5 flex-1">
              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#182230] leading-snug">
                  {selectedArticle.title}
                </h2>
                <div className="flex items-center gap-3 text-xs text-[#667085]">
                  <span>{selectedArticle.author}</span>
                  <span>·</span>
                  <span>{selectedArticle.date}</span>
                  <span>·</span>
                  <span>{selectedArticle.readTime} oxu</span>
                </div>
              </div>

              <div className="aspect-[16/9] rounded-xl overflow-hidden bg-slate-100">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4 text-sm text-[#334155] leading-relaxed">
                {selectedArticle.content.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-[#E6EAF0] bg-slate-50 text-right">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2 bg-[#182230] text-white text-xs font-semibold rounded-xl hover:bg-slate-800 transition-colors"
              >
                Bağla
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
