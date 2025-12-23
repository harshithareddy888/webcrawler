
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

export async function crawlPage(currentURL) {
  console.log("Crawling:", currentURL);
  try {
    const resp = await fetch(currentURL);
    if (resp.status > 399) {
      console.error("Error fetching page:", resp.status, "on URL:", currentURL);
      return;
    }
    const contentType = resp.headers.get("content-type");
    if(!contentType.includes("text/html")){
      console.error("Non-HTML content type:", contentType, "on URL:", currentURL);
      return;
    }
    console.log(await resp.text());
  } catch (err) {
    console.error("Error fetching page:", err.message, "on URL:", currentURL);
  }
}