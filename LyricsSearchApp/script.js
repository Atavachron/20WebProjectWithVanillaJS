const url = 'https://api.lyrics.ovh';

const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

form.addEventListener('submit', e => {
  e.preventDefault();

  const searchValue = search.value.trim();

  if (!searchValue) {
    alert('Please type something');
  } else {
    searchSong(searchValue);
  }
});

async function searchSong(val) {
  const res = await fetch(`${url}/suggest/${val}`);
  const data = await res.json();

  console.log(data);
}
