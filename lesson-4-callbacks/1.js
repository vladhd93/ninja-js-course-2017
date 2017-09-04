function getPostsByFirstUser(cb) {
  const usersRequest = new XMLHttpRequest();
  usersRequest.open('GET', 'https://jsonplaceholder.typicode.com/users');
  usersRequest.addEventListener('readystatechange', () => {
    if (usersRequest.readyState !== usersRequest.DONE) {
      return;
    }
    const response = JSON.parse(usersRequest.responseText);
    const [{ id, name }] = JSON.parse(usersRequest.responseText);
    const url = `https://jsonplaceholder.typicode.com/posts/${id}`;
    const postsRequest = new XMLHttpRequest();
    postsRequest.open('GET', url);
    postsRequest.addEventListener('onreadystatechannge', () => {
      if (postsRequest.readyState !== postsRequest.DONE) {
        return;
      }
      const posts = JSON.parse(postsRequest.responseText);
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
    });

    div.appendChild(ul);

    cb();
  });
  postsRequest.send();
}
getPostsByFirstUser(() => {
  alert('vse zagryzilos');
});
