let fs = require('fs');

/**
 * @param {string} text
 * @return {pyramidItem[][]}
 */
function parsePyramidText(text) {
    return text.split('\n').filter(l => l !== '').map(line => {
        return line.split(' ').map(n => {
            let number = parseInt(n);
            return {
                number: number,
                pathValue: number, // only needed on bottom level, as we'll overwrite while traversing up, but easiest to do here
                path: []
            };
        });
    });   
}

/**
 * @param {pyramidItem} objectLeftPath 
 * @param {pyramidItem} objectRightPath 
 * @return {pathSelectorChoice}
 */
function selectHighestPathValue(objectLeftPath, objectRightPath) {    
    return objectLeftPath.pathValue >= objectRightPath.pathValue ? 
        { pathChosen: 'L', item: objectLeftPath } : 
        { pathChosen: 'R', item: objectRightPath };    
}

/**
 * @param {string} pyramidText - the text for this pyramid
 * @param {fnPathSelector} pathSelector - function which will take two objects and decide which of the paths from the level below to choose.
 */
function findPyramidPath(pyramidText, pathSelector) {

    if (typeof pathSelector !== 'function') {
        throw new Error('Please pass in a pathSelector function to use for selector best pyramid path.');
    }
    
    let pyramid = parsePyramidText(pyramidText);
    
    for (let levelIndex = pyramid.length - 2; levelIndex >= 0; levelIndex--) {
        
        // we can use the levelIndex to size our inner iteration, since it's a triangle going down.
        for (let index = 0; index <= levelIndex; index++) {
            let pathSelected = pathSelector(pyramid[levelIndex+1][index], pyramid[levelIndex+1][index+1]);
            let current = pyramid[levelIndex][index];            
            current.pathValue = current.number + pathSelected.item.pathValue;
            current.path = [ ...pathSelected.item.path, pathSelected.pathChosen ];            
        }        
    }

    pyramid[0][0].path.reverse();
    return pyramid[0][0];
}


function findHighestPyramidPath(pyramidText) {
    return findPyramidPath(pyramidText, selectHighestPathValue);    
}

function findHighestPyramidPathFromFile(pyramidFileLocation) {
    let pyramidText = fs.readFileSync(pyramidFileLocation, { encoding: 'utf8' });    
    var pyramid = parsePyramidText(pyramidText);
    console.log(pyramid);
    return findHighestPyramidPath(pyramidText);
}

export default {
    findHighestPyramidPath,
    findHighestPyramidPathFromFile
}

