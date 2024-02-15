
const regex = require('./../lib/regex');

test('regex.js exports the regex constants correctly', () => {
  // Check if regex is an object
  expect(typeof regex).toBe('object');

  // Check if regex has specific properties
  expect(regex).toHaveProperty('CURRENCY_FORMAT');
  expect(regex).toHaveProperty('CHARS_MAX_10');
  expect(regex).toHaveProperty('CHARS_MIN_10');
  // ... add more as needed
});

test('CURRENCY_FORMAT regex works correctly', () => {
  expect('1234'.match(regex.CURRENCY_FORMAT)).not.toBeNull();
  expect('abc'.match(regex.CURRENCY_FORMAT)).toBeNull();
});
