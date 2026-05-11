const express = require("express")
const fs = require("fs/promises")
const app = express()

app.use(express.json())//middleware Pour Parser les requetes json

//GET
app.get("/",async (req,res) => {
    const raw = await fs.readFile("db.json","utf-8")
    const json = JSON.parse(raw)
    res.json({ "message" : json})
})

//POST
app.post("/ajout", async (req,res) => {
    const data = req.body
    const raw = await fs.readFile("db.json","utf-8")
    const db = JSON.parse(raw)
    db.todos.push(data)
    await fs.writeFile("db.json",JSON.stringify(db,null, 2))
    res.json({ "message": "Data ajouter en db avec success "})
})

//demarage du serveur en devellopement
//app.listen(3000,console.log("Le Serveur Ecoute sur Le Port 3000"))

// Pour La Production
module.exports = app
