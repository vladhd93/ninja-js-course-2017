// const add = n => n + 10;
// add(9);

// const memoizedAdd = () => {
//   let cache = {};
//   return n => {
//     if (n in cache) {
//       console.log('fetching from cache');
//       return cache[n];
//     } else {
//       console.log('calculating');
//       let result = n + 10;
//       cache[n] = result;
//       return result;
//     }
//   };
// };

// const newAdd = memoizedAdd();
// console.log(newAdd(9)); // вычислено
// console.log(newAdd(9)); // взято из кэша
// console.log(newAdd(9)); // взято из кэша

const add = (x, y) => x + y;
console.log('Simple call', add(1, 2));

const memoize = fn => {
  let cache = {};
  return (...args) => {
    let uniqueKey = args.toString();
    if (uniqueKey in cache) {
      console.log('take from cache');
      return cache[uniqueKey];
    } else {
      console.log('Calculating result');
      let result = fn(...args);
      cache[uniqueKey] = result;
      return result;
    }
  };
};

function bar(t1, t2) {
  console.log(`Text: ${t1} ${t2}`);
  return [t1, t2];
}
const memoizedBar = memoize(bar);
console.log(memoizedBar('some', 'text'));
// Вывод:
// Text: some text
// ['some', 'text']
console.log(memoizedBar({ a: 'name' }, { b: 'sername' }));
// Вывод:
// Text: [object Object] [object Object]
// [{ a: 'name' }, { b: 'sername' }]
console.log(memoizedBar({ a: 'name' }, { b: 'sername' }));
// Вывод:
// [{ a: 'name' }, { b: 'sername' }]
console.log(memoizedBar(4, 6));
// Text: 4 6
// [4, 6]
console.log(memoizedBar(6, 4));
// Text: 6 4
// [6, 4]
console.log(memoizedBar(6, 4));
// [6, 4]
