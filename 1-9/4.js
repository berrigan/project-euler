/**
 * A palindromic number reads the same both ways. The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99.
 *
 * Find the largest palindrome made from the product of two 3-digit numbers. 
*/


/**
 * @param s {string|number}
 */
function isPalindrome(s) {

    if (typeof s === 'number') {
        s = s.toString();
    }

    s = s.replace(/[^a-zA-Z0-9]/g, "").toLocaleLowerCase();

    if (s.length === 0) {
        return false;
    }

    var l = s.length - 1; // cached for performance, depending on engine
    var lengthToCheck = Math.ceil(s.length / 2);

    for (let i = 0; i <= lengthToCheck; i++) {
        if (s.charAt(i) !== s.charAt(l-i)) {
            return false;
        }
    }
    return true;
}
 
isPalindrome("9009"); /*?*/
isPalindrome("A man, a plan, a canal, Panama!"); /*?*/
isPalindrome("998001"); /*?*/
isPalindrome(""); /*?*/


function findLargestPalindrome() {

    let min = 100, max = 999;

    let first = 100;
    let second = 0;

    let largestFound = -1;

    while (first <= max) {
        for (second = first; second <= max; second++) {
            let product = first * second;
            if (isPalindrome(product) && product > largestFound) {
                largestFound = product;
            }
        }
        first++;
    }

    return largestFound;
}

findLargestPalindrome(); /*?*/