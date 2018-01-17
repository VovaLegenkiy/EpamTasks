class Human {
   constructor (name, age) {
     this.name = name;
     this.age = age;
   }
   get speed() {
     let speed = 0;
     let speedRanges = new Map ([[1,1],[8,3],[12,4],[16,5],[70,4],[90,3]]);
     let that = this;
     let curSpeed =0; 
     speedRanges.forEach(function (speed,age) {
       if (age<=that.age) {
          curSpeed = speed;
       }
     });
     return curSpeed;
     
   }
   toString() {
     return `name:${this.name}, age:${this.age}, speed:${this.speed}`;
   }

}
class Vehicle {
   constructor(regNumber, maxSpeed) {
      this.regNumber = regNumber;
      this.maxSpeed = maxSpeed;
      this.fuel = 0;
      this.operable = true;
   }
   get canGo() {
     return this.fuel>0&&this.operable;
   }
   get speed() {
     if (this.canGo) {
        return this.maxSpeed;
     } else {
        return 0;
     }
   }
   damage(){
     this.operable = false;
   }
   repair() {
     this.operable  = true;
   }
   set fuelLevel(level) {
     this.fuel = level;
   }
   toString() {
     let strCanGo = (this.canGo)?'yes':'no';
     
     return `number:${this.regNumber}, can go:${strCanGo}, max speed ${this.maxSpeed}`;
   }

}

class Driver extends Human {
   constructor(name,age,ownedVehicle) {
     super(name,age);
     this.vehicle = ownedVehicle;
     
   }
   get speed() {
     if (typeof this.vehicle != 'undefined'&&this.vehicle.canGo){
       return this.vehicle.speed;
     } else {
       return super.speed;
     }
   }
   toString() {
     let strData =  super.toString();
     if (typeof this.vehicle != 'undefined') {
       strData += ' vehicle '+this.vehicle;
     }
     return strData;
   }

}

class Convoy {

  constructor() {
    this.members = [];
    
  }
  add(member) {
    this.members.push(member);
    return this;
  }
  get sortedList(){
    let toSort = this.members.slice(0); 
    toSort.sort(function (member1,member2){
      return member1.speed-member2.speed;
    });
    let strData  = '';
    toSort.forEach(function(member){
      strData += member+'\n';
    });
    strData +='Convoys speed: '+this.convoySpeed;
    return strData;
  }
  get convoySpeed() {
    
    let memberMinSpeed = 0;
    if (this.members.length>0) {
      memberMinSpeed = this.members[0].speed;
      this.members.forEach(function(member){
        if (memberMinSpeed>member.speed) {
           memberMinSpeed = member.speed;
        } 
      });
      return memberMinSpeed;
    }
    return 0;
    
  }
}

let convoy = new Convoy();

// Hikers
convoy.add (new Human('Bob',19))
	.add(new Human('Charley',60))
	.add (new Human ('Mary',22));
	
// Vehicles
let car1 = new Vehicle ('AB21312',250);
car1.fuelLevel = 10;

let car2 = new Vehicle ('AX21310',210);
car2.fuelLevel = 20;

let car3 = new Vehicle ('AB21300',220);
car3.fuelLevel = 10;

let car4 = new Vehicle ('AY21311',270);
car4.fuelLevel = 20;

// add drivers to the system
convoy.add( new Driver('Jim',22,car1)).
	add(new Driver('John',55,car2)).
	add(new Driver('Bill',55,car3)).
	add(new Driver('Max',55,car4));
	
	
console.log(convoy.sortedList);	