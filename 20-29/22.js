// Using names.txt (right click and 'Save Link/Target As...'),
// a 46K text file containing over five-thousand first names, 
// begin by sorting it into alphabetical order. Then working 
// out the alphabetical value for each name, multiply this 
// value by its alphabetical position in the list to obtain a name score.

// For example, when the list is sorted into alphabetical order, 
// COLIN, which is worth 3 + 15 + 12 + 9 + 14 = 53, is the 938th 
// name in the list. So, COLIN would obtain a score of 938 × 53 = 49714.

// What is the total of all the name scores in the file?

let fs = require('fs');

// 938th name (937 index) should be COLIN
// console.log(names[937]);
// console.log(scoreName(names[937], 938));


/** 
 * @param {string} name 
 */
function letterScoreName(name) {
    return name
        .split('')
        .map(cStr => cStr.charCodeAt(0) - 64)
        .reduce((p, c) => p + c, 0);
}

/** 
 * @param {string} name 
 * @param {number} position 
 */
function scoreName(name, position) {
    return position * letterScoreName(name);
}


/** 
 * @param {string[]} names 
 */
function sumScoreNames(names) {
    return names.reduce((prev, current, index) => {
        return prev + scoreName(current, index + 1);
    }, 0);
}

function sumScoreNamesFile(filename) {

    let namesFiles = fs.readFileSync(filename, { encoding: 'utf8' });
    let names = namesFiles
        .split(',')
        .map(name => name.replace(/"/g,''))
        .sort();

    return sumScoreNames(names);
}

console.log(sumScoreNamesFile('data/p022_names.txt'));