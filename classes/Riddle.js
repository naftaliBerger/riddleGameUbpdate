import readline from 'readline-sync';

export default class riddle {
    constructor({ id, name, taskDescription, correctAnswer }) {
        this.id = id;
        this.name = name;
        this.taskDescription = taskDescription;
        this.correctAnswer = correctAnswer;
    }

    //
    ask() {
        let bool = true
        while (bool) {
            console.log(this.taskDescription);
            const answer = readline.question("your answer: ");
            if (answer === this.correctAnswer) {
                console.log("Correct answer!!");
                bool = false;
            } else {
                console.log("Incorrect answer, try again");
            }
            
        }
    }
}
