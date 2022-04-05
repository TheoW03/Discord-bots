arr = ["4","+","(","10","+","8",")","/","2","+","8"];
stack = []

function add (a,b){
    return parseInt(a) + parseInt(b);

}
function sub (a,b){
    return parseInt(a) - parseInt(b);

}
function divide (a,b){
    return parseInt(a) / parseInt(b);

}
function mutiply (a,b){
    return parseInt(a) * parseInt(b);

}

stack.push(arr[0])
stack.push(arr[1])
stack.push(arr[2])
stack.push(arr[3])
stack.push(arr[4])
stack.push(arr[5])
console.log(stack.pop())
console.log(stack.pop())
console.log(stack.pop())
console.log(stack.pop())