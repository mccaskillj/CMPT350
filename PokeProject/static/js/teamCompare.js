var dataset = [[0,"",0],
    [0,"",0],
    [0,"",0],
    [0,"",0],
    [0,"",0],
    [0,"",0]];

var w = 1224;
var h = 1000;
var x = 0;
var datapos = 0;

var svg = d3.select('#maindiv').append('svg').attr('height', h).attr('width', w);

var boxes = svg.selectAll("rect").data(dataset);
                boxes.enter()
                    .append("rect")
                    .attr("x", 10)
                    .attr("y", function (d,i) {
                        console.log('Here');
                        return ((110*i))
                    })
                    .attr("width", 450)
                    .attr("height", 105)
                    .attr("fill", "#bdbec0")
                    .attr("stroke","black")
                    .attr("shape-rendering","crispEdges")
                    .attr("opacity", 0);

var boxlabels = svg.selectAll("text")
    .data(dataset);
    //console.log(dataset[0].name);
    boxlabels.enter()
        .append("text")
        // .text(function (d) {
        //     //console.log("Pokemans:", d.name);
        //     return d.name;
        // })
        .attr("text-anchor","left")
        .attr("x",20)
        .attr("y",function(d,i){
            return ((110*i)+30)
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "24px")
        .attr("opacity",0)
        .attr("fill", "black");

d3.select("#addbuttonleft").on("click",function () {
    var pokeName = document.getElementById("pokeinput").value;
        $.ajax({
            type: "GET",
            url: 'ajax/get_single_pokemon/', //the script to call to get data
            data: {"name": pokeName},
            dataType: 'JSON',                //data format
            success: function (pokemons) {
                // dataset.push({
                //     d: pokemons[0].id,
                //     name: pokemons[0].name,
                //     Hp: pokemons[0].hp
                // });
                dataset[datapos][0] = pokemons[0].id;
                dataset[datapos][1] = pokemons[0].name;
                dataset[datapos][2] = pokemons[0].hp;
                datapos++;

                //console.log("dataset::::::",dataset);
                // var boxlabels = svg.selectAll("text")
                //     .data(dataset);
                // //console.log(dataset[0].name);
                // boxlabels.enter()
                //     .append("text")
                //     .text(function (d) {
                //         //console.log("Pokemans:", d.name);
                //         return d.name;
                //     })
                //     .attr("text-anchor","left")
                //     .attr("x",20)
                //     .attr("y",function(d,i){
                //         return ((110*i)+30)
                //     })
                //     .attr("font-family", "sans-serif")
			     //    .attr("font-size", "24px")
                //     .attr("opacity",0)
			     //    .attr("fill", "black");
                // boxlabels.transition()
                //     .duration(500)
                //     .attr("opacity",1);
                // var rectback = svg.selectAll('rect.background')
                //     .data(dataset);
                // rectback.enter()
                //     .append("rect")
                //     .classed("background",true)
                //     .attr("x",170)
                //     .attr("y",function(d,i){
                //         return ((110*i)+55)
                //     })
                //     .attr('height', 30)
                //     .attr("width", 255)
                //     .attr("fill","white")
                //     .attr("shape-rendering","crispEdges")
                //     .attr("stroke","black")
                //     .attr("opacity",0);
                // rectback.transition()
                //     .duration(500)
                //     .attr("opacity",1);
                //
                //
                // var rectfront = svg.selectAll('rect.bar')
                //     .data(dataset);
                // rectfront.enter()
                //     .append("rect")
                //     .classed("bar",true)
                //     .attr("x",170)
                //     .attr("y",function(d,i){
                //         return ((110*i)+55)
                //     })
                //     .attr('height', 30)
                //     .attr("width", 0)
                //     .attr("fill","red")
                //     .attr("shape-rendering","crispEdges")
                //     .attr("stroke","black")
                //     .attr("opacity",0);
                // rectfront.transition()
                //     .duration(500)
                //     .attr("width", function (d) {
                //         return (d.Hp);
                //     })
                //     .attr("opacity",1);
                //$("#imageleft1 image").attr('xlink:href', frontPath + dataset[0].id + '.png');
            }

        });
        boxes.attr("opacity",function (d) {
            if (d[0] != 0){
                return 1;
            }else{
                return 0;
            }
        });
        boxlabels.text(function (d) {
            console.log("Pokemans:", d[1]);
            return d[1];
        })
});




// $("#tags").keyup(function(event){
//     if(event.keyCode == 13){
//         $("#sb").click();
//     }
// });

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

    $( "#pokeinput" ).autocomplete({
      source: pokemonNames
    });

});

// $(document).ready(function() {
//     $("#addbuttonleft1").click(function () {
//         //alert( "Handler for .click() called." );
//         $('#pokeleft1search').toggle();
//         document.getElementById("closepokeleft1").style.visibility="visible";
//         document.getElementById("poke1leftImage").style.visibility="visible";
//     });
//     $("#closepokeleft1").click(function () {
//         $('#pokeleft1search').toggle();
//         $('#pokeleft1input').val('');
//         document.getElementById("closepokeleft1").style.visibility="hidden";
//         document.getElementById("poke1leftImage").style.visibility="hidden";
//     });
// });

// d3.select("#addbuttonleft1").on("click", function() {
//     var selectPoke = document.getElementById("pokeleft1input").value;
//     console.log("Selected Poke: ", selectPoke);
//     var validPoke = checkPoke(selectPoke);
//     console.log("Selected pokemon is valid",validPoke);
//     if (validPoke == 1) {
//             $.ajax({
//                 type: "GET",
//                 url: 'ajax/get_single_pokemon/', //the script to call to get data
//                 data: {"name": selectPoke},
//                 dataType: 'JSON',                //data format
//                 success: function (pokemons) {
//                     console.log("HERE");
//                     var unwantedFirst = ['color', 'name', 'id', 'body_style', 'is_legendary', 'catch_rate',
//                         'generation', 'egg_group_1', 'egg_group_2', 'type_2', 'type_1', 'height', 'width', 'total',
//                         'phys_sweeper', 'sp_sweeper', 'wall', 'phys_tank', 'sp_tank'];
//                     var unwantedSecond = ['color', 'name', 'id', 'body_style', 'is_legendary', 'catch_rate',
//                             'generation', 'egg_group_1', 'egg_group_2', 'type_2', 'type_1', 'height', 'width', 'total',
//                             'hp', 'attack', 'defense', 'sp_attack', 'sp_defense', 'speed'];
//
//                     var id = pokemons[0]['id'];
//
//                     $("#frontImgleft1").attr('src', frontPath + id + '.png');
//                 }
//             })
//     }
//     else{
//         alert("Invalid Pokemon");
//     }
//
// });


// function checkPoke(pokename){
//     var poke = 0;
//
//     $.ajax({
//          type: "GET",
//          url: 'ajax/exists', //the script to call to get data
//          data: {"name": pokename},
//          dataType: 'JSON',                //data format
//          success: function(pokemons) {
//              poke = pokemons['val'];
//              console.log("Poke:", poke);
//              return poke;
//
//          },
//          failure: function(pokemons) {
//              alert('Got an error dude');
//              return 1;
//          }
//      });
//
// }