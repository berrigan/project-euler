// A Pythagorean triplet is a set of three natural numbers, a < b < c, for which,
// a2 + b2 = c2
// For example, 32 + 42 = 9 + 16 = 25 = 52.
// There exists exactly one Pythagorean triplet for which a + b + c = 1000.
// Find the product abc.

function findPythagoreanTriplet(n) {

    if (n < 3) {
        return [];
    }
    if (n === 3) {
        return [1,1,1];
    }

    // we'll limit our searches of B to half N,
    // since if B is above half of N, then B will be greater than C,
    // and thus no way a^2 + b^2 == c^2
    let halfN = n / 2;

    // only search up to n-2, leaving b=1, c=1, for the left over 2
    for (let a = 1; a < n-2; a++) {
        let remainder = n - a;
        for (let b = 1; b < remainder - 1; b++) {
            let c = remainder - b;
            if (Math.pow(a, 2) + Math.pow(b, 2) === Math.pow(c, 2)) {
                return [a, b, c];
            }
        }
    }

    return [];
}

findPythagoreanTriplet(12); /*?*/

let resultFor1000 = findPythagoreanTriplet(1000);
let product = resultFor1000.reduce((p, v) => { return p * v; }, 1); /*?*/
