import { sortPages } from './report.js'
import { test, expect } from '@jest/globals'
//this is a test suite
test('sortPages 4 pages', () => {
  const input = { 'https://wagslane.dev/path': 3, 'https://wagslane.dev/': 1,'https://wagslane.dev/path2': 9, 'https://wagslane.dev/path3': 7}
  expect(sortPages(input)).toEqual([['https://wagslane.dev/', 1], ['https://wagslane.dev/path', 3], ['https://wagslane.dev/path3', 7], ['https://wagslane.dev/path2', 9]])
})
