const http = require('http')
const fs = require('fs')
const formidable = require('formidable')
const { parse } = require('querystring')

const server = http.createServer(function (req, res) {
    if (req.url == "/") {
        fs.readFile('./views/index.html', 'utf-8', (err, data) => {
            res.statusCode = 200
            res.setHeader("Content-Type", "text/html")
            res.write(data)
            res.end()
        })
    }
    else if (req.url == '/fileupload' && req.method == "POST") {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // convert Buffer to string
        })

        req.on('end', () => {
            let data = parse(body)
            fs.appendFile('./test.txt',JSON.stringify(data) + ',', (err) => {
                if (err) throw err
                console.log("Save success")
            })
        })

        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            res.write('File uploaded');
            res.end();
            



        
    })
        

        
        
    };
}).listen(8080, () => {
        console.log(`Server starting: http://localhost:8080`);
    })