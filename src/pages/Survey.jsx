import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getSurvey } from '../data/surveys.js';
import { useLang } from '../i18n.jsx';
import Question, { L } from '../components/Question.jsx';
import { saveResponse, isConfigured, flushQueue, queueSize } from '../lib/supabase.js';

export default function Survey() {
  const { surveyId, roleId } = useParams();
  const navigate = useNavigate();
  const { lang, tx } = useLang();

  const survey = getSurvey(surveyId);
  const role = survey?.roles.find((r) => r.id === roleId);
  const key = `ks.draft.${surveyId}.${roleId}`;

  const [answers, setAnswers] = useState({});
  const [profile, setProfile] = useState({});
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState({});
  const [ready, setReady] = useState(false);
  const [restored, setRestored] = useState(false);
  const [saving, setSaving] = useState(false);
  const [failed, setFailed] = useState('');
  const startedAt = useRef(Date.now());

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const d = JSON.parse(raw);
        const a = d.answers || {};
        setAnswers(a);
        setProfile(d.profile || {});
        if (Object.keys(a).length || Object.keys(d.profile || {}).length) setRestored(true);
      }
    } catch {}
    setReady(true);
  }, [key]);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(key, JSON.stringify({ answers, profile, at: Date.now() }));
    } catch {}
  }, [answers, profile, ready, key]);

  // Retry anything queued by an earlier offline session.
  useEffect(() => {
    if (isConfigured) flushQueue();
  }, []);

  const answered = useMemo(
    () =>
      (role?.questions || []).filter((q) => {
        const v = answers[q.id];
        if (Array.isArray(v)) return v.length > 0;
        return v !== undefined && v !== null && v !== '';
      }).length,
    [answers, role]
  );
  const total = role?.questions.length || 0;
  const pct = total ? Math.round((answered / total) * 100) : 0;

  if (!survey || !role) {
    return (
      <div className="wrap">
        <p>Survey not found. <Link to="/">Go home</Link></p>
      </div>
    );
  }

  const setAnswer = (id, value) => {
    setAnswers((a) => ({ ...a, [id]: value }));
    setErrors((e) => (e[id] ? { ...e, [id]: false } : e));
  };

  const setProfileField = (id, value) => {
    setProfile((p) => ({ ...p, [id]: value }));
    setErrors((e) => (e[`p_${id}`] ? { ...e, [`p_${id}`]: false } : e));
  };

  const resetDraft = () => {
    setAnswers({});
    setProfile({});
    setConsent(false);
    setRestored(false);
    setErrors({});
    try {
      localStorage.removeItem(key);
    } catch {}
  };

  const validate = () => {
    const next = {};
    role.profile.forEach((f) => {
      if (!String(profile[f.id] || '').trim()) next[`p_${f.id}`] = true;
    });
    role.questions.forEach((q) => {
      const v = answers[q.id];
      const empty = Array.isArray(v) ? v.length === 0 : v === undefined || v === null || v === '';
      if (empty) next[q.id] = true;
    });
    if (!consent) next.consent = true;
    return next;
  };

  const firstError = (errs) => {
    const f = role.profile.find((p) => errs[`p_${p.id}`]);
    if (f) return `p-${f.id}`;
    const qid = role.questions.find((q) => errs[q.id])?.id;
    if (qid) return `q-${qid}`;
    if (errs.consent) return 'consent';
    return null;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setFailed('');
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      const target = firstError(errs);
      const el = target && document.getElementById(target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.querySelector('input, textarea')?.focus({ preventScroll: true });
      }
      return;
    }

    setSaving(true);
    const payload = {
      survey: survey.id,
      role: role.id,
      name: String(profile.name || '').trim() || null,
      phone: String(profile.phone || '').trim() || null,
      place: String(profile.place || '').trim() || null,
      answers,
      lang,
      duration_seconds: Math.round((Date.now() - startedAt.current) / 1000),
    };
    const res = await saveResponse(payload).catch((err) => ({
      status: 'queued',
      error: err?.message || 'network',
    }));
    setSaving(false);

    if (res.status === 'local' || res.status === 'queued') {
      // Still show the thank-you screen, but say where the response went.
      try {
        localStorage.removeItem(key);
      } catch {}
      navigate('/done', {
        state: {
          surveyId: survey.id,
          roleId: role.id,
          name: payload.name,
          status: res.status,
          response: { ...payload, profile, consent },
        },
      });
      return;
    }
    try {
      localStorage.removeItem(key);
    } catch {}
    navigate('/done', {
      state: {
        surveyId: survey.id,
        roleId: role.id,
        name: payload.name,
        status: 'saved',
        response: { ...payload, profile, consent },
      },
    });
  };

  return (
    <div className="wrap survey" style={{ '--accent': survey.accent }}>
      <div className="crumbs">
        <Link to="/" className="back">
          <span aria-hidden="true">←</span> <L en="All surveys" hi="सभी सर्वे" />
        </Link>
        <span className="crumb-sep">/</span>
        <span>{tx(survey.name)}</span>
        <span className="crumb-sep">/</span>
        <span>{tx(role.name)}</span>
      </div>

      <header className="survey-head">
        <span className="emoji big" aria-hidden="true">
          {survey.emoji}
        </span>
        <div>
          <h1>
            {tx(survey.name)} — {tx(role.name)}
          </h1>
          <p className="lede small">{tx(role.intro)}</p>
        </div>
      </header>

      <div className="progress-wrap">
        <div className="progress-bar" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
          <span style={{ width: `${pct}%` }} />
        </div>
        <div className="progress-meta">
          <span>
            {answered} / {total} <L en="answered" hi="जवाब दिए" />
          </span>
          <span>{pct}%</span>
        </div>
      </div>

      {restored && (
        <div className="banner">
          <span>
            <L
              en="Your earlier answers were restored on this device."
              hi="इस डिवाइस पर आपके पिछले जवाब वापस लाए गए हैं।"
            />
          </span>
          <button type="button" className="link-btn" onClick={resetDraft}>
            <L en="Start fresh" hi="नए सिरे से शुरू करें" />
          </button>
        </div>
      )}

      <form onSubmit={onSubmit} noValidate>
        <section className="block">
          <h2 className="block-title">
            01 · <L en="About you" hi="आपके बारे में" />
          </h2>
          <div className="profile-grid">
            {role.profile.map((f) => (
              <div className="field" id={`p-${f.id}`} key={f.id}>
                <label htmlFor={`pf-${f.id}`}>
                  {lang === 'hi' ? f.hi : f.en}
                  {lang === 'both' && (
                    <span className="sec" lang="hi">
                      {f.hi}
                    </span>
                  )}
                </label>
                <input
                  id={`pf-${f.id}`}
                  type={f.type}
                  inputMode={f.type === 'tel' ? 'tel' : undefined}
                  value={profile[f.id] || ''}
                  onChange={(e) => setProfileField(f.id, e.target.value)}
                  className={errors[`p_${f.id}`] ? 'bad' : ''}
                  autoComplete="off"
                />
                {errors[`p_${f.id}`] && (
                  <p className="err">
                    <L en="This is required." hi="यह ज़रूरी है।" />
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="block">
          <h2 className="block-title">
            02 · <L en="Your answers" hi="आपके जवाब" />
          </h2>
          <div className="questions">
            {role.questions.map((q, i) => (
              <Question
                key={q.id}
                q={q}
                n={i + 1}
                value={answers[q.id]}
                onChange={(v) => setAnswer(q.id, v)}
                error={errors[q.id]}
              />
            ))}
          </div>
        </section>

        <section className="block submit-block" id="consent">
          <label className={`consent ${errors.consent ? 'bad' : ''}`}>
            <input type="checkbox" checked={consent} onChange={(e) => {
              setConsent(e.target.checked);
              setErrors((s) => ({ ...s, consent: false }));
            }} />
            <span>
              <L
                en="I agree that my answers may be used to improve this service."
                hi="मैं सहमत हूँ कि मेरे जवाब सेवा सुधारने के लिए इस्तेमाल किए जा सकते हैं।"
              />
            </span>
          </label>
          {errors.consent && (
            <p className="err">
              <L en="Please tick this to submit." hi="जमा करने के लिए इसे टिक करें।" />
            </p>
          )}

          {failed && <p className="err big">{failed}</p>}

          <button type="submit" className="primary" disabled={saving}>
            {saving ? <L en="Sending…" hi="भेजा जा रहा है…" /> : <L en="Submit answers" hi="जवाब जमा करें" />}
          </button>
          <p className="muted center">
            <L
              en="Stored securely in Supabase. One response per person, and you can change your mind later."
              hi="Supabase में सुरक्षित रखा जाता है। एक व्यक्ति का एक जवाब, और आप बाद में मना भी कर सकते हैं।"
            />
          </p>
          {isConfigured && queueSize() > 0 && (
            <p className="muted center">
              <L
                en={`${queueSize()} response(s) waiting on this device to sync.`}
                hi={`इस डिवाइस पर ${queueSize()} जवाब सिंक होने बाक़ी हैं।`}
              />
            </p>
          )}
        </section>
      </form>
    </div>
  );
}
