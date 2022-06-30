
const form = document.getElementById("form");
const search = document.getElementById("search");
const tagsEl = document.getElementById("tags");
const btn_search = document.getElementById("btn-search");
let pagina = 1;
let peliculas = "";
let ultimaPelicula;

const API_KEY = "api_key=8158b68c05e07d0b7f97b3a39457fc5a";
const URL = `https://api.themoviedb.org/3/discover/movie?api_key=8158b68c05e07d0b7f97b3a39457fc5a&page=${pagina}`;

const searchURL = `https://api.themoviedb.org/3/search/movie?${API_KEY}`;

function cargarDato(dato) {
  console.log(dato);
  window.open(`https://wa.me//send?text=${dato}`);
  /*
  var texto = $("#textoDato");
  texto.val(textoA);
  (async () => {
    const { value: number } = await Swal.fire({
      title: "numero",
      input: "text",
      inputLabel: "Tu numero",
      inputPlaceholder: "",
    });

    if (number) {
      Swal.fire(`Se enviara un mensaje a: ${number}`);
    }

    
  })();*/
}

//observador
let observador = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        pagina += 1;
        getMovies(
          `https://api.themoviedb.org/3/discover/movie?api_key=8158b68c05e07d0b7f97b3a39457fc5a&page=${pagina}`
        );
      }
    });
  },
  {
    rootMargin: "0px 0px 200px 0px ",
    threshold: 1.0,
  }
);
const getMovies = async (url) => {
  try {
    const respuesta = await fetch(url);
    if (respuesta.status === 200) {
      const datos = await respuesta.json();

      datos.results.forEach((pelicula) => {
        peliculas += `
              <div class="movie" onclick="cargarDato('https://image.tmdb.org/t/p/w500${
                pelicula.poster_path
              } ${pelicula.title}')">
                <img src="${
                  pelicula.poster_path
                    ? `https://image.tmdb.org/t/p/w500${pelicula.poster_path}`
                    : "http://via.placeholder.com/1080x1580"
                }" alt="${pelicula.title}">
                <div class="overview">
                    <h3>${pelicula.title}</h3>
                </div>                
                               
            </div>
          `;
      });
      datos.results.map((elm) => {});
      document.getElementById("contenedor").innerHTML = peliculas;
      const peliculasEnPantalla =
        document.querySelectorAll(".contenedor .movie");
      ultimaPelicula = peliculasEnPantalla[peliculasEnPantalla.length - 1];
      observador.observe(ultimaPelicula);
    } else if (respuesta.status === 401) {
      console.log("Llave mal");
    } else if (respuesta.status === 404) {
      console.log("No existe peliculka");
    } else {
      console.log("Error");
    }
  } catch (error) {
    console.log(error);
  }
};

getMovies(URL);

search.addEventListener("keypress", function (e) {
  const searchTerm = search.value;

  peliculas = "";
  getMovies(
    `https://api.themoviedb.org/3/search/movie?api_key=8158b68c05e07d0b7f97b3a39457fc5a&query=${searchTerm}`
  );
});
search.addEventListener("keydown", function (e) {
  const searchTerm = search.value;
  if (searchTerm.length == 0) {
    getMovies(URL);
  }
});
