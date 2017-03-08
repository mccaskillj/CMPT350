/**
 * Created by carmichael on 2017-03-07.
 */


function adjustPokemonStats(poke, level) {
    var ivHp = 24;
    var evHp = 74;
    var ivAttack = 12;
    var evAttack = 190;
    var ivDefense = 30;
    var evDefense = 91;
    var ivSpAttack = 16;
    var evSpAttack = 48;
    var ivSpDefense = 23;
    var evSpDefense = 84;
    var ivSpeed = 5;
    var evSpeed = 23;
    var ivTotal = 110;
    var evTotal = 510;
    var newStats = {};

    // Adjust Hp
    newStats['hp'] = ((2 * poke['hp'] + ivHp + (evHp/4) * level)/ 100) + level;

    // Adjust Attack
    newStats['attack']= ((2 * poke['attack'] + ivAttack + (evAttack/4) * level)/ 100) + level;

    // Adjust Defense
    newStats['defense']  = ((2 * poke['defense'] + ivDefense + (evDefense/4) * level)/ 100) + level;

    // Adjust Special Attack
    newStats['sp_attack'] = ((2 * poke['sp_attack'] + ivSpAttack + (evSpAttack/4) * level)/ 100) + level;

    // Adjust Special Defense
    newStats['sp_defense']  = ((2 * poke['sp_defense'] + ivSpDefense + (evSpDefense/4) * level)/ 100) + level;

    // Adjust Speed
    newStats['speed'] = ((2 * poke['speed'] + ivSpeed + (evSpeed/4) * level)/ 100) + level;

    // Adjust Total
    newStats['total'] = ((2 * poke['total'] + ivTotal + (evTotal/4) * level)/ 100) + level;

    return newStats;
}
