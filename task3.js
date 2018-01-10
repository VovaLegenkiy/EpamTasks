let arr = [];
let laser = 4;// Лазер
let laserX = 0;
let laserY = 0;
let coordXMax = 30;
let coordYMax = 30;
let x1 = Math.round(Math.random() * 9);//Координата Х точки 1
let y1 = Math.round(Math.random() * 9);//Координата У точки 1
let x2 = Math.round(Math.random() * 9);//Координата Х точки 2
let y2 = Math.round(Math.random() * 9);//Координата У точки 2
    //Генерируем плоскость 10 на 10 с лазером в точке 0,0 и с тарелками в виде Единиц (1)
for (let y = 0; y < coordYMax; y++) {
    arr[y] = [];
    for (let x = 0; x < coordXMax; x++) {
        arr[laserX][laserY] = laser;
        arr[y][x] = Math.round(Math.random());
    }
}

    //Идем по массиву с шагом 1 до конца плоскости и в направлении точки (тарелки)
function target(targetX, targetY) {
    console.log(`TargetX=${targetX} & TargetY=${targetY}`);
    coordY:for (let y = laserY; y < arr.length; y++) {
        let tmp = 0;
        for (let x = laserX; x < arr.length; x++) {
            if (!x && !targetX) {
                tmp = y;
            } else {
                tmp = Math.abs((x - laserX) * (targetY - laserY) / (targetX - laserX) + laserY)
            }
            if (tmp > arr.length) {
                break;
            }
            if (x === laserX && y === laserY) {
                continue coordY;
            } else if (y === tmp && arr[y][x] === 1) {
                console.log(`x:${x},y:${y}`)
            }
        }
    }
}
console.log("Task 3 - >");
target(x1, y1);
target(x2, y2);