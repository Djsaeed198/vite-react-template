import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SECTIONS = [
  { name: 'نظام آموزشی', path: '/education' },
  { name: 'فرم‌های اداری', path: '/forms' },
  { name: 'ویزای کاری', path: '/work' },
  { name: 'ویزای تحصیلی', path: '/student' },
];

export default function QuickSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{name: string, path: string}[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setQuery(q);
    if (q.length > 0) {
      setResults(SECTIONS.filter(s => s.name.includes(q)));
    } else {
      setResults([]);
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center bg-stone-100 rounded-full px-4 py-2">
        <Search className="w-4 h-4 text-stone-400 mr-2" />
        <input 
          type="text" 
          value={query} 
          onChange={handleSearch} 
          placeholder="جستجوی سریع..." 
          className="bg-transparent border-none text-xs w-full focus:outline-none"
        />
      </div>
      {results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-white border border-stone-200 rounded-2xl shadow-lg p-2 z-50">
          {results.map(r => (
            <a key={r.path} href={r.path} className="block p-2 text-xs hover:bg-stone-50 rounded-lg">{r.name}</a>
          ))}
        </div>
      )}
    </div>
  );
}
