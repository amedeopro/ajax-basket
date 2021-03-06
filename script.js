// Grazie all’utilizzo dell’API e il suo
// URL
// https://www.boolean.careers/api/array/basket?n=numberPlayers
// Ricreare l’esercizio del basket,
// questa volta dando la possibilità
// all’utente di scegliere quanti
// giocatori generare per poi stampare
// la lista in una sidebar e vedere le
// statistiche correlate al player
// clicccato

$(document).ready(function(){
var numeroUtente = parseInt(prompt('Quanti giocatori vuoi visualizzare?'));
  $.ajax({
    url: 'https://www.boolean.careers/api/array/basket?n',
    data:{
      n: numeroUtente,
    },
    method: 'GET',
    success: function(data){
      var giocatori = data.response;
      var arrayGiocatori = [];
      for (var key in giocatori) {
        var allGiocatori = giocatori[key];
        arrayGiocatori.push(allGiocatori);
        var source = $('#codici-giocatori').html();
        var template = Handlebars.compile(source);

        var context = {
          codGiocatore: allGiocatori.playerCode,
        };

        var html = template(context);

        $('#idCodGiocatori').append(html);
      }

      $('.codice-giocatore-singolo').click(function(){

        var codiceDelGiocatoreSingolo= $(this).text();

        console.log(codiceDelGiocatoreSingolo);

        for (var i = 0; i < arrayGiocatori.length; i++) {

           var giocatore = arrayGiocatori[i];

            if (codiceDelGiocatoreSingolo == giocatore.playerCode) {

              var statistiche = $('#statistiche-giocatori').html();
              var template = Handlebars.compile(statistiche);

              var context = {
                codGioc: giocatore.playerCode,
                pntFatt: giocatore.points,
                rimb: giocatore.rebounds,
                falli: giocatore.fouls,
                pntdue: giocatore.twoPoints,
                pnttre: giocatore.threePoints,
              };

              var stat = template(context);

              $('#stat-giocatore').html(stat);

           }

          }
      });

      console.log(arrayGiocatori)



    },
    error: function(){
      alert('errore')
    }
  })




})
