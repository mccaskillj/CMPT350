/**
 * Created by carmichael on 2017-03-07.
 */

function adjustHp(hp, level){
    var iv = 24;
    var ev = 74;

    return Math.floor(((2 * hp + iv + (ev/4) * level)/ 100) + level + hp);
}

function adjustAttack(attack, level) {
    var iv = 12;
    var ev = 190;

    return Math.floor(((2 * attack + iv + (ev/4) * level)/ 100) + level + attack);
}

function adjustDefense(defense, level){
    var iv = 30;
    var ev = 91;

    return Math.floor(((2 * defense + iv + (ev/4) * level)/ 100) + level + defense);
}

function adjustSpAttack(sp_attack, level){
    var iv = 16;
    var ev = 48;

    return Math.floor(((2 * sp_attack + iv + (ev/4) * level)/ 100) + level + sp_attack);
}

function adjustSpDefense(sp_defense, level){
    var iv = 23;
    var ev = 84;

    return Math.floor(((2 * sp_defense + iv + (ev/4) * level)/ 100) + level + sp_defense);
}

function adjustSpeed(speed, level){
    var iv = 5;
    var ev = 23;

    return Math.floor(((2 *speed + iv + (ev/4) * level)/ 100) + level + speed);
}

function adjustTotal(total, level){
    var iv = 110;
    var ev = 510;

    return Math.floor(((2 * total + iv + (ev/4) * level)/ 100) + level);
}


