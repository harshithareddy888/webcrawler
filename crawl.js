export function getURLsFromHtml(html, baseURL) {
  const urls = [];
  const anchorRegex = /<a\s+[^>]*href=["']([^"']*)["']/gi;

  let match;
  while ((match = anchorRegex.exec(html)) !== null) {
    const href = match[1];

    // reject invalid URLs explicitly
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
    } catch {
      continue;
    }
  }

  return urls;
}

export function normalizeURL(urlString) {
  const urlObj = new URL(urlString);
  let hostPath = `${urlObj.hostname}${urlObj.pathname}`.toLowerCase();

  if (hostPath.endsWith('/')) {
    hostPath = hostPath.slice(0, -1);
  }

  return hostPath;
}
