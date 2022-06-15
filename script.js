
const form = document.getElementById('form');
const search = document.getElementById('search');
const tagsEl = document.getElementById('tags');
const btn_search = document.getElementById('btn-search');
let pagina = 1;
let peliculas = '';
let ultimaPelicula

const API_KEY = 'api_key=8158b68c05e07d0b7f97b3a39457fc5a';
const URL = `https://api.themoviedb.org/3/discover/movie?api_key=8158b68c05e07d0b7f97b3a39457fc5a&page=${pagina}`;
const IMG_URL = '';
const searchURL = `https://api.themoviedb.org/3/search/movie?${API_KEY}`;

//observador
let observador = new IntersectionObserver((entradas) => {
  entradas.forEach(entrada => {
    if (entrada.isIntersecting) {
      pagina += 1;
      getMovies(`https://api.themoviedb.org/3/discover/movie?api_key=8158b68c05e07d0b7f97b3a39457fc5a&page=${pagina}`)
    }
  })
}, {
  rootMargin: "0px 0px 200px 0px ",
  threshold: 1.0
})
const genres = [
  {
    "id": 28,
    "name": "Action"
  },
  {
    "id": 12,
    "name": "Adventure"
  },
  {
    "id": 16,
    "name": "Animation"
  },
  {
    "id": 35,
    "name": "Comedy"
  },
  {
    "id": 80,
    "name": "Crime"
  },
  {
    "id": 99,
    "name": "Documentary"
  },
  {
    "id": 18,
    "name": "Drama"
  },
  {
    "id": 10751,
    "name": "Family"
  },
  {
    "id": 14,
    "name": "Fantasy"
  },
  {
    "id": 36,
    "name": "History"
  },
  {
    "id": 27,
    "name": "Horror"
  },
  {
    "id": 10402,
    "name": "Music"
  },
  {
    "id": 9648,
    "name": "Mystery"
  },
  {
    "id": 10749,
    "name": "Romance"
  },
  {
    "id": 878,
    "name": "Science Fiction"
  },
  {
    "id": 10770,
    "name": "TV Movie"
  },
  {
    "id": 53,
    "name": "Thriller"
  },
  {
    "id": 10752,
    "name": "War"
  },
  {
    "id": 37,
    "name": "Western"
  }
]


/*
var selectedGenre = []
setGenre();
function setGenre() {
  tagsEl.innerHTML = '';
  genres.forEach(genre => {
    const t = document.createElement('div');
    t.classList.add('tag');
    t.id = genre.id;
    t.innerText = genre.name;
    t.addEventListener('click', () => {
      if (selectedGenre.length == 0) {
        selectedGenre.push(genre.id);
      } else {
        if (selectedGenre.includes(genre.id)) {
          selectedGenre.forEach((id, idx) => {
            if (id == genre.id) {
              selectedGenre.splice(idx, 1);
            }
          })
        } else {
          selectedGenre.push(genre.id);
        }
      }
     
      //getMovies(API_URL + '&with_genres=' + encodeURI(selectedGenre.join(',')))
      highlightSelection()
    })
    tagsEl.append(t);
  })
}

function highlightSelection() {
  const tags = document.querySelectorAll('.tag');
  tags.forEach(tag => {
    tag.classList.remove('highlight')
  })
  clearBtn()
  if (selectedGenre.length != 0) {
    selectedGenre.forEach(id => {
      const hightlightedTag = document.getElementById(id);
      hightlightedTag.classList.add('highlight');
    })
  }

}

function clearBtn() {
  let clearBtn = document.getElementById('clear');
  if (clearBtn) {
    clearBtn.classList.add('highlight')
  } else {

    let clear = document.createElement('div');
    clear.classList.add('tag', 'highlight');
    clear.id = 'clear';
    clear.innerText = 'Clear x';
    clear.addEventListener('click', () => {
      selectedGenre = [];
      setGenre();
      getMovies(API_URL);
    })
    tagsEl.append(clear);
  }

}
*/
const getMovies = async (url) => {
  try {
    const respuesta = await fetch(url);
    if (respuesta.status === 200) {
      const datos = await respuesta.json();

      datos.results.forEach(pelicula => {
        console.log(pelicula);
        peliculas += `
              <div class="movie">
                <img src="${pelicula.poster_path ? `https://image.tmdb.org/t/p/w500${pelicula.poster_path}` : "http://via.placeholder.com/1080x1580"}" alt="${pelicula.title}">
                <div class="overview">
                    ${pelicula.title}
                    
                </div>
            </div>
          `;
      })
      document.getElementById("contenedor").innerHTML = peliculas;
      const peliculasEnPantalla = document.querySelectorAll('.contenedor .movie')
      ultimaPelicula = peliculasEnPantalla[peliculasEnPantalla.length - 1];
      observador.observe(ultimaPelicula);
    } else if (respuesta.status === 401) {
      console.log("Llave mal")
    } else if (respuesta.status === 404) {
      console.log("No existe peliculka")
    } else {
      console.log("Error")
    }
  } catch (error) {
    console.log(error);
  }

}


getMovies(URL);

search.addEventListener('keypress', function (e) {

  const searchTerm = search.value;
   
  peliculas = "";
  getMovies(`https://api.themoviedb.org/3/search/movie?api_key=8158b68c05e07d0b7f97b3a39457fc5a&query=${searchTerm}`)
  /*selectedGenre = [];
  //setGenre();
  if (searchTerm) {
    
  } else {
    getMovies(URL);
  }*/
})
search.addEventListener('keydown', function (e) {
  const searchTerm = search.value;
  if (searchTerm.length == 0) {
    getMovies(URL);
  }
})
/*


function pageCall(page) {
  let urlSplit = lastUrl.split('?');
  let queryParams = urlSplit[1].split('&');
  let key = queryParams[queryParams.length - 1].split('=');
  if (key[0] != 'page') {
    let url = lastUrl + '&page=' + page
    getMovies(url);
  } else {
    key[1] = page.toString();
    let a = key.join('=');
    queryParams[queryParams.length - 1] = a;
    let b = queryParams.join('&');
    let url = urlSplit[0] + '?' + b
    getMovies(url);
  }
}*/