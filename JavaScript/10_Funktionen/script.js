function add(a, b){
    console.log(a + b);
}

function substract(a, b){
    console.log(a - b);
}

function multiply(a, b){
    console.log(a * b);
}

function supercalculation(a, b){
    console.log((a + b)/2 * a);
}

function printEasterDate(J){
    const N = J - 1900;
    const A = N % 19;
    const B = ((7 * A + 1)/19);
    const M = (11 * A + 4 - B)%29;
    const Q = (N/4);
    const W = (N + Q + 31 - M)%7
    const P = 25 - M -W;
    if(P > 0){
        console.log("Ostersonntag ist der " + Math.round(P) + ".April")
    } else {
        console.log("Ostersonntag ist der " + Math.round(P + 31) + ".März")
    }
}
add(9, 6); 
substract(8, 3);  
multiply(11, 2);  
supercalculation(5, 15);  
printEasterDate(2024);