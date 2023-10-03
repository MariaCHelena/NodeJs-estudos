// Não era essa a tarefa que era pra fazer, eu me distraí askdaksdfjadfk

const chalk = require('chalk')

const inquirer = require("inquirer")

inquirer.prompt([
  {
    name: 'p1',
    message: 'Qual a primeira nota? ',
  },
  {
    name: 'p2',
    message: 'Qual a segunda nota? ',
  },
  {
    name: 'p3',
    message: 'Qual a terceira nota?',
  }
])
.then((answers) => {
  const media = (parseInt(answers.p1) + parseInt(answers.p2))/2
  let mencao = (media >= 9? 'SS' : media >= 7? 'MS' : media >= 5? 'MM' : media >= 3? 'MI' : 'SR')
  console.log(chalk.bold(`Média das notas: `) + chalk.bold.red(media))
  console.log(chalk.bold(`Menção final: `) + chalk.bold.red(mencao))
  console.log(chalk.bold.blue("RESULTADO FINAL:"))
  if(media >= 5){
    console.log(chalk.green("Parabéns, você foi aprovado na disciplina!"))
  } else {
    console.log(chalk.red("Infelizmente, você não foi aprovado nesta disciplina."))
  }
})
.catch(err => console.log(err))