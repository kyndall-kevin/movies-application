const {getMovies, addMovie, editMovie, getMovie} = require('./api.js');

//Function that gets movies from db and displays them
const loadMovies = () => {
    getMovies().then((movies) => {
        movies.forEach(({title, rating, id}) => {
            $('#load').hide();
            $('#movie-con').append(`<p>id#${id} - ${title} - rating: ${rating}<button class='edit-btn' id="${id}">edit</button></p>`)
        });
        //Add listeners to the edit buttons
        addBtnListeners();
    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.');
        console.log(error);
    });
};
//Click listener for the submit button
$('#submit').click(function () {
    //Create new movie object
    let newMovie = {
        title: $('#movie-name').val(),
        rating: $('#movie-rating').val()
    };
    //Add the movie to the db
    addMovie(newMovie).then(() => {
        $('#load').show();
        $('#movie-con').html('');
        //Dynamically reload the page
        loadMovies();
    });
});

const addBtnListeners = function () {
    $('.edit-btn').click(function () {
        let editid = $(this).attr('id');
        getMovie(editid).then(movie => {
            $('#edit-movie').val(movie.title);
            $('#edit-rating').val(movie.rating);
        })
    });
};

loadMovies();

//When the form is submitted, the page should not reload / refresh,
// instead, your javascript should make a POST request to
// /api/movies with the information the user put into the form

//add getMovies in the function using jquery?
