/**
 * Created by carmichael on 2017-03-06.
 */

function showPokemon() {
        var selectPoke = document.getElementById("tags").value
        console.log(selectPoke)

        $.ajax({
        type: "GET",
        url: 'ajax/get_single_pokemon/', //the script to call to get data
        data: {"name": selectPoke},
        dataType: 'JSON',                //data format
        success: function(pokemons) {
            var dict = [];
            var unwanted = ['color', 'name', 'id', ]

            var id = pokemons[0]['id']

            for (var key in pokemons[0]) {
                var value = pokemons[0][key];
                // Use `key` and `value`
                if (unwanted.includes(key) != true) {
                    dict.push({
                        stat: key,
                        value: value
                    });
                }
            }
        },
        failure: function(pokemons) {
            alert('Got an error dude');
        }
    });

}


function openCity(evt, cityName) {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(cityName).style.display = "block";
        evt.currentTarget.className += " active";
    }

    // Get the element with id="defaultOpen" and click on it
    document.getElementById("defaultOpen").click();

$( function() {
    var pokemonNames = []

    $.ajax({
        type: "GET",
        url: 'ajax/get_pokemon/', //the script to call to get data
        dataType: 'JSON',                //data format
        success: function(pokemons) {
            for(var i = 0; i < pokemons.length; i++) {
                pokemonNames.push(pokemons[i]['name'])
            }

        },
        failure: function(pokemons) {
            alert('Got an error dude');
        }
    });

    $( "#tags" ).autocomplete({
      source: pokemonNames
    });

    $( "#poke1" ).autocomplete({
      source: pokemonNames
    });

    $( "#poke2" ).autocomplete({
      source: pokemonNames
    });
} );

