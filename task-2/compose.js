const compose = (...fns) => {
  return fns.reduce((f, g) => {
    console.log('it is f', f);
    console.log('it is g', g);
    return (...args) => {
      return f(g(...args));
    };
  });
};
const a = a => a + 10;
const x = x => x + 1;
const y = (x, y, z) => x + y + z;

console.log(compose(a, x, y)(1, 2, 3));
