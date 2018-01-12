/*Task description in README.md file*/
class Credit {
    constructor(id, dataClient, startDate, endDate) {
        this.id = id;
        this.dataClient = {
            firstName: dataClient.firstName,
            middleName: dataClient.middleName,
            lastName: dataClient.lastName,
        };
        this.creditPeriod = endDate.split(".")[1] - startDate.split(".")[1];
    }

    toString() {
        let month = this.creditPeriod <= 1 ? "month" : "months";
        return `credit number: ${this.id}, 
        client data:
        first name: ${this.dataClient.firstName};
        middle name: ${this.dataClient.middleName};
        last name: ${this.dataClient.lastName}.
        credit period: ${this.creditPeriod} ${month}.`
    }

}


class CommonCredit extends Credit {
    constructor(id, dataClient, startDate, endDate, monthPayment, fine) {
        super(id, dataClient, startDate, endDate);
        this.paymant = monthPayment;
        this.fine = fine;
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
}, "01.01.2017", "01.04.2017", 100, 3);