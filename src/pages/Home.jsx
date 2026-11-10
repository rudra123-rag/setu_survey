import React from 'react';
import { Link } from 'react-router-dom';
import { SURVEYS } from '../data/surveys.js';
import { T, useLang } from '../i18n.jsx';

export default function Home() {
  const { tx } = useLang();

  return (
    <div className="wrap">
      <section className="hero">
        <p className="kicker">
          <T en="Field research · rural and small business" hi="फ़ील्ड रिसर्च · गाँव और छोटा व्यापार" />
        </p>
        <h1>
          <T
            en="Three ideas. Five audiences. Twenty questions each."
            hi="तीन विचार। पाँच तरह के लोग। हर एक के लिए बीस सवाल।"
          />
        </h1>
        <p className="lede">
          <T
            en="Pick who you are and answer honestly. Every question is in Hindi and English, and takes about five minutes."
            hi="आप कौन हैं, चुनिए और सच-सच जवाब दीजिए। हर सवाल हिन्दी और अंग्रेज़ी में है, और क़रीब पाँच मिनट लगेंगे।"
          />
        </p>
        <ul className="facts">
          <li>
            <T en="20 questions" hi="20 सवाल" />
          </li>
          <li>
            <T en="4–5 minutes" hi="4–5 मिनट" />
          </li>
          <li>
            <T en="Hindi + English" hi="हिन्दी + अंग्रेज़ी" />
          </li>
          <li>
            <T en="No login needed" hi="लॉगिन की ज़रूरत नहीं" />
          </li>
        </ul>
      </section>

      <section className="grid" aria-label="Surveys / सर्वे">
        {SURVEYS.map((s, i) => (
          <article className="card" key={s.id} style={{ '--accent': s.accent }}>
            <header className="card-head">
              <span className="emoji" aria-hidden="true">
                {s.emoji}
              </span>
              <div>
                <span className="num">0{i + 1}</span>
                <h2>{tx(s.name)}</h2>
                <p className="tag">{s.roles.map((r) => tx(r.name)).join(' · ')}</p>
              </div>
            </header>
            <p className="idea">{tx(s.idea)}</p>
            <div className="roles">
              {s.roles.map((r) => (
                <Link key={r.id} className="role-btn" to={`/s/${s.id}/${r.id}`}>
                  <span className="role-name">{tx(r.name)}</span>
                  <span className="role-meta">
                    <T en="20 questions" hi="20 सवाल" /> <span aria-hidden="true">→</span>
                  </span>
                </Link>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="note">
        <h3>
          <T en="Why we are asking" hi="हम क्यों पूछ रहे हैं" />
        </h3>
        <p>
          <T
            en="These are three early-stage ideas — a farmer-to-buyer market, doorstep wholesale delivery for village shops, and localized marketing automation. Your answers decide what gets built first, what a fair price is, and which language the product should speak."
            hi="ये तीन शुरुआती विचार हैं — किसान से खरीदार तक बाज़ार, गाँव की दुकानों तक थोक माल की डिलीवरी, और स्थानीय भाषा में मार्केटिंग ऑटोमेशन। आपके जवाब तय करेंगे कि पहले क्या बने, उचित दाम क्या हो, और प्रोडक्ट किस भाषा में बोले।"
          />
        </p>
        <p className="muted">
          <T
            en="We store your name and number only so we can follow up about a pilot. Nothing is shared with anyone else."
            hi="आपका नाम और नंबर हम सिर्फ़ इसलिए रखते हैं ताकि पायलट के बारे में बात कर सकें। किसी और के साथ साझा नहीं किया जाता।"
          />
        </p>
      </section>
    </div>
  );
}
