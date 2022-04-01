//importando o módulo os que traz informações do sistema 
const os = require('os')
const log = require('./logger')

setInterval(() => {
    //desestruturando para trazer as funções que trazem as informações de memória do sistema
    const { freemem, totalmem} = os

    const total = parseInt(totalmem() / 1024 /1024)
    const mem = parseInt(freemem()/ 1024 / 1024)
    const percents = parseInt((mem / total) * 100)

    const stats = {
        free: `${mem} MB`,
        total: `${total} MB`,
        usage: `${percents}%`
    }

    console.clear()
    console.table(stats)

    log(`${JSON.stringify(stats)}\n`)

}, 1000)


