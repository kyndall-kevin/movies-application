const {getMovies, addMovie, editMovie, getMovie, deleteMovie} = require('./api.js');

//Function that gets movies from db and displays them
const loadMovies = () => {
    getMovies().then((movies) => {
        movies.forEach(({title, rating, id}) => {
            $('#load').hide();
            $('#movie-con').append(`
                <div class="card">
                    <div class="card-body">
                    <h5 class="card-title" >${title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">rating: ${rating}</h6>
                    <button class=' btn edit-btn btn-primary' data-toggle="modal" data-target="#exampleModal"  id="${id}edit">edit</button>
                    <button class=" btn dlt-btn btn-primary" id="${id}delete">X</button>
                    </div>
                </div>`)
        });
        //Add listeners to the edit buttons
        addEditBtnListeners();
        addDeleteBtnListener();
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

// ---------------------------------------------EDIT MOVIE BUTTON

let movieEditId = 0;

const addEditBtnListeners = function () {
    $('.edit-btn').click(function () {
        movieEditId = parseInt($(this).attr('id'));
        $(this).attr('disabled', true);
        $('#modal-content').html('<div class="modal-header">\n' +
            '                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>\n' +
            '                <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
            '                    <span aria-hidden="true">&times;</span>\n' +
            '                </button>\n' +
            '            </div>\n' +
            '            <div class="modal-body">\n' +
            '                <div class="form-group">\n' +
            '                    <label for="edit-movie">Name</label>\n' +
            '                    <input id="edit-movie" class="form-control" type="text">\n' +
            '                </div>\n' +
            '                <div class="form-group">\n' +
            '                    <label for="edit-rating">Rating</label>\n' +
            '                    <input id="edit-rating" class="form-control" type="text">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '            <div class="modal-footer">\n' +
            '                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>\n' +
            '                <button id="edit-submit" type="button" class="btn btn-primary" data-dismiss="modal">Save changes</button>\n' +
            '            </div>');
    getMovie(movieEditId).then(movie => {
            $('#edit-movie').val(movie.title);
            $('#edit-rating').val(movie.rating);
        })
    });
};

// --------------------------------------------------DELETE MOVIE BUTTON

const addDeleteBtnListener = function () {
    $('.dlt-btn').click(function () {
        let movieDeleteId = parseInt($(this).attr('id'));
        console.log(movieDeleteId);
        $(this).attr('disabled', true);
        deleteMovie(movieDeleteId);
        $('#load').show();
        $('#movie-con').html('');
        loadMovies();
    })
};

// ------------------------------------------EDIT MOVIE SUBMIT BUTTON

$('#edit-submit').click(function () {
    let changedMovie = {
        title: $('#edit-movie').val(),
        rating: $('#edit-rating').val()
    };
    $('#edit-movie').val('');
    $('#edit-rating').val('');
    editMovie(movieEditId, changedMovie).then(() => {
        $('#load').show();
        $('#movie-con').html('');
        //Dynamically reload the page
        loadMovies();
    })
});

// ------------------------------------------------EDIT MOVIE MODAL

$('#addMovieModal').click(function () {
    $('#modal-content').html('<div class="modal-header">\n' +
        '                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>\n' +
        '                <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
        '                    <span aria-hidden="true">&times;</span>\n' +
        '                </button>\n' +
        '            </div>\n' +
        '            <div class="modal-body">\n' +
        '                <div class="form-group">\n' +
        '                    <label for="movie-name">Name</label>\n' +
        '                    <input id="movie-name" class="form-control" type="text">\n' +
        '                </div>\n' +
        '                <div class="form-group">\n' +
        '                    <label for="movie-rating">Rating</label>\n' +
        '                    <input id="movie-rating" class="form-control" type="text">\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div class="modal-footer">\n' +
        '                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>\n' +
        '                <button id="submit" type="button" class="btn btn-primary" data-dismiss="modal">Save changes</button>\n' +
        '            </div>')
});

loadMovies();


//When the form is submitted, the page should not reload / refresh,
// instead, your javascript should make a POST request to
// /api/movies with the information the user put into the form

//add getMovies in the function using jquery?
