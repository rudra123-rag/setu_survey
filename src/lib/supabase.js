import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/** True when .env has both Supabase values. Without them the app still works, locally. */
export const isConfigured = Boolean(url && anonKey);

export const supabase = isConfigured
  ? createClient(url, anonKey, { auth: { persistSession: false } })
  : null;

const QUEUE_KEY = 'ks.queue';

// crypto.randomUUID is missing on file:// in some browsers.
const uid = () => {
  try {
    if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  } catch {}
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
};

const readQueue = () => {
  try {
    return JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]');
  } catch {
    return [];
  }
};

const writeQueue = (rows) => {
  try {
    localStorage.setItem(QUEUE_KEY, JSON.stringify(rows));
  } catch {}
};

/** Sends everything that piled up while offline / unconfigured. */
export async function flushQueue() {
  if (!supabase) return 0;
  const rows = readQueue();
  if (!rows.length) return 0;
  const { error } = await supabase.from('responses').insert(rows);
  if (error) return 0;
  writeQueue([]);
  return rows.length;
}

/**
 * Saves one response.
 * Returns { status: 'saved' | 'queued' | 'local', id?, error? }.
 * 'local' means Supabase is not configured — the response stays on this device.
 */
export async function saveResponse(payload) {
  const row = {
    ...payload,
    user_agent: typeof navigator !== 'undefined' ? navigator.userAgent.slice(0, 400) : null,
  };

  if (!supabase) {
    const local = readQueue();
    local.push({ ...row, id: uid() });
    writeQueue(local);
    return { status: 'local' };
  }

  const { data, error } = await supabase.from('responses').insert(row).select('id').single();
  if (error) {
    const queued = readQueue();
    queued.push({ ...row, id: uid() });
    writeQueue(queued);
    return { status: 'queued', error: error.message };
  }
  flushQueue();
  return { status: 'saved', id: data?.id };
}

export const queueSize = () => readQueue().length;
