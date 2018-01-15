/*Task description in README.md file*/
class Credit {
    constructor(id, dataClient, startDate, endDate) {
        this._repaymnetsData = {};
        this.id = id;
        this.dataClient = {
            firstName: dataClient.firstName,
            middleName: dataClient.middleName,
            lastName: dataClient.lastName,
        };
        this.startDate = startDate;
        this.endDate = endDate;
        this.creditPeriod = endDate.split(".")[1] - startDate.split(".")[1];
    }

    _getPaymentData() {
        return this._repaymnetsData;
    }
    _addPayment(data,date,amount){
        let dateMonth = +date.split(".")[1];
        if (!data[dateMonth]) {
            let tmpObj = {};
            tmpObj[date] = amount;
            data[dateMonth] = tmpObj;
        } else {
            let objMonth = data[dateMonth];
            objMonth[date] = amount;
        }
        console.log(data);
    }
    makePayment(date, amount) {
        let data = this._getPaymentData();
        this._addPayment(data,date,amount)
    }


    toString() {
        let month = this.creditPeriod <= 1 ? "month" : "months";
        return `credit number: ${this.id}, 
        client data:
        first name: ${this.dataClient.firstName};
        middle name: ${this.dataClient.middleName};
        last name: ${this.dataClient.lastName}.
        credit period: ${this.dataClient} ${month}.`
    }

}


class CommonCredit extends Credit {
    constructor(id, dataClient, startDate, endDate, monthPayment, fine) {
        super(id, dataClient, startDate, endDate);
        this.payment = monthPayment;
        this.fine = this.payment * fine / 100;
    }


    _getMonthSum(obj) {
        let sum = 0;
        for (let date in obj) {
            sum += +obj[date];
        }
        return sum;
    }

    _getLastMonthPayment(data, month) {
        return this._getMonthSum(data[month]);

    }

    _getPrewFine(month) {
        let sum = 0;
        let object = this._getPaymentData()[month - 1];
        for (let date in object) {
            let amount = +object[date];
            sum += amount;
        }
        return this.payment - sum;
    }


    _getFineAmount(month) {
        let fine = this._getPrewFine(month);
        let data = this._getPaymentData();
        if (fine) {
            let date = Object.keys(data[month]);
            date = date[date.length - 1];
            let day = +date.split(".")[0] - 1;
            return +(day - 1) * this.fine;
        }

    }

    getPaymentAmount(month) {
        let sum = this.payment;
        let data = this._getPaymentData();
        sum += this._getPrewFine(month);
        sum -= this._getLastMonthPayment(data, month);
        sum += this._getFineAmount(month);
        return sum;
    }


    toString() {
        return `${super.toString()}
        Payment per month: ${this.payment},
        fine per day: ${this.fine}`
    }
}


class CreditLine extends Credit {
    constructor(id, dataClient, startDate, endDate, dayPayment) {
        super(id, dataClient, startDate, endDate);
        this.paymnet = dayPayment;
        this._usesHistory = {};
    }
    _getUsesHistory(){
        return this._usesHistory;
    }
    getPaymentAmount(month){

    }
    useCredit(date,amount){
        let data = this._getUsesHistory();
        this._addPayment(data,date,amount);
    }

    toString() {
        return `${super.toString()}
        Payment per day: ${this.paymnet},`
    }
}


let commonCredit1 = new CommonCredit(1, {
    firstName: "Volodymyr",
    middleName: "Stas",
    lastName: "Lehenkyi"
}, "01.01.2017", "31.03.2017", 100, 3);

commonCredit1.makePayment("20.01.2017", 70);
commonCredit1.makePayment("20.02.2017", 100);
commonCredit1.getPaymentAmount(2);

let creditLine1 = new CreditLine(1,{
    firstName: "Marina",
    middleName: "Vikrot",
    lastName: "Morokhovskaya"
},"01.01.2017","31.03.2017",0.05);


creditLine1.useCredit("01.01.2017",100);
creditLine1.useCredit("21.02.2017",100);
creditLine1.makePayment("10.01.2017",50);
creditLine1.makePayment("25.02.2017",50);
creditLine1.getPaymentAmount(2);


