/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
const axios = require('axios');
const prettier = require('prettier');

const getDate = new Date().toISOString();

const fetchUrl = `https://api.metabusstation.shop/api/v1/posts?category=_&keyword=&size=1000&page=`;
const MY_DOMAIN = 'https://modumeta.com';

const formatted = (sitemap) => prettier.format(sitemap, { parser: 'html' });
(async () => {
  const fetchPosts = await axios.get(fetchUrl);

  const postList = [];
  fetchPosts.data.content.forEach((post) => postList.push(post.id));
  const postListSitemap = `
        ${postList
          .map((id) => {
            return `
                <url>
                    <loc>${`${MY_DOMAIN}/community/post/${id}`}</loc>
                    <lastmod>${getDate}</lastmod>
                </url>
            `;
          })
          .join('')}
    `;

  const generateSitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset
            xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
        >
            ${postListSitemap}
        </urlset>
    `;
  const formattedSitemap = formatted(generateSitemap);

  fs.writeFileSync('../public/sitemap/sitemap-posts.xml', formattedSitemap, 'utf8');
})();
