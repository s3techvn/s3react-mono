import * as fs from "fs";
import * as path from "path";
import * as log from "./log.mjs";
import * as utils from "./utils.mjs";

const [,, ...projectNames ] = process.argv;

if (!projectNames.length) {
  log.error('No project name provided');
  log.exit();
}

for (const projectName of projectNames) {
  const mergedName = utils.createName(projectName);
  const projectDir = path.join(process.cwd(), 'projects', mergedName);

  if (!fs.existsSync(projectDir)) {
    log.error(`Project "${projectName}" does not exists`);
    log.exit();
  }
}

for (const projectName of projectNames) {
  const mergedName = utils.createName(projectName);
  const projectDir = path.join(process.cwd(), 'projects', mergedName);

  fs.rmSync(projectDir, { recursive: true, force: true });
  log.info(`Project "${projectName}" removed`);
}

log.exit();
