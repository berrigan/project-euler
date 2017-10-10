// You are given the following information, but you may prefer to do some research for yourself.

// 1 Jan 1900 was a Monday.
// Thirty days has September,
// April, June and November.
// All the rest have thirty-one,
// Saving February alone,
// Which has twenty-eight, rain or shine.
// And on leap years, twenty-nine.
// A leap year occurs on any year evenly divisible by 4, but not on a century unless it is divisible by 400.
// How many Sundays fell on the first of the month during the twentieth century (1 Jan 1901 to 31 Dec 2000)?

/** 
 * @typedef {Object} MiniDate
 * @property {number} day - 1 -> [daysInMonth]
 * @property {number} dayOfWeek 0 -> 6, Sunday -> Saturday
 * @property {number} month - 1 -> 12
 * @property {number} year
 */


/**
 * @param {number} year
 */
function isLeapYear(year) {    
    if (year % 4 === 0) {
        if (year % 100 === 0 && year % 400 !== 0) {
            return false;
        }
        return true;
    }
    return false;
}


// Days per month, starting at index 0
let daysPerMonth = [
    -1, // 0 index left clear
    31, // January
    28, // Febuary
    31, // March
    30, // April
    31, // May
    30, // June
    31, // July
    31, // August
    30, // September
    31, // October
    30, // November
    31, // December
];

/** 
 * @param {MiniDate} date  
 */
function getDaysInMonth(date) {
    return date.month === 2 ?
        (isLeapYear(date.year) ? 29 : daysPerMonth[2]) :
        daysPerMonth[date.month];
}



function _addDaysImpl(date, count) {

    if (count > 28) {
        throw new Error('_addDayImpl cannot add more than 28 days.');
    }

    let daysInMonth = getDaysInMonth(date);

    date.day += count;

    date.dayOfWeek += count;
    date.dayOfWeek = date.dayOfWeek % 7;

    if (date.day > daysInMonth) {

        let overflow = date.day - daysInMonth;
        date.day = overflow;

        date.month++;        
        if (date.month === 13) {
            date.month = 1;
            date.year++;
        }
    }
}

function addDays(date, count) {
    // we'll keep jumping 28 days at a time, since 28 is safe to only cross one month border at a time,
    // keeping our implementation function easier to follow in one go.
    // we could also do more calculcation against daysInMonth(...), and keep re-adjusting for updated days in month
    // but this feel roughly the same speed wise (not tested for performance, per se) while
    // keeping things easier to understand
    while (count > 28) {
        _addDaysImpl(date, 28);
        count -= 28;
    }
    _addDaysImpl(date, count);
    return date; // mutates, and also returns the object for console.log, etc.
}



/** 
 * @param {MiniDate} date 
 */
function copyDate(date) {
    return {
        day: date.day,
        dayOfWeek: date.dayOfWeek,
        month: date.month,
        year: date.year
    };
}

function compareDates(d1, d2) {    
    if (d1.year === d2.year) {        
        if (d1.month === d2.month) {            
            return d1.day === d2.day ? 0 :
                (d1.day > d2.day ? 1 : -1);
        } else {
            return d1.month > d2.month ? 1 : -1;
        }
    } else {
        return d1.year > d2.year ? 1 : -1;
    }
}

let d_01011990 = {
    day: 1,
    month: 1,
    year: 1900,
    dayOfWeek: 1
};

/** 
 * @param {MiniDate} startDate 
 */
function findStartOfMonthAfterDay(startDate) {
    
    let d = copyDate(d_01011990);
    while (d.year < startDate.year) {        
        addDays(d, isLeapYear(d.year) ? 366 : 365);
    }
    while (d.month < startDate.month) {
        addDays(d, getDaysInMonth(d));
    }
    while (d.day < startDate.day) {
        addDays(d, 1);
    }
    if (d.day !== 1) {
        addDays(d, getDaysInMonth(d) - d.day + 1);
    }

    return d;
}


/** 
 * @param {MiniDate} startDate
 * @param {MiniDate} endDate
 */
function countSundaysInRange(startDate, endDate) {

    let date = copyDate(startDate);    
    date = findStartOfMonthAfterDay(date);    

    let sundaysOnMonthStart = 0;
    while (compareDates(date, endDate) < 0) {
        if (date.dayOfWeek === 0) {
            sundaysOnMonthStart++;
        }
        addDays(date, getDaysInMonth(date));
    }
    return sundaysOnMonthStart;
}

let startDate = {
    day: 1,
    month: 1,
    year: 1901,
    dayOfWeek: 0
};

// test date, as Windows quick calendar will only show back 100 years..
// double checking against 1/1/1917, along with some debugging
let startDate2 = {
    day: 1,
    month: 1,
    year: 1917,
    dayOfWeek: 0
};

let endDate = {
    day: 31,
    month: 12,
    year: 2000
};

let sundaysOnFirstOfMonth = countSundaysInRange(startDate, endDate); /*?*/
console.log(sundaysOnFirstOfMonth);
