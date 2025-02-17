document.getElementById("content").innerHTML = "Tolle Sache";
function buttonClicked(){
    console.log("clicked")
    let num1 = document.getElementById("number1").value;
    let num2 = document.getElementById("number2").value;

    let result = parsefloat(num1) + parsefloat(num2);
    console.log(result); 
}