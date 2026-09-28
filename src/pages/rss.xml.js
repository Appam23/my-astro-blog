const posts = Object.values(import.meta.glob('./posts/*.md', { eager: true }));

function formatDate(date) {
  return new Date(date).toISOString();
}

export async function GET() {
  const items = posts
    .sort((a, b) => new Date(b.frontmatter.pubDate) - new Date(a.frontmatter.pubDate))
    .map((post) => `
      <item>
        <title>${post.frontmatter.title}</title>
        <link>${new URL(post.url, 'https://appam-astro-blog.netlify.app').href}</link>
        <description>${post.frontmatter.description}</description>
        <pubDate>${formatDate(post.frontmatter.pubDate)}</pubDate>
      </item>
    `)
    .join('');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>My Astro Blog</title>
        <description>My learning blog</description>
        <link>https://appam-astro-blog.netlify.app/</link>
        ${items}
      </channel>
    </rss>`,
    {
      headers: {
        'Content-Type': 'application/xml',
      },
    }
  );
}