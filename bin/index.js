#!/usr/bin/env node


import chalk from "chalk";
import boxen from "boxen";
import yargs from "yargs/yargs";
import { listTask, addTask } from "./ai.js";

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
  .example('$0 ara -a foo.js', 'count the lines in the given file')
  .alias('a', 'add')
  .nargs('a', 1)
  .describe('a', 'Add task')
  .alias("l", "list")
  .nargs("l", 0)
  .describe("l", "list Tasks")
  .help('h')
  .alias('h', 'help')
  .epilog('copyright 2019')
  .argv;

const qa = argv.a;

if (argv.a != undefined)
  addTask(qa);
if (argv.l != undefined)
  listTask();


