// The Fibonacci sequence is defined by the recurrence relation:

// Fn = Fn−1 + Fn−2, where F1 = 1 and F2 = 1.
// Hence the first 12 terms will be:

// F1 = 1
// F2 = 1
// F3 = 2
// F4 = 3
// F5 = 5
// F6 = 8
// F7 = 13
// F8 = 21
// F9 = 34
// F10 = 55
// F11 = 89
// F12 = 144
// The 12th term, F12, is the first term to contain three digits.

// What is the index of the first term in the Fibonacci sequence to contain 1000 digits?

import BigInt from '../util/BigInt';

/**
 * Never ending fibonacci sequence
 * @param lengthToFind 
 */
function* fibBigInt() : IterableIterator<BigInt> {

    let nMinus2 = new BigInt('1');        
    let nMinus1 = new BigInt('1');

    yield(nMinus2);
    yield(nMinus1);

    while (true) {
        let fib = nMinus1.add(nMinus2);
        yield(fib);
        nMinus2 = nMinus1;
        nMinus1 = fib;
    }
}

function findIndexFirstFibNumberLengthN(n: number) : number {
    
    let index = 0;

    for (let fibNumber of fibBigInt()) {
        index++;
        fibNumber.trim();
        if (fibNumber.size() >= n) {
            return index;
        }
    }
}

console.log(findIndexFirstFibNumberLengthN(1000));