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


function isPrimeFaster(n) {
    if (n === 0 || n === 1) {
        return false;
    }

    let squareRootPlusOne = Math.floor(Math.sqrt(n)) + 1;
    for (let i = 2; i < squareRootPlusOne; i++) {       
        if (n % i === 0) {
            return false;
        }
    }
    return true;
}

function findNthPrime(n) {

    let current = 0;
    let lastPrimeFound = -1;
    let i = 0;

    while (current < n) {
        if (isPrimeFaster(i)) {
            current++;
            lastPrimeFound = i;
        }        
        i++;
    }
    
    return lastPrimeFound;
}

// verify with some known example, then go for our problem case
// findNthPrime(1); /*?*/
// findNthPrime(2); /*?*/
// findNthPrime(3); /*?*/
// findNthPrime(4); /*?*/
// findNthPrime(5); /*?*/
findNthPrime(10001); /*?*/


/**
 * Some help from a site with this one :: http://code.jasonbhill.com/python/project-euler-problem-7/ 
 */
function findNthPrimeSieve(n) {

    let sieve = [false, false]; // start with sieve[0], sieve[1] == false, since 0 & 1 aren't prime per se
    let limit = 150000;
    for (let i = 2; i < limit; i++) {
        sieve[i] = true;
    }

    /**
     * Closure over sieve[] to make checking easier along the way    
     */
    function isPrimeSieve(n) {
        if (n === 2 || n === 3) {
            return true;
        }
        return sieve[n];
    }

    let current = 0;

    for (let index = 2; index < sieve.length; index++) {
        if (isPrimeSieve(index)) {
            current++;            

            if (current === n) {
                return index;
            }

            if (index != 1) {
                for (let multiplesIndex = index; multiplesIndex < sieve.length; multiplesIndex += index) {
                    sieve[multiplesIndex] = false;
                }
            }
        }
    }
}

// findNthPrimeSieve(1); /*?*/
// findNthPrimeSieve(2); /*?*/
// findNthPrimeSieve(3); /*?*/
// findNthPrimeSieve(4); /*?*/
// findNthPrimeSieve(5); /*?*/
findNthPrimeSieve(10001); /*?*/