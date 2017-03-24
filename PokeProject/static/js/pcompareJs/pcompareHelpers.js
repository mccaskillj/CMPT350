/**
 * Created by carmichael on 2017-03-13.
 */
function getValuesForReg(pokemons){
    var dict = [];

    dict.push({
                stat: 'Hp',
                value: pokemons[0]['hp'],
                info: 'Hp'
            });
    dict.push({
                stat: 'Attack',
                value: pokemons[0]['attack'],
                info: 'Attack'
            });
    dict.push({
                stat: 'Sp. Attack',
                value: pokemons[0]['sp_attack'],
                info: 'Sp. Attack'
            });
    dict.push({
                stat: 'Defense',
                value: pokemons[0]['defense'],
                info: 'Defense'
            });
    dict.push({
                stat: 'Sp. Defense',
                value: pokemons[0]['sp_defense'],
                info: 'Sp. Defense'
            });
    dict.push({
                stat: 'Speed',
                value: pokemons[0]['speed'],
                info: 'Speed'
            });
    return dict;
}

function getValuesForDerived(pokemons){
    var dict = [];

    dict.push({
                stat: 'Wall',
                value: pokemons[0]['wall'],
                info: 'Wall = HP + Defense + Sp. Defense'
            });
    dict.push({
                stat: 'Phys. Tank',
                value: pokemons[0]['phys_tank'],
                info: 'Physical Tank = Attack + Defense'
            });
    dict.push({
                stat: 'Sp. Tank',
                value: pokemons[0]['sp_tank'],
                info: 'Special Tank = Sp. Attack + Sp. Defense'
            });
    dict.push({
                stat: 'Phys. Sweeper',
                value: pokemons[0]['phys_sweeper'],
                info: 'Physical Sweeper = Attack + Speed'
            });
    dict.push({
                stat: 'Sp. Sweeper',
                value: pokemons[0]['sp_sweeper'],
                info: 'Special Sweeper = Sp. Attack + Speed'
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

// Single
$('#shinny').on("click",function(){
    var id = document.getElementById('pokedex').innerHTML;

    $("#frontImg").attr('src', shinyFrontPath + id + '.png');
    $("#backImg").attr('src', shinyBackPath + id + '.png');
});

$('#normal').on("click",function(){
    var id = document.getElementById('pokedex').innerHTML;

    $("#frontImg").attr('src', frontPath + id + '.png');
    $("#backImg").attr('src', backPath + id + '.png');

});

// Double
$('#shinnyDouble').on("click",function(){
    var id = document.getElementById('pokedexDouble').innerHTML;
    var id2 = document.getElementById('pokedexDouble2').innerHTML;

    $("#frontImgDouble").attr('src', shinyFrontPath + id + '.png');
    $("#frontImgDouble2").attr('src', shinyFrontPath + id2 + '.png');
});

$('#normalDouble').on("click",function(){
    var id = document.getElementById('pokedexDouble').innerHTML;
    var id2 = document.getElementById('pokedexDouble2').innerHTML;

    $("#frontImgDouble").attr('src', frontPath + id + '.png');
    $("#frontImgDouble2").attr('src', frontPath + id2 + '.png');

});

// Add listener for enter key press
$("#tags").keyup(function(event){
    if(event.keyCode == 13){
        $("#sb").click();
    }
});

// Add listener for enter key press
$("#poke1").keyup(function(event){
    if(event.keyCode == 13){
        $("#doubleClick").click();
    }
});

// Add listener for enter key press
$("#poke2").keyup(function(event){
    if(event.keyCode == 13){
        $("#doubleClick2").click();
    }
});

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();
