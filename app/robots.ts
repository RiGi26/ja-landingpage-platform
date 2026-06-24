import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/out/'],
    },
    sitemap: 'https://www.webzoka.com/sitemap.xml',
  }
}
