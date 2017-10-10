// By starting at the top of the triangle below and moving to adjacent numbers on the row below, the maximum total from top to bottom is 23.

// 3
// 7 4
// 2 4 6
// 8 5 9 3

// That is, 3 + 7 + 4 + 9 = 23.

// Find the maximum total from top to bottom of the triangle below:

// 75
// 95 64
// 17 47 82
// 18 35 87 10
// 20 04 82 47 65
// 19 01 23 75 03 34
// 88 02 77 73 07 63 67
// 99 65 04 28 06 16 70 92
// 41 41 26 56 83 40 80 70 33
// 41 48 72 33 47 32 37 16 94 29
// 53 71 44 65 25 43 91 52 97 51 14
// 70 11 33 28 77 73 17 78 39 68 17 57
// 91 71 52 38 17 14 91 43 58 50 27 29 48
// 63 66 04 68 89 53 67 30 73 16 69 87 40 31
// 04 62 98 27 23 09 70 98 73 93 38 53 60 04 23

// NOTE: As there are only 16384 routes, it is possible to solve this problem by trying every route. However, Problem 67, is the same challenge with a triangle containing one-hundred rows; it cannot be solved by brute force, and requires a clever method! ;o)

// SELF NOTE :: The pyramid is actually diagonal, with each choice being L or R, rather the D or DR.
// See the Problem 18 on the Euler site (https://projecteuler.net/problem=18) for a better visual.

// We'll start with with a two-dimension array of the numbers, but will map these to an object to keep track of our paths, which will look like..
// { number: <number>, pathValue: <number>, path: ['L', 'R', 'L'] }

// We'll be traversing from bottom to top, which will allow us to only select the max possible future paths each time we move each level.
// eg.. looking at level 3 in the below, for the 2, we could come from either the 8 or 5, but the 8 is higher,
// so we only need to worry about that on, and we'll set the pathValue on our 2 object as 10, it's newly done path will be ['L'].
// after processing that 2, the full object will be { number: 2, pathValue: 10, path: ['L'] }
// For the 4, we end up with { number: 4, pathValue: 13: path: ['R'] }, because we got the 9 from the Right path below.

// After doing each row, we move up a level, but we will look at the old pathValue when selecting which one to go from.
// So, for 7, we would select to come from the 4, which has a pathValue of 13, instead of the pathValue of 10 on the 2.

/**
 * @typedef pyramidItem
 * @property {number} number the number of this item
 * @property {number} pathValue the best path value of this item wile traversing
 * @property {string[]} path array of 'L' or 'R' showing which path has been taken
 */

// We'll use a path selector which chooses the higher path, but writing function in a way where you could choose a path
// based on other factors if wanted.

/**
 * @typedef pathSelectorChoice
 * @property {string} pathChosen - the 'L' or 'R' of the path selected
 * @property {pyramidItem} item - the path item selected 
 */

/**
 * @callback fnPathSelector
 * @param {pyramidItem} objectLeftPath the possible left choice
 * @param {pyramidItem} objectRightPath the possible right choice
 * @returns {pyramidItem} which item to choose
 */

import PyramidUtils from '../util/PyramidUtils';


let testPyramidText =
`3
7 4
2 4 6
8 5 9 3`;

let pyramidText =
`75
95 64
17 47 82
18 35 87 10
20 04 82 47 65
19 01 23 75 03 34
88 02 77 73 07 63 67
99 65 04 28 06 16 70 92
41 41 26 56 83 40 80 70 33
41 48 72 33 47 32 37 16 94 29
53 71 44 65 25 43 91 52 97 51 14
70 11 33 28 77 73 17 78 39 68 17 57
91 71 52 38 17 14 91 43 58 50 27 29 48
63 66 04 68 89 53 67 30 73 16 69 87 40 31
04 62 98 27 23 09 70 98 73 93 38 53 60 04 23`;


PyramidUtils.findHighestPyramidPath(testPyramidText); /*?*/
PyramidUtils.findHighestPyramidPath(pyramidText); /*?*/

PyramidUtils.findHighestPyramidPathFromFile('data/p067_triangle.txt'); /*?*/