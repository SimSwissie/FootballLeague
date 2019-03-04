const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 2002
const db = require('./queries')
var cors = require('cors')
app.use(cors())
app.options('*',cors());


app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})


app.get('/klub', db.getKlub)
app.get('/trener', db.getTrener)
app.get('/trenerr', db.getTrener2)
app.get('/pilkarz', db.getPilkarz)
app.get('/sedzia', db.getSedzia)
app.get('/klub/:id', db.getKlubById)
app.get('/pilkarz/:id', db.getPilkarzById)
app.get('/statystyki', db.IDStatystyki)
app.get('/mecz', db.getMecz)
app.get('/tabela', db.getTabela)
app.post('/klub', db.createKlub)
app.post('/trener', db.createTrener)
app.post('/pilkarz', db.createPilkarz)
app.post('/termin', db.createTermin)
app.post('/gol', db.createGol)
app.post('/statystyki', db.createStatystyki)
app.post('/mecz', db.createMecz)
app.put('/klub/:id', db.updateKlub)
app.delete('/klub/:id', db.deleteKlub)


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})