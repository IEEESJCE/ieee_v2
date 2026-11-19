import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  OG_IMAGE,
  SITE_NAME,
  absoluteUrl,
  buildStructuredData,
  getRouteMeta,
} from '../data/seo.js'

function upsertMeta(attribute, key, content) {
  if (!content) return
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

function upsertLink(rel, href) {
  let element = document.head.querySelector(`link[rel="${rel}"]`)
  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    document.head.appendChild(element)
  }
  element.setAttribute('href', href)
}

export default function SeoManager() {
  const location = useLocation()

  useEffect(() => {
    const meta = getRouteMeta(location.pathname)
    const image = absoluteUrl(OG_IMAGE)

    document.title = meta.title
    upsertMeta('name', 'description', meta.description)
    upsertMeta('name', 'robots', meta.noindex ? 'noindex, nofollow' : 'index, follow')
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:site_name', SITE_NAME)
    upsertMeta('property', 'og:title', meta.ogTitle ?? meta.title)
    upsertMeta('property', 'og:description', meta.description)
    upsertMeta('property', 'og:url', meta.canonical)
    upsertMeta('property', 'og:image', image)
    upsertMeta('property', 'og:image:width', '1200')
    upsertMeta('property', 'og:image:height', '630')
    upsertMeta('property', 'og:image:alt', meta.h1)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', meta.ogTitle ?? meta.title)
    upsertMeta('name', 'twitter:description', meta.description)
    upsertMeta('name', 'twitter:image', image)
    upsertLink('canonical', meta.canonical)

    let script = document.getElementById('page-structured-data')
    if (!script) {
      script = document.createElement('script')
      script.id = 'page-structured-data'
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(buildStructuredData(meta))
  }, [location.pathname])

  return null
}
