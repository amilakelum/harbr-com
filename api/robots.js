export default async function handler(req, res) {
  const userAgent = req.headers["user-agent"] || '';
  const referer = req.headers.referer || '';

  // Track bot visit to Athena
  try {
    await fetch('https://cdn.athenahq.ai/api/robots', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 3f17f985-892c-4180-8b63-a6beaaafc0b7'
      },
      body: JSON.stringify({
        userAgent,
        referer,
        path: '/robots.txt'
      })
    });
  } catch (e) {
    console.error('Error tracking bot visit:', e);
  }

  // Return robots.txt content
  const robotsContent = `# www.robotstxt.org/
# Allow crawling of all content
User-agent: *
Allow: /

# Specifically allow LLM crawling bots to access specialized content
User-agent: GPTBot
Allow: /llm-content.txt
Allow: /

User-agent: Googlebot
Allow: /llm-content.txt
Allow: /

# Disallow admin pages from being indexed  
Disallow: /admin/

# Sitemap location
Sitemap: https://www.harbrapp.com/sitemap.xml`;

  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.status(200).send(robotsContent);
} 