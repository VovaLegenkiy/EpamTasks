/*Task description in README.md file*/
class Credit {
    constructor(id, dataClient, startDate, endDate) {
        this._paymnetsData = {};
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

    getPaymentData() {
        return this._paymnetsData;
    }

    makePayment(date, amount) {
        let data = this.getPaymentData();
        let dateMonth = +date.split(".")[1];
        if (!data[dateMonth]) {
            let tmpObj = {};
            tmpObj[date] = amount;
            data[dateMonth] = tmpObj;
        } else {
            let objMonth = data[dateMonth];
            objMonth[date] = amount;
        }
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
        this.fine = fine;
    }

    _getPrewFine(month) {
        let sum = 0;
        let object = this.getPaymentData()[month - 1];
        for (let date in object) {
            let amount = +object[date];
            sum += amount;
        }
        return 100 - sum;
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

    _getFineAmount(month) {
        return this._getPrewFine(month);
    }

    _getPaymentsSum(month) {
        let sum = this.payment;
        let data = this.getPaymentData();

        sum += this._getFineAmount(month);
        sum -= this._getLastMonthPayment(data,month);
        return sum;
    }

    getPaymentAmount(month) {
        let endDate = this.endDate.split(".");
        let endDateMonth = endDate[1];
        if (month < endDateMonth) {
            return this._getPaymentsSum(month)
        }
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

commonCredit1.makePayment("20.01.2017", "70");
commonCredit1.makePayment("20.02.2017", "120");
commonCredit1.getPaymentAmount(2);
