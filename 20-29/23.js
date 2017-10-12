// A perfect number is a number for which the sum of its proper divisors is exactly equal to the number.
// For example, the sum of the proper divisors of 28 would be 1 + 2 + 4 + 7 + 14 = 28,
// which means that 28 is a perfect number.

// A number n is called deficient if the sum of its proper divisors is
// less than n and it is called abundant if this sum exceeds n.

// As 12 is the smallest abundant number, 1 + 2 + 3 + 4 + 6 = 16, 
// the smallest number that can be written as the sum of two abundant numbers is 24. By mathematical analysis,
// it can be shown that all integers greater than 28123 can be written as the sum of two abundant numbers.
// However, this upper limit cannot be reduced any further by analysis even though it is known that
// the greatest number that cannot be expressed as the sum of two abundant numbers is less than this limit.

// Find the sum of all the positive integers which cannot be written as the sum of two abundant numbers.


// With some help from video, showing an idea for having a boolean map, and iterating the possible sums within map only,
// instead of generating the list of sums, which was onerous.
// https://www.youtube.com/watch?v=iDquhZfmH6A

import factorUtils from '../util/FactorUtils';

let floorOfProvenIntegersSummedAsTwoAbundentNumber = 28124;


/**
 * @param {number} upToN 
 * @returns {Set<number>}
 */
function getAdundantNumbersMap(upToN) {

    let sumReducer = (p, c) => p + c;

    let list = Array(upToN).fill(false);    
    console.log(list.length);

    for (let i = 0; i <= upToN; i++) {
        let facSum = factorUtils.getFactorsReduced(i, true, sumReducer, 0);
        if (facSum > i) {
            list[i] = true;
        }
    }    
    return list;
}

function getIntegersNotSumOfTwoAbundent() {

    let abundentMap = getAdundantNumbersMap(floorOfProvenIntegersSummedAsTwoAbundentNumber);

    let sum = 0;
    for (let i = 1; i < floorOfProvenIntegersSummedAsTwoAbundentNumber; i++) {

        let foundSumForI = false;
        
        let j = 0;
        while (j < i && !foundSumForI) {
            if (abundentMap[j] && abundentMap[i - j]) {
                foundSumForI = true;
            }
            j++;
        }
        
        if (!foundSumForI) {
            sum += i;
        }       
    }

    return sum;
}



console.log(getIntegersNotSumOfTwoAbundent());




