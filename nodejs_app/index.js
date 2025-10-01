function hello(name) {
  return `Hello, ${name}.`;
}

console.log(hello("GitHub"));

// This unused function will cause linting to fail
function badFunc() {
  console.log("I'm not going to get used.");
}

module.exports = { hello };
