// A unit fraction contains 1 in the numerator. The decimal representation of the unit fractions with denominators 2 to 10 are given:

// 1/2	= 	0.5
// 1/3	= 	0.(3)
// 1/4	= 	0.25
// 1/5	= 	0.2
// 1/6	= 	0.1(6)
// 1/7	= 	0.(142857)
// 1/8	= 	0.125
// 1/9	= 	0.(1)
// 1/10	= 	0.1
// Where 0.1(6) means 0.166666..., and has a 1-digit recurring cycle. It can be seen that 1/7 has a 6-digit recurring cycle.

// Find the value of d < 1000 for which 1/d contains the longest recurring cycle in its decimal fraction part.

// Notes for self ::
// https://en.wikipedia.org/wiki/Longest_repeated_substring_problem
// https://en.wikipedia.org/wiki/Suffix_tree
// http://www.allisons.org/ll/AlgDS/Tree/Suffix/

// https://github.com/Daniel-Hug/longest-repeated-substring/blob/master/js/suffixtree.js



function unitFractionForDenominator(n) {
    return (1 / n)
        .toString()
        .split('.')[1];
    // .split('')
    // .map(c => parseInt(c));
}

console.log(unitFractionForDenominator(2));
console.log(unitFractionForDenominator(3));
console.log(unitFractionForDenominator(4));
console.log(unitFractionForDenominator(5));
console.log(unitFractionForDenominator(6));
console.log(unitFractionForDenominator(7));
console.log(unitFractionForDenominator(8));
console.log(unitFractionForDenominator(9));



var getLongestUnitFractionRecurringCycle = function (maxNum) {
    var longestNum = 1;
    var largestCycleSize = 1;

    for (var currentNum = longestNum + 1; currentNum <= maxNum; currentNum++) {
        var cycleSize = getCycleSize(currentNum);

        if (cycleSize > largestCycleSize) {
            largestCycleSize = cycleSize;
            longestNum = currentNum;
        }
    }

    return longestNum;
};

var getCycleSize = function (num) {

    num;

    let numerator = 1;
    let numerators = [];
    let numeratorDigits = [];

    let digitsInSequence = 0;

    while (!digitsInSequence) {

        console.log(digitsInSequence)

        if (numerator == 0) {
            return 0;
        }

        //Check if the numerator is previously repeated
        for (var i = 0; i < numerators.length; i++) {

            numerator;
            console.log(numerators[i]);

            if (numerator == numerators[i]) {
                digitsInSequence = 0;

                for (var j = i; j < numerators.length; j++) {
                    digitsInSequence += numeratorDigits[j]; /*?*/
                }

                return digitsInSequence; /*?*/
            }
        }

        //Repeat not found, update the numerators and digits
        numerators[numerators.length] = numerator;
        var digits = 1; /*?*/
        while (num > numerator) {
            numerator *= 10; /*?*/
            digits++; /*?*/
        }
        numeratorDigits[numeratorDigits.length] = digits; /*?*/

        //get the next numerator
        numerator = numerator % num; /*?*/
    }
};

console.log(getCycleSize(3));
// console.log(getCycleSize(6));
// console.log(getCycleSize(7));

// console.log(getLongestUnitFractionRecurringCycle(10));
// console.log(getLongestUnitFractionRecurringCycle(1000));   