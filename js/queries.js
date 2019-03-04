
const Pool = require('pg').Pool
const pool = new Pool({
  user: '****',
  host: '****',
  database: '***',
  password: '***',
  port: 5432,
})
pool.connect();

const getKlub = (request, response) => {
  pool.query('SELECT id_klub,nazwa,miasto,imie,nazwisko FROM api.klub JOIN api.trener on api.klub.id_trener = api.trener.id_trener ORDER BY id_klub ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getTabela = (request, response) => {
  pool.query('select * from api.TABELA_VIEW', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getMecz = (request, response) => {
  pool.query('select a.nazwa gospodarz,gole_gospodarz,gole_gosc, b.nazwa gosc from api.klub a, api.klub b, api.mecz where a.nazwa != b.nazwa and api.mecz.id_gospodarz=a.id_klub and api.mecz.id_gosc=b.id_klub GROUP BY gospodarz,gole_gospodarz,gole_gosc,gosc ORDER BY sum(gole_gospodarz) DESC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getTrener2 = (request, response) => {
  pool.query('SELECT imie,nazwisko FROM api.trener ORDER BY api.trener.id_trener ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getTrener = (request, response) => {
  pool.query('SELECT imie,nazwisko,nazwa FROM api.trener join api.klub on api.klub.id_trener=api.trener.id_trener ORDER BY api.trener.id_trener ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}



const getPilkarz = (request, response) => {
  pool.query('SELECT * FROM api.pilkarz ORDER BY id_pilkarz ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getSedzia = (request, response) => {
  pool.query('SELECT * FROM api.sedzia ORDER BY id_sedzia ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const IDStatystyki = (request, response) => {
  pool.query("SELECT currval(pg_get_serial_sequence('public.api.statystyki', 'id_statystyki'))", (error, result) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}


const getKlubById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM api.klub WHERE id_klub = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getPilkarzById = (request, response) => {
    var id = new String();
   id  = request.params.id;

  pool.query('SELECT * FROM api.pilkarz join api.klub on api.klub.nazwa=$1 and api.klub.id_klub=api.pilkarz.id_klub ORDER BY api.pilkarz.pozycja', [id], (error, results) => {
    if (error) {
      throw error
    }
       response.status(200).json(results.rows)
  })
}

const createKlub = (request, response) => {
  const { nazwa, miasto, trener } = request.body

  pool.query('INSERT INTO api.klub (id_trener, nazwa, miasto,zwyciestwa,remisy,porazki,liczba_punktow) select id_trener, $1,$2,0,0,0,0 from api.trener where api.trener.nazwisko=$3', [nazwa, miasto,trener], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.insertId}`)
  })
}

const createTrener = (request, response) => {
  const { imieTrener, nazwiskoTrener } = request.body

  pool.query("insert into api.trener (imie,nazwisko) values($1,$2)", [imieTrener, nazwiskoTrener], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.insertId}`)
  })
}

const createStatystyki = (request, response) => {
  const { kartki_czerwone, kartki_zolte, faule, spalone, posiadanie_gospodarz, posiadanie_gosc } = request.body

  pool.query("insert into api.statystyki (kartki_czerwone, kartki_zolte, faule, spalone, posiadanie_gospodarz,posiadanie_gosc) values($1,$2, $3, $4, $5, $6) returning id_statystyki", [kartki_czerwone, kartki_zolte, faule, spalone, posiadanie_gospodarz, posiadanie_gosc], (error, results) => {
    if (error) {
      throw error
    }
    else{
    var newStats = results.rows[0].id_statystyki;
    }
    response.status(201).send(`${newStats}`)
  })
}

const createTermin = (request, response) => {
  const { data, godzina,kolejka } = request.body

  pool.query("insert into api.termin (data_spotkania,godzina,nr_kolejki) values($1,$2,$3) returning id_termin", [data, godzina, kolejka], (error, results) => {
    if (error) {
      throw error
    }
    else{
    var newTermin = results.rows[0].id_termin;
    }
    response.status(201).send(`${newTermin}`)
  })
  
}


const createPilkarz = (request, response) => {
  const { pozycja, imie, nazwisko,data_ur,waga,wzrost,klub } = request.body

  pool.query("insert into api.pilkarz (id_klub,pozycja,imie,nazwisko,data_ur,waga,wzrost) select id_klub, $1,$2,$3,$4,$5,$6 from api.klub where api.klub.nazwa=$7", [pozycja,imie,nazwisko,data_ur,waga,wzrost,klub], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.insertId}`)
  })
}

const createMecz = (request, response) => {
  const { sedzia, id_statystyki,id_termin,gospodarz,gosc,gole_gospodarz,gole_gosc } = request.body

  pool.query("insert into api.mecz (id_sedzia, id_statystyki,id_termin,id_gospodarz,id_gosc,gole_gospodarz,gole_gosc) values((select id_sedzia from api.sedzia where api.sedzia.nazwisko=$1),$2,$3,(select id_klub from api.klub where api.klub.nazwa=$4),(select id_klub from api.klub where api.klub.nazwa=$5), $6,$7) returning id_mecz", [sedzia, id_statystyki,id_termin,gospodarz,gosc,gole_gospodarz,gole_gosc], (error, results) => {
    if (error) {
      throw error
    }
      else{
          var newMecz = results.rows[0].id_mecz;
      }
    response.status(201).send(`${newMecz}`)
  })
}

const createGol = (request, response) => {
  const { id_mecz, nazwisko_pilkarza, polowa, minuta } = request.body

  pool.query("insert into api.gol ( id_mecz, id_pilkarz, polowa, minuta ) values( $1, (select id_pilkarz from api.pilkarz where api.pilkarz.nazwisko=$2), $3, $4)", [id_mecz,nazwisko_pilkarza,polowa,minuta], ( error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.insertId}`)
  })
}


const updateKlub = (request, response) => {
  const id = parseInt(request.params.id)
  const { nazwa, miasto } = request.body

  pool.query(
    'UPDATE klub SET nazwa = $1, miasto = $2 WHERE id = $3',
    [nazwa,miasto, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteKlub = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM klub WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getKlub,
  getTrener,
getTrener2,
  getPilkarz,
  getSedzia,
  getKlubById,
  getPilkarzById,
  getMecz,
  getTabela,
  IDStatystyki,
  createKlub,
  createTrener,
  createPilkarz,
  createTermin,
  createStatystyki,
  createMecz,
    createGol,
  updateKlub,
  deleteKlub,
}
