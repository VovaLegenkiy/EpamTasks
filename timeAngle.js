function timeAngle(date) {
    let hourDegree = 15;// круг часов 360 градусов, 360/24 = 15
    let minuteDegree = 6;// 360 градусов / на 60 минут = 6
    let secondDegree = 6;// 360 градусов / на 60 секунд = 6
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    let hourDegrees = h * hourDegree + m / 2;
    /*Стрелка минут так же влияет на стрелку часов, в часе 30 грудусов,
        поэтоум 60 минут / на 30 градусов и получиться  2 мин/градус*/
    let minuteDegrees = m * minuteDegree + s / 10;
    /*Стрелка секунд так же влияет на стрелку минут,
        1 минута 6 градусов, 60 секунд / на 6 градусов, 10 сек/градус*/
    let secondDegrees = s * secondDegree;
    let diffBtwHandM = hourDegrees - minuteDegrees;
    let diffBtwMandS = minuteDegrees - secondDegrees;
    h = h.toString().length < 2 ? "0" + h : h;
    m = m.toString().length < 2 ? "0" + m : m;
    s = s.toString().length < 2 ? "0" + s : s;
    console.log(`${h}:${m}:${s}`);
    console.log(`Different between hours(${hourDegrees}) and minutes(${minuteDegrees}) = ${diffBtwHandM} degree `);
    console.log(`Different between minutes (${minuteDegrees}) and seconds(${secondDegrees}) = ${diffBtwMandS} degree `);
}

let date = new Date();
timeAngle(date);