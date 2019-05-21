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
        row: Math.floor(i / size),
        col: i % size
    };
}

function GameBoard(board, size, difficulty, fitness=0, solution=null) {
    return {board, size, difficulty, fitness, solution};
}

function isSuccessor(gameBoard, active, i) {
    let board = gameBoard.board;
    let size = gameBoard.size;
    let sameColumn = ((i - active) % size === 0);
    let sameRow = (Math.floor(i/size) === Math.floor(active/size));
    let horizontalAway = (Math.abs(i-active) === board[active]);
    let verticalAway = (Math.abs(Math.floor(i / size) - Math.floor(active / size)) === board[active]);
    return ((sameRow && horizontalAway) || (sameColumn && verticalAway)); 
  }

function fitness(gameBoard) {
    // fitness of board, fitness of 0 means no solutions.
    let fitness = 0;
    let frontier = [];
    let explored = [];
    let goal = gameBoard.board.length - 1;

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
        for (let i = 0; i < gameBoard.board.length; i++) {
            if (isSuccessor(gameBoard, curr, i)) {
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
    if (paths.hasOwnProperty(goal)) fitness *= paths[goal].length / gameBoard.difficulty;

    return GameBoard(gameBoard.board, gameBoard.size, gameBoard.difficulty, fitness, paths[goal]);
}

function getNeighbor(gameBoard) {
    // randomly change a square's value to the value of another square.
    // This bypasses the need to calculate the max permissible value.
    // Swap with any square other than goal(choose from index 0 to length - 2), which is 0.
    let neighbor = gameBoard.board.slice();
    neighbor[randomInt(neighbor.length - 2)] = neighbor[randomInt(neighbor.length - 2)];
    return fitness(GameBoard(neighbor, gameBoard.size, gameBoard.difficulty));
}

function initGameBoard(size, difficulty) {
    let board = Array(size**2).fill(null);
    
    for (let i = 0; i < size**2; i++) {
        let pos = lin2grid(i, size);
        let max = Math.max(Math.abs(pos.row - Math.floor(size/2)), Math.abs(pos.col - Math.floor(size/2))) + Math.floor(size/2);
        // one's tricks to make sure we don't get any zeros
        board[i] = randomInt(max - 1) + 1;
    }

    board[board.length - 1] = 0;

    return fitness(GameBoard(board, size, difficulty));
}

function boardGenerator(difficulty) {
    let restartRate = 30 + 10 * difficulty;
    let size = Math.floor((difficulty - 1)/3) + 4;
    let gameBoard = initGameBoard(size, difficulty);

    // hill climb with random restart
    // infinite loop, with inc variable
    for (let i = 0; true; i++) {
        let neighbor = getNeighbor(gameBoard);
        if (neighbor.fitness > gameBoard.fitness) {
            gameBoard = neighbor;
        }

        if (gameBoard.fitness > 1) {
            //prep for return
            let solution = [];
            gameBoard.solution.forEach(i => solution.push(lin2grid(i, gameBoard.size)));
            gameBoard.solution = solution;
            gameBoard.iterations = i + 1;
            console.log(gameBoard);
            return gameBoard;
        } else if (i % restartRate === 0) {
            // RANDOM RESTART
            gameBoard = initGameBoard(size, difficulty);
        }
    }
}

export default boardGenerator;
export { lin2grid };