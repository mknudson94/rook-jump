function randomInt(max) {
    return Math.round(Math.random() * Math.floor(max));
  }

// function weightedRandom(max, min=1) {
//     // found in comments of https://stackoverflow.com/questions/8435183/generate-a-weighted-random-number
//     // tends exponentially to min
//     return max + 1 - Math.round(max / (Math.random() * max + min));
// }

// function grid2lin(pos, size) {
//     return pos.row * size + pos.col;
// }

function lin2grid(i, size) {
    return {
        row: i % size, 
        col: Math.floor(i / size)
    };
}

function isSuccessor(board, size, active, i) {
    let sameColumn = ((i - active) % size === 0);
    let sameRow = (Math.floor(i/size) === Math.floor(active/size));
    let horizontalAway = (Math.abs(i-active) === board[active]);
    let verticalAway = (Math.abs(Math.floor(i / size) - Math.floor(active / size)) === board[active]);
    return ((sameRow && horizontalAway) || (sameColumn && verticalAway)); 
  }

function fitness(gameBoard, size, difficulty) {
    // fitness of board, fitness of 0 means no solutions.
    let fitness = 0;
    let frontier = [];
    let explored = [];
    let goal = gameBoard.length - 1;

    let paths = {
        0: [0],
    }    

    frontier.push(0);
    let curr;
    while (frontier.length !== 0) {
        curr = frontier.shift();
        explored.push(curr);
        let successors = [];
        // TODO: optimize this
        for (let i = 0; i < gameBoard.length; i++) {
            if (isSuccessor(gameBoard, size, curr, i)) {
                successors.push(i);
            }
        }
        for (let successor of successors) {
            // test for solvability
            if (successor === goal) fitness = 1;
            if (!explored.includes(successor) && !frontier.includes(successor)) {
                frontier.push(successor);
                paths[successor] =  paths[curr].concat(successor);
            } 
        };
    }
    if (fitness === 0) return fitness;

    fitness *= paths[goal].length / difficulty;
    // console.log(paths);
    console.log(fitness);
    if (fitness > 1) console.log(paths);

    return fitness;
}

function getNeighbor(gameBoard) {
    // randomly change a square's value to the value of another square.
    // This bypasses the need to calculate the max permissible value.
    // Swap with any square other than goal(choose from index 0 to length - 2), which is 0.
    let neighbor = gameBoard.slice();
    neighbor[randomInt(gameBoard.length - 1)] = neighbor[randomInt(gameBoard.length - 2)];
    return neighbor;
}

function initGameBoard(size) {
    let gameBoard = Array(size**2).fill(null);
    
    for (let i = 0; i < size**2; i++) {
        let pos = lin2grid(i, size);
        let max = Math.max(Math.abs(pos.row - Math.floor(size/2)), Math.abs(pos.col - Math.floor(size/2))) + Math.floor(size/2);
        // one's tricks to make sure we don't get any zeros
        gameBoard[i] = randomInt(max - 1) + 1;
    }

    gameBoard[gameBoard.length - 1] = 0;

    return gameBoard;
}

function boardGenerator(difficulty) {
    let size = Math.floor(difficulty/3) + 3;
    let gameBoard = initGameBoard(size);
    let thisFit = fitness(gameBoard, size, difficulty);
    while (thisFit <= 1) {
        let neighbor = getNeighbor(gameBoard);
        let neighborFitness = fitness(neighbor, size, difficulty)
        if (neighborFitness > thisFit) gameBoard = neighbor;
        thisFit = neighborFitness;
    }
    console.log(thisFit ? 'Board is solvable' : 'Board is impossible');
    return gameBoard;
}

// const easyBoard = [3, 4, 3, 2, 4, 
//                    2, 3, 3, 3, 2,
//                    3, 3, 2, 1, 3,
//                    3, 2, 1, 3, 1,
//                    4, 4, 3, 2, 0];

// console.log(fitness(easyBoard, 5));

// boardGenerator(3);

export default boardGenerator;