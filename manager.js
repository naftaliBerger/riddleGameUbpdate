import readline from 'readline-sync';
import Riddle from './classes/Riddle.js';

const RIDDLE_URL = 'http://localhost:3005/riddles';
const PLAYER_URL = 'http://localhost:3005/players';

export async function getAllRiddles() {
  const res = await fetch(RIDDLE_URL);
  return await res.json();
}

export async function createRiddle() {
  const name = readline.question("Enter riddle name: ");
  const taskDescription = readline.question("Enter the riddle question: ");
  const correctAnswer = readline.question("Enter the correct answer: ");

  const res = await fetch(RIDDLE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, taskDescription, correctAnswer })
  });

  const newRiddle = await res.json();
  console.log("Riddle created:", newRiddle);
}

export async function showAllRiddles() {
  const riddles = await getAllRiddles();
  riddles.forEach(r =>
    console.log(`id: ${r.id}  name: ${r.name}  question: ${r.taskDescription}  answer: ${r.correctAnswer}`)
  );
}

export async function updateRiddle() {
  const id = readline.question("Enter ID of riddle to update: ");
  const name = readline.question("New riddle name: ");
  const taskDescription = readline.question("New question: ");
  const correctAnswer = readline.question("New correct answer: ");

  const res = await fetch(`${RIDDLE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, taskDescription, correctAnswer })
  });

  const updated = await res.json();
  console.log("Riddle updated:", updated);
}

export async function deleteRiddle() {
  const id = readline.question("Enter id of riddle to delete: ");
  await fetch(`${RIDDLE_URL}/${id}`, { method: 'DELETE' });
  console.log("Riddle deleted.");
}

export async function playGame(player) {
  const riddles = await getAllRiddles();
  for (const item of riddles) {
    const start = Date.now();
    const currentRiddle = new Riddle(item);
    currentRiddle.ask();
    const end = Date.now();
    player.recordTime(start, end);
  }

  const stats = player.getStats();
  console.log(`Total Time: ${stats.totalTime} seconds`);
  console.log(`Average Time: ${stats.averageTime} seconds`);

  await savePlayerResult(player.name, stats.totalTime);
}

async function savePlayerResult(name, totalTime) {
  const res = await fetch(PLAYER_URL);
  const players = await res.json();

  const existPlayer = players.find(p => p.name === name);
// console.log(players, existPlayer, name);

  if (!existPlayer) {
    await fetch(PLAYER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        shortestPlayingTime: totalTime
      })
    });
    console.log("New player saved!");
  } else if (parseFloat(totalTime) < parseFloat(existPlayer.shortestPlayingTime)) {
    await fetch(`${PLAYER_URL}/${existPlayer.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        shortestPlayingTime: totalTime
      })
    });
    console.log("Existing player updated with better time!");
  } else {
    console.log("No update needed, existing time is better.");
  }
}
