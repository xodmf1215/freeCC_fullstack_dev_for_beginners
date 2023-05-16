const path = require('node:path/posix')
const express = require('express')
const webApp = express()
const port = 3000

webApp.use(express.static('public'))
/* 
webApp.use('/img', express.static(path.join(__dirname,'public/img')));

webApp.get('/img/:name',(req,res) => {
    res.sendFile(__dirname + '/public/img/' + req.params.name);
})
*/

webApp.get('/', (req, res) => {
    //res.sendFile('index.html', { root: __dirname + '/public/pages' })
    let options = {
        //root: __dirname,
        root: path.join(__dirname, 'public'),
    }
    res.sendFile('/pages/index.html', options, function (err) {
        if(err) {
            res.send('error')
            console.log(err.message)
        }
    });
})

webApp.post('/', (req,res) => {
    res.send('POST request to homepage');
})

webApp.listen(port, () => {
    console.log('app listening on port {port}')
})