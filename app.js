import readline from 'readline-sync';
import Player from './classes/Player.js';
import { playGame, createRiddle, showAllRiddles, updateRiddle, deleteRiddle } from './manager.js';

console.log("Welcome to the Riddle Game!");
const username = readline.question("What is your name? ");
const token = readline.question("Paste your JWT token: ");
const player = new Player(username, token);

let isRunning = true;

while (isRunning) {
  console.log(`
Select an action:
1. Play
2. Create a new puzzle
3. View all puzzles
4. Update puzzle by ID
5. Delete puzzle by ID
6. Exit
  `);

  const choice = readline.question("Enter a selection number: ");

  switch (choice) {
    case "1":
      await playGame(player);
      break;
    case "2":
      await createRiddle(player.token);
      break;
    case "3":
      await showAllRiddles();
      break;
    case "4":
      await updateRiddle(player.token);
      break;
    case "5":
      await deleteRiddle(player.token);
      break;
    case "6":
      isRunning = false;
      break;
    default:
      console.log("Invalid selection, please try again.");
  }
}
