// function search(needle, haystack) {
//   for (let property in haystack) {
//     if (haystack.hasOwnProperty(property)) {
//       if (
//         haystack[property] === needle &&
//         typeof haystack[property] !== 'object'
//       ) {
//         return true;
//       } else if (typeof haystack[property] === 'object') {
//         let result = search(needle, haystack[property]);
//         if (result) {
//           return true;
//         } else {
//           return false;
//         }
//       }
//     }
//   }
//   return false;
// }

// console.log(search(5, { a: 3, b: 5, c: 9 })); // true

// console.log(search('5', { a: 3, b: 5, c: 9 })); // false

// console.log(search(5, { a: 3, b: { u: 8, '5': 'c', s: 5 }, c: 9 })); // true

// console.log(search(5, { a: 3, b: { u: 8, '5': 'c', s: 7 }, c: 9 })); // false

// console.log(search(5, { a: [1, 2, 3, 5, 7, 9], c: 8, s: 6 })); // true

// console.log(search(5, { a: [1, 2, { s: 4, c: { u: 5 } }], s: 9 })); // true

//Проверка на обьект
//typeof a[x] = 'object';
//Юзать Object.keys OBject.values
//typeof null это object
//юзать every
//Правильная a[x] !== null && typeof a[x] === 'object'
//Нужно перебирать Object.keys()
//использовать for ... of для перебора всех итерируемых сущностей

Object.keys(a).forEach(key => {
  if (Array.isArray(a[key])) {
    //for .. of ...
  }
});

function equals(obj1, obj2) {
  var keys1 = Object.keys(obj1).sort();
  var keys2 = Object.keys(obj2).sort();

  if (keys1.length !== keys2.length) {
    return false;
  }

  // first make sure have same keys. may save time
  if (
    !keys1.every((k, i) => {
      return k === keys2[i];
    })
  ) {
    return false;
  }

  // check if any value is not equal
  return keys1.every(kk => {
    var v1 = obj1[kk];
    var v2 = obj2[kk];
    if (Array.isArray(v1)) {
      return equals(v1, v2);
    } else if (typeof v1 === 'object' && v1 !== null) {
      return equals(v1, v2);
    } else {
      return v1 === v2;
    }
  });
}

let obj0 = {
  x: 1,
  y: {
    z: {
      w: 1,
    },
  },
};

let obj1 = {
  x: 1,
  y: {
    z: {
      w: 1,
    },
  },
};

let obj2 = {
  x: 1,
  y: {
    z: {
      w: 2,
    },
  },
};

let obj3 = {
  x: 2,
  y: 3,
  z: 4,
};

let obj4 = {
  x: 2,
  y: 3,
  z: 4,
};

let obj5 = {
  x: 1,
  y: 3,
  z: 4,
};

console.log(
  equals(obj0, obj1),
  equals(obj1, obj2),
  equals(obj3, obj4),
  equals(obj4, obj5),
);

//true
//false
//true
//false

// function copy(obj) {
//   let newObj = {};
//   for (let property in obj) {
//     if (obj.hasOwnProperty(property)) {
//       if (typeof property !== 'object') {
//         newObj[property] = obj[property];
//       } else if (typeof property === 'object') {
//         let result = copy(obj[property]);
//         if (!result) {
//           return;
//         }
//       }
//     }
//   }
//   return newObj;
// }
// let x = {
//   x: () => {
//     return 1;
//   },
//   y: 2,
//   z: { a: { b: { c: 3 } } },
// };
// let y = copy(x);

// console.log(y);



let obj = {
  "phone_num1bers":[
    {
      
    },
    {"number":
     ["Это поле не может быть пустым."]
    }
  ],
    "phone_numbers":[
    {
      
    },
    {"number":
     ["Это поле не может быть пустым."]
    }
  ],
  "number_of_candidates": [
        "A valid integer is required."
    ]
};

function renderErrors(obj){
  let newObj = {};
  for (let property in obj) {
    if(obj.hasOwnProperty(property)){
      if (typeof obj[property] !== 'object') {
        console.log('here');
        newObj[property] = obj[property];
      } else if (typeof property === 'object'){
        console.log('and here');
        let result = renderErrors(obj[property]);
        if(!result){
          return;
        }
      }
    }
  }
  return newObj;
}

console.log(renderErrors(obj));



