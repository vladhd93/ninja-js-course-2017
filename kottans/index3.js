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

// function* demo() {
//   console.log('start');
//   yield 1; // {value:1,done:false}
//   console.log('going 1');
//   yield 2;
//   console.log('going 2');
//   yield 3;
//   console.log('going 3');
//   return 4;
// }

// const demo2 = function*() {
//   console.log('start');
//   yield 1; // {value:1,done:false}
//   console.log('going 1');
//   yield 2;
//   console.log('going 2');
//   yield 3;
//   console.log('going 3');
//   return 4;
// };

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

// function generatorLessPbjectEntries(obj) {
//   let index = 0;
//   const propKeys = Reflect.ownKeys(obj);
//   return {
//     [Symbol.iterator]() {
//       return this;
//     },
//     next() {
//       if (index === propKeys.length) {
//         return {
//           done: true,
//         };
//         let key = propKeys[index++];
//         return {
//           value: [key, obj[key]],
//         };
//       }
//     },
//   };
// }

// function* gen1() {
//   yield 1;
//   yield 2;
//   yield* gen2();
//   yield 3;
// }

// function* gen2() {
//   yield 4;
//   yield 5;
//   yield 6;
// }

// class Tree {
//   constructor(value, left = null, right = null) {
//     this.value = value;
//     this.left = left;
//     this.right = right;
//   }

//   *[Symbol.iterator]() {
//     if (this.left) yield* this.left;
//     yield this.value;
//     if (this.right) yield* this.right;
//   }
// }

// let a = new Tree(8, new Tree(5, new Tree(2), new Tree(6)), new Tree(12));

// function* sum() {
//   let sum = 0;
//   while (1) {
//     let currentNumber = yield sum;
//     sum += currentNumber;
//   }
// }

// function* stubbornSum() {
//   let sum = 0;
//   try {
//     while (1) {
//       let currentNumber = yield sum;
//       sum += currentNumber;
//     }
//   } catch (e) {
//   } finally {
//     let counter = 1;
//     while (1) {
//       yield `i will be back ${counter++}`;
//     }
//   }
// }

// function* loadData() {
//   document.body.textContent = 'loading.....';
//   const timeoutPromise = new Promise((ok, failure) =>
//     setTimeout(Math.random() < 0.5 ? ok : failure, 1000),
//   );

//   try {
//     yield timeoutPromise;
//   } catch (e) {
//     document.body.textContent = 'Error';
//   }

//   const data = yield fetch(
//     'http://jsonplaceholder.typicode.com/users',
//   ).then(r => r.json());

//   const ul = document.createElement('ul');
//   data.forEach(({ id, name }) => {
//     const item = document.createElement('li');
//     item.textContent = `${id} . ${name}`;
//     ul.appendChild(item);
//   });
//   document.body.appendChild(ul);
// }

// loadData();

// function co(generatorFn) {
//   const iterator = generatorFn();

//   function step(promiseResult = undefined) {
//     const nextPromise = iterator.next(promiseResult);
//     if (!nextPromise.done) {
//       nextPromise.value.then(
//         result => step(result),
//         result => iterator.throw(result),
//       );
//     }
//   }
//   step();
// }

// co(loadData);

function* gen1() {
  while (1) {
    yield 1;
    console.log('enterring gen2');
    yield* gen2();
    yield 2;
  }
}

function* gen2() {
  while (1) {
    yield 3;
    yield 4;
  }
}
