// If the numbers 1 to 5 are written out in words: one, two, three, four, five, then there are 3 + 3 + 5 + 4 + 4 = 19 letters used in total.
// If all the numbers from 1 to 1000 (one thousand) inclusive were written out in words, how many letters would be used?
//
// NOTE: Do not count spaces or hyphens. For example, 342 (three hundred and forty-two) contains 23 letters
// and 115 (one hundred and fifteen) contains 20 letters. The use of "and" when writing out numbers is in compliance with British usage.

let singlesNames = [
    '',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine'
];

let teensNames = [
    'ten',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen',
    'seventeen',
    'eighteen',
    'nineteen'
];

let doublesNames = [
    '',
    'ten',
    'twenty',
    'thirty',
    'forty',
    'fifty',
    'sixty',
    'seventy',
    'eighty',
    'ninety'
];

let thousands = 'thousand';


/**
 * 
 * @param {number[]} digits
 * @return {string}
 */
function getDouble(digits) {

    if (digits[1] === 0) {
        return singlesNames[digits[0]];
    } else if (digits[1] === 1) {
        return teensNames[digits[0]];
    } else {
        if (digits[0] === 0) {
            return doublesNames[digits[1]];
        } else {
            return `${doublesNames[digits[1]]}-${singlesNames[digits[0]]}`;
        }
    }
}

/**
 * 
 * @param {number[]} digits
 */
function getHundreds(digits) {
    let hundredsText = digits[2] === 0 ? '' : `${singlesNames[digits[2]]} hundred`;
    let doublesText = getDouble(digits);
    if (doublesText.length !== 0) {
        hundredsText += ` and ${doublesText}`;
    }
    return hundredsText;
}

/**
 * 
 * @param {number[]} digits 
 */
function getThousands(digits, doublesText) {
    let thousandsText = `${singlesNames[digits[3]]} thousand`;
    let hundredsText = getHundreds(digits);

    if (hundredsText.length !== 0) {
        return `${thousandsText} ${hundredsText}`;
    } else {
        return thousandsText;
    }
}

/**
 * @return {number[]}
 */
function getDigits(n) {

    let index = 0;
    let digits = [];
    
    while (n >= 1) {
        let digit = n % 10;
        digits[index] = digit;
        n = Math.floor(n / 10);
        index++;
    }

    return digits;
};

getDigits(999); /*?*/
getDigits(321); /*?*/
getDigits(123); /*?*/
getDigits(1000); /*?*/

/**
 * 
 * @param {number} n 
 */
function getText(n) {

    if (n < 10) {
        return singlesNames[n];
    } else {

        let digits = getDigits(n);        
        
        if (digits.length === 2) {
            return getDouble(digits);
        } else if (digits.length === 3) {
            return getHundreds(digits);
        } else if (digits.length === 4) {
            return getThousands(digits);
        }        
    }

    return '';
}

function getLetterCount(n) {
    return getText(n).replace(/[^a-z]/g, '').length;
}

getText(0); /*?*/
getText(1); /*?*/
getText(9); /*?*/
getText(10); /*?*/
getText(11); /*?*/
getText(12); /*?*/
getText(13); /*?*/
getText(40); /*?*/
getText(41); /*?*/
getText(42); /*?*/
getText(43); /*?*/
getText(99); /*?*/
getText(100); /*?*/
getText(101); /*?*/
getText(102); /*?*/
getText(111); /*?*/
getText(141); /*?*/
getText(1000); /*?*/
getText(1011); /*?*/
getText(1042); /*?*/
getText(1511); /*?*/

getText(341); /*?*/
getLetterCount(341); /*?*/

getText(115); /*?*/
getLetterCount(115); /*?*/


function getSumDigitLettersUpTo(n) {
    let lettersCount = 0;
    for (let i = 1; i <= n; i++) {        
        lettersCount += getLetterCount(i);
    }
    return lettersCount;
}

getSumDigitLettersUpTo(5); /*?*/
getSumDigitLettersUpTo(1000); /*?*/