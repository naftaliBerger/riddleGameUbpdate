import readline from 'readline-sync';
import fs from 'fs';

import Player from './classes/Player.js';
import Riddle from './classes/Riddle.js';
import { read, create, update, remove } from './riddles/riddleManagement.js';

console.log("Welcome to the Riddle Game!");

const name = readline.question("What is your name? ");
const player1 = new Player(name);

let isRunning = true;

while (isRunning) {
    console.log(`
Select an action:
1. Play
2. Create a new puzzle
3. View all puzzles
4. Update puzzle by ID
5. Delete puzzle by ID
6. View player statistics
7. Exit
    `);

    const choice = readline.question("Enter a selection number: ");

    switch (choice) {
        case "1": {
            const riddles = read();
            for (const item of riddles) {
                const start = Date.now();
                const currentRiddle = new Riddle(item);
                currentRiddle.ask();
                const end = Date.now();
                player1.recordTime(start, end);
            }
            break;
        }

        case "2":
            create();
            break;

        case "3": {
            const riddles = read();
            riddles.forEach(r => {
                console.log(`ID: ${r.id}, Name: ${r.name}, Question: ${r.taskDescription}, Answer: ${r.correctAnswer}`);
            });
            break;
        }

        case "4":
            update();
            break;

        case "5":
            remove();
            break;

        case "6":
            player1.showStats();
            break;

        case "7":
            isRunning = false;
            break;

        default:
            console.log("Invalid selection, please try again");
    }
}
