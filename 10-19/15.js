// Starting in the top left corner of a 2×2 grid, and only being able to move to the right and down, there are exactly 6 routes to the bottom right corner.
// [ see images on https://projecteuler.net/problem=15 ]
// https://projecteuler.net/project/images/p015.gif
// How many such routes are there through a 20×20 grid?


// For this, I will say that [1] = the solution for a lattice/grid of size n.
// eg. [1] = a grid with a single 'box' and four corners
// [2], per the example on Euler, = a 2x2 grid with 9 'corner' spots

// http://code.jasonbhill.com/python/project-euler-problem-15/
// some help with the forward working grid instead of a formulaic solution I had been working on.
// pretty sure the results do have a formulaic represntation, but it eludes me so far.

// I had concluded, at the very least [n] = 2 x [n-1] + (something).
// 2x from from there being 2 options from the bottom right of the previous size, to the new bigger
// size which is 1x1 down -- or, said different, 2 ways of going from the bottom right of [n-1] to the bottom right of [n]
// but everything else ends up being mulitplied per how many way there are to other spots along the edge as well, which I couldn't figure
// out a formula for. 

// [1] == 1 
// 0 1
// 1 2

// [2] == 6
// 0 1 1
// 1 2 3
// 1 3 6

// [3] == 20
// 0 1  1  1
// 1 2  3  4
// 1 3  6 10
// 1 4 10 20

// [4] == 20
// 0 1  1  1  1
// 1 2  3  4  5
// 1 3  6 10 15
// 1 4 10 20 35
// 1 5 15 35 70

// For the purpose of my solution, I will also assume the very top left has a value of 1 too,
// though semactically that makes no sense. It will allow a shortcut solution where we can process the
// following line (moving down the grid) while only knowing the one before, allowing us to only store and worry about
// one line at a time.
// We then just need to do this process this top line N times.


function expect(latticeSize, latticeResult, expectedResult) {
    console.log(`[]${latticeSize} :: ${latticeResult} == ${expectedResult} ?? ${latticeResult === expectedResult}`);
}

function getLatticeMoves(n) {

    // Internal function since we're mutating our array along the way to make things easier internally.

    /**
     * Process the array once, computing the next values down.
     * We can do this since we know the left hand column is always 1, and can assume the number next to left hand column is 0
     * Hence, if for our [4] top line == [1, 1, 1, 1, 1] -- 
     * This would be combined with [0, _, _, _, _, _] -- where the first zero is outside left of grid, and 0 + 1 = 1, giving us our first value of the next row
     * so after process, we would have [0+1, 1+1, 2+1, 3+1, 4+1] == [1, 2, 3, 4, 5] -- where the first number is the result from the left.
     * Processing this again, we will get, [0+1, 1+2, 3+3, 6+4, 10+5] == [1, 3, 6, 10, 15]
     * @param {number[]} arr 
     * @return {number[]}
     */
    function _processArray(arr) {
        let length = arr.length;
        let previous = 0; // start with 0, our value 'outside' the left of grid
    
        for (let i = 0; i < length; i++) {
            arr[i] = previous + arr[i];
            previous = arr[i];
        }
        return arr;
    }

    // for lattice grid size n, we'll need an array size n+1 for the corners of the lattice/grid
    /** @type {number[]} */
    let arr = new Array(n+1).fill(1);

    // we need to process the array N times
    for (let j = 1; j <= n; j++) {
        arr = _processArray(arr);
    }

    return arr[arr.length-1];
}


// let l1 = getLatticeMoves(1); /*?*/
// expect(1, l1, 2);

// let l2 = getLatticeMoves(2); /*?*/
// expect(2, l2, 6);

let l3 = getLatticeMoves(3); /*?*/
expect(3, l3, 20);

// let l4 = getLatticeMoves(4); /*?*/
// expect(4, l4, 70);

let l20 = getLatticeMoves(20); /*?*/

