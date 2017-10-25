function createSmartObject(obj) {
  return obj;
}

function defineComputedField(obj, fieldName, fieldArr, fn) {
  let data = {};

  Object.keys(obj).forEach(prop => {
    data[prop] = obj[prop];
  });
  obj._data = { ...data };
  const allFieldsValues = fieldArr.map(param => obj[param]);
  Object.keys(obj).forEach(propName => {
    if (propName === '_data') {
      return;
    }
    Object.defineProperty(obj, propName, {
      get() {
        return obj._data[`${propName}`];
      },

      set(value) {
        this._data[`${propName}`] = value;
        this._data[`${fieldName}`] = fn(...allFieldsValues);
      },
    });
  });

  Object.defineProperty(obj, fieldName, {
    get() {
      this._data[fieldName] = fn(...allFieldsValues);
      return this._data[`${fieldName}`];
    },
    set() {
      console.log('error');
    },
  });
}

const obj = createSmartObject({
  name: 'Vasya',
  surname: 'Ivanov',
  patronimic: 'Olegovich',
});

defineComputedField(
  obj,
  'fullName',
  ['name', 'surname', 'patronimic'],
  (name, surname, patronimic) => {
    console.log('fn');
    return `${name} ${surname} ${patronimic}`;
  },
);

console.log(1, obj.fullName); // Vasya Ivanov Olegovich
obj.surname = 'Petrov';
