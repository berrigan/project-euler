// Each character on a computer is assigned a unique code 
// and the preferred standard is ASCII (American Standard Code for Information Interchange).
// For example, uppercase A = 65, asterisk (*) = 42, and lowercase k = 107.

// A modern encryption method is to take a text file, convert the bytes to ASCII,
// then XOR each byte with a given value, taken from a secret key.
// The advantage with the XOR function is that using the same encryption key on the cipher text,
// restores the plain text; for example, 65 XOR 42 = 107, then 107 XOR 42 = 65.

// For unbreakable encryption, the key is the same length as the plain text message,
// and the key is made up of random bytes. The user would keep the encrypted message
// and the encryption key in different locations, and without both "halves", it is impossible to decrypt the message.

// Unfortunately, this method is impractical for most users, so the modified method is to use a password as a key.
// If the password is shorter than the message, which is likely, the key is repeated cyclically throughout the message.
// The balance for this method is using a sufficiently long password key for security, but short enough to be memorable.

// Your task has been made easy, as the encryption key consists of three lower case characters.
// Using cipher.txt (right click and 'Save Link/Target As...'), [SAVED as ../data/p059_cipher.txt]
// a file containing the encrypted ASCII codes, and the knowledge that the plain text must contain common English words,
// decrypt the message and find the sum of the ASCII values in the original text.

let fs = require('fs');

// readfile still goes from process.cwd(), which is root directory for Quokka
let cipherText = fs.readFileSync('data/p059_cipher.txt', { encoding: 'utf8' });
let cipherArray = convertJoinedText(cipherText);

let testCipherTextArray = [50, 50, 50, 50, 50, 50, 50, 50, 50, 50]; // 10 '2' characters

function convertJoinedText(str) {
    return str.split(',').map(numberString => parseInt(numberString));
}

function convertCharArrayToString(asciiCharArray) {
    return String.fromCharCode(...asciiCharArray);
}

/**
 * 
 * @param {number[]} cipherArray Cipher text as an array of character ASCII codes (numbers)
 * @param {number[]} xorKey Key to XOR against
 * @return {number[]}
 */
function xorCipher(cipherArray, xorKey) {

    let xorKeyLength = xorKey.length;
    let xorIndex = 0;

    return cipherArray
        .map(c => {
            let i = xorIndex++;
            if (xorIndex >= xorKeyLength) {
                xorIndex = 0;
            }
             return c ^ xorKey[i];
        });
}

function testXor() {

    let key1 = [97, 98, 99]; // == a, b, c

    let xorResult = xorCipher(testCipherTextArray, key1);
    console.log(xorResult);
    console.log(convertCharArrayToString(xorResult));

    let decrypted = xorCipher(xorResult, key1);
    console.log(decrypted);
    console.log(convertCharArrayToString(decrypted));    
}

testXor();


/**
 * @param {number[]} array 
 * @param {number[]} subarray 
 */
function inArray(array, subarray) {

    if (array.length === 0 || subarray.length === 0 || array.length < subarray.length) {
        return false;
    }

    let index = 0;
    let lastPossibleStartPosition = array.length - subarray.length; // -1, because our indexes are zero indexed, but length are total
    let subarrayLastIndex = subarray.length - 1;

    while (index <= lastPossibleStartPosition) {

        if (array[index] === subarray[0]) {
            
            if (subarray.length === 1) {
                return true;
            }

            for (let subarrayIndex = 1; subarrayIndex < subarray.length; subarrayIndex++) {
                if (array[index + subarrayIndex] !== subarray[subarrayIndex]) {
                    break;
                }
                if (subarrayIndex === subarrayLastIndex) {
                    return true;
                }
            }
        }

        index++;
    }
    return false;
}

// some testing for inArray

let testArray = [47, 48, 49, 50, 51];
inArray(testArray, []); /*?*/
inArray(testArray, [47]); /*?*/

inArray(testArray, [1, 2, 3, 4, 5]); /*?*/
inArray(testArray, [1, 2, 3, 4, 5, 6]); /*?*/

inArray(testArray, [47, 48, 49, 50, 51]); /*?*/

inArray(testArray, [47]); /*?*/
inArray(testArray, [48]); /*?*/
inArray(testArray, [49]); /*?*/
inArray(testArray, [50]); /*?*/
inArray(testArray, [51]); /*?*/

inArray(cipherArray, [10,22,73]); /*?*/ /* true? */ 
inArray(cipherArray, [10,22,73,99]); /*?*/ /* false? */




function findPossibleKeys(cipherArray) {

    let textsWithAnd = [];
    let andArray = [97, 110, 100]; // 'a', 'n', 'd'
    let orArray = [111, 114];

    let ascii_a = 97;
    let ascii_z = 122;

    // let currentKey = [ascii_a, ascii_a, ascii_a]; // string of with the key 'aaa' and progress each column up to 'z'

    for (let keyIndex0 = ascii_a; keyIndex0 <= ascii_z; keyIndex0++) {
        for (let keyIndex1 = ascii_a; keyIndex1 <= ascii_z; keyIndex1++) {
            for (let keyIndex2 = ascii_a; keyIndex2 <= ascii_z; keyIndex2++) {

                let key = [keyIndex0, keyIndex1, keyIndex2];
                let decrypted = xorCipher(cipherArray, key);

                if (inArray(decrypted, andArray) &&
                    inArray(decrypted, orArray))  {
                    let decryptedText = convertCharArrayToString(decrypted);
                    textsWithAnd.push({ key, decryptedText });
                }
            }
        }
    }

    return textsWithAnd;
}

let possible = findPossibleKeys(cipherArray);
JSON.stringify(possible, null, 2); /*?*/

/*
    Some visual inspection finds the following key.

    "key": [​​​​​
​​​​​      103,​​​​​
​​​​​      111,​​​​​
​​​​​      100​​​​​
​​​​​    ],​​​​​
​​​​​    "decryptedText": "(The Gospel of John, chapter 1) 1 In the beginning the Word already existed. He was with God, and he was God. 2 He was in the beginning with God. 3 He created everything there is. Nothing exists that he didn't make. 4 Life itself was in him, and this life gives light to everyone. 5 The light shines through the darkness, and the darkness can never extinguish it. 6 God sent John the Baptist 7 to tell everyone about the light so that everyone might believe because of his testimony. 8 John himself was not the light; he was only a witness to the light. 9 The one who is the true light, who gives light to everyone, was going to come into the world. 10 But although the world was made through him, the world didn't recognize him when he came. 11 Even in his own land and among his own people, he was not accepted. 12 But to all who believed him and accepted him, he gave the right to become children of God. 13 They are reborn! This is not a physical birth resulting from human passion or plan, this rebirth comes from God.14 So the Word became human and lived here on earth among us. He was full of unfailing love and faithfulness. And we have seen his glory, the glory of the only Son of the Father."
*/

let foundKey = [103, 111, 100];
convertCharArrayToString(foundKey); /*?*/
let decrypted = xorCipher(cipherArray, foundKey);
let sum = decrypted.reduce((p, c) => p + c, 0);
console.log(sum);

