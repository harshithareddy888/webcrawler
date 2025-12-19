import { normalizeURL, getURLsFromHtml } from './crawl.js'
import { test, expect } from '@jest/globals'
//this is a test suite
test('normalizeURL strip protocol', () => {
  const input = 'https://blog.boot.dev/path'
  expect(normalizeURL(input)).toEqual('blog.boot.dev/path')
})

test('normalizeURL strip trailing slash', () => {
  const input = 'https://blog.boot.dev/path/'
  expect(normalizeURL(input)).toEqual('blog.boot.dev/path')
})

test('normalizeURL capitals', () => {
  const input = 'https://BLOG.boot.dev/path/'
  expect(normalizeURL(input)).toEqual('blog.boot.dev/path')
})

test('normalizeURL strip http', () => {
  const input = 'http://blog.boot.dev/path/'
  expect(normalizeURL(input)).toEqual('blog.boot.dev/path')
})

test('getURLsFromHtml absolute', () => {
  const input = `
    <html>
      <body>
        <a href="https://blog.boot.dev/path/">A link</a>
      </body>
    </html>
  `
  const baseURL = 'https://blog.boot.dev/'
  const actual = getURLsFromHtml(input, baseURL)
  const expected = ['https://blog.boot.dev/path/']
  expect(actual).toEqual(expected)
})

test('getURLsFromHtml relative', () => {
  const input = `
    <html>
      <body>
        <a href="/path/">A link</a>
      </body>
    </html>
  `
  const baseURL = 'https://blog.boot.dev'
  const actual = getURLsFromHtml(input, baseURL)
  const expected = ['https://blog.boot.dev/path/']
  expect(actual).toEqual(expected)
})

test('getURLsFromHtml both', () => {
  const input = `
    <html>
      <body>
        <a href="https://blog.boot.dev/path1/">A link path1</a>
      </body>
      <body>
        <a href="/path2/">A link path2</a>
      </body>
    </html>
  `
  const baseURL = 'https://blog.boot.dev'
  const actual = getURLsFromHtml(input, baseURL)
  const expected = ['https://blog.boot.dev/path1/', 'https://blog.boot.dev/path2/']
  expect(actual).toEqual(expected)
})


test('getURLsFromHtml invalid', () => {
  const input = `
    <html>
      <body>
        <a href="invalid">Invalid URL</a>
      </body>
    </html>
  `
  const baseURL = 'https://blog.boot.dev'
  const actual = getURLsFromHtml(input, baseURL)
  const expected = []
  expect(actual).toEqual(expected)
})
