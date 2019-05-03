function randomInt(max) {
    return Math.round(Math.random() * Math.floor(max));
  }

function weightedRandom(max) {
    // found in comments of https://stackoverflow.com/questions/8435183/generate-a-weighted-random-number
    // tends exponentially to min (hard-coded here to 1)
    return max + 1 - Math.round(max / (Math.random() * max + 1));
}

function lin2grid(i, size) {
    return {
        row: i % size, 
        col: Math.floor(i / size)
    };
}

function grid2lin(pos, size) {
    return pos.row * size + pos.col;
}

function isNeighbor(board, size, active, i) {
    let sameColumn = ((i - active) % size === 0);
    let sameRow = (Math.floor(i/5) === Math.floor(active/5));
    let horizontalAway = (Math.abs(i-active) === board[active]);
    let verticalAway = (Math.abs(Math.floor(i / size) - Math.floor(active / size)) === board[active]);
    return ((sameRow && horizontalAway) || (sameColumn && verticalAway)); 
  }

function solvable(gameBoard, size) {
    let frontier = [];
    let explored = [];
    frontier.push(0);
    let curr;
    while (frontier.length !== 0) {
        curr = frontier.shift();
        explored.push(curr);
        let neighbors = [];
        // TODO: optimize this
        for (let i = 0; i < gameBoard.length; i++) {
            if (isNeighbor(gameBoard, size, curr, i)) {
                neighbors.push(i);
            }
        }
        for (let neighbor of neighbors) {
            if (neighbor === gameBoard.length - 1) return true;
            if (!explored.includes(neighbor) && !frontier.includes(neighbor)) frontier.push(neighbor);
        };
    }
    return false;
}

function initGameBoard(size) {
    let gameBoard = Array(size**2).fill(null);
    
    for (let i = 0; i < size**2; i++) {
        let pos = lin2grid(i, size);
        let max = Math.max(Math.abs(pos.row - Math.floor(size/2)), Math.abs(pos.col - Math.floor(size/2))) + Math.floor(size/2);
        // one's tricks to make sure we don't get any zeros
        gameBoard[i] = randomInt(max - 1) + 1;
    }

    return gameBoard;
}

function boardGenerator(size) {
    let gameBoard = initGameBoard(size);
    console.log(solvable(gameBoard, size));
    return gameBoard;
}

const easyBoard = [3, 4, 3, 2, 4, 
                   2, 3, 3, 3, 2,
                   3, 3, 2, 1, 3,
                   3, 2, 1, 3, 1,
                   4, 4, 3, 2, 0];

// console.log(solvable(easyBoard, 5));

// boardGenerator(3);

export default boardGenerator;