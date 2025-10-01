const chalk = require('chalk');

function hello(name) {
  return `Hello, ${chalk.red(name)}.`;
}

console.log(hello("GitHub"));

module.exports = { hello };
