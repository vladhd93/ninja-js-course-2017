fetch('http://jsonplaceholder.typicode.com/users')
  .then(r => r.json())
  .then(data =>
    Promise.all([
      data,
      fetch(`http://jsonplaceholder.typicode.com/users/${data[0].id}`),
    ])
      .then(obj => Promise.all([obj[0], obj[1].json()]))
      .then(data => console.log(data)),
  );
