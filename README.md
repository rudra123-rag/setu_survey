# Setu Surveys — three startup ideas, five audiences, 100 bilingual questions

A small React website that collects field research for three ideas, in **Hindi and English**,
and stores every response in **Supabase**.

| # | Idea | Audience | Questions |
|---|------|----------|-----------|
| 1 | **KisanSetu** — farmer-to-buyer platform | Farmer | 20 |
|   |                                       | Buyer (shop, restaurant, wholesaler, processor) | 20 |
| 2 | **KiranaSetu** — village kirana / paan shop → wholesaler doorstep delivery | Kirana / paan shop | 20 |
|   |                                       | Wholesaler / distributor | 20 |
| 3 | **Nukkad** — localized digital marketing automation SaaS | Local business / MSME (10 business types) | 20 |

Every question, option and label exists in both languages. The language switch has three modes:
**English**, **हिन्दी**, and **Both** (English with Hindi underneath, default).

> Names: *KisanSetu* is the name you gave. **KiranaSetu** and **Nukkad** are placeholders —
> change them in `src/data/surveys.js` (`name: { en, hi }`) and in `index.html`.

---

## Run it

```bash
npm install
npm run dev          # http://localhost:5173
```

Production build:

```bash
npm run build        # dist/index.html + dist/assets, plus dist/standalone.html
```

`dist/standalone.html` is the whole app — CSS, JS, questions — inlined into one file.
You can email it, put it on a pen drive, or open it directly from disk. It still writes to
Supabase as long as `.env` was filled in at build time.

---

## Connect Supabase (5 minutes)

1. Create a project at [supabase.com](https://supabase.com).
2. Open **SQL Editor → New query**, paste all of `supabase/schema.sql`, run it.
   This creates `public.responses` with RLS: the browser may **insert** only, never read.
3. Copy **Project settings → API → Project URL** and **anon public key** into `.env`:

   ```bash
   cp .env.example .env
   ```

   ```env
   VITE_SUPABASE_URL=https://xxxxxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
   ```

4. Restart `npm run dev` (or rebuild). The submit button now writes to the table.

Without `.env` the site still works — answers are kept in the browser, the thank-you page says
so plainly, and nothing is uploaded. That is intentional, not an error state.

### Reading the answers

`responses` has one row per submission:

| column | meaning |
|---|---|
| `survey` | `kisansetu` \| `kiranasetu` \| `nukkad` |
| `role` | `farmer` \| `buyer` \| `kirana` \| `wholesaler` \| `msme` |
| `name`, `phone`, `place` | respondent details, for pilot follow-up |
| `answers` | `jsonb`, keyed by question id (`f3`, `b12`, `k9`, `w20`, `m13`, …) |
| `lang` | UI language used: `en`, `hi` or `both` |
| `duration_seconds` | time spent on the form |

Useful queries:

```sql
select survey, role, count(*) from public.responses group by 1, 2 order by 1, 2;

-- where farmers sell today, as a share
select answers->>'f3' as sells_where, count(*) as n
from public.responses
where survey = 'kisansetu' and role = 'farmer'
group by 1 order by 2 desc;

-- price band local businesses will pay for marketing (question m16)
select answers->>'m16' as band, count(*) as n
from public.responses
where survey = 'nukkad'
group by 1 order by 2 desc;
```

Question ids are stable, so these queries keep working if you reword a question.

---

## How it is built

```
src/
  data/surveys.js      all 100 questions + options + profile fields, { en, hi }
  i18n.jsx             language context, EN / हिन्दी / Both
  lib/supabase.js      insert, offline queue, "not configured" fallback
  components/Question.jsx   radio / checkbox / 1–5 scale / text renderers
  pages/Home.jsx       three idea cards, one button per audience
  pages/Survey.jsx     draft autosave, progress bar, validation, submit
  pages/Done.jsx       thank-you + what happens to the data
  styles.css           one stylesheet, no UI framework
supabase/schema.sql    table, indexes, RLS policy, tally view
scripts/single-file.mjs  inlines the build into dist/standalone.html
```

- **Routing** is hash-based (`#/s/kisansetu/farmer`), so the single file and any static host
  work without server rewrites.
- **Drafts** are written to `localStorage` on every change and restored on reload, per audience.
- **Validation** marks every unanswered question, then scrolls to the first missing field.
- **Submit** inserts one row. If the network fails, the row is queued in `localStorage` and
  retried on the next visit; the thank-you page says which happened.
- **Two people, one phone?** Starting a new survey remounts the form — no answers leak across
  audiences. "Start fresh" clears the draft explicitly.
- **Accessibility**: real `fieldset`/`legend` + radio/checkbox inputs, visible focus rings,
  `prefers-reduced-motion` respected, 44px tap targets.
- No auth, no cookies, no analytics, no third-party scripts except the Google Fonts stylesheet
  (system fonts are used if it is blocked).

## Deploy

Any static host works.

- **Vercel / Netlify**: build command `npm run build`, output directory `dist`,
  add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as environment variables.
- **GitHub Pages / S3 / a shared folder**: upload `dist/` (or just `standalone.html`).

Keep the anon key public — that is what it is for. The RLS policy is what protects the data:
anonymous users can insert, and cannot select, update or delete.

## Editing the questionnaires

Everything lives in `src/data/surveys.js`:

```js
q('f3', 'single', 'Where do you sell most of your produce today?', 'आप अपनी ज़्यादातर फ़सल कहाँ बेचते हैं?', {
  options: [ o('mandi', 'Local mandi', 'स्थानीय मंडी'), /* … */ ],
})
```

Types: `single`, `multi`, `scale` (1–5 with end labels), `text`. Adding an option needs a unique
`value` and both languages. Adding a question needs a unique `id` — never reuse an id, or old
and new answers become indistinguishable in `answers->>'id'`.

To add a fourth idea, add an object to `SURVEYS` with `id`, `name`, `idea`, `accent`, `emoji`
and one or more `roles`; the home page, routing and database constraint list are the only
places to touch (add the new `id` to the `check` constraint in `supabase/schema.sql`).
