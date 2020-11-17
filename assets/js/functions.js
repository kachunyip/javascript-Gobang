function init() {
    for (var i = -5; i < HORIZONTAL_SIZE + 5; i++) {
        checkerBoard[i] = [];
        for (var j = -5; j < VERTICAL_SIZE + 5; j++) {
            checkerBoard[i][j] = {
                state: false,
                type: true
            }
        }
    }
    drawCheckerBoard();
    cvs.onclick = putChess;
}

function drawCheckerBoard() {
    for (var i = 0; i < HORIZONTAL_SIZE; i++) {
        for (var j = 0; j < VERTICAL_SIZE; j++) {
            ctx.beginPath();
            
            ctx.strokeStyle = '#000';
            ctx.fillStyle = '#ffc0cb';
            ctx.fillRect(i * GRID_SIZE, j * GRID_SIZE, GRID_SIZE, GRID_SIZE);
            ctx.strokeRect(i * GRID_SIZE, j * GRID_SIZE, GRID_SIZE, GRID_SIZE);

            ctx.closePath();
        }
    }
}

function drawArc(x, y){
    ctx.beginPath();

    ctx.fillStyle = (whiteTurn === false ? '#000' : '#fff');
    ctx.arc(x * GRID_SIZE + GRID_SIZE / 2, y * GRID_SIZE + GRID_SIZE / 2, (GRID_SIZE / 2) * 0.9, 0, 2 * Math.PI);
    ctx.fill();

    ctx.closePath();

    checkerBoard[x][y].state = true;
    checkerBoard[x][y].type = whiteTurn;
    whiteTurn = !whiteTurn;
}

function putChess(e){
    var x = e.pageX - cvs.offsetLeft;
    var y = e.pageY - cvs.offsetTop;

    x = parseInt(x / GRID_SIZE);
    y = parseInt(y / GRID_SIZE);

    if(checkerBoard[x][y].state === true)
        return;

    drawArc(x, y);

    document.getElementById('tips').innerText = 'now is ' + (whiteTurn === true?'white':'black') + ' turn';

    gameover(x, y);
}

function gameover(x, y){
    if(!checkAllDirectionChess(x, y)) return;

    var chess = (whiteTurn === true? 'black':'white');
    document.getElementById('tips').innerText = chess + ' win';
    cvs.onclick = null;
}

function checkAllDirectionChess(x, y){
    if(checkOneLineChess(x - 5, y - 5, 1, 1, checkerBoard[x][y].type)) return true;
    if(checkOneLineChess(x    , y - 5, 0, 1, checkerBoard[x][y].type)) return true;
    if(checkOneLineChess(x + 5, y - 5, -1, 1, checkerBoard[x][y].type)) return true;
    if(checkOneLineChess(x - 5, y, 1, 0, checkerBoard[x][y].type)) return true;

    return false;
}

function checkOneLineChess(tpx, tpy, xPlus, yPlus, type){
    var count = 0;
    for(i = 0; i < 10; i++){
        if(checkerBoard[tpx][tpy].type === type && checkerBoard[tpx][tpy].state === true){
            count++;
            if(count >= 5) return true;
        }else{
            count = 0;
        }
        tpx += xPlus;
        tpy += yPlus;
    }
    return false;
}