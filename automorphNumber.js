//пока что считает до 10 степени

function getAutomorphicSum(end) {
    let value = 5;
    let obj = {};
    while (value < end) {
        let stringValue = value.toString();
        let length = stringValue.length;
        let doubleValue = Math.pow(value, 2);
        let doubleValueLength = doubleValue.toString().length;
        let index = doubleValueLength-length-1;
        let prevNumber =  +doubleValue.toString()[index];
        let nextNumber = "";
        if (doubleValue % 10 === 5 && doubleValue % Math.pow(10, length) === value) {
            obj[value] = "";
            obj[Math.pow(10,length)+1-value] = "";
            value = Math.pow(10, length) + 1 - value;
        }
        else if (doubleValue % 10 === 6 && doubleValue % Math.pow(10, length) === value) {
            obj[value] = "";
            obj[Math.pow(10,length)+1-value] = "";
            nextNumber = (10-prevNumber).toString();
            value = +(nextNumber+value);
        }
    }
    let result = Object.keys(obj).reduce(function(sum, current) {
        return +sum + +current;
    }, 0);

    return result;
}

let endValue = Math.pow(10, 10);
console.log(getAutomorphicSum(endValue));

