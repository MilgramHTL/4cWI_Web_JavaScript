/* function decider (number, callback){
    console.log(number);
    if(number > 100){
        callback();
    }
}

function overhundred(){
    console.log("Die Zahl war größer als Hundert");
}

decider(99, overhundred);*/

function orderPizza(name, callback){
    console.log("Got Pizza order");
    console.log("Finished Pizza order");
    callback();
}

function randomPrice(){
    price = Math.round(Math.random() * 50);
    console.log("The Pizza costs: " + price);
}

orderPizza("Fungi", randomPrice);