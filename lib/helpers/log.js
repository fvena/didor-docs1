/* eslint no-console: 0 */
const chalk = require('chalk'); // Colorea las salidas del terminal

module.exports = {
  brand: message => console.log(`${chalk.rgb(251, 80, 103)(message)}`),
  message: message => console.log(`${chalk.rgb(40, 164, 189)(message)}`),
  link: message => console.log(`${chalk.rgb(40, 164, 189).underline(message)}`),
  info: message => console.log(`${chalk.rgb(27, 131, 152)('ℹ')} ${chalk.gray('｢didor｣')}: ${message}`),
  error: message => console.log(`${chalk.rgb(27, 131, 152)('ℹ')} ${chalk.gray('｢didor｣')}: ${chalk.red('Error al generar la documentación:')}\n${message}\n\n`),
};
