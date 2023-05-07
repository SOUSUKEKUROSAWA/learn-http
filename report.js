const URL_INDEX = 0
const ACCESS_COUNT_INDEX = 1

function printReport(pages) {
    console.log('==========')
    console.log('REPORT')
    console.log('==========')
    const sortedPages = sortPages(pages)
    for (const sortedPage of sortedPages) {
        console.log(`Found ${sortedPage[ACCESS_COUNT_INDEX]} internal links to ${sortedPage[URL_INDEX]}`)
    }
}

function sortPages(pages) {
    const pagesArr = Object.entries(pages)

    // >0: pageB -> pageA, <0: pageA -> pageB
    pagesArr.sort((pageA, pageB) => pageB[ACCESS_COUNT_INDEX] - pageA[ACCESS_COUNT_INDEX])

    return pagesArr
}

module.exports = {
    sortPages,
    printReport,
}