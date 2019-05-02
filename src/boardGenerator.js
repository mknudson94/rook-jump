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

function boardGenerator(size) {
    let gameBoard = Array(size**2).fill(null);
    
    for (let i = 0; i < size**2; i++) {
        let pos = lin2grid(i, size);
        let max = Math.max(Math.abs(pos.row - Math.floor(size/2)), Math.abs(pos.col - Math.floor(size/2))) + Math.floor(size/2);
        // one's tricks to make sure we don't get any zeros
        gameBoard[i] = randomInt(max - 1) + 1;
    }

    return gameBoard;
}

export default boardGenerator;