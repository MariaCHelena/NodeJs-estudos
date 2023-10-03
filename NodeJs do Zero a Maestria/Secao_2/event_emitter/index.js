const events = require('events')
const eventEmitter = new events()

eventEmitter.on('start', () => {
  console.log("durante")
})

console.log("antes")

eventEmitter.emit('start')

console.log("depois")