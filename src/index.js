/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const {getMovies, addMovie, editMovie, getMovie} = require('./api.js');

const loaded = () => {
  getMovies().then((movies) => {
    console.log('Here are all the movies:');
    movies.forEach(({title, rating, id}) => {
      $('#load').hide();
      $('#movie-con').append(`<p>id#${id} - ${title} - rating: ${rating}<button class='edit-btn' id="${id}">edit</button></p>`)
    });
  }).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.');
    console.log(error);
  });
};
loaded();
$('#submit').click(function () {
  // e.preventDefault();
  let newMovie = {
    title: $('#movie-name').val(),
    rating: $('#movie-rating').val()
  };
  addMovie(newMovie).then(() => {
    $('#load').show();
    $('#movie-con').html('');
    loaded();
  });
  // console.log(newMovie);
});
$('.edit-btn').click(function () {
  let editid = $(this).attr('id');
  console.log(editid);
  getMovie(editid).then(movie =>{
    $('#edit-movie').val(movie.title);
    $('#edit-rating').val(movie.rating);
  })
});

//When the form is submitted, the page should not reload / refresh,
// instead, your javascript should make a POST request to
// /api/movies with the information the user put into the form

//add getMovies in the function using jquery?
