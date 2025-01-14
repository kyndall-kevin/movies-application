const {getMovies, addMovie, editMovie, getMovie, deleteMovie} = require('./api.js');

//Function that gets movies from db and displays them
const loadMovies = () => {
    //Show the loading animation
    $('#load').show();
    //Clear the displayed movies
    $('#movie-con').html('');

    getMovies().then((movies) => {

        movies = sortMovies(movies);
        if ($('#search').val().length > 0)
            movies = searchMovies(movies);

        movies.forEach(({title, rating, id, genre}) => {
            //Hide the loading icon
            $('#load').hide();
            //Add a card with the movie information in it
            $('#movie-con').append(`
                <div class="col-4 mb-3">
                    <div class="card">
                        <h5 class="card-header">${title}</h5>
                        <div class="card-body">
                            <h6 class="card-subtitle mb-2 text-muted">Rating: ${rating}</h6>
                            <h6 class="card-subtitle mb-2 text-muted">Genre: ${genre}</h6>
                        </div>
                        <div class="card-footer d-flex">
                            <button class=' btn edit-btn btn-outline-info mr-auto' data-toggle="modal"  id="${id}edit">Edit</button>
                            <button class=" btn dlt-btn btn-outline-info" id="${id}delete">Delete</button>
                        </div>
                    </div>
                </div>`)
        });
        //Add listeners to the edit and delete buttons
        addEditBtnListeners();
        addDeleteBtnListener();
    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.');
        console.log(error);
    });
};

//Button to clear the search box
$('#clearBtn').click(function () {
    if ($('#search').val().length > 0) {
        $('#search').val('');
        //Reload
        loadMovies();
    }
});

//Listener for search input
$('#search').on('change', function () {
    //Reload
    loadMovies();
});

//Filters movies based on the search terms
const searchMovies = function (movies) {
    let searchTerm = $('#search').val();

    return movies.filter(function (movie) {
        return movie.title.toLowerCase().indexOf(searchTerm) !== -1
    });
};

//Listener for the sorting buttons on change
$('select[id=sorting]').on('change', function () {
    //Reload
    loadMovies();
});

//Sorts movies by what is selected in the select
const sortMovies = function (movies) {
    let sortBy = $("option:checked").val();

    if (sortBy === "sort-none")
        return movies.sort((a, b) => a.id - b.id);
    else if (sortBy === "sort-title-ascending")
        return movies.sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase()) ? 1 : -1);
    else if (sortBy === "sort-title-descending")
        return movies.sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase()) ? -1 : 1);
    else if (sortBy === "sort-genre-ascending")
        return movies.sort((a, b) => (a.genre.toLowerCase() > b.genre.toLowerCase()) ? 1 : -1);
    else if (sortBy === "sort-genre-descending")
        return movies.sort((a, b) => (a.genre.toLowerCase() > b.genre.toLowerCase()) ? -1 : 1);
    else if (sortBy === "sort-rating-ascending")
        return movies.sort((a, b) => a.rating - b.rating);
    else if (sortBy === "sort-rating-descending")
        return movies.sort((a, b) => b.rating - a.rating);
    else
        return movies;
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
            //Dynamically reload the page
            loadMovies();
        });
    });
};

// ---------------------------------------------EDIT MOVIE BUTTON
const addEditBtnListeners = function () {
    $('.edit-btn').click(function () {
        //Disable the edit button
        $(this).attr('disabled', true);
        //Get the movie information from the db
        getMovie(parseInt($(this).attr('id'))).then(movie => {
            //Populate the modal with the edit form
            $('#modal-content').html(`<div class="modal-header">
                                        <h5 class="modal-title" >Edit movie</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="form-group">
                                            <label for="edit-movie">Name</label>
                                            <input id="edit-movie" class="form-control" type="text">
                                        </div>
                                        <div class="form-group">
                                            <label for="edit-rating">Rating</label>
                                            <input id="edit-rating" class="form-control" type="text">
                                        </div>
                                        <div class="form-group">
                                            <label for="edit-genre">Genre</label>
                                            <input id="edit-genre" class="form-control" type="text">
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button id="edit-submit" type="button" class="btn btn-outline-info" data-dismiss="modal">Save changes</button>
                                    </div>`);
            addEditSubmitBtnListener(parseInt($(this).attr('id')));
            //Prepopulate the form
            $('#edit-movie').val(movie.title);
            $('#edit-rating').val(movie.rating);
            $('#edit-genre').val(movie.genre);
            //Display the modal after everything is in
            $('#modal').modal('show');
        });
        //Re-enable the button
        $(this).attr('disabled', false);

    });
};

// --------------------------------------------------DELETE MOVIE BUTTON
const addDeleteBtnListener = function () {
    $('.dlt-btn').click(function () {
        //Bonus to make the button disabled
        $(this).attr('disabled', true);
        //Delete the move from the db using the id from the button
        deleteMovie(parseInt($(this).attr('id')));
        //Load the current movie db
        loadMovies();
    })
};

// ------------------------------------------EDIT MOVIE SUBMIT BUTTON
const addEditSubmitBtnListener = function (id) {
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
        editMovie(id, changedMovie).then(() => {
            //Reload the page
            loadMovies();
        })
    });
};
// ------------------------------------------------ADD MOVIE MODAL
$('#addMovieModal').click(function () {
    //Populate the modal with add movie form
    $('#modal-content').html(`<div class="modal-header">
                        <h5 class="modal-title">Add a movie</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="movie-name">Name</label>
                            <input id="movie-name" class="form-control" type="text">
                        </div>
                        <div class="form-group">
                            <label for="movie-rating">Rating</label>
                            <input id="movie-rating" class="form-control" type="text">
                        </div>
                        <div class="form-group">
                            <label for="movie-genre">Genre</label>
                            <input id="movie-genre" class="form-control" type="text">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button id="submit" type="button" class="btn btn-outline-info" data-dismiss="modal">Submit</button>
                    </div>`);
    //Display the modal
    $('#modal').modal('show');
    //Add listener to the submit button
    addSubmitBtnListener();
});

//Initial call to populate the page
loadMovies();