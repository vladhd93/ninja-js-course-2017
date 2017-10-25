function search(needle, haystack) {
  const queue = [haystack];
  while (queue.length) {
    const current = queue.shift();
    for (const key of Object.keys(current)) {
      if (current[key] === needle) {
        return true;
      }
      if (current[key] !== null && typeof current[key] === 'object') {
        queue.push(current[key]);
      }
    }
  }

  return false;
}

console.log(search(5, { a: 3, b: { a: { b: 5 } } }));
