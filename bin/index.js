#!/usr/bin/env node


import chalk from "chalk";
import boxen from "boxen";
import yargs from "yargs/yargs";
import getAnswer from "./ai.js";

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
  .alias('a', 'all')
  .nargs('a', 1)
  .describe('a', 'List all')
  .demandOption(['a'])
  .help('h')
  .alias('h', 'help')
  .epilog('copyright 2019')
  .argv;

const qa = argv.a;

getAnswer(qa);


