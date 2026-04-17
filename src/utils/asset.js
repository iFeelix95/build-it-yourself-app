/**
 * Prepends Vite's BASE_URL to asset paths so they work both
 * in local dev (/) and on GitHub Pages (/build-it-yourself-app/).
 *
 * Usage:  asset('/icons/foo.png')  →  '/build-it-yourself-app/icons/foo.png'
 */
export function asset(path) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  return `${base}${path}`
}
