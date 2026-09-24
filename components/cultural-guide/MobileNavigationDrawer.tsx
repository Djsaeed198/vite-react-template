import React, { useState, useMemo, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Search, 
  Compass, 
  Coins, 
  Home, 
  GraduationCap, 
  Users, 
  LayoutGrid, 
  ChevronLeft, 
  Sparkles, 
  Zap, 
  CheckCircle, 
  FileText,
  MessageSquare,
  Globe,
  Settings,
  Star,
  Map,
  Building,
  Car,
  Award,
  Landmark,
  BookOpen,
  ArrowUpRight,
  IdCard
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from '../utils/toast';
import { 
  SUPER_APP_CATEGORIES, 
  SUPER_APP_PAGES, 
  SuperAppPageItem,
  SuperAppCategory,
  getPageItem 
} from '../data/superAppCatalog';

interface MobileNavigationDrawerProps {
  activeSegment: string;
  setActiveSegment: (segment: string) => void;
  isOpen: boolean;
  onClose: () => void;
  pages?: { id: string; label: string; icon: any }[];
}

// Popular Shortcuts for high-frequency Austrian tools
const QUICK_SHORTCUTS = [
  { 
    id: "visa-samples", 
    label: "نمونه ویزاها و کارت‌های اقامت", 
    icon: IdCard, 
    color: "text-purple-400 bg-purple-500/15 border-purple-500/30" 
  },
  { 
    id: "rwr-calculator", 
    label: "محاسبه امتیاز RWR", 
    icon: Award, 
    color: "text-rose-400 bg-rose-500/15 border-rose-500/30" 
  },
  { 
    id: "immigration-assessment", 
    label: "ویزاهای جایگزین و ارزیابی", 
    icon: Sparkles, 
    color: "text-amber-400 bg-amber-500/15 border-amber-500/30" 
  },
  { 
    id: "finance", 
    label: "حقوق خالص (Brutto-Netto)", 
    icon: Coins, 
    color: "text-emerald-400 bg-emerald-500/15 border-emerald-500/30" 
  },
  { 
    id: "ma35", 
    label: "نوبت‌گیری و فرم‌های MA35", 
    icon: Landmark, 
    color: "text-indigo-400 bg-indigo-500/15 border-indigo-500/30" 
  },
  { 
    id: "housesearch", 
    label: "جستجوی مسکن و اجاره وین", 
    icon: Building, 
    color: "text-sky-400 bg-sky-500/15 border-sky-500/30" 
  },
  { 
    id: "german", 
    label: "آکادمی زبان آلمانی A1-C1", 
    icon: BookOpen, 
    color: "text-violet-400 bg-violet-500/15 border-violet-500/30" 
  },
];

export default function MobileNavigationDrawer({
  activeSegment,
  setActiveSegment,
  isOpen,
  onClose,
  pages,
}: MobileNavigationDrawerProps) {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Prevent background scrolling when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Catalog items normalization
  const allCatalogPages = useMemo(() => {
    if (pages && pages.length > 0) {
      return pages.map(p => ({
        id: p.id,
        title: p.label,
        shortTitle: p.label,
        category: 'general',
        icon: p.icon || Sparkles,
        description: '',
        keywords: [],
      })) as SuperAppPageItem[];
    }
    return SUPER_APP_PAGES;
  }, [pages]);

  // Filtered pages based on search and category
  const filteredPages = useMemo(() => {
    const q = searchText.trim().toLowerCase();
    return allCatalogPages.filter((item) => {
      // Category check
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Search query check
      if (!q) return true;
      const titleMatch = item.title?.toLowerCase().includes(q);
      const shortTitleMatch = item.shortTitle?.toLowerCase().includes(q);
      const descMatch = item.description?.toLowerCase().includes(q);
      const idMatch = item.id.toLowerCase().includes(q);
      const kwMatch = item.keywords?.some(k => k.toLowerCase().includes(q));
      return titleMatch || shortTitleMatch || descMatch || idMatch || kwMatch;
    });
  }, [allCatalogPages, searchText, selectedCategory]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: allCatalogPages.length };
    SUPER_APP_CATEGORIES.forEach(c => {
      if (c.id === 'all') return;
      counts[c.id] = allCatalogPages.filter(p => p.category === c.id).length;
    });
    return counts;
  }, [allCatalogPages]);

  const handleSelectPage = (pageId: string, title?: string) => {
    setActiveSegment(pageId);
    onClose();
    if (title) {
      toast.success(`بارگذاری: ${title} 🇦🇹`);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" dir="rtl">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-stone-950/75 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Sliding Drawer Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 240 }}
            className="absolute top-0 bottom-0 right-0 w-full max-w-md bg-stone-950/98 border-l border-stone-800 text-stone-100 flex flex-col shadow-2xl z-10"
          >
            {/* 1. Header with Close Button */}
            <div className="p-4 sm:p-5 pb-3 border-b border-stone-800/80 flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2.5">
                <img
                  src="/otrish_logo_1779961596526.png"
                  alt="لوگوی اتریش‌نشین"
                  className="w-9 h-9 rounded-full object-contain shadow-md border border-stone-800 bg-white"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-black text-white">منوی خدمات اتریش‌نشین</h2>
                    <span className="text-[9px] font-mono bg-red-650/80 text-white px-1.5 py-0.5 rounded-full font-bold">
                      {allCatalogPages.length} بخش
                    </span>
                  </div>
                  <p className="text-[10px] text-stone-400 font-bold">
                    دسترسی سریع به تمام محاسبات، جداول و مراجع اقامت
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 transition-colors"
                aria-label="بستن منو"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 2. Fast Search Input */}
            <div className="p-4 pb-2 shrink-0">
              <div className="relative">
                <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  placeholder="جستجو در ۶۰+ بخش سوپراپ (RWR، MA35، حقوق، پزشک...)"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="w-full p-2.5 pr-10 pl-8 rounded-xl bg-stone-900/90 border border-stone-700/80 text-white text-xs font-bold outline-none focus:border-red-500 focus:bg-stone-900 transition-all text-right placeholder:text-stone-500"
                />
                {searchText && (
                  <button
                    onClick={() => setSearchText('')}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[10px] text-stone-400 hover:text-white bg-stone-800 px-1.5 py-0.5 rounded"
                  >
                    پاک کردن
                  </button>
                )}
              </div>
            </div>

            {/* 3. Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4">
              {/* Quick High-Priority Shortcuts (When not searching) */}
              {!searchText && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-[10px] font-black text-amber-400">
                    <Zap className="w-3.5 h-3.5 animate-pulse" />
                    <span>⚡ ابزارهای منتخب و پرکاربرد اتریش</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {QUICK_SHORTCUTS.map((sc) => {
                      const Icon = sc.icon;
                      const isCurrent = activeSegment === sc.id;
                      return (
                        <button
                          key={sc.id}
                          onClick={() => handleSelectPage(sc.id, sc.label)}
                          className={`p-2.5 rounded-xl border ${sc.color} text-right flex items-center gap-2.5 transition-all active:scale-95 ${
                            isCurrent ? 'ring-2 ring-white/40 shadow-md' : 'hover:scale-[1.02]'
                          }`}
                        >
                          <div className="w-7 h-7 rounded-lg bg-black/30 flex items-center justify-center shrink-0">
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-black leading-tight text-white line-clamp-2">
                            {sc.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Category Filter Chips */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-black text-stone-400">
                  <span className="flex items-center gap-1">
                    <LayoutGrid className="w-3.5 h-3.5 text-stone-300" />
                    <span>دسته‌بندی موضوعی خدمات</span>
                  </span>
                  {selectedCategory !== 'all' && (
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className="text-amber-400 text-[10px] hover:underline"
                    >
                      نمایش همه
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                  {SUPER_APP_CATEGORIES.map((cat) => {
                    const isSelected = selectedCategory === cat.id;
                    const count = categoryCounts[cat.id] || 0;
                    if (cat.id !== 'all' && count === 0) return null;
                    const CatIcon = cat.icon || LayoutGrid;

                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1.5 transition-all border ${
                          isSelected
                            ? 'bg-red-650 text-white border-red-500 shadow-md scale-102'
                            : 'bg-stone-900/90 text-stone-300 border-stone-800 hover:border-stone-700 hover:text-white'
                        }`}
                      >
                        <CatIcon className="w-3 h-3 shrink-0" />
                        <span>{cat.shortTitle || cat.title}</span>
                        <span className={`text-[8.5px] px-1 py-0.2 rounded-full font-mono ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-stone-800 text-stone-400'
                        }`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Filtered Pages List */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-[10px] font-black text-stone-400 border-b border-stone-800 pb-1.5">
                  <span>فهرست ابزارها ({filteredPages.length} مورد)</span>
                  {searchText && (
                    <span className="text-amber-400 text-[10px]">
                      نتایج فیلتر برای: &ldquo;{searchText}&rdquo;
                    </span>
                  )}
                </div>

                {filteredPages.length > 0 ? (
                  <div className="space-y-1.5 pb-6">
                    {filteredPages.map((item) => {
                      const isCurrent = activeSegment === item.id;
                      const Icon = item.icon || Sparkles;
                      const categoryInfo = SUPER_APP_CATEGORIES.find(c => c.id === item.category);

                      return (
                        <button
                          key={item.id}
                          onClick={() => handleSelectPage(item.id, item.title)}
                          className={`w-full p-2.5 sm:p-3 rounded-xl flex items-center justify-between transition-all border text-right group ${
                            isCurrent
                              ? 'bg-red-650/25 border-red-500/60 text-white shadow-md'
                              : 'bg-stone-900/60 border-stone-800/80 hover:bg-stone-900 hover:border-stone-700 text-stone-200'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0 flex-1">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                              isCurrent ? 'bg-red-650 text-white' : 'bg-stone-800 text-stone-300 group-hover:text-white'
                            }`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0 flex-1 text-right">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className={`text-xs font-black truncate block ${isCurrent ? 'text-white' : 'text-stone-200'}`}>
                                  {item.shortTitle || item.title}
                                </span>
                                {item.badge && (
                                  <span className="text-[8.5px] font-black px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              {categoryInfo && (
                                <span className="text-[9px] text-stone-500 font-bold block mt-0.5">
                                  {categoryInfo.shortTitle || categoryInfo.title}
                                </span>
                              )}
                            </div>
                          </div>

                          <ChevronLeft className={`w-4 h-4 shrink-0 transition-transform ${
                            isCurrent ? 'text-white translate-x-[-2px]' : 'text-stone-500 group-hover:text-stone-300'
                          }`} />
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-6 text-center bg-stone-900/40 rounded-2xl border border-stone-800/60 space-y-2">
                    <p className="text-stone-400 text-xs font-bold">
                      هیچ موردی مطابق با جستجوی شما یافت نشد.
                    </p>
                    <button
                      onClick={() => {
                        setSearchText('');
                        setSelectedCategory('all');
                      }}
                      className="text-[11px] font-black text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/25"
                    >
                      بازنشانی جستجو
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* 4. Footer */}
            <div className="p-3.5 border-t border-stone-800/80 bg-stone-950 text-center shrink-0 flex items-center justify-between text-[10px] text-stone-400 font-bold">
              <span>کانون همیاری اتریش‌نشین 🇦🇹</span>
              <button
                onClick={() => handleSelectPage('about', 'درباره و تماس')}
                className="text-stone-300 hover:text-white flex items-center gap-1"
              >
                <span>درباره سامانه</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
