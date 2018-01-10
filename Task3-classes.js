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

}


class StandartCredit extends Credit {
    constructor(id,dataClient,startDate,endDate,monthPayment,fine){
        super(id,dataClient,startDate,endDate);
        this.paymant = monthPayment;
        this.fine = fine;
    }
}


class CreditLine extends Credit{
    constructor(id,dataClient,startDate,endDate,dayPayment){
        super(id,dataClient,startDate,endDate);
        this.dayPaymnet = dayPayment;
    }
}


let credit = new Credit(1, {
    firstName: "Volodymyr",
    middleName: "Stas",
    lastName: "Lehenkyi"
}, "07.10.2017", "07.12.2017");
