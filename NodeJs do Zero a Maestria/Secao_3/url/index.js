const url = require('url')
const address = 'https://www.meusite.com.br/catalog?produtos=cadeira'
const parsedUrl = new url.URL(address)

console.log(parsedUrl.host) //retorna o domínio
console.log(parsedUrl.pathname) //retorna o caminho da url (nesse caso, seria o /catalog somente)
console.log(parsedUrl.search) //retorna o atributo de pesquisa da url
console.log(parsedUrl.searchParams) //retorna os parâmetros de busca
console.log(parsedUrl.searchParams.get('produtos'))