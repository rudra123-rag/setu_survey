import React, { useEffect } from 'react';
import { Link, Route, Routes, useLocation, useParams } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Survey from './pages/Survey.jsx';
import Done from './pages/Done.jsx';
import { useLang } from './i18n.jsx';

function LangSwitch() {
  const { lang, setLang } = useLang();
  const items = [
    { id: 'en', label: 'English' },
    { id: 'hi', label: 'हिन्दी' },
    { id: 'both', label: 'Both' },
  ];
  return (
    <div className="lang" role="group" aria-label="Language / भाषा">
      {items.map((it) => (
        <button
          key={it.id}
          type="button"
          className={lang === it.id ? 'on' : ''}
          aria-pressed={lang === it.id}
          onClick={() => setLang(it.id)}
        >
          {it.label}
        </button>
      ))}
    </div>
  );
}

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }, [pathname]);
  return null;
}

function SurveyRoute() {
  const { surveyId, roleId } = useParams();
  // Remount when the audience changes so drafts and answers never leak across forms.
  return <Survey key={`${surveyId}/${roleId}`} />;
}

export default function App() {
  return (
    <>
      <ScrollTop />
      <header className="top">
        <Link to="/" className="brand" aria-label="Home">
          <span className="brand-mark" aria-hidden="true">
            से
          </span>
          <span className="brand-text">
            <strong>Setu Surveys</strong>
            <small>सर्वे · तीन विचार</small>
          </span>
        </Link>
        <LangSwitch />
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/s/:surveyId/:roleId" element={<SurveyRoute />} />
          <Route path="/done" element={<Done />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <footer className="foot">
        <span>Setu Surveys · KisanSetu, KiranaSetu, Nukkad</span>
        <span className="dot">·</span>
        <span>Responses stored in Supabase / जवाब Supabase में सुरक्षित</span>
      </footer>
    </>
  );
}
