import * as bg from './boardGenerator';

const easyBoard = [3, 4, 3, 2, 4, 
                   2, 3, 3, 3, 2,
                   3, 3, 2, 1, 3,
                   3, 2, 1, 3, 1,
                   4, 4, 3, 2, 0];


function timeTest() {
    for (let j = 12; j < 15; j++) {
        console.log(`starting level ${j}`);
        let start = new Date;
        let i;
        for (i = 0; i < 10; i++) bg.boardGenerator(j);
        let end = new Date;
        console.log(`Average time with restart (${j}): ${(end-start)/i}`);
    }
}

console.log(bg.fitness(easyBoard, 5, 5) !== 0);

