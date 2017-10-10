function isEven(n) {
    return (n % 2 === 0);
}

function *fib() {
    
    yield(1);
    yield(1);


    let fnMinus2 = 1;
    let fnMinus1 = 1;

    let foundAbove4million = false;
    while (foundAbove4million === false) {
        let fn = fnMinus2 + fnMinus1;
        if (fn < 4000000)
            yield(fn);
        else
            foundAbove4million = true;
        fnMinus1 = fnMinus2;
        fnMinus2 = fn;
    }
}


let fibSum = 0;
for (let n of fib()) {
    if (isEven(n))
        fibSum += n;
}
fibSum