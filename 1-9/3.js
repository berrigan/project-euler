let pfNumber = 600851475143;

/**
 * Copied from youtube video, but gives wrong result for other numbers, eg 100 gives 10, which is wrong. 
 */
function findLargestPrimeFactor1(n) {
    for (let i = 2; i < n; i++) {
        if (n % i === 0) {
            n = n / i;
        }
    }
    return n;
}

findLargestPrimeFactor1(pfNumber);/*?*/
findLargestPrimeFactor1(100); /*?*/
findLargestPrimeFactor1(132); /*?*/
findLargestPrimeFactor1(13195); /*?*/
findLargestPrimeFactor1(63869); /*?*/


function getFactors(n) {
    let squareRootPlusOne = Math.floor(Math.sqrt(n)) + 1;
    let factors = [];
    for (let i = 1; i < squareRootPlusOne; i++) {       
        if (n % i === 0) {
            let otherFactor = n / i;
            factors.push(i);
            factors.push(otherFactor);
        }
    }
    return factors;
}

let knownPrimes = {
    1: true,
    2: true,
    3: true,
    5: true,
    7: true,
    11: true
};
/**
 * Check if a number is a prime number
 * @param n {number} number to check
 */
function isPrime(n) {
    if (knownPrimes[n]) {
        return true;
    }
    let result = getFactors(n).length === 2;
    if (result) {
        knownPrimes[result] = true;
    }
    return result;
}


function findLargestPrimeFactor2(n) {

    return getFactors(n) 
        .filter(isPrime)
        .sort((a, b) => a >= b)
        .pop();
}

findLargestPrimeFactor2(pfNumber);/*?*/
findLargestPrimeFactor2(100); /*?*/
findLargestPrimeFactor2(132); /*?*/
findLargestPrimeFactor2(13195); /*?*/
findLargestPrimeFactor2(63869); /*?*/



function findLargestPrimeFactor3(n) {

    let div = 2;
    let squareRootPlusOne = Math.floor(Math.sqrt(n)) + 1;

    while (div < n && div < squareRootPlusOne) {
        if (n % div === 0 && isPrime(div)) {
            n = n / div;
            div--;
        }
        div++;
    }

    return n;
}


isPrime(2); /*?*/
isPrime(3); /*?*/

findLargestPrimeFactor3(pfNumber);/*?*/
findLargestPrimeFactor3(100); /*?*/
findLargestPrimeFactor3(132); /*?*/
findLargestPrimeFactor3(13195); /*?*/
findLargestPrimeFactor3(63869); /*?*/


for (var i = 10; i < 100000; i++) {
    let _ = findLargestPrimeFactor3(i);
}