import readline from 'readline-sync';
import Player from './classes/Player.js';
import {playGame,createRiddle, showAllRiddles,updateRiddle, deleteRiddle} from './manager.js';

console.log("Welcome to the Riddle Game!");
const name = readline.question("What is your name? ");
const player = new Player(name);

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
    case "1":
      await playGame(player);
      break;
    case "2":
      await createRiddle();
      break;
    case "3":
      await showAllRiddles();
      break;
    case "4":
      await updateRiddle();
      break;
    case "5":
      await deleteRiddle();
      break;
    case "6":
      player.showStats();
      break;
    case "7":
      isRunning = false;
      break;
    default:
      console.log("Invalid selection, please try again.");
  }
}

