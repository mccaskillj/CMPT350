var dataset = [[0,"",0,0,0,0,0,0,"",""],
    [0,"",0,0,0,0,0,0,"",""],
    [0,"",0,0,0,0,0,0,"",""],
    [0,"",0,0,0,0,0,0,"",""],
    [0,"",0,0,0,0,0,0,"",""],
    [0,"",0,0,0,0,0,0,"",""]];

var datasetright = [[0,"",0,0,0,0,0,0,"",""],
    [0,"",0,0,0,0,0,0,"",""],
    [0,"",0,0,0,0,0,0,"",""],
    [0,"",0,0,0,0,0,0,"",""],
    [0,"",0,0,0,0,0,0,"",""],
    [0,"",0,0,0,0,0,0,"",""]];

var w = 1224;
var h = 1000;
var x = 0;
var datapos = 0;
var dataposright = 0;

var svg = d3.select('#maindiv').append('svg').attr('height', h).attr('width', w);

var boxes = svg.selectAll("rect").data(dataset);
                boxes.enter()
                    .append("rect")
                    .attr("x", 10)
                    .attr("y", function (d,i) {
                        //console.log('Here');
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

var rectback = svg.selectAll('rect.background')
    .data(dataset);
    rectback.enter()
    .append("rect")
    .classed("background",true)
    .attr("x",170)
    .attr("y",function(d,i){
        return ((110*i)+55)
    })
    .attr('height', 30)
    .attr("width", 255)
    .attr("fill","white")
    .attr("shape-rendering","crispEdges")
    .attr("stroke","black")
    .attr("opacity",0);

var rectfront = svg.selectAll('rect.bar')
    .data(dataset);
    rectfront.enter()
    .append("rect")
    .classed("bar",true)
    .attr("x",170)
    .attr("y",function(d,i){
        return ((110*i)+55)
    })
    .attr('height', 30)
    .attr("width", 0)
    .attr("fill","red")
    .attr("shape-rendering","crispEdges")
    .attr("stroke","black")
    .attr("opacity",0);

//
//###################################################################
//###################################################################
//

var boxesright = svg.selectAll("rect.right").data(datasetright);
boxesright.enter()
    .append("rect")
    .attr("x", 724)
    .attr("y", function (d,i) {
        //console.log('Here');
        return ((110*i))
    })
    .attr("width", 450)
    .attr("height", 105)
    .attr("fill", "#bdbec0")
    .attr("stroke","black")
    .attr("shape-rendering","crispEdges")
    .attr("opacity", 0);

var boxlabelsright = svg.selectAll("text.right")
    .data(datasetright);
//console.log(dataset[0].name);
boxlabelsright.enter()
    .append("text")
    // .text(function (d) {
    //     //console.log("Pokemans:", d.name);
    //     return d.name;
    // })
    .attr("text-anchor","left")
    .attr("x",734)
    .attr("y",function(d,i){
        return ((110*i)+30)
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "24px")
    .attr("opacity",0)
    .attr("fill", "black");

var rectbackright = svg.selectAll('rect.backgroundright')
    .data(datasetright);
rectbackright.enter()
    .append("rect")
    .classed("background",true)
    .attr("x",884)
    .attr("y",function(d,i){
        return ((110*i)+55)
    })
    .attr('height', 30)
    .attr("width", 255)
    .attr("fill","white")
    .attr("shape-rendering","crispEdges")
    .attr("stroke","black")
    .attr("opacity",0);

var rectfrontright = svg.selectAll('rect.barright')
    .data(datasetright);
rectfrontright.enter()
    .append("rect")
    .classed("bar",true)
    .attr("x",884)
    .attr("y",function(d,i){
        return ((110*i)+55)
    })
    .attr('height', 30)
    .attr("width", 0)
    .attr("fill","red")
    .attr("shape-rendering","crispEdges")
    .attr("stroke","black")
    .attr("opacity",0);

// var pokeimage = svg.selectAll("image")
//     .data(dataset)
//     .attr("x",130)
//     .attr("y",function(d,i){
//         return ((110*i)+55)
//     })
//     .attr('width', 20)
//     .attr('height', 24)
//     .attr("opacity",0);

d3.select("#addbuttonleft").on("click",function () {
    var pokeName = document.getElementById("pokeinput").value;
    console.log("left button");
    if (datapos < 6) {
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
                dataset[datapos][3] = pokemons[0].attack;
                dataset[datapos][4] = pokemons[0].defense;
                dataset[datapos][5] = pokemons[0].sp_attack;
                dataset[datapos][6] = pokemons[0].sp_defense;
                dataset[datapos][7] = pokemons[0].speed;
                dataset[datapos][8] = pokemons[0].type_1;
                dataset[datapos][9] = pokemons[0].type_2;
                datapos++;
                //console.log(dataset);
                boxes.transition()
                    .duration(500)
                    .attr("opacity", function (d) {
                    if (d[0] != 0) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
                boxlabels.text(function (d) {
                    //console.log("Pokemon:", d[1]);
                    return d[1];
                    })
                    .transition()
                    .duration(500)
                    .attr("opacity", function (d) {
                        if (d[0] != 0) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });

                rectback.transition()
                    .duration(500)
                    .attr("opacity", function (d) {
                    if (d[0] != 0) {
                        return 1;
                    } else {
                        return 0;
                    }
                });

                rectfront.transition()
                    .duration(1000)
                    .attr("width", function (d) {
                        return (d[2]);
                    })
                    .attr("opacity", 1);
                console.log("before");
                // pokeimage
                //     .attr("xlink:href",function (d) {
                //         console.log(frontPath + d[0] + '.png');
                //         return frontPath + d[0] + '.png'
                //     })
                //     .attr("opacity", 1);
                console.log(dataset[datapos][0]);
                $("#imageleft1 image")
                    .attr("x",130)
                    .attr("y",100)
                    .attr("width",10)
                    .attr("height",20)
                    .attr('xlink:href', function () {
                        console.log(frontPath + '45' + '.png');
                        return frontPath + '45' + '.png'
                    });
                    // .attr('xlink:href', frontPath + dataset[datapos][0] + '.png');
            }

        });
    }else{
        alert("You have reach the maximum limit to your pokemon")

    }

});


d3.select("#addbuttonright").on("click",function () {
    var pokeName = document.getElementById("pokeinput").value;
    console.log("right button");
    if (dataposright < 6) {
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
                datasetright[dataposright][0] = pokemons[0].id;
                datasetright[dataposright][1] = pokemons[0].name;
                datasetright[dataposright][2] = pokemons[0].hp;
                datasetright[dataposright][3] = pokemons[0].attack;
                datasetright[dataposright][4] = pokemons[0].defense;
                datasetright[dataposright][5] = pokemons[0].sp_attack;
                datasetright[dataposright][6] = pokemons[0].sp_defense;
                datasetright[dataposright][7] = pokemons[0].speed;
                datasetright[dataposright][8] = pokemons[0].type_1;
                datasetright[dataposright][9] = pokemons[0].type_2;
                dataposright++;
                //console.log(dataset);
                boxesright.transition()
                    .duration(500)
                    .attr("opacity", function (d) {
                        if (d[0] != 0) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });
                boxlabelsright.text(function (d) {
                    //console.log("Pokemon:", d[1]);
                    return d[1];
                })
                    .transition()
                    .duration(500)
                    .attr("opacity", function (d) {
                        if (d[0] != 0) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });

                rectbackright.transition()
                    .duration(500)
                    .attr("opacity", function (d) {
                        if (d[0] != 0) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });

                rectfrontright.transition()
                    .duration(1000)
                    .attr("width", function (d) {
                        return (d[2]);
                    })
                    .attr("opacity", 1);
            }
        });
    }else{
        alert("You have reach the maximum limit to your pokemon")

    }

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