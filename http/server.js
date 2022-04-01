const http = require('http')
const fs = require('fs')
const path = require('path')

http.createServer((req, res) => {
    const file = req.url === '/' ? 'index.html' : req.url
    const filePath = path.join(__dirname, 'public', file)
    const extname = path.extname(filePath)

    //definindo as extenções permitidas para o favicon não bloquear
    //a aplicação
    
    const allowedFIleTypes = ['.html', '.css', '.js']
    const allowed = allowedFIleTypes.find(item => item == extname )

    if(!allowed) return 


    fs.readFile(filePath, (err, content) => {
            if(err) throw err
    
            res.end(content)
        }
    )
}).listen(5000, ()=> console.log(('Server is running')))