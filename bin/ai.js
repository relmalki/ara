import fetch from "node-fetch"
import chalk from "chalk";

export default function getAnswer(qa) {
    console.log(chalk.white.italic("Result upcoming for : "), chalk.white.bold(qa));
    fetch('https://relmalki.github.io/ara.github.io/data.json')
      .then((response) => response.json())
      .then(json => console.log(chalk.blueBright.underline.red(json.data[1].qas[1].answers[0].text)));
  
  }