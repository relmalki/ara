import fetch from "node-fetch";
import chalk from "chalk";
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url";

import { Low } from "lowdb";
import { JSONFile } from "lowdb/node"

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'db.json');

const adapter = new JSONFile(file);
const db = new Low(adapter);


export async function addTask(qa) {

  await db.read()

  // If db.json doesn't exist, db.data will be null
  // Use the code below to set default data
  // db.data = db.data || { posts: [] } // For Node < v15.x
  db.data ||= { tasks: [] }             // For Node >= 15.x

  db.data.tasks.push({ "id": db.data.tasks.length + 1, "name": qa, "completed": false });

  // Finally write db.data content to file
  await db.write()

  console.log(chalk.white.italic("Task "), chalk.white.bold(qa), chalk.white.italic(" created"));
}

export async function completeTask(id) {

  await db.read()

  // If db.json doesn't exist, db.data will be null
  // Use the code below to set default data
  // db.data = db.data || { posts: [] } // For Node < v15.x
  db.data ||= { tasks: [] }             // For Node >= 15.x

  for (const key in db.data) {
    if (Object.hasOwnProperty.call(db.data, key)) {
      const taskList = db.data[key];

      for (const key in taskList) {
        if (Object.hasOwnProperty.call(taskList, key)) {
          const task = taskList[key];

          if (task.id == id) {
            db.data.tasks.splice(key,1); // 2nd parameter means remove one item only
            db.data.tasks.push({ "id": id, "name": task.name, "completed": true });
          
          }
        }

      }
    }
  }

  // Finally write db.data content to file
  await db.write()

  console.log(chalk.white.italic("Task "), chalk.white.bold("qa"), chalk.white.italic(" completed"));
}
export async function listTask() {

  await db.read()

  // If db.json doesn't exist, db.data will be null
  // Use the code below to set default data
  // db.data = db.data || { posts: [] } // For Node < v15.x
  db.data ||= { tasks: [] }             // For Node >= 15.x

  console.log(chalk.white.italic("Listing ..."));

  for (const key in db.data) {
    if (Object.hasOwnProperty.call(db.data, key)) {
      const taskList = db.data[key];

      for (const key in taskList) {
        if (Object.hasOwnProperty.call(taskList, key)) {
          const task = taskList[key];
          if (task.completed)
            console.log(chalk.blue.bold.underline(task.id) + ". " + chalk.bgGreenBright.italic.blue.bold(task.name));
          else
            console.log(chalk.blue.bold.underline(task.id) + ". " + chalk.bgWhite.bold(task.name));
        }
        console.log(chalk.blue("------------------------------------------------"))
      }

    }
  }


}