function someFunction(n) {
    n = +n;
    let a = Math.floor(n / 1000);
    let b = Math.floor(n % 1000 / 100);
    let c = Math.floor(n % 100 / 10);
    let d = Math.floor(n % 10);
    if (a === b && a === c || a === b && a === d || a === c && a === d) {
        return true;
    }
    return b === c && b === d;
}
console.log("Task 2 - >");
console.log(someFunction("3363"));
console.log(someFunction("4844"));
console.log(someFunction("0300"));
console.log(someFunction("1300"));
console.log(someFunction("1320"));
console.log(someFunction("2202"));
