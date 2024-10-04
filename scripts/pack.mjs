import * as fs from "fs";
import * as path from "path";
import * as log from "./log.mjs";
import * as utils from "./utils.mjs";
import * as twTemplate from "./package/tw/template.mjs";
import * as jsTemplate from "./package/js/template.mjs";

const [,, template, packageName] = process.argv;

const templates = ["tw", "js"];

log.clear();

if (!utils.isValidName(packageName)) {
  log.error('Invalid package name');
  log.exit();
}

if (!templates.includes(template)) {
  log.error('Invalid template');
  log.exit();
}

const mergedName = utils.createName(packageName);
const packageDir = path.join(process.cwd(), 'packages');
const packagePath = path.join(packageDir, mergedName);

if (!fs.existsSync(packageDir)) {
  fs.mkdirSync(packageDir);
}

if (fs.existsSync(packagePath)) {
  log.error('Package already exists');
  log.exit();
}

const stacks = {
  tw: {
    message: `Creating Tailwind package with name "\${PACKAGE_NAME}"`,
    template: twTemplate.template,
  },
  js: {
    message: `Creating JavaScript package with name "\${PACKAGE_NAME}"`,
    template: jsTemplate.template,
  },
};


const stack = stacks[template];

log.info(stack.message.replace(/\$\{PACKAGE_NAME\}/gmi, mergedName));

Object.keys(stack.template).forEach((key) => {
  let content = stack.template[key];
  const filePath = path.join(packagePath, key);
  const isBinary = content.includes("base64,");

  const fileDir = path.dirname(filePath);
  fs.existsSync(fileDir) || fs.mkdirSync(path.dirname(filePath), { recursive: true });

  if (isBinary) {
    content = Buffer.from(content.split("base64,")[1], "base64");
  } else {
    content = content.replace(/\$\{PACKAGE_NAME\}/gmi, mergedName);
  }

  fs.writeFileSync(filePath, content);
});

log.info('Package created');
log.info("Installation dependencies");

const params = [packagePath, "&&", "yarn"];
log.command(`cd ./projects/${mergedName} && yarn`);

const interval = log.installing();

utils.command("cd", params)
  .then(() => {
    clearInterval(interval);
    log.info("Dependencies installed");
    log.exit();
  })
  .catch((e) => {
    clearInterval(interval);
    log.error("Failed to install dependencies");
    log.error(e);
    log.exit();
  });
