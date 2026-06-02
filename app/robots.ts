import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/out/'],
    },
    sitemap: 'https://japanarenacorp.com/sitemap.xml',
  }
}
