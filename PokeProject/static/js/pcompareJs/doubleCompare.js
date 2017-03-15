/**
 * Created by carmichael on 2017-03-13.
 */


drawGraphs("#dChart", "dch", inital, 350, 350);
drawGraphs("#dChart2", "dch2", inital, 350, 350);

function addPokeOneDouble() {
    var selectPoke = document.getElementById("poke1").value;

    if (selectPoke != ""){

        d3.selectAll("#dch").remove();

        $.ajax({
        type: "GET",
        url: 'ajax/get_single_pokemon/', //the script to call to get data
        data: {"name": selectPoke},
        dataType: 'JSON',                //data format
        success: function(pokemons) {
            console.log(pokemons);

            var unwantedFirst = ['color', 'name', 'id', 'body_style', 'is_legendary', 'catch_rate',
                            'generation', 'egg_group_1', 'egg_group_2', 'type_2', 'type_1', 'height', 'width', 'total',
                            'phys_sweeper', 'sp_sweeper', 'wall', 'phys_tank', 'sp_tank'];
            var unwantedSecond = ['color', 'name', 'id', 'body_style', 'is_legendary', 'catch_rate',
                            'generation', 'egg_group_1', 'egg_group_2', 'type_2', 'type_1', 'height', 'width', 'total',
                            'hp', 'attack', 'defense', 'sp_attack', 'sp_defense', 'speed'];
            var id = pokemons[0]['id'];

            $("#frontImgDouble").attr('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + id + '.png');
            //$("#backImgDouble").attr('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/' + id + '.png');

            document.getElementById('pokedexDouble').innerHTML = pokemons[0]['id'];
            if (pokemons[0]['is_legendary'] == "TRUE") {
                document.getElementById('singleLegendDouble').innerHTML = 'Yes';
            } else {
                document.getElementById('singleLegendDouble').innerHTML = 'No';
            }
            document.getElementById('singleCatchDouble').innerHTML = pokemons[0]['catch_rate'] + '%';
            document.getElementById('singleBStyleDouble').innerHTML = pokemons[0]['body_style'];
            document.getElementById('singleGenDouble').innerHTML = pokemons[0]['generation'];

            document.getElementById('singleGenDouble').innerHTML = pokemons[0]['generation'];

            document.getElementById('dPoke').innerHTML = selectPoke;

            $("#singleTypeDouble  span").remove();
            addType(pokemons[0]['type_1'], "singleTypeDouble");
            addType(pokemons[0]['type_2'], "singleTypeDouble");

            var data1 = getValuesForReg(pokemons, unwantedFirst);
            var data2 = getValuesForDerived(pokemons, unwantedSecond);

            drawGraphs("#dChart", "dch", data1, 350, 350);

            document.getElementById("checkNormal").checked = true;
            document.getElementById("checkBarDouble").checked = true;
        },
        failure: function(pokemons) {
            alert('Got an error dude');
        }
        });
    }
}

function addPokeTwoDouble() {
    var selectPoke = document.getElementById("poke2").value;

    if (selectPoke != ""){

        d3.selectAll("#dch2").remove();

        $.ajax({
        type: "GET",
        url: 'ajax/get_single_pokemon/', //the script to call to get data
        data: {"name": selectPoke},
        dataType: 'JSON',                //data format
        success: function(pokemons) {
            console.log(pokemons);
            var unwantedFirst = ['color', 'name', 'id', 'body_style', 'is_legendary', 'catch_rate',
                            'generation', 'egg_group_1', 'egg_group_2', 'type_2', 'type_1', 'height', 'width', 'total',
                            'phys_sweeper', 'sp_sweeper', 'wall', 'phys_tank', 'sp_tank'];
            var unwantedSecond = ['color', 'name', 'id', 'body_style', 'is_legendary', 'catch_rate',
                            'generation', 'egg_group_1', 'egg_group_2', 'type_2', 'type_1', 'height', 'width', 'total',
                            'hp', 'attack', 'defense', 'sp_attack', 'sp_defense', 'speed'];
            var id = pokemons[0]['id'];

            //$("#frontImgDouble").attr('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + id + '.png');
            $("#backImgDouble").attr('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + id + '.png');

            document.getElementById('pokedexDouble2').innerHTML = pokemons[0]['id'];
            if (pokemons[0]['is_legendary'] == "TRUE") {
                document.getElementById('singleLegendDouble2').innerHTML = 'Yes';
            } else {
                document.getElementById('singleLegendDouble2').innerHTML = 'No';
            }

            document.getElementById('singleCatchDouble2').innerHTML = pokemons[0]['catch_rate'] + '%';
            document.getElementById('singleBStyleDouble2').innerHTML = pokemons[0]['body_style'];
            document.getElementById('singleGenDouble2').innerHTML = pokemons[0]['generation'];

            document.getElementById('singleGenDouble2').innerHTML = pokemons[0]['generation'];

            document.getElementById('dPoke2').innerHTML = selectPoke;

            $("#singleTypeDouble2  span").remove();
            addType(pokemons[0]['type_1'], "singleTypeDouble2");
            addType(pokemons[0]['type_2'], "singleTypeDouble2");

            var data1 = getValuesForReg(pokemons, unwantedFirst);
            var data2 = getValuesForDerived(pokemons, unwantedSecond);

            drawGraphs("#dChart2", "dch2", data1, 350, 350);

            document.getElementById("checkNormal").checked = true;
            document.getElementById("checkBarDouble").checked = true;
        },
        failure: function(pokemons) {
            alert('Got an error dude');
        }
        });
    }
}