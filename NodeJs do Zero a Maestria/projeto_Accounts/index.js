// modulos externos
const inquirer = require('inquirer')
const chalk = require('chalk')

// mdoulos internos
const fs = require('fs')

class account {
    accountName;

    initialization() {
        console.log(chalk.bgBlue.black("Seja bem vindo ao nosso banco!"))
        inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'O que você deseja fazer?',
                choices: [
                    'Logar em uma conta',
                    'Criar uma conta',
                    'Sair'
                ]
            }
        ])
            .then((answer) => {
                const action = answer['action'];

                switch (action) {
                    case 'Logar em uma conta':
                        login();
                        break;
                    case 'Criar uma conta':
                        break;
                    case 'Sair':
                        console.log(chalk.bgBlue.black('Obrigado por usar o Accounts!'))
                        process.exit()
                        break;
                }
            })
            .catch((err) => console.log(err))
    }

    login() {
        inquirer.prompt([
            {
                name: 'name',
                message: 'Digite o nome da conta em que deseja logar:'
            }
        ])
            .then((answer) => {
                this.accountName = answer['name'];
            })
            .catch(err => console.log(err));
    }

    operation() {
        inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'O que você deseja fazer?',
                choices: [
                    'Criar Conta',
                    'Consultar Saldo',
                    'Depositar',
                    'Sacar',
                    'Sair'
                ],
            }
        ])
            .then((answer) => {
                const action = answer['action']
                switch (action) {
                    case 'Criar Conta':
                        this.createAccount()
                        break;
                    case 'Consultar Saldo':
                        this.getAccountBalance()
                        break;
                    case 'Depositar':
                        this.deposit()
                        break;
                    case 'Sacar':
                        this.withdraw()
                        break;
                    case 'Sair':
                        console.log(chalk.bgBlue.black('Obrigado por usar o Accounts!'))
                        process.exit()
                        break;
                }
            })
            .catch((err) => console.log(err))
    }

    createAccount() {
        console.log(chalk.bgGreen.black('Parabéns por escolher o nosso banco!'))
        console.log(chalk.green('Defina as opções da sua conta a seguir'))
        this.buildAccount()
    }

    buildAccount() {
        inquirer.prompt([
            {
                name: 'accountName',
                message: 'Digite o nome da sua conta:'
            }
        ])
            .then((answer) => {
                const accountName = answer['accountName']
                if (!fs.existsSync('accounts')) {
                    fs.mkdirSync('accounts')
                }

                if (fs.existsSync(`accounts/${accountName}.json`)) {
                    console.log(
                        chalk.bgRed.black('Esta conta já existe, escolha outro nome!')
                    )
                    this.buildAccount()
                } else {
                    fs.writeFileSync(`accounts/${accountName}.json`, '{"balance":0}', function (err) { console.log(err) })

                    console.log(chalk.green('Parabéns, a sua conta foi criada!'))

                    this.operation()
                }
            })
            .catch((err) => console.log(err))
    }

    deposit() {
        inquirer.prompt([
            {
                name: 'accountName',
                message: 'Qual o nome da sua conta?'
            }
        ])
            .then((answer) => {
                const accountName = answer['accountName']
                    buildAccount()
                if (!this.checkAccount(accountName)) {
                    return this.deposit()
                }

                inquirer.prompt([
                    {
                        name: 'amount',
                        message: 'Quanto você deseja depositar'
                    }
                ])
                    .then((answer) => {
                        const amount = answer['amount']
                        addAmount(accountName, amount)
                        this.operation()
                    })
                    .catch((err) => console.log(err))
            })
            .catch((err) => console.log(err))
    }

    checkAccount(accountName) {
        if (!fs.existsSync(`accounts/${accountName}.json`)) {
            console.log(chalk.bgRed.black('Esta conta não existe, escolha outro nome!'))
            return false
        } else {
            return true
        }
    }

    addAmount(accountName, amount) {
        const accountData = this.getAccount(accountName);

        if (!amount) {
            console.log(chalk.bgRed.black("Ocorreu um erro, tente novamente mais tarde!"))
            return this.deposit()
        }

        accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)

        fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(accountData), function (err) { console.log(err) })

        console.log(chalk.green(`Foi depositado o valor de R$ ${amount} na sua conta`))
    }

    getAccount(accountName) {
        const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
            encoding: 'utf8',
            flag: 'r'
        })

        return JSON.parse(accountJSON);
    }

    getAccountBalance() {
        inquirer.prompt([
            {
                name: 'accountName',
                message: 'Qual o nome da sua conta:'
            }
        ])
            .then((answer) => {
                const accountName = answer['accountName']

                if (!this.checkAccount(accountName)) {
                    console.log(chalk.bgRed.black("Essa conta não existe, digite outro nome:"))
                    this.getAccountBalance()
                }

                const accountData = this.getAccount(accountName)

                console.log(chalk.bgBlue.black(
                    `Olá, o saldo da sua conta é de R$${accountData.balance}`
                ))

                this.operation()
            })
            .catch((err) => console.log(err))
    }

    withdraw() {
        inquirer.prompt([
            {
                name: 'accountName',
                message: 'Digite o nome da sua conta:'
            }
        ])
            .then((answer) => {
                const accountName = answer['accountName']

                if (!this.checkAccount(accountName)) {
                    return this.withdraw()
                }

                inquirer.prompt([
                    {
                        name: 'amount',
                        message: 'Quanto você deseja sacar?'
                    }
                ])
                    .then((answer) => {
                        const amount = answer['amount']


                        this.removeAmount(accountName, amount)

                    })
                    .catch((err) => console.log(err))
            })
            .catch((err) => console.log(err))
    }

    removeAmount(accountName, amount) {
        const accountData = this.getAccount(accountName)

        if (!amount) {
            console.log(chalk.bgRed.black("Ocorreu um erro, tente novamente mais tarde!"))
            return this.operation()
        }

        if (accountData.balance < amount) {
            console.log(chalk.bgRed.black('Valor indisponível!'))
            return this.withdraw()
        }

        accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)

        fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(accountData), function (err) { console.log(err) })

        console.log(chalk.green(`Foi sacado o valor de R$ ${amount} da sua conta`))

        this.operation()
    }
}

account = new account;
account.operation();