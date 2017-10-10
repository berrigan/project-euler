// 2520 is the smallest number that can be divided by each of the numbers from 1 to 10 without any remainder.
// What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20?


function findDivisorForAllIntegersUpTo(n) {

    let current = n; /*?*/
    let foundDivider = false;
    let nMinus1 = n - 1;
    
    while (!foundDivider) {
    
        let currentIsDivisorForAll = true;
    
        for (let i = 1; i <= nMinus1; i++) {
            if (current % i !== 0) {
                currentIsDivisorForAll = false;
                break;
            }
        }
    
        if (currentIsDivisorForAll) {
            foundDivider = true;
        } else {
            current += n;
        }
    }

    return current;
}

findDivisorForAllIntegersUpTo(10);/*?*/
findDivisorForAllIntegersUpTo(20);/*?*/