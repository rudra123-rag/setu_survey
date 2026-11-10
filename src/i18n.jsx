import React, { createContext, useContext, useEffect, useState } from 'react';

const LangContext = createContext(null);
const KEY = 'ks.lang';

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem(KEY) || 'both';
    } catch {
      return 'both';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(KEY, lang);
    } catch {}
    document.documentElement.lang = lang === 'hi' ? 'hi' : 'en';
  }, [lang]);

  // t('English', 'हिंदी') -> string for current mode; 'both' renders both lines.
  const t = (en, hi) => {
    if (lang === 'en') return en;
    if (lang === 'hi') return hi;
    return en;
  };
  const tx = (obj) => (obj ? obj[lang === 'hi' ? 'hi' : 'en'] ?? obj.en : '');

  return (
    <LangContext.Provider value={{ lang, setLang, t, tx, dual: lang === 'both' }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);

/** Renders the primary line plus the second language underneath when mode is "both". */
export function T({ en, hi, as: Tag = 'span', className = '' }) {
  const { lang } = useLang();
  if (lang === 'en') return <Tag className={className}>{en}</Tag>;
  if (lang === 'hi') return <Tag className={className}>{hi}</Tag>;
  return (
    <Tag className={className}>
      {en}{' '}
      <span className="sec" lang="hi">
        {hi}
      </span>
    </Tag>
  );
}
