/**
 * Created by carmichael on 2017-03-02.
 */

function testAjax(){
    // This area is where you want to
    var type = $('#goalBody2 option:selected').text();


    $.ajax({
        type: "GET",
        url: 'ajax/get_filter_options/', //the script to call to get data
        data: {"type": type},            //you can insert url arguments here
        dataType: 'JSON',                //data format
        success: function(pokemons) {
            // Do what ever you want with the data
            console.log(pokemons);

            $("#table  tr").remove();
            $('tbody').append('<tr>' + '' +
                    '<th>ID</th>' +
                    '<th>Name</th>' +
                    '<th>Total</th>' +
                    '<th>Hp</th>' +
                    '<th>Total</th>' +
                    '<th>Attack</th>' +
                    '<th>Defense</th>' +
                    '<th>Sp. Attack</th>' +
                    '<th>Sp. Defense</th>' +
                    '<th>Speed</th>' +
                    '<th>Color</th>' +
                    '<th>Weight</th>' +
                    '<th>Height</th>' +
                    '</tr>')
            for(var i = 0; i < pokemons.length; i++) {
                console.log(pokemons[i])
                $('tbody').append('<tr>' + '' +
                    '<td>' + pokemons[i]['id']+'</td>' +
                    '<td>' + pokemons[i]['name']+'</td>' +
                    '<td>' + pokemons[i]['total']+'</td>' +
                    '<td>' + pokemons[i]['hp']+'</td>' +
                    '<td>' + pokemons[i]['total']+'</td>' +
                    '<td>' + pokemons[i]['attack']+'</td>' +
                    '<td>' + pokemons[i]['defense']+'</td>' +
                    '<td>' + pokemons[i]['sp_attack']+'</td>' +
                    '<td>' + pokemons[i]['sp_defense']+'</td>' +
                    '<td>' + pokemons[i]['speed']+'</td>' +
                    '<td>' + pokemons[i]['color']+'</td>' +
                    '<td>' + pokemons[i]['weight']+'</td>' +
                    '<td>' + pokemons[i]['height']+'</td>' +
                    '</tr>')
            }
        },
        failure: function(pokemons) {
            alert('Got an error dude');
        }
    });
}

//For getting CSRF token
function getCookie(name) {
          var cookieValue = null;
          if (document.cookie && document.cookie != '') {
                var cookies = document.cookie.split(';');
          for (var i = 0; i < cookies.length; i++) {
               var cookie = jQuery.trim(cookies[i]);
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) == (name + '=')) {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
             }
          }
      }
 return cookieValue;
}