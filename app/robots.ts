import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/out/'],
    },
    sitemap: 'https://japanarena.com/sitemap.xml',
  }
}
