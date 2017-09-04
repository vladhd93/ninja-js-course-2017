function xhr(url) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open('GET', url);
    request.addEventListener('readystatechange', () => {
      if (request.readyState !== request.DONE) {
        return;
      }
      if (request.status !== 200) {
        return reject('всеочень плохо');
      }
      resolve(JSON.parse(request.responseText));
    });
    request.send();
  });
}

function getPostsByFirstUser(cb) {
  return xhr('https://jsonplaceholder.typicode.com/users')
    .then(([{ id }]) => {
      xhr(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
    })
    .then(posts => {
      const div = document.querySelector('.demo');
      const header = document.createElement('h1');
      header.textContent = name;
      div.appendChild(header);
      const ul = document.createElement('ul');
      posts.forEach(({ title }) => {
        const li = document.createElement('li');
        li.textContent = title;
        ul.appendChild(li);
      });
      return div.appendChild(ul);
    });
}

getPostsByFirstUser().then(
  () => {
    console.log('all ok');
  },
  () => {
    alert('all bad');
  },
);
