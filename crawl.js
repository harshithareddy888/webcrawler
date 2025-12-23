
export function normalizeURL(urlString) {
  const urlObj = new URL(urlString);
  let hostPath = `${urlObj.hostname}${urlObj.pathname}`.toLowerCase();

  if (hostPath.endsWith('/')) {
    hostPath = hostPath.slice(0, -1);
  }

  return hostPath;
}

export function getURLsFromHtml(html, baseURL) {
  const urls = [];
  const anchorRegex = /<a\s+[^>]*href=["']([^"']*)["']/gi;

  let match;
  while ((match = anchorRegex.exec(html)) !== null) {
    const href = match[1];

    if (
      href.startsWith('mailto:') ||
      href.startsWith('javascript:') ||
      (!href.startsWith('/') && !href.startsWith('http'))
    ) {
      continue;
    }

    try {
      const urlObj = new URL(href, baseURL);
      urls.push(urlObj.href);
    } catch {}
  }

  return urls;
}

export async function crawlPage(baseURL,currentURL,pages) {
  const baseURLObj = new URL(baseURL);
  const currentURLObj = new URL(currentURL);
  if (baseURLObj.hostname !== currentURLObj.hostname) {
    return pages
  }

  const normalizeCurrentURL = normalizeURL(currentURL);
  if(pages[normalizeCurrentURL] > 0){
    pages[normalizeCurrentURL]++;
    return pages;
  }

  pages[normalizeCurrentURL] = 1;
  console.log("Crawling:", currentURL);

  try {
    const resp = await fetch(currentURL);
    if (resp.status > 399) {
      console.error("Error fetching page:", resp.status, "on URL:", currentURL);
      return pages;
    }
    const contentType = resp.headers.get("content-type");
    if(!contentType.includes("text/html")){
      console.error("Non-HTML content type:", contentType, "on URL:", currentURL);
      return pages;
    }
    const html = await resp.text();
    const nextURLs = getURLsFromHtml(html, baseURL);
    for (const nextURL of nextURLs) {
      pages = await crawlPage(baseURL, nextURL, pages);
    }
    return pages;

  } catch (err) {
    console.error("Error fetching page:", err.message, "on URL:", currentURL);
  }
}