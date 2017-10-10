// The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17.
// Find the sum of all the primes below two million.

/**
 *  Similar to our sieve work from problem 7, but yielding each item as we get to it.
 */
function *findPrimeBelow(limit) {
    
    let sieve = [false, false]; // start with sieve[0], sieve[1] == false, since 0 & 1 aren't prime per se    

    // look for all primes up to our sieve limit
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

    for (let index = 2; index < sieve.length; index++) {
        if (isPrimeSieve(index)) {

            if (index != 1) {
                for (let multiplesIndex = index; multiplesIndex < sieve.length; multiplesIndex += index) {
                    sieve[multiplesIndex] = false;
                }
            }
            
            yield(index);
        }
    }
}

function countPrimesBelow(n) {
    let count = 0;
    for (let _ of findPrimeBelow(n)) {
        count ++;
    }
    return count;
}

/**
 * 
 * @param {*generator to get values from} generator 
 * @param {*simple reducer function taking in previous and current} fnReducer 
 */
function reduceGenerator(generator, fnReducer, initial) {
    let acc = initial;
    for (let value of generator) {
        acc = fnReducer(acc, value);
    }
    return acc;
}

function sumPrimesBelow(n) {
    return reduceGenerator(findPrimeBelow(n), (p, c) => {
        return p + c;
    }, 0);
}

// primes up to 20...
// [2,3,5,7,11,13,17,19]
// sum == 77

// should be, 7, 7, 8
// there are 7 *below* 19, not including 19 itself since 19 isn't below 19, per phrasing of Euler question
countPrimesBelow(18); /*?*/
countPrimesBelow(19); /*?*/
countPrimesBelow(20); /*?*/

sumPrimesBelow(20); /*?*/

sumPrimesBelow(2000000); /*?*/
