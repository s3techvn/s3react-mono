import chalk from "chalk";

const green = chalk.green;
const red = chalk.red;
const yellow = chalk.yellow;
const blue = chalk.blue;
const cyan = chalk.cyan;
const gray = chalk.gray;

const NAME = green("≫ s3react");
const ERROR = red("[ ERROR ]");
const RUN = yellow("[ RUN ]");
const INSTALL = cyan("[ INSTALL ]");
const INFO = blue("[ INFO ]");
const MESSAGE = blue("[ MESSAGE ]");

function fulFill(str, length = 10) {
  return str.padEnd(length, "&nbsp;");
}

export function clear() {
  console.clear();
}

export function command(cmd) {
  console.log(`${NAME} ${fulFill(RUN)} ${gray(cmd)}`);
}

export function error(message) {
  console.log(`${NAME} ${ERROR} ${red(message)}`);
}

export function breakLine() {
  console.log();
}

export function installing() {
  let dots = "";
  return setInterval(() => {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    dots += ".";

    if (dots.length > 3) {
      dots = "";
    }

    const message = `Installing dependencies${dots}`;
    process.stdout.write(`${NAME} ${INSTALL} ${gray(message)}`);
  }, 500);
}

export function exit() {
  console.log(`${NAME} exit`);
  breakLine();
  process.exit(0);
}

export function info(message) {
  console.log(`${NAME} ${INFO} ${gray(message)}`);
}

export function message(message) {
  console.log(`${NAME} ${MESSAGE} ${message}`);
}
