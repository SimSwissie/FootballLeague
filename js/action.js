

function dodajKlub(){
    const nazwa = document.getElementById('nazwa').value;
    const miasto = document.getElementById('miasto').value;
    const trener = document.getElementById('trener').value;
    
    const daneKlubu = {
        nazwa: nazwa,
        miasto: miasto,
        trener: trener
    };

   fetch("http://pascal.fis.agh.edu.pl:2002/klub", {
        method: 'POST',
        body: JSON.stringify(daneKlubu),
        headers: {
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    })
    .then(response => response.json())
    .then(response => {
        console.log("Nowy klub dodany:");
        console.log(response);
    })
        .catch(error => console.log("Blad: ", error));
      document.getElementById("form").innerHTML = '<img src="done.gif">';
};


function dodajTrenera(){
 const imieTrener = document.getElementById('imieTrener').value;
    const nazwiskoTrener = document.getElementById('nazwiskoTrener').value;
    
    const daneTrenera = {
        imieTrener: imieTrener,
        nazwiskoTrener: nazwiskoTrener
    };

   fetch("http://pascal.fis.agh.edu.pl:2002/trener", {
        method: 'POST',
        body: JSON.stringify(daneTrenera),
        headers: {
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    })
    .then(response => response.json())
    .then(response => {
        console.log("Nowy trener dodany:");
        console.log(response);
    })
        .catch(error => console.log("Blad: ", error));
      document.getElementById("form").innerHTML = '<img src="done.gif">';
};

function dodajPilkarza(){

    const imie = document.getElementById('imie').value;
    const nazwisko = document.getElementById('nazwisko').value;
     const pozycja = document.getElementById('pozycja').value;
     const data = document.getElementById('data').value;
     const waga = document.getElementById('waga').value;
     const wzrost = document.getElementById('wzrost').value;
     const klub = document.getElementById('klub').value;
    
    const danePilkarza = {
        pozycja: pozycja,
        imie: imie,
        nazwisko: nazwisko,
        data_ur: data,
        waga: waga,
        wzrost: wzrost,
        klub: klub
    };

   fetch("http://pascal.fis.agh.edu.pl:2002/pilkarz", {
        method: 'POST',
        body: JSON.stringify(danePilkarza),
        headers: {
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    })
    .then(response => response.json())
    .then(response => {
        console.log("Nowy pilkarz dodany:");
        console.log(response);
    })
        .catch(error => console.log("Blad: ", error));
      document.getElementById("form").innerHTML = '<img src="done.gif">';
};

 var id_termin;
var id_statystyki;
var gospodarz;
var gosc;
var sedzia;
var gole_gospodarz;
var gole_gosc;
function dodajTermin(){
    const data = document.getElementById('data').value;
    const godzina = document.getElementById('godzina').value;
    const kolejka = document.getElementById('kolejka').value;
    
    const daneKlubu = {
        data: data,
        godzina: godzina,
        kolejka: kolejka
    };

   fetch("http://pascal.fis.agh.edu.pl:2002/termin", {
        method: 'POST',
        body: JSON.stringify(daneKlubu),
        headers: {
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    })
    .then(response => response.json())
    .then(response => {
        console.log("Nowy termin dodany:");
        console.log(response);
      id_termin=response;
    })
        .catch(error => console.log("Blad: ", error));
    document.getElementById("form").innerHTML = '<img src="done.gif">';
    
};

function dodajGraczy(){
    gospodarz = document.getElementById('klub_wybor_gospodarz').value;
    gosc = document.getElementById("klub_wybor_gosc").value;
    
    gole_gospodarz = document.getElementById("gole_gospodarz").value;
    gole_gosc = document.getElementById("gole_gosc").value;
     document.getElementById("form").innerHTML = '<img src="done.gif">';
}

function gracze(){
        
    var html='<form><label for="gospodarz">Gospodarz meczu:</label>';
    
    fetch("http://pascal.fis.agh.edu.pl:2002/klub",{
         method: 'GET',
    headers: new Headers(),
               mode: 'cors',
               cache: 'default'})
  .then(function(response) {
         
        return response.json();
  })
  .then(function(myJson) {
 var obj = JSON.parse(JSON.stringify(myJson));
       html += '<select id="klub_wybor_gospodarz">';
        for(var i=0;i<obj.length;i++)
            html+= '<option value="' + obj[i].nazwa + '">'  + obj[i].nazwa+"</option>"
        html += "</select>";
        
        html+='<br><label for="gosc">Gosc meczu:</label>';
        
        html += '<select id="klub_wybor_gosc">';
        for(var j=0;j<obj.length;j++)
            html+= '<option value="' + obj[j].nazwa + '">'  + obj[j].nazwa +"</option>"
        html += "</select>";
        
         html+='<br><label for="gole_gospodarz">Gole gospodarza:</label><input type="number" class="wpis" id="gole_gospodarz" value=""/><br><label for="gole_gosc">Gole goscia:</label><input type="number" class="wpis" id="gole_gosc" value=""/><br><div class="buttons_group"><input class="button" type="button" value="Wyslij" onclick="dodajGraczy();"/></div></form>';
        
        document.getElementById("form").innerHTML = html;
   
   console.log(JSON.stringify(myJson));
  });
};

function statystyki(){
var html1='<form><label for="sedzia">Sedzia meczu:</label>';
fetch("http://pascal.fis.agh.edu.pl:2002/sedzia",{
         method: 'GET',
    headers: new Headers(),
               mode: 'cors',
               cache: 'default'})
  .then(function(response) {
         
        return response.json();
  })
  .then(function(myJson) {
 var obj = JSON.parse(JSON.stringify(myJson));
    
   html1 += '<select id="sedzia_wybor">';
        for(var i=0;i<obj.length;i++)
            html1+= '<option value="' + obj[i].nazwisko + '">' + obj[i].nazwisko+"</option>"
        html1 += '</select><br><div id="add3"></div>';
    
    html1 += '<label for="kartki_czerwone">Ilosc czerwonych kartek:</label><input type="number" class="wpis" id="kartki_czerwone" value=""/><br><label for="kartki_zolte">Kartki zolte:</label><input type="number" class="wpis" id="kartki_zolte" value=""/><br><label for="faule">Ilosc fauli:</label><input type="number" class="wpis" id="faule" value=""/><br><label for="spalone">Ilosc spalonych:</label><input type="number" class="wpis" id="spalone" value=""/><br><label for="posiadanie_gospodarz">Posiadanie pi³ki przez gospodarza (%):</label><input type="number" class="wpis" id="posiadanie_gospodarz" value=""/><br><label for="posiadanie_gosc">Posiadanie pilki przez goscia:</label><input type="number" class="wpis" id="posiadanie_gosc" value=""/><br><div id ="add9" class="buttons_group"><input class="button" type="button" value="Wyslij" onclick="dodajStatystyki();"/></div></form>'
        
        document.getElementById("form").innerHTML = html1;
   
    
   console.log(JSON.stringify(myJson));
  });
}


var polowa = [];
var minuta = [];
var it;
function gole(){
  it=0;
    var html = '';
    var id = gospodarz;
    for(var i=0;i<gole_gospodarz;i++){
   
////////////////////////
    fetch("http://pascal.fis.agh.edu.pl:2002/pilkarz/"+id,{
         method: 'GET',
    headers: new Headers(),
               mode: 'cors',
               cache: 'default'})
  .then(function(response) {
         
        return response.json();
  })
  .then(function(myJson) {
 var obj = JSON.parse(JSON.stringify(myJson));
    html+='<p>GOSPODARZ<p>';
    html+='<form><label for="pilkarz">Pilkarz:</label>';
      html += '<select id="pilkarz_gospodarz">';
        for(var j=0;j<obj.length;j++)
            html+= '<option value="' + obj[j].nazwisko + '">'  + obj[j].nazwisko +"</option>"
        html += "</select>";
         html+='<br><label for="polowa">Po³owa:</label><input type="number" class="wpis" id="polowa" value=""/><br><label for="minuta">Minuta:</label><input type="time" class="wpis" id="minuta" value=""/><br><div class="buttons_group"><input class="button" type="button" value="Wyslij" onclick="dodajGol();"/></div></form><br><br>';
       if(gole_gosc==0){
           document.getElementById("form").innerHTML = html;
       }
   
   console.log(JSON.stringify(myJson));
  });
      
    }
    
   
    id = gosc;
    for(var i=0;i<gole_gosc;i++){
        
////////////////////////
    fetch("http://pascal.fis.agh.edu.pl:2002/pilkarz/"+id,{
         method: 'GET',
    headers: new Headers(),
               mode: 'cors',
               cache: 'default'})
  .then(function(response) {
         
        return response.json();
  })
  .then(function(myJson) {
 var obj = JSON.parse(JSON.stringify(myJson));
     html += '<p>GOSC<p>';
    html+='<form><label for="pilkarz">Pilkarz:</label>';
      html += '<select id="pilkarz_gospodarz">';
        for(var j=0;j<obj.length;j++)
            html+= '<option value="' + obj[j].nazwisko + '">'  + obj[j].nazwisko +"</option>"
        html += "</select>";
         html+='<br><label for="polowa">Po³owa:</label><input type="number" class="wpis" id="polowa" value=""/><br><label for="minuta">Minuta:</label><input type="time" class="wpis" id="minuta" value=""/><br><div class="buttons_group"><input class="button" type="button" value="Wyslij" onclick="dodajGol();"/></div></form><br><br>';

    document.getElementById("form").innerHTML = html;
   console.log(JSON.stringify(myJson));
  });
             
    }
    
    
};

function dodajGol(){
    it++;
     var nazwisko_pilkarza =  document.getElementById('pilkarz_gospodarz').value;
    var polowa =  document.getElementById('polowa').value;
    var minuta =  document.getElementById('minuta').value;
    
     const daneGol = {
        id_mecz: id_mecz,
        nazwisko_pilkarza: nazwisko_pilkarza,
         polowa: polowa,
         minuta: minuta    
    };
    fetch("http://pascal.fis.agh.edu.pl:2002/gol", {
        method: 'POST',
        body: JSON.stringify(daneGol),
        headers: {
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    })
    .then(response => response.json())
    .then(response => {
        console.log("Gol dodany:");
        console.log(response);
       id_statystyki = response;
    })
        .catch(error => console.log("Blad: ", error));
    
    console.log(it);

    if(it == (parseInt(gole_gosc) + parseInt(gole_gospodarz))){
        document.getElementById("form").innerHTML = '<img src="done.gif">' ;
    }
    
}

var id_mecz;
function dodajStatystyki(){
    const kartki_czerwone = document.getElementById('kartki_czerwone').value;
    const kartki_zolte = document.getElementById('kartki_zolte').value;
     const faule = document.getElementById('faule').value;
     const spalone = document.getElementById('spalone').value;
     const posiadanie_gospodarz = document.getElementById('posiadanie_gospodarz').value;
     const posiadanie_gosc = document.getElementById('posiadanie_gosc').value;
     
    
    const daneStatystyki = {
        kartki_czerwone: kartki_czerwone,
        kartki_zolte: kartki_zolte,
        faule: faule,
        spalone: spalone,
        posiadanie_gospodarz: posiadanie_gospodarz,
        posiadanie_gosc: posiadanie_gosc
    };

   fetch("http://pascal.fis.agh.edu.pl:2002/statystyki", {
        method: 'POST',
        body: JSON.stringify(daneStatystyki),
        headers: {
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    })
    .then(response => response.json())
    .then(response => {
        console.log("Statystyki dodany:");
        console.log(response);
       id_statystyki = response;
    })
        .catch(error => console.log("Blad: ", error));
    
    
    
    sedzia = document.getElementById("sedzia_wybor").value;
   
    
     document.getElementById("form").innerHTML = '<div class="buttons_group"><input class="button" type="button" value="Zakoncz" onclick="dodajMecz();"/></div>';
        
};

function dodajMecz(){
    const daneMecz = {
        sedzia: sedzia,
        id_statystyki: id_statystyki,
        id_termin: id_termin,
        gospodarz: gospodarz,
        gosc: gosc,
        gole_gospodarz: gole_gospodarz,
        gole_gosc: gole_gosc
    };
    
    fetch("http://pascal.fis.agh.edu.pl:2002/mecz", {
        method: 'POST',
        body: JSON.stringify(daneMecz),
        headers: {
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    })
    .then(response => response.json())
    .then(response => {
        console.log("Statystyki dodany:");
        console.log(response);
       id_mecz = parseInt(response);
    })
        .catch(error => console.log("Blad: ", error));
        
    
    document.getElementById("form").innerHTML = '<img src="done.gif">';
}

function trener(){
document.getElementById("form").innerHTML = '<form> <label for="nazwa">Imie:</label><input type="text" class="wpis"  id="imieTrener" value=""/><br><label for="nazwa">Nazwisko:</label><input type="text" class="wpis" id="nazwiskoTrener" value=""/><div class="buttons_group"><input class="button" type="button" value="Wyslij" onclick="dodajTrenera();"/></div></form>';
};

function termin(){
document.getElementById("form").innerHTML = '<form><label for="data">Data spotkania (YYYY-MM-DD):</label><input type="date" class="wpis" id="data" value=""/><br><label for="godzina">Godzina spotkania (MM:SS):</label><input type="time" class="wpis" id="godzina" value=""/><br><label for="kolejka">Nr kolejki:</label><input type="number" class="wpis" id="kolejka" value=""/><br><div class="buttons_group"><input class="button" type="button" value="Wyslij" onclick="dodajTermin();"/></div></form>';
};

function klub(){
    
     fetch("http://pascal.fis.agh.edu.pl:2002/trenerr",{
         method: 'GET',
    headers: new Headers(),
               mode: 'cors',
               cache: 'default'})
  .then(function(response) {
         
        return response.json();
  })
  .then(function(myJson) {
 var obj = JSON.parse(JSON.stringify(myJson));
        var html = '<form><label for="nazwa">Nazwa klubu:</label><input type="text" class="wpis" id="nazwa" value=""/><br><label for="miasto">Miasto:</label><input type="text" class="wpis" id="miasto" value=""/><br><label for="trener">Nazwisko trenera:</label>';
       html += '<select id="trener">';
        for(var i=0;i<obj.length;i++)
            html+= '<option value="' + obj[i].nazwisko + '">'  + obj[i].nazwisko+"</option>"
        html += "</select>";
        
        html+='<div class="buttons_group"><input class="button" type="button" value="Wyslij" onclick="dodajKlub();"/></div></form>';
    
    
    document.getElementById("form").innerHTML = html;
   
   console.log(JSON.stringify(myJson));
  });
    
};
function pilkarz(){
  
    
      fetch("http://pascal.fis.agh.edu.pl:2002/klub",{
         method: 'GET',
    headers: new Headers(),
               mode: 'cors',
               cache: 'default'})
  .then(function(response) {
         
        return response.json();
  })
  .then(function(myJson) {
 var obj = JSON.parse(JSON.stringify(myJson));
           var txt = '<form><label for="imie">Imie</label><input type="text" class="wpis" id="imie" value=""/><br><label for="nazwisko">Nazwisko:</label><input type="text" class="wpis" id="nazwisko" value=""/><br><label for="pozycja">Pozycja:</label><input type="text" class="wpis" id="pozycja" value=""/><br><label for="data">Data urodzenia:</label><input type="date" class="wpis" id="data" value=""/><br><label for="wzrost">Wzrost:</label><input type="text" class="wpis" id="wzrost" value=""/><br><label for="waga">Waga:</label><input type="text" class="wpis" id="waga" value=""/><br><label for="imie">Klub</label>';
       txt += '<select id="klub">';
        for(var i=0;i<obj.length;i++)
            txt+= '<option value="' + obj[i].nazwa + '">'  + obj[i].nazwa+"</option>"
        txt += "</select>";
        
    txt+='<div class="buttons_group"><input class="button" type="button" value="Wyslij" onclick="dodajPilkarza();"/></div></form>';
    
    document.getElementById("form").innerHTML = txt;
    
   
   console.log(JSON.stringify(myJson));
  });
  
};
function wskazKlub(){
    
    var html='<form><label for="klub">Nazwa klubu</label>';
    
    fetch("http://pascal.fis.agh.edu.pl:2002/klub",{
         method: 'GET',
    headers: new Headers(),
               mode: 'cors',
               cache: 'default'})
  .then(function(response) {
         
        return response.json();
  })
  .then(function(myJson) {
 var obj = JSON.parse(JSON.stringify(myJson));
       html += '<select id="klub">';
        for(var i=0;i<obj.length;i++)
            html+= '<option value="' + obj[i].nazwa + '">'  + obj[i].nazwa+"</option>";
        html += "</select>";
        html+='<div class="buttons_group"><input class="button" type="button" value="Wyslij" onclick="pokazPilkarzy();"/></div></form>';
    document.getElementById("form").innerHTML = html;
     console.log(JSON.stringify(myJson));
  });
};

function pokazTrenerow(){
    fetch("http://pascal.fis.agh.edu.pl:2002/trener",{
         method: 'GET',
    headers: new Headers(),
               mode: 'cors',
               cache: 'default'})
  .then(function(response) {
         
        return response.json();
  })
  .then(function(myJson) {
 var obj = JSON.parse(JSON.stringify(myJson));
        html = '<table class="container"><thead><tr><th><h1>IMIE</h1></th><th><h1>NAZWISKO</h1></th><th><h1>NAZWA KLUBU</h1></th></tr></thead><tbody>';
        for(var i=0;i<obj.length;i++)
            html+= "<tr><td>" + obj[i].imie + "</td><td>" + obj[i].nazwisko+"</td><td>" + obj[i].nazwa +"</td></tr>";
        html += "</tbody></table>"
        document.getElementById("form").innerHTML = html;
   
   console.log(JSON.stringify(myJson));
  });
};


function pokazMecze(){
    fetch("http://pascal.fis.agh.edu.pl:2002/mecz",{
         method: 'GET',
    headers: new Headers(),
               mode: 'cors',
               cache: 'default'})
  .then(function(response) {
         
        return response.json();
  })
  .then(function(myJson) {
 var obj = JSON.parse(JSON.stringify(myJson));
        html = '<table class="container"><thead><tr><th><h1>GOSPODARZ</h1></th><th><h1></h1></th><th><h1></h1></th><th><h1>GOSC</h1></th></tr></thead><tbody>';
        for(var i=0;i<obj.length;i++)
            html+= "<tr><td>" + obj[i].gospodarz + "</td><td>" + obj[i].gole_gospodarz+"</td><td>" + obj[i].gole_gosc +"</td><td>" + obj[i].gosc + "</td></tr>";
        html += "</tbody></table>"
        document.getElementById("form").innerHTML = html;
   console.log(JSON.stringify(myJson));
  });
};



function pokazKluby(){
    fetch("http://pascal.fis.agh.edu.pl:2002/klub",{
         method: 'GET',
    headers: new Headers(),
               mode: 'cors',
               cache: 'default'})
  .then(function(response) {
         
        return response.json();
  })
  .then(function(myJson) {
 var obj = JSON.parse(JSON.stringify(myJson));
        html = '<table class="container"><thead><tr><th><h1>NAZWA</h1></th><th><h1>MIASTO</h1></th><th><h1>TRENER<h1></th></tr></thead><tbody>';
        for(var i=0;i<obj.length;i++)
            html+= "<tr><td>" + obj[i].nazwa + "</td><td>" + obj[i].miasto+"</td><td>"+ obj[i].imie+ " " +obj[i].nazwisko+"</td></tr>" ;
        html += "</tbody></table>"
        document.getElementById("form").innerHTML = html;
   
   console.log(JSON.stringify(myJson));
  });
};

function pokazTabele(){
   fetch("http://pascal.fis.agh.edu.pl:2002/tabela",{
         method: 'GET',
    headers: new Headers(),
               mode: 'cors',
               cache: 'default'})
  .then(function(response) {
         
        return response.json();
  })
  .then(function(myJson) {
 var obj = JSON.parse(JSON.stringify(myJson));
        html = '<table class="container"><thead><tr><th><h1>NAZWA</h1></th><th><h1>ZWYCIESTWA<h1></th><th><h1>REMISY<h1></th><th><h1>PORAZKI<h1></th><th><h1>LICZBA PUNKTOW</h1></th></tr></thead><tbody>';
        for(var i=0;i<obj.length;i++)
            html+= "<tr><td>" + obj[i].nazwa + "</td><td>" + obj[i].zwyciestwa+ "</td><td> " +obj[i].remisy+"</td><td>"+obj[i].porazki+"</td><td>"+ obj[i].liczba_punktow+"</td></tr>" ;
        html += "</tbody></table>"
        document.getElementById("form").innerHTML = html;
   
   console.log(JSON.stringify(myJson));
  });  
};

function pokazPilkarzy(){
    const id = document.getElementById('klub').value;
    fetch("http://pascal.fis.agh.edu.pl:2002/pilkarz/"+id,{
         method: 'GET',
    headers: new Headers(),
               mode: 'cors',
               cache: 'default'})
  .then(function(response) {
         
        return response.json();
  })
  .then(function(myJson) {
 var obj = JSON.parse(JSON.stringify(myJson));
        html = '<table class="container"><thead><tr><th><h1>Imie</h1></th><th><h1>Nazwisko</h1></th><th><h1>Klub</h1></th><th><h1>Pozycja</h1></th><th><h1>Data urodzenia</h1></th><th><h1>Waga</h1></th><th><h1>Wzrost</h1></th></tr></thead><tbody>';
        for(var i=0;i<obj.length;i++)
            html+= "<tr><td>" + obj[i].imie + "</td><td>" + obj[i].nazwisko+"</td><td>"+ obj[i].nazwa+"</td><td>"+ obj[i].pozycja+"</td><td>" + obj[i].data_ur+"</td><td>"+obj[i].waga+"</td><td>"+obj[i].wzrost+"</td></tr>" ;
        html += "</tbody></table>"
        document.getElementById("form").innerHTML = html;
   
   console.log(JSON.stringify(myJson));
  });
};
function pokazSedziow(){
    fetch("http://pascal.fis.agh.edu.pl:2002/sedzia",{
         method: 'GET',
    headers: new Headers(),
               mode: 'cors',
               cache: 'default'})
  .then(function(response) {
         
        return response.json();
  })
  .then(function(myJson) {
 var obj = JSON.parse(JSON.stringify(myJson));
        html = '<table class="container"><thead><tr><th><h1>IMIE</h1></th><th><h1>NAZWISKO</h1></th></tr></thead><tbody>';
        for(var i=0;i<obj.length;i++)
            html+= "<tr><td>" + obj[i].imie + "</td><td>" + obj[i].nazwisko+"</td></tr>" ;
        html += "</tbody></table>"
        document.getElementById("form").innerHTML = html;
   
   console.log(JSON.stringify(myJson));
  });
};



function info(){
document.getElementById("form1").innerHTML = '<div class="buttons_group"><form><input style="width:16.66%" class="button" type="button" value="Pokaz Tabele" onclick="pokazTabele();"/><input style="width:16.66%" class="button" type="button" value="Pokaz Trenerow" onclick="pokazTrenerow();"/><input style="width:16.66%" class="button" type="button" value="Pokaz Kluby" onclick="pokazKluby();"/><input style="width:16.66%" class="button" type="button" value="Pokaz Pilkarzy" onclick="wskazKlub();"/><input style="width:16.66%" class="button" type="button" value="Pokaz Sedziow" onclick="pokazSedziow();"/><input style="width:16.66%" class="button" type="button" value="Pokaz Mecze" onclick="pokazMecze();"/></form></div>' 
};

function stworzenie(){
document.getElementById("form1").innerHTML = '<div class="buttons_group"><form><input style="width:33.33%" class="button" type="button" value="Trener" onclick="trener();"/><input style="width:33.33%" style="width:33.33%" class="button" type="button" value="Klub" onclick="klub();"/><input style="width:33.33%" class="button" type="button" value="Pilkarz" onclick="pilkarz();"/></form></div>'
};

function graj(){
document.getElementById("form1").innerHTML = '<div class="buttons_group"><form><input style="width:25%" class="button" type="button" value="Termin" onclick="termin();"/><input style="width:25%" class="button" type="button" value="Gracze" onclick="gracze();"/><input style="width:25%" class="button" type="button" value="Statystyki" onclick="statystyki();"/><input style="width:25%" class="button" type="button" value="Gole" onclick="gole();"/></form></div>'

};



