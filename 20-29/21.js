// Let d(n) be defined as the sum of proper divisors of n (numbers less than n which divide evenly into n).
// If d(a) = b and d(b) = a, where a ≠ b, then a and b are an amicable pair and each of a and b are called amicable numbers.

// For example, the proper divisors of 220 are 1, 2, 4, 5, 10, 11, 20, 22, 44, 55 and 110; therefore d(220) = 284. The proper divisors of 284 are 1, 2, 4, 71 and 142; so d(284) = 220.

// Evaluate the sum of all the amicable numbers under 10000.

import factorUtils from '../util/FactorUtils';

/** 
 * @param {number} p 
 * @param {number} c 
 */
let sumReducer = (p, c) => (p + c);

/** 
 * @param {number} n 
 */
function getFactorSum(n) {
    return factorUtils.getFactorsReduced(n, true, sumReducer, 0);
}

console.log(getFactorSum(220));
console.log(getFactorSum(284));

/** 
 * @param {number} n 
 */
function findAmicableFactorPairs(n) {
    /**
     * sparse array, where the key is the number, and the value is the sum.
     * hence, for a number N, if factorSums[factorSums[N]] === N, then we have an amicable pair.
     * @type {number[]}
     */
    let factorSums = [];
    
    /**
     * @type {number[]} our list of amicable numbers
     */
    let amicablePairs = [];

    for (let i = 1; i < n; i++) {
        let fSum = getFactorSum(i);        
        if (fSum < i) {
            if (factorSums[fSum] === i) {
                amicablePairs.push(i);
                amicablePairs.push(fSum);
            }
        } else {
            factorSums[i] = fSum;
        }
    }

    return amicablePairs;
}

findAmicableFactorPairs(300); /*?*/

let amicableUnder10000 = findAmicableFactorPairs(10000); /*?*/
amicableUnder10000.reduce((p, c) => p + c, 0); /*?*/