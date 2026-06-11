const express = require("express");
const fs = require('fs');
const { Json } = require("sequelize/lib/utils");
const cors = require("cors")
const app = express()
const password = process.env.PASSWORD;

const time = function () {
    const now = new Date();

    const year = now.getFullYear();


    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const monthName = monthNames[now.getMonth()];
    const monthNumber = now.getMonth() + 1;

    const date = now.getDate();



    const hours = now.getHours();
    const minutes = now.getMinutes();

    return ` ${date} / ${monthName} / ${year}. Time: ${hours}:${minutes}`
}




app.use('/xss', cors())
app.get("/xss", (req, res) => {
    data = {
        ip: req.ip,
        host: req.hostname,
        is_async: req.xhr, //will return True if the request made with xhr or fetch 
        path: req.path,
        method: req.method
    }
    fs.writeFile('./ServerLogs.txt', `connection ! : method : ${data.method}/ ip : ${data.ip} / url : ${data.host}${data.path} / is_xhr : ${data.is_async} / {${time()}} \n<br>`, { flag: "a", encoding: "utf-8" }, () => { })
    fs.writeFile('./ServerLogs.txt', '_______________\n<br>', { flag: "a", encoding: "utf-8" }, () => { })
    res.end()

})
app.post('/xss', (req, res) => {
    data = {
        ip: req.ip,
        host: req.hostname,
        is_async: req.xhr, //will return True if the request made with xhr or fetch 
        path: req.path,
        method: req.method

    }
    fs.writeFile('./ServerLogs.txt', `connection ! : method : ${data.method}/ ip : ${data.ip} / url : ${data.host}${data.path} / is_xhr : ${data.is_async} / {${time()}} \n`, { flag: "a", encoding: "utf-8" }, () => { })
    fs.writeFile('./ServerLogs.txt', '_______________\n', { flag: "a", encoding: "utf-8" }, () => { })
    res.end()

})
app.put('/xss', (req, res) => {
    data = {
        ip: req.ip,
        host: req.hostname,
        is_async: req.xhr, //will return True if the request made with xhr or fetch 
        path: req.path,
        method: req.method,
    }
    fs.writeFile('./ServerLogs.txt', `connection ! : method : ${data.method}/ ip : ${data.ip} / url : ${data.host}${data.path} / is_xhr : ${data.is_async} / {${time()}} \n<br>`, { flag: "a", encoding: "utf-8" }, () => { })
    fs.writeFile('./ServerLogs.txt', '_______________\n<br>', { flag: "a", encoding: "utf-8" }, () => { })
    res.end()
})



//admin routes :
app.get('/deleteAllLogs/:pass', (req, res) => {
    if (req.params.pass == password) {
        fs.writeFile('./ServerLogs.txt', `------last delete ${time()}------<br>`, { flag: "w", encoding: "utf-8" }, () => { })
        res.end()
    } else {
        res.end()
    }
})
app.get("/getAllLogs/:pass", (req, res) => {
    if (req.params.pass == password) {

        function showLogs() {
            let b = fs.readFileSync("./ServerLogs.txt", "utf8", () => { })
            return b;
        }

        let data = showLogs();
        res.send(data)
        res.end()
    } else {
        res.end('pass is bad')
    }
})

app.listen('9001', () => {
    console.log("listening on port 9001")
})
