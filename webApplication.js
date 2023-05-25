import express from "express";
import cors from "cors";
import reviews from "./api/reviews.route.js";
import { join } from 'path';

//const path = require('node:path/posix')
//const express = require('express')

// Express is a routing and middleware web framework that has minimal functionality of its own:
//   An Express application is essentially a series of middleware function calls.
// Middleware functions are functions that have access to the request object (req), the response object (res),
const webApp = express();
const port = 3000;

// Mounts the specified middleware function or functions at the specified path:
//  the middleware function is executed when the base of the requested path matches path.
// Middleware functions are executed sequentially, therefore the order of middleware inclusion is important.
webApp.use(cors());
webApp.use(express.json());
webApp.use("/test", (req,res) => res.status(200).json({hello: "hello"}));
webApp.use("/api/v1/reviews", reviews);
webApp.use(express.static('public'));
//webApp.use('/pages', express.static(join(__dirname,'public/pages')));
//webApp.use('/css', express.static(join(__dirname,'public/css')));
//webApp.use('/img', express.static(join(__dirname,'public/img')));
//webApp.use('/js', express.static(join(__dirname,'public/js')));
webApp.use("*", (req, res) => res.status(404).json({error: "not found"}));

export default webApp;

/* 
webApp.use('/img', express.static(path.join(__dirname,'public/img')));

webApp.get('/img/:name',(req,res) => {
    res.sendFile(__dirname + '/public/img/' + req.params.name);
})
*/

/*
// FRONTEND TEST ~ 2023.5.17.
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

 */