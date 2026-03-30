import { getStore } from '@netlify/blobs';

const store = getStore('kingshot-planner');
const KEY = 'layout';

const defaultState = () => ({ slots: [], updatedAt: null });

const json = (statusCode, body) => ({
  statusCode,
  headers: {
    'content-type': 'application/json; charset=utf-8',
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET,POST,OPTIONS',
    'access-control-allow-headers': 'Content-Type,x-editor-key'
  },
  body: JSON.stringify(body)
});

export default async (request) => {
  if (request.method === 'OPTIONS') return json(200, { ok: true });

  if (request.method === 'GET') {
    const data = await store.get(KEY, { type: 'json' });
    return json(200, data || defaultState());
  }

  if (request.method === 'POST') {
    const requiredKey = process.env.EDITOR_KEY || '';
    const providedKey = request.headers.get('x-editor-key') || '';
    if (requiredKey && providedKey !== requiredKey) {
      return json(401, { error: 'Editor key non valida.' });
    }

    const payload = await request.json();
    const state = {
      slots: Array.isArray(payload?.slots) ? payload.slots : [],
      updatedAt: new Date().toISOString()
    };
    await store.setJSON(KEY, state, { consistency: 'strong' });
    return json(200, state);
  }

  return json(405, { error: 'Metodo non supportato.' });
};
