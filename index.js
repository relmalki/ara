#!/usr/bin/env node


import chalk from "chalk";
import boxen from "boxen";
import yargs from "yargs/yargs";
import { listTask, addTask, changeTaskStatus, deleteTask } from "./ai.js";

//const greetingV2 = `Hello, ${options.name}!`;

const greeting = chalk.white.bold("Hello, I'm ara cli ");
const log = console.log;

const boxenOptions = {
  padding: 1,
  margin: 1,
  borderStyle: "round",
  borderColor: "red",
  backgroundColor: "#555555"

};

const msgBox = boxen(greeting, boxenOptions);


var argv = yargs(process.argv.slice(2))
  .usage(msgBox + 'Usage: $0 <command> [options]')
  .command('ara', 'Il doit repondre à une question')
  .example('$0 -a "taskname"', 'add task')
  .example('$0 -c 1', 'complete task id 1')
  .alias('a', 'add')
  .nargs('a', 1)
  .describe('a', 'Add task')
  .alias("l", "list")
  .nargs("l", 0)
  .describe("l", "list Tasks")
  .alias("d", "delete")
  .nargs("d", 1)
  .describe("d", "delete Tasks")
  .alias("u", "uncomplete")
  .nargs("u", 1)
  .describe("u", "uncomplete Tasks")
  .help('h')
  .alias('h', 'help')
  .epilog('Redouane ELMALKI copyright 2021')
  .argv;

const qa = argv.a;
const complete = true;
const uncomplete = false;
if (argv.a != undefined)
  addTask(qa);
if (argv.l != undefined)
  listTask();
if (argv.c != undefined)
  changeTaskStatus(argv.c, complete);
if (argv.u != undefined)
  changeTaskStatus(argv.u,uncomplete);
if (argv.d != undefined)
  deleteTask(argv.d);

