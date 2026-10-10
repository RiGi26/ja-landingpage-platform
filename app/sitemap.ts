import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.webzoka.com'

  return [
    {
      url: base,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${base}/layanan/`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${base}/karya/`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/seluruh-layanan/`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${base}/pricing/`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/tentang-kami/`,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${base}/privacy/`,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${base}/terms/`,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
