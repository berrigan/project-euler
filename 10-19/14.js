// The following iterative sequence is defined for the set of positive integers:
// n → n/2 (n is even)
// n → 3n + 1 (n is odd)

// Using the rule above and starting with 13, we generate the following sequence:

// 13 → 40 → 20 → 10 → 5 → 16 → 8 → 4 → 2 → 1
// It can be seen that this sequence (starting at 13 and finishing at 1) contains 10 terms. Although it has not been proved yet (Collatz Problem), it is thought that all starting numbers finish at 1.

// Which starting number, under one million, produces the longest chain?

// NOTE: Once the chain starts the terms are allowed to go above one million.

function isEven(n) {
    return n % 2 === 0;
}

function getNext(n) {
    return isEven(n) ?
        (n / 2) : 
        (3 * n + 1);
}

getNext(13); /*?*/
getNext(40); /*?*/
getNext(20); /*?*/
getNext(10); /*?*/
getNext(5); /*?*/
getNext(16); /*?*/
getNext(8); /*?*/
getNext(4); /*?*/
getNext(2); /*?*/

function *generateSequenceFromSeed(seed) {

    let length = 1;
    let value = seed;

    yield ({ seed, length, value });
    
    while (value != 1) {
        value = getNext(value);
        length++;
        yield({ seed, length, value });
    }
}

let g1 = generateSequenceFromSeed(1);
g1.next(); /*?*/
g1.next(); /*?*/


function runChainToCompletion(seed) {
    let lastItem = {};
    for (let sequenceItem of generateSequenceFromSeed(seed)) {
        lastItem = sequenceItem;
    }
    return lastItem;
}

let end13 = runChainToCompletion(13); /*?*/

function findLongestChainUpTo(n) {
    var largestChain = { length: 0 };
    for (let i = 1; i < n; i++) {
        let endSequenceItem = runChainToCompletion(i);
        if (endSequenceItem.length > largestChain.length) {
            largestChain = endSequenceItem;
        }
    }
    return largestChain;
}

let largestChainToOneMillion = findLongestChainUpTo(1000000); /*?*/
console.log(largestChainToOneMillion);