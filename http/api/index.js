const http = require('http')
const URL = require('url')
const fs = require('fs')
const path = require('path')

const data = require('./urls.json')

function writeFiled(cb){
    fs.writeFile(
        path.join(__dirname, "urls.json"),
        JSON.stringify(data, null, 2),
        err => {
            if(err) throw err

            cb(JSON.stringify({message: "ok"}))
        }
    )
}

http.createServer((req, res) => {
    //Para o cors do navegador não dar erro e a api permitir o acesso
    res.writeHead(200, {
        'Access-Control-Allow-Origin': '*'
    })

    const {name, url, del} = URL.parse(req.url, true).query
        
        // se não houver nenhuma url retorna o objeto json
        
    if(!name || !url)
        return res.end(JSON.stringify(data))

    if(del){
        data.urls = data.urls.filter(item => String(item.url) !== String(url))

        //se não colocarmos o return a aplicação irá continuar, retornando o create
        return writeFiled((message)=> res.end(message))
    }

    //inserindo a url
    data.urls.push({name, url})

    return writeFiled((message) => res.end(message))
    
}).listen(3000, ()=> console.log(('API is running')))