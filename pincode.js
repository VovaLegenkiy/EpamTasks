function PinCode(code, maxTry) {
    let self = this;
    let counter = 0;
    self.code = code;
    self.maxTry = maxTry;
    return function (code) {
        if(code === self.code && counter !== maxTry){
            counter=0;
            console.log("Access denied");
            return true;
        }else if(counter < maxTry){
            counter++;
            console.log("wrong Pin Code");
            return false
        }else{
            console.log("Out of maxTry");
            return false;
        }
    }
}

let pin = new PinCode(1234,3);
pin(1236);
pin(1238);
pin(1234);
pin(1236);
pin(1238);
pin(1234);



