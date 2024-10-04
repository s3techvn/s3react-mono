import * as fs from "fs";
import * as path from "path";
import * as log from "./log.mjs";
import * as utils from "./utils.mjs";
import * as reactTemplate from "./project/react/template.mjs";
import * as nextAppTemplate from "./project/next-app/template.mjs";
import * as nextPageTemplate from "./project/next-page/template.mjs";
import * as remixTemplate from "./project/remix/template.mjs";

const templates = ["react", "next-app", "next-page", "remix"];

const [,, template, projectName] = process.argv;

log.clear();

if (!utils.isValidName(projectName)) {
  log.error('Invalid project name');
  log.exit();
}

if (!templates.includes(template)) {
  log.error('Invalid template');
  log.exit();
}

const mergedName = utils.createName(projectName);
const projectDir = path.join(process.cwd(), 'projects');
const projectPath = path.join(projectDir, mergedName);

if (!fs.existsSync(projectDir)) {
  fs.mkdirSync(projectDir);
}

if (fs.existsSync(projectPath)) {
  log.error('Project already exists');
  log.exit();
}

const stacks = {
  react: {
    message: `Creating ReactJS project with name "\${PROJECT_NAME}"`,
    template: reactTemplate.template,
  },
  "next-app": {
    message: `Creating NextJS App Routing project with name "\${PROJECT_NAME}"`,
    template: nextAppTemplate.template,
  },
  "next-page": {
    message: `Creating NextJS Pages Routing project with name "\${PROJECT_NAME}"`,
    template: nextPageTemplate.template,
  },
  remix: {
    message: `Creating RemixJS project with name "\${PROJECT_NAME}"`,
    template: remixTemplate.template,
  },
};

const stack = stacks[template];

log.info(stack.message.replace(/\$\{PROJECT_NAME\}/gmi, mergedName));

Object.keys(stack.template).forEach((key) => {
  let content = stack.template[key];
  const filePath = path.join(projectPath, key);
  const isBinary = content.includes("base64,");

  const fileDir = path.dirname(filePath);
  fs.existsSync(fileDir) || fs.mkdirSync(path.dirname(filePath), { recursive: true });

  if (isBinary) {
    content = Buffer.from(content.split("base64,")[1], "base64");
  } else {
    content = content.replace(/\$\{PROJECT_NAME\}/gmi, mergedName);
  }

  fs.writeFileSync(filePath, content);
});

log.info('Project created');
log.info("Installation dependencies");

const params = [projectPath, "&&", "yarn"];
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
