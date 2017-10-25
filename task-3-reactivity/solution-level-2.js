function createSmartObject(obj) {
  let newObj = { ...obj };
  let data = {};

  Object.keys(newObj).forEach(prop => {
    data[prop] = newObj[prop];
  });

  newObj._data = { ...data };
  newObj.trackedFields = [];
  newObj.trackedTable = [];
  const addDescriptors = (obj, field) => {
    Object.defineProperty(obj, field, {
      get() {
        newObj.trackedFields.push(field);

        return obj._data[field];
      },
      set(value) {
        obj._data[field] = value;
        if (newObj.trackedTable[0]) {
          console.log(555, newObj.trackedTable[0].fn());
        }
      },
    });
  };

  Object.keys(obj).forEach(prop => {
    addDescriptors(newObj, prop);
  });
  return newObj;
}

function defineComputedField(obj, fieldName, fn) {
  Object.defineProperty(obj, fieldName, {
    get() {
      obj._data[`${fieldName}`] = fn(obj);
      return obj._data[`${fieldName}`];
    },
    set(value) {
      console.log('error');
    },
  });

  obj.trackedTable.push({
    name: fieldName,
    fn,
  });
  return obj;
}

const obj = createSmartObject({
  name: 'Vasya',
  surname: 'Ivanov',
  patronimic: 'Olegovich',
});

defineComputedField(obj, 'fullName', function(data) {
  return obj.name + ' ' + obj.surname + ' ' + obj.patronimic;
});

console.log(obj.fullName);
console.log((obj.name = 'sdf'), obj.fullName);
