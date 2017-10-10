function isMultiple3or5(number) {
    return (number % 5 === 0 || number % 3 === 0);
}

/** @type {number[]} */
let multiples = [];
for (let i = 1; i < 1000; i++) {
    if (isMultiple3or5(i)) {
        multiples.push(i);
    }
}

var summed = multiples.reduce((previous, current) => {
    return previous + current;
}, 0);
summed


function *genMultiples3or5() {
    let i = 1;
    while (i < 1000) {
        if (isMultiple3or5(i))
            yield(i);
        i++;
    }
}

let sum2 = 0;
for (var sum of genMultiples3or5()) {
    sum2 += sum
}
sum2