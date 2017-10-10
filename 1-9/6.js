// The sum of the squares of the first ten natural numbers is,
// 12 + 22 + ... + 102 = 385
// --
// The square of the sum of the first ten natural numbers is,
// (1 + 2 + ... + 10)2 = 552 = 3025
// --
// Hence the difference between the sum of the squares of the first ten natural numbers and the square of the sum is 3025 − 385 = 2640.
// Find the difference between the sum of the squares of the first one hundred natural numbers and the square of the sum.


function *generateRange(n) {
    let current = 1;
    yield(current);
    while (current < n) {
        current++;
        yield(current);
    }
}

function *mapGenerator(generator, fnMapper) {
    for (let value of generator) {
        yield(fnMapper(value));
    }
}

function square(value) {
    return Math.pow(value, 2);
}

function squareRangeAndSum(n) {
    let squaredRange = mapGenerator(generateRange(n), square);
    let current = 0;
    for (let squared of squaredRange) {
        current += squared;
    }
    return current;
}

function sumRange(n) {
    let current = 0;
    for (let i of generateRange(n)) {
        current += i;
    }
    return current;
}

function squaredSumOfRange(n) {
    return Math.pow(sumRange(n), 2);
}

squaredSumOfRange(10); /*?*/
sumRange(10); /*?*/
squareRangeAndSum(10); /*?*/


function findDifferenceBetweenSumOfSquaredAndSquareOfSum(n) {
    let squaredRange = squareRangeAndSum(n);
    let squaredSum = squaredSumOfRange(n);
    return squaredSum - squaredRange;
}

findDifferenceBetweenSumOfSquaredAndSquareOfSum(10); /*?*/
findDifferenceBetweenSumOfSquaredAndSquareOfSum(100); /*?*/