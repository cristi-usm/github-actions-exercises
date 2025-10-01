const { hello } = require('./index');

describe('hello', () => {
  it('should return a greeting message', () => {
    expect(hello('GitHub')).toBe('Hello, GitHub.');
  });

  it('should work with different names', () => {
    expect(hello('World')).toBe('Hello, World.');
  });
});
