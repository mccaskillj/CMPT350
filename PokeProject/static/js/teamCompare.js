$("#tags").keyup(function(event){
    if(event.keyCode == 13){
        $("#sb").click();
    }
});

$( function() {
    var pokemonNames = [];

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

    $( "#pokeleft1input" ).autocomplete({
      source: pokemonNames
    });

});

$(document).ready(function() {
    $("#addbuttonleft1").click(function () {
        //alert( "Handler for .click() called." );
        $('#pokeleft1search').toggle();
        document.getElementById("closepokeleft1").style.visibility="visible";
        document.getElementById("poke1leftImage").style.visibility="visible";
    });
    $("#closepokeleft1").click(function () {
        $('#pokeleft1search').toggle();
        $('#pokeleft1input').val('');
        document.getElementById("closepokeleft1").style.visibility="hidden";
        document.getElementById("poke1leftImage").style.visibility="hidden";
    });
});

d3.select("#addbuttonleft1").on("click", function() {
    var selectPoke = document.getElementById("pokeleft1input").value;
    console.log("Selected Poke: ", selectPoke);
    var validPoke = checkPoke(selectPoke);
    console.log("Selected pokemon is valid",validPoke);
    if (validPoke == 1) {
            $.ajax({
                type: "GET",
                url: 'ajax/get_single_pokemon/', //the script to call to get data
                data: {"name": selectPoke},
                dataType: 'JSON',                //data format
                success: function (pokemons) {
                    console.log("HERE");
                    var unwantedFirst = ['color', 'name', 'id', 'body_style', 'is_legendary', 'catch_rate',
                        'generation', 'egg_group_1', 'egg_group_2', 'type_2', 'type_1', 'height', 'width', 'total',
                        'phys_sweeper', 'sp_sweeper', 'wall', 'phys_tank', 'sp_tank'];
                    var unwantedSecond = ['color', 'name', 'id', 'body_style', 'is_legendary', 'catch_rate',
                            'generation', 'egg_group_1', 'egg_group_2', 'type_2', 'type_1', 'height', 'width', 'total',
                            'hp', 'attack', 'defense', 'sp_attack', 'sp_defense', 'speed'];

                    var id = pokemons[0]['id'];

                    $("#frontImgleft1").attr('src', frontPath + id + '.png');
                }
            })
    }
    else{
        alert("Invalid Pokemon");
    }

});


function checkPoke(pokename){
    var poke = 0;

    $.ajax({
         type: "GET",
         url: 'ajax/exists', //the script to call to get data
         data: {"name": pokename},
         dataType: 'JSON',                //data format
         success: function(pokemons) {
             poke = pokemons['val'];
             console.log("Poke:", poke);
             return poke;

         },
         failure: function(pokemons) {
             alert('Got an error dude');
             return 1;
         }
     });

}