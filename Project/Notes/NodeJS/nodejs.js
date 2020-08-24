var Person = require('./nodejs1.js');
var Customer = require('./nodejs2.js');
console.log('my first node script');
//create the instance of class 
var person = new Person();
var customer = new Customer();
var a = 10,
    b = 10;
c = a + b;
console.log('Addition:-->' + c);
console.log('Square:-->' + Math.sqrt(c));
console.log(person.hey());
console.log(customer.print());