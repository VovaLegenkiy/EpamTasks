/*Task description in README.md file*/
class Credit {
    constructor(id, dataClient, startDate, endDate) {
        this.paymnetsData = [];
        this._id = id;
        this._dataClient = {
            firstName: dataClient.firstName,
            middleName: dataClient.middleName,
            lastName: dataClient.lastName,
        };
        this.startDate = startDate;
        this.endDate = endDate;
        this._creditPeriod = endDate.split(".")[1] - startDate.split(".")[1];
    }

    makePayment(date, amount) {
        this.paymnetsData.push([date, amount]);
    }

    toString() {
        let month = this._creditPeriod <= 1 ? "month" : "months";
        return `credit number: ${this._id}, 
        client data:
        first name: ${this._dataClient.firstName};
        middle name: ${this._dataClient.middleName};
        last name: ${this._dataClient.lastName}.
        credit period: ${this._dataClient} ${month}.`
    }

}


class CommonCredit extends Credit {
    constructor(id, dataClient, startDate, endDate, monthPayment, fine) {
        super(id, dataClient, startDate, endDate);
        this.paymant = monthPayment;
        this.fine = fine;
    }

    _getFineAmount(date) {

    }

    getPaymentAmount(date) {
        let self = this;
        let dateError = new SyntaxError("Out of credit`s end date");
        let splitDate = date.split(".");
        let dateNow = new Date(splitDate[2], splitDate[1] - 1, splitDate[0]);
        try {
            let endDate = self.endDate.split(".");
            endDate = new Date(endDate[2], endDate[1] - 1, endDate[0]);
            if (dateNow < endDate) {
                let sum = 0;
                for (let i = 0; i < self.paymnetsData.length; i++) {
                    let valueAmount = self.paymnetsData[i][1];
                    let date = self.paymnetsData[i][0].split(".");
                    date = new Date(date[2], date[1] - 1, date[0]);
                    if (date < dateNow) {
                        sum += (self.paymant - valueAmount);
                    } else break;
                }
                return sum;
            }
            throw dateError;
        }
        catch (e){
            if (e.name === "SyntaxError") {
                alert(e);
            } else {
                throw e;
            }
        }
    }

    toString() {
        return `${super.toString()}
        Payment per month: ${this.paymant},
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
commonCredit1.getPaymentAmount("01.04.2017");
