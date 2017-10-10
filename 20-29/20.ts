// n! means n × (n − 1) × ... × 3 × 2 × 1
// For example, 10! = 10 × 9 × ... × 3 × 2 × 1 = 3628800,
// and the sum of the digits in the number 10! is 3 + 6 + 2 + 8 + 8 + 0 + 0 = 27.
// Find the sum of the digits in the number 100!

import BigInt from '../util/BigInt';
// let BigInt = require('./util/BigInt');

let bi1 = new BigInt('123');
let bi1234 = new BigInt('1234');

let bi99 = new BigInt('99');
let bi999 = new BigInt('999');

let bi2 = new BigInt('2');
let bi20 = new BigInt('20');
let bi200 = new BigInt('200');

let r = bi999.multiply(bi999).toString();

console.log(r);
console.log(new BigInt('1234').multiply([4,3,2,1]).toString());

console.log(bi999.double());
console.log(bi999.doubleMultiply());


function factorial(n:number) : number {
    if (n === 0) { return 0; }
    if (n === 1) { return 1; }
    return n * factorial(n-1);
}

function facBigInt(n:number) : BigInt {
    if (n === 0) { return new BigInt('0'); }
    if (n === 1) { return new BigInt('1'); }
    
    let nBigInt = new BigInt(n.toString());
    let factorialResult = facBigInt(n-1);
    return nBigInt.multiply(factorialResult);
}

facBigInt(10).toString(); /*?*/
factorial(10); /*?*/


function sumFactorialDigits(n) {
    return facBigInt(n)
        .toString()
        .split('')
        .map(c => parseInt(c))
        .reduce((p, c) => p + c, 0);
}

facBigInt(100).toString(); /*?*/

sumFactorialDigits(10); /*?*/
sumFactorialDigits(100); /*?*/