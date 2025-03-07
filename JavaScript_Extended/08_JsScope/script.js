if (true){
    var varVariable = 'This is true'
}

console.log(varVariable)

if (true){
    let letVariable = 'This is true'
    console.log(letVariable)
}

/* Da es die Konstante auf consVar sich bezieht und nicht auf das was in der Variable drinnen steht.*/
const constVar = {name: 'Bob'}
let letVar = 1

constVar.name = 'tschigerillo'

console.log(constVar)