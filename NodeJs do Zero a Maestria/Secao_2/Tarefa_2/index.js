const chalk = require('chalk')
const inquirer = require('inquirer')

inquirer.prompt([
  {
    name: 'nome',
    message: 'Digite o seu nome: '
  },
  {
    name: 'idade',
    message: 'Digite a sua idade: '
  },
])
.then((answers) => {
  const nome = answers.nome;
  const idade = answers.idade;
  console.log(chalk.bgYellow.black(`O nome do usuário é ${nome} e sua idade é ${idade}`))
})
.catch(err => console.log(err))