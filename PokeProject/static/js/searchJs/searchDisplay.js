var w = 769;
var h = 628;
var r = 40;
var h1 = r+20;
var h5 = h - h1;
var h3 = h/2;
var hi = (h3-h1)/2;
var h4 = h3+hi;
var h2 = h1+hi;
var w1 = h1;
var w5 = w/2;
var w9 = w-w1;
var wi = (w5-w1)/2;
var w3 = w1 + wi;
var w7 = w5 + wi;
wi = (w3-w1)/2;
var w2 = w1 + wi;
var w4 = w3 + wi;
var w6 = w5 + wi;
var w8 = w7 + wi;

//[xvalue, yvalue, pokedex, stat, name, height, weight, radius]
var dataset = [
    [w5,h3,0,0,"",0,0,0],
    [w2,h2,0,0,"",0,0,0],
    [w8,h4,0,0,"",0,0,0],
    [w8,h2,0,0,"",0,0,0],
    [w2,h4,0,0,"",0,0,0],
    [w5,h1,0,0,"",0,0,0],
    [w5,h5,0,0,"",0,0,0],
    [w4,h2,0,0,"",0,0,0],
    [w6,h4,0,0,"",0,0,0],
    [w6,h2,0,0,"",0,0,0],
    [w4,h4,0,0,"",0,0,0],
    [w3,h1,0,0,"",0,0,0],
    [w7,h5,0,0,"",0,0,0],
    [w7,h1,0,0,"",0,0,0],
    [w3,h5,0,0,"",0,0,0],
    [w3,h3,0,0,"",0,0,0],
    [w7,h3,0,0,"",0,0,0],
    [w1,h1,0,0,"",0,0,0],
    [w9,h5,0,0,"",0,0,0],
    [w9,h1,0,0,"",0,0,0],
    [w1,h5,0,0,"",0,0,0],
    [w1,h3,0,0,"",0,0,0],
    [w9,h3,0,0,"",0,0,0],
    [],
    0];


var offset = d3.scale.linear()
    .range([-2,30]);

var rScale =  d3.scale.linear()
    .range([25,60]);

function minmax(dataset) {
    var cnt = 0;
    while(dataset[cnt][3] == 0 && cnt < 23){
        cnt = cnt + 1;
    }
    if (cnt == 23){
        return [0,0];
    }
    var min = dataset[cnt][3];
    var max = dataset[cnt][3];
    for (var i = 1; i<23; i++){
        if (dataset[i][3] != 0) {
            if (dataset[i][3] < min){
                min = dataset[i][3];
            }
            if (dataset[i][3] > max){
                max = dataset[i][3];
            }
        }
    }
    return [min,max];
}

var url = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png';

var generation = document.getElementById("genBody").value;
var type = document.getElementById("typeBody").value;
var color = document.getElementById("colorBody").value;
var weight = "0 - 952";
var height = "0 - 14";
var hp = "0 - 255";
var attack = "0 - 165";
var defense = "0 - 230";
var sp_attack = "0 - 154";
var sp_defense = "0 - 230";
var speed = "0 - 160";
var radio = document.querySelector('input[name = "optradio"]:checked').value;

var svg = d3.select('#mydiv').append('svg').attr('height', h).attr('width', w);

svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr('cx',function (d) {
        return d[0];
    })
    .attr('cy',function (d) {
        return d[1];
    })
    .style('fill', function (d,i) {
        return 'url(#image'+i+')';
    })
    .attr('stroke','black')
    .on("mouseover",function (d) {
        $("#information").text('Pokemon: "'+ d[4] +'" Height: "'+ d[5] +'" Weight: "'+ d[6] +'"');
    })
    .on("mouseout", function () {
        $("#information").text('Pokemon: "None" Height: "None" Weight: "None"');
    })
    .on("click", function (d) {
        console.log(dataset[0]);
        var pos = dataset[24];
        console.log(dataset[23]);
        console.log(pos+" "+dataset[23].length);
        console.log(pos);
        if (pos < dataset[23].length) {
            d[2] = dataset[23][pos].id;
            d[3] = dataset[23][pos].total; // changed this line to total, so that it works lol
            d[4] = dataset[23][pos].name;
            d[5] = dataset[23][pos].height;
            d[6] = dataset[23][pos].weight;
        } else {
            d[2] = 0;
            d[3] = 0;
            d[4] = "";
            d[5] = 0;
            d[6] = 0;
        }
        dataset[24] = dataset[24] + 1;

        var mm = minmax(dataset);

        rScale.domain(mm);
        offset.domain(mm);
        console.log(mm);

        for (var i = 0; i<23; i++){
            if (dataset[i][3] != 0){
                if (mm[0] == mm[1]){
                    dataset[i][7] = 60;
                } else {
                    dataset[i][7] = rScale(dataset[i][3]);
                }
            } else {
                dataset[i][7]=0
            }
        }

        for (i = 0; i < 23; i++) {
            $('#image' + i + ' image')
                .attr('y', function () {
                if (mm[0] == mm[1]){
                    return 30;
                }else {
                    return offset(dataset[i][3]);
                }
            })
            .attr('x', function () {
                if (mm[0] == mm[1]){
                    return 30;
                }else {
                    return offset(dataset[i][3]);
                }
            })
            .attr('xlink:href', frontPath + dataset[i][2] + '.png');
        }
        svg.selectAll("circle")
            .attr('r', function (d) {
                    return d[7];
            });

        console.log(dataset[0]);
    });


console.log(generation, type, color, weight, height, hp, attack, defense, sp_attack, sp_defense, speed, radio);
$.ajax({
    type: "GET",
    url: 'ajax/get_filtered_pokemon/', //the script to call to get data
    data: {"gen": generation, "type":type, "color": color, "weight": weight, "height": height, "hp": hp,
        "attack": attack, "defense": defense, "sp_attack": sp_attack, "sp_defense": sp_defense, "speed": speed,
    "radio": radio},
    dataType: 'json',                //data format
success: function(pokemons) {
    dataset[23] = pokemons;
    var pos = 0;
    for (var i = 0 ; i < 23; i++){
        if (pos<pokemons.length) {
            dataset[i][2] = pokemons[i].id;
            dataset[i][3] = pokemons[i].total; // changed this line to total, so that it works lol
            dataset[i][4] = pokemons[i].name;
            dataset[i][5] = pokemons[i].height;
            dataset[i][6] = pokemons[i].weight;
        } else {
            dataset[i][2] = 0;
            dataset[i][3] = 0;
            dataset[i][4] = "";
            dataset[i][5] = 0;
            dataset[i][6] = 0;
        }
        pos++;
    }
    dataset[24] = pos;

    rScale.domain(minmax(dataset));
    offset.domain(minmax(dataset));

    for (i = 0; i < 23; i++) {
        $('#image' + i + ' image').attr('y', offset(dataset[i][3]))
            .attr('x', offset(dataset[i][3]))
            //.attr('xlink:href', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + dataset[i][2] + '.png')
            .attr('xlink:href', frontPath + dataset[i][2] + '.png');
    }
    svg.selectAll("circle")
            .attr('r', function (d) {
                if (d[3] != 0) {
                    return rScale(d[3]);
                } else {
                    return d[3];
                }
            })
},
failure: function(pokemons) {
    alert('Got an error dude');
}
});

console.log(dataset);


function updater(dataset,svg,rScale,offset) {

    var generation = document.getElementById("genBody").value;
    var type = document.getElementById("typeBody").value;
    var color = document.getElementById("colorBody").value;
    var weight = document.getElementById("amountW").value;
    var height = document.getElementById("amountH").value;
    var hp = document.getElementById("amountHP").value;
    var attack = document.getElementById("amountA").value;
    var defense = document.getElementById("amountD").value;
    var sp_attack = document.getElementById("amountSA").value;
    var sp_defense = document.getElementById("amountSD").value;
    var speed = document.getElementById("amountSP").value;
    var radio = document.querySelector('input[name = "optradio"]:checked').value;


    console.log(generation, type, color, weight, height, hp, attack, defense, sp_attack, sp_defense, speed, radio);
    $.ajax({
        type: "GET",
        url: 'ajax/get_filtered_pokemon/', //the script to call to get data
        data: {"gen": generation, "type":type, "color": color, "weight": weight, "height": height, "hp": hp,
            "attack": attack, "defense": defense, "sp_attack": sp_attack, "sp_defense": sp_defense, "speed": speed,
        "radio": radio},
        dataType: 'json',                //data format
    success: function(pokemons) {
        dataset[23]=pokemons;
        var pos = 0;
        for (var i = 0 ; i < 23; i++){
           if (pos<pokemons.length) {
            dataset[i][2] = pokemons[i].id;
            dataset[i][3] = pokemons[i].total; // changed this line to total, so that it works lol
            dataset[i][4] = pokemons[i].name;
            dataset[i][5] = pokemons[i].height;
            dataset[i][6] = pokemons[i].weight;
            } else {
            dataset[i][2] = 0;
            dataset[i][3] = 0;
            dataset[i][4] = "";
            dataset[i][5] = 0;
            dataset[i][6] = 0;
            }
            pos++;
        }
        dataset[24]=pos;
        rScale.domain(minmax(dataset));
        offset.domain(minmax(dataset));

        for (i = 0; i < 23; i++) {
            $('#image' + i + ' image').attr('y', offset(dataset[i][3]))
                .attr('x', offset(dataset[i][3]))
                //.attr('xlink:href', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + dataset[i][2] + '.png');
                .attr('xlink:href', frontPath + dataset[i][2] + '.png');
        }
        svg.selectAll("circle")
            .attr('r', function (d) {
                if (d[3] != 0) {
                    return rScale(d[3]);
                } else {
                    return d[3];
                }
            })


    },
    failure: function(pokemons) {
        alert('Got an error dude');
    }
    });
    return dataset;
}

d3.select('#genBody').on('change', function () {
    updater(dataset,svg,rScale,offset);
    console.log(dataset);
});

d3.select('#typeBody').on('change', function () {
    updater(dataset,svg,rScale,offset);
});

d3.select('#colorBody').on('change', function () {
    updater(dataset,svg,rScale,offset);
});

d3.select('#slider-range').on('click', function () {
    updater(dataset,svg,rScale,offset);
});

d3.select('#slider-range2').on('click', function () {
    updater(dataset,svg,rScale,offset);
});

d3.select('#slider-range3').on('click', function () {
    updater(dataset,svg,rScale,offset);
});

d3.select('#slider-range4').on('click', function () {
    updater(dataset,svg,rScale,offset);
});

d3.select('#slider-range5').on('click', function () {
    updater(dataset,svg,rScale,offset);
});

d3.select('#slider-range6').on('click', function () {
    updater(dataset,svg,rScale,offset);
});

d3.select('#slider-range7').on('click', function () {
    updater(dataset,svg,rScale,offset);
});

d3.select('#slider-range8').on('click', function () {
    updater(dataset,svg,rScale,offset);
});

d3.select('#StatRadio').on('change', function () {
    updater(dataset,svg,rScale,offset);
});