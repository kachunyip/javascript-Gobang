var GRID_SIZE = 40;
var HORIZONTAL_SIZE = 15;
var VERTICAL_SIZE = 12;


var checkerBoard = [];
var whiteTurn = false;

var cvs = document.getElementById('cvs');
var ctx = cvs.getContext('2d');

cvs.width = HORIZONTAL_SIZE * GRID_SIZE;
cvs.height = VERTICAL_SIZE * GRID_SIZE;

cvs.onclick = putChess;

document.getElementById('restart').onclick = function(){
    init();
}

init();