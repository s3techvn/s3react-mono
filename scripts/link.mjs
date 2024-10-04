import * as fs from "fs";
import * as path from "path";
import * as utils from "./utils.mjs";
import * as log from "./log.mjs";

const [,, packageName, projectName] = process.argv;

log.clear();

if (!utils.isValidName(packageName)) {
  log.error('Invalid package name');
  log.exit();
}

if (!utils.isValidName(projectName)) {
  log.error('Invalid project name');
  log.exit();
}

const mergedPackage = utils.createName(packageName);
const mergedProject = utils.createName(projectName);

const packagePath = path.join(process.cwd(), 'packages', mergedPackage);
const projectPath = path.join(process.cwd(), 'projects', mergedProject);

if (!fs.existsSync(packagePath)) {
  log.error('Package does not exists');
  log.exit();
}

if (!fs.existsSync(projectPath)) {
  log.error('Project does not exists');
  log.exit();
}

const packageJson = JSON.parse(fs.readFileSync(path.join(projectPath, 'package.json'), 'utf8'));
packageJson.dependencies = packageJson.dependencies || {};
packageJson.dependencies[mergedPackage] = `../../../packages/${mergedPackage}`;
fs.writeFileSync(path.join(projectPath, 'package.json'), JSON.stringify(packageJson, null, 2));

const params = [projectPath, "&&", "yarn"];
log.command(`cd ./projects/${mergedProject} && yarn`);

const interval = log.installing();

utils.command("cd", params)
  .then(() => {
    clearInterval(interval);
    log.info('Package linked');
    log.exit();
  })
  .catch((e) => {
    clearInterval(interval);
    log.error('Failed to link package');
    log.error(e);
    log.exit();
  });
