const { JSDOM } = require('jsdom')

async function crawlPage(baseURL, currentURL, pages) {
    // 別ドメインへの要求を拒否する
    const currentUrlObj = new URL(currentURL)
    const baseUrlObj = new URL(baseURL)
    if (currentUrlObj.hostname !== baseUrlObj.hostname) {
        return pages
    }

    // 既にクロールしたことのあるページへの要求を拒否し，アクセス数のカウントのみ行う
    const normalizedURL = normalizeURL(currentURL)
    if (pages[normalizedURL] > 0) {
        pages[normalizedURL]++
        return pages
    }

    pages[normalizedURL] = 1

    console.log(`actively crawling ${currentURL}`)

    try {
        const res = await fetch(currentURL)

        if (res.status > 399) {
            console.log(`STATUS-ERROR: ${res.status} on ${currentURL}`)
            return pages
        }

        const contentType = res.headers.get('content-type')
        if (!contentType.includes('text/html')) {
            console.log(`CONTENT-TYPE-ERROR: ${contentType}, text/html is required. (on ${currentURL})`)
            return pages
        }

        const htmlBody = await res.text()

        const nextURLs = getURLsFromHTML(htmlBody, baseURL)
        for (const nextURL of nextURLs) {
            pages = await crawlPage(baseURL, nextURL, pages)
        }
    } catch (err) {
        console.log(`FETCH-ERROR: ${err.message} on ${currentURL}`)
    }

    return pages
}

function getURLsFromHTML(htmlBody, baseURL) {
    const urls = []
    const dom = new JSDOM(htmlBody)
    const aElements = dom.window.document.querySelectorAll('a')
    for (const aElement of aElements) {
        if (aElement.href.slice(0, 1) === '/') {
            try {
                const urlObj = new URL(baseURL);
                urlObj.pathname = aElement.href;
                urls.push(urlObj.href)
            } catch (err) {
                console.log(`${err.message}: ${aElement.href}`)
            }
        } else {
            try {
                const urlObj = new URL(aElement.href)
                urls.push(urlObj.href)
            } catch (err) {
                console.log(`${err.message}: ${aElement.href}`)
            }
        }
    }
    return urls
}

function normalizeURL(url) {
    const urlObj = new URL(url)
    let fullPath = `${urlObj.host}${urlObj.pathname}`
    if (fullPath.length > 0 && fullPath.slice(-1) === '/') {
        fullPath = fullPath.slice(0, -1)
    }
    return fullPath
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage,
}