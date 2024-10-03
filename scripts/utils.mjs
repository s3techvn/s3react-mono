import { spawn } from "node:child_process";
import * as log from "./log.mjs";

export function createName(name) {
  return `@s3react/${name}`;
}

export function isValidName(name) {
  if (typeof name !== 'string') {
    return false;
  }

  return name.toLowerCase().match(/^[a-z][a-z\d\.-_]+$/);
}

export function command(cmd, params) {
  return new Promise((resolve, reject) => {
    const shell = spawn(cmd, params, { shell: true });

    shell.on("exit", (code, ...rest) => {
      if (code === 0) {
        resolve();
      } else {
        reject(rest);
      }
    });

    shell.on("error", (error) => {
      reject(error);
    });

    shell.stdout.on("data", (data) => {
      const message = data.toString();
      log.breakLine();
      log.message(typeof message === "object" ? JSON.stringify(message, undefined, 2) : message.toString());
    });

    shell.stderr.on("data", (data) => {
      const message = data.toString();
      reject(typeof message === "object" ? JSON.stringify(message, undefined, 2) : message.toString());
    });
  });
}
