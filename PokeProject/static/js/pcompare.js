/**
 * Created by carmichael on 2017-03-06.
 */

function showPokemon() {
        var selectPoke = document.getElementById("tags").value;
        console.log(selectPoke);

        if (selectPoke != ""){
            $.ajax({
            type: "GET",
            url: 'ajax/get_single_pokemon/', //the script to call to get data
            data: {"name": selectPoke},
            dataType: 'JSON',                //data format
            success: function(pokemons) {
                var dict = [];
                var unwanted = ['color', 'name', 'id', 'body_style', 'is_legendary', 'catch_rate',
                                'generation', 'egg_group_1', 'egg_group_2', 'type_2', 'type_1'];

                var id = pokemons[0]['id'];

                $("#frontImg").attr('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + id + '.png');
                $("#backImg").attr('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/' + id + '.png');

                document.getElementById('pokedex').innerHTML = pokemons[0]['id'];
                document.getElementById('singleLegend').innerHTML = pokemons[0]['is_legendary'];
                document.getElementById('singleCatch').innerHTML = pokemons[0]['catch_rate'] + '%';
                document.getElementById('singleBStyle').innerHTML = pokemons[0]['body_style'];
                document.getElementById('singleGen').innerHTML = pokemons[0]['generation'];

                document.getElementById('singleGen').innerHTML = pokemons[0]['generation'];

                $("#singleType  span").remove();
                addType(pokemons[0]['type_1']);
                addType(pokemons[0]['type_2']);


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
                console.log(dict);
                // d3 stuff

            },
            failure: function(pokemons) {
                alert('Got an error dude');
            }
            });
        }

}

function addType(type){

    var elem = document.getElementById('singleType');


    switch(type) {
        case 'Fire':
            elem.innerHTML += '<span class="badge fireBadge">Fire</span>';
            break;
        case 'Water':
            elem.innerHTML += '<span class="badge waterBadge">Water</span>';
            break;
        case 'Grass':
            elem.innerHTML += '<span class="badge grassBadge">Grass</span>';
            break;
        case 'Fighting':
            elem.innerHTML += '<span class="badge fightingBadge">Fighting</span>';
            break;
        case 'Steel':
            elem.innerHTML += '<span class="badge steelBadge">Steel</span>';
            break;
        case 'Electric':
            elem.innerHTML += '<span class="badge electricBadge">Electric</span>';
            break;
        case 'Ice':
            elem.innerHTML += '<span class="badge iceBadge">Ice</span>';
            break;
        case 'Normal':
            elem.innerHTML += '<span class="badge normalBadge">Normal</span>';
            break;
        case 'Bug':
            elem.innerHTML += '<span class="badge bugBadge">Bug</span>';
            break;
        case 'Dragon':
            elem.innerHTML += '<span class="badge dragonBadge">Dragon</span>';
            break;
        case 'Psychic':
            elem.innerHTML += '<span class="badge psychicBadge">Psychic</span>';
            break;
        case 'Ghost':
            elem.innerHTML += '<span class="badge ghostBadge">Ghost</span>';
            break;
        case 'Poison':
            elem.innerHTML += '<span class="badge poisonBadge">Poison</span>';
            break;
        case 'Fariy':
            elem.innerHTML += '<span class="badge fariyBadge">Fairy</span>';
            break;
        case 'Dark':
            elem.innerHTML += '<span class="badge darkBadge">Dark</span>';
            break;
        case 'Rock':
            elem.innerHTML += '<span class="badge rockBadge">Rock</span>';
            break;
        default:
            break;
    }
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


$('#shinny').on("click",function(){
    var id = document.getElementById('pokedex').innerHTML;
    console.log(id);
    $("#frontImg").attr('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/' + id + '.png');
    $("#backImg").attr('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/' + id + '.png');
});

$('#normal').on("click",function(){
    var id = document.getElementById('pokedex').innerHTML;
    console.log(id);
    $("#frontImg").attr('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + id + '.png');
    $("#backImg").attr('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/' + id + '.png');
});