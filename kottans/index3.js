// const a = [1, 2, 3];
// const someWeirdObject = {
//   [Symbol.iterator]: () => {
//     let position = 1;

//     const obj = {
//       next: () => {
//         return {
//           value: position++,
//           done: position > 10,
//           next: obj.next,
//         };
//       },
//     };
//     return obj;
//   },
// };

function* demo() {
  console.log('start');
  yield 1; // {value:1,done:false}
  console.log('going 1');
  yield 2;
  console.log('going 2');
  yield 3;
  console.log('going 3');
  return 4;
}

const demo2 = function*() {
  console.log('start');
  yield 1; // {value:1,done:false}
  console.log('going 1');
  yield 2;
  console.log('going 2');
  yield 3;
  console.log('going 3');
  return 4;
};

// const s = {
//   *demo() {
//     console.log('start');
//     yield 1; // {value:1,done:false}
//     console.log('going 1');
//     yield 2;
//     console.log('going 2');
//     yield 3;
//     console.log('going 3');
//     return 4;
//   },
// };

// const s = {
//   func() {
//     console.log(1111);
//   },
//   *demo() {
//     console.log('start');
//     yield 1; // {value:1,done:false}
//     console.log('going 1');
//     yield 2;
//     console.log('going 2');
//     yield 3;
//     console.log('going 3');
//     return 4;
//   },
// };

// class A {
//   *demo() {
//     console.log('start');
//     yield 1; // {value:1,done:false}
//     console.log('going 1');
//     yield 2;
//     console.log('going 2');
//     yield 3;
//     console.log('going 3');
//     return 4;
//   }
// }

// [a, b, ...c] = s.demo();

// function* objectEntries(obj) {
//   const propKeys = Reflect.ownKeys(obj);
//   for (const propKey of propKeys) {
//     yield [propKey, obj[propKey]];
//   }
// }

function generatorLessPbjectEntries(obj) {
  let index = 0;
  const propKeys = Reflect.ownKeys(obj);
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      if (index === propKeys.length) {
        return {
          done: true,
        };
        let key = propKeys[index++];
        return {
          value:
        };
      }
    },
  };
}
