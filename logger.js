//importando o módulo de eventos
const EventEmitter = require('events')
//importando o módulo para gravar as informações no arquivo
const fs = require('fs')
//importando o módulo para pegar o arquivo exato no sistema
const path = require('path')

const emitter = new EventEmitter()

//adicionando qual irá ser o evento
emitter.on('log', (message)=> {
    fs.appendFile(path.join(__dirname, 'log.txt'), message, err => {
        if (err) throw err
    })
})

//emitindo qual irá ser o evento
function log(message){
    emitter.emit('log', message)
}

module.exports = log