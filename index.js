const express = require('express')
const app = express()
const port = 3000

const cors = require('cors')
const { error } = require('node:console')
app.use(cors())

const urlCrawl = ["https://cmlabs.co", "https://sequence.day", "https://adityoarr.github.io/"]
const folderCrawled = ["cmlabs-", "sequence-", "adityoarr-"]

app.get('/', async (req, res) => {
    const axios = require("axios")
    const fs = require('node:fs');

    for (let i = 0; i < urlCrawl.length; i++) {

        const dateObject = new Date();
        const date = (`0 ${dateObject.getDate()}`).slice(-2);
        const month = (`0 ${dateObject.getMonth() + 1}`).slice(-2);
        const year = dateObject.getFullYear();
        const hours = dateObject.getHours();
        const minutes = dateObject.getMinutes();
        const seconds = dateObject.getSeconds();
        const timestamp = date + month + year + hours + minutes + seconds;

        const folderName = folderCrawled[i] + timestamp;

        try {
            const html = await axios.get(urlCrawl[i])

            if (!fs.existsSync(folderName)) {
                fs.mkdirSync(folderName);
            }
            fs.writeFileSync(folderName + "/index.html", html.data);
        } catch (err) {
            res.status(500)
            res.send("Error when crawling: " + urlCrawl[i])
        }
    }

    res.send('Crawling website sukses')
})

app.listen(port, () => {
    console.log(`app running at http://localhost:${port}`)
})
