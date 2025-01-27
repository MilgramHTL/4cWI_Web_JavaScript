/*let sum = 0;
for(let i=7; i<344; i++){
    if(i%7==0){
        sum += i*2;
    } else if(i%2==1){
        sum += i;
    }
}

console.log(sum);*/

/*let data = "Super Duper".split("");
for (let i=0; i<=data.length; i++) {
    if(data[i]=="u" || data[i]=="e"){
        console.log("");
    } else {
        console.log(data[i]);
    }
}*/
/*run = true;
while(run == true){
    for (let i = 100; i >= 25; i-=5){
        if(i == 50 || i == 40 || i == 30){
            console.log("");
        } else {
            console.log(i);
        }
    }
    run = false;
}
*/
let i = 100;
while (i >= 25) {
    if (i === 50 || i === 40 || i === 30) {
        console.log("");
    } else {
        console.log(i);
    }
    i -= 5;
}
