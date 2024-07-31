#!/usr/bin/env node

import chalk from "chalk";
import boxen from "boxen";
import yargs from "yargs/yargs";
import { listTask, addTask, changeTaskStatus, deleteTask } from "./ai.js";

// const greetingV2 = `Hello, ${options.name}!`;

const greeting = chalk.white.bold("Hello, I'm ara cli");
const log = console.log;

const boxenOptions = {
  padding: 1,
  margin: 1,
  borderStyle: "round",
  borderColor: "red",
  backgroundColor: "#555555"
};

const msgBox = boxen(greeting, boxenOptions);

const argv = yargs(process.argv.slice(2))
  .usage(msgBox + 'Usage: $0 <command> [options]')
  .command('add', 'Add a task')
  .command('list', 'List all tasks')
  .command('complete', 'Complete a task')
  .command('uncomplete', 'Mark a task as uncompleted')
  .command('delete', 'Delete a task')
  .example('$0 -a "taskname"', 'Add a task')
  .example('$0 -c 1', 'Complete task with id 1')
  .alias('a', 'add')
  .nargs('a', 1)
  .describe('a', 'Add a task')
  .alias("l", "list")
  .nargs("l", 0)
  .describe("l", "List all tasks")
  .alias("d", "delete")
  .nargs("d", 1)
  .describe("d", "Delete a task")
  .alias("c", "complete")
  .nargs("c", 1)
  .describe("c", "Complete a task")
  .alias("u", "uncomplete")
  .nargs("u", 1)
  .describe("u", "Mark a task as uncompleted")
  .help('h')
  .alias('h', 'help')
  .epilog('Redouane ELMALKI copyright 2021')
  .argv;

const qa = argv.a;
const complete = true;
const uncomplete = false;

if (argv.a !== undefined) {
  addTask(qa);
}
if (argv.l !== undefined) {
  listTask();
}
if (argv.c !== undefined) {
  changeTaskStatus(argv.c, complete);
}
if (argv.u !== undefined) {
  changeTaskStatus(argv.u, uncomplete);
}
if (argv.d !== undefined) {
  deleteTask(argv.d);
}

