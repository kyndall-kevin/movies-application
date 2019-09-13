module.exports = {
  getMovies: () => {
    return fetch('/api/movies')
        .then(response => response.json());
  },
  addMovie: (data) => {
    return fetch('/api/movies', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
  ,
  editMovie: (id, data) => {
    return fetch(`/api/movies/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  },
  getMovie: (id) => {
    return fetch(`/api/movies/${id}`)
        .then(response => response.json());
  },
  deleteMovie: (id) => {
    return fetch(`/api/movies/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
};

