import fs from "fs";
import rl from "readline-sync";


//read
export function read() {
    try {
        const data = fs.readFileSync("./riddles/db.txt", "utf8");
        return JSON.parse(data);
    } catch (error) {
        console.log("error", error);
    }
}


//create
export function create() {
  const data = fs.readFileSync("./riddles/db.txt", "utf8");
  const allData = JSON.parse(data);

  const puzzleName = rl.question("Please enter a name for the puzzle: ");
  const taskDescription = rl.question("Please enter the puzzle question: ");
  const correctAnswer = rl.question("Please enter the correct answer: ");

  const newRiddle = {
    id: allData.length + 1,
    name: puzzleName,
    taskDescription: taskDescription,
    correctAnswer: correctAnswer
  };

  allData.push(newRiddle);
  fs.writeFileSync("./riddles/db.txt", JSON.stringify(allData));
  console.log("Riddle added successfully!");
}


export function update() {
    try {
      const data = fs.readFileSync("./riddles/db.txt", "utf8");
      const allData = JSON.parse(data);
  
      const idToUpdate = parseInt(rl.question("Enter the ID of the puzzle to update: "));
      const index = allData.findIndex(r => r.id === idToUpdate);
  
      if (index === -1) {
        console.log("No puzzle found with this ID.");
        return;
      }
  
      const updatedName = rl.question("Enter new puzzle name: ");
      const updatedQuestion = rl.question("Enter new question: ");
      const updatedAnswer = rl.question("Enter new correct answer: ");
  
      allData[index] = {
        id: idToUpdate,
        name: updatedName,
        taskDescription: updatedQuestion,
        correctAnswer: updatedAnswer
      };
  
      fs.writeFileSync("./riddles/db.txt", JSON.stringify(allData));
      console.log("Puzzle updated successfully!");
    } catch (err) {
      console.error("Error:", err.message);
    }
  }
  

  export function remove() {
    try {
      const data = fs.readFileSync("./riddles/db.txt", "utf8");
      const allData = JSON.parse(data);
  
      const idToDelete = parseInt(rl.question("Enter the ID of the puzzle to be deleted: "));
      const index = allData.findIndex(r => r.id === idToDelete);
  
      if (index === -1) {
        console.log("No puzzle found with this ID.");
        return;
      }
  
      allData.splice(index, 1);
  
     
      allData.forEach((riddle, i) => {
        riddle.id = i + 1;
      });
  
      fs.writeFileSync("./riddles/db.txt", JSON.stringify(allData));
      console.log("The puzzle was successfully deleted!");
    } catch (error) {
      console.log("error:", error.message);
    }
  }
  