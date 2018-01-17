/*Task description in README.md file*/
class Credit {
    constructor(id, dataClient, startDate, endDate) {
        this._repaymnetsData = {};//Данные с платежами
        this.id = id;//№ договора
        this.dataClient = {
            firstName: dataClient.firstName,
            middleName: dataClient.middleName,
            lastName: dataClient.lastName,
        }; // Данные клиента ФИО
        this.startDate = this.parseDate(startDate); //Начало срока действия
        this.endDate = this.parseDate(endDate);// Конец срока действия
        this.creditPeriod = this.endDate.getMonth() - this.startDate.getMonth();
    }

    getPayments() {
        return this._repaymnetsData;
    }

    _addPayment(data, date, amount) {
        let dateMonth = date.getMonth() + 1;
        let arr = [];
        let tmpObj = {};
        tmpObj.date = date;
        tmpObj.amount = amount;
        arr.push(tmpObj);
        data[dateMonth] = arr;
        console.log(data);
    }

    parseDate(date) {
        date = date.split(".");
        let dateDay = +date[0];
        let dateMonth = +date[1] - 1;
        let dateYear = +date[2];
        date = new Date(dateYear, dateMonth, dateDay);
        return date;
    }

    setPayment(date, amount) {
        let data = this.getPayments();
        date = this.parseDate(date);
        this._addPayment(data, date, amount)
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
        for (let i = 0; i < obj.length; i++) {
            let amount = obj[i].amount;
            sum += amount;
        }
        return sum;
    }

    _getLastMonthPayment(data, month) {
        data = data[month];
        return this._getMonthSum(data);

    }

    _getPrewFine(month, object) {
        let summaryAmount = 0;
        for (let i = 0; i < object.length; i++) {
            let amount = object[i].amount;
            summaryAmount += amount;
        }
        return this.payment - summaryAmount;
    }


    _getFineAmount(month, data) {
        let prewMonthData = data[month - 1];
        let fine = this._getPrewFine(month, prewMonthData);
        let day = 0;
        if (fine) {
            day = data[month][0].date.getDate() - 2;// дни - минус первый день месяца и день платежа
        }
        return day * this.fine;

    }

    getPaymentAmount(month) {
        let sum = this.payment;
        let data = super.getPayments();
        let prewData = data[month - 1];
        sum += this._getPrewFine(month, prewData);
        sum -= this._getLastMonthPayment(data, month);
        sum += this._getFineAmount(month, data);
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

    getUsesHistory() {
        return this._usesHistory;
    }

    getPeriodPercent(start, end, dayPayment, remainder, amount) {
        return (end - start) * remainder * dayPayment / amount;
    }

    _getMonthPercents(month, prewData) {
        let paymentData = this.getPayments()[month];
        let historyData = this.getUsesHistory()[month];
        let monthResult = {};
        monthResult.amount = 0;
        monthResult.month = month;
        monthResult.remainder = prewData ? prewData.creditBody : historyData[0].amount;
        monthResult.creditBody = 0;
        for (let i = 0; i < paymentData.length; i++) {
            if (month === 1) {
                if (!i) {
                    let end = paymentData[i].date.getDate();
                    monthResult.amount += this.getPeriodPercent(1, end, this.paymnet, monthResult.remainder, historyData[0].amount);
                }
                if(i === paymentData.length-1){
                    let year = paymentData[i].date.getFullYear();
                    let month = paymentData[i].date.getMonth();
                    let newDate = new Date(year,month+1,0);
                    let end = newDate.getDate();
                    let start = paymentData[i].date.getDate();
                    monthResult.remainder-=paymentData[i].amount;
                    monthResult.amount += this.getPeriodPercent(start, end, this.paymnet, monthResult.remainder, historyData[0].amount);
                }
            }else {

            }
        }
        monthResult.creditBody = historyData[0].amount - monthResult.remainder + monthResult.amount;
        return monthResult;

    }

    getPaymentAmount(month) {
        let monthsResult = [];
        for (let monthNumber = 1; monthNumber <= month; monthNumber++) {
            monthsResult.push(this._getMonthPercents(monthNumber, monthsResult[monthNumber - 2]));
        }
    }

    setCredit(date, amount) {
        let data = this.getUsesHistory();
        date = super.parseDate(date);
        super._addPayment(data, date, amount);
    }

    toString() {
        return `${super.toString()}
        Payment per day: ${this.paymnet},`
    }
}


let commonCredit1 = new CommonCredit(1, {
    firstName: "Volodymyr",
    middleName: "Stanislav",
    lastName: "Lehenkyi"
}, "01.01.2017", "31.03.2017", 100, 3);

commonCredit1.setPayment("20.01.2017", 70);
commonCredit1.setPayment("20.02.2017", 120);
commonCredit1.getPaymentAmount(2);

let creditLine1 = new CreditLine(1, {
    firstName: "Marina",
    middleName: "Viktorivna",
    lastName: "Morokhovskaya"
}, "01.01.2017", "31.03.2017", 0.05);


creditLine1.setCredit("01.01.2017", 100);
creditLine1.setCredit("21.02.2017", 100);
creditLine1.setPayment("10.01.2017", 50);
creditLine1.setPayment("25.02.2017", 50);
creditLine1.getPaymentAmount(2);


