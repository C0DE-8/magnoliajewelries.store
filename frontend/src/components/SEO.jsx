import { useEffect } from 'react'
export default function SEO({ title = 'Jewelry for your everyday, and your forever', description = 'Discover Magnolia Jewelries. Thoughtful gold pieces, luminous pearls, and little treasures for your everyday. Find a piece of yourself.', image = '/images/social-cover.jpg' }) {
  useEffect(() => {
    document.title = title + ' | Magnolia Jewelries'
    const values = { description, 'og:title': document.title, 'og:description': description, 'og:image': new URL(image, window.location.origin).href, 'og:url': window.location.href, 'twitter:title': document.title, 'twitter:description': description, 'twitter:image': new URL(image, window.location.origin).href }
    Object.entries(values).forEach(([key, value]) => { const el = document.querySelector('meta[' + (key.startsWith('og:') ? 'property' : 'name') + '="' + key + '"]'); if (el) el.setAttribute('content', value) })
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', window.location.origin + window.location.pathname)
  }, [title, description, image])
  return null
}

