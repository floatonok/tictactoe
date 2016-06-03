console.log('app started');

var square = $('.square');
var button = $('.reset');

function updateMessage(message) {
    $( "#message" ).text(message);
};
updateMessage("Game Start!");

function updateSquare(sq, move) {
    if (sq.is(':empty')) {
        sq.append(move);
    } else {
        return false;
    }
}


square.click( function(){
    updateSquare($(this), move);
    playTurn($(this).attr("id"));
    updateMessage("Player " + move.toUpperCase() + "'s Turn!");
    console.log(grid);
})

button.click(restart);

grid = [0, 0, 0,
        0, 0, 0,
        0, 0, 0];

var move = 'x';

function playTurn(i) {
    if (grid[i] || isGameOver()) {
        return false;
    } else {
        grid[i] = move;
        if (whoWon() && whoWon() !== 3) {
            alert("you won!!");
        } else if (whoWon() === 3) {
            alert("it's a draw!");
        } else if (move === 'x') {
            move = 'o';
        } else {
            move ='x';
        } return true;
    }
};

function isGameOver() {
    if (whoWon()) {
        restart();
        return true;
    }
    return false;
};

function whoWon() {
    var winByRowX = (grid[0] === grid[1] && grid[0] === grid[2] && grid[0] === 'x') || (grid[3] === grid[4] && grid[3] === grid[5] && grid[3] === 'x') || (grid[6] ===  grid[7] && grid[6] ===  grid[8] && grid[6] === 'x');
    var winByColX = (grid[0] === grid[3] && grid[0] === grid[6] && grid[0] === 'x') ||  (grid[1] === grid[4] && grid[1] === grid[7] && grid[1] === 'x') || (grid[2] ===  grid[5] && grid[2] ===  grid[8] && grid[2] === 'x');
    var winByDiagX = (grid[0] === grid[4] && grid[0] === grid[8] && grid[0] === 'x') ||  (grid[2] === grid[4] && grid[2] === grid[6] && grid[2] === 'x');

    var winByRowO = (grid[0] === grid[1] && grid[0] === grid[2] && grid[0] === 'o') ||  (grid[3] === grid[4] && grid[3] === grid[5] && grid[3] === 'o') || (grid[6] ===  grid[7] && grid[6] ===  grid[8] && grid[6] === 'o');
    var winByColO = (grid[0] === grid[3] && grid[0] === grid[6] && grid[0] === 'o') ||  (grid[1] === grid[4] && grid[1] === grid[7] && grid[1] === 'o') || (grid[2] ===  grid[5] && grid[2] ===  grid[8] && grid[2] === 'o');
    var winByDiagO = (grid[0] === grid[4] && grid[0] === grid[8] && grid[0] === 'o') ||  (grid[2] === grid[4] && grid[2] === grid[6] && grid[2] === 'o');

    if (winByRowX || winByColX || winByDiagX) return 1;
    if (winByRowO || winByColO || winByDiagO) return 2;
    if (grid[0] && grid[1] && grid[2] && grid[3] && grid[4] && grid[5] && grid[6] && grid[7] && grid[8]) return 3;
    return 0;
};

function restart() {
    grid = [0, 0, 0,
            0, 0, 0,
            0, 0, 0];
    move = 'x';
    square.empty();
    console.log(grid);
};
