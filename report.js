export function printReport(pages) {
    console.log("---- Crawl Report ----");
    const sortedPages = sortPages(pages);
    for (const sortedPage of sortedPages){
        const url = sortedPage[0]
        const hits = sortedPage[1]
        console.log(`Found ${hits} links to page: ${url}`);
    }
    console.log("---- End of Report ----");
}

export function sortPages(pages) {
  const pagesArr = Object.entries(pages);

  // sort ascending by count
  pagesArr.sort((a, b) => a[1] - b[1]);

  return pagesArr;
}
