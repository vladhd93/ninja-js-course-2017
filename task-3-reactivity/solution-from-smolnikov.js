//first level
// function createSmartObject(obj){
//     if(Reflect.has(obj,'_data')){
//         throw new Error('Property "_data" already exists.');
//     }
//     if(Reflect.has(obj,'_arrFunc'))
//     {
//         throw new Error('Property "_data" already exists.');
//     }
//     const newObj = {
//         _data:{},
//         _arrFunc:[]
//     };
//     Object.keys(obj).forEach((key)=>{
//         newObj._data[key] = obj[key];
//         Object.defineProperty(newObj,key,{
//             get(){
//                 return this._data[key];
//             },
//             set(val){
//                 this._data[key] = val;
//                 newObj._arrFunc.forEach(wargs => {
//                     if(wargs.args.some(arg => arg === key)){
//                         wargs.wrapClb();
//                     }
//                 });
//             }
//         });
//     });
//     return newObj;
// }

// function defineComputedField(obj,computedName,args,clb){
//     if(Reflect.has(obj._data,computedName)){
//         throw new Error('error');
//     }
//     const wrapClb = ()=>{
//         obj._data[computedName] = clb(...args.map(x => obj[x]));
//     };
//     obj._arrFunc.push({wrapClb,args});
//     Object.defineProperty(obj,computedName,{
//         get(){
//             return this._data[computedName];
//         },
//         set(){
//             throw new Error('assigmnet to comptude property');
//         }
//     });
//     wrapClb();
// }

// const oldObj = { a: "a", b: "b", c: "c" };

//     const obj = createSmartObject(oldObj);

//     defineComputedField(obj, "ab", ["a", "b"], (a, b) => {
//       console.log("called ab");
//       return a + b;
//     });

//     defineComputedField(obj, "ba", ["a", "b"], (a, b) => {
//       console.log("called ba");
//       return b + a;
//     });

//     obj.a = "c";
//     console.log(obj.ab); // cb
//     console.log(obj.ba); // bc
//     obj.c = 'test';

//second level

// function createSmartObject(obj) {
//     if (Reflect.has(obj, "_data")) {
//         throw new Error('Property "_data" already exists.');
//     }
//   if (Reflect.has(obj, "_arrFunc")) {
//          throw new Error('Property "_arrFunc" already exists.');
//   }
//   const newObj = { _data: {}, _arrFunc: [], _flag: false };
//   Object.keys(obj).forEach(key => {
//       newObj._data[key] = obj[key];
//       Object.defineProperty(newObj,key,{
//           get(){
//               if(this._flag){
//                   newObj._arrFunc[newObj._arrFunc.length - 1].args.add(key);
//               }
//               return this._data[key];
//           },
//           set(val){
//               this._data[key] = val;
//               newObj._arrFunc.forEach(wargs => {
//                   if(wargs.args.has(key)){
//                       wargs.wrapClb();
//                   }
//               });
//           }
//       });
//   });
//   return newObj;
// }

// function defineComputedField(obj, computedName, clb){
//     if(Reflect.has(obj._data, computedName)){
//         throw new Error('Property "' + computedName + '" already exists.');
//     }
//     const wrapClb = ()=>{
//         obj._data[computedName] = clb(obj);
//     };

//     Object.defineProperty(obj,computedName,{
//         get(){
//             return this._data[computedName];
//         },
//         set(){
//             throw new Error("Assignment to computed property");
//         }
//     });
//     obj._flag = true; // включение записи getter
//     obj._arrFunc.push({ wrapClb, args: new Set });
//     wrapClb(); // первый вызов callback-функции
//     obj._flag = false; // выключение записи getter
// }

// const oldObj = {
//     a: "a",
//     b: "b",
//     c: "t",
//     ifProp: 0
//   };

//   const obj = createSmartObject(oldObj);

//   obj.c='t1';

//   defineComputedField(obj, "ab", data => {
//     console.log("called ab");
//     return data.a + data.b;
//   });
//   // called ab

//   obj.c='t2';

//   defineComputedField(obj, "ba", data => {
//     console.log("called ba");
//     return data.b + data.a;
//   });
//   // called ba
//   obj.c='t3';

//   obj.a = "m";
//   // called ab
//   // called ba

//   obj.c = "test";
//   console.log(obj.ab); //mb
//   console.log(obj.ba); //mb

// function createSmartObject(obj) {
//   if (Reflect.has(obj, '_data'))
//     throw new Error('Property "_data" already exists.');
//   if (Reflect.has(obj, '_arrFunc'))
//     throw new Error('Property "_arrFunc" already exists.');

//     const newObj = { _data: {}, _getterCatch: new Set(), _setterMem: new Set() };
//     Object.keys(obj).forEach(key => {
//       newObj._data[key] = obj[key];
//       Object.defineProperty(newObj,key,{
//         get(){
//           this._getterCatch.add(key);
//           return this._data[key];
//         },
//         set(val){
//           this._data[key] = val;
//           const todoFunc = [];
//           this._setterMem.forEach(sCatch => {
//             if(sCatch.key === key){
//               todoFunc.push(sCatch.wrapClb);
//             }
//           });
//           todoFunc.forEach(f => f());
//         }
//       });
//     });
//     return newObj;
// }

// function defineComputedField(obj,computedName,clb){
//   if (Reflect.has(obj._data, computedName))
//   throw new Error('Property "' + computedName + '" already exists.');
//   const wrapClb = ()=>{
//     obj._getterCatch.clear();
//     obj._data[computedName] = clb(obj);
//     obj._setterMem.forEach(wp => {
//       if(wp.wrapClb === wrapClb){
//         obj._setterMem.delete(wp);
//       }
//     });
//     obj._getterCatch.forEach(key => obj._setterMem.add({ key, wrapClb }));

//   };

// Object.defineProperty(obj,computedName,{
//   get(){
//     return this._data[computedName];
//   },
//   set(){
//     throw new Error("Assignment to computed property");
//   }
// });
//   wrapClb();
// }



function createSmartObject(obj){
    if (Reflect.has(obj, "_smartObject"))
    throw new Error("Property _smartObject already exists.");
    const data = {};
    const getterCatch = new Set();
    const setterMem = new Set();
    const toDoFunc = new Set();
    const iC = []; // для цикличных ссылок
    const oC = []; // для цикличных ссылок
    let getterCallAdd = false;
    let initGetSet = false;
    const createComputedFunction = (clb,computedNameGS)=>{
        createGetterSetter(newObj, computedNameGS);
        const wrapClb = ()=>{
            getterCatch.clear();
            getterCallAdd = true;
            const result = clb(newObj);
            getterCallAdd = false;
            setterMem.forEach(wp => {
                if(wp.wrapClb === wrapClb){
                    setterMem.delete(wp);
                }
            });
            getterCatch.forEach(key => setterMem.add({key,wrapClb}));
            newObj[computedNameGS] = result;
        };
        return wrapClb;
    };
    const createGetterSetter = (dObj,key,enumOpt = false,symKey = Symbol(),write = true,config = true)=>{
        Reflect.defineProperty(dObj,key,{
            get(){
                if(getterCallAdd){
                    getterCatch.add(symKey);
                }
                return data[symKey];
            },
            set(val){
                if(write || initGetSet){
                    initGetSet = false;
                    data[symKey] = cloneObj(val);
                    setterMem.forEach(sCatch => {
                        if(sCatch.key === symKey){
                            toDoFunc.add(sCatch.wrapClb);
                        }
                    });
                    toDoFunc.forEach(f => {
                        toDoFunc.delete(f);
                        f();
                    });
                } else {
                    throw new Error("read only");
                }
            },
            enumerable: enumOpt,
            configurable: config
        });
    };

    const cloneObj = iObj => {
        const isObj = val => typeof val === 'object' && val !== null;
        if(!isObj(iObj)){
            return iObj;
        } 
        const idx = iC.findIndex(x => x === iObj);
        if(idx >= 0){
            return oC[idx];
        }
        
            const oObj = Object.create(Object.getPrototypeOf(iObj));
            iC.push(iObj);
            oC.push(oObj);
            Reflect.ownKeys(iObj).forEach(key => {
                const desc = Reflect.getOwnPropertyDescriptor(iObj, key);
                if(Reflect.has(desc,'get')){
                    Reflect.defineProperty(oObj, key, desc);
                } else {
                    const symKey = Symbol(key);
                    createGetterSetter(
                        oObj,
                        key,
                        desc.enumerable,
                        symKey,
                        desc.writable,
                        desc.configurable
                    );
                    initGetSet = true;
                    oObj[key] = iObj[key];
                }
            });
            return oObj;
    };

    const newObj = cloneObj(obj);
    const smartObject = {
        data,
        getterCatch,
        setterMem,
        toDoFunc,
        createComputedFunction,
        createGetterSetter
      };
      Reflect.defineProperty(newObj, "_smartObject", {
        value: smartObject,
        enumearble: false
      });
      return newObj;

}

function defineComputedField(obj,computedName,clb){
    if (Reflect.has(obj, computedName))
    throw new Error(`Property "${computedName}" already exists.`);
    const computedNameGS = Symbol(computedName);
    const wrapClb = obj._smartObject.createComputedFunction(clb, computedNameGS);
    Reflect.defineProperty(obj, computedName, {
        get() {
          return this[computedNameGS];
        },
        set() {
          throw new Error("Assignment to computed property");
        },
        enumerable: true
      });

      wrapClb();
}


//test's

const nestedObj = {
    main: {
      changeToPrim: {
        get a() {
          return this._a;
        },
        set a(value) {
          this._a = value;
        },
        b: 2,
        c: 3,
        _a: undefined
      },
      changeToObj: 22,
      ac: 23
    },
    someNum1: 222,
    someNum2: 333
  };

  nestedObj.link = nestedObj;

  const smartNestedObj = createSmartObject(nestedObj);

  smartNestedObj.main.changeToPrim = 1; // A primitive value is assigned to a property of type 'Object'

  const newchangeToObj = {
    get a() {
      return this._a;
    },
    set a(v) {
      this._a = v;
    },
    b: 2,
    c: 3,
    _a: 3
  };

  smartNestedObj.main.changeToObj = newchangeToObj; // An object is assigned to a property

  smartNestedObj.main.changeToObj.a = 1;

  console.log("\nBoth fields are defined and computed");

  defineComputedField(smartNestedObj, "sum1", data => {
    console.log("Computed sum1");
    if (data.main.changeToObj.a === 1) {
      return `main.changeToObj.b ${data.main.changeToObj.b} + main.ac ${data.main.ac}`;
    }
    return `main.changeToObj.c ${data.main.changeToObj.c} + someNum2 ${data.someNum2}`;
  });

  // Computed sum1

  defineComputedField(smartNestedObj, "sum2", data => {
    console.log("Computed sum2");
    if (data.main.changeToObj.a === 1) {
      return `main.changeToPrim ${data.main
        .changeToPrim} + someNum1 ${data.someNum1}`;
    }
    return `main.changeToObj.b ${data.main.changeToObj
      .b} + main.changeToObj.c ${data.main.changeToObj.c}`;
  });

  // Computed sum2

  console.log(
    "sum1 test: ",
    smartNestedObj.sum1 === "main.changeToObj.b 2 + main.ac 23"
  );
      console.log(
    "sum2 test: ",
    smartNestedObj.sum2 === "main.changeToPrim 1 + someNum1 222"
  );

  console.log("\nBoth fields are computed");
  smartNestedObj.main.changeToObj.a = 10; // Computed sum1, Computed sum2
  console.log(
    "sum1 test: ",
    smartNestedObj.sum1 === "main.changeToObj.c 3 + someNum2 333"
  );
  console.log(
    "sum2 test: ",
    smartNestedObj.sum2 === "main.changeToObj.b 2 + main.changeToObj.c 3"
  );

  console.log("\nFirst field is computed");
  smartNestedObj.someNum2 = 3330; // Computed sum1
  console.log(
    "sum1 test: ",
    smartNestedObj.sum1 === "main.changeToObj.c 3 + someNum2 3330"
  );
  console.log(
    "sum2 test: ",
    smartNestedObj.sum2 === "main.changeToObj.b 2 + main.changeToObj.c 3"
  );

  console.log("\nSecond field is computed");
  smartNestedObj.main.changeToObj.b = 20; // Computed sum2
  console.log(
        "sum1 test: ",
    smartNestedObj.sum1 === "main.changeToObj.c 3 + someNum2 3330"
  );
  console.log(
    "sum2 test: ",
    smartNestedObj.sum2 === "main.changeToObj.b 20 + main.changeToObj.c 3"
  );

  console.log("\nNone of the fields is computed");
  smartNestedObj.main.changeToPrim = 2; // Nothing recomputed
  console.log(
    "sum1 test: ",
    smartNestedObj.sum1 === "main.changeToObj.c 3 + someNum2 3330"
  );
  console.log(
    "sum2 test: ",
    smartNestedObj.sum2 === "main.changeToObj.b 20 + main.changeToObj.c 3"
  );


