const { JSDOM } = require('jsdom')

function getURLsFromHTML(htmlBody, baseURL){
    const urls = []
    const dom = new JSDOM(htmlBody)
    const aElements = dom.window.document.querySelectorAll('a')
    for (const aElement of aElements){
        if (aElement.href.slice(0,1) === '/'){
            try {
                const urlObj = new URL(`${baseURL}${aElement.href}`)
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

function normalizeURL(url){
    const urlObj = new URL(url)
    let fullPath = `${urlObj.host}${urlObj.pathname}`
    if (fullPath.length > 0 && fullPath.slice(-1) === '/'){
        fullPath = fullPath.slice(0, -1)
    }
    return fullPath
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
}