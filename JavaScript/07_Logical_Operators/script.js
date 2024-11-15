let randomNumbera = Math.random() * 100;
let randomNumberb = Math.random() * 100;
let a = Math.floor(randomNumbera);
let b = Math.floor(randomNumberb);
console.log(a);
console.log(b);
if ((a < b) && (a < 50)){
    console.log("Zahl 1 ist kleiner als Zahl 2 und Mini");
} else {
    console.log("Zahl 2 ist größer");
}

if ((a < 30) || (b < 30)){
    console.log("Eine der beiden ist kleiner als 30)");
} else {
    console.log("Beide sind größer als 30");
}

if ((a < 50) && (b != 50)){
    console.log("Erste Zahl klein, zweite kein 50iger");
} else {
    console.log("Erste Zahl zu groß, oder zweite ein 50iger");
}