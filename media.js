'use strict';
const crypto = require('crypto');

const TMDB_KEY = (process.env.TMDB_API_KEY || '').trim();
const hasTmdb = () => Boolean(TMDB_KEY);

const fold = s => String(s || '').toLowerCase().replace(/ı/g, 'i').normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '').replace(/[^\p{L}\p{N}\s]/gu, ' ').replace(/\s+/g, ' ').trim();

const cache = new Map();
const getC = k => { const h = cache.get(k); return h && h.exp > Date.now() ? h.v : undefined; };
const setC = (k, v, ms) => cache.set(k, { v, exp: Date.now() + ms });
const shuffle = a => { const x = [...a]; for (let i = x.length - 1; i > 0; i--) { const j = crypto.randomInt(i + 1); [x[i], x[j]] = [x[j], x[i]]; } return x; };

async function getJson(url, headers) {
  const c = new AbortController();
  const t = setTimeout(() => c.abort(), 6000);
  try {
    const r = await fetch(url, { signal: c.signal, headers });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return await r.json();
  } finally { clearTimeout(t); }
}

async function resolveSong(item) {
  const key = 's:' + item.id;
  const hit = getC(key);
  if (hit !== undefined) return hit;
  const a = fold(item.artist).split(' ')[0];
  const t = fold(item.title);
  let url = null;
  try {
    const j = await getJson('https://itunes.apple.com/search?media=music&entity=song&limit=15&country=TR&term=' + encodeURIComponent(item.artist + ' ' + item.title));
    const m = (j.results || []).find(r => r.previewUrl && fold(r.artistName).includes(a) && (fold(r.trackName).includes(t) || t.includes(fold(r.trackName))));
    if (m) url = m.previewUrl;
  } catch (e) {}
  if (!url) {
    try {
      const j = await getJson('https://api.deezer.com/search?limit=10&q=' + encodeURIComponent(`artist:"${item.artist}" track:"${item.title}"`));
      const m = (j.data || []).find(r => r.preview && fold(r.artist && r.artist.name).includes(a));
      if (m) url = m.preview;
    } catch (e) {}
  }
  if (url) setC(key, url, 3600e3); else setC(key, null, 120e3);
  return url;
}

async function resolveFilm(item, n = 5) {
  if (Array.isArray(item.images) && item.images.length >= 3) return shuffle(item.images).slice(0, n);
  if (!TMDB_KEY) return null;
  const key = 'f:' + item.id;
  let pool = getC(key);
  if (pool === undefined) {
    pool = null;
    try {
      const H = TMDB_KEY.startsWith('eyJ') ? { Authorization: 'Bearer ' + TMDB_KEY } : undefined;
      const k = H ? '' : '&api_key=' + TMDB_KEY;
      let id = item.tmdb;
      for (const q of [item.en, item.title]) {
        if (id || !q) continue;
        const j = await getJson(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(q)}&year=${item.year}${k}`, H);
        id = j.results && j.results[0] && j.results[0].id;
      }
      if (id) {
        const j = await getJson(`https://api.themoviedb.org/3/movie/${id}/images?include_image_language=null${k}`, H);
        const b = (j.backdrops || []).filter(x => !x.iso_639_1 && x.width >= 1000)
          .sort((x, y) => (y.vote_count || 0) - (x.vote_count || 0)).slice(0, 14);
        if (b.length >= 3) pool = b.map(x => 'https://image.tmdb.org/t/p/w1280' + x.file_path);
      }
    } catch (e) { pool = null; }
    setC(key, pool, pool ? 6 * 3600e3 : 300e3);
  }
  return pool ? shuffle(pool).slice(0, n) : null;
}

const PXUA = { 'User-Agent': 'ParitOdasi/1.0 (arkadaslar icin parti oyunu)' };
const PX_W = [20, 40, 60, 120];
const px = { ok: 0, fail: 0, checked: 0, running: false };
async function imgOk(url) {
  const c = new AbortController(); const t = setTimeout(() => c.abort(), 7000);
  try {
    const r = await fetch(url, { signal: c.signal, headers: PXUA });
    const ok = r.ok && /^image\//.test(r.headers.get('content-type') || '');
    await r.arrayBuffer().catch(() => {});
    return ok;
  } catch (e) { return false; } finally { clearTimeout(t); }
}
async function resolvePixel(item) {
  const key = 'p:' + item.title, hit = getC(key);
  if (hit !== undefined) return hit;
  let res = null;
  try {
    const j = await getJson('https://en.wikipedia.org/api/rest_v1/page/summary/' + encodeURIComponent(item.title.replace(/ /g, '_')), PXUA);
    const src = j.thumbnail && j.thumbnail.source;
    if (src && src.includes('/wikipedia/commons/') && /\/\d+px-/.test(src) && !/\.svg/i.test(src)) {
      const small = PX_W.map(w => src.replace(/\/\d+px-/, '/' + w + 'px-'));
      const oks = await Promise.all([...small, src].map(imgOk));
      if (oks.every(Boolean)) res = [...small, src];
      else if (oks[4]) res = [src, src, src, src, src];
    }
  } catch (e) { res = null; }
  setC(key, res, res ? 6 * 3600e3 : 600e3);
  return res;
}
async function pixelCheck(items) {
  if (px.running) return;
  px.running = true; px.ok = 0; px.fail = 0; px.checked = 0;
  const q = [...items];
  await Promise.all(Array.from({ length: 4 }, async () => {
    while (q.length) { const r = await resolvePixel(q.shift()); px[r ? 'ok' : 'fail']++; px.checked++; }
  }));
  px.running = false;
}
const pixelStats = () => ({ ...px });

module.exports = { fold, hasTmdb, resolveSong, resolveFilm, resolvePixel, pixelCheck, pixelStats };
