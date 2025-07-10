import readline from 'readline-sync';
import Riddle from './classes/Riddle.js';

const URL = 'http://localhost:3005/riddles';

export async function getAllRiddles() {
  const res = await fetch(URL);
  return await res.json();
}

export async function getRiddleById(id) {
  const res = await fetch(`${URL}/${id}`);
  return await res.json();
}

export async function createRiddle() {
  const name = readline.question("Enter riddle name: ");
  const taskDescription = readline.question("Enter the riddle question: ");
  const correctAnswer = readline.question("Enter the correct answer: ");

  const res = await fetch(URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, taskDescription, correctAnswer })
  });

  const newRiddle = await res.json();
  console.log("Riddle created:", newRiddle);
}

export async function updateRiddle() {
  const id = readline.questionInt("Enter ID of riddle to update: ");
  const name = readline.question("New riddle name: ");
  const taskDescription = readline.question("New question: ");
  const correctAnswer = readline.question("New correct answer: ");

  const res = await fetch(`${URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, taskDescription, correctAnswer })
  });

  const updated = await res.json();
  console.log("Riddle updated:", updated);
}

export async function deleteRiddle() {
  const id = readline.questionInt("Enter id of riddle to delete: ");
  await fetch(`${URL}/${id}`, { method: 'DELETE' });
  console.log("Riddle deleted.");
}

export async function showAllRiddles() {
  const riddles = await getAllRiddles();
  riddles.forEach(r =>
    console.log(`id: ${r.id}  name: ${r.name}  question: ${r.taskDescription}  answer: ${r.correctAnswer}`)
  );
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
}
