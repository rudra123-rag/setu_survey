import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getSurvey } from '../data/surveys.js';
import { L } from '../components/Question.jsx';
import { useLang } from '../i18n.jsx';

export default function Done() {
  const { state } = useLocation();
  const { tx } = useLang();
  const survey = state?.surveyId ? getSurvey(state.surveyId) : null;
  const role = survey?.roles.find((r) => r.id === state?.roleId);
  const other = survey?.roles.find((r) => r.id !== state?.roleId);
  const status = state?.status || 'saved';
  const response = state?.response || null;

  const exportJson = () => {
    if (!response) return;
    const blob = new Blob([JSON.stringify(response, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${survey?.id || 'survey'}-${role?.id || 'response'}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const printSurvey = () => {
    if (!response) return;
    window.print();
  };

  return (
    <div className="wrap done">
      <div className="done-card printable">
        <div className="check" aria-hidden="true">
          ✓
        </div>
        <h1>
          <L en="Thank you — your answers are in." hi="धन्यवाद — आपके जवाब मिल गए।" />
        </h1>
        <p className="lede">
          {state?.name ? (
            <L en={`${state.name}, this helps more than you know.`} hi={`${state.name} जी, इससे बहुत मदद मिलेगी।`} />
          ) : (
            <L
              en="Every response shapes what we build first."
              hi="हर जवाब तय करता है कि हम पहले क्या बनाएँ।"
            />
          )}
        </p>

        {survey && role && (
          <p className="pill">
            {tx(survey.name)} · {tx(role.name)} · <L en="20 questions" hi="20 सवाल" />
          </p>
        )}

        {status !== 'saved' && (
          <div className="banner">
            <span>
              {status === 'local' ? (
                <L
                  en="Saved on this device. Supabase is not connected yet, so nothing was uploaded."
                  hi="इस डिवाइस पर सुरक्षित। Supabase अभी जुड़ा नहीं है, इसलिए कुछ अपलोड नहीं हुआ।"
                />
              ) : (
                <L
                  en="The connection dropped, so your response is queued and will sync automatically."
                  hi="कनेक्शन टूट गया, आपका जवाब कतार में है और अपने-आप सिंक हो जाएगा।"
                />
              )}
            </span>
          </div>
        )}

        <div className="done-actions">
          <button type="button" className="primary" onClick={printSurvey}>
            <L en="Print questionnaire" hi="प्रश्नावली प्रिंट करें" />
          </button>
          <button type="button" className="ghost" onClick={exportJson}>
            <L en="Save as JSON" hi="JSON के रूप में सेव करें" />
          </button>
          {other && (
            <Link className="primary" to={`/s/${survey.id}/${other.id}`}>
              <L en={`Also answer as ${tx(other.name)}`} hi={`${tx(other.name)} के रूप में भी भरें`} />
            </Link>
          )}
          <Link className="ghost" to="/">
            <L en="Back to all surveys" hi="सभी सर्वे पर लौटें" />
          </Link>
        </div>

        <p className="muted">
          <L
            en="Want to change an answer? Fill the form again — we keep the latest response."
            hi="कोई जवाब बदलना है? फ़ॉर्म दोबारा भरें — हम नया जवाब रखते हैं।"
          />
        </p>

        {response && (
          <div className="summary-print">
            <h2>
              <L en="Completed questionnaire" hi="पूरा हुआ प्रश्नावली" />
            </h2>
            <dl className="response-summary">
              <div>
                <dt>
                  <L en="Survey" hi="सर्वे" />
                </dt>
                <dd>{tx(survey?.name || '')}</dd>
              </div>
              <div>
                <dt>
                  <L en="Role" hi="भूमिका" />
                </dt>
                <dd>{tx(role?.name || '')}</dd>
              </div>
              <div>
                <dt>
                  <L en="Name" hi="नाम" />
                </dt>
                <dd>{response.name || '—'}</dd>
              </div>
              <div>
                <dt>
                  <L en="Phone" hi="फोन" />
                </dt>
                <dd>{response.phone || '—'}</dd>
              </div>
              <div>
                <dt>
                  <L en="Place" hi="स्थान" />
                </dt>
                <dd>{response.place || '—'}</dd>
              </div>
            </dl>
            <div className="answer-list">
              {(role?.questions || []).map((q, i) => (
                <div key={q.id} className="answer-item">
                  <h3>
                    {i + 1}. {q.en}
                  </h3>
                  <p>{JSON.stringify(response.answers?.[q.id] ?? 'No answer')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
