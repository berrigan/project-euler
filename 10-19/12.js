// The sequence of triangle numbers is generated by adding the natural numbers. So the 7th triangle number would be 1 + 2 + 3 + 4 + 5 + 6 + 7 = 28. The first ten terms would be:

// 1, 3, 6, 10, 15, 21, 28, 36, 45, 55, ...

// Let us list the factors of the first seven triangle numbers:

//  1: 1
//  3: 1,3
//  6: 1,2,3,6
// 10: 1,2,5,10
// 15: 1,3,5,15
// 21: 1,3,7,21
// 28: 1,2,4,7,14,28
// We can see that 28 is the first triangle number to have over five divisors.

// What is the value of the first triangle number to have over five hundred divisors?

function *generateTriangleNumberUpTo(n) {
    let sum = 0;
    let index = 1;
    while (index <= n) {
        sum += index;
        yield({ number: index, triangle: sum });
        index++;
    }
}

function getTriangleNumberArray(n) {
    let array = [];
    for (let triangleNumber of generateTriangleNumberUpTo(10)) {
        array.push(triangleNumber);
    }    
    return array;
}

getTriangleNumberArray(10); /*?*/



function getFactors(n) {
    let squareRootPlusOne = Math.floor(Math.sqrt(n)) + 1;
    let factors = {};
    for (let i = 1; i <= squareRootPlusOne; i++) {       
        if (n % i === 0) {
            let otherFactor = n / i;
            factors[i] = true;
            factors[otherFactor] = true;
        }
    }

    // will give us strings of the numbers since JS objects have string keys,
    // but this is enough for us to see the count, and get key (factor) uniqueness
    return Object.keys(factors);
}

getFactors(6); /*?*/
getFactors(36); /*?*/
getFactors(196); /*?*/
getFactors(6); /*?*/
getFactors(6); /*?*/


function findFirstTriangleNumberWithDivisorCount(n, searchLimit) {    

    let lastFactorCount = 0;
    let lastFactors = [];
    let lastTriangle = {};

    for (let triangle of generateTriangleNumberUpTo(searchLimit)) {

        lastTriangle = triangle;
        lastFactors = getFactors(triangle.triangle);
        lastFactorCount = lastFactors.length;

        if (lastFactorCount >= n) {
            return { found: true, lastFactorCount, lastFactors, lastTriangle };
        }

    }

    return { found: false, lastFactorCount, lastFactors, lastTriangle };
}

findFirstTriangleNumberWithDivisorCount(5, 100); /*?*/

findFirstTriangleNumberWithDivisorCount(499, 50000); /*?*/