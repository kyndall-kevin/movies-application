const {getMovies, addMovie, editMovie, getMovie, deleteMovie} = require('./api.js');

//Function that gets movies from db and displays them
const loadMovies = () => {
    getMovies().then((movies) => {
        movies.forEach(({title, rating, id, genre}) => {
            $('#load').hide();
            $('#movie-con').append(`
                <div class="col-4 mb-3">
                
                <div class="card">
                    <h5 class="card-header">${title}</h5>
                    <div class="card-body">
                        <h6 class="card-subtitle mb-2 text-muted">Rating: ${rating}</h6>
                        <h6 class="card-subtitle mb-2 text-muted">Genre: ${genre}</h6>
                    </div>
                    <div class="card-footer d-flex">
                        <button class=' btn edit-btn btn-outline-info mr-auto' data-toggle="modal" data-target="#exampleModal"  id="${id}edit">Edit</button>
                        <button class=" btn dlt-btn btn-outline-info" id="${id}delete">Delete</button>
                    </div>
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
const addSubmitBtnListener = function () {
    $('#submit').click(function () {
        //Create new movie object
        let newMovie = {
            title: $('#movie-name').val(),
            rating: $('#movie-rating').val(),
            genre: $('#movie-genre').val()
        };
        //Add the movie to the db
        addMovie(newMovie).then(() => {
            $('#load').show();
            $('#movie-con').html('');
            //Dynamically reload the page
            loadMovies();
        });
    });
};
// ---------------------------------------------EDIT MOVIE BUTTON

let movieEditId = 0;

const addEditBtnListeners = function () {
    $('.edit-btn').click(function () {
        //Get the movie id to edit from the edit button id
        movieEditId = parseInt($(this).attr('id'));
        //Disable the button
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
            '                <div class="form-group">\n' +
            '                    <label for="edit-genre">Genre</label>\n' +
            '                    <input id="edit-genre" class="form-control" type="text">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '            <div class="modal-footer">\n' +
            '                <button type="button" class="btn btn-outline-info" data-dismiss="modal">Close</button>\n' +
            '                <button id="edit-submit" type="button" class="btn btn-outline-info" data-dismiss="modal">Save changes</button>\n' +
            '            </div>');
        addEditSubmitBtnListener();
        $('#exampleModal').modal('show');
        getMovie(movieEditId).then(movie => {
            $('#edit-movie').val(movie.title);
            $('#edit-rating').val(movie.rating);
        });
        //Re-enable the button
        $(this).attr('disabled', false);

    });
};

// --------------------------------------------------DELETE MOVIE BUTTON

const addDeleteBtnListener = function () {
    $('.dlt-btn').click(function () {
        //Get the id of the movie being clicked from the button id
        let movieDeleteId = parseInt($(this).attr('id'));
        //Bonus to make the button disabled
        $(this).attr('disabled', true);
        //Delete the move from the db
        deleteMovie(movieDeleteId);
        //Show the loading animation
        $('#load').show();
        //Clear the displayed movies
        $('#movie-con').html('');
        //Load the current movie db
        loadMovies();
    })
};

// ------------------------------------------EDIT MOVIE SUBMIT BUTTON

const addEditSubmitBtnListener = function () {
    $('#edit-submit').click(function () {
        //Get the new movie information from the input boxes
        let changedMovie = {
            title: $('#edit-movie').val(),
            rating: $('#edit-rating').val(),
            genre: $('#edit-genre').val()
        };
        //Clear the input boxes
        $('#edit-movie').val('');
        $('#edit-rating').val('');
        $('#edit-genre').val('');
        //Edit the movie in the db
        editMovie(movieEditId, changedMovie).then(() => {
            $('#load').show();
            $('#movie-con').html('');
            //Dynamically reload the page
            loadMovies();
        })
    });
};
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
        '                <div class="form-group">\n' +
        '                    <label for="movie-genre">Genre</label>\n' +
        '                    <input id="movie-genre" class="form-control" type="text">\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div class="modal-footer">\n' +
        '                <button type="button" class="btn btn-outline-info" data-dismiss="modal">Close</button>\n' +
        '                <button id="submit" type="button" class="btn btn-outline-info" data-dismiss="modal">Save changes</button>\n' +
        '            </div>');
    $('#exampleModal').modal('show');
    addSubmitBtnListener();
});

loadMovies();

