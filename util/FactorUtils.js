/** 
 * @callback fnSimpleReducer
 * @param {number} previousValue
 * @param {number} currentValue
 * @returns {number}
 */


export default {
    
    /**
     * @param {number} n 
     * @param {boolean} excludeSelf
     * @returns {number[]}
     */
    getFactors(n, excludeSelf) {
        let squareRootPlusOne = Math.floor(Math.sqrt(n)) + 1;
        let factors = {};
        for (let i = 1; i <= squareRootPlusOne; i++) {       
            if (n % i === 0) {
                factors[i] = true;
                if (!excludeSelf || i !== 1)  {
                    let otherFactor = n / i;                
                    factors[otherFactor] = true;
                }
            }
        }    
        // will give us strings of the numbers since JS objects have string keys,
        // but this is enough for us to see the count, and get key (factor) uniqueness
        return Object.keys(factors);
    },

    /**
     * @param {number} n 
     * @param {boolean} excludeSelf
     * @param {fnSimpleReducer} fnSimpleReducer - function to like reducer, simple taking in previous & current value
     * @param {number} initial - initial value for reducer
     * @returns {number}
     */
    getFactorsReduced(n, excludeSelf, fnSimpleReducer, initial) {

        let value = 0;
        
        let squareRootPlusOne = Math.floor(Math.sqrt(n)) + 1;
        for (let i = 1; i <= squareRootPlusOne; i++) {       
            if (n % i === 0) {
                value = fnSimpleReducer(value, i);
                if (!excludeSelf || i !== 1)  {
                    let otherFactor = n / i;
                    value = fnSimpleReducer(value, otherFactor);
                }
            }
        }

        return value;
    }
}