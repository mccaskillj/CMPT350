/**
 * Created by carmichael on 2017-03-09.
 */
var pokemonSearchData = [];

function getFilteredPokemon() {


    console.log(generation, type, color);
    pokemonSearchData = [];

    $.ajax({
        type: "GET",
        url: 'ajax/get_filtered_pokemon/', //the script to call to get data
        data: {"gen": generation, "type":type, "color": color},
        dataType: 'JSON',                //data format
    success: function(pokemons) {
        for (var i = 0 ; i < pokemons.length; i++){
            pokemonSearchData.push(pokemons[i]);
                console.log(i + ':' + pokemons[i]);

        }

    },
    failure: function(pokemons) {
        alert('Got an error dude');
    }
    });

    console.log(pokemonSearchData);
}