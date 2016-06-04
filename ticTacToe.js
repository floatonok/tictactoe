console.log('app started');
var grid = [0, 0, 0,
            0, 0, 0,
            0, 0, 0];

var move = 'x';

function playTurn (i) {
  if (grid[i] || isGameOver()) {
    return false;
  } else {
    grid[i] = move;
    console.log(whoWon());
    if (whoWon() === 1) {
      alert('Player X wins!');
    } else if (whoWon() === 2) {
      alert('Player O wins!');
    } else if (whoWon() === 3) {
      alert("It's a draw!");
    }
    if (move === 'x') {
      move = 'o';
    } else {
      move = 'x';
    } return true;
  }
}

function isGameOver () {
  if (whoWon()) {
    restart();
    return true;
  }
  return false;
}

function whoWon () {
  var winByRowX = (grid[0] === grid[1] && grid[0] === grid[2] && grid[0] === 'x') || (grid[3] === grid[4] && grid[3] === grid[5] && grid[3] === 'x') || (grid[6] === grid[7] && grid[6] === grid[8] && grid[6] === 'x');
  var winByColX = (grid[0] === grid[3] && grid[0] === grid[6] && grid[0] === 'x') || (grid[1] === grid[4] && grid[1] === grid[7] && grid[1] === 'x') || (grid[2] === grid[5] && grid[2] === grid[8] && grid[2] === 'x');
  var winByDiagX = (grid[0] === grid[4] && grid[0] === grid[8] && grid[0] === 'x') || (grid[2] === grid[4] && grid[2] === grid[6] && grid[2] === 'x');

  var winByRowO = (grid[0] === grid[1] && grid[0] === grid[2] && grid[0] === 'o') || (grid[3] === grid[4] && grid[3] === grid[5] && grid[3] === 'o') || (grid[6] === grid[7] && grid[6] === grid[8] && grid[6] === 'o');
  var winByColO = (grid[0] === grid[3] && grid[0] === grid[6] && grid[0] === 'o') || (grid[1] === grid[4] && grid[1] === grid[7] && grid[1] === 'o') || (grid[2] === grid[5] && grid[2] === grid[8] && grid[2] === 'o');
  var winByDiagO = (grid[0] === grid[4] && grid[0] === grid[8] && grid[0] === 'o') || (grid[2] === grid[4] && grid[2] === grid[6] && grid[2] === 'o');

  if (winByRowX || winByColX || winByDiagX) return 1;
  if (winByRowO || winByColO || winByDiagO) return 2;
  if (grid[0] && grid[1] && grid[2] && grid[3] && grid[4] && grid[5] && grid[6] && grid[7] && grid[8]) return 3;
  return 0;
}

function restart () {
    // grid = [0, 0, 0,
    //         0, 0, 0,
    //         0, 0, 0];
    // move = 'x';
    // square.empty();
  // console.log(grid);
  location.reload();
}

// jquery

var square = $('.square');
var reset = $('.reset');
var computerMode = $('.computer');
multiplayer();

function updateMessage (message) {
  $('#message').text(message);
}
updateMessage('Game Start!');

function updateSquare (sq, move) {
  if (sq.is(':empty')) {
    sq.append(move);
  } else {
    return false;
  }
}

function multiplayer () {
  square.click(function () {
    updateSquare($(this), move);
    playTurn($(this).attr('id'));
    updateMessage('Player ' + move.toUpperCase() + "'s Turn!");
    // console.log(grid);
  });
}

reset.click(restart);
computerMode.click(playWithComputer);

function playWithComputer () {
  square.click(function () {
    updateSquare($(this), move);
    playTurn($(this).attr('id'));
    computerMove();
    updateMessage('Player ' + move.toUpperCase() + "'s Turn!");
        // console.log(grid);
  });
}

function computerMove () {
  var indexComp = Math.floor(Math.random() * 8);
  if (grid[indexComp]) computerMove();
  else {
    if (whoWon() === 1) {
      return false;
    }
    grid[indexComp] = 'o';
    for (var i = 0; i < 9; i++) {
      if (indexComp === i) $('#' + i).append('o');
    }
    if (whoWon() === 2) {
      alert('Computer Wins!');
    } else if (whoWon() === 3) {
      alert("it's a draw!");
    }
    move = 'x';
  }
}
