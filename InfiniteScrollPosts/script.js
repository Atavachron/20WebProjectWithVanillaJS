const postsContainer = document.querySelector('#posts-container');
const filter = document.querySelector('#filter');
const loader = document.querySelector('.loader');

const limit = 3;
const page = 1;

async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  const data = await res.json();
  return data;
}

async function displayPosts() {
  const posts = await getPosts();

  posts.forEach(post => {
    let postElement = document.createElement('div');

    postElement.classList.add('post');
    postElement.innerHTML = `
    <div class="number">${post.id}</div>
    <div class="post-info">
      <h2 class="post-title">${post.title}</h2>
      <p class="post-body">${post.body}</p>
    </div>
    `;

    postsContainer.appendChild(postElement);
  });
}

displayPosts();
