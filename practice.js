let obj = {
    'a':1,
    'b':2,
}
let obj2 = {
    'a':3
}
let obj1 = {
    ... obj,
    ... obj2
}

console.log(obj1);