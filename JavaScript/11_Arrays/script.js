Array = [4,1,2,3];
Array.push(17,199);

for (var i = 0; i < Array.length; i++) {
    console.log(Array[i]);
}

let sum = 0;
for (let i = 0; i < Array.length; i++) {
    sum += Array[i];
}
console.log(sum);

let average = sum / Array.length;
console.log(average);


ArrayNames = ["Susi", "Paula", "Hans"];
console.log("Meine Freunde sind " + ArrayNames[0] + ", " + ArrayNames[1] + " und " + ArrayNames[2]);

ArrayNames.push("Sepp");
console.log("Meine Freunde sind " + ArrayNames[0] + ", " + ArrayNames[1] + ", " + ArrayNames[2] + " und " + ArrayNames[3]);