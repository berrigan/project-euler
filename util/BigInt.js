// because it just has to be named such BigInt somehow
export default class BigInt {
    
    /**     
     * @param {string | number[] | undefined} initial 
     */
    constructor(initial) {
        if (typeof initial === 'string') {
            this.int = initial.split('').map(c => parseInt(c)).reverse();
        } else if (typeof initial !== 'undefined') {
            this.int = initial;
        } else {
            this.int = [];
        }
    }

    toString() {
        let int = [...this.int];
        return int.reverse().join('');
    }

    trim() {
        this.int = trimLeadingZero(this.int);
    }

    /**
     * @return {number}
     */
    size() {
        this.trim();
        return this.int.length;
    }

    /**
     * Take in either a BigInt or number[] and return the number[].
     * Will return a copy of the data.
     * @param {BigInt | number[]} otherBigInt
     * @return {number[]}
     */
    coerceData(otherBigInt) {
        if (otherBigInt instanceof BigInt) {
            return [...otherBigInt.int];
        } else {
            return [...otherBigInt];
        }
    }

    /**     
     * @param {BigInt | number[]} otherBigInt 
     */
    add(otherBigInt) {

        let working = this.coerceData(this);
        let other = this.coerceData(otherBigInt);

        let minSizeIteration = Math.max(working.length, other.length);
        
        let overflow = false;
        let overflowOfOldSum = 0;
        let index = 0;
    
        while (index < minSizeIteration || overflowOfOldSum != 0) {
    
            let workingValue = safeAccessPosition(working, index);
            let otherValue = safeAccessPosition(other, index);
            
            let sumIndex = workingValue + otherValue + overflowOfOldSum;
    
            let thisColumn = sumIndex % 10;
            overflowOfOldSum = Math.floor(sumIndex / 10);
    
            if (thisColumn != 0 || index < minSizeIteration || overflowOfOldSum != 0) {
                working[index] = thisColumn;
            }
                
            index++;
        }
        
        return new BigInt(working);
    }

    double() {        
        return this.add(this);
    }

    /**
     * Same as double(), but with a cleaner implementation using multiply() internall instead of add()
     */
    doubleMultiply() {
        return this.multiply([2]);
    }


    /**     
     * @param {BigInt | number[]} otherBigInt 
     */
    multiply(otherBigInt) {
        
        let working = this.coerceData(this);
        let other = this.coerceData(otherBigInt);

        let result = [];

        let minSizeIteration = working.length + other.length;

        // let overflow = false;
        let overflow = 0;
        
        let otherIndex = 0;
        let workingIndex = 0;

        for (let workingIndex = 0; workingIndex < working.length; workingIndex++) {
            for (let otherIndex = 0; otherIndex < other.length; otherIndex++) {
                
                // resultIndex being non-zero imples we're working with digits that are in the tens, thousands, etc.
                // the impicit index is equivalent to <digit multiply result> * 10 ^ resultIndex.
                // eg. 300 * 300 === 3*3 * 10 ^ (2+2)
                // === 3 * 10,000
                // keeping in mind that we're using zero-index'ing, so for 300, the index of 3 would be 2.
                // with our resultIndex, we would get 4 when looking at the 3 * 3 calculation,
                // and the 4-th index of our BigInt is the ten thousands columns

                let resultIndex = workingIndex + otherIndex;
                let multiplyResult = (_sap(working, workingIndex) * _sap(other, otherIndex)) + _sap(result, resultIndex);

                // thisColumn will include any previous value for this index from result, with the + _sap(result, ..)
                let thisColumn = multiplyResult % 10;
                result[resultIndex] = thisColumn;

                // but when doing overflow, we need to keep cascading till no overflow,
                // including grabbing any previous result value from each index as we go
                resultIndex++;
                overflow = Math.floor(multiplyResult / 10) + _sap(result, resultIndex);
                
                while (overflow !== 0) {
                    let overflowMod10 = overflow % 10;                    
                    result[resultIndex] = overflowMod10;

                    // push index up, and get overflow for next column before checking while() condition
                    resultIndex++;
                    overflow = Math.floor(overflow / 10) + _sap(result, resultIndex);
                }
                
            }
        }

        result = trimLeadingZero(result);
        return new BigInt(result);
    }

    /**
     * The sum of all the digits in this BigInt
     * @return {number}
     */
    sumDigits() {
        return this.int.reduce((p, c) => p + c, 0);
    }
    
}


/** 
* @param {number[]} arr 
* @param {number} index 
*/
function safeAccessPosition(arr, index) {
   if (index >= arr.length) {
       return 0;
   }
   return arr[index];
}

let _sap = safeAccessPosition;


function trimLeadingZero(array) {
    // delete any superflous zeroes from front of our number / end of our array since the number is "backwards" in the array
    let lastIndex = array.length - 1;
    let nonZeroFound = false;
    for (let i = lastIndex; i >= 0 && !nonZeroFound; i--) {
        if (array[i] === 0) {            
            array.pop();
        } else {
            nonZeroFound = true;
        }
    }

    return array;
}