import readline from 'readline-sync';
import Riddle from './classes/Riddle.js';

const RIDDLE_URL = 'http://localhost:3005/riddles';
const PLAYER_URL = 'http://localhost:3005/players';

export async function getAllRiddles() {
  const res = await fetch(RIDDLE_URL);
  return await res.json();
}

export async function createRiddle(token) {
  const name = readline.question("Enter riddle name: ");
  const question  = readline.question("Enter the riddle question: ");
  const answer = readline.question("Enter the correct answer: ");

  const res = await fetch(RIDDLE_URL, {
    method: 'POST',
    headers: {
       'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ name, question , answer })
  });

  const newRiddle = await res.json();
  console.log("Riddle created:", newRiddle);
}

export async function showAllRiddles() {
  const riddles = await getAllRiddles();
  riddles.forEach(r =>
    console.log(`id: ${r.id}  name: ${r.name}  question: ${r.question }  answer: ${r.answer}`)
  );
}

export async function updateRiddle(token) {
  const id = readline.question("Enter ID of riddle to update: ");
  const name = readline.question("New riddle name: ");
  const question  = readline.question("New question: ");
  const answer = readline.question("New correct answer: ");

  const res = await fetch(`${RIDDLE_URL}/${id}`, {
    method: 'PUT',
    headers: {
       'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ name, question , answer })
  });

  const updated = await res.json();
  console.log("Riddle updated:", updated);
}

export async function deleteRiddle(token) {
  const id = readline.question("Enter id of riddle to delete: ");
  await fetch(`${RIDDLE_URL}/${id}`, { method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
   });
  console.log("Riddle deleted.");
}

export async function playGame(player) {
  const riddles = await getAllRiddles();

  for (const item of riddles) {
    const currentRiddle = new Riddle(item);
    const start = Date.now();

    currentRiddle.ask(); 

    const end = Date.now();
    player.recordTime(start, end);
    console.log(`Answered riddle id ${item.id || item._id} correctly.`);
  }

  const stats = player.getStats();
  console.log(`total time: ${stats.totalTime} seconds`);
  console.log(`average time: ${stats.averageTime} seconds`);

  await savePlayerResult(player.username, stats.totalTime, player.token);
}

async function savePlayerResult(username , totalTime, token) {
  const res = await fetch(PLAYER_URL);
  const players = await res.json();

  const existPlayer = players.find(p => p.username  === username );
// console.log(players, existPlayer, name);

  if (!existPlayer) {
    await fetch(PLAYER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
       },
      body: JSON.stringify({ username,shortestPlayingTime: totalTime}) 
    });
      
    console.log("new player saved!");
  } else if (
    !existPlayer.shortestPlayingTime ||
    parseFloat(totalTime) < parseFloat(existPlayer.shortestPlayingTime)) {
    await fetch(`${PLAYER_URL}/${existPlayer.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
       },
      body: JSON.stringify({
        shortestPlayingTime: totalTime
      })
    });
    console.log("existing player updated with better time!");
  } else {
    console.log("no update needed, existing time is better.");
  }
}
