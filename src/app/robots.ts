import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.stroda.club/'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/dashboard/',
          '/checkout/',
          '/auth/',
          '/login',
          '/apply-for-mentor',
        ],
      },
    ],
    sitemap: `${baseUrl}sitemap.xml`,
    host: baseUrl,
  }
} 