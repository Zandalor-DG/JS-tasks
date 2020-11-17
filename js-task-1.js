// task#1

// const myPow = (number, exp) => {
//     if (exp === 1) {
//         return number;
//     } else {
//         return number * myPow(number, exp - 1);
//     }
// };

// console.log(myPow(3, 3));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//task#2

// const myMap = (arr, callback) => {
//     let results = [];
//     for (let i = 0; i < arr.length; i++) {
//         results.push(callback(arr[i], i, arr));
//     }
//     return results;
// };
// let arr = [1, 1, 1, 2, 3, 2, 1, 2];
// let checkMap = myMap(arr, (a) => a + 1);

// console.log(checkMap);
// console.log(arr);

// const myFilter = (arr, callback) => {
//     let results = [];
//     for (let i = 0; i < arr.length; i++) {
//         if (callback(arr[i], i, arr)) {
//             results.push(arr[i]);
//         }
//     }
//     return results;
// };
// let arr = [1, 1, 1, 2, 3, 2, 1, 2];
// let checkFilter = myFilter(arr, (a) => a === 2);

// console.log(checkFilter);
// console.log(arr);

// const myReduce = (arr, callback, startValue) => {
//     let result = startValue;
//     for (let i = 0; i < arr.length; i++) {
//         result = callback(result, arr[i], i, arr);
//     }
//     return result;
// };
// let arr = [1, 1, 1, 2, 3, 2, 1, 2, 1, 2];
// let checkReduce = myReduce(arr, (a, b) => a + b, 0);

// console.log(checkReduce);
// console.log(arr);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//task#3

function digToText(dig) {
    let words = {
        m3: [
            ['тысяча', 'тысячи', 'тысяч']
        ],
        m2: ['сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'],
        m1: ['дестять', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемдесят', 'девяносто'],
        m0: ['один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять', 'десять'],
        f0: ['одна', 'две'],
        l0: ['дестять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать']
    };
    let dim = function(dig, power, words) {
        let result = '';
        let pow = Math.floor(dig / Math.pow(10, power)) % Math.pow(10, 3);
        if (!pow) return result;
        let n2 = Math.floor(pow / 100);
        let n1 = Math.floor(pow % Math.pow(10, 2) / 10);
        let n0 = Math.floor(pow % 10);
        let s1 = (n1 > 0) ? ' ' : '';
        let s0 = (n0 > 0) ? ' ' : '';
        let get_n = function() {
            switch (power) {
                case 0:
                case 6:
                case 9:
                    result += s0 + words.m0[n0 - 1];
                    break;
                case 3:
                    if (n0 < 3) {
                        result += s0 + words.f0[n0 - 1];
                    } else {
                        result += s0 + words.m0[n0 - 1];
                    }
                    break;
            }
        };
        if (n2 > 0) {
            result += words.m2[n2 - 1];
        }
        if (n1 > 0) {
            if (n1 > 1) {
                result += s1 + words.m1[n1 - 1];
                if (n0 > 0) get_n();
            } else {
                result += s1 + words.l0[n0];
            }
        } else {
            if (n0 > 0) get_n();
        }
        if (power) {
            var d = (power - 3) / 3;
            if ((d == 0) && (n0 + n1 * 10 >= 11 && n0 + n1 * 10 <= 14)) {
                result += ' ' + words.m3[0][2];
            } else if (n0 == 1) {
                result += ' ' + words.m3[d][0];
            } else if ((n0 >= 2) && (n0 <= 4)) {
                result += ' ' + words.m3[d][1];
            } else if ((n0 == 0) || (n0 >= 5 && n0 <= 9)) {
                result += ' ' + words.m3[d][2];
            }
        }
        return result;
    }
    result = '';
    for (let i = 9; i > -1; i -= 3) {
        result += dim(dig, i, words) + ' ';
    }
    return result.replace(/[\s]{2,}/ig, ' ').trim();
}

console.log(digToText(179992));