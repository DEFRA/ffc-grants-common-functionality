
const { LIST_COUNTIES } = require('./../lib/all-counties')

test('all-counties.js exports the LIST_COUNTIES array correctly', () => {
  // Check if LIST_COUNTIES is an array
  expect(Array.isArray(LIST_COUNTIES)).toBe(true);

  // Check if LIST_COUNTIES has a specific length
  expect(LIST_COUNTIES.length).toBeGreaterThan(0);

  // Check if LIST_COUNTIES includes a specific county
  expect(LIST_COUNTIES).toContain('Berkshire');
});