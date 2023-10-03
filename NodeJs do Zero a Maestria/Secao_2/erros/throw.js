const x = '10'

//checar se x é um número
//caso não seja, o erro é lançado e o programa termina sua execução
if (!Number.isInteger(x)){
  throw new Error('O valor x não é um número inteiro!')
}

console.log("Continuando o programa")