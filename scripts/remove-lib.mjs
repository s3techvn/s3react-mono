import * as fs from "fs";
import * as path from "path";
import * as log from "./log.mjs";
import * as utils from "./utils.mjs";

const [,, ...packageNames ] = process.argv;

if (!packageNames.length) {
  log.error('No pacakges\'s name provided');
  log.exit();
}

for (const packageName of packageNames) {
  const mergedName = utils.createName(packageName);
  const packageDir = path.join(process.cwd(), 'packages', mergedName);

  if (!fs.existsSync(packageDir)) {
    log.error(`Package "${packageName}" does not exists`);
    log.exit();
  }
}

for (const packageName of packageNames) {
  const mergedName = utils.createName(packageName);
  const packageDir = path.join(process.cwd(), 'packages', mergedName);

  fs.rmSync(packageDir, { recursive: true, force: true });
  log.info(`Package "${packageName}" removed`);
}

log.exit();
