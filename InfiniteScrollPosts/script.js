const postsContainer = document.querySelector('#posts-container');
const filter = document.querySelector('#filter');
const loader = document.querySelector('.loader');

const limit = 5;
let page = 1;

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

function showLoading() {
  loader.classList.add('show');

  setTimeout(() => {
    loader.classList.remove('show');

    setTimeout(() => {
      page++;
      displayPosts();
    }, 300);
  }, 1000);
}

function filterPosts(e) {
  const input = e.target.value.toLowerCase();
  const posts = document.querySelectorAll('.post');

  posts.forEach(post => {
    const title = post.querySelector('.post-title').innerText.toLowerCase();
    const body = post.querySelector('.post-body').innerText.toLowerCase();

    if (title.includes(input) || body.includes(input)) {
      post.style.display = 'flex';
    } else {
      post.style.display = 'none';
    }
  });
}

displayPosts();

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
});

filter.addEventListener('input', filterPosts);
