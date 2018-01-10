let upBase = 15;
let downBase = 10;
let angle = 50;
let perimeter;
let leg;

leg = (upBase + downBase)/(2*Math.cos(angle));
perimeter = upBase + downBase + 2*leg;
console.log(`Task 1 - > 
${perimeter}`);