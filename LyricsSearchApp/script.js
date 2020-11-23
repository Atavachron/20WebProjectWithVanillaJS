const url = 'https://api.lyrics.ovh';

const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

form.addEventListener('submit', e => {
  e.preventDefault();

  const searchValue = search.value.trim();

  //Check if there was a search value and if not - display an alert
  if (!searchValue) {
    alert('Please type something');
  } else {
    //If there was a value, run the function fetching the data
    searchSong(searchValue);
  }
});

//Function to fetch the data from the url
async function searchSong(val) {
  const res = await fetch(`${url}/suggest/${val}`);
  const data = await res.json();

  //After the data was received run a function to display the data
  showData(data);
}

//Function to show the song and the artist in the DOM
function showData(data) {
  let output = '';
  data.data.forEach(song => {
    output += `
      <li>
        <span><strong>${song.artist.name}</strong> - ${song.title}</span>
        <button class="btn" data-artist="${song.artist.name}" data-songtitle={song.title}>Display Lyrics</button>
      </li>
    `;
  });

  result.innerHTML = `
    <ul class="songs">
      ${output}
    </ul>
  `;

  if (data.prev || data.next) {
    more.innerHTML = `
      ${data.prev ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Previous</button>` : ''}
      ${data.next ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>` : ''}
    `;
  } else {
    more.innerHTML = '';
  }
} 


//Get previous and next songs
async function getMoreSongs(url) {
  //Use cors-anywhere.herokuapp.com proxy to prevent CORS errors
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();

  showData(data);
}