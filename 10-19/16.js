// 2^15 = 32768 and the sum of its digits is 3 + 2 + 7 + 6 + 8 = 26.
// What is the sum of the digits of the number 2^1000?

import BigInt from '../util/BigInt';

let bi1 = new BigInt('2');
let bi2 = new BigInt('111111111122222222223333333333444444444455555555556666666666777777777788888888889999999999');

let bi3 = bi1.add(bi2);
bi3.toString(); /*?*/

let bi256 = new BigInt('256');
bi256.double().toString(); /*?*/


// BigInt now has a double function, which can act as our multiplication for 2.
// We'll start with a BigInt of 2, and mulitply as needed along the way.

function getBigInt2ToTheN(n) {
    let bi = new BigInt('2');
    for (let i = 1; i < n; i++) {
        bi = bi.double();
    }
    return bi;
}

let bi2_15 = getBigInt2ToTheN(15);
bi2_15.toString(); /*?*/
bi2_15.sumDigits(); /*?*/

let bi2_20 = getBigInt2ToTheN(20);
bi2_20.toString(); /*?*/
bi2_20.sumDigits(); /*?*/

let bi2_1000 = getBigInt2ToTheN(1000);
bi2_1000.toString(); /*?*/
bi2_1000.sumDigits(); /*?*/

