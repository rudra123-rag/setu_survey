import React from 'react';
import { useLang } from '../i18n.jsx';

/** Bilingual text: primary line in the chosen language, second line only in "both" mode. */
export function L({ en, hi, className = '' }) {
  const { lang } = useLang();
  if (lang === 'hi') return <span className={className}>{hi}</span>;
  if (lang === 'both')
    return (
      <span className={className}>
        {en}{' '}
        <span className="sec" lang="hi">
          {hi}
        </span>
      </span>
    );
  return <span className={className}>{en}</span>;
}

export default function Question({ q, n, value, onChange, error }) {
  const { lang } = useLang();
  const label = lang === 'hi' ? q.hi : q.en;
  const options = q.options || [];

  return (
    <div className={`q ${error ? 'has-error' : ''}`} id={`q-${q.id}`}>
      <div className="q-label">
        <span className="q-num">{n}</span>
        <div>
          <p className="q-text">{label}</p>
          {lang === 'both' && (
            <p className="q-text hi" lang="hi">
              {q.hi}
            </p>
          )}
        </div>
      </div>

      {q.type === 'single' && (
        <fieldset className="opts">
          <legend className="sr">Choose one / एक चुनें</legend>
          {options.map((o) => {
            const on = value === o.value;
            return (
              <label key={o.value} className={`opt ${on ? 'on' : ''}`}>
                <input
                  type="radio"
                  name={q.id}
                  value={o.value}
                  checked={on}
                  onChange={() => onChange(o.value)}
                />
                <span className="tick" aria-hidden="true" />
                <span className="opt-text">
                  {lang === 'hi' ? o.hi : o.en}
                  {lang === 'both' && (
                    <span className="sec" lang="hi">
                      {o.hi}
                    </span>
                  )}
                </span>
              </label>
            );
          })}
        </fieldset>
      )}

      {q.type === 'multi' && (
        <fieldset className="opts">
          <legend className="sr">Choose all that apply / सभी चुनें</legend>
          {options.map((o) => {
            const list = Array.isArray(value) ? value : [];
            const on = list.includes(o.value);
            return (
              <label key={o.value} className={`opt ${on ? 'on' : ''}`}>
                <input
                  type="checkbox"
                  name={q.id}
                  value={o.value}
                  checked={on}
                  onChange={() =>
                    onChange(on ? list.filter((v) => v !== o.value) : [...list, o.value])
                  }
                />
                <span className="tick box" aria-hidden="true" />
                <span className="opt-text">
                  {lang === 'hi' ? o.hi : o.en}
                  {lang === 'both' && (
                    <span className="sec" lang="hi">
                      {o.hi}
                    </span>
                  )}
                </span>
              </label>
            );
          })}
        </fieldset>
      )}

      {q.type === 'scale' && (
        <fieldset className="opts scale">
          <legend className="sr">Rate 1 to 5 / 1 से 5 तक</legend>
          <div className="scale-row">
            {Array.from({ length: q.max - q.min + 1 }, (_, i) => q.min + i).map((v) => (
              <label key={v} className={`scale-btn ${value === v ? 'on' : ''}`}>
                <input
                  type="radio"
                  name={q.id}
                  value={v}
                  checked={value === v}
                  onChange={() => onChange(v)}
                />
                <span className="scale-num">{v}</span>
              </label>
            ))}
          </div>
          <div className="scale-ends">
            <span>{lang === 'hi' ? q.low.hi : q.low.en}</span>
            <span>{lang === 'hi' ? q.high.hi : q.high.en}</span>
          </div>
        </fieldset>
      )}

      {q.type === 'text' && (
        <input
          className="text-input"
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={lang === 'hi' ? 'अपना जवाब लिखें' : 'Type your answer'}
          autoComplete="off"
        />
      )}

      {q.type === 'number' && (
        <input
          className="text-input"
          type="number"
          inputMode="numeric"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={lang === 'hi' ? 'संख्या लिखें' : 'Enter a number'}
        />
      )}

      {error && (
        <p className="err" role="alert">
          {lang === 'hi' ? 'कृपया इस सवाल का जवाब दें।' : 'Please answer this question.'}
        </p>
      )}
    </div>
  );
}
