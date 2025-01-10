import { createInterface} from "readline";

const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
});

const readLineAsync = () => {
    return new Promise((resolve) => {
        readline.question("", (userRes) => {
            resolve(userRes);
           
        });
    })
};
let balance = 0;
let runner = true;

console.log("Select what you want to do: ")
console.log("1 Einzahlen");
console.log("2 Abheben");
console.log("3 Kontostand");
console.log("4 Beenden");

while(runner) {
    let inputOfUser = await readLineAsync();
    if(inputOfUser == "1"){
        console.log("Wie viel möchten Sie einzahlen?");
        let payment = await readLineAsync();
        balance += parseFloat(payment);
        console.log("Eingezahlt");
    }
    if(inputOfUser == "2"){
        console.log("Wie viel möchten Sie abheben?");
        let withdraw = await readLineAsync();
        balance -= parseFloat(withdraw);
        console.log("Abgehoben");
    }
    if(inputOfUser == "3"){
        console.log("Ihr Kontostand beträgt: " + balance);
    }
    if(inputOfUser == "4"){
        console.log("Bankomat stoppt");
        runner = false;
        readline.close();
    }
}


