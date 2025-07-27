import readline from 'readline-sync';

export default class Riddle {
    constructor({ id,_id, name, question , correctAnswer,answer }) {
        this.id = id || _id;
        this.name = name;
        this.question  = question ;
        this.answer = correctAnswer || answer;
    }

    //
    ask() {
        let bool = true
        while (bool) {
            console.log(this.question );
            const answer = readline.question("your answer: ");
            if (answer === this.answer) {
                console.log("Correct answer!!");
                bool = false;
                return true;
            } else {
                console.log("Incorrect answer, try again");
            }
            
        }
    }
}
