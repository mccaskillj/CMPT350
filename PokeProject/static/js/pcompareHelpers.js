/**
 * Created by carmichael on 2017-03-13.
 */
function getValuesForDerived(pokemons){
    var dict = [];

    dict.push({
                stat: 'Wall',
                value: pokemons[0]['wall']
            });
    dict.push({
                stat: 'Phys. Tank',
                value: pokemons[0]['phys_tank']
            });
    dict.push({
                stat: 'Sp. Tank',
                value: pokemons[0]['sp_tank']
            });
    dict.push({
                stat: 'Phys. Sweeper',
                value: pokemons[0]['phys_sweeper']
            });
    dict.push({
                stat: 'Sp. Sweeper',
                value: pokemons[0]['sp_sweeper']
            });

    return dict;
}

function getValuesForReg(pokemons){
    var dict = [];

    dict.push({
                stat: 'Hp',
                value: pokemons[0]['hp']
            });
    dict.push({
                stat: 'Attack',
                value: pokemons[0]['attack']
            });
    dict.push({
                stat: 'Sp. Attack',
                value: pokemons[0]['sp_attack']
            });
    dict.push({
                stat: 'Defense',
                value: pokemons[0]['defense']
            });
    dict.push({
                stat: 'Sp. Defense',
                value: pokemons[0]['sp_defense']
            });
    dict.push({
                stat: 'Speed',
                value: pokemons[0]['speed']
            });
    return dict;
}


function addType(type, id){

    var elem = document.getElementById(id);
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

    $( "#tags" ).autocomplete({
      source: pokemonNames
    });

    $( "#poke1" ).autocomplete({
      source: pokemonNames
    });

    $( "#poke2" ).autocomplete({
      source: pokemonNames
    });

    $( "#addPoke" ).autocomplete({
      source: pokemonNames
    });
} );

$('#shinny').on("click",function(){
    var id = document.getElementById('pokedex').innerHTML;
    $("#frontImg").attr('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/' + id + '.png');
    $("#backImg").attr('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/' + id + '.png');
});

$('#normal').on("click",function(){
    var id = document.getElementById('pokedex').innerHTML;
    $("#frontImg").attr('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + id + '.png');
    $("#backImg").attr('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/' + id + '.png');
});

// Add listener for enter key press
$("#tags").keyup(function(event){
    if(event.keyCode == 13){
        $("#sb").click();
    }
});

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();
