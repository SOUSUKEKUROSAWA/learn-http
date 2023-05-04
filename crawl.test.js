const { normalizeURL } = require('./crawl.js')
const { test, expect } = require('@jest/globals')

const expected = 'blog.boot.dev/path'

test('normalizeURL protocol', () => {
    const input = `https://${expected}`
    const actual = normalizeURL(input)
    expect(actual).toEqual(expected)
})

test('normalizeURL end-slash', () => {
    const input = `https://${expected}/`
    const actual = normalizeURL(input)
    expect(actual).toEqual(expected)
})

test('normalizeURL capitals', () => {
    const input = `https://${expected.replace(/[a-z]/, match => match.toUpperCase())}`
    const actual = normalizeURL(input)
    expect(actual).toEqual(expected)
})

test('normalizeURL http', () => {
    const input = `http://${expected}`
    const actual = normalizeURL(input)
    expect(actual).toEqual(expected)
})