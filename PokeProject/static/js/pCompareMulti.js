/**
 * Created by carmichael on 2017-03-09.
 */
function addPokeOneMU() {
    var selectPoke = document.getElementById("poke1").value;
        console.log(selectPoke);

        if (selectPoke != ""){
            $.ajax({
            type: "GET",
            url: 'ajax/get_single_pokemon/', //the script to call to get data
            data: {"name": selectPoke},
            dataType: 'JSON',                //data format
            success: function(pokemons) {
                var unwantedFirst = ['color', 'name', 'id', 'body_style', 'is_legendary', 'catch_rate',
                                'generation', 'egg_group_1', 'egg_group_2', 'type_2', 'type_1', 'height', 'width', 'total',
                                'phys_sweeper', 'sp_sweeper', 'wall', 'phys_tank', 'sp_tank'];
                var unwantedSecond = ['color', 'name', 'id', 'body_style', 'is_legendary', 'catch_rate',
                                'generation', 'egg_group_1', 'egg_group_2', 'type_2', 'type_1', 'height', 'width', 'total',
                                'hp', 'attack', 'defense', 'sp_attack', 'sp_defense', 'speed'];
                var id = pokemons[0]['id'];




            },
            failure: function(pokemons) {
                alert('Got an error dude');
            }
            });
        }


}

function addB(){
    var pokeName = document.getElementById("addPoke").value;
    var elem = document.getElementById('pokeBadges');
    var amount = document.getElementsByClassName('label-success');

    if (amount.length < 12) {
        elem.innerHTML += '<span class="label label-success">' + pokeName + '<a name="' + pokeName + '" class="remove" onclick="remove(this)"> <span class="glyphicon glyphicon-remove-circle" style="color: white"></span></a></span> ';

        $.ajax({
            type: "GET",
            url: 'ajax/get_single_pokemon/', //the script to call to get data
            data: {"name": pokeName},
            dataType: 'JSON',                //data format
            success: function(pokemons) {
                console.log(pokemons);


                var regData = getValuesForReg(pokemons);
                var derivedData = getValuesForDerived(pokemons);

                console.log(regData);
                console.log(derivedData);

                var dataset = [];

                dict.push({
                    data: { name: "Charmander",
                            hp: 0,
                            attack: 1,
                            sp_attack: 2,
                            defense: 3,
                            sp_defense: 4,
                            speed: 5
                    }
                });

                // dataset = [{
                //             data: [{
                //                 month: 'Aug',
                //                 count: 123
                //             }, {
                //                 month: 'Sep',
                //                 count: 234
                //             }, {
                //                 month: 'Oct',
                //                 count: 345
                //             }],
                //             name: 'Series #1'
                //         }, {
                //             data: [{
                //                 month: 'Aug',
                //                 count: 235
                //             }, {
                //                 month: 'Sep',
                //                 count: 267
                //             }, {
                //                 month: 'Oct',
                //                 count: 573
                //             }],
                //             name: 'Series #2'
                //         }


            },
            failure: function(pokemons) {
                alert('Got an error dude');
            }
            });
    }
}

function remove(elm){
    var el = elm.parentNode;
    var name = elm.name;
    console.log(name);
    elm.remove();
    el.remove();
}