// A permutation is an ordered arrangement of objects. For example, 
// 3124 is one possible permutation of the digits 1, 2, 3 and 4.
// If all of the permutations are listed numerically or alphabetically,
// we call it lexicographic order. The lexicographic permutations of 0, 1 and 2 are:

// 012   021   102   120   201   210

// What is the millionth lexicographic permutation of the digits 0, 1, 2, 3, 4, 5, 6, 7, 8 and 9?


// OK, pretty sure this can be solved manually first, by iterating segmentation the of the options,
// after figuring out the full amount of permutations, which is easy to account for to start with,
// simply being 10! (10 factorial) == 3628800

// If we partition these 3,628,800 options based on the first choice, we have 10 options of 362,880.
// We also know these are ordered, so we can figure out which option will include the millionth ordered
// permutation.
//   362,880 (within the options for 0)
//   725,760 (1)
// 1,088,640 (2) 

// So, our 3rd ordered option (the number 2) will include the millionth option.

// We can then cascade this into our choices for the second option, partitioning the 362,880 options for the second
// choice/spot, among our 9 options left - giving partitions of size 362,880 / 9 == 40,320
// Within here, our permutation # will start at 725,761 -> 1,088,640..

// 725,760 ++ 40,320
//   766,080 (0)
//   806,400 (1)
//   846,720 (3) :: since we've already used 2
//   887,040 (4)
//   927,360 (5)
//   967,680 (6)
// 1,008,000 (7) :: so our second digit will be 7

let list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; // pre sorted


function factorial(n) {
    if (n === 1) return 1;
    return n * factorial(n - 1);
}

/** 
 * @param {any[]} array 
 * @param {number} position 
 */
function splitArray(array, index) {
    return [ ...array.slice(0, index), ...array.slice(index + 1) ];
}


/**
 * Zero index based implementation
 * @param {number[]} list 
 * @param {number} wantedPermutation 
 * @param {number} startPermutation 
 */
let _getOption = function(list, wantedPermutation, permutationsPerChoice = -1) {

    if (list.length === 0 || list.length === 1 || wantedPermutation === 0) {
        return list;
    }

    if (permutationsPerChoice === -1) {        
        permutationsPerChoice = factorial(list.length - 1); /*?*/
    }

    let choiceIndex = Math.floor(wantedPermutation / permutationsPerChoice);
    let permutationsAccountedFor = (choiceIndex * permutationsPerChoice);
    
    let newWantedPermutation = wantedPermutation - permutationsAccountedFor;

    let thisChoice = list[choiceIndex];

    // save the factorial each run by calculation from previous instead..
    let permutationsPerChoiceNext = permutationsPerChoice / (list.length - 1);

    let nextOptions = _getOption(splitArray(list, choiceIndex), newWantedPermutation, permutationsPerChoiceNext);

    return [ thisChoice, ...nextOptions ];
};

let getOption = (list, permutation) => {

    let permutationsAvailable = factorial(list.length);
    if (permutation > permutationsAvailable) {
        return [-1];
    }

    return _getOption(list, permutation - 1);
};

// console.log(getOption([0, 1, 2], 1).join(''));
// console.log(getOption([0, 1, 2], 3).join(''));
// console.log(getOption([0, 1, 2], 7).join(''));

console.log(getOption(list, 1000000).join(''));
